import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AsyncState from '../components/AsyncState';
import { getWallet } from '../api/wallet';
import './Wallet.css';

export default function Wallet() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    setError(null);
    getWallet().then(setWallet).catch(setError).finally(() => setLoading(false));
  };

  useEffect(load, []);

  return (
    <div className="wallet-page">
      <h1 className="page-title">Wallet</h1>

      <AsyncState loading={loading} error={error} onRetry={load}>
        {wallet && (
          <>
            <div className="wallet-total">
              <div className="wallet-total-label">Total balance</div>
              <div className="wallet-total-value num">${wallet.totalBalance.toFixed(2)}</div>
            </div>

            <div className="wallet-actions">
              <Link to="/wallet/deposit" className="wallet-action-btn primary">
                Deposit
              </Link>
              <Link to="/wallet/withdraw" className="wallet-action-btn">
                Withdraw
              </Link>
            </div>

            <h2 className="section-title">Assets</h2>
            <div className="asset-list">
              {wallet.assets.map((a) => (
                <div className="asset-row" key={a.code}>
                  <div>
                    <div className="asset-code">{a.code}</div>
                    <div className="asset-label">{a.label}</div>
                  </div>
                  <div className="asset-balance num">${a.balance.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </AsyncState>
    </div>
  );
}
