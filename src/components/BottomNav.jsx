import { NavLink } from 'react-router-dom';
import './BottomNav.css';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/trade', label: 'Markets' },
  { to: '/ai-trader', label: 'AI' },
  { to: '/wallet', label: 'Wallet' },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          end={l.end}
          className={({ isActive }) => `bottom-nav-link${isActive ? ' active' : ''}`}
        >
          {l.label}
        </NavLink>
      ))}
    </nav>
  );
}
