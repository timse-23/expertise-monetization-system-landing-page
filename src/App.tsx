import { useEffect, useRef, useState, type MouseEvent, type ReactNode, type Ref } from "react";
import { ArrowRight, CheckCircle2, X } from "lucide-react";

/* ---------------------------------------------------------------------------
   Copy, links & media
--------------------------------------------------------------------------- */

const BRAND_NAME = "Engr. Timothy Aderogba";
const BRAND_DESCRIPTOR = "Expertise Monetization System";
const HOST_PHOTO = "/images/timothy-aderogba.jpg";
const REGISTRANTS = 530;
const FORM_ID = "a69e3760-caf1-11f1-9f60-9d40525f9c74";
const FORM_SCRIPT = `https://eomail5.com/form/${FORM_ID}.js`;

const LEARN = [
  {
    title: "How to Turn Your Skills Into a Business",
    copy: "Learn how to identify the skills you already have and turn them into a consulting or coaching service people can pay for.",
  },
  {
    title: "How to Find Problems People Will Pay You to Solve",
    copy: "Not everyone who needs help is ready to pay for it. Learn how to focus on problems that matter to the right clients and businesses.",
  },
  {
    title: "How to Attract Potential Clients Using AI",
    copy: "You don’t have to do everything manually. Discover how AI tools can help with tasks involved in finding potential clients and growing your business without spending months learning complicated technology.",
  },
];

const WHO = [
  "You are an experienced professional who wants to earn more from your skills.",
  "People often come to you for advice because of your experience, and you want to turn that knowledge into a paid service.",
  "You want to start a coaching or consulting business without leaving your current job immediately.",
  "You want to use AI tools to help you find clients and grow your business.",
];

/* ---------------------------------------------------------------------------
   Primitives
--------------------------------------------------------------------------- */

/* Counts from 0 up to `to` the first time it scrolls into view */
function CountUp({ to, duration = 2200, suffix = "" }: { to: number; duration?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      (entries, obs) => {
        if (!entries[0].isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setValue(Math.round(to * (1 - Math.pow(1 - p, 3)))); // ease-out
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className="inline-block tabular-nums" aria-label={`${to}${suffix}`}>
      <span aria-hidden="true">
        {value}
        {suffix}
      </span>
    </span>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
}) {
  const ref = useRef<HTMLDivElement | HTMLLIElement>(null);
  const Tag = as;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      node.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as Ref<HTMLDivElement & HTMLLIElement>}
      className={`reveal ${className}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  );
}

/** Crimson CTA — every button scrolls to the embedded registration form. */
function CtaButton({ label, id, className = "" }: { label: string; id?: string; className?: string }) {
  return (
    <a
      id={id}
      href="#register"
      className={`group flex w-full items-center justify-center gap-3 sm:inline-flex sm:w-auto rounded-md bg-red-600 px-6 py-5 text-lg font-bold uppercase tracking-wide text-white shadow-[0_8px_0_#991b1b,0_18px_30px_-8px_rgba(220,38,38,0.55)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-red-500 active:translate-y-1.5 active:shadow-[0_2px_0_#991b1b] sm:min-w-[22rem] sm:text-xl ${className}`}
    >
      <span>{label}</span>
      <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
    </a>
  );
}

function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <p
      className={`mb-4 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] ${
        tone === "dark" ? "text-white/70" : "text-slate-500"
      }`}
    >
      <span className="h-[2px] w-8 bg-red-600" aria-hidden="true" />
      {children}
    </p>
  );
}

