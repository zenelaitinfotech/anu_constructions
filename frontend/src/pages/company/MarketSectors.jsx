import React from "react";

const sectors = [
  { 
    icon: "🏥", 
    title: "Healthcare & Biotech", 
    desc: "Hospitals, super-specialty medical centers, diagnostic laboratories, and research campuses constructed to the highest clinical specifications. We integrate specialized cleanrooms, complex HVAC ventilation filtration layouts, backup electric generators, and radiation shielding systems with precise structural integrity.", 
    img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80", 
    count: "45+ Completed Projects" 
  },
  { 
    icon: "🏫", 
    title: "Educational Institutions", 
    desc: "Primary schools, high schools, universities, state-of-the-art auditoriums, and campus residential blocks built to support modern pedagogy. We design and build open, natural-lit learning environments, collaborative research labs, and sports arenas that withstand heavy daily usage.", 
    img: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80", 
    count: "80+ Completed Projects" 
  },
  { 
    icon: "🏢", 
    title: "Commercial Offices & Tech Parks", 
    desc: "Grade-A office high-rises, commercial malls, corporate workspaces, and IT parks built to accommodate thousands of employees. Our commercial projects focus on high-efficiency floor configurations, integrated high-speed elevator shafts, premium interior finishing, and smart automation.", 
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80", 
    count: "120+ Completed Projects" 
  },
  { 
    icon: "🏠", 
    title: "Residential Developments", 
    desc: "Luxury multi-storey apartments, independent premium houses, high-end villas, and complete gated township projects. We use premium certified cement and steel along with modern modular shuttering techniques to deliver beautiful, reliable homes with landscaped spaces.", 
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80", 
    count: "200+ Completed Projects" 
  },
  { 
    icon: "🏭", 
    title: "Industrial & Warehousing", 
    desc: "Manufacturing plants, heavy engineering factories, chemical processing units, and cold storage warehouses. We engineer high-strength industrial flooring (FM2/FM3 compliant), massive pre-engineered steel buildings (PEB), and optimal logistics loading bays.", 
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80", 
    count: "60+ Completed Projects" 
  },
  { 
    icon: "🌿", 
    title: "Green & Sustainable Infrastructure", 
    desc: "LEED-certified green buildings, net-zero emissions offices, and smart-grid integrated structures. We construct using fly-ash brick masonry, high-performance solar glazing, rainwater harvesting ponds, greywater treatment loops, and energy monitoring infrastructure.", 
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", 
    count: "30+ Completed Projects" 
  }
];

export default function MarketSectors() {
  return (
    <div style={{ fontFamily: "'Outfit','Helvetica Neue',Arial,sans-serif", color: "#1F2937" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1D4ED8 100%)", padding: "7rem 2rem 5rem", color: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }} className="animate-fade-in-up">
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#A5B4FC", marginBottom: 16 }}>OUR EXPERTISE</p>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>
            Market Sectors
          </h1>
          <p style={{ fontSize: 20, color: "#C7D2FE", maxWidth: 700, margin: "0 auto", lineHeight: 1.7 }}>
            We serve diverse industries across India — delivering specialized construction expertise tailored to the unique demands of each market sector.
          </p>
        </div>
      </section>

      {/* Sectors Grid */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }} className="animate-fade-in-up">
            <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 800, color: "#0F172A" }}>Industries We Serve</h2>
            <p style={{ fontSize: 18, color: "#6B7280", marginTop: 12 }}>From a single hospital wing to an entire township — we bring sector-specific expertise to every project.</p>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            {sectors.map((s, index) => {
              const isEven = index % 2 === 0;
              const animClass = isEven ? "animate-slide-in-left" : "animate-slide-in-right";
              const delayClass = `stagger-${(index % 4) + 1}`;
              return (
                <div
                  key={s.title}
                  className={`${animClass} ${delayClass}`}
                  style={{ 
                    overflow: "hidden", 
                    boxShadow: "0 6px 30px rgba(0,0,0,0.06)", 
                    background: "white", 
                    borderRadius: 12,
                    border: "1px solid #E5E7EB",
                    transition: "all 0.3s", 
                    cursor: "default" 
                  }}
                  onMouseEnter={e => { 
                    e.currentTarget.style.transform = "translateY(-8px)"; 
                    e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.15)"; 
                  }}
                  onMouseLeave={e => { 
                    e.currentTarget.style.transform = "translateY(0)"; 
                    e.currentTarget.style.boxShadow = "0 6px 30px rgba(0,0,0,0.06)"; 
                  }}
                >
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <img 
                      src={s.img} 
                      alt={s.title} 
                      style={{ width: "100%", height: 320, objectFit: "cover", transition: "transform 0.5s" }}
                      onMouseEnter={e => e.target.style.transform = "scale(1.08)"}
                      onMouseLeave={e => e.target.style.transform = "scale(1)"}
                    />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.85))", padding: "1.5rem" }}>
                      <span style={{ color: "white", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.count}</span>
                    </div>
                  </div>
                  <div style={{ padding: "2rem" }}>
                    <div style={{ fontSize: 40, marginBottom: 16 }}>{s.icon}</div>
                    <h3 style={{ fontSize: 24, fontWeight: 800, color: "#0F172A", marginBottom: 12 }}>{s.title}</h3>
                    <p style={{ fontSize: 16, lineHeight: 1.8, color: "#4B5563", margin: 0, textAlign: "justify" }}>{s.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#1D4ED8", padding: "5rem 2rem", textAlign: "center" }}>
        <div className="animate-fade-in-up">
          <h2 style={{ fontSize: 36, fontWeight: 800, color: "white", marginBottom: 16 }}>Don't See Your Sector?</h2>
          <p style={{ fontSize: 20, color: "#BFDBFE", marginBottom: 36 }}>We work across many specialized industries. Contact us to discuss your project needs.</p>
          <button style={{ background: "white", color: "#1D4ED8", border: "none", padding: "18px 45px", fontSize: 16, fontWeight: 700, borderRadius: 30, cursor: "pointer", boxShadow: "0 4px 15px rgba(29,78,216,0.3)" }}>
            Talk to Our Experts
          </button>
        </div>
      </section>
    </div>
  );
}
