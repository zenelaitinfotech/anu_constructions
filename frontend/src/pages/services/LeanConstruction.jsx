import React from "react";

const principles = [
  { icon: "🔄", title: "Last Planner System®", desc: "A collaborative scheduling method where the people doing the work plan the work — increasing commitment and reducing variability." },
  { icon: "🗺️", title: "Pull Planning", desc: "Working backwards from milestones to identify the ideal sequence of work, eliminating waiting time between trades." },
  { icon: "📉", title: "Percent Plan Complete (PPC)", desc: "Weekly tracking of planned vs. actual completion to surface obstacles early and continuously improve team performance." },
  { icon: "🧹", title: "5S Workplace Organization", desc: "Sort, Set, Shine, Standardize, Sustain — keeping every site clean, organized, and safe through disciplined daily habits." },
  { icon: "💡", title: "A3 Problem Solving", desc: "Structured root cause analysis that turns every site problem into a learning opportunity for the whole organization." },
  { icon: "🤝", title: "Collaborative Agreements", desc: "Aligning all project stakeholders on shared goals, mutual accountability, and transparent communication from day one." },
];

export default function LeanConstruction() {
  return (
    <div style={{ fontFamily: "'Outfit','Helvetica Neue',Arial,sans-serif", color: "#1F2937" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #78350F 0%, #92400E 50%, #D97706 100%)", padding: "7rem 2rem 5rem", color: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#FDE68A", marginBottom: 16 }}>OUR SERVICES</p>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>Lean Construction</h1>
          <p style={{ fontSize: 20, color: "#FEF3C7", maxWidth: 600, lineHeight: 1.7 }}>
            Eliminating waste. Maximizing value. Lean construction is how we consistently deliver more for less — without compromising quality or safety.
          </p>
        </div>
      </section>

      {/* What is Lean */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#0F172A", marginBottom: 20 }}>What Is Lean Construction?</h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#4B5563", marginBottom: 20 }}>
              Lean construction applies manufacturing efficiency principles to the construction process — identifying and eliminating waste in time, materials, movement, and waiting to deliver maximum value to the client.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#4B5563", marginBottom: 24 }}>
              At Anu Building Constructions, our lean practitioners work embedded in every project team, coaching subcontractors, site supervisors, and clients on lean techniques that get results.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[{ n: "20%", l: "Schedule reduction" }, { n: "15%", l: "Cost savings" }, { n: "40%", l: "Less rework" }, { n: "35%", l: "Fewer delays" }].map(s => (
                <div key={s.l} style={{ background: "#FFFBEB", padding: "1.2rem", textAlign: "center", borderTop: "3px solid #D97706" }}>
                  <div style={{ fontSize: 32, fontWeight: 900, color: "#D97706" }}>{s.n}</div>
                  <div style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?w=600&q=80" alt="Lean construction team" style={{ width: "100%", height: 460, objectFit: "cover", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }} />
        </div>
      </section>

      {/* Lean Principles */}
      <section style={{ background: "#FFFBEB", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#0F172A", textAlign: "center", marginBottom: 60 }}>Core Lean Principles We Apply</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {principles.map(p => (
              <div key={p.title} style={{ background: "white", padding: "2rem", borderTop: "4px solid #D97706", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.background = "#D97706"; e.currentTarget.querySelectorAll("h3, p").forEach(el => el.style.color = "white"); }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = "white"; e.currentTarget.querySelector("h3").style.color = "#0F172A"; e.currentTarget.querySelector("p").style.color = "#6B7280"; }}
              >
                <div style={{ fontSize: 40, marginBottom: 14 }}>{p.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "#6B7280" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#92400E", padding: "5rem 2rem", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "white", marginBottom: 16 }}>Build Leaner, Smarter, Faster</h2>
        <p style={{ fontSize: 16, color: "#FDE68A", marginBottom: 32 }}>Talk to our Lean Construction team about how we can reduce waste on your next project.</p>
        <button style={{ background: "#D97706", color: "white", border: "none", padding: "16px 40px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          Learn More
        </button>
      </section>
    </div>
  );
}
