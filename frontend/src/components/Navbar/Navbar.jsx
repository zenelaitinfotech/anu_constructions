import React, { useState, useEffect, useRef } from "react";
import { NAV_ITEMS } from "../../utils/constants";

const LINK_MAP = {
  "Our Company": "our-company",
  "Our Services": "services",
  "Our Projects": "projects",
  // Our Company
  "About Us": "about-us",
  "Our Leadership": "leadership",
  "Market Sectors": "market-sectors",
  "Anu Building Constructions Foundation": "foundation",
  "Anu Building Constructions International": "about-us",
  "Affiliates": "about-us",
  "Locations": "locations",
  "Anu Building Constructions City": "projects",

  // Our Culture
  "Our ESG Strategy": "esg-strategy",
  "Community and Citizenship": "community",
  "Diversity, Equity, and Inclusion": "diversity",
  "Environmental Sustainability and Resiliency": "esg-strategy",
  "Ethics and Compliance": "esg-strategy",
  "Innovation": "innovation",
  "Safety and Wellness": "safety",

  // Resources
  "General Inquiries": "contact",
  "Cost Index": "services",
  "Anu Building Constructions University": "careers",

  // Services
  "Preconstruction": "preconstruction",
  "Construction Management": "construction-management",
  "Project Management": "project-management",
  "Lean Construction": "lean-construction",
  "Accelerated Payment Program": "services",
  "Energy Transition": "services",
  "Fabrication Shop": "services",
  "Insurance & Surety": "services",
  "Offsite Manufacturing": "services",
  "Risk Management": "services",
  "Self-Perform Operations": "services",
  "Supply Chain Management": "services",
  "Virtual Design & Construction": "services",
};

