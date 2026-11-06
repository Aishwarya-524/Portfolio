
import { useEffect, useRef, useState } from "react";
import type { ReactNode, CSSProperties, MouseEvent } from "react";

/* ---------- Icons ---------- */

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
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {children}
  </svg>
);

const BriefcaseIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="7" width="18" height="14" rx="2" />
    <path d="M8 7V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3M3 12h18M10 12v2h4v-2" />
  </Svg>
);

const ArrowUpRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </Svg>
);

const CheckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m5 12 4 4L19 6" />
  </Svg>
);

const SparklesIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z" />
    <path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z" />
  </Svg>
);

/* ---------- Experience Data ---------- */

const experiences = [
  {
    role: "UI Designer Intern",
    company: "KAPSSN",
    location: "Bhubaneswar, Odisha",
    duration: "May 2023 – July 2023",
    type: "INTERNSHIP",
    description:
      "Worked on website interface design and improvements for a WordPress-based e-commerce experience.",
    responsibilities: [
      "Assisted with redesigning website pages and improving visual consistency.",
      "Worked on page layouts, navigation, and user interface elements.",
      "Focused on responsive design and a smoother shopping experience.",
    ],
    technologies: ["WordPress", "UI Design", "Responsive Design", "E-commerce"],
    accent: "#8b5cf6",
    secondary: "#14d9c5",
  },
];

/* ---------- Experience Component ---------- */

