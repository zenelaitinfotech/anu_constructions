import React, { useState, useEffect } from "react";
import API_BASE from "../../config/api";

const STATIC_LEADERS_DETAILS = {
  "K. Annamalai Rajan": { dept: "Executive", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80", bio: "With over 40 years in construction, Mr. Rajan founded Anu Building Constructions on the principles of integrity and excellence. Under his visionary leadership, the company has grown to become one of India's premier construction firms." },
  "Priya Annamalai": { dept: "Executive", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80", bio: "Priya leads the company's strategic direction, driving innovation and sustainable growth. She holds an MBA from IIM Ahmedabad and has spearheaded the firm's digital transformation and expansion into new market segments." },
  "Suresh Kumar V.": { dept: "Operations", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80", bio: "Suresh oversees all construction operations, ensuring projects are delivered on time and within budget. His expertise in lean construction and process optimization has saved the company over ₹50Cr in operational costs." },
  "Deepa Krishnamurthy": { dept: "Finance", img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&q=80", bio: "Deepa manages the company's financial strategy, risk management, and investor relations. A chartered accountant with 20+ years of experience, she has overseen the company's growth from ₹100Cr to ₹500Cr+ in revenue." },
  "Rajesh Balakrishnan": { dept: "Engineering", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80", bio: "Rajesh drives our technical innovation strategy, including BIM adoption, VDC implementation, and sustainable building practices. He holds a PhD in Civil Engineering from IIT Madras." },
  "Meena Selvam": { dept: "People", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80", bio: "Meena champions our people-first culture, overseeing recruitment, learning & development, and employee well-being. She has built a diverse team of 500+ professionals across 8 regional offices." },
  "Arjun Natarajan": { dept: "Growth", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", bio: "Arjun leads client relationships and business development efforts. He has secured several landmark projects worth over ₹200Cr and built long-term partnerships with government and private sector clients." },
  "Lakshmi Venkatesh": { dept: "ESG", img: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&q=80", bio: "Lakshmi leads our environmental, social, and governance initiatives. She is working towards achieving net-zero construction operations by 2040 and has introduced green building standards across all our projects." }
};

const depts = ["All", "Executive", "Operations", "Finance", "Engineering", "People", "Growth", "ESG"];

export default function Leadership() {
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState(null);
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/leadership`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const enriched = data.map(member => {
            const details = STATIC_LEADERS_DETAILS[member.name] || {
              dept: "Executive",
              img: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80`,
              bio: `${member.name} serves as ${member.role} at Anu Building Constructions.`
            };
            return {
              name: member.name,
              title: member.role,
              initials: member.initials,
              dept: details.dept,
              img: details.img,
              bio: details.bio
            };
          });
          setLeaders(enriched);
        } else {
          // Use default static list if DB is empty
          loadStaticDefaultLeaders();
        }
      })
      .catch(err => {
        console.log("Failed to fetch leaders, using static defaults", err);
        loadStaticDefaultLeaders();
      });
  }, []);

  const loadStaticDefaultLeaders = () => {
    const list = Object.keys(STATIC_LEADERS_DETAILS).map(name => {
      const details = STATIC_LEADERS_DETAILS[name];
      const initials = name.split(" ").map(n => n[0]).join("");
      return {
        name,
        title: name.includes("Rajan") ? "Chairman & Founder" : name.includes("Priya") ? "Managing Director & CEO" : "VP",
        initials,
        dept: details.dept,
        img: details.img,
        bio: details.bio
      };
    });
    setLeaders(list);
  };

  const filtered = active === "All" ? leaders : leaders.filter(l => l.dept === active);

  return (
    <div style={{ fontFamily: "'Outfit','Helvetica Neue',Arial,sans-serif", color: "#1F2937" }}>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #1D4ED8 100%)",
        padding: "7rem 2rem 5rem",
        color: "white",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 30% 70%, rgba(99,102,241,0.2) 0%, transparent 60%)" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#93C5FD", marginBottom: 16 }}>WHO WE ARE</p>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>Our Leadership</h1>
          <p style={{ fontSize: 20, color: "#BFDBFE", maxWidth: 600, lineHeight: 1.7 }}>
            Building the right environment where people can be at their best, be authentic, and are treated with dignity and respect.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section style={{ background: "#F8FAFC", padding: "2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 12, flexWrap: "wrap" }}>
          {depts.map(d => (
            <button
              key={d}
              onClick={() => setActive(d)}
              style={{
                padding: "8px 20px", border: "none", cursor: "pointer",
                fontSize: 13, fontWeight: 600, letterSpacing: "0.05em",
                background: active === d ? "#1D4ED8" : "white",
                color: active === d ? "white" : "#6B7280",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                transition: "all 0.2s"
              }}
            >
              {d}
            </button>
          ))}
        </div>
      </section>

      {/* Leadership Grid */}
      <section style={{ padding: "4rem 2rem 6rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
          {filtered.map((leader) => (
            <div
              key={leader.name}
              onClick={() => setSelected(leader)}
              style={{
                cursor: "pointer",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                transition: "all 0.3s",
                background: "white"
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"; }}
            >
              <div style={{ position: "relative", overflow: "hidden" }}>
                <img src={leader.img} alt={leader.name} style={{ width: "100%", height: 280, objectFit: "cover", display: "block", transition: "transform 0.5s" }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"}
                />
                <div style={{ position: "absolute", top: 12, right: 12, background: "#1D4ED8", color: "white", fontSize: 10, fontWeight: 700, padding: "4px 10px", letterSpacing: "0.08em", textTransform: "uppercase" }}>{leader.dept}</div>
              </div>
              <div style={{ padding: "1.5rem" }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0F172A", marginBottom: 4 }}>{leader.name}</h3>
                <p style={{ fontSize: 13, color: "#1D4ED8", fontWeight: 600 }}>{leader.title}</p>
                <p style={{ fontSize: 13, color: "#6B7280", marginTop: 10, lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{leader.bio}</p>
                <p style={{ fontSize: 12, color: "#1D4ED8", fontWeight: 700, marginTop: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>Read More →</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 1000,
            display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem"
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ background: "white", maxWidth: 640, width: "100%", boxShadow: "0 40px 120px rgba(0,0,0,0.4)", display: "flex", overflow: "hidden" }}
          >
            <img src={selected.img} alt={selected.name} style={{ width: 220, objectFit: "cover", flexShrink: 0 }} />
            <div style={{ padding: "2.5rem" }}>
              <span style={{ background: "#1D4ED8", color: "white", fontSize: 10, fontWeight: 700, padding: "3px 10px", letterSpacing: "0.08em", textTransform: "uppercase" }}>{selected.dept}</span>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0F172A", marginTop: 16, marginBottom: 4 }}>{selected.name}</h2>
              <p style={{ fontSize: 15, color: "#1D4ED8", fontWeight: 600, marginBottom: 20 }}>{selected.title}</p>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "#4B5563" }}>{selected.bio}</p>
              <button
                onClick={() => setSelected(null)}
                style={{ marginTop: 24, background: "#1D4ED8", color: "white", border: "none", padding: "10px 24px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Values strip */}
      <section style={{ background: "#0F172A", padding: "4rem 2rem", color: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 16 }}>Leadership Philosophy</h2>
          <p style={{ fontSize: 16, color: "#94A3B8", maxWidth: 700, margin: "0 auto", lineHeight: 1.8 }}>
            Our leaders believe in servant leadership — putting people first, creating psychological safety, and fostering an environment where every team member can do their best work and grow professionally.
          </p>
        </div>
      </section>
    </div>
  );
}
