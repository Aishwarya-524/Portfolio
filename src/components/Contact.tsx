
import { useEffect, useRef, useState } from "react";
import type {
  FormEvent,
  ReactNode,
  CSSProperties,
  MouseEvent,
} from "react";

type IconProps = {
  size?: number;
  className?: string;
};

const Svg = ({
  size = 22,
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

const MailIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Svg>
);

const LinkedinIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </Svg>
);

const GithubIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9 19c-5 1.5-5-2.5-7-3" />
    <path d="M16 22v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </Svg>
);

const ArrowUpRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </Svg>
);

const SendIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </Svg>
);

const CheckIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="m5 12 4 4L19 6" />
  </Svg>
);

const email = "aishwaryaswains524@gmail.com";
const linkedin =
  "https://www.linkedin.com/in/aishwarya-aswini-swian-3b468923a/";

// Replace this with your personal GitHub profile URL.
const github = "https://github.com/";

const socialLinks = [
  {
    label: "Email",
    value: email,
    href: `mailto:${email}`,
    icon: MailIcon,
    accent: "#8b5cf6",
    description: "Best way to reach me",
  },
  {
    label: "LinkedIn",
    value: "Connect professionally",
    href: linkedin,
    icon: LinkedinIcon,
    accent: "#14d9c5",
    description: "Let's build connections",
  },
  {
    label: "GitHub",
    value: "Explore my code",
    href: github,
    icon: GithubIcon,
    accent: "#ff6a3d",
    description: "Projects and development",
  },
];

