"use client";

import React, { useState } from "react";
import { Plus, Search, Menu, X, Calendar, Clock } from "lucide-react";
import Link from "next/link";

const SearchBar = ({ onSearch, setIsSearchActive }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (onSearch && searchTerm.trim()) {
      onSearch(searchTerm);
      setIsSearchActive(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center w-full gap-3">
      <input
        type="text"
        placeholder="Search for tasks"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
        aria-label="Search tasks"
        className="w-full px-4 py-2 bg-gray-700 text-white rounded-xl 
        border-2 border-indigo-500 focus:ring-2 focus:ring-indigo-400 
        transition-all duration-300"
      />
      <button
        onClick={handleSearch}
        aria-label="Search"
        className="hidden sm:flex bg-indigo-600 text-white py-2 px-4 
        rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-300 
        items-center justify-center font-bold tracking-wider uppercase"
      >
        <Search className="h-5 w-5" />
      </button>
    </div>
  );
};

const TaskCard = ({ task }) => (
  <div
    className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 text-white 
    rounded-xl shadow-lg border border-indigo-500/30 hover:border-indigo-500 
    transition-all duration-300 hover:shadow-indigo-500/20 hover:shadow-xl 
    transform hover:-translate-y-1"
  >
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-bold mb-3 text-transparent bg-clip-text 
        bg-gradient-to-r from-white to-indigo-300">{task.title}</h2>
      
      <p className="text-gray-300 mb-4 flex-grow">{task.description}</p>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        {task.dueDate && (
          <div className="flex items-center text-indigo-300 text-sm">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
        )}
        {task.status && (
          <span className={`px-3 py-1 rounded-full text-xs font-medium
            ${task.status === 'completed' ? 'bg-green-500/20 text-green-300' :
              task.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-300' :
              'bg-red-500/20 text-red-300'}`}>
            {task.status}
          </span>
        )}
      </div>
    </div>
  </div>
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(`/api/task?search=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();

      if (response.ok) {
        setTasks(data.tasks);
      } else {
        console.error("Error fetching tasks:", data.message);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleCloseSearch = () => {
    setIsSearchActive(false);
    setTasks([]);
  };

  const handleOverlayKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleCloseSearch();
    }
  };

  return (
    <nav
      className="bg-gradient-to-r from-black via-gray-900 to-indigo-900 
      shadow-2xl border-b-2 border-indigo-600 relative"
    >
      <div
        className={`container mx-auto px-4 py-3 ${
          isSearchActive ? "blur-sm" : ""
        }`}
      >
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between gap-8">
          <Link href="/" className="flex-shrink-0">
            <h1
              className="text-3xl font-black text-white tracking-tight 
              bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-400"
            >
              Task Manager
            </h1>
          </Link>

          <div className="flex-grow max-w-2xl px-4">
            <SearchBar onSearch={handleSearch} setIsSearchActive={setIsSearchActive} />
          </div>

          <Link href="/addTask" className="flex-shrink-0">
            <button
              className="flex items-center justify-center gap-2 text-white 
              bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded-xl 
              shadow-2xl border-2 border-indigo-500 transform 
              transition-all duration-300 hover:scale-105 
              font-bold tracking-wider uppercase"
            >
              <Plus className="h-5 w-5 stroke-2" />
              <span>Add Task</span>
            </button>
          </Link>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex-shrink-0">
              <h1
                className="text-2xl font-black text-white tracking-tight 
                bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-400"
              >
                Task Manager
              </h1>
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`mt-4 space-y-4 ${isMenuOpen ? "block" : "hidden"}`}>
            <div className="w-full">
              <SearchBar onSearch={handleSearch} setIsSearchActive={setIsSearchActive} />
            </div>

            <Link href="/addTask" className="block">
              <button
                className="w-full flex items-center justify-center gap-2 
                text-white bg-indigo-700 hover:bg-indigo-800 px-4 py-2 
                rounded-xl shadow-2xl border-2 border-indigo-500 
                transition-all duration-300 font-bold tracking-wider uppercase"
              >
                <Plus className="h-5 w-5 stroke-2" />
                <span>Add Task</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Search Results Overlay */}
      {isSearchActive && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
          onKeyDown={handleOverlayKeyDown}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
        >
          <div className="container mx-auto px-4 max-w-3xl">
            <button
              onClick={handleCloseSearch}
              className="absolute top-4 right-4 text-white bg-red-600 
              hover:bg-red-700 p-2 rounded-full transition-colors duration-300"
              aria-label="Close search results"
            >
              <X className="h-6 w-6" />
            </button>
            {tasks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tasks.map((task) => (
                  <TaskCard key={task._id} task={task} />
                ))}
              </div>
            ) : (
              <p className="text-white text-center text-lg">No tasks found</p>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}