import React from "react";

const techAreas = [
  { icon: "🏗️", title: "Building Information Modeling (BIM)", desc: "Full 3D model-based coordination from design through construction, reducing clashes by 80% before construction begins." },
  { icon: "🤖", title: "AI & Machine Learning", desc: "AI-powered schedule optimization, predictive risk analysis, and automated quality inspections using computer vision." },
  { icon: "🚁", title: "Drone Surveys & Inspection", desc: "Daily aerial progress tracking, volumetric calculations, and façade inspections — safer and faster than traditional methods." },
  { icon: "👓", title: "Augmented Reality (AR)", desc: "On-site AR overlays allow workers to visualize MEP systems and structural elements before they are built, reducing errors." },
  { icon: "📡", title: "IoT Site Monitoring", desc: "Sensor networks track equipment utilization, concrete curing temperatures, air quality, and worker safety in real time." },
  { icon: "🔒", title: "Digital Twin Technology", desc: "Living digital replicas of buildings enable owners to simulate maintenance scenarios and optimize building performance." },
];

export default function Innovation() {
  return (
    <div style={{ fontFamily: "'Outfit','Helvetica Neue',Arial,sans-serif", color: "#1F2937" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #1E1B4B 0%, #2E1065 50%, #4C1D95 100%)", padding: "7rem 2rem 5rem", color: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#C4B5FD", marginBottom: 16 }}>OUR CULTURE</p>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>Innovation</h1>
          <p style={{ fontSize: 20, color: "#DDD6FE", maxWidth: 600, lineHeight: 1.7 }}>
            We invest in the future of construction — from AI and robotics to augmented reality and digital twins — keeping Anu Building Constructions at the cutting edge of the industry.
          </p>
        </div>
      </section>

      {/* Innovation Numbers */}
      <section style={{ background: "#4C1D95", padding: "2.5rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, textAlign: "center" }}>
          {[{ n: "₹25Cr", l: "R&D Investment Annually" }, { n: "12", l: "Patent Applications" }, { n: "40,000+", l: "Hours Saved via BIM" }, { n: "15", l: "Tech Partnerships" }].map(s => (
            <div key={s.l}>
              <div style={{ fontSize: 36, fontWeight: 900, color: "white" }}>{s.n}</div>
              <div style={{ fontSize: 12, color: "#DDD6FE", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Areas */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#0F172A", textAlign: "center", marginBottom: 16 }}>Technologies We Pioneer</h2>
          <p style={{ fontSize: 16, color: "#6B7280", textAlign: "center", marginBottom: 60 }}>We are not just building structures — we're building the future of how structures are built.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {techAreas.map(t => (
              <div key={t.title} style={{ background: "white", padding: "2rem", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", borderTop: "4px solid #7C3AED", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#4C1D95"; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.querySelectorAll("h3, p").forEach(el => el.style.color = "white"); }}
                onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.querySelector("h3").style.color = "#0F172A"; e.currentTarget.querySelector("p").style.color = "#6B7280"; }}
              >
                <div style={{ fontSize: 40, marginBottom: 16 }}>{t.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 10 }}>{t.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "#6B7280" }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Labs */}
      <section style={{ background: "#F5F3FF", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80" alt="Innovation lab" style={{ width: "100%", height: 420, objectFit: "cover", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }} />
          <div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#0F172A", marginBottom: 20 }}>Anu Innovation Lab</h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#4B5563", marginBottom: 20 }}>
              Our dedicated Innovation Lab in Chennai brings together engineers, data scientists, and construction experts to develop and test new technologies before deploying them on live projects.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#4B5563" }}>
              Partnerships with IIT Madras, NIT Trichy, and leading construction tech startups ensure we stay ahead of the curve — always.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
