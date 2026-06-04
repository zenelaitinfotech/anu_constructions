import React, { useState, useEffect } from "react";
import API_BASE from "../../config/api";

const FALLBACK_STRATEGIES = [
  { 
    title: "Environmental", 
    color: "#16A34A", 
    icon: "https://kids.earth.org/wp-content/uploads/2023/07/Untitled-683-%C3%97-1024px-1024-%C3%97-683px-88.jpg",
    items: [
      "Reduce construction material waste across all sites",
      "Promote responsible disposal and recycling practices",
      "Use energy-efficient equipment whenever possible",
      "Source quality materials from trusted local suppliers",
      "Encourage eco-friendly and sustainable construction methods"
    ]
  },
  { 
    title: "Social", 
    color: "#1D4ED8", 
    icon: "https://cdn.prod.website-files.com/65ca7dab8cd9a1af29ec6f0f/66fab6cf7222b3ff7cd9c176_ConstructionSafetyCulture.webp",
    items: [
      "Maintain strong workplace safety standards",
      "Provide skill development and training for workers",
      "Support local employment opportunities",
      "Ensure fair and respectful treatment of all employees",
      "Build long-term relationships with clients and communities"
    ]
  },
  { 
    title: "Governance", 
    color: "#7C3AED", 
    icon: "https://globallawexperts.com/wp-content/uploads/2026/04/construction-law-changes-Germany-2026-Construction-law-changes-Germany-2026-Global-Law-Experts-30-26-2026.webp",
    items: [
      "Maintain transparent project communication",
      "Follow ethical business and procurement practices",
      "Ensure compliance with construction laws and regulations",
      "Promote accountability across all project teams",
      "Focus on quality, integrity, and customer trust"
    ]
  },
];

export default function ESGStrategy() {
  const [strategies, setStrategies] = useState(FALLBACK_STRATEGIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/esg`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setStrategies(data);
        }
      })
      .catch(err => console.log("Failed fetching ESG Strategy, using fallbacks.", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ fontFamily: "'Outfit','Helvetica Neue',Arial,sans-serif", color: "#1F2937" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #052e16 0%, #064e3b 50%, #065f46 100%)", padding: "7rem 2rem 5rem", color: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6EE7B7", marginBottom: 16 }}>OUR CULTURE</p>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>
            ESG Strategy
          </h1>
          <p style={{ fontSize: 20, color: "#A7F3D0", maxWidth: 600, lineHeight: 1.7 }}>
            Environmental, Social, and Governance commitments are not checkbox exercises — they are core to how we build, hire, and operate every single day.
          </p>
        </div>
      </section>

      {/* ESG Pillars */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#0F172A", textAlign: "center", marginBottom: 16 }}>Our Three Pillars</h2>
          <p style={{ fontSize: 16, color: "#6B7280", textAlign: "center", marginBottom: 60 }}>
            We are committed to building responsibly by focusing on sustainable practices, employee well-being, and ethical business operations in every project we undertake.
          </p>
          
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
              <div className="animate-spin-infinite" style={{ width: 40, height: 40, border: "4px solid #E5E7EB", borderTop: "4px solid #10B981", borderRadius: "50%" }}></div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
              {strategies.map(s => (
                <div key={s.title} style={{ background: "white", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", borderTop: `4px solid ${s.color}`, padding: "2.5rem", borderRadius: 8, display: "flex", flexDirection: "column" }}>
                  <div style={{ marginBottom: 24, height: 160, overflow: "hidden", borderRadius: 8, background: "#F3F4F6" }}>
                    {s.icon && s.icon.startsWith("http") ? (
                      <img src={s.icon} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ fontSize: 64, display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>{s.icon || "🌱"}</div>
                    )}
                  </div>
                  <h3 style={{ fontSize: 24, fontWeight: 800, color: "#0F172A", marginBottom: 20 }}>{s.title}</h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1 }}>
                    {s.items.map(item => (
                      <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 0", borderBottom: "1px solid #F1F5F9", fontSize: 14, color: "#4B5563", lineHeight: 1.6 }}>
                        <span style={{ color: s.color, fontWeight: 700, marginTop: 1 }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Progress Section */}
      <section style={{ background: "#F8FAFC", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#0F172A", textAlign: "center", marginBottom: 60 }}>2025 Progress Report</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 40 }}>
            {[
              { label: "Carbon Emissions Reduction", pct: 42, color: "#16A34A" },
              { label: "Renewable Energy Usage", pct: 67, color: "#0284C7" },
              { label: "Women in Leadership", pct: 24, color: "#7C3AED" },
              { label: "Zero Waste Projects", pct: 58, color: "#D97706" },
            ].map(p => (
              <div key={p.label} style={{ background: "white", padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#0F172A" }}>{p.label}</span>
                  <span style={{ fontSize: 20, fontWeight: 800, color: p.color }}>{p.pct}%</span>
                </div>
                <div style={{ height: 10, background: "#F1F5F9", borderRadius: 5, overflow: "hidden" }}>
                  <div style={{ width: `${p.pct}%`, height: "100%", background: p.color, borderRadius: 5, transition: "width 1s" }} />
                </div>
                <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 6 }}>vs. 2020 baseline</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#064E3B", padding: "5rem 2rem", textAlign: "center" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: "white", marginBottom: 16 }}>Download Our ESG Report</h2>
        <p style={{ fontSize: 16, color: "#A7F3D0", marginBottom: 32 }}>Full 2025 Environmental, Social & Governance report — transparent, verified, and comprehensive.</p>
        <button style={{ background: "#10B981", color: "white", border: "none", padding: "16px 40px", fontSize: 15, fontWeight: 700, cursor: "pointer", marginRight: 16 }}>
          Download Report (PDF)
        </button>
        <button style={{ background: "transparent", color: "#A7F3D0", border: "2px solid #A7F3D0", padding: "14px 40px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          Learn More
        </button>
      </section>
    </div>
  );
}
