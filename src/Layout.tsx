import { useEffect, useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  ArrowUpRight,
  Github,
  Globe2,
  Menu,
  MessageSquareText,
  Palette,
  ShoppingBag,
  Sun,
  Moon,
  Monitor,
  Twitter,
  X,
} from "lucide-react";
import {
  navItems,
  socialLinks,
  themeOptions,
} from "./data";
import { useTheme } from "./hooks/useTheme";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function Layout() {
  const { themePreference, setThemePreference } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <ScrollToTop />
      <header className={`site-header ${isMobileMenuOpen ? "menu-open" : ""}`} aria-label="Primary">
        <Link className="brand" to="/" aria-label="T3raTech home">
          <span className="brand-mark" aria-hidden="true">
            <img src="/assets/t3ratech-tt-logo-visible.png" alt="" />
          </span>
          <span>T3raTech</span>
        </Link>
        <div className="header-actions">
          <nav className="nav-links" id="primary-navigation">
            {navItems.map((item) => (
              <Link to={item.path} key={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="theme-toggle" aria-label="Color mode">
            {themeOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  aria-label={`${option.label} mode`}
                  aria-pressed={themePreference === option.value}
                  className={themePreference === option.value ? "active" : undefined}
                  key={option.value}
                  onClick={() => setThemePreference(option.value)}
                  title={`${option.label} mode`}
                  type="button"
                >
                  <Icon size={17} strokeWidth={2.2} />
                </button>
              );
            })}
          </div>
          <button
            aria-controls="primary-navigation"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="menu-toggle"
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            type="button"
          >
            {isMobileMenuOpen ? <X size={22} strokeWidth={2.2} /> : <Menu size={22} strokeWidth={2.2} />}
          </button>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="section-inner footer-grid">
          <div>
            <Link className="brand footer-brand" to="/" aria-label="T3raTech home">
              <span className="brand-mark" aria-hidden="true">
                <img src="/assets/t3ratech-tt-logo-visible.png" alt="" />
              </span>
              <span>T3raTech Solutions</span>
            </Link>
            <p>Patriotism. Excellence. Innovation. Partnership.</p>
            <p className="footer-subtext">Developed and supported by T3raTech Solutions (Pvt) Ltd</p>
          </div>
          <div className="footer-links">
            <h4>Official Presence</h4>
            <a href="mailto:support@t3ratech.co.zw">
              <MessageSquareText size={16} strokeWidth={2.1} />
              support@t3ratech.co.zw
            </a>
            <a href="https://www.codester.com/t3ratech" target="_blank" rel="noreferrer">
              <ShoppingBag size={16} strokeWidth={2.1} />
              Codester Page
            </a>
            <a href="https://t3rnel.gumroad.com/" target="_blank" rel="noreferrer">
              <Globe2 size={16} strokeWidth={2.1} />
              Gumroad Shop
            </a>
            <a href="https://github.com/t3ratech" target="_blank" rel="noreferrer">
              <Github size={16} strokeWidth={2.1} />
              GitHub Repository
            </a>
            <a href="https://x.com/t3ratech" target="_blank" rel="noreferrer">
              <Twitter size={16} strokeWidth={2.1} />
              Twitter / X
            </a>
            <a href="https://www.reddit.com/user/t3ratech/" target="_blank" rel="noreferrer">
              <MessageSquareText size={16} strokeWidth={2.1} />
              Reddit Profile
            </a>
            <a href="https://opensea.io/collection/t3rnel-genesis" target="_blank" rel="noreferrer">
              <Palette size={16} strokeWidth={2.1} />
              OpenSea NFT Collection
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
