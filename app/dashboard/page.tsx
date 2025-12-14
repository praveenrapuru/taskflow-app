"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Task {
  id: number;
  title: string;
  status: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchTasks() {
    setLoading(true);
    const res = await fetch("/api/tasks");
    if (res.ok) {
      const data = await res.json();
      setTasks(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  async function addTask(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    fetchTasks();
  }

  async function updateStatus(id: number, status: string) {
    await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchTasks();
  }

  async function deleteTask(id: number) {
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchTasks();
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">TaskFlow</h1>
          <button onClick={handleLogout} className="text-gray-600 hover:text-gray-900">
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-4">
        <form onSubmit={addTask} className="flex gap-2 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New task..."
            className="flex-1 p-3 border rounded-lg"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Add
          </button>
        </form>

        {loading && <p className="text-center text-gray-500">Loading...</p>}

        {!loading && tasks.length === 0 && (
          <p className="text-center text-gray-500">No tasks yet. Add one above!</p>
        )}

        <div className="space-y-3">
          {tasks.map((task) => {
            let statusColor = "bg-gray-100 text-gray-700";
            if (task.status === "IN_PROGRESS") statusColor = "bg-yellow-100 text-yellow-700";
            if (task.status === "DONE") statusColor = "bg-green-100 text-green-700";

            return (
              <div key={task.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
                <h3 className="font-medium">{task.title}</h3>
                <div className="flex items-center gap-3">
                  <select
                    value={task.status}
                    onChange={(e) => updateStatus(task.id, e.target.value)}
                    className={`rounded px-2 py-1 text-sm font-medium ${statusColor}`}
                  >
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                  </select>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
