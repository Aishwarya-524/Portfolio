
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

type IconProps = {
  size?: number;
  className?: string;
};

const Svg = ({
  size = 18,
  className,
  children,
}: IconProps & { children: ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

const ArrowUpIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m5 12 7-7 7 7" />
    <path d="M12 19V5" />
  </Svg>
);

const ArrowRightIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </Svg>
);

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="footer-section relative overflow-hidden bg-[#07060f] text-white">
      <style>{`
        .footer-section {
          isolation: isolate;
        }

        .footer-dots {
          background-image: radial-gradient(
            rgba(139, 92, 246, 0.13) 1px,
            transparent 1px
          );
          background-size: 28px 28px;
        }

        .footer-brand {
          background: linear-gradient(
            110deg,
            #ffffff 5%,
            #c4b5fd 48%,
            #5eead4 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: background-position 400ms ease;
        }

        .footer-brand-link:hover .footer-brand {
          background-position: 100% center;
        }

        .footer-link {
          position: relative;
          transition: color 250ms ease;
        }

        .footer-link::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -5px;
          height: 1px;
          background: linear-gradient(90deg, #8b5cf6, #14d9c5);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 250ms ease;
        }

        .footer-link:hover::after {
          transform: scaleX(1);
        }

        .footer-top-button {
          transition:
            transform 250ms ease,
            border-color 250ms ease,
            background 250ms ease,
            box-shadow 250ms ease;
        }

        .footer-top-button:hover {
          transform: translateY(-3px);
          border-color: rgba(167, 139, 250, 0.5);
          background: rgba(139, 92, 246, 0.12);
          box-shadow: 0 0 28px rgba(139, 92, 246, 0.12);
        }

        .footer-accent {
          background: linear-gradient(
            90deg,
            transparent,
            #8b5cf6 25%,
            #ff6a3d 55%,
            #14d9c5 80%,
            transparent
          );
          background-size: 200% 100%;
          animation: footer-shimmer 8s linear infinite;
        }

        @keyframes footer-shimmer {
          from { background-position: 100% 0; }
          to { background-position: -100% 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .footer-accent { animation: none; }
          .footer-brand, .footer-link, .footer-top-button {
            transition: none;
          }
        }
      `}</style>

      {/* Decorative background */}
      <div className="footer-dots pointer-events-none absolute inset-0 -z-10 opacity-40" />

      <div
        className="pointer-events-none absolute -right-24 -top-32 -z-10 h-72 w-72 rounded-full blur-[120px]"
        style={{ background: "rgba(139,92,246,0.09)" }}
      />

      <div className="footer-accent h-px w-full opacity-80" />

      <div className="mx-auto max-w-7xl px-5 pb-7 pt-12 sm:px-8 sm:pt-16 lg:px-10">
        {/* Main footer */}
        <div className="flex flex-col justify-between gap-10 border-b border-white/[0.08] pb-10 lg:flex-row lg:items-start">
          {/* Brand */}
          <div className="max-w-sm">
            <a
              href="#home"
              className="footer-brand-link inline-flex flex-col rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
              aria-label="Aishwarya — Back to home"
            >
              <span className="text-2xl font-black tracking-tight sm:text-3xl">
                <span className="footer-brand">Aishwarya</span>
                <span className="text-violet-400">.</span>
              </span>

              <span className="mt-2 text-sm font-medium tracking-wide text-slate-400">
                Full Stack Developer
              </span>
            </a>

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-500">
              Turning ideas into thoughtful digital experiences through
              software development and continuous learning.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-teal-300/15 bg-teal-300/[0.04] px-3 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-300 opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-300" />
              </span>

              <span className="text-xs font-medium text-teal-200">
                Open to opportunities
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:pt-2">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              Explore
            </p>

            <nav
              aria-label="Footer navigation"
              className="flex max-w-xl flex-wrap gap-x-7 gap-y-5"
            >
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="footer-link inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white focus-visible:outline-none focus-visible:text-violet-300"
                >
                  {link.label}
                  <ArrowRightIcon
                    size={12}
                    className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  />
                </a>
              ))}
            </nav>
          </div>

          {/* Back to top */}
          <div className="lg:pt-2">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              Navigation
            </p>

            <a
              href="#home"
              className="footer-top-button inline-flex items-center gap-3 rounded-xl border border-white/[0.10] bg-white/[0.03] px-4 py-3 text-sm font-semibold text-slate-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
            >
              Back to top
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-400/10 text-violet-200">
                <ArrowUpIcon size={16} />
              </span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Aishwarya Aswini Swain.
            <span className="ml-1">All rights reserved.</span>
          </p>

          <a
            href="mailto:aishwaryaswains524@gmail.com"
            className="inline-flex w-fit items-center gap-2 transition-colors hover:text-violet-300"
          >
            Built with curiosity
            <span className="text-base text-violet-400">✳</span>
          </a>
        </div>
      </div>

      {/* Floating back-to-top control */}
      <a
        href="#home"
        aria-label="Scroll back to top"
        title="Back to top"
        className={`footer-top-button fixed bottom-6 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/25 bg-[#100e1e]/95 text-violet-200 shadow-xl shadow-black/20 backdrop-blur-md sm:bottom-8 sm:right-8 ${
          showBackToTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <ArrowUpIcon size={19} />
      </a>
    </footer>
  );
}
