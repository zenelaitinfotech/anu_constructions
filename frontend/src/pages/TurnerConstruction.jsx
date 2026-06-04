import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = [
  {
    label: "Our Company",
    page: "our-company"
  },
  {
    label: "Our Services",
    sections: [
      { title: "Our Services", desc: "Our people bring their technical knowledge, experience, and resourcefulness to the delivery of our construction services. Our expertise and value-added offerings support our clients throughout the lifespan of the construction process.", cta: "LEARN MORE" },
      { title: "Approach", links: ["Preconstruction", "Construction Management", "Project Management", "Lean Construction"] },
      { title: "Expertise", links: ["Accelerated Payment Program", "Energy Transition", "Fabrication Shop", "Insurance & Surety", "Offsite Manufacturing", "Risk Management", "Self-Perform Operations", "Supply Chain Management", "Anu Building Constructions Engineering Group", "Anu Building Constructions Technical Services", "Virtual Design & Construction"], cols: 2 },
      { title: "Our Markets", isImage: true, cta: "Learn More" },
    ],
  },
  { label: "Our Projects", page: "projects" },
  { label: "News & Insights", page: "news" },
  { label: "Careers", page: "careers" },
];

const STATS = [
  { num: "$16B+", label: "Revenue" },
  { num: "10,000+", label: "Employees" },
  { num: "1,500+", label: "Projects Annually" },
  { num: "120+", label: "Years of Excellence" },
];

