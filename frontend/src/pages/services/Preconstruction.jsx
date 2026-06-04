import React from "react";

const approaches = [
  { phase: "01", title: "Site Analysis & Feasibility", desc: "We conduct comprehensive site analysis, soil testing, topographic surveys, and feasibility studies before a single brick is laid." },
  { phase: "02", title: "Collaborative Design Review", desc: "Our preconstruction team works alongside architects and engineers to identify constructability issues, value engineering opportunities, and cost risks early." },
  { phase: "03", title: "Accurate Cost Estimation", desc: "Multi-tiered cost estimates with transparent breakdowns — no hidden surprises. We use live market data and historical project benchmarks for accuracy." },
  { phase: "04", title: "Schedule Development", desc: "Critical path analysis and milestone planning ensure your project stays on track from groundbreaking to ribbon-cutting." },
  { phase: "05", title: "Procurement Strategy", desc: "Early contractor and subcontractor engagement, strategic material procurement, and risk mitigation through forward pricing agreements." },
  { phase: "06", title: "Risk Assessment", desc: "Comprehensive risk register development with mitigation strategies, insurance analysis, and contingency planning for every project." },
];

export default function Preconstruction() {
  return (
    <div style={{ fontFamily: "'Outfit','Helvetica Neue',Arial,sans-serif", color: "#1F2937" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #0c4a6e 0%, #075985 50%, #0284C7 100%)", padding: "7rem 2rem 5rem", color: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7DD3FC", marginBottom: 16 }}>OUR SERVICES</p>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>Preconstruction</h1>
          <p style={{ fontSize: 20, color: "#BAE6FD", maxWidth: 600, lineHeight: 1.7 }}>
            Great buildings are built twice — first in the planning room, then on-site. Our preconstruction services ensure your project succeeds before construction begins.
          </p>
        </div>
      </section>

      {/* Value Prop */}
      <section style={{ background: "#F0F9FF", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, textAlign: "center" }}>
          {[{ n: "98%", l: "On-Budget Delivery", sub: "vs 72% industry average" }, { n: "15%", l: "Average Cost Savings", sub: "through early value engineering" }, { n: "3x", l: "Fewer Change Orders", sub: "with thorough preconstruction" }].map(s => (
            <div key={s.l} style={{ padding: "2rem", background: "white", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
              <div style={{ fontSize: 44, fontWeight: 900, color: "#0284C7" }}>{s.n}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginTop: 8 }}>{s.l}</div>
              <div style={{ fontSize: 13, color: "#6B7280", marginTop: 4 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#0F172A", textAlign: "center", marginBottom: 60 }}>Our Preconstruction Process</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            {approaches.map(a => (
              <div key={a.phase} style={{ display: "flex", gap: 20, padding: "2rem", background: "white", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", borderLeft: "4px solid #0284C7" }}>
                <div style={{ fontSize: 40, fontWeight: 900, color: "#BAE6FD", lineHeight: 1, flexShrink: 0 }}>{a.phase}</div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>{a.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "#6B7280" }}>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ background: "#0284C7", padding: "5rem 2rem", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "white", marginBottom: 16 }}>Start Your Project Right</h2>
        <p style={{ fontSize: 18, color: "#BAE6FD", marginBottom: 36, maxWidth: 600, margin: "0 auto 36px" }}>
          Our preconstruction team is available from day one. Talk to us before you finalize your plans — it could save you millions.
        </p>
        <button style={{ background: "white", color: "#0284C7", border: "none", padding: "16px 40px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          Request a Consultation
        </button>
      </section>
    </div>
  );
}
