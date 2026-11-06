
import { useEffect, useMemo, useRef, useState } from "react";

type NavItem = {
  id: string;
  label: string;
  hint: string;
  icon: string;
};

const items: NavItem[] = [
  {
    id: "about",
    label: "About",
    hint: "Get to know me",
    icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2|M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  },
  {
    id: "skills",
    label: "Skills",
    hint: "Technologies and tools",
    icon: "m13 2-9 12h7l-1 8 9-12h-7z",
  },
  {
    id: "projects",
    label: "Projects",
    hint: "Explore my work",
    icon: "M3 3h7v7H3z|M14 3h7v7h-7z|M14 14h7v7h-7z|M3 14h7v7H3z",
  },
  {
    id: "experience",
    label: "Experience",
    hint: "My professional journey",
    icon: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16|M2 8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z",
  },
  {
    id: "education",
    label: "Education",
    hint: "Academic background",
    icon: "M22 10 12 5 2 10l10 5 10-5z|M6 12v5c4 3 8 3 12 0v-5|M22 10v6",
  },
  {
    id: "certifications",
    label: "Certifications",
    hint: "Credentials and learning",
    icon: "M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z|m8.5 14-1 8 4.5-3 4.5 3-1-8",
  },
  {
    id: "contact",
    label: "Contact",
    hint: "Let's build something",
    icon: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z|m22 7-10 6L2 7",
  },
];

const allItems: NavItem[] = [
  {
    id: "home",
    label: "Home",
    hint: "Back to the top",
    icon: "m3 11 9-8 9 8|M5 10v10h14V10",
  },
  ...items,
];

