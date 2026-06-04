import React from "react";

const capabilities = [
  { icon: "🏗️", title: "General Contracting", desc: "Full turnkey construction delivery with comprehensive cost, schedule, and quality management." },
  { icon: "📐", title: "Design-Build", desc: "Single-point responsibility for design and construction, reducing risk and accelerating delivery timelines." },
  { icon: "🤝", title: "Owner's Representative", desc: "Acting as your advocate throughout the construction process, ensuring your interests are always protected." },
  { icon: "📊", title: "Program Management", desc: "Managing large, multi-project construction programs with centralized oversight and reporting." },
  { icon: "🔧", title: "Self-Perform Work", desc: "In-house capabilities for structural concrete, masonry, mechanical, and electrical work for better quality control." },
  { icon: "🌐", title: "BIM Integration", desc: "Full Building Information Modeling integration for clash detection, coordination, and as-built documentation." },
];

export default function ConstructionManagement() {
  return (
    <div style={{ fontFamily: "'Outfit','Helvetica Neue',Arial,sans-serif", color: "#1F2937" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #1F2937 0%, #374151 50%, #4B5563 100%)", padding: "7rem 2rem 5rem", color: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#D1D5DB", marginBottom: 16 }}>OUR SERVICES</p>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>Construction Management</h1>
          <p style={{ fontSize: 20, color: "#E5E7EB", maxWidth: 600, lineHeight: 1.7 }}>
            With a proven track record spanning over a century, we are the leading provider of construction management services — delivering complex projects on time and on budget.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "#1D4ED8", padding: "2.5rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, textAlign: "center" }}>
          {[{ n: "1,500+", l: "Projects Annually" }, { n: "₹500Cr+", l: "Value Managed" }, { n: "96%", l: "Client Retention" }, { n: "120+", l: "Years Experience" }].map(s => (
            <div key={s.l}>
              <div style={{ fontSize: 36, fontWeight: 900, color: "white" }}>{s.n}</div>
              <div style={{ fontSize: 12, color: "#BFDBFE", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How We Work */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80" alt="Construction management" style={{ width: "100%", height: 460, objectFit: "cover", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }} />
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#1D4ED8", marginBottom: 12 }}>OUR APPROACH</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#0F172A", marginBottom: 24 }}>Delivering Complex Projects, Precisely</h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#4B5563", marginBottom: 20 }}>
              Our construction management model places a dedicated team at the center of your project — coordinating all trades, managing risks, and keeping stakeholders informed with transparent reporting throughout the lifecycle.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#4B5563" }}>
              We bring institutional knowledge from 1,500+ annual projects to every engagement, applying lessons learned and industry best practices to deliver superior results for every client.
            </p>
            <div style={{ marginTop: 32, display: "flex", gap: 24 }}>
              <div style={{ textAlign: "center", padding: "1.5rem", background: "#EFF6FF", flex: 1 }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: "#1D4ED8" }}>On Time</div>
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>Schedule delivery</div>
              </div>
              <div style={{ textAlign: "center", padding: "1.5rem", background: "#EFF6FF", flex: 1 }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: "#1D4ED8" }}>On Budget</div>
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>Cost certainty</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section style={{ background: "#F8FAFC", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#0F172A", textAlign: "center", marginBottom: 60 }}>Our Capabilities</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {capabilities.map(c => (
              <div key={c.title} style={{ background: "white", padding: "2rem", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"; }}
              >
                <div style={{ fontSize: 40, marginBottom: 14 }}>{c.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 10 }}>{c.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "#6B7280" }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
