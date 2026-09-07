import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import {
  exploreLinks,
  impactPillars,
  technologyCards,
  technologyHighlights,
  values,
  socialLinks,
} from "../data";
import { Constellation } from "../components/Constellation";
import { RobotSentinel, type RobotTarget } from "../components/RobotSentinel";

export function Home() {
  useEffect(() => {
    document.title = "T3raTech Solutions | African Software Systems";
  }, []);

  const [robotTarget, setRobotTarget] = useState<RobotTarget>(null);

  return (
    <>
      {/* ── Constellation hero ─────────────────────────────────────────── */}
      <section className="constellation-hero" aria-label="T3raTech product constellation">
        <div className="constellation-hero-overlay" />
        <Constellation onHoverChange={setRobotTarget} />

        {/* Top-left compact brand panel — pointer-events:none so it never blocks nodes */}
        <div className="constellation-hero-content">
          <p className="kicker">Build in Africa, for Africa</p>
          <h1>T3raTech Solutions</h1>
          <p className="constellation-hero-copy">
            A proudly Zimbabwean and African software company building digital systems for civic
            voice, inclusive commerce, agentic software delivery, and connected technology
            communities.
          </p>

          {/*
            The socials belong to the column the words are in.

            They were a sibling of the brand block, pinned to the hero's bottom-left
            corner. In the stacked layout that put them on top of the last lines of the
            paragraph, and every attempt to unpin them fought a rule from another
            breakpoint. Nested here they follow the copy in both layouts by construction,
            with no positioning to undo.
          */}
          <div className="constellation-socials">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  title={social.name}
                >
                  <Icon size={18} strokeWidth={2} />
                </a>
              );
            })}
          </div>
        </div>

        <p className="constellation-hint">Hover any node to explore</p>
        <RobotSentinel target={robotTarget} />
      </section>

      {/* ── Existing sections (unchanged, current localhost style) ─────── */}
      <section className="mission-strip" aria-label="Company mission">
        <div className="section-inner mission-grid">
          <div>
            <p className="section-label">Company focus</p>
            <h2>World-class software shaped around African realities.</h2>
          </div>
          <p>
            T3raTech Solutions designs, builds, and delivers practical software, technology consulting,
            strategic partnerships, and R&D. These systems translate that focus into tools for African
            civic participation, economic access, and high-trust automation.
          </p>
        </div>
      </section>

      <section className="profile-section" aria-labelledby="profile-title">
        <div className="section-inner profile-grid">
          <div>
            <p className="section-label">Mission</p>
            <h2 id="profile-title">
              We design, build, and deliver digital solutions tailored to Africa's challenges and opportunities.
            </h2>
          </div>
          <div className="profile-copy">
            <p>
              Our mission is to deliver world-class software while fostering local talent, investing in
              innovation, and forming strong strategic partnerships across the continent and beyond.
            </p>
            <p>
              Our vision is to be Africa's most trusted and innovative software development and consulting
              company, championing technology that solves real problems and uplifts communities.
            </p>
            <div className="values-list" aria-label="T3raTech values">
              {values.map((value) => (
                <span key={value}>{value}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="impact-section" aria-labelledby="impact-title">
        <div className="section-inner impact-grid">
          <div>
            <p className="section-label">African problem-solving</p>
            <h2 id="impact-title">Software that meets people where the work already happens.</h2>
          </div>
          <div className="impact-rows">
            {impactPillars.map((pillar) => (
              <article className="impact-row" key={pillar.label}>
                <span>{pillar.label}</span>
                <div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="technology-section" id="technology" aria-labelledby="technology-title">
        <div className="section-inner">
          <div className="section-heading">
            <p className="section-label">Bleeding-edge, practical engineering</p>
            <h2 id="technology-title">Advanced technology is useful only when it makes real systems safer, faster, and clearer.</h2>
            <p className="technology-lead">
              We choose tools for resilience, scale, and speed of delivery. The point is not novelty for its own
              sake; it is building systems that can serve real users, survive change, and keep moving.
            </p>
            <div className="technology-tags" aria-label="Technology highlights">
              {technologyHighlights.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className="technology-grid">
            {technologyCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title}>
                  <Icon size={26} strokeWidth={2} />
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="explore-section" aria-labelledby="explore-title">
        <div className="section-inner">
          <div className="section-heading">
            <p className="section-label">Explore T3raTech</p>
            <h2 id="explore-title">Everything we build, in one place.</h2>
          </div>
          <div className="explore-grid">
            {exploreLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link className="explore-card" to={link.path} key={link.path}>
                  <span className="explore-icon">
                    <Icon size={26} strokeWidth={2} />
                  </span>
                  <h3>{link.label}</h3>
                  <p>{link.description}</p>
                  <span className="explore-cta">
                    Open {link.label}
                    <ArrowUpRight size={16} strokeWidth={2.2} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
