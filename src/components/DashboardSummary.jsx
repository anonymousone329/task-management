export default function DashboardSummary({ total, pending, completed }) {
  const items = [
    { label: "Total Tasks", value: total, tone: "total" },
    { label: "Pending Tasks", value: pending, tone: "pending" },
    { label: "Completed Tasks", value: completed, tone: "completed" },
  ];

  return (
    <section className="summary" aria-label="Task summary">
      {items.map((item) => (
        <div key={item.label} className={`summary-item summary-${item.tone}`}>
          <span className="summary-value">{item.value}</span>
          <span className="summary-label">{item.label}</span>
        </div>
      ))}
    </section>
  );
}
