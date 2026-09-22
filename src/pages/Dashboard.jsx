import { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import AsyncState from '../components/AsyncState';
import { getWallet } from '../api/wallet';
import { mockAiSignal } from '../api/mocks/data';
import './Dashboard.css';

export default function Dashboard() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    setError(null);
    getWallet()
      .then(setWallet)
      .catch(setError)
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  return (
    <div className="dashboard">
      <h1 className="page-title">Good morning</h1>

      <AsyncState loading={loading} error={error} onRetry={load}>
        {wallet && (
          <div className="stat-row">
            <StatCard label="Balance" value={`$${wallet.totalBalance.toFixed(2)}`} />
            <StatCard label="Available" value={`$${wallet.availableBalance.toFixed(2)}`} />
            <StatCard
              label="P/L Today"
              value={`${wallet.pnlToday >= 0 ? '+' : ''}$${wallet.pnlToday.toFixed(2)}`}
              tone={wallet.pnlToday >= 0 ? 'positive' : 'negative'}
            />
          </div>
        )}
      </AsyncState>

      <div className="signal-card">
        <div className="signal-card-head">
          <span className="signal-pair">{mockAiSignal.pair}</span>
          <span className={`signal-direction ${mockAiSignal.direction === 'BUY' ? 'positive' : 'negative'}`}>
            {mockAiSignal.direction}
          </span>
        </div>
        <div className="signal-confidence">
          <div className="signal-confidence-bar">
            <div
              className="signal-confidence-fill"
              style={{ width: `${mockAiSignal.confidence}%` }}
            />
          </div>
          <span className="num">{mockAiSignal.confidence}% confidence</span>
        </div>
        <ul className="signal-analysis">
          {mockAiSignal.analysis.map((a) => (
            <li key={a.label}>
              <span className="dot positive" /> {a.label}: {a.value}
            </li>
          ))}
        </ul>
        <button className="btn-primary">Review trade</button>
      </div>
    </div>
  );
}
