import { Routes, Route } from 'react-router-dom';
import AppShell from './components/AppShell';
import Dashboard from './pages/Dashboard';
import Wallet from './pages/Wallet';
import MpesaDeposit from './pages/MpesaDeposit';
import Placeholder from './pages/Placeholder';
import AiTrader from './pages/AiTrader';

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/wallet/deposit" element={<MpesaDeposit />} />
        <Route path="/wallet/withdraw" element={<Placeholder title="Withdraw" />} />
        <Route path="/trade" element={<Placeholder title="Trade" />} />
        <Route path="/ai-trader" element={<AiTrader />} />
        <Route path="/portfolio" element={<Placeholder title="Portfolio" />} />
        <Route path="/history" element={<Placeholder title="History" />} />
      </Routes>
    </AppShell>
  );
}
