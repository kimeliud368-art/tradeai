import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const links = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/trade', label: 'Trade' },
  { to: '/ai-trader', label: 'AI Trader' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/wallet', label: 'Wallet' },
  { to: '/history', label: 'History' },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">TradeAI</div>
      <nav className="sidebar-nav">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