const inputClass =
  "mt-2.5 w-full rounded-xl border border-white/[0.10] bg-[#0b0a15] px-4 py-3.5 text-sm text-white outline-none transition duration-300 placeholder:text-slate-600 hover:border-white/[0.17] focus:border-violet-400/60 focus:bg-[#100e1e] focus:ring-4 focus:ring-violet-500/[0.08]";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");

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
      { threshold: 0.1 }
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = encodeURIComponent(
      `Portfolio enquiry from ${name.trim()}`
    );

    const body = encodeURIComponent(
      `Name: ${name.trim()}\nEmail: ${senderEmail.trim()}\n\nMessage:\n${message.trim()}`
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="contact-section relative overflow-hidden bg-[#07060f] py-24 text-white sm:py-32"
    >
      <style>{`
        .contact-dots {
          background-image: radial-gradient(
            rgba(139, 92, 246, 0.15) 1px,
            transparent 1px
          );
          background-size: 30px 30px;
        }

        .contact-gradient-text {
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
          animation: contact-gradient 7s ease-in-out infinite alternate;
        }

        @keyframes contact-gradient {
          from { background-position: 0% center; }
          to { background-position: 100% center; }
        }

        .contact-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 800ms ease, transform 800ms ease;
        }

        .contact-reveal.contact-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .contact-card {
          isolation: isolate;
          background: linear-gradient(
            135deg,
            rgba(18, 16, 34, 0.95),
            rgba(10, 9, 20, 0.98)
          );
          transition:
            transform 350ms ease,
            border-color 350ms ease,
            box-shadow 350ms ease;
        }

        .contact-card:hover {
          transform: translateY(-4px);
          border-color: rgba(139, 92, 246, 0.4);
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.24);
        }

        .contact-card-glow {
          position: absolute;
          inset: 0;
          z-index: -1;
          pointer-events: none;
          opacity: 0;
          background: radial-gradient(
            300px circle at var(--contact-mx, 50%) var(--contact-my, 50%),
            rgba(139, 92, 246, 0.12),
            transparent 70%
          );
          transition: opacity 350ms ease;
        }

        .contact-card:hover .contact-card-glow {
          opacity: 1;
        }

        .contact-icon {
          background: linear-gradient(
            145deg,
            rgba(139, 92, 246, 0.17),
            rgba(20, 217, 197, 0.06)
          );
          box-shadow: inset 0 0 0 1px rgba(167, 139, 250, 0.15);
          transition: transform 300ms ease, background 300ms ease;
        }

        .contact-card:hover .contact-icon {
          transform: rotate(-4deg) scale(1.04);
          background: rgba(139, 92, 246, 0.2);
        }

        .contact-form {
          background: linear-gradient(
            145deg,
            rgba(18, 16, 34, 0.97),
            rgba(10, 9, 20, 0.99)
          );
        }

        .contact-submit {
          background: linear-gradient(100deg, #8b5cf6, #7250dc 55%, #6352db);
          box-shadow: 0 8px 30px rgba(139, 92, 246, 0.18);
          transition: transform 250ms ease, box-shadow 250ms ease;
        }

        .contact-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(139, 92, 246, 0.3);
        }

        .contact-submit:active {
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-gradient-text { animation: none; }
          .contact-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
          .contact-card, .contact-icon, .contact-submit {
            transition: none;
          }
        }
      `}</style>

      {/* Background effects */}
      <div className="contact-dots pointer-events-none absolute inset-0 opacity-50" />

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
          className={`contact-reveal ${
            inView ? "contact-visible" : ""
          } mx-auto max-w-3xl text-center`}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[0.07] px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-400" />
            </span>

            <span className="text-xs font-bold uppercase tracking-[0.22em] text-violet-200">
              Get in touch
            </span>
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Let's create
            <br />
            <span className="contact-gradient-text">something great.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            I'm interested in entry-level software development opportunities
            and collaborative projects. Have an opportunity or an idea? I'd
            love to hear from you.
          </p>

          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-violet-400/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-teal-300/70" />
          </div>
        </div>

        {/* Contact content */}
        <div className="mt-14 grid items-start gap-8 lg:mt-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          {/* Left side */}
          <div
            className={`contact-reveal ${
              inView ? "contact-visible" : ""
            } space-y-4`}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                Contact information
              </p>
              <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                Let's start a conversation.
              </h3>
            </div>

            {socialLinks.map((link, index) => {
              const Icon = link.icon;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label === "Email" ? undefined : "_blank"}
                  rel={
                    link.label === "Email"
                      ? undefined
                      : "noopener noreferrer"
                  }
                  aria-label={`${link.label}: ${link.value}`}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                  onMouseMove={handleMouseMove}
                  style={
                    {
                      "--contact-mx": `${mouse.x}%`,
                      "--contact-my": `${mouse.y}%`,
                      "--contact-accent": link.accent,
                    } as CSSProperties
                  }
                  className="contact-card relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.08] p-5"
                >
                  <div className="contact-card-glow" />

                  <div
                    className="contact-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    style={{ color: link.accent }}
                  >
                    <Icon size={23} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-white">{link.label}</h4>
                    <p className="mt-1 break-words text-sm text-slate-400">
                      {link.value}
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                      {link.description}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={19}
                    className={`shrink-0 transition-all duration-300 ${
                      activeCard === index
                        ? "translate-x-0.5 -translate-y-0.5 text-violet-300"
                        : "text-slate-600"
                    }`}
                  />
                </a>
              );
            })}

            {/* Availability card */}
            <div className="relative mt-6 overflow-hidden rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/[0.12] via-[#100e1e] to-teal-400/[0.05] p-6 sm:p-7">
              <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-violet-500/10 blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-300 opacity-50" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-300" />
                  </span>

                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-200">
                    Open to opportunities
                  </p>
                </div>

                <h3 className="mt-4 text-xl font-extrabold leading-snug text-white">
                  Ready to build, learn, and grow.
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Interested in Java Developer, Spring Boot Developer, and
                  Full Stack Developer opportunities.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {["Java", "Spring Boot", "React"].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-white/[0.09] bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right side: Contact form */}
          <form
            onSubmit={handleSubmit}
            className={`contact-form contact-reveal ${
              inView ? "contact-visible" : ""
            } relative overflow-hidden rounded-3xl border border-white/[0.09] p-6 sm:p-9`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-violet-500/[0.07] blur-[80px]" />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
                    Have a project in mind?
                  </p>

                  <h3 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
                    Send me a message.
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Fill in the details and your email application will open
                    with your message prepared.
                  </p>
                </div>

                <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/[0.08] text-violet-200 sm:flex">
                  <MailIcon size={24} />
                </div>
              </div>

              <div className="mt-8">
                <label
                  htmlFor="contact-name"
                  className="text-sm font-semibold text-slate-300"
                >
                  Your name <span className="text-violet-300">*</span>
                </label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={100}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your name"
                  className={inputClass}
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-email"
                  className="text-sm font-semibold text-slate-300"
                >
                  Email address <span className="text-violet-300">*</span>
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  value={senderEmail}
                  onChange={(event) => setSenderEmail(event.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              <div className="mt-5">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-semibold text-slate-300"
                >
                  Your message <span className="text-violet-300">*</span>
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  maxLength={5000}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Tell me about the opportunity or project..."
                  className={`${inputClass} min-h-[140px] resize-y`}
                />

                <p className="mt-2 text-right text-xs text-slate-600">
                  {message.length}/5000 characters
                </p>
              </div>

              <button
                type="submit"
                className="contact-submit mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-bold text-white sm:w-auto"
              >
                Prepare Email
                <SendIcon size={17} />
              </button>

              <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-500">
                <CheckIcon
                  size={15}
                  className="mt-0.5 shrink-0 text-teal-300"
                />
                Your message opens in your email application. Nothing is sent
                automatically by this form.
              </p>
            </div>
          </form>
        </div>

        {/* Bottom message */}
        <div
          className={`contact-reveal ${
            inView ? "contact-visible" : ""
          } mt-14 border-t border-white/[0.07] pt-7 text-center`}
          style={{ transitionDelay: "300ms" }}
        >
          <p className="text-sm text-slate-500">
            Have an opportunity to share?
            <a
              href={`mailto:${email}`}
              className="ml-2 font-semibold text-violet-300 transition-colors hover:text-teal-200"
            >
              Let's talk
              <ArrowUpRight
                size={14}
                className="ml-1 inline-block align-middle"
              />
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
