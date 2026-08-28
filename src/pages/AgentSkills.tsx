import { useEffect } from "react";
import { ArrowUpRight, BookOpen, Check } from "lucide-react";
import { agentSkills, mcpProduct } from "../data";

/**
 * Agent skills are a third product, not a footnote on the MCP page.
 *
 * A skill is what an AI client reads before deciding how to approach a task, and it is a
 * distinct thing people look for — separate from the extension and from the server.
 */
export function AgentSkills() {
  useEffect(() => {
    document.title = "Agent Skills | T3raTech";
  }, []);

  return (
    <section className="store-section page-section" aria-labelledby="skills-title">
      <div className="section-inner">
        <div className="section-heading">
          <p className="section-label">Agent skills</p>
          <h2 id="skills-title">Teaching an assistant when — and when not to</h2>
          <p className="technology-lead">
            Tools tell an assistant what it can do. A skill tells it when.
          </p>
          <p className="chrome-description">
            A skill is a Markdown file an AI client reads before it decides how to approach
            a task. Ours are free and open, they work with Claude Code, Claude Desktop and
            any other client that reads skills, and they are written from the things that
            actually went wrong rather than from the happy path.
          </p>
        </div>

        {agentSkills.map((skill) => (
          <div className="chrome-card" key={skill.name}>
            <div className="store-card-top">
              <BookOpen size={20} strokeWidth={2.2} />
              <span className="store-badge">Skill</span>
            </div>
            <h3>{skill.name}</h3>
            <p className="technology-lead">{skill.tagline}</p>
            <p className="chrome-description">{skill.description}</p>
            <ul className="chrome-features">
              {skill.points.map((point) => (
                <li key={point}>
                  <Check size={16} strokeWidth={2.2} /> {point}
                </li>
              ))}
            </ul>
            <a className="button store-button chrome-button" href={skill.sourceUrl} target="_blank" rel="noreferrer">
              Read the skill
              <ArrowUpRight size={16} strokeWidth={2.2} />
            </a>
            {skill.registryUrl ? (
              <a className="button" href={skill.registryUrl} target="_blank" rel="noreferrer">
                On Smithery
                <ArrowUpRight size={16} strokeWidth={2.2} />
              </a>
            ) : null}
          </div>
        ))}

        <div className="chrome-card">
          <h3>Installing one</h3>
          <p className="chrome-description">
            Copy the folder into your client&apos;s skills directory — <code>~/.claude/skills/</code>{" "}
            for your account, or <code>.claude/skills/</code> inside a project. They are plain
            Markdown, so read one before installing it. That is advice we would give about
            anybody&apos;s.
          </p>
          <p className="chrome-description">
            They pair with the{" "}
            <a href={mcpProduct.sourceUrl} target="_blank" rel="noreferrer">
              MCP Session Bridge
            </a>
            , which is what gives an assistant the browser tools these skills describe.
          </p>
          <h3>Why they are tested</h3>
          <p className="chrome-description">
            A skill is an instruction another system follows without checking. One naming a
            tool that no longer exists, or a limit that has moved, sends an agent down a
            path the skill was written to rule out. So every tool they name is asserted to
            exist and every number they quote is compared against what the code serves —
            they fail the build rather than mislead a reader.
          </p>
        </div>
      </div>
    </section>
  );
}
