import React from "react";

const programs = [
  { icon: "🏗️", title: "Infrastructure for Communities", desc: "We build public facilities — community centers, libraries, and parks — at subsidized rates for underserved localities.", impact: "40+ community facilities built" },
  { icon: "🎓", title: "Education Sponsorships", desc: "Annual scholarships for 100 meritorious students from economically weaker sections pursuing engineering and vocational courses.", impact: "₹50L scholarship fund annually" },
  { icon: "👷", title: "Skilled Trades Program", desc: "Free 3-month training programs for unemployed youth in masonry, plumbing, electrical work, and construction safety.", impact: "2,000+ youth trained" },
  { icon: "🌍", title: "Disaster Relief", desc: "Rapid response construction teams deploy within 48 hours of natural disasters to rebuild homes and restore infrastructure.", impact: "500+ families rehomed" },
  { icon: "♻️", title: "Waste Reduction Initiative", desc: "Partnering with local recyclers to repurpose construction waste into affordable housing materials for urban slums.", impact: "1,200 tonnes diverted from landfill" },
  { icon: "💚", title: "Green Spaces", desc: "For every commercial project completed, we commit to planting 1,000 trees in local communities to offset carbon impact.", impact: "50,000+ trees planted" },
];

export default function Community() {
  return (
    <div style={{ fontFamily: "'Outfit','Helvetica Neue',Arial,sans-serif", color: "#1F2937" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #7C2D12 0%, #C2410C 60%, #EA580C 100%)", padding: "7rem 2rem 5rem", color: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#FED7AA", marginBottom: 16 }}>OUR CULTURE</p>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>
            Community & Citizenship
          </h1>
          <p style={{ fontSize: 20, color: "#FFEDD5", maxWidth: 600, lineHeight: 1.7 }}>
            We build more than buildings — we build communities. Our citizenship programs create lasting positive impact in every city where we operate.
          </p>
        </div>
      </section>

      {/* Impact Stats */}
      <section style={{ background: "#EA580C", padding: "2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, textAlign: "center" }}>
          {[{ n: "45", l: "Cities" }, { n: "12,000+", l: "Lives Impacted" }, { n: "₹10Cr+", l: "Community Investment" }, { n: "25+", l: "NGO Partners" }].map(s => (
            <div key={s.l}>
              <div style={{ fontSize: 36, fontWeight: 900, color: "white" }}>{s.n}</div>
              <div style={{ fontSize: 12, color: "#FED7AA", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#0F172A", textAlign: "center", marginBottom: 16 }}>Community Programs</h2>
          <p style={{ fontSize: 16, color: "#6B7280", textAlign: "center", marginBottom: 60 }}>Six core programs define how we invest in the communities we serve.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {programs.map(p => (
              <div key={p.title} style={{ background: "white", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", padding: "2rem", borderTop: "3px solid #EA580C", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"; }}
              >
                <div style={{ fontSize: 48, marginBottom: 16 }}>{p.icon}</div>
                <span style={{ background: "#FFF7ED", color: "#EA580C", fontSize: 11, fontWeight: 700, padding: "4px 10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{p.impact}</span>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", margin: "14px 0 10px" }}>{p.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "#6B7280" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer */}
      <section style={{ background: "#FFF7ED", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#7C2D12", marginBottom: 20 }}>Volunteer Days</h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#4B5563", marginBottom: 20 }}>Every Anu Building Constructions employee gets 3 paid volunteer days per year to give back to their local community. From painting schools to building ramps for the disabled — our people make a real difference.</p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#4B5563", marginBottom: 24 }}>In 2025, our team collectively contributed over 15,000 volunteer hours, making it our most impactful year yet.</p>
            <button style={{ background: "#EA580C", color: "white", border: "none", padding: "14px 36px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>Join Our Volunteer Program</button>
          </div>
          <img src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=80" alt="Community volunteering" style={{ width: "100%", height: 400, objectFit: "cover", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }} />
        </div>
      </section>
    </div>
  );
}