export default function Experience() {
  const rootRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleCardMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    event.currentTarget.style.setProperty(
      "--mouse-x",
      `${event.clientX - rect.left}px`
    );

    event.currentTarget.style.setProperty(
      "--mouse-y",
      `${event.clientY - rect.top}px`
    );
  };

  return (
    <>
      <style>{`
        .exp-section {
          background: #07060f;
        }

        @keyframes exp-gradient {
          to { background-position: 200% center; }
        }

        @keyframes exp-rise {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes exp-pulse {
          0%, 100% {
            box-shadow: 0 0 0 5px rgba(139,92,246,.08),
                        0 0 20px rgba(139,92,246,.15);
          }
          50% {
            box-shadow: 0 0 0 9px rgba(139,92,246,.04),
                        0 0 32px rgba(139,92,246,.3);
          }
        }

        @keyframes exp-flow {
          to { background-position: 0 200%; }
        }

        .exp-gradient-text {
          background: linear-gradient(
            90deg,
            #8b5cf6,
            #ff6a3d,
            #14d9c5,
            #8b5cf6
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: exp-gradient 7s linear infinite;
        }

        .exp-enter {
          opacity: 0;
          animation: exp-rise .85s cubic-bezier(.22,1,.36,1) forwards;
        }

        .exp-grid {
          background-image: radial-gradient(
            rgba(255,255,255,.08) 1px,
            transparent 1px
          );
          background-size: 26px 26px;
          mask-image: linear-gradient(to bottom, black, transparent 90%);
          -webkit-mask-image: linear-gradient(to bottom, black, transparent 90%);
        }

        .exp-card {
          background: rgba(255,255,255,.045);
          border: 1px solid rgba(255,255,255,.09);
          transition:
            border-color .35s ease,
            transform .35s ease,
            box-shadow .35s ease;
        }

        .exp-card:hover {
          border-color: rgba(139,92,246,.42);
          box-shadow: 0 25px 70px -40px rgba(139,92,246,.42);
          transform: translateY(-4px);
        }

        .exp-glow {
          background: radial-gradient(
            320px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            color-mix(in srgb, var(--exp-accent) 13%, transparent),
            transparent 72%
          );
        }

        .exp-timeline-line {
          background: linear-gradient(
            to bottom,
            #8b5cf6,
            #ff6a3d 50%,
            #14d9c5
          );
          background-size: 100% 200%;
          animation: exp-flow 8s linear infinite;
        }

        .exp-timeline-dot {
          animation: exp-pulse 3s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .exp-gradient-text,
          .exp-enter,
          .exp-timeline-line,
          .exp-timeline-dot {
            animation: none;
          }

          .exp-enter {
            opacity: 1;
          }

          .exp-card {
            transition: none;
          }
        }
      `}</style>

      <section
        id="experience"
        ref={rootRef}
        className="exp-section relative isolate overflow-hidden py-24 text-white sm:py-32"
      >
        {/* Background decoration */}

        <div className="exp-grid pointer-events-none absolute inset-0 -z-10" />

        <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-96 w-96 rounded-full bg-violet-500/15 blur-[120px]" />

        <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-teal-400/10 blur-[120px]" />

        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {/* Section heading */}

          <div
            className="exp-enter max-w-3xl"
            style={{
              animationPlayState: inView ? "running" : "paused",
            }}
          >
            <p className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-slate-400">
              <span className="h-[3px] w-10 rounded-full bg-gradient-to-r from-violet-500 via-orange-400 to-teal-400" />
              Professional journey
            </p>

            <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
              Learning through
              <span className="exp-gradient-text ml-3">real work.</span>
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              Every experience is an opportunity to learn, collaborate, and
              turn ideas into useful digital experiences.
            </p>
          </div>

          {/* Experience summary */}

          <div
            className="exp-enter mt-10 inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-xl"
            style={{
              animationDelay: ".12s",
              animationPlayState: inView ? "running" : "paused",
            }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
              <BriefcaseIcon size={24} />
            </div>

            <div>
              <p className="text-2xl font-extrabold text-white">
                {experiences.length.toString().padStart(2, "0")}
              </p>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Experience entry
              </p>
            </div>

            <span className="mx-2 h-9 w-px bg-white/10" />

            <div>
              <p className="text-sm font-bold text-teal-300">
                Hands-on learning
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Design & web experience
              </p>
            </div>
          </div>

          {/* Timeline */}

          <div className="relative mt-14">
            {/* Timeline line */}

            <div className="exp-timeline-line absolute bottom-8 left-[23px] top-8 hidden w-px opacity-60 md:block" />

            <div className="space-y-8">
              {experiences.map((experience, index) => (
                <article
                  key={`${experience.company}-${experience.role}`}
                  onMouseMove={handleCardMove}
                  className="exp-card exp-enter relative rounded-3xl p-6 sm:p-8 lg:p-10"
                  style={
                    {
                      "--exp-accent": experience.accent,
                      animationDelay: `${index * 0.15 + 0.2}s`,
                      animationPlayState: inView ? "running" : "paused",
                    } as CSSProperties
                  }
                >
                  {/* Mouse-following glow */}

                  <div className="exp-glow pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 hover:opacity-100" />

                  {/* Timeline marker */}

                  <div
                    className="exp-timeline-dot absolute -left-[1px] top-10 hidden h-3 w-3 rounded-full md:block"
                    style={{
                      background: experience.accent,
                    }}
                  />

                  <div className="relative grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                    {/* Role details */}

                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10"
                          style={{
                            color: experience.accent,
                            background: `${experience.accent}18`,
                            boxShadow: `0 0 30px -12px ${experience.accent}`,
                          }}
                        >
                          <BriefcaseIcon size={27} />
                        </div>

                        <span className="rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-[10px] font-bold tracking-[0.18em] text-violet-300">
                          {experience.type}
                        </span>
                      </div>

                      <h3 className="mt-7 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                        {experience.role}
                      </h3>

                      <p
                        className="mt-2 text-lg font-bold"
                        style={{ color: experience.accent }}
                      >
                        {experience.company}
                      </p>

                      <div className="mt-5 space-y-3 text-sm text-slate-400">
                        <p className="flex items-center gap-3">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                          {experience.duration}
                        </p>

                        <p className="flex items-center gap-3">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                          {experience.location}
                        </p>
                      </div>

                      <div className="mt-7 flex items-center gap-2 text-xs font-semibold text-slate-500">
                        <SparklesIcon size={16} />
                        Practical experience
                      </div>
                    </div>

                    {/* Role overview */}

                    <div className="lg:border-l lg:border-white/10 lg:pl-9">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                        Role overview
                      </p>

                      <p className="mt-4 text-sm leading-8 text-slate-400 sm:text-base">
                        {experience.description}
                      </p>

                      <h4 className="mt-7 flex items-center gap-2 font-bold text-white">
                        <CheckIcon size={18} className="text-teal-400" />
                        Key responsibilities
                      </h4>

                      <ul className="mt-5 space-y-4">
                        {experience.responsibilities.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-sm leading-7 text-slate-400"
                          >
                            <span
                              className="mt-2 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                              style={{
                                background: `${experience.accent}18`,
                                color: experience.accent,
                              }}
                            >
                              <CheckIcon size={12} />
                            </span>

                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Technologies */}

                      <div className="mt-8 border-t border-white/[0.08] pt-6">
                        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                          Focus areas
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((technology) => (
                            <span
                              key={technology}
                              className="rounded-lg border px-3 py-1.5 text-xs font-medium text-slate-300 transition duration-300 hover:-translate-y-0.5"
                              style={{
                                borderColor: `${experience.accent}35`,
                                background: `${experience.accent}09`,
                              }}
                            >
                              {technology}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Closing statement */}

          <div
            className="exp-enter mt-12 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:items-center sm:p-8"
            style={{
              animationDelay: ".4s",
              animationPlayState: inView ? "running" : "paused",
            }}
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300">
              <SparklesIcon size={22} />
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-white">
                Always learning. Always improving.
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-400">
                Looking forward to applying my skills, learning from
                experienced teams, and contributing to meaningful projects.
              </p>
            </div>

            <a
              href="#contact"
              aria-label="Contact me"
              className="hidden rounded-xl border border-white/10 p-3 text-slate-300 transition hover:border-violet-400/50 hover:text-white sm:inline-flex"
            >
              <ArrowUpRight size={20} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
