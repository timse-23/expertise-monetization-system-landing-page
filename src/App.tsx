import { useEffect, useRef, useState, type MouseEvent, type ReactNode, type Ref } from "react";
import { ArrowDown, ArrowRight, CheckCircle2, X } from "lucide-react";

/* ---------------------------------------------------------------------------
   Copy, links & media
--------------------------------------------------------------------------- */

const BRAND_NAME = "Engr. Timothy Aderogba";
const BRAND_DESCRIPTOR = "Expertise Monetization System";
const FORM_URL = "https://forms.serlzo.site/c4a411a6de21bb7396";
const HOST_PHOTO = "/images/timothy-aderogba.jpg";
const CTA_SUBTEXT = "Secure your spot in less than 60 seconds.";

const AUDIENCE = [
  "HR, Finance, and Tech Experts wanting to launch independent agencies or career coaching systems.",
  "Senior Professionals and Mid-Level Managers tired of hitting income ceilings and ready to command 2x to 3x their monthly pay through targeted retainers.",
  "Any Experienced Professional with proven skills and expertise who wants to finally start earning directly from their skills.",
];

const FEATURES = [
  {
    title: "The Commercialization Shift",
    copy: "How to stop selling your time as an employee and start packaging what you already know into a premium consulting or coaching service.",
  },
  {
    title: "The “Expensive Problem” Positioning",
    copy: "How to refine your offer so you are targeting clients with high purchasing power.",
  },
  {
    title: "The AI Revenue Engine",
    copy: "How to bypass technical overwhelm. You don’t have the time to learn complex integrations, so we will show you how AI tools can do the heavy lifting of client acquisition for you.",
  },
];

const NEXT_STEPS = [
  "Click the button below and enter your details in the form.",
  "You will be instantly redirected to our private WhatsApp Waitlist Group.",
  "Inside the group, you will receive high-value prompt templates, GTM frameworks, and the exclusive link to join the upcoming live orientation.",
];

/* ---------------------------------------------------------------------------
   Primitives
--------------------------------------------------------------------------- */

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

