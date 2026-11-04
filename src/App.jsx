import { useEffect, useState } from "react";
import DashboardSummary from "./components/DashboardSummary.jsx";
import TaskForm from "./components/TaskForm.jsx";
import FilterBar from "./components/FilterBar.jsx";
import TaskList from "./components/TaskList.jsx";

const STORAGE_KEY = "task-dashboard.tasks";

const INITIAL_TASKS = [
  {
    id: "t-1",
    title: "Prepare Monday lesson slides",
    description: "Cover spreadsheets basics for the new trainee group.",
    priority: "High",
    status: "Pending",
  },
  {
    id: "t-2",
    title: "Submit weekly report",
    description: "",
    priority: "Medium",
    status: "Completed",
  },
  {
    id: "t-3",
    title: "Back up lab computers",
    description: "Copy trainee files to the external drive.",
    priority: "Low",
    status: "Pending",
  },
];

// Unique id for every task (never the array index).
function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `t-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// Optional enhancement: restore tasks saved in localStorage.
function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // Storage unavailable or corrupted: fall back to the sample tasks.
  }
  return INITIAL_TASKS;
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // Ignore storage errors; the app still works from state.
    }
  }, [tasks]);

  const handleAddTask = ({ title, description, priority }) => {
    const newTask = {
      id: createId(),
      title,
      description,
      priority,
      status: "Pending",
    };
    setTasks((current) => [newTask, ...current]);
  };

  const handleToggleStatus = (id) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "Pending" ? "Completed" : "Pending" }
          : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === "Completed").length;
  const pending = total - completed;

  const visibleTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Dashboard</h1>
        <p>Plan your day, tick things off, and see what is still open.</p>
      </header>

      <DashboardSummary total={total} pending={pending} completed={completed} />

      <main className="layout">
        <aside className="layout-form">
          <TaskForm onAddTask={handleAddTask} />
        </aside>

        <section className="layout-list" aria-label="Tasks">
          <FilterBar
            current={filter}
            onChange={setFilter}
            counts={{ All: total, Pending: pending, Completed: completed }}
          />
          <TaskList
            tasks={visibleTasks}
            filter={filter}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDeleteTask}
          />
        </section>
      </main>
    </div>
  );
}