const SERVICES_DATA = [
  { title: "Preconstruction", desc: "Anu Building Constructions's collaborative approach to preconstruction, founded on transparency and accountability is the most trusted and comprehensive in the industry.", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80" },
  { title: "Construction Management", desc: "With a proven track record of excellence spanning over a century, Anu Building Constructions is the leading provider of construction services in North America, and throughout the world.", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80" },
  { title: "Project Management", desc: "Our project management expertise ensures every project is delivered on time, on budget, and to the highest quality standards possible.", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=80" },
  { title: "Lean Construction", desc: "Anu Building Constructions's lean construction approach eliminates waste and maximizes value through collaborative planning, continuous improvement, and engagement.", img: "https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?w=700&q=80" },
  { title: "Virtual Design & Construction", desc: "Leveraging cutting-edge BIM and VDC technologies to optimize project delivery, enhance collaboration, and reduce risk from design through construction.", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=80" },
  { title: "Offsite Manufacturing", desc: "XPL Offsite building solutions reduce risk, improve quality, and accelerate project schedules through modern manufacturing techniques and prefabrication.", img: "https://images.unsplash.com/photo-1562774053-701939374585?w=700&q=80" },
];

const PROJECTS_DATA = [
  { cat: "Healthcare", location: "Baltimore, Maryland", title: "Maryland Public Health Laboratory", img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=500&q=80" },
  { cat: "Cultural/Entertainment", location: "New Delhi, India", title: "Serendipity Arts Live Museum (The Brij)", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&q=80" },
  { cat: "Data Center", location: "Johor Bahru, Malaysia", title: "Confidential Client Data Center Facility", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80" },
  { cat: "Government/Public", location: "Auburn, California", title: "Placer County Health and Human Services", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=80" },
  { cat: "Education", location: "Cambridge, Massachusetts", title: "MIT Campus Innovation Complex", img: "https://images.unsplash.com/photo-1562774053-701939374585?w=500&q=80" },
  { cat: "Aviation", location: "Dallas, Texas", title: "DFW International Terminal D Expansion", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&q=80" },
  { cat: "Sports", location: "Las Vegas, Nevada", title: "Allegiant Stadium", img: "https://images.unsplash.com/photo-1567360425618-1594206637d2?w=500&q=80" },
  { cat: "Commercial", location: "New York, New York", title: "One Vanderbilt Tower", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80" },
  { cat: "Healthcare", location: "Houston, Texas", title: "Texas Medical Center Expansion", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80" },
  { cat: "Education", location: "Los Angeles, California", title: "USC Village Mixed-Use Campus", img: "https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?w=500&q=80" },
  { cat: "Commercial", location: "Seattle, Washington", title: "Amazon Spheres Headquarters", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80" },
  { cat: "Government/Public", location: "Washington, D.C.", title: "National Museum of African American History", img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&q=80" },
];

const MARKET_SECTORS = ["Aviation", "Commercial", "Data Centers", "Education", "Government/Public", "Green Building", "Healthcare", "Historical", "Hotel/Hospitality", "Industrial", "Interiors", "Mixed Use", "Multi-Family", "Performing Arts", "Religious", "Retail", "Science & Technology", "Sports", "Transportation", "Utilities & Power"];

const NEWS_DATA = [
  { date: "May 15, 2026", category: "Press Release", title: "Anu Building Constructions Construction Awarded $2.3B Data Center Project in Northern Virginia", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80", excerpt: "Anu Building Constructions has been selected as the general contractor for a major hyperscale data center development spanning over 2 million square feet." },
  { date: "April 28, 2026", category: "Innovation", title: "Anu Building Constructions's VDC Team Achieves New Milestone in BIM-Driven Construction Delivery", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=80", excerpt: "The Virtual Design & Construction team has implemented AI-powered clash detection saving over 40,000 hours on major projects." },
  { date: "April 10, 2026", category: "Sustainability", title: "Anu Building Constructions Publishes 2025 ESG Report: Making Strides Toward Net Zero by 2040", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80", excerpt: "Anu Building Constructions's annual ESG report highlights significant progress in carbon reduction, workforce diversity, and community investment." },
  { date: "March 22, 2026", category: "Awards", title: "Anu Building Constructions Named ENR Top Contractor for 22nd Consecutive Year", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80", excerpt: "Engineering News-Record has again ranked Anu Building Constructions Construction as the nation's leading general contractor by revenue." },
  { date: "March 5, 2026", category: "Community", title: "Anu Building Constructions Foundation Awards $3M in Community Grants Across 45 Cities Nationwide", img: "https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?w=500&q=80", excerpt: "The Anu Building Constructions Foundation continues its commitment to the communities where we build through strategic philanthropic investment." },
  { date: "February 14, 2026", category: "Safety", title: "Anu Building Constructions Achieves Industry-Leading Safety Record in 2025, Reducing Incidents by 18%", img: "https://images.unsplash.com/photo-1562774053-701939374585?w=500&q=80", excerpt: "Anu Building Constructions's active caring safety culture and innovative programs have driven record-low incident rates across all business units." },
];

// ─────────────────── NAVBAR ───────────────────────────────────────────────────

function Navbar({ setPage }) {
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

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(17,24,39,0.98)" : "rgba(17,24,39,0.95)", backdropFilter: "blur(8px)", boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.4)" : "none", transition: "all 0.3s" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        {/* Logo */}
        <button onClick={() => { setPage("home"); setMobileOpen(false); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <span style={{ color: "white", fontWeight: 700, fontSize: 28, fontFamily: "Georgia,serif", fontStyle: "italic", letterSpacing: "-0.5px" }}>Anu Building Constructions</span>
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
                onMouseEnter={() => { }}
              >
                {item.label}
                {openMenu === item.label && <span style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "#EF4444" }} />}
              </button>
            </div>
          ))}
        </div>

        {/* Right CTAs */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => setPage("contact")} style={{ background: "none", border: "none", cursor: "pointer", color: "#D1D5DB", fontSize: 14, padding: "8px 12px", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "#D1D5DB"}>
            Contact Us
          </button>
          <button onClick={() => setPage("contact")} style={{ background: "#1D4ED8", border: "none", cursor: "pointer", color: "white", fontSize: 13, fontWeight: 600, padding: "10px 18px", transition: "background 0.2s", letterSpacing: "0.02em" }}
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
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "white", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8, padding: 0 }}>
                {NAV_ITEMS.find(i => i.label === openMenu)?.sections[0]?.cta} →
              </button>
              {/* Links in blue panel */}
              {NAV_ITEMS.find(i => i.label === openMenu)?.sections[0]?.links && (
                <ul style={{ marginTop: "1rem", listStyle: "none", padding: 0 }}>
                  {NAV_ITEMS.find(i => i.label === openMenu)?.sections[0]?.links.map(link => (
                    <li key={link} style={{ borderBottom: "1px solid rgba(255,255,255,0.15)", padding: "6px 0" }}>
                      <button style={{ background: "none", border: "none", cursor: "pointer", color: "#BFDBFE", fontSize: 13, padding: 0, transition: "color 0.15s" }}
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
                    <button style={{ background: "none", border: "none", cursor: "pointer", color: "#1D4ED8", fontSize: 13, fontWeight: 600, padding: 0 }}>
                      {sec.cta} →
                    </button>
                  </div>
                ) : (
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, columns: sec.cols === 2 ? 2 : 1, columnGap: 16 }}>
                    {sec.links?.map(link => (
                      <li key={link} style={{ breakInside: "avoid", paddingBottom: 4 }}>
                        <button style={{ background: "none", border: "none", cursor: "pointer", color: "#4B5563", fontSize: 13, padding: "3px 0", transition: "color 0.15s", textAlign: "left", width: "100%" }}
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
                  <button style={{ background: "none", border: "none", cursor: "pointer", color: "#1D4ED8", fontSize: 13, fontWeight: 600, padding: 0 }}>{last.cta} →</button>
                </div>
              ) : null;
            })()}
          </div>
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

// ─────────────────── HOME PAGE ────────────────────────────────────────────────

function HomePage({ setPage }) {
  const [slide, setSlide] = useState(0);
  const slides = [
    { url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80", tag: "ACTIVE CARING | TEAM WORK | INTEGRITY | COMMITMENT" },
    { url: "https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?w=1600&q=80", tag: "BUILDING THE FUTURE | ONE PROJECT AT A TIME" },
    { url: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80", tag: "INNOVATION | SUSTAINABILITY | EXCELLENCE" },
  ];
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", height: "100vh", minHeight: 600, overflow: "hidden" }}>
        {slides.map((sl, i) => (
          <div key={i} style={{ position: "absolute", inset: 0, transition: "opacity 1.2s", opacity: i === slide ? 1 : 0 }}>
            <img src={sl.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(17,24,39,0.85) 0%,rgba(17,24,39,0.5) 50%,rgba(17,24,39,0.2) 100%)" }} />
          </div>
        ))}
        <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", alignItems: "center" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 3rem", width: "100%" }}>
            <p style={{ color: "#9CA3AF", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>
              {slides[slide].tag}
            </p>
            <h1 style={{ color: "white", fontSize: "clamp(3rem,7vw,5.5rem)", fontWeight: 300, lineHeight: 1.1, margin: "0 0 2rem", maxWidth: 800 }}>
              Making a{" "}
              <span style={{ fontWeight: 800, fontStyle: "italic", position: "relative", display: "inline-block" }}>
                Difference
                <span style={{ position: "absolute", bottom: -4, left: 0, right: 0, height: 4, background: "#EF4444", borderRadius: 2 }} />
              </span>
            </h1>
            <button style={{ background: "none", border: "none", cursor: "pointer", color: "white", fontSize: 13, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 12, marginTop: 24, padding: 0, transition: "gap 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.gap = "20px" }} onMouseLeave={e => { e.currentTarget.style.gap = "12px" }}>
              WHAT DO YOU WANT TO BUILD?
              <span style={{ color: "#FCA5A5", fontSize: 20 }}>→</span>
            </button>
          </div>
        </div>
        {/* Indicators */}
        <div style={{ position: "absolute", bottom: 40, left: "3rem", display: "flex", gap: 8, zIndex: 3 }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} style={{ width: 32, height: 3, background: i === slide ? "#EF4444" : "rgba(255,255,255,0.3)", border: "none", cursor: "pointer", transition: "all 0.3s" }} />
          ))}
        </div>
        {/* Scroll hint */}
        <div style={{ position: "absolute", left: 48, bottom: 100, zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.5 }}>
          <span style={{ color: "white", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", writingMode: "vertical-rl" }}>Scroll</span>
          <div style={{ width: 1, height: 48, background: "rgba(255,255,255,0.4)" }} />
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ background: "#1D4ED8", padding: "2.5rem 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "2rem" }}>
          {STATS.map(s => (
            <div key={s.num} style={{ textAlign: "center" }}>
              <div style={{ color: "white", fontSize: 36, fontWeight: 800, lineHeight: 1 }}>{s.num}</div>
              <div style={{ color: "#BFDBFE", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About Intro */}
      <section style={{ background: "white", padding: "6rem 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div>
            <p style={{ color: "#EF4444", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>About Anu Building Constructions</p>
            <h2 style={{ fontSize: 40, fontWeight: 300, color: "#111827", lineHeight: 1.2, marginBottom: 20, margin: "0 0 20px" }}>
              A Legacy of <strong style={{ fontWeight: 800 }}>Building Excellence</strong>
            </h2>
            <p style={{ color: "#4B5563", fontSize: 17, lineHeight: 1.8, marginBottom: 16 }}>
              Anu Building Constructions is a North America-based, international construction services company and is a leading builder in diverse market segments. The company has earned recognition for undertaking large, complex projects, fostering innovation, and taking part in community support activities.
            </p>
            <p style={{ color: "#6B7280", lineHeight: 1.8, marginBottom: 32 }}>
              Founded in 1902, Anu Building Constructions has grown from a small concrete company to one of the largest construction firms in the world, consistently ranking #1 in numerous building sectors as recognized by Engineering News-Record.
            </p>
            <button onClick={() => setPage("about")} style={{ background: "#1D4ED8", color: "white", border: "none", cursor: "pointer", padding: "14px 32px", fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", transition: "background 0.2s" }}
              onMouseEnter={e => e.target.style.background = "#1E40AF"} onMouseLeave={e => e.target.style.background = "#1D4ED8"}>
              Learn More About Us →
            </button>
          </div>
          <div style={{ position: "relative" }}>
            <img src="https://thumbs.dreamstime.com/b/construction-workers-building-site-delhi-india-june-engaged-reinforcing-steel-framework-under-preparing-concrete-slab-397961975.jpg" alt="Anu Building Constructions Construction" style={{ width: "100%", height: 380, objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: -24, left: -24, background: "#1D4ED8", padding: "1.5rem 2rem" }}>
              <div style={{ color: "white", fontSize: 36, fontWeight: 800 }}>120+</div>
              <div style={{ color: "#BFDBFE", fontSize: 12, fontWeight: 600 }}>Years Building America</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section style={{ background: "#F9FAFB", padding: "6rem 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
            <div>
              <p style={{ color: "#EF4444", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>What We Do</p>
              <h2 style={{ fontSize: 38, fontWeight: 300, color: "#111827", margin: 0 }}>Our <strong style={{ fontWeight: 800 }}>Services</strong></h2>
            </div>
            <button onClick={() => setPage("services")} style={{ background: "none", border: "none", cursor: "pointer", color: "#1D4ED8", fontSize: 13, fontWeight: 700 }}>View All Services →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {SERVICES_DATA.map(s => (
              <div key={s.title} style={{ background: "white", borderTop: "4px solid #1D4ED8", padding: "2rem", cursor: "pointer", transition: "box-shadow 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.12)"} onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                <div style={{ height: 160, overflow: "hidden", marginBottom: 20, marginLeft: -32, marginRight: -32, marginTop: -32 }}>
                  <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{s.desc}</p>
                <span style={{ color: "#1D4ED8", fontSize: 13, fontWeight: 700 }}>Learn More →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section style={{ background: "white", padding: "6rem 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
            <div>
              <p style={{ color: "#EF4444", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>Portfolio</p>
              <h2 style={{ fontSize: 38, fontWeight: 300, color: "#111827", margin: 0 }}>Our <strong style={{ fontWeight: 800 }}>Projects</strong></h2>
            </div>
            <button onClick={() => setPage("projects")} style={{ background: "none", border: "none", cursor: "pointer", color: "#1D4ED8", fontSize: 13, fontWeight: 700 }}>View All Projects →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {PROJECTS_DATA.slice(0, 4).map(p => (
              <div key={p.title} style={{ cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.querySelector("h3").style.color = "#1D4ED8"}
                onMouseLeave={e => e.currentTarget.querySelector("h3").style.color = "#111827"}>
                <div style={{ height: 210, overflow: "hidden", marginBottom: 12 }}>
                  <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                    onMouseEnter={e => e.target.style.transform = "scale(1.05)"} onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                </div>
                <p style={{ color: "#1D4ED8", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{p.cat}</p>
                <p style={{ color: "#9CA3AF", fontSize: 11, marginBottom: 6 }}>{p.location}</p>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827", lineHeight: 1.4, margin: 0, transition: "color 0.2s" }}>{p.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Sectors */}
      {/* <section style={{ background: "#111827", padding: "4rem 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", marginBottom: 24 }}>
          <h2 style={{ color: "white", fontSize: 30, fontWeight: 300, margin: 0 }}>Market <strong style={{ fontWeight: 800 }}>Sectors</strong></h2>
        </div>
        <div style={{ display: "flex", gap: 10, overflowX: "auto", padding: "0 2rem 1rem", scrollbarWidth: "none" }}>
          {MARKET_SECTORS.map(sector => (
            <button key={sector} style={{ flexShrink: 0, border: "1px solid #374151", color: "#9CA3AF", padding: "10px 20px", fontSize: 13, fontWeight: 500, background: "none", cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}
              onMouseEnter={e => { e.target.style.borderColor = "#60A5FA"; e.target.style.color = "white"; e.target.style.background = "rgba(29,78,216,0.2)"; }}
              onMouseLeave={e => { e.target.style.borderColor = "#374151"; e.target.style.color = "#9CA3AF"; e.target.style.background = "none"; }}>
              {sector}
            </button>
          ))}
        </div>
      </section> */}

      {/* Differentiators */}
      <section style={{ background: "#1D4ED8", padding: "6rem 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 48 }}>
          {[
            { label: "SOURCEBLUE", sublabel: "SUPPLY CHAIN MANAGEMENT", title: "Supply Chain Management", desc: "Our SourceBlue program leverages bulk purchasing power and manufacturer relationships to deliver significant cost savings and supply chain reliability for our clients.", cta: "LEARN MORE" },
            { label: "XPL OFFSITE", sublabel: "OFFSITE MANUFACTURING", title: "Offsite Building Benefits", desc: "Reduce risk, improve quality, and accelerate your project schedule through modern offsite manufacturing techniques and XPL's industry-leading prefabrication capabilities.", cta: "EXPLORE OFFSITE" },
            { label: "Anu Building Constructions ENGINEERING GROUP", sublabel: "ENGINEERING SOLUTIONS", title: "Optimizing Project Delivery", desc: "From site selection and preconstruction planning to constructability analysis and asset management, through collaborative dialogues with stakeholders, TEG delivers project optimization.", cta: "OPTIMIZE YOUR PROJECT" },
          ].map(card => (
            <div key={card.title} style={{ cursor: "pointer" }}>
              <p style={{ color: "#93C5FD", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 6px" }}>{card.label}</p>
              <h3 style={{ color: "white", fontSize: 24, fontWeight: 800, margin: "0 0 16px", lineHeight: 1.3 }}>{card.title}</h3>
              <p style={{ color: "#BFDBFE", fontSize: 14, lineHeight: 1.8, margin: "0 0 24px" }}>{card.desc}</p>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "white", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8, padding: 0 }}>
                {card.cta} →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* News */}
      <section style={{ background: "white", padding: "6rem 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
            <div>
              <p style={{ color: "#EF4444", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>Stay Informed</p>
              <h2 style={{ fontSize: 38, fontWeight: 300, color: "#111827", margin: 0 }}>News & <strong style={{ fontWeight: 800 }}>Insights</strong></h2>
            </div>
            <button onClick={() => setPage("news")} style={{ background: "none", border: "none", cursor: "pointer", color: "#1D4ED8", fontSize: 13, fontWeight: 700 }}>View All News →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }}>
            {NEWS_DATA.slice(0, 3).map(n => (
              <div key={n.title} style={{ cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.querySelector("h3").style.color = "#1D4ED8"}
                onMouseLeave={e => e.currentTarget.querySelector("h3").style.color = "#111827"}>
                <div style={{ height: 200, overflow: "hidden", marginBottom: 16 }}>
                  <img src={n.img} alt={n.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                    onMouseEnter={e => e.target.style.transform = "scale(1.06)"} onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                </div>
                <span style={{ background: "#EFF6FF", color: "#1D4ED8", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 8px" }}>{n.category}</span>
                <p style={{ color: "#9CA3AF", fontSize: 11, margin: "8px 0 4px" }}>{n.date}</p>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", lineHeight: 1.5, margin: "0 0 8px", transition: "color 0.2s" }}>{n.title}</h3>
                <p style={{ color: "#6B7280", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{n.excerpt.slice(0, 100)}...</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers CTA */}
      <section style={{ position: "relative", padding: "8rem 0", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?w=1600&q=80" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(17,24,39,0.75)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
          <p style={{ color: "#93C5FD", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 16 }}>Join Our Team</p>
          <h2 style={{ color: "white", fontSize: 52, fontWeight: 300, lineHeight: 1.2, marginBottom: 20 }}>
            Build Your <strong style={{ fontWeight: 800 }}>Career</strong> with Anu Building Constructions
          </h2>
          <p style={{ color: "#D1D5DB", fontSize: 17, maxWidth: 560, margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
            We offer career opportunities that challenge, inspire, and reward. Join a team that's building a better world.
          </p>
          <button onClick={() => setPage("careers")} style={{ background: "#DC2626", color: "white", border: "none", cursor: "pointer", padding: "16px 40px", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", transition: "background 0.2s" }}
            onMouseEnter={e => e.target.style.background = "#B91C1C"} onMouseLeave={e => e.target.style.background = "#DC2626"}>
            Explore Careers →
          </button>
        </div>
      </section>
    </>
  );
}

// ─────────────────── ABOUT PAGE ───────────────────────────────────────────────

function AboutPage() {
  return (
    <>
      <section style={{ position: "relative", height: 320, overflow: "hidden", background: "#111827", display: "flex", alignItems: "flex-end" }}>
        <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 2rem 3rem", width: "100%" }}>
          <p style={{ color: "#93C5FD", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>Our Company</p>
          <h1 style={{ color: "white", fontSize: 52, fontWeight: 300, margin: 0 }}>About <strong style={{ fontWeight: 800 }}>Anu Building Constructions</strong></h1>
        </div>
      </section>

      <section style={{ background: "white", padding: "5rem 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem" }}>
          <div>
            <h2 style={{ fontSize: 34, fontWeight: 300, color: "#111827", lineHeight: 1.3, marginBottom: 24 }}>
              Making a Difference in the Lives of Our{" "}
              <strong style={{ fontWeight: 800 }}>People, Customers, and Community</strong>
            </h2>
            <p style={{ color: "#4B5563", lineHeight: 1.9, marginBottom: 16 }}>
              Anu Building Constructions is a North America-based, international construction services company and is a leading builder in diverse market segments. The company has earned recognition for undertaking large, complex projects, fostering innovation, and taking part in community support activities.
            </p>
            <p style={{ color: "#4B5563", lineHeight: 1.9, marginBottom: 32 }}>
              Anu Building Constructions Construction Company is a subsidiary of HOCHTIEF, a publicly traded company and one of the world's leading construction service providers with operations across four continents.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[["Active Caring", "We care deeply about the safety and well-being of every person on our jobsites."], ["Team Work", "Collaboration is at the core of everything we do, from preconstruction to closeout."], ["Integrity", "Honesty and transparency guide our every action and business relationship."], ["Commitment", "We deliver on our promises, every project, every day, every time."]].map(([t, d]) => (
                <div key={t} style={{ borderLeft: "4px solid #1D4ED8", paddingLeft: 16 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 4 }}>{t}</p>
                  <p style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.6, margin: 0 }}>{d}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img src="https://thumbs.dreamstime.com/b/construction-workers-building-site-delhi-india-june-engaged-reinforcing-steel-framework-under-preparing-concrete-slab-397961975.jpg" alt="About Anu Building Constructions" style={{ width: "100%", height: 280, objectFit: "cover", marginBottom: 20 }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
              {STATS.map(s => (
                <div key={s.num} style={{ background: "#F9FAFB", padding: 16, textAlign: "center" }}>
                  <div style={{ color: "#1D4ED8", fontSize: 22, fontWeight: 800 }}>{s.num}</div>
                  <div style={{ color: "#6B7280", fontSize: 11, fontWeight: 600, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "#111827", padding: "5rem 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <h2 style={{ color: "white", fontSize: 32, fontWeight: 300, marginBottom: 40 }}>Our <strong style={{ fontWeight: 800 }}>Leadership</strong></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }}>
            {[["Peter Davoren", "President & CEO"], ["Karl Almstead", "Vice President"], ["Lara Poloni", "Chief Operating Officer"], ["Michael Nutter", "Chief Financial Officer"]].map(([name, role]) => (
              <div key={name} style={{ textAlign: "center" }}>
                <div style={{ width: 80, height: 80, background: "#1D4ED8", borderRadius: "50%", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "white", fontSize: 24, fontWeight: 700 }}>{name.split(" ").map(n => n[0]).join("")}</span>
                </div>
                <p style={{ color: "white", fontWeight: 700, marginBottom: 4 }}>{name}</p>
                <p style={{ color: "#9CA3AF", fontSize: 13 }}>{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#1D4ED8", padding: "5rem 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
          <h2 style={{ color: "white", fontSize: 32, fontWeight: 300, marginBottom: 16 }}>Our <strong style={{ fontWeight: 800 }}>ESG Commitment</strong></h2>
          <p style={{ color: "#BFDBFE", maxWidth: 580, margin: "0 auto 3rem", lineHeight: 1.8 }}>
            Anu Building Constructions is committed to creating sustainable value for our clients, employees, communities, and the planet through responsible environmental, social, and governance practices.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {[["🌱", "Environmental", "Net zero carbon commitment by 2040, green building leadership, waste reduction, and responsible resource management across all operations."], ["👥", "Social", "Diversity, equity, and inclusion programs, meaningful community investment, workforce development, and active caring safety culture."], ["🏛️", "Governance", "Ethical leadership, transparent reporting, supply chain accountability, and strong corporate governance practices at all levels."]].map(([icon, t, d]) => (
              <div key={t} style={{ background: "rgba(30,64,175,0.5)", padding: "2rem", textAlign: "left" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
                <h3 style={{ color: "white", fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{t}</h3>
                <p style={{ color: "#BFDBFE", fontSize: 14, lineHeight: 1.8, margin: 0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ─────────────────── SERVICES PAGE ───────────────────────────────────────────

function ServicesPage() {
  return (
    <>
      <section style={{ position: "relative", height: 300, overflow: "hidden", background: "#111827", display: "flex", alignItems: "flex-end" }}>
        <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 2rem 3rem", width: "100%" }}>
          <p style={{ color: "#93C5FD", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>What We Offer</p>
          <h1 style={{ color: "white", fontSize: 52, fontWeight: 300, margin: 0 }}>Our <strong style={{ fontWeight: 800 }}>Services</strong></h1>
        </div>
      </section>

      <section style={{ background: "white", borderBottom: "1px solid #E5E7EB", position: "sticky", top: 68, zIndex: 40 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", display: "flex", gap: 32 }}>
          {["Approach", "Expertise", "Our Markets"].map(t => (
            <button key={t} style={{ background: "none", border: "none", cursor: "pointer", padding: "16px 0", fontSize: 14, fontWeight: 600, color: "#4B5563", borderBottom: "2px solid transparent", transition: "all 0.2s" }}
              onMouseEnter={e => { e.target.style.color = "#1D4ED8"; e.target.style.borderBottomColor = "#1D4ED8" }}
              onMouseLeave={e => { e.target.style.color = "#4B5563"; e.target.style.borderBottomColor = "transparent" }}>
              {t}
            </button>
          ))}
        </div>
      </section>

      <section style={{ background: "white", padding: "5rem 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <p style={{ color: "#EF4444", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>Approach</p>
          <h2 style={{ fontSize: 36, fontWeight: 300, color: "#111827", marginBottom: 56 }}>How We <strong style={{ fontWeight: 800 }}>Deliver</strong></h2>
          {SERVICES_DATA.map((s, i) => (
            <div key={s.title} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", marginBottom: 80 }}>
              <div style={{ order: i % 2 === 1 ? 2 : 1 }}>
                <h3 style={{ fontSize: 28, fontWeight: 700, color: "#111827", marginBottom: 16 }}>{s.title}</h3>
                <p style={{ color: "#4B5563", lineHeight: 1.9, fontSize: 16, marginBottom: 24 }}>{s.desc}</p>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "#1D4ED8", fontSize: 14, fontWeight: 700, padding: 0 }}>
                  Learn More About {s.title} →
                </button>
              </div>
              <div style={{ order: i % 2 === 1 ? 1 : 2 }}>
                <img src={s.img} alt={s.title} style={{ width: "100%", height: 280, objectFit: "cover" }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#111827", padding: "5rem 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <h2 style={{ color: "white", fontSize: 32, fontWeight: 300, marginBottom: 16 }}>Expertise <strong style={{ fontWeight: 800 }}>Areas</strong></h2>
          <p style={{ color: "#6B7280", marginBottom: 40, maxWidth: 560 }}>Our expertise spans multiple disciplines providing comprehensive solutions throughout the construction lifecycle.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
            {["Accelerated Payment Program", "Energy Transition", "Fabrication Shop", "Insurance & Surety", "Offsite Manufacturing", "Risk Management", "Self-Perform Operations", "Supply Chain Management", "Anu Building Constructions Engineering Group", "Anu Building Constructions Technical Services", "Virtual Design & Construction"].map(item => (
              <div key={item} style={{ border: "1px solid #374151", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#60A5FA"; e.currentTarget.style.background = "rgba(29,78,216,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#374151"; e.currentTarget.style.background = "transparent"; }}>
                <span style={{ color: "#D1D5DB", fontSize: 14, fontWeight: 500 }}>{item}</span>
                <span style={{ color: "#6B7280", fontSize: 18 }}>→</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ─────────────────── PROJECTS PAGE ───────────────────────────────────────────

function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const cats = ["All", "Healthcare", "Education", "Commercial", "Aviation", "Sports", "Data Center", "Government/Public", "Cultural/Entertainment"];
  const filtered = PROJECTS_DATA.filter(p =>
    (filter === "All" || p.cat === filter) &&
    (search === "" || p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <section style={{ position: "relative", height: 280, overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(17,24,39,0.7)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem 2rem", maxWidth: 1280, margin: "0 auto" }}>
          <p style={{ color: "#D1D5DB", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>MEMPHIS, TENNESSEE</p>
          <h2 style={{ color: "white", fontSize: 22, fontWeight: 700, textDecoration: "underline", margin: 0 }}>City of Memphis, Lester Community Center</h2>
        </div>
      </section>

      <section style={{ background: "white", borderBottom: "1px solid #E5E7EB", padding: "16px 0", position: "sticky", top: 68, zIndex: 40 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", border: "1px solid #D1D5DB", padding: "10px 16px", gap: 8 }}>
            <span style={{ fontSize: 18 }}>🔍</span>
            <input placeholder="Find A Project" value={search} onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, border: "none", outline: "none", fontSize: 14, color: "#374151", background: "transparent" }} />
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid #D1D5DB", padding: "10px 20px", fontSize: 14, color: "#374151", background: "none", cursor: "pointer", transition: "border-color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "#9CA3AF"} onMouseLeave={e => e.currentTarget.style.borderColor = "#D1D5DB"}>
            ⚙️ Refine your search
          </button>
        </div>
      </section>

      <section style={{ background: "white", padding: "3rem 0 5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 40 }}>
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)}
                style={{ padding: "8px 18px", fontSize: 13, fontWeight: 600, border: `1px solid ${filter === c ? "#1D4ED8" : "#D1D5DB"}`, background: filter === c ? "#1D4ED8" : "none", color: filter === c ? "white" : "#4B5563", cursor: "pointer", transition: "all 0.2s" }}>
                {c}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {(filtered.length ? filtered : PROJECTS_DATA).map(p => (
              <div key={p.title} style={{ cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.querySelector("h3").style.color = "#1D4ED8"}
                onMouseLeave={e => e.currentTarget.querySelector("h3").style.color = "#111827"}>
                <div style={{ height: 210, overflow: "hidden", marginBottom: 12, position: "relative" }}>
                  <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                    onMouseEnter={e => e.target.style.transform = "scale(1.06)"} onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                  <div style={{ position: "absolute", top: 12, left: 12, background: "#1D4ED8", padding: "4px 10px" }}>
                    <span style={{ color: "white", fontSize: 11, fontWeight: 700 }}>{p.cat}</span>
                  </div>
                </div>
                <p style={{ color: "#9CA3AF", fontSize: 11, marginBottom: 6 }}>{p.location}</p>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111827", lineHeight: 1.4, margin: 0, transition: "color 0.2s" }}>{p.title}</h3>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "4rem", color: "#6B7280" }}>
              <p style={{ fontSize: 18 }}>No projects found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// ─────────────────── NEWS PAGE ────────────────────────────────────────────────

function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const cats = ["All", "Press Release", "Innovation", "Sustainability", "Awards", "Community", "Safety"];
  const filtered = activeCategory === "All" ? NEWS_DATA : NEWS_DATA.filter(n => n.category === activeCategory);

  return (
    <>
      <section style={{ background: "#111827", padding: "8rem 0 3rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <p style={{ color: "#93C5FD", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>Stay Informed</p>
          <h1 style={{ color: "white", fontSize: 52, fontWeight: 300, margin: 0 }}>News & <strong style={{ fontWeight: 800 }}>Insights</strong></h1>
        </div>
      </section>

      <section style={{ background: "white", padding: "3rem 0 5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 48 }}>
            {cats.map(c => (
              <button key={c} onClick={() => setActiveCategory(c)}
                style={{ padding: "8px 18px", fontSize: 13, fontWeight: 600, border: `1px solid ${activeCategory === c ? "#1D4ED8" : "#D1D5DB"}`, background: activeCategory === c ? "#1D4ED8" : "none", color: activeCategory === c ? "white" : "#4B5563", cursor: "pointer", transition: "all 0.2s" }}>
                {c}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 40 }}>
            {(filtered.length ? filtered : NEWS_DATA).map(n => (
              <div key={n.title} style={{ cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.querySelector("h3").style.color = "#1D4ED8"}
                onMouseLeave={e => e.currentTarget.querySelector("h3").style.color = "#111827"}>
                <div style={{ height: 220, overflow: "hidden", marginBottom: 16 }}>
                  <img src={n.img} alt={n.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
                    onMouseEnter={e => e.target.style.transform = "scale(1.06)"} onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                </div>
                <span style={{ background: "#EFF6FF", color: "#1D4ED8", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "4px 8px" }}>{n.category}</span>
                <p style={{ color: "#9CA3AF", fontSize: 11, margin: "10px 0 6px" }}>{n.date}</p>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", lineHeight: 1.5, margin: "0 0 10px", transition: "color 0.2s" }}>{n.title}</h3>
                <p style={{ color: "#6B7280", fontSize: 13, lineHeight: 1.7, margin: "0 0 12px" }}>{n.excerpt}</p>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "#1D4ED8", fontSize: 13, fontWeight: 700, padding: 0 }}>Read More →</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ─────────────────── CAREERS PAGE ────────────────────────────────────────────

function CareersPage() {
  return (
    <>
      <section style={{ position: "relative", height: 520, overflow: "hidden", display: "flex", alignItems: "center" }}>
        <img src="https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?w=1600&q=80" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(17,24,39,0.72)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <p style={{ color: "#93C5FD", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 16 }}>Build Your Future</p>
          <h1 style={{ color: "white", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 300, lineHeight: 1.15, margin: "0 0 20px", maxWidth: 600 }}>
            Join the <strong style={{ fontWeight: 800 }}>Anu Building Constructions</strong><br />Team
          </h1>
          <p style={{ color: "#D1D5DB", fontSize: 17, maxWidth: 480, lineHeight: 1.8, marginBottom: 32 }}>
            Explore career opportunities at one of the nation's leading construction firms.
          </p>
          <button style={{ background: "#DC2626", color: "white", border: "none", cursor: "pointer", padding: "16px 36px", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", transition: "background 0.2s" }}
            onMouseEnter={e => e.target.style.background = "#B91C1C"} onMouseLeave={e => e.target.style.background = "#DC2626"}>
            Search Open Positions →
          </button>
        </div>
      </section>

      <section style={{ background: "white", padding: "5rem 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <p style={{ color: "#EF4444", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>Opportunities</p>
          <h2 style={{ fontSize: 36, fontWeight: 300, color: "#111827", marginBottom: 48 }}>Find Your <strong style={{ fontWeight: 800 }}>Path</strong></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {[["🎓", "Students & Entry Level", "Launch your construction career with one of the industry's most respected firms. We welcome motivated graduates and interns."], ["💼", "Experienced Professionals", "Bring your expertise to projects that shape skylines and communities across the country and around the world."], ["🔧", "Skilled Trade", "Join our self-perform crews and work on the most complex, technically demanding projects in the construction industry."], ["🎖️", "Military Professionals", "We value the leadership, discipline, technical skills, and mission focus that military veterans bring to our teams."]].map(([icon, t, d]) => (
              <div key={t} style={{ borderTop: "4px solid #1D4ED8", paddingTop: 24, padding: "24px 24px 28px", cursor: "pointer", transition: "box-shadow 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.1)"} onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                <div style={{ fontSize: 44, marginBottom: 16 }}>{icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111827", marginBottom: 12 }}>{t}</h3>
                <p style={{ color: "#6B7280", fontSize: 13, lineHeight: 1.8, marginBottom: 16 }}>{d}</p>
                <span style={{ color: "#1D4ED8", fontSize: 13, fontWeight: 700 }}>Explore Positions →</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#1D4ED8", padding: "5rem 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <h2 style={{ color: "white", fontSize: 32, fontWeight: 300, marginBottom: 20 }}>Benefits & <strong style={{ fontWeight: 800 }}>Culture</strong></h2>
            <p style={{ color: "#BFDBFE", lineHeight: 1.9, marginBottom: 32 }}>
              At Anu Building Constructions, we believe our people are our greatest asset. We offer competitive benefits, a culture of inclusion, and opportunities to grow your career on some of the most complex, rewarding projects in the world.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 12 }}>
              {["Competitive salary and performance bonus programs", "Comprehensive health, dental and vision insurance", "401(k) retirement plan with company match", "Professional development and continuing education", "Tuition reimbursement for approved programs", "Paid family and parental leave"].map(b => (
                <li key={b} style={{ display: "flex", alignItems: "center", gap: 12, color: "#BFDBFE", fontSize: 14 }}>
                  <span style={{ color: "#86EFAC", fontWeight: 700, fontSize: 16 }}>✓</span>{b}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80" alt="" style={{ width: "100%", height: 180, objectFit: "cover" }} />
            <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80" alt="" style={{ width: "100%", height: 180, objectFit: "cover", marginTop: 32 }} />
          </div>
        </div>
      </section>

      <section style={{ background: "#F9FAFB", padding: "5rem 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
          <h2 style={{ fontSize: 32, fontWeight: 300, color: "#111827", marginBottom: 16 }}>By the <strong style={{ fontWeight: 800 }}>Numbers</strong></h2>
          <p style={{ color: "#6B7280", maxWidth: 500, margin: "0 auto 3rem" }}>Our employees are at the heart of everything we accomplish together.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {[["10,000+", "Employees Worldwide"], ["45+", "States with Operations"], ["92%", "Employee Satisfaction"], ["#1", "ENR Top Contractor"]].map(([n, l]) => (
              <div key={l} style={{ background: "white", padding: "2.5rem 1.5rem", borderTop: "4px solid #1D4ED8" }}>
                <div style={{ fontSize: 40, fontWeight: 800, color: "#1D4ED8", marginBottom: 8 }}>{n}</div>
                <div style={{ fontSize: 13, color: "#6B7280", fontWeight: 600 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ─────────────────── CONTACT PAGE ────────────────────────────────────────────

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", type: "General Inquiry", message: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !form.email.includes("@")) e.email = "Valid email is required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSent(true);
  };

  return (
    <>
      <section style={{ background: "#111827", padding: "8rem 0 5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <p style={{ color: "#93C5FD", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>Get In Touch</p>
            <h1 style={{ color: "white", fontSize: 52, fontWeight: 300, margin: "0 0 16px" }}>Contact <strong style={{ fontWeight: 800 }}>Us</strong></h1>
            <p style={{ color: "#9CA3AF", lineHeight: 1.9, marginBottom: 40 }}>Have a project in mind? We'd love to discuss how Anu Building Constructions can help bring your vision to life.</p>
            <div style={{ display: "grid", gap: 28 }}>
              {[["📍", "Headquarters", "375 Hudson Street, 6th Floor, New York, NY 10014"], ["📞", "Phone", "(212) 229-6000"], ["📧", "Email", "info@Anu Building Constructionsconstruction.com"], ["🕐", "Business Hours", "Monday – Friday, 8:00 AM – 6:00 PM EST"]].map(([icon, label, val]) => (
                <div key={label} style={{ display: "flex", gap: 16 }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{icon}</span>
                  <div>
                    <p style={{ color: "#6B7280", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{label}</p>
                    <p style={{ color: "#E5E7EB", fontSize: 14 }}>{val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "white", padding: "2.5rem" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ color: "#6B7280", marginBottom: 24 }}>Thank you for reaching out. A Anu Building Constructions representative will be in touch within 1-2 business days.</p>
                <button onClick={() => { setSent(false); setForm({ name: "", email: "", company: "", phone: "", type: "General Inquiry", message: "" }); }}
                  style={{ background: "#1D4ED8", color: "white", border: "none", cursor: "pointer", padding: "12px 28px", fontSize: 13, fontWeight: 700 }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: "#111827", marginBottom: 24 }}>Send Us a Message</h2>
                <div style={{ display: "grid", gap: 16 }}>
                  {[["name", "Full Name *", "text"], ["email", "Email Address *", "email"], ["company", "Company", "text"], ["phone", "Phone Number", "tel"]].map(([key, ph, type]) => (
                    <div key={key}>
                      <input type={type} placeholder={ph} value={form[key]} onChange={e => { setForm({ ...form, [key]: e.target.value }); setErrors({ ...errors, [key]: "" }); }}
                        style={{ width: "100%", border: `1px solid ${errors[key] ? "#EF4444" : "#D1D5DB"}`, padding: "12px 16px", fontSize: 14, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                        onFocus={e => e.target.style.borderColor = "#1D4ED8"} onBlur={e => e.target.style.borderColor = errors[key] ? "#EF4444" : "#D1D5DB"} />
                      {errors[key] && <p style={{ color: "#EF4444", fontSize: 12, marginTop: 4 }}>{errors[key]}</p>}
                    </div>
                  ))}
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                    style={{ border: "1px solid #D1D5DB", padding: "12px 16px", fontSize: 14, outline: "none", background: "white", transition: "border-color 0.2s" }}
                    onFocus={e => e.target.style.borderColor = "#1D4ED8"} onBlur={e => e.target.style.borderColor = "#D1D5DB"}>
                    {["General Inquiry", "Project Inquiry", "Subcontractor Registration", "Career Inquiry", "Media Inquiry", "Other"].map(o => <option key={o}>{o}</option>)}
                  </select>
                  <div>
                    <textarea placeholder="Message *" rows={5} value={form.message} onChange={e => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: "" }); }}
                      style={{ width: "100%", border: `1px solid ${errors.message ? "#EF4444" : "#D1D5DB"}`, padding: "12px 16px", fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box", transition: "border-color 0.2s", fontFamily: "inherit" }}
                      onFocus={e => e.target.style.borderColor = "#1D4ED8"} onBlur={e => e.target.style.borderColor = errors.message ? "#EF4444" : "#D1D5DB"} />
                    {errors.message && <p style={{ color: "#EF4444", fontSize: 12, marginTop: 4 }}>{errors.message}</p>}
                  </div>
                  <button onClick={handleSubmit}
                    style={{ background: "#1D4ED8", color: "white", border: "none", cursor: "pointer", padding: "16px", fontSize: 14, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", transition: "background 0.2s" }}
                    onMouseEnter={e => e.target.style.background = "#1E40AF"} onMouseLeave={e => e.target.style.background = "#1D4ED8"}>
                    Submit Inquiry →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section style={{ background: "#F3F4F6", padding: "4rem 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: "#111827", marginBottom: 32 }}>Office Locations</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {[["New York", "375 Hudson Street, 6th Floor\nNew York, NY 10014", "(212) 229-6000"], ["Los Angeles", "5161 Lankershim Blvd\nNorth Hollywood, CA 91601", "(818) 559-2800"], ["Chicago", "55 E. Monroe Street, Suite 3200\nChicago, IL 60603", "(312) 332-7900"], ["Dallas", "3811 Turtle Creek Blvd, Suite 1200\nDallas, TX 75219", "(214) 979-6600"], ["Atlanta", "230 Peachtree Street NW\nAtlanta, GA 30303", "(404) 888-6600"], ["Boston", "10 Ames Street\nCambridge, MA 02139", "(617) 492-7500"], ["Denver", "1700 Lincoln Street, Suite 3400\nDenver, CO 80203", "(720) 946-0100"], ["Seattle", "Two Union Square, 601 Union St\nSeattle, WA 98101", "(206) 382-5300"]].map(([city, addr, phone]) => (
              <div key={city} style={{ background: "white", padding: "1.5rem", borderTop: "4px solid #1D4ED8" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{city}</h3>
                <p style={{ color: "#6B7280", fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-line", marginBottom: 8 }}>{addr}</p>
                <p style={{ color: "#1D4ED8", fontSize: 13, fontWeight: 700 }}>{phone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ─────────────────── FOOTER ───────────────────────────────────────────────────

function Footer({ setPage }) {
  return (
    <footer style={{ background: "#1D4ED8" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "4rem 2rem 3rem", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40 }}>
        <div>
          <span style={{ color: "white", fontWeight: 700, fontSize: 28, fontFamily: "Georgia,serif", fontStyle: "italic", display: "block", marginBottom: 20 }}>Anu Building Constructions</span>
          <p style={{ color: "#BFDBFE", fontSize: 13, lineHeight: 1.8, maxWidth: 280, marginBottom: 24 }}>
            Making a difference in the lives of our people, customers, and community since 1902.
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
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.2)", padding: "1.5rem 2rem" }}>
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

// ─────────────────── APP ROOT ─────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("home");

  const setPageAndScroll = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pages = {
    home: <HomePage setPage={setPageAndScroll} />,
    about: <AboutPage />,
    services: <ServicesPage />,
    projects: <ProjectsPage />,
    news: <NewsPage />,
    careers: <CareersPage />,
    contact: <ContactPage />,
  };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Helvetica Neue',Arial,sans-serif", background: "white" }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { overflow-x: hidden; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #111827; }
        ::-webkit-scrollbar-thumb { background: #1D4ED8; border-radius: 3px; }
        img { display: block; }
        button { font-family: inherit; }
        input, select, textarea { font-family: inherit; }
        @media(max-width:768px) {
          section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          section > div[style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2,1fr) !important; }
          section > div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
          section > div[style*="grid-template-columns: 2fr 1fr 1fr 1fr"] { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
      <Navbar setPage={setPageAndScroll} />
      <main style={{ paddingTop: page === "home" ? 0 : 68 }}>
        {pages[page] || pages.home}
      </main>
      <Footer setPage={setPageAndScroll} />
    </div>
  );
}
