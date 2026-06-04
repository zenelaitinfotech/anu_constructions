import React, { useState, useEffect } from "react";
import API_BASE from "../config/api";

const FALLBACK_CAREERS = [
  { icon: "🎓", title: "Students & Entry Level", description: "Launch your construction career with one of the industry's most respected firms. We welcome motivated graduates and interns." },
  { icon: "💼", title: "Experienced Professionals", description: "Bring your expertise to projects that shape skylines and communities across the country and around the world." },
  { icon: "🔧", title: "Skilled Trade", description: "Join our self-perform crews and work on the most complex, technically demanding projects in the construction industry." },
  { icon: "🎖️", title: "Military Professionals", description: "We value the leadership, discipline, technical skills, and mission focus that military veterans bring to our teams." }
];

const FALLBACK_BENEFITS = [
  "Competitive salary and performance bonus programs",
  "Comprehensive health, dental and vision insurance",
  "401(k) retirement plan with company match",
  "Professional development and continuing education",
  "Tuition reimbursement for approved programs",
  "Paid family and parental leave"
];

export default function Careers() {
  const [opportunities, setOpportunities] = useState(FALLBACK_CAREERS);
  const [benefits, setBenefits] = useState(FALLBACK_BENEFITS.map(text => ({ benefitText: text })));

  useEffect(() => {
    fetch(`${API_BASE}/api/careers`)
      .then(res => res.json())
      .then(data => { if (data && data.length > 0) setOpportunities(data); })
      .catch(err => console.log("Failed fetching careers, using fallback.", err));

    fetch(`${API_BASE}/api/benefits`)
      .then(res => res.json())
      .then(data => { if (data && data.length > 0) setBenefits(data); })
      .catch(err => console.log("Failed fetching benefits, using fallback.", err));
  }, []);

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
            {opportunities.map(job => (
              <div key={job.title} style={{ borderTop: "4px solid #1D4ED8", paddingTop: 24, padding: "24px 24px 28px", cursor: "pointer", transition: "box-shadow 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.1)"} onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                <div style={{ fontSize: 44, marginBottom: 16 }}>{job.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111827", marginBottom: 12 }}>{job.title}</h3>
                <p style={{ color: "#6B7280", fontSize: 13, lineHeight: 1.8, marginBottom: 16 }}>{job.description}</p>
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
              {benefits.map(b => (
                <li key={b.benefitText} style={{ display: "flex", alignItems: "center", gap: 12, color: "#BFDBFE", fontSize: 14 }}>
                  <span style={{ color: "#86EFAC", fontWeight: 700, fontSize: 16 }}>✓</span>{b.benefitText}
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
            {[["100+", "Employees TamilNadu"], ["15+", "States with Operations"], ["92%", "Employee Satisfaction"], ["#1", "ENR Top Contractor"]].map(([n, l]) => (
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
