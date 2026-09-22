import { mockRequest } from './client';
import { mockWallet, mockPositions, mockTransactions } from './mocks/data';

export function getWallet() {
  return mockRequest(mockWallet, { failRate: 0.05 });
}

export function getPositions() {
  return mockRequest(mockPositions, { failRate: 0.05 });
}

export function getTransactions() {
  return mockRequest(mockTransactions, { failRate: 0.05 });
}
