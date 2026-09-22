import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import './AppShell.css';

export default function AppShell({ children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-shell-main">
        <header className="app-topbar">
          <div className="app-topbar-inner">
            <span className="app-topbar-title">TradeAI</span>
            <div className="app-topbar-account">Account</div>
          </div>
        </header>
        <main className="app-content">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
