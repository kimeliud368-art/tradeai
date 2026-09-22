export const mockWallet = {
  totalBalance: 2450.20,
  availableBalance: 1820.20,
  pnlToday: 126.40,
  assets: [
    { code: 'USD', label: 'US Dollar', balance: 1500.00 },
    { code: 'BTC', label: 'Bitcoin', balance: 650.20 },
    { code: 'USDT', label: 'Tether (TRC20)', balance: 300.00 },
  ],
};

export const mockAiSignal = {
  pair: 'BTC/USD',
  direction: 'BUY',
  confidence: 78,
  entry: 67420,
  stopLoss: 66410,
  target: 69440,
  analysis: [
    { label: 'Trend', value: 'Bullish', positive: true },
    { label: 'Momentum', value: 'Positive', positive: true },
    { label: 'Volume', value: 'Increasing', positive: true },
    { label: 'Support', value: 'Holding', positive: true },
  ],
};

export const mockPositions = [
  { pair: 'BTC/USD', side: 'BUY', pnl: 82.40 },
  { pair: 'EUR/USD', side: 'SELL', pnl: 31.20 },
];

export const mockTransactions = [
  { type: 'M-Pesa Deposit', amount: '+10,000 KES', status: 'Completed' },
  { type: 'BTC Trade', amount: '-$100', status: 'Completed' },
  { type: 'Crypto Deposit', amount: '+250 USDT', status: 'Confirmed' },
  { type: 'Crypto Withdraw', amount: '-100 USDT', status: 'Pending' },
  { type: 'M-Pesa Deposit', amount: '+5,000 KES', status: 'Completed' },
];
