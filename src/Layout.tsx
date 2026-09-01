import { useEffect, useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  ArrowUpRight,
  ChevronDown,
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
  type NavItem,
  navItems,
  socialLinks,
  themeOptions,
} from "./data";
import { useTheme } from "./hooks/useTheme";

type NavGroup =
  | { type: "link"; item: NavItem }
  | { type: "dropdown"; label: string; items: NavItem[] };

function buildNavGroups(items: NavItem[]): NavGroup[] {
  return items.reduce<NavGroup[]>((groups, item) => {
    if (item.group) {
      const tail = groups[groups.length - 1];
      if (tail && tail.type === "dropdown" && tail.label === item.group) {
        tail.items.push(item);
      } else {
        groups.push({ type: "dropdown", label: item.group, items: [item] });
      }
    } else {
      groups.push({ type: "link", item });
    }
    return groups;
  }, []);
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function Layout() {
  const { themePreference, setThemePreference } = useTheme();
  const { pathname } = useLocation();
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
            {buildNavGroups(navItems).map((group) =>
              group.type === "link" ? (
                <Link
                  to={group.item.path}
                  key={group.item.path}
                  className={pathname === group.item.path ? "active" : undefined}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {group.item.label}
                </Link>
              ) : (
                <details className="nav-dropdown" key={group.label}>
                  <summary>
                    {group.label}
                    <ChevronDown size={14} strokeWidth={2.2} aria-hidden="true" />
                  </summary>
                  <div className="nav-dropdown-content" role="menu">
                    {group.items.map((item) => (
                      <Link
                        to={item.path}
                        key={item.path}
                        className={pathname === item.path ? "active" : undefined}
                        onClick={() => setIsMobileMenuOpen(false)}
                        role="menuitem"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </details>
              )
            )}
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
