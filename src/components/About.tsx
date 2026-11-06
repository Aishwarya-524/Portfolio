"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";

/* ---------- Icons ---------- */
type IconProps = { size?: number; className?: string };
const Svg = ({ size = 22, className, children }: IconProps & { children: ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {children}
  </svg>
);
const ArrowUpRight = (p: IconProps) => <Svg {...p}><path d="M7 17 17 7" /><path d="M7 7h10v10" /></Svg>;
const GraduationCap = (p: IconProps) => (
  <Svg {...p}>
    <path d="M22 10 12 5 2 10l10 5 10-5Z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
    <path d="M22 10v6" />
  </Svg>
);
const MapPin = (p: IconProps) => (
  <Svg {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></Svg>
);
const Layers = (p: IconProps) => (
  <Svg {...p}>
    <path d="m12 2 10 5-10 5L2 7l10-5Z" />
    <path d="m2 12 10 5 10-5" />
    <path d="m2 17 10 5 10-5" />
  </Svg>
);
const Cloud = (p: IconProps) => <Svg {...p}><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" /></Svg>;

/* ---------- Data ---------- */
const FOCUS = [
  { title: "Frontend", text: "React & Next.js interfaces", color: "#8b5cf6" },
  { title: "Backend", text: "Spring Boot & REST APIs", color: "#ff6a3d" },
  { title: "Cloud", text: "AWS Lambda, S3, DynamoDB", color: "#14d9c5" },
];

const CHIPS = ["Authentication", "Database design", "REST APIs", "Cloud services", "Problem solving"];
const COLORS = ["#8b5cf6", "#ff6a3d", "#14d9c5"];

/* ---------- Spotlight card ---------- */
function SpotCard({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <div
      onMouseMove={onMove}
      data-reveal
      style={{ transitionDelay: `${delay}s` }}
      className={`ab3-spot ab3-reveal group relative overflow-hidden rounded-3xl p-px ${className}`}
    >
      <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-[#0d0b1a]/90 p-6 backdrop-blur-xl">
        <div className="ab3-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  );
}

/* ---------- Component ---------- */
export default function About() {
  const rootRef = useRef<HTMLElement>(null);
  const [ring, setRing] = useState(false);
  const RING = 2 * Math.PI * 38;

  // Scroll reveal (also triggers the CGPA ring)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("ab3-in");
            setRing(true);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );
    root.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .ab3{--c1:#8b5cf6;--c2:#ff6a3d;--c3:#14d9c5}
        @keyframes ab3Flow{to{background-position:200% center}}
        @keyframes ab3Blob{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(40px,-30px) scale(1.15)}}
        .ab3-grad{background:linear-gradient(90deg,var(--c1),var(--c2),var(--c3),var(--c1));background-size:200% auto;
          -webkit-background-clip:text;background-clip:text;color:transparent;animation:ab3Flow 6s linear infinite}
        .ab3-bar{background:linear-gradient(90deg,var(--c1),var(--c2),var(--c3))}
        .ab3-reveal{opacity:0;transform:translateY(32px);transition:opacity .9s cubic-bezier(.22,1,.36,1),transform .9s cubic-bezier(.22,1,.36,1)}
        .ab3-reveal.ab3-in{opacity:1;transform:none}
        .ab3-spot{background:rgba(255,255,255,.08)}
        .ab3-spot::before{content:"";position:absolute;inset:0;opacity:0;transition:opacity .3s;
          background:radial-gradient(260px circle at var(--x,50%) var(--y,50%),var(--c2),var(--c1) 40%,transparent 75%)}
        .ab3-spot:hover::before{opacity:1}
        .ab3-glow{background:radial-gradient(300px circle at var(--x,50%) var(--y,50%),rgba(139,92,246,.14),transparent 70%)}
        .ab3-dots{background-image:radial-gradient(rgba(255,255,255,.08) 1px,transparent 1px);background-size:26px 26px;
          mask-image:radial-gradient(ellipse 80% 70% at 50% 50%,#000 20%,transparent 75%);
          -webkit-mask-image:radial-gradient(ellipse 80% 70% at 50% 50%,#000 20%,transparent 75%)}
        @media (prefers-reduced-motion:reduce){
          .ab3-grad{animation:none}
          .ab3-reveal{opacity:1;transform:none;transition:none}
        }
      `}</style>

      <section
        id="about"
        ref={rootRef}
        className="ab3 relative isolate overflow-hidden bg-[#07060f] py-24 text-white sm:py-32"
      >
        {/* Background */}
        <div className="ab3-dots pointer-events-none absolute inset-0 -z-10" />
        <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-96 w-96 rounded-full bg-[#8b5cf6]/25 blur-[110px]"
          style={{ animation: "ab3Blob 20s ease-in-out infinite" }} />
        <div className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-[#ff6a3d]/20 blur-[110px]"
          style={{ animation: "ab3Blob 24s ease-in-out infinite reverse" }} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#14d9c5]/15 blur-[110px]" />

        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            {/* ---------- LEFT ---------- */}
            <div data-reveal className="ab3-reveal lg:sticky lg:top-28 lg:self-start">
              <p className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-slate-400">
                <span className="ab3-bar h-[3px] w-10 rounded-full" />
                A little about me
              </p>

              <h2 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
                Curious mind.
                <span className="ab3-grad mt-1 block pb-2">Practical solutions.</span>
              </h2>

              <div className="mt-8 flex flex-wrap gap-2">
                {CHIPS.map((c, i) => (
                  <span key={c}
                    className="rounded-full border bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-slate-200"
                    style={{ borderColor: `${COLORS[i % 3]}66` }}>
                    <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle"
                      style={{ background: COLORS[i % 3], boxShadow: `0 0 10px ${COLORS[i % 3]}` }} />
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* ---------- RIGHT ---------- */}
            <div>
              <div data-reveal className="ab3-reveal" style={{ transitionDelay: ".1s" }}>
                <p className="text-lg leading-8 text-slate-300">
                  I&apos;m a Computer Science Engineering graduate from{" "}
                  <span className="font-semibold text-white">
                    Centurion University of Technology and Management
                  </span>
                  . I&apos;m interested in developing useful software that combines thoughtful
                  frontend experiences with reliable backend systems.
                </p>
                <p className="mt-5 leading-8 text-slate-400">
                  My project experience includes full-stack web applications, REST APIs,
                  authentication, database integration, and AWS cloud services. I continue to
                  strengthen my skills through hands-on development and practical problem-solving.
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {/* Education + CGPA ring */}
                <SpotCard delay={0.15}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8b5cf6]/15 text-[#a78bfa]">
                        <GraduationCap />
                      </span>
                      <h3 className="mt-4 font-bold">Education</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        B.Tech, Computer Science Engineering
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[#14d9c5]">CGPA: 8.56/10</p>
                    </div>

                    <div className="relative h-20 w-20 shrink-0">
                      <svg viewBox="0 0 90 90" className="-rotate-90">
                        <defs>
                          <linearGradient id="ab3ring" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="50%" stopColor="#ff6a3d" />
                            <stop offset="100%" stopColor="#14d9c5" />
                          </linearGradient>
                        </defs>
                        <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="7" />
                        <circle cx="45" cy="45" r="38" fill="none" stroke="url(#ab3ring)" strokeWidth="7"
                          strokeLinecap="round" strokeDasharray={RING}
                          strokeDashoffset={ring ? RING * (1 - 0.856) : RING}
                          style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(.22,1,.36,1) .3s" }} />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-sm font-extrabold">
                        85.6%
                      </span>
                    </div>
                  </div>
                </SpotCard>

                {/* Location */}
                <SpotCard delay={0.25}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff6a3d]/15 text-[#ff8a63]">
                    <MapPin />
                  </span>
                  <h3 className="mt-4 font-bold">Location</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">Bhubaneswar, Odisha, India</p>
                  <a href="#contact"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#14d9c5] transition hover:gap-2">
                    Get in touch <ArrowUpRight size={15} />
                  </a>
                </SpotCard>

                {/* What I work on */}
                <SpotCard className="sm:col-span-2" delay={0.35}>
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                    <Layers size={16} /> What I work on
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {FOCUS.map((f) => (
                      <div key={f.title}
                        className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:-translate-y-1 hover:bg-white/[0.08]">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg"
                          style={{ background: `${f.color}22`, color: f.color }}>
                          {f.title === "Cloud" ? <Cloud size={18} /> : <Layers size={18} />}
                        </span>
                        <p className="mt-3 text-sm font-bold">{f.title}</p>
                        <p className="mt-1 text-xs leading-5 text-slate-400">{f.text}</p>
                      </div>
                    ))}
                  </div>
                </SpotCard>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}