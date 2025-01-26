import { POST, GET, DELETE } from "@/app/api/task/route";
import connectDB from "@/lib/mongodb";
import Task from "@/models/schema";


jest.mock("@/lib/mongodb");
jest.mock("@/models/schema");

describe("API /task Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});  // Suppress error logs
  });

  describe("POST /task", () => {
    const req = {
      json: jest.fn().mockResolvedValue({
        title: "New Task",
        description: "Task Description",
        status: "pending",
      }),
    };

    it("should return 500 on server error", async () => {
      connectDB.mockResolvedValueOnce(null);
      Task.create.mockRejectedValueOnce(new Error("Server error"));

      const res = await POST(req);

      expect(res.status).toBe(500);
      expect(await res.json()).toEqual({ message: "Internal Server Error" });
    });

    it("should create task successfully", async () => {
      connectDB.mockResolvedValueOnce(null);
      Task.create.mockResolvedValueOnce({
        _id: "12345",
        title: "New Task",
        description: "Task Description",
        status: "pending",
      });

      const res = await POST(req);

      expect(res.status).toBe(201);
      expect(await res.json()).toEqual({
        message: "Task created successfully",
      });
    });
  });

  describe("GET /task", () => {
    it("should return 500 on server error", async () => {
      connectDB.mockResolvedValueOnce(null);
      Task.find.mockRejectedValueOnce(new Error("Server error"));

      const res = await GET();

      expect(res.status).toBe(500);
      expect(await res.json()).toEqual({ message: "Internal Server Error" });
    });

    it("should fetch tasks successfully", async () => {
      connectDB.mockResolvedValueOnce(null);
      Task.find.mockResolvedValueOnce([
        { _id: "12345", title: "Task 1", description: "Desc 1", status: "pending" },
      ]);

      const res = await GET();

      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({
        tasks: [
          { _id: "12345", title: "Task 1", description: "Desc 1", status: "pending" },
        ],
      });
    });
  });

  describe("DELETE /task", () => {
    const req = {
      nextUrl: { searchParams: new URLSearchParams({ id: "12345" }) },
    };

    it("should return 500 on server error", async () => {
      connectDB.mockResolvedValueOnce(null);
      Task.findByIdAndDelete.mockRejectedValueOnce(new Error("Server error"));

      const res = await DELETE(req);

      expect(res.status).toBe(500);
      expect(await res.json()).toEqual({ message: "Internal Server Error" });
    });

    it("should delete task successfully", async () => {
      connectDB.mockResolvedValueOnce(null);
      Task.findByIdAndDelete.mockResolvedValueOnce({ _id: "12345" });

      const res = await DELETE(req);

      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ message: "Task deleted successfully" });
    });
  });
});
