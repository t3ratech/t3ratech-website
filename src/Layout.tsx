import { useEffect, useRef, useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  ArrowUpRight,
  Bot,
  ChevronDown,
  Facebook,
  FileText,
  type LucideIcon,
  Target,
  Github,
  Globe2,
  Linkedin,
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

const desktopQuery = "(min-width: 1080px)";
const productIcons: Record<string, LucideIcon> = {
  "/extensions": Monitor,
  "/mcp": Bot,
  "/t3rnel-intelligence": Target,
  "/document-intelligence": FileText,
};

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
  const location = useLocation();
  const { pathname } = location;
  const [isMobile, setIsMobile] = useState(() => !window.matchMedia(desktopQuery).matches);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  const closeNavigation = () => {
    if (isMobileMenuOpen) {
      menuToggleRef.current?.focus();
    } else if (dropdownRef.current?.contains(document.activeElement)) {
      dropdownTriggerRef.current?.focus();
    }
    setIsMobileMenuOpen(false);
    setIsProductsOpen(false);
  };

  useEffect(() => {
    const media = window.matchMedia(desktopQuery);
    const updateViewport = () => {
      const focused = document.activeElement;
      if (media.matches && focused === menuToggleRef.current) {
        navigationRef.current?.querySelector<HTMLAnchorElement>("a[href]")?.focus();
      } else if (!media.matches && navigationRef.current?.contains(focused)) {
        menuToggleRef.current?.focus();
      } else if (dropdownRef.current?.contains(focused)) {
        dropdownTriggerRef.current?.focus();
      }
      setIsMobile(!media.matches);
      setIsMobileMenuOpen(false);
      setIsProductsOpen(false);
    };
    media.addEventListener("change", updateViewport);
    return () => media.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    if (navigationRef.current?.contains(document.activeElement)) {
      if (!window.matchMedia(desktopQuery).matches) {
        menuToggleRef.current?.focus();
      } else if (dropdownRef.current?.contains(document.activeElement)) {
        dropdownTriggerRef.current?.focus();
      }
    }
    setIsMobileMenuOpen(false);
    setIsProductsOpen(false);
  }, [location.key]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const background = [mainRef.current, footerRef.current].map((element) => ({
      element,
      inert: element?.getAttribute("inert"),
    }));
    const bodyOverflow = document.body.style.overflow;
    background.forEach(({ element }) => element?.setAttribute("inert", ""));
    document.body.style.overflow = "hidden";
    navigationRef.current?.querySelector<HTMLAnchorElement>("a[href]")?.focus({ preventScroll: true });
    return () => {
      background.forEach(({ element, inert }) => {
        if (inert == null) element?.removeAttribute("inert");
        else element?.setAttribute("inert", inert);
      });
      document.body.style.overflow = bodyOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen && !isProductsOpen) return;
    const closeOnPointer = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) return;
      if (isMobileMenuOpen && !headerRef.current?.contains(event.target)) {
        setIsMobileMenuOpen(false);
        setIsProductsOpen(false);
        menuToggleRef.current?.focus();
      } else if (isProductsOpen && !dropdownRef.current?.contains(event.target)) {
        if (dropdownRef.current?.contains(document.activeElement)) dropdownTriggerRef.current?.focus();
        setIsProductsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsProductsOpen(false);
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
          menuToggleRef.current?.focus();
        } else {
          dropdownTriggerRef.current?.focus();
        }
      } else if (event.key === "Tab" && isMobileMenuOpen) {
        const controls = Array.from(headerRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []).filter((element) => !element.closest("[hidden]") && element.getClientRects().length > 0
          && window.getComputedStyle(element).visibility !== "hidden");
        const index = controls.indexOf(document.activeElement as HTMLElement);
        if (index === -1 || (event.shiftKey ? index === 0 : index === controls.length - 1)) {
          event.preventDefault();
          (event.shiftKey ? controls[controls.length - 1] : controls[0])?.focus();
        }
      }
    };
    const containFocus = (event: FocusEvent) => {
      if (isMobileMenuOpen && event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        menuToggleRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOnPointer, true);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", containFocus);
    return () => {
      document.removeEventListener("pointerdown", closeOnPointer, true);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", containFocus);
    };
  }, [isMobileMenuOpen, isProductsOpen]);

  return (
    <>
      <ScrollToTop />
      <header ref={headerRef} className={`site-header ${isMobileMenuOpen ? "menu-open" : ""}`} aria-label="Primary">
        <Link className="brand" to="/" aria-label="T3raTech home" onClick={closeNavigation} aria-current={pathname === "/" ? "page" : undefined}>
          <span className="brand-mark" aria-hidden="true">
            <img src="/assets/t3ratech-logo-white.png" alt="" />
          </span>
          <span>T3raTech</span>
        </Link>
        <div className="header-actions">
          <nav ref={navigationRef} className="nav-links" id="primary-navigation" aria-label="Primary navigation" hidden={isMobile && !isMobileMenuOpen}>
            {buildNavGroups(navItems).map((group) =>
              group.type === "link" ? (
                <Link
                  to={group.item.path}
                  key={group.item.path}
                  className={pathname === group.item.path ? "active" : undefined}
                  aria-current={pathname === group.item.path ? "page" : undefined}
                  onClick={closeNavigation}
                >
                  {group.item.label}
                </Link>
              ) : (
                <div
                  className="nav-dropdown"
                  key={group.label}
                  ref={dropdownRef}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) setIsProductsOpen(false);
                  }}
                >
                  <button
                    ref={dropdownTriggerRef}
                    type="button"
                    className={group.items.some((item) => item.path === pathname) ? "active" : undefined}
                    aria-expanded={isProductsOpen}
                    aria-controls="product-navigation"
                    onClick={() => setIsProductsOpen((isOpen) => !isOpen)}
                  >
                    {group.label}
                    <ChevronDown size={14} strokeWidth={2.2} aria-hidden="true" />
                  </button>
                  <div className="nav-dropdown-content" id="product-navigation" hidden={!isProductsOpen}>
                    {group.items.map((item) => {
                      const Icon = productIcons[item.path];
                      return (
                        <Link
                          to={item.path}
                          key={item.path}
                          className={pathname === item.path ? "active" : undefined}
                          aria-current={pathname === item.path ? "page" : undefined}
                          onClick={closeNavigation}
                        >
                          {Icon && <Icon size={20} strokeWidth={1.6} aria-hidden="true" />}
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
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
            ref={menuToggleRef}
            onClick={() => {
              if (isMobileMenuOpen) closeNavigation();
              else setIsMobileMenuOpen(true);
            }}
            type="button"
          >
            {isMobileMenuOpen ? <X size={22} strokeWidth={2.2} /> : <Menu size={22} strokeWidth={2.2} />}
          </button>
        </div>
      </header>

      <main ref={mainRef}>
        <Outlet />
      </main>

      <footer className="site-footer" ref={footerRef}>
        <div className="section-inner footer-grid">
          <div>
            <Link className="brand footer-brand" to="/" aria-label="T3raTech home">
              <span className="brand-mark" aria-hidden="true">
                <img src="/assets/t3ratech-logo-white.png" alt="" />
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
            <a href="https://www.facebook.com/t3ratech" target="_blank" rel="noreferrer">
              <Facebook size={16} strokeWidth={2.1} />
              Facebook
            </a>
            <a href="https://www.linkedin.com/company/t3ratech" target="_blank" rel="noreferrer">
              <Linkedin size={16} strokeWidth={2.1} />
              LinkedIn
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
