import Navbar from "@/components/navbar";
import Task from "@/components/task";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-black via-gray-900 to-indigo-900  p-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div className="col-span-full mb-6">
          </div>
          <Task />
          <div className="col-span-full mb-6">
          </div>
        </div>
      </div>
    </main>
  );
}