
import { useEffect, useRef, useState } from "react";
import type { ReactNode, CSSProperties, MouseEvent } from "react";

type IconProps = {
  size?: number;
  className?: string;
};

const Svg = ({
  size = 24,
  className,
  children,
}: IconProps & { children: ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

const AwardIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="6" />
    <path d="m8.2 13-1.2 9 5-3 5 3-1.2-9" />
    <path d="m9.5 8 1.7 1.7L14.8 6" />
  </Svg>
);

const ArrowUpRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </Svg>
);

const ShieldCheckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
    <path d="m9 12 2 2 4-4" />
  </Svg>
);

const CloudIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 16.2A4.8 4.8 0 0 0 18 7h-1.1A7 7 0 0 0 3 10.5 4.5 4.5 0 0 0 4.5 19H18" />
    <path d="m9 14 3-3 3 3M12 11v8" />
  </Svg>
);

const certifications = [
  {
    title: "AWS Certified Solutions Architect – Associate",
    provider: "Amazon Web Services",
    description:
      "Certification covering AWS architecture principles and the design of secure, resilient, high-performing, and cost-optimized cloud solutions.",
    credentialUrl: "",
    status: "CERTIFIED",
    category: "CLOUD COMPUTING",
    accent: "#8b5cf6",
    secondary: "#14d9c5",
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setMouse({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="cert-section relative overflow-hidden bg-[#07060f] py-24 text-white sm:py-32"
    >
      <style>{`
        .cert-dots {
          background-image: radial-gradient(
            rgba(139, 92, 246, 0.15) 1px,
            transparent 1px
          );
          background-size: 30px 30px;
        }

        .cert-gradient-text {
          background: linear-gradient(
            110deg,
            #ffffff 5%,
            #c4b5fd 38%,
            #ff8a65 68%,
            #5eead4 100%
          );
          background-size: 220% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: cert-gradient 7s ease-in-out infinite alternate;
        }

        @keyframes cert-gradient {
          from { background-position: 0% center; }
          to { background-position: 100% center; }
        }

        .cert-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 800ms ease, transform 800ms ease;
        }

        .cert-reveal.cert-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .cert-card {
          isolation: isolate;
          background: linear-gradient(
            135deg,
            rgba(18, 16, 34, 0.97),
            rgba(10, 9, 20, 0.98)
          );
          transition:
            transform 350ms ease,
            border-color 350ms ease,
            box-shadow 350ms ease;
        }

        .cert-card:hover {
          transform: translateY(-5px);
          border-color: rgba(139, 92, 246, 0.48);
          box-shadow:
            0 25px 80px rgba(0, 0, 0, 0.3),
            0 0 45px rgba(139, 92, 246, 0.09);
        }

        .cert-card-glow {
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          opacity: 0;
          background: radial-gradient(
            450px circle at var(--cert-mx, 50%) var(--cert-my, 50%),
            rgba(139, 92, 246, 0.13),
            transparent 65%
          );
          transition: opacity 350ms ease;
        }

        .cert-card:hover .cert-card-glow {
          opacity: 1;
        }

        .cert-shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(167, 139, 250, 0.9),
            rgba(20, 217, 197, 0.7),
            transparent
          );
          transition: left 800ms ease;
        }

        .cert-card:hover .cert-shimmer {
          left: 130%;
        }

        .cert-icon-box {
          background: linear-gradient(
            145deg,
            rgba(139, 92, 246, 0.22),
            rgba(20, 217, 197, 0.08)
          );
          box-shadow:
            inset 0 0 0 1px rgba(167, 139, 250, 0.2),
            0 0 35px rgba(139, 92, 246, 0.08);
          transition: transform 350ms ease, box-shadow 350ms ease;
        }

        .cert-card:hover .cert-icon-box {
          transform: rotate(-4deg) scale(1.04);
          box-shadow:
            inset 0 0 0 1px rgba(167, 139, 250, 0.38),
            0 0 35px rgba(139, 92, 246, 0.2);
        }

        .cert-status {
          border: 1px solid rgba(20, 217, 197, 0.25);
          background: rgba(20, 217, 197, 0.07);
          color: #99f6e4;
        }

        .cert-detail {
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.025);
          transition: border-color 300ms ease, background 300ms ease;
        }

        .cert-card:hover .cert-detail {
          border-color: rgba(139, 92, 246, 0.2);
          background: rgba(139, 92, 246, 0.04);
        }

        @media (prefers-reduced-motion: reduce) {
          .cert-gradient-text { animation: none; }
          .cert-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
          .cert-card, .cert-icon-box { transition: none; }
        }
      `}</style>

      {/* Background */}
      <div className="cert-dots pointer-events-none absolute inset-0 opacity-50" />

      <div
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full blur-[130px]"
        style={{ background: "rgba(139,92,246,0.10)" }}
      />

      <div
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full blur-[130px]"
        style={{ background: "rgba(20,217,197,0.07)" }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        <div
          className={`cert-reveal ${
            inView ? "cert-visible" : ""
          } mx-auto max-w-3xl text-center`}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.07] px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
            </span>

            <span className="text-xs font-bold uppercase tracking-[0.22em] text-violet-200">
              Certifications & Credentials
            </span>
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Learning beyond
            <br />
            <span className="cert-gradient-text">the classroom.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            Professional certifications that complement my software
            development foundation and cloud computing knowledge.
          </p>

          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-violet-400/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-teal-300/70" />
          </div>
        </div>

        {/* Certification cards */}
        <div className="mx-auto mt-14 max-w-4xl space-y-6 sm:mt-16">
          {certifications.map((certification, index) => (
            <article
              key={certification.title}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
              onMouseMove={handleMouseMove}
              style={
                {
                  "--cert-mx": `${mouse.x}%`,
                  "--cert-my": `${mouse.y}%`,
                  "--cert-accent": certification.accent,
                  "--cert-secondary": certification.secondary,
                  transitionDelay: `${index * 150}ms`,
                } as CSSProperties
              }
              className={`cert-card cert-reveal ${
                inView ? "cert-visible" : ""
              } relative overflow-hidden rounded-3xl border border-white/[0.09] p-6 sm:p-9 lg:p-10`}
            >
              <div className="cert-card-glow" />
              <div className="cert-shimmer" />

              {/* Soft decorative orb */}
              <div
                className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full blur-[90px] transition-opacity duration-500"
                style={{
                  background: certification.accent,
                  opacity: activeCard === index ? 0.12 : 0.05,
                }}
              />

              <div className="relative flex flex-col gap-7 sm:flex-row sm:gap-8">
                {/* Certification icon */}
                <div className="flex shrink-0 items-start">
                  <div className="cert-icon-box flex h-16 w-16 items-center justify-center rounded-2xl text-violet-200 sm:h-20 sm:w-20">
                    <AwardIcon size={36} />
                  </div>
                </div>

                {/* Certification information */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="cert-status inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold tracking-[0.15em] sm:text-xs">
                      <ShieldCheckIcon size={14} />
                      {certification.status}
                    </span>

                    <span className="rounded-full border border-violet-400/20 bg-violet-400/[0.06] px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] text-violet-200 sm:text-xs">
                      {certification.category}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-extrabold leading-snug tracking-tight text-white sm:text-3xl">
                    {certification.title}
                  </h3>

                  <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-violet-200 sm:text-base">
                    <CloudIcon size={18} />
                    {certification.provider}
                  </p>

                  <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">
                    {certification.description}
                  </p>

                  {/* Credential link only appears when supplied */}
                  {certification.credentialUrl ? (
                    <a
                      href={certification.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 rounded-xl border border-violet-400/25 bg-violet-400/[0.07] px-4 py-3 text-sm font-bold text-violet-200 transition-all duration-300 hover:border-violet-300/50 hover:bg-violet-400/[0.13] hover:text-white"
                    >
                      View credential
                      <ArrowUpRight size={17} />
                    </a>
                  ) : (
                    <p className="mt-5 text-xs text-slate-500">
                      Add your credential verification URL to enable the
                      verification link.
                    </p>
                  )}
                </div>

                <div className="absolute right-0 top-0 hidden text-slate-600 transition-colors duration-300 sm:block">
                  <ArrowUpRight
                    size={22}
                    className={
                      activeCard === index ? "text-violet-300" : ""
                    }
                  />
                </div>
              </div>

              {/* Bottom accent */}
              <div className="mt-8 h-px w-full bg-gradient-to-r from-violet-400/40 via-white/[0.06] to-teal-300/30" />

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Professional Development
                </span>

                <span className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-300" />
                  Cloud Architecture
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Closing note */}
        <div
          className={`cert-reveal ${
            inView ? "cert-visible" : ""
          } mx-auto mt-10 flex max-w-4xl flex-col items-start justify-between gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6 py-5 sm:flex-row sm:items-center`}
          style={{ transitionDelay: "180ms" }}
        >
          <div>
            <p className="text-sm font-semibold text-slate-200">
              Skills backed by continuous learning.
            </p>
            <p className="mt-1 text-xs leading-6 text-slate-500 sm:text-sm">
              Exploring cloud technologies and building practical software
              development experience.
            </p>
          </div>

          <a
            href="#projects"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-violet-300 transition-colors hover:text-teal-200"
          >
            Explore my projects
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
