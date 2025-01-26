import EditTaskForm from "@/components/editTaskForm";

async function getTaskbyId(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/task/${id}`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch task");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching task:", error);
    return null;
  }
}

export default async function EditTask({ params }) {
  const id = params?.id;
  if (!id) {
    return <div>Error: Task ID is missing</div>;
  }

  const data = await getTaskbyId(id);

  if (!data || !data.task) {
    return <div>Error fetching task data</div>;
  }

  const { title, description, status } = data.task;

  return (
    <EditTaskForm
      id={id}
      title={title}
      description={description}
      status={status}
    />
  );
}
