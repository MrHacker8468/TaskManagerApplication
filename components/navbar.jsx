import React from "react";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-indigo-900 shadow-2xl border-b-2 border-indigo-600">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-6 py-5">
        {/* Logo Section */}
        <div className="flex items-center w-full sm:w-auto justify-center sm:justify-start">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-400">
            Task Manager
          </h1>
        </div>

        {/* Add Task Button */}
        <div className="w-full sm:w-auto flex justify-center sm:justify-end mt-3 sm:mt-0">
          <Link href="/addTask" className="w-full sm:w-auto">
            <button
              className="flex items-center justify-center space-x-3 text-white 
              bg-indigo-700 hover:bg-indigo-800 
              px-6 py-3 rounded-xl 
              shadow-2xl border-2 border-indigo-500
              transform transition-all duration-300 hover:scale-105 
              w-full sm:w-auto 
              font-bold tracking-wider uppercase"
            >
              <Plus className="h-6 w-6 stroke-[3]" />
              <span className="text-xl">Add Task</span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}