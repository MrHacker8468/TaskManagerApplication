import connectDB from "@/lib/mongodb";
import Task from "@/models/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { title, description, status } = await req.json();
        await connectDB();
        await Task.create({ title, description, status });

        return NextResponse.json(
            { message: "Task created successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating task:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function GET(req) {
    try {
        await connectDB();
        const tasks = await Task.find();

        return NextResponse.json({ tasks });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function DELETE(req) {
    try {
        const id = req.nextUrl.searchParams.get("id");
        await connectDB();
        
        const task = await Task.findByIdAndDelete(id);

        if (!task) {
            return NextResponse.json(
                { message: "Task not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Task deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting task:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
