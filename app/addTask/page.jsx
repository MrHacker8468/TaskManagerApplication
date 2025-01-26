"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !status) {
      alert("Please fill all the fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          status,
        }),
      });

      if (res.ok) {
        router.push("/");
      } else {
        alert("Failed to add task");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 border-2 border-indigo-600 shadow-2xl rounded-3xl p-8 w-full max-w-2xl transform transition-all hover:scale-105 hover:shadow-4xl">
        <h1 className="text-4xl font-extrabold text-white mb-8 text-center tracking-tight">
          Create New Task
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Task Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-300 mb-2">
              Task Title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              id="title"
              name="title"
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-xl border-2 border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Task Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-300 mb-2">
              Task Description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              id="description"
              name="description"
              rows={4}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-xl border-2 border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              placeholder="Enter task description"
              required
            ></textarea>
          </div>

          {/* Task Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-semibold text-gray-300 mb-2">
              Task Status
            </label>
            <select
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              id="status"
              name="status"
              defaultValue=""
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-xl border-2 border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              required
            >
              <option value="" disabled>Select status</option>
              <option value="active">In Progress</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center font-bold tracking-wider uppercase"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              "Add Task"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}