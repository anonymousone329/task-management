import TaskCard from "./TaskCard.jsx";

const EMPTY_MESSAGES = {
  All: "No tasks yet. Add your first task using the form.",
  Pending: "Nothing pending. Every task is done, or you have not added any yet.",
  Completed: "No completed tasks yet. Mark a task as completed and it will show up here.",
};

export default function TaskList({ tasks, filter, onToggleStatus, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>{EMPTY_MESSAGES[filter]}</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
