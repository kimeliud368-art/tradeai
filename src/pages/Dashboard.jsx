import '../components/StatCard.css';
import { useEffect, useState } from 'react';
import { getWallet } from '../api/wallet';
import { mockAiSignal } from '../api/mocks/data';

export default function Dashboard() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getWallet()
      .then((data) => setWallet(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="page-title">Dashboard</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong: {error.message}</p>}
      {!loading && !error && wallet && (
        <div className="stat-row">
          <div className="stat-card">
            <div className="stat-label">Balance</div>
            <div className="stat-value num">${wallet.totalBalance.toFixed(2)}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Available</div>
            <div className="stat-value num">${wallet.availableBalance.toFixed(2)}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">P/L Today</div>
            <div className={`stat-value num ${wallet.pnlToday >= 0 ? 'positive' : 'negative'}`}>
              {wallet.pnlToday >= 0 ? '+' : ''}${wallet.pnlToday.toFixed(2)}
            </div>
          </div>
        </div>
      )}

      <div className="signal-card">
        <div className="signal-card-head">
          <span className="signal-pair">{mockAiSignal.pair}</span>
          <span className={`signal-direction ${mockAiSignal.direction === 'BUY' ? 'positive' : 'negative'}`}>
            {mockAiSignal.direction}
          </span>
        </div>
        <div className="signal-confidence">
          <span className="num">{mockAiSignal.confidence}% confidence</span>
        </div>
        <ul className="signal-analysis">
          {mockAiSignal.analysis.map((a) => (
            <li key={a.label}>{a.label}: {a.value}</li>
          ))}
        </ul>
        <button className="btn-primary">Review trade</button>
      </div>
    </div>
  );
}