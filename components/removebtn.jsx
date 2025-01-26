"use client";

import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RemoveBtn({id}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const deleteTask = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");

    if (confirmed) {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/api/task?id=${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          router.push("/");
        } else {
          throw new Error("Failed to delete task");
        }
      } catch (error) {
        console.error("Delete task error:", error);
        window.alert("Failed to delete task. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <button 
      onClick={deleteTask} 
      disabled={loading}
      className={`text-red-500 hover:text-red-700 transition-transform transform hover:scale-110 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <Trash className={`w-6 h-6 ${loading ? 'animate-pulse' : ''}`} />
    </button>
  );
}