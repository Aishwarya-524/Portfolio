
import { useEffect, useRef, useState } from "react";
import type { ReactNode, MouseEvent, CSSProperties } from "react";

/* ---------- Icons ---------- */

type IconProps = {
  size?: number;
  className?: string;
};

const Svg = ({
  size = 20,
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

const ArrowUpRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </Svg>
);

const Github = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9 19c-5 1.5-5-2.5-7-3" />
    <path d="M16 22v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </Svg>
);

const Layers = (p: IconProps) => (
  <Svg {...p}>
    <path d="m12 2 9 5-9 5-9-5 9-5Z" />
    <path d="m3 12 9 5 9-5" />
    <path d="m3 17 9 5 9-5" />
  </Svg>
);

const Code = (p: IconProps) => (
  <Svg {...p}>
    <path d="m16 18 6-6-6-6" />
    <path d="m8 6-6 6 6 6" />
    <path d="m14 4-4 16" />
  </Svg>
);

const ExternalLink = (p: IconProps) => (
  <Svg {...p}>
    <path d="M14 3h7v7" />
    <path d="M10 14 21 3" />
    <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
  </Svg>
);

/* ---------- Project Data ---------- */

const projects = [
  {
    number: "01",
    title: "Employee360",
    category: "FULL STACK DEVELOPMENT",
    type: "Enterprise Application",
    description:
      "An employee management application concept focused on organizing employee information and supporting role-based access through a modern full-stack architecture.",
    technologies: [
      "Java",
      "Spring Boot",
      "React",
      "MySQL",
      "Spring Security",
      "JWT",
      "Docker",
    ],
    accent: "#8b5cf6",
    secondary: "#6366f1",
    icon: Layers,
    github: "",
    demo: "",
  },
  {
    number: "02",
    title: "City Discovery",
    category: "WEB DEVELOPMENT",
    type: "Discovery Platform",
    description:
      "A city discovery platform designed to help people explore tourist attractions, temples, restaurants, cafes, and interesting places through a responsive interface.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
    ],
    accent: "#14d9c5",
    secondary: "#0ea5e9",
    icon: Code,
    github: "",
    demo: "",
  },
  {
    number: "03",
    title: "Cloud-Based Chatbot",
    category: "CLOUD DEVELOPMENT",
    type: "Serverless Application",
    description:
      "A cloud-based conversational solution using AWS services to process user queries and connect application logic with scalable cloud storage.",
    technologies: [
      "Python",
      "AWS Lex",
      "AWS Lambda",
      "DynamoDB",
      "Amazon S3",
    ],
    accent: "#ff6a3d",
    secondary: "#f59e0b",
    icon: Layers,
    github: "",
    demo: "",
  },
  {
    number: "04",
    title: "Fashion Store",
    category: "FRONTEND DEVELOPMENT",
    type: "E-commerce Interface",
    description:
      "A responsive fashion storefront featuring product listings, search and filtering, and a shopping cart that retains its data using browser storage.",
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "LocalStorage",
    ],
    accent: "#ec4899",
    secondary: "#a855f7",
    icon: Code,
    github: "",
    demo: "",
  },
];

/* ---------- Component ---------- */

