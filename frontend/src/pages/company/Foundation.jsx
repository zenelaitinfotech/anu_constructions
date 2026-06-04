import React from "react";

const initiatives = [
  { 
    title: "Education for All", 
    desc: "We fund comprehensive scholarships, build classrooms, and donate educational technology and laboratory setups in rural communities. Our primary goal is to ensure children in underserved areas have access to world-class learning facilities.", 
    img: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80", 
    amount: "₹2.5Cr donated" 
  },
  { 
    title: "Clean Water Projects", 
    desc: "Partnering with local NGOs, we design, build, and maintain solar-powered clean water filtration plants and distribution networks in villages across South India, preventing waterborne diseases and reducing daily burdens.", 
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", 
    amount: "15 villages served" 
  },
  { 
    title: "Artisan Skills Training", 
    desc: "Our free vocational academies train unemployed youth in essential building trades including masonry, bar bending, welding, plumbing, and electrical works, ending with national trade certifications and assured job placements.", 
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80", 
    amount: "2,000+ trained" 
  },
  { 
    title: "Disaster Relief Construction", 
    desc: "We maintain a rapid-deployment team to design and build immediate emergency shelter and long-term permanent houses for families affected by floods, cyclones, and landslides, restoring community dignity.", 
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80", 
    amount: "500+ homes rebuilt" 
  },
  {
    title: "Green Canopy Reforestation",
    desc: "We actively fight climate change by planting indigenous forest reserves on the fringes of urban development zones. Each project of Anu Construction supports planting and maintaining 100 trees in these protected community forests.",
    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80",
    amount: "50,000+ trees planted"
  },
  {
    title: "Healthcare Infrastructure",
    desc: "We design, construct, and fully equip primary health sub-centers in remote rural locations. These centers provide vital maternal healthcare, primary diagnostic services, and essential medicine distribution.",
    img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&q=80",
    amount: "12 clinics built"
  }
];

export default function Foundation() {
  return (
    <div style={{ fontFamily: "'Outfit','Helvetica Neue',Arial,sans-serif", color: "#1F2937" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)", padding: "7rem 2rem 5rem", color: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }} className="animate-fade-in-up">
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6EE7B7", marginBottom: 16 }}>GIVING BACK</p>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>
            Anu Building Constructions<br />Foundation
          </h1>
          <p style={{ fontSize: 20, color: "#A7F3D0", maxWidth: 700, margin: "0 auto", lineHeight: 1.7 }}>
            Building more than structures — we invest in communities, empower people, and create lasting positive change across India.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section style={{ padding: "5rem 2rem", background: "#F0FDF4" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }} className="animate-fade-in-up stagger-1">
          <div style={{ fontSize: 60, marginBottom: 24 }}>❤️</div>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#064E3B", marginBottom: 20 }}>
            "We build with purpose beyond profit"
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.8, color: "#4B5563", textAlign: "justify" }}>
            The Anu Building Constructions Foundation channels a percentage of every project's earnings into community development, education, and disaster relief initiatives. We believe construction companies have a responsibility to uplift the communities in which they build. Through our active caring approach, we build robust infrastructure that transforms daily life for hundreds of families.
          </p>
        </div>
      </section>

      {/* Initiatives */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(2.2rem, 4vw, 3rem)", fontWeight: 800, color: "#0F172A", textAlign: "center", marginBottom: 60 }} className="animate-fade-in-up">
            Our Initiatives
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            {initiatives.map((ini, index) => {
              const isEven = index % 2 === 0;
              const animClass = isEven ? "animate-slide-in-left" : "animate-slide-in-right";
              const delayClass = `stagger-${(index % 4) + 1}`;
              return (
                <div 
                  key={ini.title} 
                  className={`${animClass} ${delayClass}`}
                  style={{ 
                    display: "flex", 
                    gap: 28, 
                    background: "white", 
                    padding: "2rem", 
                    boxShadow: "0 6px 30px rgba(0,0,0,0.06)", 
                    borderRadius: 12,
                    border: "1px solid #E5E7EB",
                    alignItems: "flex-start",
                    flexDirection: "row"
                  }}
                >
                  <img 
                    src={ini.img} 
                    alt={ini.title} 
                    style={{ 
                      width: 240, 
                      height: 180, 
                      objectFit: "cover", 
                      flexShrink: 0,
                      borderRadius: 8 
                    }} 
                  />
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <div>
                      <span style={{ background: "#DCFCE7", color: "#16A34A", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        {ini.amount}
                      </span>
                    </div>
                    <h3 style={{ fontSize: 24, fontWeight: 800, color: "#0F172A", margin: 0 }}>
                      {ini.title}
                    </h3>
                    <p style={{ fontSize: 16, lineHeight: 1.8, color: "#6B7280", margin: 0, textAlign: "justify" }}>
                      {ini.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "#047857", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, textAlign: "center" }} className="animate-fade-in-up">
          {[{ n: "₹10Cr+", l: "Total Donations" }, { n: "45", l: "Cities Impacted" }, { n: "12,000+", l: "Lives Changed" }, { n: "25+", l: "NGO Partners" }].map((s, idx) => (
            <div key={s.l} className={`stagger-${idx + 1}`}>
              <div style={{ fontSize: 44, fontWeight: 900, color: "white" }}>{s.n}</div>
              <div style={{ fontSize: 13, color: "#A7F3D0", marginTop: 6, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "5rem 2rem", textAlign: "center", background: "#F0FDF4" }}>
        <div className="animate-fade-in-up">
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#064E3B", marginBottom: 16 }}>Partner With Our Foundation</h2>
          <p style={{ fontSize: 18, color: "#4B5563", marginBottom: 32, maxWidth: 600, margin: "0 auto 32px" }}>NGOs, government bodies, and corporate partners are welcome to collaborate with us on community initiatives.</p>
          <button style={{ background: "#047857", color: "white", border: "none", padding: "18px 45px", fontSize: 16, fontWeight: 700, borderRadius: 30, cursor: "pointer", boxShadow: "0 4px 15px rgba(4,120,87,0.3)" }}>
            Get Involved
          </button>
        </div>
      </section>
    </div>
  );
}
