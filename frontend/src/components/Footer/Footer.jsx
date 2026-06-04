import React from "react";

export default function Footer({ setPage }) {
  return (
    <footer style={{ background: "#1D4ED8" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "4rem 2rem 3rem", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 40 }}>
        <div>
          <span style={{ color: "white", fontWeight: 700, fontSize: 28, fontFamily: "Georgia,serif", fontStyle: "italic", display: "block", marginBottom: 20 }}><img src="/anu_construction.png" alt="Logo" width={240} height={85} /></span>
          <p style={{ color: "#BFDBFE", fontSize: 13, lineHeight: 1.8, maxWidth: 240, marginBottom: 24 }}>
            Making a difference in the lives of our people, customers, and community since 2025.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            {[["f", "Facebook"], ["in", "LinkedIn"], ["▶", "YouTube"], ["📷", "Instagram"]].map(([icon, label]) => (
              <button key={label} aria-label={label} style={{ width: 36, height: 36, background: "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", borderRadius: "50%", color: "white", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}
                onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.3)"} onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.15)"}>
                {icon}
              </button>
            ))}
          </div>
        </div>
        {[
          { title: "Our Company", links: [["About Us", "about"], ["Our Services", "services"], ["Our Projects", "projects"], ["Market Sectors", "about"], ["ESG Strategy", "about"], ["Locations", "contact"]] },
          { title: "Our Services", links: [["Preconstruction", "services"], ["Construction Mgmt", "services"], ["Lean Construction", "services"], ["VDC", "services"], ["Supply Chain", "services"]] },
          { title: "Quick Links", links: [["Our Projects", "projects"], ["News & Insights", "news"], ["Careers", "careers"], ["Contact Us", "contact"], ["Become a Subcontractor", "contact"]] },
        ].map(col => (
          <div key={col.title}>
            <h3 style={{ color: "white", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 20 }}>{col.title}</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
              {col.links.map(([link, page]) => (
                <li key={link}>
                  <button onClick={() => setPage(page)} style={{ background: "none", border: "none", cursor: "pointer", color: "#BFDBFE", fontSize: 13, padding: 0, transition: "color 0.2s", textAlign: "left" }}
                    onMouseEnter={e => e.target.style.color = "white"} onMouseLeave={e => e.target.style.color = "#BFDBFE"}>
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <span style={{ color: "white", fontWeight: 70, fontSize: 15, fontFamily: "Georgia,serif", fontStyle: "italic", display: "block", marginBottom: 20 }}>Developed By:</span>
          <img src="/zenelaitinfotech_logo.png" alt="Logo" style={{ width: 180, height: "auto", objectFit: "contain", imageRendering: "auto" }} />

        </div>
      </div>
      <div className="moving-gradient-bg" style={{ borderTop: "1px solid rgba(255,255,255,0.2)", padding: "1.5rem 2rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ color: "#BFDBFE", fontSize: 13 }}>© {new Date().getFullYear()} Anu Building Constructions Construction Company. All rights reserved.</span>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Use", "Accessibility", "Sitemap"].map(l => (
              <button key={l} style={{ background: "none", border: "none", cursor: "pointer", color: "#BFDBFE", fontSize: 12, padding: 0, transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "white"} onMouseLeave={e => e.target.style.color = "#BFDBFE"}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
