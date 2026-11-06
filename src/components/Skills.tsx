"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";

/* ---------- Icons ---------- */
type IconProps = { size?: number; className?: string };

const Svg = ({ size = 24, className, children }: IconProps & { children: ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {children}
  </svg>
);

const Code2 = (p: IconProps) => (
  <Svg {...p}><path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" /></Svg>
);
const Database = (p: IconProps) => (
  <Svg {...p}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14a9 3 0 0 0 18 0V5" />
    <path d="M3 12a9 3 0 0 0 18 0" />
  </Svg>
);
const Cloud = (p: IconProps) => (
  <Svg {...p}><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" /></Svg>
);
const Wrench = (p: IconProps) => (
  <Svg {...p}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
  </Svg>
);
const Layers3 = (p: IconProps) => (
  <Svg {...p}>
    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
    <path d="m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" />
    <path d="m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" />
  </Svg>
);
const Globe = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </Svg>
);

/* ---------- Data ---------- */
const COLORS = ["#8b5cf6", "#ff6a3d", "#14d9c5"];

const skillGroups = [
  {
    title: "Programming",
    icon: Code2,
    description: "Languages and problem-solving fundamentals",
    skills: ["Java", "JavaScript", "TypeScript", "SQL"],
  },
  {
    title: "Frontend",
    icon: Globe,
    description: "Responsive interfaces and web experiences",
    skills: ["HTML5", "CSS3", "React.js", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend",
    icon: Layers3,
    description: "Application logic and API development",
    skills: ["Node.js", "Express.js", "Spring Boot", "REST APIs"],
  },
  {
    title: "Databases",
    icon: Database,
    description: "Data modelling and persistence",
    skills: ["MySQL", "MongoDB", "Mongoose", "DynamoDB", "Firebase"],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    description: "Cloud services and deployment tools",
    skills: ["AWS Lambda", "Amazon S3", "Amazon EC2", "Docker"],
  },
  {
    title: "Tools & Concepts",
    icon: Wrench,
    description: "Development workflow and core concepts",
    skills: ["Git", "GitHub", "Maven", "OOP", "Hibernate", "JWT"],
  },
];

const totalSkills = skillGroups.reduce((n, g) => n + g.skills.length, 0);

/* ---------- Component ---------- */
export default function Skills() {
  const rootRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [filter, setFilter] = useState<string>("All");

  // Start animations when the section scrolls into view
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onCardMove = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  const visible = skillGroups
    .map((g, i) => ({ ...g, color: COLORS[i % 3] }))
    .filter((g) => filter === "All" || g.title === filter);

  const play = inView ? "running" : "paused";

  return (
    <>
      <style>{`
        .sk3{--c1:#8b5cf6;--c2:#ff6a3d;--c3:#14d9c5}
        @keyframes sk3Flow{to{background-position:200% center}}
        @keyframes sk3Blob{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(40px,-30px) scale(1.15)}}
        @keyframes sk3Rise{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}
        @keyframes sk3Pop{from{opacity:0;transform:scale(.7)}to{opacity:1;transform:none}}
        .sk3-grad{background:linear-gradient(90deg,var(--c1),var(--c2),var(--c3),var(--c1));background-size:200% auto;
          -webkit-background-clip:text;background-clip:text;color:transparent;animation:sk3Flow 6s linear infinite}
        .sk3-bar{background:linear-gradient(90deg,var(--c1),var(--c2),var(--c3))}
        .sk3-rise{opacity:0;animation:sk3Rise .9s cubic-bezier(.22,1,.36,1) forwards}
        .sk3-pop{opacity:0;animation:sk3Pop .45s cubic-bezier(.34,1.56,.64,1) forwards}
        .sk3-card{background:rgba(255,255,255,.08)}
        .sk3-card::before{content:"";position:absolute;inset:0;opacity:0;transition:opacity .3s;
          background:radial-gradient(260px circle at var(--x,50%) var(--y,50%),var(--accent),transparent 75%)}
        .sk3-card:hover::before{opacity:1}
        .sk3-glow{background:radial-gradient(320px circle at var(--x,50%) var(--y,50%),color-mix(in srgb,var(--accent) 16%,transparent),transparent 70%)}
        .sk3-dots{background-image:radial-gradient(rgba(255,255,255,.08) 1px,transparent 1px);background-size:26px 26px;
          mask-image:radial-gradient(ellipse 80% 70% at 50% 40%,#000 20%,transparent 75%);
          -webkit-mask-image:radial-gradient(ellipse 80% 70% at 50% 40%,#000 20%,transparent 75%)}
        @media (prefers-reduced-motion:reduce){
          .sk3-grad{animation:none}
          .sk3-rise,.sk3-pop{animation:none;opacity:1}
        }
      `}</style>

      <section
        id="skills"
        ref={rootRef}
        className="sk3 relative isolate overflow-hidden bg-[#07060f] py-24 text-white sm:py-32"
      >
        {/* Background */}
        <div className="sk3-dots pointer-events-none absolute inset-0 -z-10" />
        <div className="pointer-events-none absolute -right-32 top-0 -z-10 h-96 w-96 rounded-full bg-[#8b5cf6]/25 blur-[110px]"
          style={{ animation: "sk3Blob 22s ease-in-out infinite" }} />
        <div className="pointer-events-none absolute -left-32 top-1/2 -z-10 h-96 w-96 rounded-full bg-[#ff6a3d]/20 blur-[110px]"
          style={{ animation: "sk3Blob 26s ease-in-out infinite reverse" }} />
        <div className="pointer-events-none absolute bottom-0 right-1/4 -z-10 h-80 w-80 rounded-full bg-[#14d9c5]/15 blur-[110px]" />

        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {/* Header */}
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="sk3-rise max-w-2xl" style={{ animationPlayState: play }}>
              <p className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-slate-400">
                <span className="sk3-bar h-[3px] w-10 rounded-full" />
                Technical toolkit
              </p>
              <h2 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
                Skills I
                <span className="sk3-grad ml-3 pb-2">work with.</span>
              </h2>
              <p className="mt-5 leading-7 text-slate-400">
                Technologies I use and study to build applications across the frontend,
                backend, database, and cloud layers.
              </p>
            </div>

            <div className="sk3-rise flex items-center gap-6 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 backdrop-blur"
              style={{ animationDelay: ".15s", animationPlayState: play }}>
              <div>
                <p className="sk3-grad text-4xl font-extrabold leading-none">{totalSkills}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-slate-400">Technologies</p>
              </div>
              <span className="h-10 w-px bg-white/10" />
              <div>
                <p className="sk3-grad text-4xl font-extrabold leading-none">{skillGroups.length}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-slate-400">Categories</p>
              </div>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="sk3-rise mt-10 flex flex-wrap gap-2" style={{ animationDelay: ".25s", animationPlayState: play }}>
            {["All", ...skillGroups.map((g) => g.title)].map((t) => {
              const on = filter === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFilter(t)}
                  aria-pressed={on}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    on
                      ? "border-transparent bg-white text-[#07060f]"
                      : "border-white/15 bg-white/[0.04] text-slate-300 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>

          {/* Cards */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((group, i) => {
              const Icon = group.icon;
              return (
                <article
                  key={`${filter}-${group.title}`}
                  onMouseMove={onCardMove}
                  className="sk3-card sk3-rise group relative overflow-hidden rounded-3xl p-px transition duration-300 hover:-translate-y-1.5"
                  style={
                    {
                      "--accent": group.color,
                      animationDelay: `${i * 0.08}s`,
                      animationPlayState: play,
                    } as React.CSSProperties
                  }
                >
                  <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-[#0d0b1a]/90 p-6 backdrop-blur-xl">
                    <div className="sk3-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative">
                      <div className="flex items-start justify-between">
                        <span
                          className="flex h-12 w-12 items-center justify-center rounded-2xl transition duration-300 group-hover:scale-110 group-hover:-rotate-6"
                          style={{ background: `${group.color}22`, color: group.color, boxShadow: `0 0 24px -6px ${group.color}` }}
                        >
                          <Icon size={24} />
                        </span>
                        <span className="text-xs font-bold tabular-nums text-slate-600">
                          0{skillGroups.findIndex((g) => g.title === group.title) + 1}
                        </span>
                      </div>

                      <h3 className="mt-5 text-lg font-bold">{group.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{group.description}</p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {group.skills.map((skill, j) => (
                          <span
                            key={skill}
                            className="sk3-pop rounded-lg border bg-white/[0.04] px-3 py-1.5 text-sm font-medium text-slate-200 transition hover:-translate-y-0.5 hover:bg-white/10"
                            style={{
                              borderColor: `${group.color}44`,
                              animationDelay: `${0.25 + i * 0.08 + j * 0.05}s`,
                              animationPlayState: play,
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 flex items-center gap-3">
                        <span className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/10">
                          <span
                            className="block h-full rounded-full transition-all duration-1000"
                            style={{
                              width: inView ? "100%" : "0%",
                              background: group.color,
                              transitionDelay: `${0.4 + i * 0.1}s`,
                            }}
                          />
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          {group.skills.length} skills
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}