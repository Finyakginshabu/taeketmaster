import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Table2,
  BarChart3,
  UserCircle,
  LogOut,
} from 'lucide-react';
import './AdminLayout.css';

const topMenu = [
  { label: 'Dashboard', icon: LayoutDashboard, base: '/admin/dashboard' },
  { label: 'Tables',    icon: Table2,          base: '/admin/tables' },
  { label: 'Reports',   icon: BarChart3,       base: '/admin/reports' },
];

const bottomMenu = [
  { label: 'Account', icon: UserCircle, base: '/admin/account' },
];

/* -------- breadcrumb helper -------- */
function buildBreadcrumb(pathname) {
  const segments = pathname.replace('/admin/', '').split('/').filter(Boolean);
  const labelMap = {
    dashboard: 'Dashboard',
    comparison: 'Comparison',
    tables: 'Tables',
    events: 'Events',
    add: 'Add',
    edit: 'Edit',
    reports: 'Reports',
    account: 'Account',
  };
  return segments.map((s) => labelMap[s] || s);
}

export default function AdminLayout() {
  const { pathname } = useLocation();
  const crumbs = buildBreadcrumb(pathname);
  const isActive = (base) => pathname.startsWith(base);

  return (
    <div className="al-shell">
      {/* ===== SIDEBAR ===== */}
      <aside className="al-sidebar">
        <div className="al-logo">
          <span className="al-logo-text">taeketmaster</span>
          <span className="al-logo-r">®</span>
        </div>

        <nav className="al-nav">
          <ul className="al-menu al-menu--top">
            {topMenu.map(({ label, icon: Icon, base: b }) => (
              <li key={label}>
                <NavLink
                  to={b}
                  className={() =>
                    `al-item${isActive(b) ? ' al-item--active' : ''}`
                  }
                >
                  <span className="al-icon-box">
                    <Icon size={20} strokeWidth={2} />
                  </span>
                  <span className="al-item-label">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <hr className="al-divider" />

          <ul className="al-menu al-menu--bottom">
            {bottomMenu.map(({ label, icon: Icon, base: b }) => (
              <li key={label}>
                <NavLink
                  to={b}
                  className={() =>
                    `al-item${isActive(b) ? ' al-item--active' : ''}`
                  }
                >
                  <span className="al-icon-box">
                    <Icon size={20} strokeWidth={2} />
                  </span>
                  <span className="al-item-label">{label}</span>
                </NavLink>
              </li>
            ))}
            <li>
              <button
                className="al-item al-item--logout"
                onClick={() => alert('Logged out')}
              >
                <span className="al-icon-box al-icon-box--logout">
                  <LogOut size={20} strokeWidth={2} />
                </span>
                <span className="al-item-label al-label--logout">Log out</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* ===== MAIN ===== */}
      <main className="al-main">
        <p className="al-breadcrumb">
          {crumbs.map((c, i) => (
            <span key={i}>
              {i > 0 && <span className="al-bc-sep"> &gt; </span>}
              <span className={i === crumbs.length - 1 ? 'al-bc-bold' : ''}>
                {c}
              </span>
            </span>
          ))}
        </p>
        <div className="al-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
