import { getExchangeRate } from '../api/exchangeRate';
import { useEffect, useRef, useState } from 'react';
import { createMpesaDeposit, pollDepositStatus } from '../api/deposits';
import './MpesaDeposit.css';

const STEP_LABEL = {
  prompt_sent: 'Sent to your phone',
  payment_received: 'Payment received',
  verified: 'Verified',
  wallet_credited: 'Wallet credited',
};

export default function MpesaDeposit() {
  const [amount, setAmount] = useState('10000');
  const [phone, setPhone] = useState('');
  const [formError, setFormError] = useState(null);
  const [rate, setRate] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [depositId, setDepositId] = useState(null);
  const [state, setState] = useState(null); // prompt_sent | payment_received | verified | wallet_credited | timed_out
  const pollRef = useRef(null);

  const stopPolling = () => {
    if (pollRef.current) clearInterval(pollRef.current);
  };

useEffect(() => {
  getExchangeRate().then(setRate);
}, []);

  useEffect(() => stopPolling, []);

  const startPolling = (id) => {
    pollRef.current = setInterval(async () => {
      try {
        const res = await pollDepositStatus(id);
        setState(res.state);
        if (res.state === 'wallet_credited' || res.state === 'timed_out') {
          stopPolling();
        }
      } catch {
        // a single missed poll isn't fatal — the interval just tries again
      }
    }, 1800);
  };

  const submit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);
    try {
      const res = await createMpesaDeposit({ amountKes: amount, phone });
      setDepositId(res.depositId);
      setState(res.state);
      startPolling(res.depositId);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const retry = () => {
    stopPolling();
    setDepositId(null);
    setState(null);
    setFormError(null);
  };

  if (depositId) {
    return (
      <div className="deposit-page">
        <h1 className="page-title">Deposit</h1>
        <div className="deposit-status-card">
          {state === 'timed_out' ? (
            <>
              <div className="status-icon negative">!</div>
              <p className="status-headline">We didn't see a confirmation</p>
              <p className="status-sub">
                Check your phone for the M-Pesa prompt, or try again.
              </p>
              <button className="btn-primary" onClick={retry}>Try again</button>
            </>
          ) : state === 'wallet_credited' ? (
            <>
              <div className="status-icon positive">✓</div>
              <p className="status-headline">Wallet credited</p>
              <p className="status-sub">KES {Number(amount).toLocaleString()} is now available.</p>
            </>
          ) : (
            <>
              <div className="spinner-lg" />
              <p className="status-headline">{STEP_LABEL[state] || 'Sending prompt'}</p>
              <p className="status-sub">Enter your M-Pesa PIN on your phone to complete this.</p>
            </>
          )}

          {state !== 'timed_out' && (
            <ol className="status-steps">
              {['prompt_sent', 'payment_received', 'verified', 'wallet_credited'].map((s, i) => {
                const order = ['prompt_sent', 'payment_received', 'verified', 'wallet_credited'];
                const currentIdx = order.indexOf(state);
                const done = i <= currentIdx;
                return (
                  <li key={s} className={done ? 'done' : ''}>
                    {STEP_LABEL[s]}
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="deposit-page">
      <h1 className="page-title">Deposit</h1>
      <form className="deposit-form" onSubmit={submit}>
        <div className="payment-method-badge">M-Pesa</div>
        <label className="field-label" htmlFor="amount">Amount (KES)</label>
        <input
          id="amount"
          className="field-input num"
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        {rate && (
          <p className="field-hint">
              ≈ ${(amount/ rate.rate).toFixed(2)} USD 
          </p>
          )}

        <label className="field-label" htmlFor="phone">Phone number</label>
        <div className="phone-input">
          <span className="phone-prefix">+254</span>
          <input
            id="phone"
            className="field-input num"
            type="tel"
            placeholder="712345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
          />
        </div>

        {formError && <p className="field-error">{formError}</p>}

        <button className="btn-primary" type="submit" disabled={submitting}>
          {submitting ? 'Sending…' : 'Deposit with M-Pesa'}
        </button>
        <p className="field-hint">You'll receive an M-Pesa payment prompt on your phone.</p>
      </form>
    </div>
  );
}