/** Loads the EmailOctopus inline form into place. Cleans up so StrictMode never renders it twice. */
function RegistrationForm() {
  const holder = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = holder.current;
    if (!node) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = FORM_SCRIPT;
    script.setAttribute("data-form", FORM_ID);
    node.appendChild(script);

    // Count a Meta "Lead" when the form is submitted.
    const onSubmit = () => {
      try {
        (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq?.("track", "Lead");
      } catch {
        /* tracking must never block the form */
      }
    };
    node.addEventListener("submit", onSubmit, true);

    return () => {
      node.removeEventListener("submit", onSubmit, true);
      node.replaceChildren();
    };
  }, []);

  return (
    <div className="min-h-[340px]">
      <div ref={holder} />
      <noscript>
        <p className="text-center text-slate-600">Please enable JavaScript to register for the webinar.</p>
      </noscript>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Legal modal
--------------------------------------------------------------------------- */

type LegalDoc = { title: string; sections: { h: string; p: string }[] };

const LEGAL: Record<string, LegalDoc> = {
  privacy: {
    title: "Privacy Policy",
    sections: [
      { h: "What we collect", p: "When you register for the webinar, you submit the details requested in the form, such as your name, email address and professional background." },
      { h: "How we use it", p: "Your details are used only to register you for the webinar, send the access link and reminders, and tailor examples to your industry. We do not sell your information." },
      { h: "Advertising", p: "Visitors may arrive through paid social advertisements. Those platforms use their own tracking technologies under their own privacy policies." },
    ],
  },
  terms: {
    title: "Terms of Use",
    sections: [
      { h: "Educational only", p: "This is an educational webinar. Nothing on this page or inside the webinar is financial, legal, tax, employment or investment advice." },
      { h: "No guarantees", p: "Examples and case studies illustrate specific results. Individual results vary based on skill, effort, niche, market conditions, and execution." },
      { h: "Materials", p: "Frameworks and materials provided are for your personal use and may not be resold or redistributed." },
      { h: "Changes", p: "Webinar dates and format may change at any time. Updates will be sent to the email you registered with." },
    ],
  },
};

function LegalModal({ doc, onClose }: { doc: LegalDoc | null; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!doc) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5" role="dialog" aria-modal="true" aria-label={doc.title}>
      <button className="absolute inset-0 bg-navy-950/80" onClick={onClose} aria-label="Close dialog" />
      <div className="relative max-h-[85vh] w-full max-w-xl overflow-auto rounded-md border-t-4 border-red-600 bg-white p-8 shadow-2xl sm:p-10">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:border-navy-900 hover:text-navy-900"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        <h3 className="font-display text-2xl font-black tracking-tight text-navy-900 sm:text-3xl">{doc.title}</h3>
        <div className="mt-5 space-y-5">
          {doc.sections.map((s) => (
            <section key={s.h}>
              <h4 className="text-xs font-bold uppercase tracking-[0.14em] text-red-600">{s.h}</h4>
              <p className="mt-1 text-[15px] leading-relaxed text-slate-600">{s.p}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   The funnel — one narrow column, straight from hook to registration
--------------------------------------------------------------------------- */

/* Weekly webinar: Saturdays 7:00PM WAT (UTC+1 = 18:00 UTC), starting Oct 17, 2026.
   Once a session has started, the next Saturday's date is shown. */
const WEBINAR_FIRST_UTC = Date.UTC(2026, 9, 17, 18, 0);
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function nextWebinarDate(now: number) {
  let next = WEBINAR_FIRST_UTC;
  if (now >= next) next += Math.ceil((now - next + 1) / WEEK_MS) * WEEK_MS;
  const d = new Date(next + 60 * 60 * 1000); // shift to WAT so getUTC* returns the Lagos calendar date
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

export default function App() {
  const [legalKey, setLegalKey] = useState<"privacy" | "terms" | null>(null);
  const [date, setDate] = useState(() => nextWebinarDate(Date.now()));
  const [heroCtaInView, setHeroCtaInView] = useState(true);
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setDate(nextWebinarDate(Date.now())), 60_000);
    return () => clearInterval(id);
  }, []);

  // The mobile bottom bar appears once the hero button has scrolled away, and hides while the form is on screen.
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const watch = (el: Element | null, set: (v: boolean) => void) => {
      if (!el) return () => {};
      const io = new IntersectionObserver(([e]) => set(e.isIntersecting), { threshold: 0.05 });
      io.observe(el);
      return () => io.disconnect();
    };
    const stopA = watch(document.getElementById("hero-cta"), setHeroCtaInView);
    const stopB = watch(document.getElementById("register"), setFormInView);
    return () => {
      stopA();
      stopB();
    };
  }, []);

  const openLegal = (key: "privacy" | "terms") => (e: MouseEvent) => {
    e.preventDefault();
    setLegalKey(key);
  };

  const showBar = !heroCtaInView && !formInView;

  return (
    <div className="bg-white text-[#0f1c2e]">
      {/* Slim urgency strip */}
      <div className="border-b border-white/10 bg-navy-950 text-white">
        <p className="mx-auto max-w-4xl px-4 py-3 text-center text-[11px] font-bold uppercase leading-snug tracking-[0.16em] text-white/80 sm:px-8 sm:tracking-[0.18em]">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-red-600 align-middle" aria-hidden="true" />
          Free Webinar · This Saturday · 7:00 PM (WAT) · Seats Are Limited
        </p>
      </div>

      <main id="main">
        {/* ============================ HERO ============================ */}
        <section className="tex-hero relative overflow-hidden text-white" aria-labelledby="hero-title">
          <div className="relative z-10 mx-auto max-w-4xl px-5 pb-16 pt-14 sm:px-8 md:pb-24 md:pt-20">
            <Reveal>
              <p className="mb-6 border-l-2 border-red-600 pl-4 text-xs font-bold uppercase tracking-[0.14em] text-white/80 sm:text-sm">
                For professionals with 3 or more years of work experience
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1 id="hero-title" className="font-display text-[2.35rem] font-black leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
                Turn Your Skills and Experience Into A{" "}
                <span className="underline [text-decoration-skip-ink:none] decoration-red-600 decoration-[6px] underline-offset-[8px] md:decoration-[9px] md:underline-offset-[10px]">
                  High-Paying Coaching &amp; Consulting Business
                </span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-7 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-sm border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-bold uppercase tracking-[0.1em] text-white shadow-lg shadow-black/20 backdrop-blur-sm">
                <span className="text-red-400">Live Webinar</span>
                <span className="text-white/30" aria-hidden="true">·</span>
                <span>This Saturday, {date}</span>
                <span className="text-white/30" aria-hidden="true">·</span>
                <span className="whitespace-nowrap">7:00 PM WAT</span>
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-8 max-w-3xl space-y-4 text-lg leading-relaxed text-white/80 md:text-xl">
                <p>You have spent years learning, gaining experience, and solving problems at work. But have you ever thought about turning what you know into a business of your own?</p>
                <p>
                  Join this live webinar to learn how to turn your skills and experience into a <strong className="font-semibold text-white">consulting and coaching business that people will pay for.</strong>
                </p>
                <p>You don’t have to quit your job, become an influencer, or spend months learning complicated technology to get started.</p>
              </div>
            </Reveal>

            <Reveal delay={260} className="mt-10">
              <CtaButton id="hero-cta" label="Save My Seat" />
              <p className="mt-4 text-sm text-white/60">Registration takes less than 60 seconds. Seats are limited.</p>
            </Reveal>

            <Reveal delay={320} className="mt-12">
              <p className="border-t border-white/10 pt-6 text-base text-white/70">
                <span className="font-body text-3xl font-bold text-red-500">
                  <CountUp to={REGISTRANTS} suffix="+" />
                </span>{" "}
                experienced professionals have registered across our previous sessions.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============================ PROBLEM ============================ */}
        <section className="tex-paper relative" aria-labelledby="problem-title">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 md:py-24">
            <Reveal>
              <h2 id="problem-title" className="font-display text-3xl font-black leading-tight tracking-tight text-navy-900 md:text-[2.6rem]">
                You Have the Skills. You Have the Experience. Why Aren’t You Earning What They’re Worth?
              </h2>
              <p className="mt-7 text-lg leading-relaxed text-slate-600 md:text-xl">
                Think about how much you have learned from your years of work. You have solved problems, gained valuable experience, and developed skills that other people need.
              </p>
              <p className="mt-4 text-lg font-semibold text-navy-900 md:text-xl">But there may be a problem.</p>
            </Reveal>

            <div className="mt-10 space-y-5">
              <Reveal delay={60}>
                <div className="flex gap-5 rounded-md border border-slate-200 bg-white p-6 shadow-[0_18px_40px_-22px_rgba(7,26,50,0.35)] md:p-8">
                  <span className="font-body text-4xl font-bold leading-none text-red-600 md:text-5xl" aria-hidden="true">1</span>
                  <div>
                    <h3 className="font-display text-xl font-black tracking-tight text-navy-900 md:text-2xl">Your salary may be limiting your income.</h3>
                    <p className="mt-3 text-lg leading-relaxed text-slate-600">
                      You work hard, gain more experience, and take on more responsibilities. Yet your salary may still not be enough to give you the financial freedom you want.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div className="flex gap-5 rounded-md border border-slate-200 bg-white p-6 shadow-[0_18px_40px_-22px_rgba(7,26,50,0.35)] md:p-8">
                  <span className="font-body text-4xl font-bold leading-none text-red-600 md:text-5xl" aria-hidden="true">2</span>
                  <div>
                    <h3 className="font-display text-xl font-black tracking-tight text-navy-900 md:text-2xl">People benefit from your knowledge without paying you for it.</h3>
                    <p className="mt-3 text-lg leading-relaxed text-slate-600">
                      Friends, colleagues, and other people come to you for advice and help because you know what you’re doing. But most times, you help them without earning anything from it.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={160} className="mt-12">
              <p className="text-lg leading-relaxed text-slate-700 md:text-xl">
                What if you could turn that same knowledge into a service that people and businesses are willing to pay for? You could help businesses solve problems as a consultant or help individuals achieve their goals through coaching.
              </p>
              <div className="mt-8 rounded-md border-l-8 border-red-600 bg-navy-900 p-7 text-white shadow-xl shadow-navy-900/25 md:p-9">
                <p className="text-xl font-bold leading-snug md:text-2xl">
                  You don’t have to start from zero. You can start with the skills and experience you already have.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============================ BLUEPRINT ============================ */}
        <section className="tex-hero relative overflow-hidden text-white" aria-labelledby="blueprint-title">
          <div className="relative z-10 mx-auto max-w-3xl px-5 py-16 sm:px-8 md:py-24">
            <Reveal>
              <Eyebrow tone="dark">Introducing the 7-Step Expertise Monetization Blueprint</Eyebrow>
              <h2 id="blueprint-title" className="font-display text-3xl font-black leading-tight tracking-tight text-white md:text-5xl">
                Learn How to Turn Your Experience Into a Business
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-8 space-y-4 text-lg leading-relaxed text-white/80 md:text-xl">
                <p>
                  This Saturday, Business Growth Consultant <strong className="font-semibold text-white">Engr. Timothy Aderogba</strong> will show you how to take what you already know and turn it into a consulting or coaching business.
                </p>
                <p>During this free live webinar, you will learn a practical 7-step process for packaging your skills into a service people can pay for.</p>
                <p>
                  <strong className="font-semibold text-white">More than {REGISTRANTS} professionals</strong> have already registered across previous sessions to learn how to package their expertise into business offers.
                </p>
                <p>The goal is to help you prepare your offer and start positioning yourself for new business opportunities before the end of the year and into the new year.</p>
              </div>
            </Reveal>

            <Reveal delay={140} className="mt-14">
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-red-400">Here’s what you will learn</h3>
              <div className="mt-6 space-y-4">
                {LEARN.map((f, i) => (
                  <div key={f.title} className="rounded-md border border-white/10 bg-white/[0.05] p-6 shadow-lg shadow-black/20 backdrop-blur-sm md:p-8">
                    <p className="font-body text-xs font-bold uppercase tracking-[0.18em] text-red-400" aria-hidden="true">0{i + 1}</p>
                    <h4 className="mt-2 font-display text-xl font-black tracking-tight text-white md:text-2xl">{f.title}</h4>
                    <p className="mt-3 text-lg leading-relaxed text-white/70">{f.copy}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={180} className="mt-12">
              <CtaButton label="Register for the Webinar" />
              <p className="mt-4 text-sm font-semibold text-white/70">Saturday, {date} · 7:00 PM WAT</p>
            </Reveal>
          </div>
        </section>

        {/* ============================ WHO ============================ */}
        <section className="tex-paper relative" aria-labelledby="who-title">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 md:py-24">
            <Reveal>
              <h2 id="who-title" className="font-display text-3xl font-black leading-tight tracking-tight text-navy-900 md:text-5xl">
                Who Should Attend?
              </h2>
              <p className="mt-6 text-lg font-semibold text-navy-900 md:text-xl">This webinar is for you if:</p>
            </Reveal>

            <ul className="mt-6 space-y-4">
              {WHO.map((w, i) => (
                <Reveal as="li" key={w} delay={i * 70} className="flex items-start gap-4 rounded-md border border-slate-200 bg-white p-5 shadow-[0_14px_32px_-22px_rgba(7,26,50,0.4)]">
                  <CheckCircle2 className="mt-0.5 h-7 w-7 flex-none text-red-600" aria-hidden="true" />
                  <p className="text-lg leading-relaxed text-slate-700">{w}</p>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={120}>
              <p className="mt-8 text-lg leading-relaxed text-slate-600">
                You don’t need to have an existing consulting business. You can attend to learn how to get started with the experience you already have.
              </p>
            </Reveal>

            <Reveal delay={160} className="mt-10">
              <CtaButton label="Save My Seat" />
              <p className="mt-4 text-sm text-slate-500">Registration takes less than 60 seconds.</p>
            </Reveal>
          </div>
        </section>

        {/* ============================ HOST ============================ */}
        <section className="relative bg-slate-100" aria-labelledby="host-title">
          <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 md:py-24">
            <Reveal>
              <div className="mx-auto w-44 overflow-hidden rounded-md shadow-2xl shadow-navy-900/25 ring-4 ring-white md:w-52">
                <img
                  src={HOST_PHOTO}
                  alt={`${BRAND_NAME}, Business Growth Consultant and Go-to-Market Systems Engineer`}
                  width={480}
                  height={480}
                  loading="lazy"
                  decoding="async"
                  className="aspect-square w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-red-600">Meet Your Host</p>
              <h2 id="host-title" className="mt-2 font-display text-3xl font-black tracking-tight text-navy-900 md:text-4xl">
                {BRAND_NAME}
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <div className="mx-auto mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-slate-600">
                <p>Engr. Timothy Aderogba is a Business Growth Consultant and Go-to-Market Systems Engineer.</p>
                <p>He helps professionals turn their work experience and skills into consulting offers that businesses and individuals can pay for.</p>
                <p>He also helps set up systems and use AI tools to make it easier to find potential clients and manage business activities.</p>
                <p>During this webinar, he will share the steps you can follow to start turning your knowledge into a business opportunity.</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============================ REGISTRATION ============================ */}
        <section className="tex-hero relative overflow-hidden text-white" aria-labelledby="final-title">
          <div className="relative z-10 mx-auto max-w-3xl px-5 py-16 sm:px-8 md:py-24">
            <Reveal>
              <h2 id="final-title" className="font-display text-3xl font-black leading-tight tracking-tight text-white md:text-5xl">
                The End of the Year Is Getting Closer. Start Preparing Now.
              </h2>
              <div className="mt-7 space-y-4 text-lg leading-relaxed text-white/80 md:text-xl">
                <p>If you have been thinking about starting a consulting or coaching business, this is an opportunity to understand how to get started.</p>
                <p>You don’t need to have everything figured out before you begin. Start by learning how to package your skills, identify the right clients, and create a service people are willing to pay for.</p>
                <p className="font-semibold text-white">The webinar is free, but registration is required.</p>
              </div>
            </Reveal>

            <Reveal delay={80} className="mt-10">
              <dl className="grid gap-px overflow-hidden rounded-md border border-white/15 bg-white/15 text-left shadow-lg shadow-black/25 sm:grid-cols-3">
                <div className="bg-navy-900/90 px-5 py-4">
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-red-400">Date</dt>
                  <dd className="mt-1 font-semibold text-white">Saturday, {date}</dd>
                </div>
                <div className="bg-navy-900/90 px-5 py-4">
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-red-400">Time</dt>
                  <dd className="mt-1 font-semibold text-white">7:00 PM (WAT)</dd>
                </div>
                <div className="bg-navy-900/90 px-5 py-4">
                  <dt className="text-xs font-bold uppercase tracking-[0.16em] text-red-400">Access</dt>
                  <dd className="mt-1 font-semibold text-white">100% Free (No payment card is required)</dd>
                </div>
              </dl>
            </Reveal>

            <Reveal delay={140} className="mt-12">
              <div id="register" className="scroll-mt-4 rounded-md border-t-4 border-red-600 bg-white p-6 text-[#0f1c2e] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.65)] sm:p-9">
                <h3 className="font-display text-2xl font-black tracking-tight text-navy-900 md:text-3xl">Here’s How to Join</h3>
                <p className="mb-6 mt-3 text-base leading-relaxed text-slate-600">
                  Complete your registration below to lock in your seat and get the meeting link.
                </p>
                <RegistrationForm />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ============================ FOOTER ============================ */}
      <footer className="bg-navy-950 pb-24 text-white md:pb-0">
        <div className="mx-auto max-w-4xl px-5 py-12 text-center sm:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-white/85">
            {BRAND_NAME} <span className="mx-1 text-white/30">|</span> <span className="text-white/60">{BRAND_DESCRIPTOR}</span>
          </p>
          <nav className="mt-5 flex justify-center gap-6" aria-label="Legal">
            <a href="#privacy" onClick={openLegal("privacy")} className="text-xs font-bold uppercase tracking-[0.12em] text-white/55 transition hover:text-white">
              Privacy Policy
            </a>
            <a href="#terms" onClick={openLegal("terms")} className="text-xs font-bold uppercase tracking-[0.12em] text-white/55 transition hover:text-white">
              Terms of Use
            </a>
          </nav>
          <p className="mt-6 text-xs text-white/45">© 2026 Timothy Aderogba. All rights reserved.</p>
          <p className="mt-1 text-xs text-white/45">Educational webinar. Individual results may vary.</p>
          <p className="mx-auto mt-4 max-w-xl text-[11px] leading-relaxed text-white/30">
            This website is not affiliated with or endorsed by Facebook, Instagram, or Meta Platforms, Inc. Facebook and Instagram are trademarks of Meta Platforms, Inc.
          </p>
        </div>
      </footer>

      {/* Mobile-only sticky action bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy-950/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_30px_rgba(0,0,0,0.35)] backdrop-blur transition-transform duration-300 md:hidden ${
          showBar ? "translate-y-0" : "pointer-events-none translate-y-full"
        }`}
        aria-hidden={!showBar}
      >
        <a
          href="#register"
          tabIndex={showBar ? 0 : -1}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-red-600 py-3.5 text-base font-bold uppercase tracking-wide text-white active:bg-red-700"
        >
          Save My Seat <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
        <p className="mt-1.5 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-white/60">Free · Saturday {date} · 7:00 PM WAT</p>
      </div>

      {legalKey && <LegalModal doc={LEGAL[legalKey]} onClose={() => setLegalKey(null)} />}
    </div>
  );
}
