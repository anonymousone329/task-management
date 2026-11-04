const FILTERS = ["All", "Pending", "Completed"];

export default function FilterBar({ current, onChange, counts }) {
  return (
    <div className="filter-bar" role="group" aria-label="Filter tasks by status">
      {FILTERS.map((name) => (
        <button
          key={name}
          type="button"
          className={`filter-btn ${current === name ? "is-active" : ""}`}
          aria-pressed={current === name}
          onClick={() => onChange(name)}
        >
          {name}
          <span className="filter-count">{counts[name]}</span>
        </button>
      ))}
    </div>
  );
}
