// ============================================
// Navbar.jsx - Top Navigation Bar
// ============================================

import './index.css';
import { Link, useLocation } from 'react-router-dom';
import { HiDocumentText } from 'react-icons/hi2';

function Navbar({ title, showBack = false }) {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="flex-row items-center gap-sm">
        {showBack && (
          <Link to="/home" className="flex-row items-center gap-xs text-muted" style={{ textDecoration: 'none' }}>
            <HiDocumentText style={{ fontSize: '18px' }} />
            Dashboard
          </Link>
        )}
        {!showBack && (
          <>
            <Link to="/home" className="navbar-brand">
              <div className="navbar-logo">
                <HiDocumentText />
              </div>
              <span className="navbar-title">AI Resume Builder</span>
            </Link>
            <div className="nav-links">
                <Link
                  to="/home"
                  className={`nav-link ${location.pathname === '/home' ? 'nav-link-active' : ''}`}
                >
                  Home
                </Link>
                <Link
                  to="/templates"
                  className={`nav-link ${location.pathname === '/templates' ? 'nav-link-active' : ''}`}
                >
                  Templates
                </Link>
                <Link
                  to="/dashboard"
                  className={`nav-link ${location.pathname === '/dashboard' ? 'nav-link-active' : ''}`}
                >
                  Dashboard
                </Link>
              </div>
          </>
        )}
        {title && (
          <>
            <span className="navbar-breadcrumb">/</span>
            <span className="navbar-page-title">{title}</span>
          </>
        )}
      </div>

      <div className="flex-row items-center gap-md">
      </div>
    </nav>
  );
}

export default Navbar;
