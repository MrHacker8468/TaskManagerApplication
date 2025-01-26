import connectDB from "@/lib/mongodb";
import Task from "@/models/schema";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params; // Correctly destructure `id`
  const { title, description, status } = await req.json(); // Match field names with the frontend

  await connectDB();

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true } // Return the updated document
    );

    if (!updatedTask) {
      return NextResponse.json(
        { message: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Task updated successfully", task: updatedTask },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  const { id } = params; // Correctly destructure `id`
  await connectDB();

  try {
    const task = await Task.findById(id);

    if (!task) {
      return NextResponse.json(
        { message: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ task }, { status: 200 });
  } catch (error) {
    console.error("Error fetching task:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