/** Large blocky crimson CTA with the mandatory 60-second reassurance line beneath. */
function CtaBlock({ label, tone }: { label: string; tone: "dark" | "light" }) {
  return (
    <div className="mx-auto w-full sm:w-[80%] text-center">
      <a
        href={FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex w-full items-center justify-center gap-3 rounded-md bg-red-600 py-5 text-xl font-bold text-white shadow-lg shadow-red-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-xl hover:shadow-red-600/30 active:translate-y-0"
      >
        <span>{label}</span>
        <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
      </a>
      <p className={`mt-3 text-sm ${tone === "dark" ? "text-white/55" : "text-slate-500"}`}>{CTA_SUBTEXT}</p>
    </div>
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

/* ---------------------------------------------------------------------------
   Legal modal
--------------------------------------------------------------------------- */

type LegalDoc = { title: string; sections: { h: string; p: string }[] };

const LEGAL: Record<string, LegalDoc> = {
  privacy: {
    title: "Privacy Policy",
    sections: [
      { h: "What we collect", p: "When you register through the external form, you submit your first name, email address, and WhatsApp phone number." },
      { h: "How we use it", p: "Your details are used only to add you to the waitlist, deliver the workshop link and bonuses, and send related reminders. We do not sell your information." },
      { h: "WhatsApp", p: "Once you join the WhatsApp waitlist group, your WhatsApp profile name and number may be visible to other group members. You can leave at any time." },
      { h: "Advertising", p: "Visitors may arrive through paid social advertisements. Those platforms use their own tracking technologies under their own privacy policies." },
    ],
  },
  terms: {
    title: "Terms of Use",
    sections: [
      { h: "Educational only", p: "This is an educational workshop. Nothing on this page or inside the workshop is financial, legal, tax, employment or investment advice." },
      { h: "No guarantees", p: "Examples and case studies illustrate specific results. Individual results vary based on skill, effort, niche, market conditions, and execution." },
      { h: "Materials", p: "Frameworks and templates provided are for your personal use and may not be resold or redistributed." },
      { h: "Changes", p: "Workshop dates, format, and bonuses may change at any time. Updates will be posted in the WhatsApp group." },
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
   The funnel — one narrow column, straight from hook to action
--------------------------------------------------------------------------- */

export default function App() {
  const [legalKey, setLegalKey] = useState<"privacy" | "terms" | null>(null);
  const openLegal = (key: "privacy" | "terms") => (e: MouseEvent) => {
    e.preventDefault();
    setLegalKey(key);
  };

  return (
    <div className="bg-white text-[#0f1c2e]">
      {/* Slim urgency strip — no navigation, no brand lockup */}
      <div className="border-b border-white/10 bg-navy-950 text-white">
        <p className="mx-auto max-w-4xl px-5 py-3 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-white/80 sm:px-8">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-red-600 align-middle" aria-hidden="true" />
          Free Orientation Workshop · October Cohort · Seats Are Limited
        </p>
      </div>

      <main id="main">
        {/* ============================ HERO ============================ */}
        <section className="bg-navy-900 text-white" aria-labelledby="hero-title">
          <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 md:py-24">
            <Reveal>
              <p className="mb-6 border-l-2 border-red-600 pl-4 text-xs font-bold uppercase tracking-[0.16em] text-white/75 sm:text-sm">
                Attention: For experienced professionals with 3+ years of expertise
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1 id="hero-title" className="font-display text-5xl font-black leading-[1.04] tracking-tight text-white md:text-6xl">
                Your CV Is Not A{" "}
                <span className="underline decoration-red-600 decoration-[10px] underline-offset-[10px]">Sellable Offer</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/80 md:text-xl">
                Stop volunteering your best advice and discover how to package your knowledge into a profitable consulting or coaching business{" "}
                <strong className="font-bold text-white">before December</strong> without quitting your job, becoming an influencer, or spending months on complex automation.
              </p>
            </Reveal>

            <Reveal delay={240} className="mt-10">
              <CtaBlock label="Save My Free Seat" tone="dark" />
              <p className="mt-6 text-center">
                <a
                  href="#covered"
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-white/60 transition hover:text-white"
                >
                  See what’s covered in the workshop
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </a>
              </p>
            </Reveal>

            <Reveal delay={300} className="mt-12">
              <p className="border-t border-white/10 pt-6 text-base text-white/60">
                <span className="font-body text-2xl font-bold text-red-500">22+</span>{" "}
                professionals have already used this exact 7-step blueprint to package a high-ticket offer in 14 days.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============================ PROBLEM ============================ */}
        <section className="bg-white" aria-label="The commercialization gap">
          <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 md:py-24">
            <Reveal>
              <Eyebrow>The Problem</Eyebrow>
              <p className="text-2xl font-medium leading-snug tracking-tight text-navy-900 md:text-[2rem]">
                If you have spent years solving people’s problems and mastering your craft, you are sitting on a goldmine without realizing it.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-slate-600 md:text-xl">
                But right now, you are likely trapped in one of two frustrating realities:
              </p>
            </Reveal>

            <div className="mt-12 space-y-12">
              <Reveal delay={60}>
                <div className="flex gap-6">
                  <span className="font-body text-4xl font-bold leading-none text-red-600 md:text-5xl" aria-hidden="true">01</span>
                  <div>
                    <h3 className="font-display text-xl font-black tracking-tight text-navy-900 md:text-2xl">The Salary Ceiling</h3>
                    <p className="mt-3 text-lg leading-relaxed text-slate-600">
                      You are locked into a corporate structure where the take-home pay slip you get at the end of the month is actually not sufficient to take you home.
                    </p>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div className="flex gap-6">
                  <span className="font-body text-4xl font-bold leading-none text-red-600 md:text-5xl" aria-hidden="true">02</span>
                  <div>
                    <h3 className="font-display text-xl font-black tracking-tight text-navy-900 md:text-2xl">The Free Advice Trap</h3>
                    <p className="mt-3 text-lg leading-relaxed text-slate-600">
                      You have a unique set of skills that others are actively looking for, but right now, you are probably just volunteering it; fixing problems for free without being compensated for the immense value you deliver.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={160} className="mt-14">
              <div className="rounded-md border-l-8 border-red-600 bg-navy-900 p-8 text-white md:p-10">
                <p className="text-lg leading-relaxed md:text-xl">
                  <strong className="font-black">The problem is not your competence.</strong> The problem is the{" "}
                  <strong className="font-black text-red-500">commercialization gap</strong>. Whether you want to consult for B2B enterprises or build a B2C career coaching business, the market does not pay for impressive job titles — they pay to eliminate urgent problems.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============================ SOLUTION ============================ */}
        <section id="covered" className="bg-navy-900 text-white" aria-labelledby="solution-title">
          <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 md:py-24">
            <Reveal>
              <Eyebrow tone="dark">The Solution</Eyebrow>
              <h2 id="solution-title" className="font-display text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
                The Expertise Monetization Blueprint
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <p className="mt-8 text-lg leading-relaxed text-white/80 md:text-xl">
                You do not need to quit your job today, become a social media influencer, or spend months learning complex technical automation. You just need a proven system to implement. This October, I am hosting a series of{" "}
                <strong className="font-bold text-white">Free Orientation Workshops</strong>.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-white/70">
                Just by showing up, you’ll walk away with the exact 7-step expertise monetization blueprint that Engr. Timothy Aderogba uses to transition professionals from underpaid employees to highly-paid specialists. We have already helped{" "}
                <strong className="font-bold text-white">22+ professionals package a high-ticket offer in 14 days</strong> using this exact framework. During this live session, we will break down the complete “Expertise Monetization into Coaching – Consulting Business” strategy so you can get your offer ready to capture the end-of-year and Q1 rush.
              </p>
            </Reveal>

            <Reveal delay={140} className="mt-14">
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-red-500">Here is exactly what you will discover:</h3>
              <div className="mt-6">
                {FEATURES.map((f, i) => (
                  <div key={f.title} className="group -mx-4 rounded-md border-t border-white/10 px-4 py-8 transition-colors duration-200 hover:bg-white/[0.04]">
                    <p className="font-body text-xs font-bold uppercase tracking-[0.18em] text-red-500" aria-hidden="true">0{i + 1}</p>
                    <h4 className="mt-2 font-display text-xl font-black tracking-tight text-white md:text-2xl">{f.title}</h4>
                    <p className="mt-3 text-lg leading-relaxed text-white/70">{f.copy}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={180} className="mt-12">
              <CtaBlock label="Save My Free Seat" tone="dark" />
            </Reveal>
          </div>
        </section>

        {/* ============================ AUDIENCE ============================ */}
        <section className="bg-white" aria-labelledby="audience-title">
          <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 md:py-24">
            <Reveal>
              <Eyebrow>Who This Is For</Eyebrow>
              <h2 id="audience-title" className="font-display text-4xl font-black leading-tight tracking-tight text-navy-900 md:text-5xl">
                Who Is This For?
              </h2>
            </Reveal>

            <ul className="mt-10 space-y-7">
              {AUDIENCE.map((a, i) => (
                <Reveal as="li" key={a} delay={i * 80} className="flex items-start gap-4">
                  <CheckCircle2 className="mt-1 h-7 w-7 flex-none text-red-600" aria-hidden="true" />
                  <p className="text-lg leading-relaxed text-slate-700 md:text-xl">{a}</p>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={200} className="mt-14">
              <CtaBlock label="Save My Free Seat" tone="light" />
            </Reveal>
          </div>
        </section>

        {/* ============================ HOST ============================ */}
        <section className="bg-slate-50" aria-labelledby="host-title">
          <div className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8 md:py-24">
            <Reveal>
              <div className="mx-auto w-44 overflow-hidden rounded-md shadow-xl shadow-navy-900/15 ring-4 ring-white md:w-52">
                <img
                  src={HOST_PHOTO}
                  alt={`${BRAND_NAME}, Go-To-Market Systems Engineer`}
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
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
                Timothy is a Go-To-Market Systems Engineer and Business Consultant who helps mid-level professionals transform their existing corporate skills into high-value consulting offers. You bring the expertise, and Timothy provides the operational architecture; installing a fully automated, AI-driven revenue engine so you can focus strictly on consulting and coaching.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============================ FINAL CTA ============================ */}
        <section id="registration" className="bg-navy-900 text-white" aria-labelledby="final-title">
          <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 md:py-24">
            <Reveal>
              <h2 id="final-title" className="font-display text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
                Secure Your Spot Before The End-Of-Year Rush
              </h2>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/75 md:text-xl">
                Traffic from our ad campaign is filling up the October workshop slots fast. To ensure you get the exact frameworks before companies finalize their budgets, you need to act now.
              </p>
            </Reveal>

            <Reveal delay={80} className="mt-12">
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-red-500">Next Steps:</h3>
              <ol className="mt-6 space-y-5">
                {NEXT_STEPS.map((step, i) => (
                  <li key={step} className="flex items-start gap-5">
                    <span className="grid h-11 w-11 flex-none place-items-center rounded-full border-2 border-red-600 font-body text-lg font-semibold text-white" aria-hidden="true">
                      {i + 1}
                    </span>
                    <p className="pt-2 text-lg leading-relaxed text-white/80">{step}</p>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={160} className="mt-12">
              <CtaBlock label="Save my free Seat" tone="dark" />
            </Reveal>

            <Reveal delay={220} className="mt-10">
              <p className="text-center text-sm text-white/50">
                No card required. If the live session isn’t worth your time, simply leave — you keep the bonus templates either way.
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ============================ FOOTER ============================ */}
      <footer className="bg-navy-950 text-white">
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
          <p className="mt-1 text-xs text-white/45">Educational workshop. Individual results vary.</p>
          <p className="mx-auto mt-4 max-w-xl text-[11px] leading-relaxed text-white/30">
            This site is not a part of the Facebook or Instagram websites or Meta Platforms, Inc. Additionally, this site is not endorsed by Meta in any way. Facebook and Instagram are trademarks of Meta Platforms, Inc.
          </p>
        </div>
      </footer>

      {legalKey && <LegalModal doc={LEGAL[legalKey]} onClose={() => setLegalKey(null)} />}
    </div>
  );
}