export default function Navbar({ setPage }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleMouseEnter = (label) => {
    clearTimeout(timerRef.current);
    setOpenMenu(label);
  };
  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => setOpenMenu(null), 150);
  };

  const handleLinkClick = (linkName) => {
    const targetPage = LINK_MAP[linkName] || "home";
    setPage(targetPage);
    setOpenMenu(null);
    setMobileOpen(false);
  };

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(17,24,39,0.98)" : "rgba(17,24,39,0.95)", backdropFilter: "blur(8px)", boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.4)" : "none", transition: "all 0.3s" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        {/* Logo */}
        <button onClick={() => { setPage("home"); setMobileOpen(false); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <span style={{ color: "white", fontWeight: 700, fontSize: 28, fontFamily: "Georgia,serif", fontStyle: "italic", letterSpacing: "-0.5px" }}><img src="/anu_construction.png" alt="Logo" width={250} height={65} /></span>
        </button>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, flex: 1, justifyContent: "center" }}>
          {NAV_ITEMS.map(item => (
            <div key={item.label} style={{ position: "relative" }}
              onMouseEnter={() => item.sections && handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => { if (item.page) { setPage(item.page); setOpenMenu(null); } }}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "22px 16px", fontSize: 14, fontWeight: 500, color: openMenu === item.label ? "#fff" : "#D1D5DB", transition: "color 0.2s", position: "relative" }}
              >
                {item.label}
                {openMenu === item.label && <span style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "#EF4444" }} />}
              </button>
            </div>
          ))}
        </div>

        {/* Right CTAs */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => setPage("admin")} style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", fontSize: 13, padding: "8px 12px", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "#9CA3AF"}>
            Admin Portal
          </button>
          <button onClick={() => setPage("contact")} style={{ background: "none", border: "none", cursor: "pointer", color: "#D1D5DB", fontSize: 14, padding: "8px 12px", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "#D1D5DB"}>
            Contact Us
          </button>
          <button onClick={() => setPage("contact")} style={{ background: "#1D4ED8", border: "none", borderRadius: "10px", cursor: "pointer", color: "white", fontSize: 13, fontWeight: 600, padding: "10px 18px", transition: "background 0.2s", letterSpacing: "0.02em" }}
            onMouseEnter={e => e.target.style.background = "#1E40AF"} onMouseLeave={e => e.target.style.background = "#1D4ED8"}>
            Become a Subcontractor
          </button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none" }} className="mobile-toggle">
          <div style={{ width: 24, height: 2, background: "white", marginBottom: 5, transition: "all 0.3s", transform: mobileOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
          <div style={{ width: 24, height: 2, background: "white", marginBottom: 5, opacity: mobileOpen ? 0 : 1 }} />
          <div style={{ width: 24, height: 2, background: "white", transition: "all 0.3s", transform: mobileOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
        </button>
      </div>

      {/* Mega Menu */}
      {openMenu && (
        <div
          onMouseEnter={() => clearTimeout(timerRef.current)}
          onMouseLeave={handleMouseLeave}
          style={{ position: "absolute", left: 0, right: 0, background: "white", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", borderTop: "3px solid #EF4444", zIndex: 200 }}
        >
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "2.5rem 2rem", display: "grid", gridTemplateColumns: "280px 1fr 1fr 220px", gap: "2rem" }}>
            {/* Blue Panel */}
            <div style={{ background: "#1D4ED8", padding: "1.5rem", color: "white" }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "#BFDBFE", marginBottom: 8, margin: "0 0 8px" }}>
                {openMenu}
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: "#DBEAFE", margin: "0 0 1rem" }}>
                {NAV_ITEMS.find(i => i.label === openMenu)?.sections[0]?.desc}
              </p>
              <button onClick={() => handleLinkClick(NAV_ITEMS.find(i => i.label === openMenu)?.sections[0]?.title)} style={{ background: "none", border: "none", cursor: "pointer", color: "white", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8, padding: 0 }}>
                {NAV_ITEMS.find(i => i.label === openMenu)?.sections[0]?.cta} →
              </button>
              {/* Links in blue panel */}
              {NAV_ITEMS.find(i => i.label === openMenu)?.sections[0]?.links && (
                <ul style={{ marginTop: "1rem", listStyle: "none", padding: 0 }}>
                  {NAV_ITEMS.find(i => i.label === openMenu)?.sections[0]?.links.map(link => (
                    <li key={link} style={{ borderBottom: "1px solid rgba(255,255,255,0.15)", padding: "6px 0" }}>
                      <button onClick={() => handleLinkClick(link)} style={{ background: "none", border: "none", cursor: "pointer", color: "#BFDBFE", fontSize: 13, padding: 0, transition: "color 0.15s" }}
                        onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "#BFDBFE"}>
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Middle columns */}
            {NAV_ITEMS.find(i => i.label === openMenu)?.sections.slice(1, -1).map((sec, si) => (
              <div key={si}>
                <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#1F2937", borderBottom: "1px solid #E5E7EB", paddingBottom: 8, marginBottom: 12, margin: "0 0 12px" }}>{sec.title}</h3>
                {sec.isImage ? (
                  <div>
                    <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&q=80" alt="" style={{ width: "100%", height: 120, objectFit: "cover", marginBottom: 8 }} />
                    <button onClick={() => handleLinkClick(sec.title)} style={{ background: "none", border: "none", cursor: "pointer", color: "#1D4ED8", fontSize: 13, fontWeight: 600, padding: 0 }}>
                      {sec.cta} →
                    </button>
                  </div>
                ) : (
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, columns: sec.cols === 2 ? 2 : 1, columnGap: 16 }}>
                    {sec.links?.map(link => (
                      <li key={link} style={{ breakInside: "avoid", paddingBottom: 4 }}>
                        <button onClick={() => handleLinkClick(link)} style={{ background: "none", border: "none", cursor: "pointer", color: "#4B5563", fontSize: 13, padding: "3px 0", transition: "color 0.15s", textAlign: "left", width: "100%" }}
                          onMouseEnter={e => e.target.style.color = "#1D4ED8"} onMouseLeave={e => e.target.style.color = "#4B5563"}>
                          {link}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Last column (image) */}
            {(() => {
              const last = NAV_ITEMS.find(i => i.label === openMenu)?.sections.at(-1);
              return last?.isImage ? (
                <div>
                  <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#1F2937", borderBottom: "1px solid #E5E7EB", paddingBottom: 8, marginBottom: 12, margin: "0 0 12px" }}>{last.title}</h3>
                  <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&q=80" alt="" style={{ width: "100%", height: 130, objectFit: "cover", marginBottom: 8 }} />
                  <button onClick={() => handleLinkClick(last.title)} style={{ background: "none", border: "none", cursor: "pointer", color: "#1D4ED8", fontSize: 13, fontWeight: 600, padding: 0 }}>{last.cta} →</button>
                </div>
              ) : null;
            })()}
          </div>
        </div>
      )}

      {/* Mobile Drawer menu list */}
      {mobileOpen && (
        <div style={{
          position: "absolute",
          top: 68,
          left: "1rem",
          right: "1rem",
          maxHeight: "calc(100vh - 100px)",
          background: "rgba(17, 24, 39, 0.98)",
          backdropFilter: "blur(12px)",
          zIndex: 90,
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          gap: "1.2rem",
          overflowY: "auto",
          borderRadius: "12px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.08)",
          animation: "slideInMobile 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards"
        }}>
          <style>{`
            @keyframes slideInMobile {
              from { transform: translateY(-20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `}</style>
          {NAV_ITEMS.map((item) => (
            <div key={item.label} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "0.8rem" }}>
              <button
                onClick={() => {
                  if (item.page) {
                    handleLinkClick(item.label);
                  }
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  fontSize: "17px",
                  fontWeight: 600,
                  textAlign: "left",
                  width: "100%",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                {item.label}
              </button>
              {item.sections && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginTop: "0.6rem", paddingLeft: "1rem" }}>
                  {item.sections.map(sec => (
                    sec.links?.map(link => (
                      <button
                        key={link}
                        onClick={() => handleLinkClick(link)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#9CA3AF",
                          fontSize: "13px",
                          textAlign: "left",
                          cursor: "pointer",
                          padding: "3px 0"
                        }}
                      >
                        {link}
                      </button>
                    ))
                  ))}
                </div>
              )}
            </div>
          ))}
          <button onClick={() => handleLinkClick("General Inquiries")} style={{ background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "11px", borderRadius: "4px", fontSize: "14px", fontWeight: 600, cursor: "pointer", marginTop: "1rem" }}>
            Contact Us
          </button>
          <button onClick={() => handleLinkClick("Locations")} style={{ background: "#1D4ED8", border: "none", color: "white", padding: "11px", borderRadius: "4px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>
            Become a Subcontractor
          </button>
        </div>
      )}

      <style>{`
        @media(max-width:768px){
          .mobile-toggle{display:block!important;}
          nav > div > div:nth-child(2){display:none!important;}
          nav > div > div:nth-child(3){display:none!important;}
        }
      `}</style>
    </nav>
  );
}
