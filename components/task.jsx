import Link from "next/link";
import RemoveBtn from "./removebtn";
import { PenBox, CheckCircle, Clock, AlertCircle } from "lucide-react";

const getTask = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/task", {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }

    return res.json();
  } catch (error) {
    console.log("Error fetching tasks:", error);
  }
};

const getStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case "completed":
      return <CheckCircle className="text-green-500 w-6 h-6 stroke-[3]" />;
    case "in progress":
      return <Clock className="text-blue-500 w-6 h-6 stroke-[3]" />;
    case "pending":
      return <AlertCircle className="text-yellow-500 w-6 h-6 stroke-[3]" />;
    default:
      return null;
  }
};

export default async function Task() {
  const { tasks } = await getTask();

  return (
    <>
      {tasks.map((task) => (
        <div
          key={task._id}
          className="bg-gray-800 rounded-2xl border-2 border-indigo-600 shadow-2xl p-6 w-full grid grid-rows-[auto_1fr_auto] gap-4 transform transition-all duration-300 hover:scale-105 hover:shadow-4xl"
        >
          {/* Task Header */}
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-black text-white flex-grow pr-4 tracking-tight break-words">
              {task.title}
            </h2>
            <div className="flex items-center space-x-2 shrink-0">
              {getStatusIcon(task.status)}
              <span className="text-sm font-bold text-gray-300 uppercase">
                {task.status}
              </span>
            </div>
          </div>

          {/* Task Description */}
          <p className="text-gray-400 text-base leading-relaxed break-words min-h-[3rem]">
            {task.description}
          </p>

          {/* Actions */}
          <div className="flex justify-between items-center border-t border-gray-700 pt-4">
            <RemoveBtn id={task._id} />
            <div className="flex items-center space-x-3">
              <Link href={`editTask/${task._id}`}>
                <PenBox className="w-7 h-7 text-gray-500 hover:text-white transition-transform transform hover:scale-125 stroke-[3]" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}