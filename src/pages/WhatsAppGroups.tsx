import { useEffect } from "react";
import { UsersRound } from "lucide-react";
import { scitechCommunityUrl, scitechGroups } from "../data";

export function WhatsAppGroups() {
  useEffect(() => {
    document.title = "WhatsApp Groups | SciTech Zimbabwe";
  }, []);

  return (
    <section className="community-section page-section" id="community" aria-labelledby="community-title">
      <div className="section-inner">
        <div className="community-intro">
          <div>
            <p className="section-label">SciTech Zimbabwe</p>
            <h2 id="community-title">A national WhatsApp community for Zimbabwe's science and technology people.</h2>
          </div>
          <div className="community-copy">
            <p>
              SciTech Zimbabwe is the community layer around our work: a growing network where builders,
              technologists, entrepreneurs, job seekers, traders, gamers, property people, event organizers,
              and curious citizens find each other.
            </p>
            <div className="community-actions">
              <a className="button community-button" href={scitechCommunityUrl} target="_blank" rel="noreferrer">
                <UsersRound size={18} strokeWidth={2.2} />
                Join SciTech Zimbabwe
              </a>
              <span>16 groups across tech, jobs, commerce, markets, property, events, and culture.</span>
            </div>
          </div>
        </div>

        <div className="community-feature">
          <img src="/assets/scitech/scitech-zimbabwe.jpg" alt="" loading="lazy" />
          <div>
            <p className="section-label">Community operating system</p>
            <h3>Built in the channels Zimbabweans already use.</h3>
            <p>
              The community reflects the same T3raTech philosophy as our products: meet people where real
              activity already happens, organize the signal, and turn scattered energy into useful networks.
            </p>
          </div>
        </div>

        <div className="community-grid">
          {scitechGroups.map((group) => (
            <article className="community-card" key={group.name}>
              <img src={group.image} alt="" loading="lazy" />
              <div>
                <span>{group.category}</span>
                <h3>{group.name}</h3>
                <p>{group.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
