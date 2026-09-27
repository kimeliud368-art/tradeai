import { mockRequest } from './client';
const mockRate = {
    base : 'USD',
    quote :'KES',
    rate : 129.04,
};
export function getExchangeRate() {
  return mockRequest(mockRate, { failRate: 0.05 });
}