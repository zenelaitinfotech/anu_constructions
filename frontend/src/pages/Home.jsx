import React, { useState, useEffect } from "react";
import Hero from "../components/Hero/Hero";
import { STATS, SERVICES_DATA, PROJECTS_DATA, MARKET_SECTORS, NEWS_DATA } from "../utils/constants";
import API_BASE from "../config/api";

export default function Home({ setPage }) {
  const [stats, setStats] = useState(STATS);
  const [services, setServices] = useState(SERVICES_DATA);
  const [projects, setProjects] = useState(PROJECTS_DATA);
  const [news, setNews] = useState(NEWS_DATA);
  const [aboutFounder, setAboutFounder] = useState({
    title: "About Anu Building Constructions",
    subtitle: "Meet Our Founder & Managing Director",
    content: "Anu Building Constructions, established in 2004, has grown to become Coimbatore's and South India's trusted premier builder of dream homes, luxury villas, apartment complexes, and high-quality commercial structures. Under the dynamic leadership of our founder, we have successfully handed over more than 2,500 projects. Our commitment to excellence, transparent pricing, premium certified materials, and on-time delivery form the foundation of our long-term client relationships. We continue to innovate with sustainable building designs and advanced prefabricated office systems.",
    founderName: "Mr. P. Anbarasan",
    founderRole: "Founder & Managing Director",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80"
  });

  useEffect(() => {
    // Fetch stats
    fetch(`${API_BASE}/api/stats`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          const updatedStats = [
            { num: "20+", label: "Years of Excellence" },
            { num: data.activeProjectsCount ? `${data.activeProjectsCount * 50}+` : "2,500+", label: "Homes Built" },
            { num: "500+", label: "Happy Families" },
            { num: data.safetyEMR ? `${data.safetyEMR} EMR` : "50+", label: "Safety Rating" }
          ];
          setStats(updatedStats);
        }
      })
      .catch(err => console.log("Failed fetching stats, using defaults.", err));

    // Fetch services
    fetch(`${API_BASE}/api/services`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setServices(data.map(s => ({
            title: s.title,
            desc: s.descText || s.description,
            img: s.img
          })));
        }
      })
      .catch(err => console.log("Failed fetching services, using defaults.", err));

    // Fetch projects
    fetch(`${API_BASE}/api/projects`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setProjects(data.map(p => ({
            title: p.title,
            cat: p.category,
            location: p.location,
            img: p.image,
            desc: p.description
          })));
        }
      })
      .catch(err => console.log("Failed fetching projects, using defaults.", err));

    // Fetch news/insights
    fetch(`${API_BASE}/api/insights`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const mapped = data.map((item, index) => {
            const defaultImages = [
              "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80",
              "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=80",
              "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80"
            ];
            return {
              date: item.date,
              category: item.category,
              title: item.title,
              img: item.imageUrl || defaultImages[index % defaultImages.length],
              excerpt: item.summary || item.content
            };
          });
          setNews(mapped);
        }
      })
    // Fetch about founder
    fetch(`${API_BASE}/api/about-founder`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setAboutFounder(data[0]);
        }
      })
      .catch(err => console.log("Failed fetching founder info, using defaults.", err));
  }, []);

  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Stats Bar */}
      <section style={{ background: "#1D4ED8", padding: "2.5rem 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 ", padding: "0 2rem", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "2rem" }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ color: "white", fontSize: 36, fontWeight: 800, lineHeight: 1 }}>{s.num}</div>
              <div style={{ color: "#BFDBFE", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About Intro */}
      <style>{`
        @keyframes aboutGradientBG {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes aboutCardGradient {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <section style={{
        background: "linear-gradient(-45deg, #ddddf0, #222233, #caebf8, #1a1a2e)",
        backgroundSize: "400% 400%",
        animation: "aboutGradientBG 12s ease infinite",
        padding: "6rem 0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div style={{ maxWidth: 1400, margin: "0 ", padding: "0 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15rem", alignItems: "center" }}>
          <div style={{
            padding: "2rem",
            borderRadius: "40px",
            background: "linear-gradient(-45deg, #ddddf0, #caebf8, #ddddf0, #caebf8)",
            backgroundSize: "300% 300%",
            animation: "aboutCardGradient 8s ease infinite",
            boxShadow: "0 20px 60px rgba(34,34,51,0.35)"
          }}>
            <p style={{ color: "#EF4444", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>About Anu Building Constructions</p>
            <h2 style={{ fontSize: 40, fontWeight: 300, color: "#111827", lineHeight: 1.2, marginBottom: 20 }}>
              Building <strong style={{ fontWeight: 800 }}>Dream Homes</strong> & Lasting Structures
            </h2>
            <p style={{ color: "#374151", fontSize: 17, lineHeight: 1.8, marginBottom: 16 }}>
              Anu Building Constructions is South India's trusted partner for residential and commercial construction — crafting quality homes, luxury villas, apartment complexes, and commercial buildings with unmatched precision and care.
            </p>
            <p style={{ color: "#4B5563", lineHeight: 1.8, marginBottom: 32 }}>
              Founded in 2004, we have built over 2,500 homes across Coimbatore, Tiruppur, Erode, and beyond. Every structure we build reflects our core values: quality materials, timely delivery, transparent pricing, and long-lasting craftsmanship.
            </p>
            <button onClick={() => setPage("about")} style={{ background: "#222233", color: "white", border: "none", cursor: "pointer", padding: "14px 32px", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", transition: "background 0.2s", borderRadius: "4px" }}
              onMouseEnter={e => e.target.style.background = "#1D4ED8"} onMouseLeave={e => e.target.style.background = "#222233"}>
              Learn More About Us →
            </button>
          </div>
          <div style={{ position: "relative" }}>
            <div className="to-be-scaled" style={{ borderRadius: "4px" }}>
              <img src="https://thumbs.dreamstime.com/b/construction-workers-building-site-delhi-india-june-engaged-reinforcing-steel-framework-under-preparing-concrete-slab-397961975.jpg" alt="Anu Building Constructions Construction" style={{ width: "100%", height: 380, objectFit: "cover" }} />
            </div>
            <div style={{ position: "absolute", bottom: -24, left: -24, background: "#1D4ED8", padding: "1.5rem 2rem", zIndex: 5 }}>
              <div style={{ color: "white", fontSize: 36, fontWeight: 800 }}>20+</div>
              <div style={{ color: "#BFDBFE", fontSize: 12, fontWeight: 600 }}>Years Building Homes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ background: "#F9FAFB", padding: "6rem 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
            <div>
              <p style={{ color: "#EF4444", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>What We Do</p>
              <h2 style={{ fontSize: 38, fontWeight: 300, color: "#111827", margin: 0 }}>Our <strong style={{ fontWeight: 800 }}>Services</strong></h2>
            </div>
            <button onClick={() => setPage("services")} style={{ background: "none", border: "none", cursor: "pointer", color: "#1D4ED8", fontSize: 13, fontWeight: 700 }}>View All Services →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {services.slice(0, 3).map(s => (
              <div key={s.title} style={{ background: "white", borderTop: "4px solid #1D4ED8", padding: "2rem", cursor: "pointer", transition: "box-shadow 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.12)"} onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                <div style={{ height: 220, overflow: "hidden", marginBottom: 20, marginLeft: -32, marginRight: -32, marginTop: -32 }}>
                  <img
                    src={s.img}
                    alt={s.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                    onMouseEnter={e => e.target.style.transform = "scale(1.08)"}
                    onMouseLeave={e => e.target.style.transform = "scale(1)"}
                  />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{s.desc}</p>
                <span style={{ color: "#1D4ED8", fontSize: 13, fontWeight: 700 }}>Learn More →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section style={{ background: "white", padding: "6rem 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
            <div>
              <p style={{ color: "#EF4444", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>Portfolio</p>
              <h2 style={{ fontSize: 38, fontWeight: 300, color: "#111827", margin: 0 }}>Our <strong style={{ fontWeight: 800 }}>Projects</strong></h2>
            </div>
            <button onClick={() => setPage("projects")} style={{ background: "none", border: "none", cursor: "pointer", color: "#1D4ED8", fontSize: 13, fontWeight: 700 }}>View All Projects →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {projects.slice(0, 4).map(p => (
              <div key={p.title} style={{ cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.querySelector("h3").style.color = "#1D4ED8"}
                onMouseLeave={e => e.currentTarget.querySelector("h3").style.color = "#111827"}>
                <div style={{ height: 210, overflow: "hidden", marginBottom: 12 }}>
                  <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                    onMouseEnter={e => e.target.style.transform = "scale(1.05)"} onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                </div>
                <p style={{ color: "#1D4ED8", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{p.cat}</p>
                <p style={{ color: "#9CA3AF", fontSize: 11, marginBottom: 6 }}>{p.location}</p>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827", lineHeight: 1.4, margin: 0, transition: "color 0.2s" }}>{p.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Sectors */}
      {/* <section style={{ background: "#111827", padding: "4rem 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2rem", marginBottom: 24 }}>
          <h2 style={{ color: "white", fontSize: 30, fontWeight: 300, margin: 0 }}>Market <strong style={{ fontWeight: 800 }}>Sectors</strong></h2>
        </div>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", padding: "0 2rem 1rem", scrollbarWidth: "none" }}>
          {MARKET_SECTORS.map(sector => (
            <button key={sector} style={{ flexShrink: 0, border: "1px solid #374151", color: "#9CA3AF", padding: "10px 20px", fontSize: 13, fontWeight: 500, background: "none", cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}
              onMouseEnter={e => { e.target.style.borderColor = "#60A5FA"; e.target.style.color = "white"; e.target.style.background = "rgba(29,78,216,0.2)"; }}
              onMouseLeave={e => { e.target.style.borderColor = "#374151"; e.target.style.color = "#9CA3AF"; e.target.style.background = "none"; }}>
              {sector}
            </button>
          ))}
        </div>
      </section> */}

      {/* Differentiators */}
      <section style={{ background: "#F3F4F6", padding: "6rem 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }}>
          {[
            {
              label: "TURNKEY CONSTRUCTION",
              title: "Complete Turnkey Solutions",
              desc: "From architectural design and soil testing to foundation, structure, interior finishing, and handover — we manage your entire building journey under one roof.",
              bullets: ["✓ 100% End-to-End Handling", "✓ Soil & Structural Testing", "✓ Integrated Architecture Plans"],
              cta: "LEARN MORE"
            },
            {
              label: "QUALITY MATERIALS",
              title: "ISI-Certified Materials Only",
              desc: "We use only ISI-certified cement, TMT steel, AAC blocks, and premium finishes from trusted brands — giving your home a strong foundation.",
              bullets: ["✓ Grade-A Cement Sourcing", "✓ High-Durability TMT Steel", "✓ Premium Brand Fittings"],
              cta: "OUR STANDARDS"
            },
            {
              label: "ANU WARRANTY",
              title: "10-Year Structural Warranty",
              desc: (
                <>
                  Every home we build comes with a 10-year structural warranty and dedicated post-construction support. Leakages or cracks? We fix them, <del style={{ opacity: 0.65 }}>no questions asked</del>.
                </>
              ),
              bullets: ["✓ Foundation Settling Protection", "✓ Active Waterproofing Warranty", "✓ 24/7 Dedicated Care Portal"],
              cta: "OUR GUARANTEE"
            },
          ].map((card, idx) => (
            <div key={card.title} className={`flip-card animate-fade-in-up stagger-${idx + 1}`}>
              <div className="flip-card-inner">
                {/* Front Side */}
                <div className="flip-card-front">
                  <div style={{ textAlign: "left" }}>
                    <p style={{ color: "#EF4444", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 8px" }}>{card.label}</p>
                    <h3 style={{ color: "#111827", fontSize: 22, fontWeight: 800, margin: "0 0 16px", lineHeight: 1.3 }}>{card.title}</h3>
                    <p style={{ color: "#4B5563", fontSize: 14, lineHeight: 1.8, margin: 0, textAlign: "justify" }}>{card.desc}</p>
                  </div>
                  <div style={{ textAlign: "left", color: "#1D4ED8", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em" }}>
                    HOVER TO REVEAL DETAILS →
                  </div>
                </div>
                {/* Back Side */}
                <div className="flip-card-back">
                  <h4 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20 }}>{card.title}</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24, textAlign: "left", width: "100%" }}>
                    {card.bullets.map(b => (
                      <div key={b} style={{ fontSize: 14, fontWeight: 600 }}>{b}</div>
                    ))}
                  </div>
                  <button style={{ background: "white", color: "#1D4ED8", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", padding: "10px 24px", borderRadius: 20 }}>
                    {card.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* News */}
      <section style={{ background: "white", padding: "6rem 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
            <div>
              <p style={{ color: "#EF4444", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>Stay Informed</p>
              <h2 style={{ fontSize: 38, fontWeight: 300, color: "#111827", margin: 0 }}>News & <strong style={{ fontWeight: 800 }}>Insights</strong></h2>
            </div>
            <button onClick={() => setPage("news")} style={{ background: "none", border: "none", cursor: "pointer", color: "#1D4ED8", fontSize: 13, fontWeight: 700 }}>View All News →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }}>
            {news.slice(0, 3).map(n => (
              <div key={n.title} style={{ cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.querySelector("h3").style.color = "#1D4ED8"}
                onMouseLeave={e => e.currentTarget.querySelector("h3").style.color = "#111827"}>
                <div style={{ height: 250, overflow: "hidden", marginBottom: 16 }}>
                  <img src={n.img} alt={n.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                    onMouseEnter={e => e.target.style.transform = "scale(1.08)"} onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                </div>
                <span style={{ background: "#EFF6FF", color: "#1D4ED8", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 8px" }}>{n.category}</span>
                <p style={{ color: "#9CA3AF", fontSize: 11, margin: "8px 0 4px" }}>{n.date}</p>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", lineHeight: 1.5, margin: "0 0 8px", transition: "color 0.2s" }}>{n.title}</h3>
                <p style={{ color: "#6B7280", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{n.excerpt ? n.excerpt.slice(0, 100) : ""}...</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Founder Section */}
      <section style={{ background: "#F3F4F6", padding: "6rem 0" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
          <div style={{ padding: "40px" }}>
            <p style={{ color: "#EF4444", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Corporate Leadership</p>
            <h2 style={{ fontSize: 40, fontWeight: 300, color: "#111827", lineHeight: 1.2, marginBottom: 16 }}>
              {aboutFounder.title.split(" ").slice(0, -2).join(" ")} <strong style={{ fontWeight: 800 }}>{aboutFounder.title.split(" ").slice(-2).join(" ")}</strong>
            </h2>
            <h4 style={{ fontSize: 18, fontWeight: 600, color: "#1D4ED8", marginBottom: 24 }}>
              {aboutFounder.subtitle}
            </h4>
            <p style={{ color: "#4B5563", fontSize: 16, lineHeight: 1.8, marginBottom: 32, whiteSpace: "pre-line", textAlign: "justify" }}>
              {aboutFounder.content}
            </p>
            <div style={{ borderLeft: "4px solid #1D4ED8", paddingLeft: 20, marginTop: 24 }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#111827" }}>{aboutFounder.founderName}</div>
              <div style={{ fontSize: 13, color: "#6B7280", fontWeight: 600, marginTop: 4 }}>{aboutFounder.founderRole}</div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", width: "100%", maxWidth: 480 }}>
              {/* Decorative Frame */}
              <div style={{ position: "absolute", inset: "-15px", border: "2px solid #1D4ED8", borderRadius: 24, transform: "rotate(-2deg)", zIndex: 1, pointerEvents: "none" }} />
              <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.12)", zIndex: 2 }}>
                <img
                  src={aboutFounder.imageUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80"}
                  alt={aboutFounder.founderName}
                  style={{ width: "100%", height: 500, objectFit: "cover", display: "block" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Careers CTA */}
      <section style={{ position: "relative", padding: "8rem 0", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?w=1400&q=80" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(17,24,39,0.75)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1400, margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
          <p style={{ color: "#93C5FD", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 16 }}>Join Our Team</p>
          <h2 style={{ color: "white", fontSize: 52, fontWeight: 300, lineHeight: 1.2, marginBottom: 20 }}>
            Build Your <strong style={{ fontWeight: 800 }}>Career</strong> in Construction
          </h2>
          <p style={{ color: "#D1D5DB", fontSize: 17, maxWidth: 600, margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
            We are always looking for passionate civil engineers, architects, site supervisors, interior designers, and skilled workers to join our growing team across South India.
          </p>
          <button onClick={() => setPage("careers")} style={{ background: "#DC2626", color: "white", border: "none", cursor: "pointer", padding: "16px 40px", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", transition: "background 0.2s" }}
            onMouseEnter={e => e.target.style.background = "#B91C1C"} onMouseLeave={e => e.target.style.background = "#DC2626"}>
            Explore Careers →
          </button>
        </div>
      </section>
    </>
  );
}
