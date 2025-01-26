import { PUT, GET } from "@/app/api/task/[id]/route";
import connectDB from "@/lib/mongodb";
import Task from "@/models/schema";


jest.mock("@/lib/mongodb");
jest.mock("@/models/schema");

describe("API /task/[id] Routes", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("PUT /task/[id]", () => {
    const req = {
      json: jest.fn().mockResolvedValue({
        title: "Updated Task",
        description: "Updated Description",
        status: "completed",
      }),
    };
    const params = { id: "12345" };

    it("should update the task successfully", async () => {
      connectDB.mockResolvedValue();
      Task.findByIdAndUpdate.mockResolvedValue({
        _id: "12345",
        title: "Updated Task",
        description: "Updated Description",
        status: "completed",
      });

      const res = await PUT(req, { params });

      expect(connectDB).toHaveBeenCalled();
      expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(
        "12345",
        { title: "Updated Task", description: "Updated Description", status: "completed" },
        { new: true }
      );
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({
        message: "Task updated successfully",
        task: {
          _id: "12345",
          title: "Updated Task",
          description: "Updated Description",
          status: "completed",
        },
      });
    });

    it("should return 404 if task not found", async () => {
      connectDB.mockResolvedValue();
      Task.findByIdAndUpdate.mockResolvedValue(null); // Simulating task not found

      const res = await PUT(req, { params });

      expect(res.status).toBe(404);
      expect(await res.json()).toEqual({ message: "Task not found" });
    });

    it("should return 500 on server error", async () => {
      connectDB.mockResolvedValue();
      Task.findByIdAndUpdate.mockRejectedValue(new Error("Server error"));

      const res = await PUT(req, { params });

      expect(res.status).toBe(500);
      expect(await res.json()).toEqual({ message: "Internal Server Error" });
    });
  });

  describe("GET /task/[id]", () => {
    const params = { id: "12345" };

    it("should fetch the task successfully", async () => {
      connectDB.mockResolvedValue();
      Task.findById.mockResolvedValue({
        _id: "12345",
        title: "Task 1",
        description: "Description 1",
        status: "pending",
      });

      const res = await GET({}, { params });

      expect(connectDB).toHaveBeenCalled();
      expect(Task.findById).toHaveBeenCalledWith("12345");
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({
        task: {
          _id: "12345",
          title: "Task 1",
          description: "Description 1",
          status: "pending",
        },
      });
    });

    it("should return 404 if task not found", async () => {
      connectDB.mockResolvedValue();
      Task.findById.mockResolvedValue(null); // Simulating task not found

      const res = await GET({}, { params });

      expect(res.status).toBe(404);
      expect(await res.json()).toEqual({ message: "Task not found" });
    });

    it("should return 500 on server error", async () => {
      connectDB.mockResolvedValue();
      Task.findById.mockRejectedValue(new Error("Server error"));

      const res = await GET({}, { params });

      expect(res.status).toBe(500);
      expect(await res.json()).toEqual({ message: "Internal Server Error" });
    });
  });
});
