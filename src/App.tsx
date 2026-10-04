import { useEffect } from "react";

const FORM_URL = "https://forms.serlzo.site/c4a411a6de21bb7396";
const BRAND_NAME = "Engineer Timothy Aderogba";
const BRAND_SYSTEM = "Expertise Monetization System";
const PRIMARY_CTA = "Save My Free Seat";
const SECONDARY_CTA = "See what's Covered";

const blueprintFeatures = [
  {
    title: "The Commercialization Shift:",
    copy: "How to stop selling your time as an employee and start packaging what you already know into a premium consulting or coaching service.",
  },
  {
    title: "The \"Expensive Problem\" Positioning:",
    copy: "How to refine your offer so you are targeting clients with high purchasing power.",
  },
  {
    title: "The AI Revenue Engine:",
    copy: "How to bypass technical overwhelm. You don't have the time to learn complex integrations, so we will show you how AI tools can do the heavy lifting of client acquisition for you.",
  },
];

const audienceSegments = [
  "HR, Finance, and Tech Experts wanting to launch independent agencies or career coaching systems.",
  "Senior Professionals and Mid-Level Managers tired of hitting income ceilings and ready to command 2x to 3x their monthly pay through targeted retainers.",
  "Any Experienced Professional with proven skills and expertise who wants to finally start earning directly from their skills.",
];

// Reveal content as it enters view while keeping the page usable without IntersectionObserver.
function useScrollReveals() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="arrow-icon" fill="none">
      <path d="M3.5 10h12M10.5 4.5 16 10l-5.5 5.5" />
    </svg>
  );
}

type CtaVariant = "primary" | "secondary";

function CallToAction({
  variant = "primary",
  href,
  compact = false,
  children,
}: {
  variant?: CtaVariant;
  href: string;
  compact?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      className={`cta-button cta-button--${variant}${compact ? " cta-button--compact" : ""}`}
      href={href}
    >
      <span>{children}</span>
      {variant === "primary" ? <ArrowIcon /> : null}
    </a>
  );
}

function HeroActions({ stacked = false }: { stacked?: boolean }) {
  return (
    <div className={`hero-actions${stacked ? " hero-actions--stacked" : ""}`}>
      <CallToAction href="#registration">{PRIMARY_CTA}</CallToAction>
      <CallToAction variant="secondary" href="#blueprint">{SECONDARY_CTA}</CallToAction>
    </div>
  );
}

function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <a className="brand-lockup" href="#top" aria-label={`${BRAND_NAME}, ${BRAND_SYSTEM}, home`}>
      <span className={`brand-avatar${compact ? " brand-avatar--compact" : ""}`} aria-hidden="true">
        <img src="/images/timothy-aderogba.jpg" alt="" width={96} height={96} loading="eager" decoding="async" />
      </span>
      <span className="brand-copy">
        <span className="brand-name">{BRAND_NAME}</span>
        <span className="brand-descriptor">{BRAND_SYSTEM}</span>
      </span>
    </a>
  );
}

function SiteHeader() {
  return (
    <header className="site-header">
      <div className="nav-inner">
        <BrandLockup />
        <nav className="primary-nav" aria-label="Main navigation">
          <a href="#blueprint">What's covered</a>
          <a href="#audience">Who it's for</a>
          <a href="#host">Your host</a>
        </nav>
        <div className="nav-actions">
          <CallToAction variant="secondary" href="#blueprint" compact>
            {SECONDARY_CTA}
          </CallToAction>
          <CallToAction href="#registration" compact>
            {PRIMARY_CTA}
          </CallToAction>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="hero-section" id="top" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        <img
          src="/images/consulting-hero.jpg"
          alt=""
          width={1536}
          height={864}
          fetchPriority="high"
        />
      </div>
      <div className="hero-content content-width">
        <p className="hero-preheadline hero-enter hero-enter-1">
          ATTENTION: FOR EXPERIENCED PROFESSIONALS WITH 3+ YEARS OF EXPERTISE
        </p>
        <h1 className="hero-title hero-enter hero-enter-2" id="hero-title">
          Your CV Is Not A<br />Sellable Offer.
        </h1>
        <p className="hero-summary hero-enter hero-enter-3">
          Stop Volunteering Your Best Advice and Discover How to Package Your Knowledge into a Profitable Consulting or Coaching Business Before December.
        </p>
        <div className="hero-enter hero-enter-4">
          <HeroActions />
        </div>
      </div>
      <span className="hero-grain" aria-hidden="true" />
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="problem-section section-space" aria-labelledby="problem-title">
      <div className="content-width">
        <div className="problem-layout">
          <h2 className="problem-intro reveal" data-reveal id="problem-title">
            If you have spent years solving peoples’ problems and mastering your craft, you are sitting on a goldmine without realizing it. But right now, you are likely trapped in one of two frustrating realities:
          </h2>
          <div className="problem-list">
            <article className="problem-item reveal" data-reveal>
              <span className="problem-number" aria-hidden="true">01</span>
              <div>
                <h3>The Salary Ceiling:</h3>
                <p>You are locked into a corporate structure where the take-home pay slip you get at the end of the month is actually not sufficient to take you home.</p>
              </div>
            </article>
            <article className="problem-item reveal" data-reveal style={{ transitionDelay: "100ms" }}>
              <span className="problem-number" aria-hidden="true">02</span>
              <div>
                <h3>The Free Advice Trap:</h3>
                <p>You have a unique set of skills that others are actively looking for, but right now, you are probably just volunteering it; fixing problems for free without being compensated for the immense value you deliver.</p>
              </div>
            </article>
          </div>
        </div>
        <p className="problem-conclusion reveal" data-reveal>
          The problem is not your competence. The problem is the commercialization gap. Whether you want to consult for B2B enterprises or build a B2C career coaching business, the market does not pay for impressive job titles, they pay to eliminate urgent problems.
        </p>
      </div>
    </section>
  );
}

