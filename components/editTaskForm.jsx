"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditTaskForm({ id, title, description, status }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newStatus, setNewStatus] = useState(status);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newTitle || !newDescription || !newStatus) {
      setError("All fields are required");
      setSuccess("");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`http://localhost:3000/api/task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
          status: newStatus,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update task");
      }

      const data = await res.json();

      setSuccess("Task updated successfully!");
      setTimeout(() => router.push("/"), 1000);
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Failed to update task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 border-2 border-indigo-600 rounded-3xl p-8 w-full max-w-2xl shadow-2xl transform transition-all hover:scale-105 hover:shadow-4xl">
        <h1 className="text-4xl font-black text-white mb-8 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-400">
          Edit Task
        </h1>

        {error && (
          <div className="bg-red-600/20 border border-red-600 text-red-400 p-4 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-600/20 border border-green-600 text-green-400 p-4 rounded-xl mb-6 text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-300 mb-2">
              Task Title
            </label>
            <input
              onChange={(e) => setNewTitle(e.target.value)}
              value={newTitle}
              type="text"
              id="title"
              name="title"
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-xl border-2 border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              placeholder="Enter task title"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-300 mb-2">
              Task Description
            </label>
            <textarea
              onChange={(e) => setNewDescription(e.target.value)}
              value={newDescription}
              id="description"
              name="description"
              rows={4}
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-xl border-2 border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              placeholder="Enter task description"
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-semibold text-gray-300 mb-2">
              Task Status
            </label>
            <select
              onChange={(e) => setNewStatus(e.target.value)}
              value={newStatus}
              id="status"
              name="status"
              className="w-full px-4 py-3 bg-gray-700 text-white rounded-xl border-2 border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
              required
            >
              <option value="" disabled>Select status</option>
              <option value="active">In Progress</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center font-bold tracking-wider uppercase"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Task"}
          </button>
        </form>
      </div>
    </div>
  );
}