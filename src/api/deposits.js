import { mockRequest } from './client';

// Real M-Pesa (Daraja) is async: you trigger an STK push, then the user's
// phone prompts them for a PIN, then Safaricom calls YOUR server back later.
// The UI never gets an instant yes/no — it has to poll or listen for status.
// This mock reproduces that shape so the component built against it is real.

const DEPOSIT_STATES = [
  'pending',
  'prompt_sent',
  'payment_received',
  'verified',
  'wallet_credited',
];

export async function createMpesaDeposit({ amountKes, phone }) {
  if (!amountKes || Number(amountKes) <= 0) {
    const err = new Error('Enter an amount greater than 0');
    err.code = 'VALIDATION_ERROR';
    throw err;
  }
  if (!/^7\d{8}$/.test(phone)) {
    const err = new Error('Enter a valid Safaricom number, e.g. 712345678');
    err.code = 'VALIDATION_ERROR';
    throw err;
  }
  await mockRequest(null, { failRate: 0.05, delay: [400, 800] });
  return { depositId: `dep_${Date.now()}`, state: 'prompt_sent' };
}

// Poll this on an interval from the UI. Advances one state per call so you
// can see every step render, and occasionally times out like a real prompt
// the user never confirmed on their phone.
let pollCount = {};
export async function pollDepositStatus(depositId) {
  await mockRequest(null, { failRate: 0.02, delay: [600, 1200] });
  pollCount[depositId] = (pollCount[depositId] || 0) + 1;
  const step = Math.min(pollCount[depositId], DEPOSIT_STATES.length - 1);

  if (pollCount[depositId] > 6) {
    return { state: 'timed_out' };
  }
  return { state: DEPOSIT_STATES[step] };
}