function Icon({
  d,
  size = 18,
}: {
  d: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {d.split("|").map((path, index) => (
        <path key={index} d={path} />
      ))}
    </svg>
  );
}

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [isMac, setIsMac] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    return q
      ? allItems.filter((item) =>
          `${item.label} ${item.hint}`.toLowerCase().includes(q)
        )
      : allItems;
  }, [query]);

  const go = (id: string) => {
    setMobileOpen(false);
    setSearchOpen(false);
    setQuery("");

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

  // Scroll progress and navbar background
  useEffect(() => {
    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;

      setProgress(
        scrollable > 0
          ? Math.min(100, (window.scrollY / scrollable) * 100)
          : 0
      );

      setScrolled(window.scrollY > 24);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track the currently visible section
  useEffect(() => {
    const sectionIds = [
      "home",
      ...items.map((item) => item.id),
    ];

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio
          );

        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.15, 0.35, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) &&
          event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((value) => !value);
        setMobileOpen(false);
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Focus the search field and lock background scrolling
  useEffect(() => {
    if (!searchOpen) return;

    setQuery("");
    setCursor(0);

    const timeout = window.setTimeout(
      () => inputRef.current?.focus(),
      50
    );

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = previousOverflow;
    };
  }, [searchOpen]);

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();

      setCursor((current) =>
        results.length ? (current + 1) % results.length : 0
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();

      setCursor((current) =>
        results.length
          ? (current - 1 + results.length) % results.length
          : 0
      );
    } else if (event.key === "Enter" && results[cursor]) {
      go(results[cursor].id);
    }
  };

  return (
    <>
      <style>{`
        @keyframes navGradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes navFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes navPop {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes navGlow {
          0%, 100% { opacity: .4; }
          50% { opacity: .85; }
        }

        .nav-gradient {
          background: linear-gradient(
            110deg,
            #8b5cf6,
            #ff6a3d,
            #14d9c5,
            #8b5cf6
          );
          background-size: 250% 250%;
          animation: navGradient 7s ease infinite;
        }

        .nav-scrollbar::-webkit-scrollbar {
          width: 5px;
        }

        .nav-scrollbar::-webkit-scrollbar-thumb {
          background: #3b3156;
          border-radius: 10px;
        }

        .nav-link {
          position: relative;
          isolation: isolate;
        }

        .nav-link::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          border-radius: 999px;
          background: rgba(139, 92, 246, .13);
          opacity: 0;
          transform: scale(.9);
          transition: .25s ease;
        }

        .nav-link:hover::before,
        .nav-link[data-active="true"]::before {
          opacity: 1;
          transform: scale(1);
        }

        @media (prefers-reduced-motion: reduce) {
          .nav-gradient {
            animation: none;
          }
        }
      `}</style>

      {/* Top navigation */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/[0.07] bg-[#080710]/90 py-2.5 shadow-[0_12px_45px_rgba(0,0,0,.25)] backdrop-blur-2xl"
            : "bg-transparent py-4"
        }`}
      >
        {/* Scroll progress */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-white/[0.04]">
          <div
            className="nav-gradient h-full transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        <nav
          className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <button
            type="button"
            onClick={() => go("home")}
            className="group flex shrink-0 items-center gap-2.5 text-left sm:gap-3"
            aria-label="Aishwarya Swain, back to home"
          >
            <span className="relative flex h-10 w-10 items-center justify-center sm:h-11 sm:w-11">
              <svg
                className="-rotate-90"
                viewBox="0 0 44 44"
                width="100%"
                height="100%"
                aria-hidden="true"
              >
                <circle
                  cx="22"
                  cy="22"
                  r="19"
                  fill="none"
                  stroke="rgba(255,255,255,.1)"
                  strokeWidth="2"
                />
                <circle
                  cx="22"
                  cy="22"
                  r="19"
                  fill="none"
                  stroke="url(#portfolioRing)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 19}
                  strokeDashoffset={
                    2 * Math.PI * 19 * (1 - progress / 100)
                  }
                />
                <defs>
                  <linearGradient
                    id="portfolioRing"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="50%" stopColor="#ff6a3d" />
                    <stop offset="100%" stopColor="#14d9c5" />
                  </linearGradient>
                </defs>
              </svg>

              <span className="absolute flex h-8 w-8 items-center justify-center rounded-full bg-[#151121] text-[11px] font-black tracking-tight text-white transition duration-300 group-hover:scale-90 sm:h-9 sm:w-9">
                <span className="bg-gradient-to-r from-violet-400 via-orange-400 to-teal-300 bg-clip-text text-transparent">
                  AS
                </span>
              </span>
            </span>

            <span className="hidden sm:block">
              <span className="block text-sm font-bold tracking-wide text-white">
                Aishwarya{" "}
                <span className="text-violet-300">Swain</span>
              </span>
              <span className="mt-0.5 block text-[10px] font-medium tracking-[.17em] text-white/40">
                SOFTWARE DEVELOPER
              </span>
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.035] p-1.5 backdrop-blur-xl lg:flex">
            {items.map((item) => {
              const isActive = active === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(item.id)}
                  data-active={isActive}
                  aria-current={isActive ? "location" : undefined}
                  className={`nav-link rounded-full px-3 py-2 text-[12px] font-medium transition-colors duration-200 xl:px-3.5 xl:text-[13px] ${
                    isActive
                      ? "text-white"
                      : "text-white/55 hover:text-white"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="nav-gradient absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search portfolio sections"
              className="flex h-10 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 text-white/65 transition hover:border-violet-400/40 hover:bg-violet-400/10 hover:text-white"
            >
              <Icon
                d="M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z|m21 21-4.35-4.35"
                size={16}
              />
              <span className="hidden text-xs sm:inline">Search</span>
              <kbd className="hidden rounded-md border border-white/10 bg-black/20 px-1.5 py-0.5 text-[10px] text-white/35 xl:inline">
                {isMac ? "⌘" : "Ctrl"} K
              </kbd>
            </button>

            <button
              type="button"
              onClick={() => go("contact")}
              className="nav-gradient hidden items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold text-white shadow-[0_0_25px_rgba(139,92,246,.16)] transition hover:scale-[1.04] active:scale-95 sm:flex"
            >
              Let&apos;s Talk
              <Icon d="M5 12h14|m12 5 7 7-7 7" size={15} />
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition hover:border-violet-400/40 sm:hidden"
            >
              {mobileOpen ? (
                <Icon d="M18 6 6 18|m6 6 12 12" size={19} />
              ) : (
                <Icon d="M4 7h16|M4 12h16|M4 17h16" size={19} />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="absolute inset-x-3 top-full mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#100d1c]/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:inset-x-5 lg:hidden">
            <div className="mb-2 px-3 py-2">
              <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-violet-300">
                Navigation
              </p>
              <p className="mt-1 text-xs text-white/40">
                Explore my portfolio
              </p>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {allItems.map((item) => {
                const isActive = active === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => go(item.id)}
                    className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
                      isActive
                        ? "border-violet-400/25 bg-violet-400/10 text-white"
                        : "border-transparent text-white/60 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        isActive
                          ? "bg-violet-400/15 text-violet-300"
                          : "bg-white/[0.05] text-white/45"
                      }`}
                    >
                      <Icon d={item.icon} size={17} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block truncate text-[10px] text-white/35">
                        {item.hint}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                setSearchOpen(true);
              }}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-xs font-medium text-white/60 transition hover:bg-white/[0.04] hover:text-white"
            >
              <Icon d="M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z|m21 21-4.35-4.35" size={15} />
              Search sections
            </button>
          </div>
        )}
      </header>

      {/* Mobile bottom navigation */}
      <nav
        className="fixed inset-x-3 bottom-3 z-40 rounded-2xl border border-white/10 bg-[#100d1c]/90 p-1.5 shadow-[0_12px_45px_rgba(0,0,0,.45)] backdrop-blur-2xl sm:inset-x-auto sm:bottom-5 sm:left-1/2 sm:w-[min(500px,calc(100%-32px))] sm:-translate-x-1/2 lg:hidden"
        aria-label="Mobile section navigation"
      >
        <div className="grid grid-cols-5 gap-1">
          {[
            items[0],
            items[1],
            items[2],
            items[3],
            items[6],
          ].map((item) => {
            const isActive = active === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                aria-label={item.label}
                aria-current={isActive ? "location" : undefined}
                className={`relative flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl py-2.5 transition duration-200 ${
                  isActive
                    ? "bg-violet-400/15 text-violet-200"
                    : "text-white/45 hover:bg-white/[0.04] hover:text-white/80"
                }`}
              >
                {isActive && (
                  <span className="nav-gradient absolute inset-x-3 top-0 h-[2px] rounded-full" />
                )}
                <Icon d={item.icon} size={18} />
                <span className="truncate text-[9px] font-semibold sm:text-[10px]">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Quick search / command palette */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/65 px-3 pt-[12vh] backdrop-blur-md sm:px-5"
          style={{ animation: "navFade .18s ease-out" }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSearchOpen(false);
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Quick navigation search"
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#100d1c] shadow-[0_25px_100px_rgba(0,0,0,.65)]"
            style={{ animation: "navPop .2s ease-out" }}
          >
            <div className="flex items-center gap-3 border-b border-white/[0.07] px-4 py-4 sm:px-5">
              <span className="text-violet-300">
                <Icon
                  d="M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16z|m21 21-4.35-4.35"
                  size={19}
                />
              </span>

              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setCursor(0);
                }}
                onKeyDown={handleSearchKeyDown}
                placeholder="Jump to a section..."
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/30"
                aria-label="Search sections"
                autoComplete="off"
              />

              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="rounded-md border border-white/10 px-2 py-1 text-[10px] text-white/40 transition hover:text-white"
              >
                ESC
              </button>
            </div>

            <div className="nav-scrollbar max-h-[55vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="px-4 py-10 text-center text-sm text-white/40">
                  No sections found. Try another keyword.
                </p>
              ) : (
                results.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onMouseEnter={() => setCursor(index)}
                    onClick={() => go(item.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                      index === cursor
                        ? "bg-violet-400/10"
                        : "hover:bg-white/[0.035]"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${
                        index === cursor
                          ? "border-violet-400/20 bg-violet-400/10 text-violet-300"
                          : "border-white/[0.06] bg-white/[0.03] text-white/45"
                      }`}
                    >
                      <Icon d={item.icon} size={18} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-white">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-xs text-white/40">
                        {item.hint}
                      </span>
                    </span>

                    {index === cursor && (
                      <span className="text-xs text-violet-300">↵</span>
                    )}
                  </button>
                ))
              )}
            </div>

            <div className="flex items-center justify-between border-t border-white/[0.07] bg-white/[0.02] px-4 py-3 text-[10px] text-white/35 sm:px-5">
              <span>↑ ↓ Navigate</span>
              <span>↵ Open section</span>
              <span>ESC Close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
