export default function TaskCard({ task, onToggleStatus, onDelete }) {
  const isCompleted = task.status === "Completed";

  return (
    <li className={`card task-card ${isCompleted ? "is-completed" : ""}`}>
      <div className="task-body">
        <h3 className="task-title">{task.title}</h3>
        {task.description && <p className="task-description">{task.description}</p>}

        <div className="task-meta">
          <span className={`badge priority-${task.priority.toLowerCase()}`}>
            {task.priority} priority
          </span>
          <span className={`badge status-${task.status.toLowerCase()}`}>
            {task.status}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onToggleStatus(task.id)}
        >
          {isCompleted ? "Mark as pending" : "Mark as completed"}
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete task: ${task.title}`}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
