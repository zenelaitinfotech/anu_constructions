import React from "react";

const safetyStats = [
  { n: "0.18", l: "TRIR (Industry avg: 2.1)", desc: "Total Recordable Incident Rate" },
  { n: "99.8%", l: "Safety Compliance Rate", desc: "Across all active sites" },
  { n: "18%", l: "Incident Reduction", desc: "Year-over-year improvement" },
  { n: "500+", l: "Safety Champions", desc: "Dedicated safety officers" },
];

const wellnessPrograms = [
  { icon: "🧠", title: "Mental Health Support", desc: "Free confidential counseling, Employee Assistance Programs, and mental health days for all staff." },
  { icon: "💪", title: "Physical Wellness", desc: "Gym memberships, on-site yoga sessions at headquarters, and annual health check-ups for every employee." },
  { icon: "🛡️", title: "Active Caring Safety Culture", desc: "Every employee is empowered to stop unsafe work without fear of reprisal — safety is everyone's responsibility." },
  { icon: "👨‍⚕️", title: "Occupational Health", desc: "Regular health screenings, audiometry tests, and ergonomics assessments for field workers." },
  { icon: "🏠", title: "Work-Life Balance", desc: "Flexible hours, remote-work options for office staff, and generous parental leave for all parents." },
  { icon: "🎓", title: "Safety Training", desc: "40+ hours of mandatory safety training annually, plus specialized certifications for site supervisors." },
];

export default function Safety() {
  return (
    <div style={{ fontFamily: "'Outfit','Helvetica Neue',Arial,sans-serif", color: "#1F2937" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #7F1D1D 0%, #991B1B 50%, #DC2626 100%)", padding: "7rem 2rem 5rem", color: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#FCA5A5", marginBottom: 16 }}>OUR CULTURE</p>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>
            Safety & Wellness
          </h1>
          <p style={{ fontSize: 20, color: "#FEE2E2", maxWidth: 600, lineHeight: 1.7 }}>
            Nobody gets hurt. That is our unwavering commitment. Safety is not a priority — it's a core value that never gets traded off.
          </p>
        </div>
      </section>

      {/* Safety Stats */}
      <section style={{ background: "#DC2626", padding: "2.5rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
          {safetyStats.map(s => (
            <div key={s.l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 40, fontWeight: 900, color: "white" }}>{s.n}</div>
              <div style={{ fontSize: 13, color: "#FCA5A5", fontWeight: 600, marginTop: 4 }}>{s.l}</div>
              <div style={{ fontSize: 11, color: "#FEE2E2", marginTop: 4 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Safety First Philosophy */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#0F172A", marginBottom: 20 }}>Active Caring Safety Culture</h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#4B5563", marginBottom: 20 }}>
              At Anu Building Constructions, "Active Caring" means every team member looks out for their colleagues — proactively identifying hazards, speaking up about unsafe conditions, and celebrating safe behavior.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#4B5563", marginBottom: 20 }}>
              We have achieved an industry-leading TRIR of 0.18 — more than 10x better than the national construction average — through rigorous training, accountability, and a culture where safety is personal.
            </p>
            <div style={{ background: "#FEF2F2", borderLeft: "4px solid #DC2626", padding: "1.5rem" }}>
              <p style={{ fontSize: 15, fontWeight: 600, color: "#7F1D1D" }}>
                🛑 Any employee has the right and responsibility to stop unsafe work — no questions asked, no penalties.
              </p>
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80" alt="Safety on site" style={{ width: "100%", height: 420, objectFit: "cover", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }} />
        </div>
      </section>

      {/* Wellness Programs */}
      <section style={{ background: "#FEF2F2", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#0F172A", textAlign: "center", marginBottom: 60 }}>Employee Wellness Programs</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {wellnessPrograms.map(p => (
              <div key={p.title} style={{ background: "white", padding: "2rem", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", borderTop: "3px solid #DC2626" }}>
                <div style={{ fontSize: 40, marginBottom: 14 }}>{p.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "#6B7280" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#7F1D1D", padding: "5rem 2rem", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "white", marginBottom: 16 }}>Safety is Our Promise</h2>
        <p style={{ fontSize: 16, color: "#FCA5A5", marginBottom: 32, maxWidth: 600, margin: "0 auto 32px" }}>Every worker goes home safe every day. That's our commitment to our people and their families.</p>
        <button style={{ background: "#DC2626", color: "white", border: "none", padding: "16px 40px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          View Safety Report
        </button>
      </section>
    </div>
  );
}
