import './StatusPill.css';

const TONE_BY_STATUS = {
  completed: 'positive',
  confirmed: 'positive',
  verified: 'positive',
  wallet_credited: 'positive',
  pending: 'warning',
  prompt_sent: 'warning',
  payment_received: 'warning',
  timed_out: 'negative',
  failed: 'negative',
};

export default function StatusPill({ status }) {
  const key = status.toLowerCase().replace(/\s+/g, '_');
  const tone = TONE_BY_STATUS[key] || 'neutral';
  return <span className={`status-pill ${tone}`}>{status}</span>;
}
