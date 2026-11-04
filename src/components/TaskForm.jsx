import { useState } from "react";

const PRIORITIES = ["Low", "Medium", "High"];

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setError("Enter a task title. Spaces alone are not enough.");
      return;
    }

    onAddTask({
      title: cleanTitle,
      description: description.trim(),
      priority,
    });

    // Clear the form after a successful submission.
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setError("");
  };

  return (
    <form className="card task-form" onSubmit={handleSubmit} noValidate>
      <h2>Add a task</h2>

      <div className="field">
        <label htmlFor="task-title">Task title</label>
        <input
          id="task-title"
          type="text"
          value={title}
          placeholder="e.g. Update the trainee register"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "title-error" : undefined}
          onChange={(event) => {
            setTitle(event.target.value);
            if (error) setError("");
          }}
        />
        {error && (
          <p id="title-error" className="field-error" role="alert">
            {error}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="task-description">
          Description <span className="optional">(optional)</span>
        </label>
        <textarea
          id="task-description"
          rows="3"
          value={description}
          placeholder="Add any details you want to remember"
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="task-priority">Priority</label>
        <select
          id="task-priority"
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          {PRIORITIES.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Add task
      </button>
    </form>
  );
}