function BlueprintSection() {
  return (
    <section className="blueprint-section section-space" id="blueprint" aria-labelledby="blueprint-title">
      <div className="blueprint-orbit" aria-hidden="true" />
      <div className="content-width blueprint-content">
        <h2 className="section-title blueprint-title reveal" data-reveal id="blueprint-title">
          The Solution: The Expertise Monetization Blueprint
        </h2>
        <div className="blueprint-copy">
          <p className="reveal" data-reveal>
            You do not need to quit your job today, become a social media influencer, or spend months learning complex technical automation. You just need proven system to implement. This October, I am hosting a series of Free Orientation Workshops.
          </p>
          <p className="reveal" data-reveal style={{ transitionDelay: "100ms" }}>
            Just by showing up, you'll walk away with the exact 7-step expertise monetization blueprint that Engr. Timothy Aderogba uses to transition professionals from underpaid employees to highly-paid specialists. We have already helped 22+ professionals package high-ticket offer in 14 days using this exact framework. During this live session, we will break down the complete "Expertise Monetization into Coaching - Consulting Business" strategy so you can get your offer ready to capture the end-of-year and Q1 rush.
          </p>
        </div>
        <h3 className="features-heading reveal" data-reveal>Here is exactly what you will discover:</h3>
        <div className="feature-list">
          {blueprintFeatures.map((feature, index) => (
            <article
              className="feature-item reveal"
              data-reveal
              key={feature.title}
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <span className="feature-number" aria-hidden="true">0{index + 1}</span>
              <h4>{feature.title}</h4>
              <p>{feature.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AudienceSection() {
  return (
    <section className="audience-section section-space" id="audience" aria-labelledby="audience-title">
      <div className="content-width audience-layout">
        <h2 className="section-title audience-title reveal" data-reveal id="audience-title">Who Is This For?</h2>
        <ul className="audience-list">
          {audienceSegments.map((segment, index) => (
            <li className="audience-item reveal" data-reveal key={segment} style={{ transitionDelay: `${index * 90}ms` }}>
              <span className="audience-marker" aria-hidden="true" />
              <p>{segment}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function HostSection() {
  return (
    <section className="host-section section-space" id="host" aria-labelledby="host-title">
      <div className="content-width host-layout">
        <div className="host-copy reveal" data-reveal>
          <span className="host-rule" aria-hidden="true" />
          <h2 className="section-title" id="host-title">Meet Your Host: Engr. Timothy Aderogba</h2>
          <p>
            Timothy is a Go-To-Market Systems Engineer who helps mid-level professionals transform their existing corporate skills into high-value consulting offers. You bring the expertise, and Timothy provides the operational architecture; installing a fully automated, AI-driven revenue engine so you can focus strictly on consulting and coaching.
          </p>
        </div>
        <figure className="host-portrait reveal" data-reveal style={{ transitionDelay: "120ms" }}>
          <img
            src="/images/timothy-aderogba.jpg"
            alt="Portrait of Engr. Timothy Aderogba"
            width={840}
            height={1050}
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}

const registrationSteps = [
  "Click the button below and enter your details in the form.",
  "You will be instantly redirected to our private WhatsApp Waitlist Group.",
  "Inside the group, you will receive high-value prompt templates, GTM frameworks, and the exclusive link to join the upcoming live orientation.",
];

function RegistrationSection() {
  return (
    <section className="registration-section section-space" id="registration" aria-labelledby="registration-title">
      <div className="registration-glow" aria-hidden="true" />
      <div className="content-width registration-layout registration-layout--single">
        <div className="registration-copy">
          <h2 className="section-title registration-title reveal" data-reveal id="registration-title">
            Secure Your Spot Before The End-Of-Year Rush
          </h2>
          <p className="registration-intro reveal" data-reveal>
            Traffic from our ad campaign is filling up the October workshop slots fast. To ensure you get the exact frameworks before companies finalize their budgets, you need to act now.
          </p>
          <div className="steps-block reveal" data-reveal style={{ transitionDelay: "100ms" }}>
            <h3>Next Steps:</h3>
            <ol className="steps-list">
              {registrationSteps.map((step, index) => (
                <li key={step}>
                  <span className="step-number" aria-hidden="true">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="registration-card reveal" data-reveal>
          <p className="registration-card-note">Tap below to open the short registration form.</p>
          <a
            className="cta-button cta-button--primary form-submit"
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Save my free Seat</span>
            <ArrowIcon />
          </a>
          <p className="registration-card-fine">
            After submitting the form, you will receive access to the WhatsApp waitlist and orientation details.
          </p>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="content-width footer-inner">
        <BrandLockup />
        <nav className="footer-nav" aria-label="Footer navigation">
          <a href="#registration">Save your seat</a>
          <a href="#blueprint">What's covered</a>
          <a href="#audience">Who it's for</a>
          <a href="#host">Your host</a>
          <a href="/privacy.html">Privacy Policy</a>
          <a href="/terms.html">Terms of Use</a>
        </nav>
        <div className="footer-meta">
          <p className="copyright">&copy; 2026 Timothy Aderogba. All rights reserved.</p>
          <p className="footer-disclaimer">Educational workshop. Individual results vary.</p>
          <p className="footer-disclaimer">Meta Ads Disclaimer: This landing page may be promoted through Meta advertising. All claims and offers are the responsibility of the workshop host and do not represent an endorsement, partnership, or guarantee by Meta Platforms, Inc.</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useScrollReveals();

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <ProblemSection />
        <BlueprintSection />
        <AudienceSection />
        <HostSection />
        <RegistrationSection />
      </main>
      <SiteFooter />
    </>
  );
}