export default function Projects() {
  const rootRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

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
      { threshold: 0.08 }
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

  const filters = [
    "All",
    "Full Stack",
    "Web",
    "Cloud",
    "Frontend",
  ];

  const visibleProjects = projects.filter((project) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Full Stack") {
      return project.category.includes("FULL STACK");
    }
    if (activeFilter === "Web") {
      return project.title === "City Discovery";
    }
    if (activeFilter === "Cloud") {
      return project.category.includes("CLOUD");
    }
    if (activeFilter === "Frontend") {
      return project.title === "Fashion Store";
    }
    return true;
  });

  return (
    <>
      <style>{`
        .prj-section {
          --prj-bg: #07060f;
          background: var(--prj-bg);
        }

        @keyframes prj-gradient {
          to { background-position: 200% center; }
        }

        @keyframes prj-rise {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes prj-float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(22px, -20px); }
        }

        @keyframes prj-shine {
          0% { transform: translateX(-120%) skewX(-15deg); }
          100% { transform: translateX(220%) skewX(-15deg); }
        }

        .prj-gradient-text {
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
          animation: prj-gradient 7s linear infinite;
        }

        .prj-enter {
          opacity: 0;
          animation: prj-rise .8s cubic-bezier(.22, 1, .36, 1) forwards;
        }

        .prj-card {
          isolation: isolate;
          background: rgba(255, 255, 255, .055);
        }

        .prj-card::before {
          content: "";
          position: absolute;
          inset: 0;
          padding: 1px;
          border-radius: inherit;
          background: linear-gradient(
            135deg,
            var(--project-accent),
            rgba(255,255,255,.06) 45%,
            var(--project-secondary)
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          opacity: .55;
          transition: opacity .3s ease;
        }

        .prj-card:hover::before {
          opacity: 1;
        }

        .prj-card-glow {
          background: radial-gradient(
            300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            color-mix(in srgb, var(--project-accent) 18%, transparent),
            transparent 72%
          );
        }

        .prj-grid {
          background-image: radial-gradient(
            rgba(255,255,255,.09) 1px,
            transparent 1px
          );
          background-size: 26px 26px;
          mask-image: linear-gradient(to bottom, black, transparent 90%);
          -webkit-mask-image: linear-gradient(to bottom, black, transparent 90%);
        }

        .prj-shine {
          position: absolute;
          inset: 0 auto 0 0;
          width: 35%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,.08),
            transparent
          );
          transform: translateX(-120%) skewX(-15deg);
          pointer-events: none;
        }

        .prj-card:hover .prj-shine {
          animation: prj-shine .8s ease;
        }

        @media (prefers-reduced-motion: reduce) {
          .prj-gradient-text,
          .prj-enter,
          .prj-card:hover .prj-shine {
            animation: none;
          }

          .prj-enter {
            opacity: 1;
          }

          .prj-card,
          .prj-card * {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <section
        id="projects"
        ref={rootRef}
        className="prj-section relative isolate overflow-hidden py-24 text-white sm:py-32"
      >
        {/* Decorative background */}

        <div className="prj-grid pointer-events-none absolute inset-0 -z-10" />

        <div
          className="pointer-events-none absolute -left-32 top-24 -z-10 h-96 w-96 rounded-full blur-[120px]"
          style={{
            background: "rgba(139, 92, 246, .17)",
            animation: "prj-float 20s ease-in-out infinite",
          }}
        />

        <div
          className="pointer-events-none absolute -right-32 top-1/3 -z-10 h-96 w-96 rounded-full blur-[120px]"
          style={{
            background: "rgba(20, 217, 197, .12)",
            animation: "prj-float 24s ease-in-out infinite reverse",
          }}
        />

        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {/* Section heading */}

          <div
            className="prj-enter flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
            style={{ animationPlayState: inView ? "running" : "paused" }}
          >
            <div className="max-w-3xl">
              <p className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-slate-400">
                <span className="h-[3px] w-10 rounded-full bg-gradient-to-r from-violet-500 via-orange-400 to-teal-400" />
                Selected work
              </p>

              <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">
                Ideas into
                <span className="prj-gradient-text ml-3">applications.</span>
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                A collection of projects exploring full-stack engineering,
                modern web experiences, cloud services, and practical
                problem-solving.
              </p>
            </div>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3.5 font-semibold text-white transition duration-300 hover:border-violet-400/60 hover:bg-white/[0.08]"
            >
              <Github size={19} />
              Explore GitHub
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </a>
          </div>

          {/* Project statistics */}

          <div
            className="prj-enter mt-10 flex flex-wrap gap-3"
            style={{
              animationDelay: ".12s",
              animationPlayState: inView ? "running" : "paused",
            }}
          >
            <div className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur">
              <p className="prj-gradient-text text-2xl font-extrabold">
                0{projects.length}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-slate-500">
                Featured projects
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur">
              <p className="prj-gradient-text text-2xl font-extrabold">
                {new Set(projects.flatMap((p) => p.technologies)).size}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-slate-500">
                Technologies
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur">
              <p className="prj-gradient-text text-2xl font-extrabold">
                04
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-slate-500">
                Project areas
              </p>
            </div>
          </div>

          {/* Filter tabs */}

          <div
            className="prj-enter mt-10 flex flex-wrap gap-2"
            style={{
              animationDelay: ".2s",
              animationPlayState: inView ? "running" : "paused",
            }}
            aria-label="Filter projects"
          >
            {filters.map((filter) => {
              const selected = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={selected}
                  className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition duration-300 ${
                    selected
                      ? "border-transparent bg-white text-[#07060f] shadow-lg shadow-white/10"
                      : "border-white/10 bg-white/[0.035] text-slate-400 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Project cards */}

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {visibleProjects.map((project, index) => {
              const Icon = project.icon;

              return (
                <article
                  key={project.number}
                  onMouseMove={handleCardMove}
                  className="prj-card prj-enter group relative overflow-hidden rounded-3xl p-px transition duration-500 hover:-translate-y-1.5 hover:shadow-2xl"
                  style={
                    {
                      "--project-accent": project.accent,
                      "--project-secondary": project.secondary,
                      animationDelay: `${index * 0.1 + 0.25}s`,
                      animationPlayState: inView ? "running" : "paused",
                      boxShadow: `0 0 0 rgba(0,0,0,0)`,
                    } as CSSProperties
                  }
                >
                  <div className="prj-shine" />

                  <div className="relative h-full overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#0c0a17]/95 p-6 backdrop-blur-xl sm:p-8">
                    <div className="prj-card-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="relative">
                      {/* Card top row */}

                      <div className="flex items-start justify-between gap-4">
                        <div
                          className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 transition duration-500 group-hover:rotate-[-6deg] group-hover:scale-110"
                          style={{
                            color: project.accent,
                            background: `${project.accent}18`,
                            boxShadow: `0 0 35px -12px ${project.accent}`,
                          }}
                        >
                          <Icon size={27} />
                        </div>

                        <span className="font-mono text-sm font-bold tracking-widest text-slate-600">
                          / {project.number}
                        </span>
                      </div>

                      {/* Title */}

                      <div className="mt-7">
                        <p
                          className="text-xs font-bold uppercase tracking-[0.2em]"
                          style={{ color: project.accent }}
                        >
                          {project.category}
                        </p>

                        <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-white transition-colors duration-300 group-hover:text-slate-100 sm:text-3xl">
                          {project.title}
                        </h3>

                        <p className="mt-2 text-sm font-medium text-slate-500">
                          {project.type}
                        </p>
                      </div>

                      {/* Description */}

                      <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base">
                        {project.description}
                      </p>

                      {/* Technologies */}

                      <div className="mt-6">
                        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                          Built with
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((technology) => (
                            <span
                              key={technology}
                              className="rounded-lg border bg-white/[0.035] px-3 py-1.5 text-xs font-medium text-slate-300 transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
                              style={{
                                borderColor: `${project.accent}38`,
                              }}
                            >
                              {technology}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card footer */}

                      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-5">
                        <span className="flex items-center gap-2 text-xs font-medium text-slate-500">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{
                              background: project.accent,
                              boxShadow: `0 0 10px ${project.accent}`,
                            }}
                          />
                          Project overview
                        </span>

                        <div className="flex flex-wrap gap-3">
                          {project.github ? (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3.5 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-white/30 hover:text-white"
                            >
                              <Github size={16} />
                              Code
                            </a>
                          ) : (
                            <span
                              title="Add your GitHub repository URL to the project data"
                              className="inline-flex cursor-default items-center gap-2 rounded-lg border border-white/10 px-3.5 py-2.5 text-xs font-medium text-slate-500"
                            >
                              <Github size={15} />
                              Code soon
                            </span>
                          )}

                          {project.demo ? (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-[#07060f] transition hover:brightness-110"
                              style={{
                                background: project.accent,
                              }}
                            >
                              Live Demo
                              <ExternalLink size={15} />
                            </a>
                          ) : (
                            <span
                              title="Add your live demo URL to the project data"
                              className="inline-flex items-center gap-2 rounded-lg px-3.5 py-2.5 text-xs font-semibold text-slate-500"
                              style={{
                                background: `${project.accent}12`,
                              }}
                            >
                              Demo soon
                              <ArrowUpRight size={15} />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Bottom call to action */}

          <div
            className="prj-enter relative mt-12 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-7 sm:p-9"
            style={{
              animationDelay: ".5s",
              animationPlayState: inView ? "running" : "paused",
            }}
          >
            <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-violet-500/10 blur-[80px]" />

            <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Have an idea?
                </p>

                <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                  Let’s build something meaningful.
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Open to opportunities, collaboration, and learning.
                </p>
              </div>

              <a
                href="#contact"
                className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-xl bg-white px-5 py-3.5 font-bold text-[#07060f] transition duration-300 hover:bg-slate-200"
              >
                Let’s Talk
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
