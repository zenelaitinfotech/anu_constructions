import React from "react";

const commitments = [
  { pct: "30%", label: "Women in Leadership by 2028", current: "24% today", color: "#7C3AED" },
  { pct: "40%", label: "Diverse Hires in 2025", current: "37% achieved", color: "#1D4ED8" },
  { pct: "50%", label: "Supplier Diversity by 2027", current: "32% today", color: "#DC2626" },
  { pct: "100%", label: "Pay Equity Across All Grades", current: "Achieved 2024", color: "#16A34A" },
];

const programs2 = [
  { title: "BELONG Employee Resource Groups", desc: "8 active ERGs covering women, LGBTQ+, veterans, persons with disabilities, and multiple regional cultures — creating safe spaces and career growth networks." },
  { title: "Inclusive Leadership Training", desc: "Mandatory unconscious bias and inclusive leadership training for all managers — ensuring every team member is heard, respected, and empowered." },
  { title: "Returnship Program", desc: "A structured 12-week program for professionals returning to the workforce after career breaks — especially caregivers and parents." },
  { title: "Campus Outreach", desc: "Partnerships with HBCUs, women's engineering colleges, and vocational schools to build diverse talent pipelines from the ground up." },
];

export default function Diversity() {
  return (
    <div style={{ fontFamily: "'Outfit','Helvetica Neue',Arial,sans-serif", color: "#1F2937" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #4C1D95 0%, #6D28D9 50%, #7C3AED 100%)", padding: "7rem 2rem 5rem", color: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#DDD6FE", marginBottom: 16 }}>OUR CULTURE</p>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>
            Diversity, Equity & Inclusion
          </h1>
          <p style={{ fontSize: 20, color: "#EDE9FE", maxWidth: 600, lineHeight: 1.7 }}>
            We believe that diverse teams build better buildings and stronger communities. DE&I is not a policy — it's how we live and work.
          </p>
        </div>
      </section>

      {/* Commitments */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#0F172A", textAlign: "center", marginBottom: 60 }}>Our DE&I Commitments</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
            {commitments.map(c => (
              <div key={c.label} style={{ background: "white", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", padding: "2rem", textAlign: "center", borderTop: `4px solid ${c.color}` }}>
                <div style={{ fontSize: 48, fontWeight: 900, color: c.color, marginBottom: 8 }}>{c.pct}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>{c.label}</h3>
                <span style={{ fontSize: 12, color: "#6B7280", background: "#F8FAFC", padding: "4px 10px" }}>{c.current}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section style={{ background: "#F5F3FF", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#0F172A", textAlign: "center", marginBottom: 60 }}>Programs & Initiatives</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            {programs2.map(p => (
              <div key={p.title} style={{ background: "white", padding: "2.5rem", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", borderLeft: "4px solid #7C3AED" }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", marginBottom: 12 }}>{p.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.8, color: "#4B5563" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section style={{ background: "#4C1D95", padding: "5rem 2rem", textAlign: "center" }}>
        <blockquote style={{ fontSize: 24, fontStyle: "italic", color: "#EDE9FE", maxWidth: 800, margin: "0 auto", lineHeight: 1.7, fontWeight: 500 }}>
          "An inclusive workplace doesn't happen by accident. It takes deliberate action, courageous conversations, and leadership that walks the talk every single day."
        </blockquote>
        <p style={{ color: "#A78BFA", marginTop: 20, fontWeight: 600 }}>— Priya Annamalai, CEO, Anu Building Constructions</p>
      </section>
    </div>
  );
}
