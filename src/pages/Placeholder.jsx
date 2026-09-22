export default function Placeholder({ title }) {
  return (
    <div>
      <h1 className="page-title">{title}</h1>
      <p style={{ color: 'var(--text-muted)' }}>Not built yet — coming in a later slice.</p>
    </div>
  );
}
