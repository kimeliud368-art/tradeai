import { mockRequest } from './client';

const mockConfig = {
  active: false,
  strategy: 'Conservative AI',
  market: 'Crypto',
  riskPerTrade: 2,
  maxDailyLoss: 100,
  stopLoss: 1.5,
  takeProfit: 3,
};
export function getTraderConfig() {
    return mockRequest(mockConfig, {failRate:0.05});
}