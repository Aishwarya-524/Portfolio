
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

const GraduationIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m22 10-10-5-10 5 10 5 10-5Z" />
    <path d="M6 12v5c3.5 3 8.5 3 12 0v-5" />
    <path d="M22 10v6" />
  </Svg>
);

const CalendarIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M16 3v4M8 3v4M3 11h18" />
    <path d="m9 16 2 2 4-4" />
  </Svg>
);

const AwardIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="6" />
    <path d="m8.2 13-1.2 8 5-3 5 3-1.2-8" />
    <path d="m9.5 8 1.7 1.7L14.8 6" />
  </Svg>
);

const ArrowIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 17 17 7M7 7h10v10" />
  </Svg>
);

const education = [
  {
    degree: "Bachelor of Technology",
    field: "Computer Science and Engineering",
    institution: "Centurion University of Technology and Management",
    duration: "October 2021 – April 2025",
    result: "8.56",
    resultLabel: "CGPA",
    accent: "#8b5cf6",
    secondary: "#14d9c5",
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
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
      id="education"
      ref={sectionRef}
      className="edu-section relative overflow-hidden bg-[#07060f] py-24 text-white sm:py-32"
    >
      <style>{`
        .edu-section {
          --edu-purple: #8b5cf6;
          --edu-orange: #ff6a3d;
          --edu-teal: #14d9c5;
        }

        .edu-dots {
          background-image: radial-gradient(
            rgba(139, 92, 246, 0.16) 1px,
            transparent 1px
          );
          background-size: 30px 30px;
        }

        .edu-gradient-text {
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
          animation: edu-gradient 7s ease-in-out infinite alternate;
        }

        @keyframes edu-gradient {
          from { background-position: 0% center; }
          to { background-position: 100% center; }
        }

        .edu-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 800ms ease, transform 800ms ease;
        }

        .edu-reveal.edu-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .edu-card {
          isolation: isolate;
          background:
            linear-gradient(135deg, rgba(18, 16, 34, 0.97), rgba(10, 9, 20, 0.98));
          transition:
            transform 350ms ease,
            border-color 350ms ease,
            box-shadow 350ms ease;
        }

        .edu-card:hover {
          transform: translateY(-5px);
          border-color: rgba(139, 92, 246, 0.5);
          box-shadow:
            0 25px 80px rgba(0, 0, 0, 0.3),
            0 0 45px rgba(139, 92, 246, 0.09);
        }

        .edu-card-glow {
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          opacity: 0;
          background: radial-gradient(
            450px circle at var(--edu-mx, 50%) var(--edu-my, 50%),
            rgba(139, 92, 246, 0.12),
            transparent 65%
          );
          transition: opacity 350ms ease;
        }

        .edu-card:hover .edu-card-glow {
          opacity: 1;
        }

        .edu-icon-box {
          background: linear-gradient(
            145deg,
            rgba(139, 92, 246, 0.2),
            rgba(20, 217, 197, 0.07)
          );
          box-shadow:
            inset 0 0 0 1px rgba(167, 139, 250, 0.18),
            0 0 35px rgba(139, 92, 246, 0.08);
          transition: transform 350ms ease, box-shadow 350ms ease;
        }

        .edu-card:hover .edu-icon-box {
          transform: rotate(-4deg) scale(1.04);
          box-shadow:
            inset 0 0 0 1px rgba(167, 139, 250, 0.35),
            0 0 35px rgba(139, 92, 246, 0.2);
        }

        .edu-shimmer {
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

        .edu-card:hover .edu-shimmer {
          left: 130%;
        }

        .edu-result {
          background: linear-gradient(
            135deg,
            rgba(139, 92, 246, 0.15),
            rgba(20, 217, 197, 0.08)
          );
          border: 1px solid rgba(167, 139, 250, 0.22);
        }

        @media (prefers-reduced-motion: reduce) {
          .edu-gradient-text { animation: none; }
          .edu-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
          .edu-card, .edu-icon-box {
            transition: none;
          }
        }
      `}</style>

      {/* Background effects */}
      <div className="edu-dots pointer-events-none absolute inset-0 opacity-50" />

      <div
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full blur-[130px]"
        style={{ background: "rgba(139,92,246,0.10)" }}
      />

      <div
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full blur-[130px]"
        style={{ background: "rgba(20,217,197,0.07)" }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section heading */}
        <div
          className={`edu-reveal ${inView ? "edu-visible" : ""} mx-auto max-w-3xl text-center`}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.07] px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
            </span>

            <span className="text-xs font-bold uppercase tracking-[0.22em] text-violet-200">
              Education & Learning
            </span>
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            The foundation
            <br />
            <span className="edu-gradient-text">behind my work.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            Building a strong foundation in computer science, problem-solving,
            and software development.
          </p>

          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-violet-400/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-teal-300/70" />
          </div>
        </div>

        {/* Education timeline */}
        <div className="mx-auto mt-14 max-w-4xl sm:mt-16">
          {education.map((item, index) => (
            <article
              key={item.degree}
              ref={cardRef}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onMouseMove={handleMouseMove}
              style={
                {
                  "--edu-mx": `${mouse.x}%`,
                  "--edu-my": `${mouse.y}%`,
                  "--edu-accent": item.accent,
                  "--edu-secondary": item.secondary,
                  transitionDelay: `${index * 150}ms`,
                } as CSSProperties
              }
              className={`edu-card edu-reveal ${
                inView ? "edu-visible" : ""
              } relative overflow-hidden rounded-3xl border border-white/[0.09] p-6 sm:p-9 lg:p-10`}
            >
              <div className="edu-card-glow" />
              <div className="edu-shimmer" />

              <div className="relative flex flex-col gap-7 sm:flex-row sm:gap-8">
                {/* Icon */}
                <div className="flex shrink-0 items-start">
                  <div className="edu-icon-box flex h-16 w-16 items-center justify-center rounded-2xl text-violet-200 sm:h-20 sm:w-20">
                    <GraduationIcon size={36} />
                  </div>
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.07] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-violet-200 sm:text-xs">
                      <CalendarIcon size={14} />
                      {item.duration}
                    </span>

                    <span className="rounded-full border border-teal-300/20 bg-teal-300/[0.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-teal-200 sm:text-xs">
                      Graduated · 2025
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                    {item.degree}
                  </h3>

                  <p className="mt-3 text-base font-semibold leading-relaxed text-violet-200 sm:text-lg">
                    {item.field}
                  </p>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                    {item.institution}
                  </p>

                  {/* Result and qualification */}
                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <div className="edu-result flex items-center gap-3 rounded-2xl px-4 py-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/10 text-violet-200">
                        <AwardIcon size={23} />
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Academic Result
                        </p>
                        <p className="mt-0.5 text-lg font-extrabold text-white">
                          {item.result}
                          <span className="ml-1.5 text-xs font-semibold text-teal-200">
                            {item.resultLabel}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-300" />
                      Computer Science Graduate
                    </div>
                  </div>
                </div>

                {/* Decorative arrow */}
                <div className="absolute right-0 top-0 hidden text-slate-600 transition-colors duration-300 sm:block">
                  <div
                    className={`transition-all duration-300 ${
                      hovered ? "translate-x-0.5 -translate-y-0.5 text-violet-300" : ""
                    }`}
                  >
                    <ArrowIcon size={22} />
                  </div>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="mt-8 h-px w-full bg-gradient-to-r from-violet-400/40 via-white/[0.06] to-teal-300/30" />

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Academic Journey
                </span>

                <span className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  2021
                  <span className="mx-1 h-px w-8 bg-slate-700" />
                  2025
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Closing note */}
        <div
          className={`edu-reveal ${
            inView ? "edu-visible" : ""
          } mx-auto mt-10 flex max-w-4xl flex-col items-start justify-between gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6 py-5 sm:flex-row sm:items-center`}
          style={{ transitionDelay: "180ms" }}
        >
          <div>
            <p className="text-sm font-semibold text-slate-200">
              Learning doesn't stop at graduation.
            </p>
            <p className="mt-1 text-xs leading-6 text-slate-500 sm:text-sm">
              Continuously developing my skills through hands-on projects and
              new technologies.
            </p>
          </div>

          <a
            href="#skills"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-violet-300 transition-colors hover:text-teal-200"
          >
            Explore my skills
            <ArrowIcon size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
