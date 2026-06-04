import React from "react";

const tools = [
  { name: "Primavera P6", desc: "Enterprise-grade scheduling and resource management", icon: "📅" },
  { name: "Procore", desc: "Cloud-based construction project management platform", icon: "☁️" },
  { name: "BIM 360", desc: "Autodesk connected construction data and workflows", icon: "🔷" },
  { name: "Deltek Vantagepoint", desc: "Financial and ERP management for construction firms", icon: "💹" },
  { name: "PlanGrid", desc: "Field-level blueprint and document management", icon: "📋" },
  { name: "Power BI", desc: "Real-time dashboards and executive reporting", icon: "📊" },
];

const phases = [
  { num: "01", title: "Project Initiation", tasks: ["Charter development", "Stakeholder mapping", "Governance structure", "Risk register setup"] },
  { num: "02", title: "Planning & Design", tasks: ["WBS creation", "Resource planning", "Budget baseline", "Schedule development"] },
  { num: "03", title: "Execution & Control", tasks: ["Progress tracking", "Cost control", "Change management", "Quality assurance"] },
  { num: "04", title: "Closeout", tasks: ["Punch list management", "As-built documentation", "Commissioning", "Lessons learned"] },
];

export default function ProjectManagement() {
  return (
    <div style={{ fontFamily: "'Outfit','Helvetica Neue',Arial,sans-serif", color: "#1F2937" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #064E3B 0%, #065F46 50%, #059669 100%)", padding: "7rem 2rem 5rem", color: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6EE7B7", marginBottom: 16 }}>OUR SERVICES</p>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>Project Management</h1>
          <p style={{ fontSize: 20, color: "#A7F3D0", maxWidth: 600, lineHeight: 1.7 }}>
            End-to-end project management expertise ensuring every project is delivered on time, within budget, and to the highest quality standards.
          </p>
        </div>
      </section>

      {/* Phases Timeline */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#0F172A", textAlign: "center", marginBottom: 60 }}>Our PM Methodology</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, position: "relative" }}>
            <div style={{ position: "absolute", top: 36, left: "12.5%", right: "12.5%", height: 2, background: "#059669", zIndex: 0 }} />
            {phases.map((p, i) => (
              <div key={p.num} style={{ padding: "0 1rem", position: "relative", zIndex: 1 }}>
                <div style={{ width: 72, height: 72, background: "#059669", color: "white", fontWeight: 900, fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: "0 8px 24px rgba(5,150,105,0.4)" }}>
                  {p.num}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", textAlign: "center", marginBottom: 16 }}>{p.title}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {p.tasks.map(t => (
                    <li key={t} style={{ fontSize: 13, color: "#6B7280", padding: "4px 0", display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ color: "#059669" }}>→</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section style={{ background: "#ECFDF5", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#0F172A", textAlign: "center", marginBottom: 16 }}>Technology Stack</h2>
          <p style={{ fontSize: 16, color: "#6B7280", textAlign: "center", marginBottom: 60 }}>We use industry-leading tools to deliver real-time visibility and control across all projects.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
            {tools.map(t => (
              <div key={t.name} style={{ background: "white", padding: "1.5rem", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ fontSize: 32 }}>{t.icon}</div>
                <div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", marginBottom: 4 }}>{t.name}</h3>
                  <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.5 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#059669", padding: "5rem 2rem", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "white", marginBottom: 16 }}>Need a Project Manager?</h2>
        <p style={{ fontSize: 16, color: "#A7F3D0", marginBottom: 32 }}>Our experienced PMs are ready to take ownership of your next project.</p>
        <button style={{ background: "white", color: "#059669", border: "none", padding: "16px 40px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          Get Started
        </button>
      </section>
    </div>
  );
}
