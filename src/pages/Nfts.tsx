import { useEffect } from "react";
import { ArrowUpRight, Palette } from "lucide-react";
import { nftSeriesList } from "../data";

export function Nfts() {
  useEffect(() => {
    document.title = "NFTs | T3rnel Genesis Series";
  }, []);

  return (
    <section className="nft-section page-section" id="nfts" aria-labelledby="nft-title">
      <div className="section-inner">
        <div className="section-heading">
          <p className="section-label">Agentic Art Collection</p>
          <h2 id="nft-title">Genesis Series NFTs</h2>
          <p className="technology-lead">
            Autonomous agent-generated artwork from the T3rnel Agent OS genesis collection. Each series represents a distinct core component of our autonomous agent architecture.
          </p>
        </div>

        <div className="nft-grid">
          {nftSeriesList.map((nft) => (
            <article className="nft-card" key={nft.name}>
              <div className="nft-media">
                <img src={nft.image} alt={nft.name} loading="lazy" />
              </div>
              <div className="nft-content">
                <span className="nft-series-key">{nft.seriesKey}</span>
                <h3>{nft.name}</h3>
                <p className="nft-tagline">{nft.tagline}</p>
                <p className="nft-description">{nft.description}</p>
                <a className="button nft-button" href={nft.openseaUrl} target="_blank" rel="noreferrer">
                  <Palette size={16} strokeWidth={2.2} />
                  View on OpenSea
                  <ArrowUpRight size={16} strokeWidth={2.2} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
