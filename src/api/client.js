// Every real API call in the app funnels through here.
// When the real backend exists, this is the ONLY file that changes.
// Nothing outside src/api/ should ever call fetch() directly.

const USE_MOCKS = true; // flip to false once a real backend endpoint exists
const BASE_URL = import.meta.env?.VITE_API_URL || 'https://api.tradeai.example/v1';

const randomDelay = (min = 300, max = 900) =>
  new Promise((res) => setTimeout(res, min + Math.random() * (max - min)));

// Simulates the real world: flaky networks, slow M-Pesa callbacks, etc.
// Tune failRate per-call for flows that should feel more/less reliable.
export async function mockRequest(data, { failRate = 0.08, delay = [300, 900] } = {}) {
  await randomDelay(...delay);
  if (Math.random() < failRate) {
    const err = new Error('Network request failed');
    err.code = 'NETWORK_ERROR';
    throw err;
  }
  return data;
}

export async function request(path, options = {}) {
  if (USE_MOCKS) {
    throw new Error(
      `request() called for ${path} but USE_MOCKS is true — use the mock function for this endpoint instead.`
    );
  }
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const err = new Error(`Request failed: ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}
