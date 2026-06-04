import React, { useState, useEffect } from "react";
import { STATS } from "../utils/constants";
import ParallaxImage from "../components/Common/ParallaxImage";
import API_BASE from "../config/api";

const FALLBACK_VALUES = [
  { title: "Quality First", description: "We use only ISI-certified materials — premium cement, TMT steel, and AAC blocks — ensuring every home we build stands strong for generations." },
  { title: "On-Time Delivery", description: "We honour our timelines. Our structured project management ensures your home is handed over on the agreed date, every time." },
  { title: "Transparency", description: "No hidden costs, no surprises. We provide detailed cost estimates, regular progress updates, and open communication throughout your project." },
  { title: "Client-First", description: "Your dream home is our mission. We listen, customize, and build exactly what you envision — from foundation to finishing touches." }
];

const FALLBACK_LEADERS = [
  { name: "K. Annamalai Rajan", role: "Chairman & Founder", initials: "KA" },
  { name: "Priya Annamalai", role: "Managing Director & CEO", initials: "PA" },
  { name: "Suresh Kumar V.", role: "Chief Operating Officer", initials: "SK" },
  { name: "Deepa Krishnamurthy", role: "Chief Financial Officer", initials: "DK" }
];

export default function About() {
  const [values, setValues] = useState(FALLBACK_VALUES);
  const [leaders, setLeaders] = useState(FALLBACK_LEADERS);

  useEffect(() => {
    fetch(`${API_BASE}/api/company-values`)
      .then(res => res.json())
      .then(data => { if (data && data.length > 0) setValues(data); })
      .catch(err => console.log("Failed fetching company values, using fallback.", err));

    fetch(`${API_BASE}/api/leadership`)
      .then(res => res.json())
      .then(data => { if (data && data.length > 0) setLeaders(data); })
      .catch(err => console.log("Failed fetching leadership, using fallback.", err));
  }, []);

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
              Building <strong style={{ fontWeight: 800 }}>Dream Homes</strong> Across South India
            </h2>
            <p style={{ color: "#4B5563", lineHeight: 1.9, marginBottom: 16 }}>
              Anu Building Constructions is Chennai's most trusted residential and commercial construction company. Founded in 2004, we have built over 2,500 homes, villas, and apartment complexes — bringing quality construction within reach for families across South India.
            </p>
            <p style={{ color: "#4B5563", lineHeight: 1.9, marginBottom: 32 }}>
              From individual budget homes and luxury villas to large apartment complexes and commercial buildings — we handle the entire construction process end-to-end, using premium materials and our experienced team of 50+ civil engineers and site professionals.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {values.map(val => (
                <div key={val.title} style={{ borderLeft: "4px solid #1D4ED8", paddingLeft: 16 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 4 }}>{val.title}</p>
                  <p style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.6, margin: 0 }}>{val.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <ParallaxImage
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80"
              alt="About Anu Building Constructions"
              height="280px"
              style={{ marginBottom: 20 }}
            />
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
            {leaders.map(member => (
              <div key={member.name} style={{ textAlign: "center" }}>
                <div style={{ width: 80, height: 80, background: "#1D4ED8", borderRadius: "50%", margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "white", fontSize: 24, fontWeight: 700 }}>{member.initials || member.name.split(" ").map(n => n[0]).join("")}</span>
                </div>
                <p style={{ color: "white", fontWeight: 700, marginBottom: 4 }}>{member.name}</p>
                <p style={{ color: "#9CA3AF", fontSize: 13 }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#1D4ED8", padding: "5rem 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
          <h2 style={{ color: "white", fontSize: 32, fontWeight: 300, marginBottom: 16 }}>Our <strong style={{ fontWeight: 800 }}>Green Building Commitment</strong></h2>
          <p style={{ color: "#BFDBFE", maxWidth: 580, margin: "0 auto 3rem", lineHeight: 1.8 }}>
            We are committed to building homes and structures that are energy-efficient, environmentally responsible, and built to last — integrating solar, rainwater harvesting, and green materials into every new build.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {[["🌱", "Eco-Friendly Materials", "We source AAC blocks, fly ash bricks, and recycled steel — reducing your home's carbon footprint from day one."], ["☀️", "Solar-Ready Homes", "All our new villas and homes are pre-wired for solar panels and EV charging, making clean energy adoption seamless."], ["💧", "Rainwater Harvesting", "Every project includes rainwater harvesting systems, reducing municipal water dependence by up to 40% for each household."]].map(([icon, t, d]) => (
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
