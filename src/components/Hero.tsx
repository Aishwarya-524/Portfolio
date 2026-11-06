"use client";

import { useEffect, useState } from "react";
import type { MouseEvent, ReactNode } from "react";

/* ---------- Icons ---------- */
type IconProps = { size?: number; className?: string };
const Svg = ({ size = 20, className, children }: IconProps & { children: ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {children}
  </svg>
);
const ArrowUpRight = (p: IconProps) => <Svg {...p}><path d="M7 17 17 7" /><path d="M7 7h10v10" /></Svg>;
const Download = (p: IconProps) => (
  <Svg {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /><path d="M12 15V3" /></Svg>
);
const MapPin = (p: IconProps) => (
  <Svg {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></Svg>
);

/* ---------- Data ---------- */
const STACK = ["Java", "Spring Boot", "React", "Next.js", "Node.js", "TypeScript", "MySQL", "MongoDB", "AWS", "Docker"];
const DOTS = ["#8b5cf6", "#ff6a3d", "#14d9c5"];

const BUILDING = [
  { name: "Employee360", tag: "Full Stack", color: "#8b5cf6" },
  { name: "City Discovery", tag: "Next.js App", color: "#ff6a3d" },
  { name: "Cloud Chatbot", tag: "AWS Serverless", color: "#14d9c5" },
];

const MARQUEE = ["FULL STACK", "JAVA", "REACT", "SPRING BOOT", "NEXT.JS", "AWS", "TYPESCRIPT"];

/* ---------- Spotlight card (border glows toward cursor) ---------- */
function SpotCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <div
      onMouseMove={onMove}
      className={`hx3-spot group relative overflow-hidden rounded-3xl p-px ${className}`}
    >
      <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-[#0d0b1a]/90 p-5 backdrop-blur-xl">
        <div className="hx3-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  );
}

/* ---------- Component ---------- */
export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 150);
    return () => clearTimeout(t);
  }, []);

  const onSectionMove = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const RING = 2 * Math.PI * 38;

  return (
    <>
      <style>{`
        .hx3{--c1:#8b5cf6;--c2:#ff6a3d;--c3:#14d9c5}
        @keyframes hx3Flow{to{background-position:200% center}}
        @keyframes hx3Spin{to{transform:rotate(360deg)}}
        @keyframes hx3Blob{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(50px,-40px) scale(1.15)}66%{transform:translate(-40px,30px) scale(.9)}}
        @keyframes hx3Rise{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}
        @keyframes hx3Marquee{to{transform:translateX(-50%)}}
        @keyframes hx3Pulse{0%,100%{box-shadow:0 0 0 0 rgba(20,217,197,.6)}70%{box-shadow:0 0 0 10px rgba(20,217,197,0)}}
        .hx3-grad{background:linear-gradient(90deg,var(--c1),var(--c2),var(--c3),var(--c1));background-size:200% auto;
          -webkit-background-clip:text;background-clip:text;color:transparent;animation:hx3Flow 6s linear infinite}
        .hx3-btn{background:linear-gradient(90deg,var(--c1),var(--c2),var(--c3),var(--c1));background-size:200% auto;animation:hx3Flow 6s linear infinite}
        .hx3-spot{background:rgba(255,255,255,.08)}
        .hx3-spot::before{content:"";position:absolute;inset:0;opacity:0;transition:opacity .3s;
          background:radial-gradient(260px circle at var(--x,50%) var(--y,50%),var(--c2),var(--c1) 40%,transparent 75%)}
        .hx3-spot:hover::before{opacity:1}
        .hx3-glow{background:radial-gradient(300px circle at var(--x,50%) var(--y,50%),rgba(139,92,246,.14),transparent 70%)}
        .hx3-rise{opacity:0;animation:hx3Rise .9s cubic-bezier(.22,1,.36,1) forwards}
        .hx3-spin{animation:hx3Spin 16s linear infinite}
        .hx3-orbit{animation:hx3Spin 6s linear infinite}
        .hx3-marquee{animation:hx3Marquee 30s linear infinite}
        .hx3-outline{-webkit-text-stroke:1.5px rgba(255,255,255,.28);color:transparent}
        .hx3-pulse{animation:hx3Pulse 2s infinite}
        .hx3-dots{background-image:radial-gradient(rgba(255,255,255,.09) 1px,transparent 1px);background-size:26px 26px;
          mask-image:radial-gradient(ellipse 80% 70% at 50% 40%,#000 20%,transparent 75%);
          -webkit-mask-image:radial-gradient(ellipse 80% 70% at 50% 40%,#000 20%,transparent 75%)}
        @media (prefers-reduced-motion:reduce){
          .hx3-grad,.hx3-btn,.hx3-spin,.hx3-orbit,.hx3-marquee,.hx3-pulse{animation:none}
          .hx3-rise{animation:none;opacity:1}
        }
      `}</style>

      <section
        id="home"
        onMouseMove={onSectionMove}
        className="hx3 relative isolate overflow-hidden bg-[#07060f] text-white"
      >
        {/* ---------- Background ---------- */}
        <div className="hx3-dots pointer-events-none absolute inset-0 -z-10" />
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: "radial-gradient(500px circle at var(--mx,70%) var(--my,30%),rgba(255,106,61,.13),transparent 65%)" }}
        />
        <div className="pointer-events-none absolute -left-32 top-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#8b5cf6]/30 blur-[110px]"
          style={{ animation: "hx3Blob 18s ease-in-out infinite" }} />
        <div className="pointer-events-none absolute right-[-8rem] top-32 -z-10 h-[26rem] w-[26rem] rounded-full bg-[#ff6a3d]/25 blur-[110px]"
          style={{ animation: "hx3Blob 22s ease-in-out infinite reverse" }} />
        <div className="pointer-events-none absolute bottom-0 left-1/3 -z-10 h-[22rem] w-[22rem] rounded-full bg-[#14d9c5]/20 blur-[110px]"
          style={{ animation: "hx3Blob 26s ease-in-out infinite" }} />

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-16 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pt-40">
          {/* ---------- LEFT ---------- */}
          <div>
            <div className="hx3-rise inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-slate-200 backdrop-blur"
              style={{ animationDelay: ".05s" }}>
              <span className="hx3-pulse h-2.5 w-2.5 rounded-full bg-[#14d9c5]" />
              Available for work · CS Graduate 2025
            </div>

            <h1 className="hx3-rise mt-8 text-[3.4rem] font-extrabold leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.6rem]"
              style={{ animationDelay: ".15s" }}>
              <span className="block">Aishwarya</span>
              <span className="hx3-grad block pb-3">Aswini Swain</span>
            </h1>

            <div className="hx3-rise mt-3 flex flex-wrap gap-2.5" style={{ animationDelay: ".3s" }}>
              {[
                { t: "Full Stack Developer", c: "#8b5cf6" },
                { t: "Software Engineer", c: "#ff6a3d" },
                { t: "Cloud Learner", c: "#14d9c5" },
              ].map((r) => (
                <span key={r.t}
                  className="flex items-center gap-2 rounded-full border bg-white/[0.04] px-4 py-2 text-sm font-semibold text-slate-100"
                  style={{ borderColor: `${r.c}66` }}>
                  <span className="h-2 w-2 rounded-full" style={{ background: r.c, boxShadow: `0 0 12px ${r.c}` }} />
                  {r.t}
                </span>
              ))}
            </div>

            <p className="hx3-rise mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg"
              style={{ animationDelay: ".4s" }}>
              I design and build fast, polished web apps with React, Next.js and Java Spring Boot,
              from pixel-perfect interfaces to secure, scalable APIs.
            </p>

            <div className="hx3-rise mt-6 flex items-center gap-2 text-sm font-medium text-slate-400"
              style={{ animationDelay: ".45s" }}>
              <MapPin size={17} className="text-[#ff6a3d]" />
              Bhubaneswar, Odisha, India
            </div>

            <div className="hx3-rise mt-10 flex flex-wrap items-center gap-4" style={{ animationDelay: ".55s" }}>
              <a href="#projects"
                className="hx3-btn group inline-flex items-center gap-2 rounded-2xl px-7 py-4 text-sm font-bold text-[#07060f] shadow-[0_10px_40px_-8px_rgba(255,106,61,.6)] transition hover:scale-[1.05] active:scale-95">
                Explore My Work
                <ArrowUpRight size={18} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a href="/resume.pdf" download
                className="group inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.05] px-7 py-4 text-sm font-bold text-white backdrop-blur transition hover:border-[#14d9c5] hover:text-[#14d9c5]">
                Resume
                <Download size={18} className="transition group-hover:translate-y-0.5" />
              </a>

              {/* Rotating badge */}
              <div className="relative hidden h-28 w-28 items-center justify-center sm:flex">
                <svg viewBox="0 0 120 120" className="hx3-spin absolute inset-0 h-full w-full">
                  <defs>
                    <path id="hx3circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                  </defs>
                  <text fill="#cbd5e1" fontSize="10.5" fontWeight="700">
                    <textPath href="#hx3circle" textLength="268" lengthAdjust="spacing">
                      OPEN TO WORK • FULL STACK • BUILDER •
                    </textPath>
                  </text>
                </svg>
                <a href="#contact" aria-label="Contact me"
                  className="hx3-btn flex h-12 w-12 items-center justify-center rounded-full text-[#07060f] transition hover:scale-110">
                  <ArrowUpRight size={22} />
                </a>
              </div>
            </div>
          </div>

          {/* ---------- RIGHT: BENTO ---------- */}
          <div className="grid grid-cols-2 gap-4">
            {/* Profile */}
            <SpotCard className="hx3-rise col-span-2">
              <div className="flex items-center gap-4" style={{ animationDelay: ".3s" }}>
                <span className="relative flex h-16 w-16 shrink-0 items-center justify-center">
                  <span className="hx3-orbit absolute inset-0 rounded-full"
                    style={{ background: "conic-gradient(from 0deg,#8b5cf6,#ff6a3d,#14d9c5,#8b5cf6)" }} />
                  <span className="relative flex h-[58px] w-[58px] items-center justify-center rounded-full bg-[#0d0b1a] text-lg font-extrabold">
                    AS
                  </span>
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-lg font-bold">Aishwarya Aswini Swain</h3>
                  <p className="text-sm text-slate-400">B.Tech CSE · Centurion University</p>
                </div>
                <span className="hidden items-center gap-1.5 rounded-full bg-[#14d9c5]/10 px-3 py-1.5 text-xs font-semibold text-[#14d9c5] sm:flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#14d9c5]" /> Online
                </span>
              </div>
            </SpotCard>

            {/* CGPA ring */}
            <SpotCard className="hx3-rise" >
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="relative h-24 w-24">
                  <svg viewBox="0 0 90 90" className="-rotate-90">
                    <defs>
                      <linearGradient id="hx3ring" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="50%" stopColor="#ff6a3d" />
                        <stop offset="100%" stopColor="#14d9c5" />
                      </linearGradient>
                    </defs>
                    <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="7" />
                    <circle cx="45" cy="45" r="38" fill="none" stroke="url(#hx3ring)" strokeWidth="7"
                      strokeLinecap="round" strokeDasharray={RING}
                      strokeDashoffset={mounted ? RING * (1 - 0.856) : RING}
                      style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(.22,1,.36,1)" }} />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-xl font-extrabold">8.56</span>
                </div>
                <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-slate-400">CGPA / 10</p>
              </div>
            </SpotCard>

            {/* Projects stat */}
            <SpotCard className="hx3-rise">
              <div className="flex h-full flex-col justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Projects</p>
                <div>
                  <p className="hx3-grad text-6xl font-extrabold leading-none">4+</p>
                  <div className="mt-4 flex h-10 items-end gap-1.5">
                    {[40, 70, 55, 100, 80].map((h, i) => (
                      <span key={i} className="w-full rounded-t"
                        style={{
                          height: mounted ? `${h}%` : "4%",
                          background: DOTS[i % 3],
                          transition: `height 1s ${0.2 + i * 0.12}s cubic-bezier(.22,1,.36,1)`,
                        }} />
                    ))}
                  </div>
                </div>
              </div>
            </SpotCard>

            {/* Stack */}
            <SpotCard className="hx3-rise col-span-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Core stack</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {STACK.map((s, i) => (
                  <span key={s}
                    className="rounded-lg border bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:bg-white/10"
                    style={{ borderColor: `${DOTS[i % 3]}55` }}>
                    <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle" style={{ background: DOTS[i % 3] }} />
                    {s}
                  </span>
                ))}
              </div>
            </SpotCard>

            {/* Projects list */}
            <SpotCard className="hx3-rise col-span-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Selected builds</p>
                <a href="#projects" className="text-xs font-semibold text-[#14d9c5] hover:underline">View all →</a>
              </div>
              <ul className="mt-3 space-y-2">
                {BUILDING.map((b) => (
                  <li key={b.name}
                    className="flex items-center justify-between rounded-xl bg-white/[0.04] px-4 py-2.5 transition hover:bg-white/[0.08]">
                    <span className="flex items-center gap-3 text-sm font-semibold">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: b.color, boxShadow: `0 0 12px ${b.color}` }} />
                      {b.name}
                    </span>
                    <span className="text-xs text-slate-400">{b.tag}</span>
                  </li>
                ))}
              </ul>
            </SpotCard>
          </div>
        </div>

        {/* ---------- Giant outlined marquee ---------- */}
        <div className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-6">
          <div className="hx3-marquee flex w-max items-center gap-10">
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <span key={`${m}-${i}`} className="flex items-center gap-10">
                <span className={`text-5xl font-extrabold tracking-tight sm:text-6xl ${i % 2 ? "hx3-grad" : "hx3-outline"}`}>
                  {m}
                </span>
                <span className="text-3xl" style={{ color: DOTS[i % 3] }}>✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}