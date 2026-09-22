import './StatCard.css';

export default function StatCard({ label, value, tone }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className={`stat-value num ${tone || ''}`}>{value}</div>
    </div>
  );
}
