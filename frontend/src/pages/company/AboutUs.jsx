import React, { useState, useEffect } from "react";
import API_BASE from "../../config/api";

const FALLBACK_STATS = [
  { num: "120+", label: "Years of Excellence" },
  { num: "₹500Cr+", label: "Projects Delivered" },
  { num: "10,000+", label: "Happy Clients" },
  { num: "500+", label: "Expert Team" },
];

const FALLBACK_VALUES = [
  { icon: "🏗️", title: "Integrity", desc: "We build on trust — every promise made is a promise kept, from foundation to finish." },
  { icon: "⚙️", title: "Innovation", desc: "Leveraging cutting-edge construction technology to deliver superior results faster." },
  { icon: "🤝", title: "Collaboration", desc: "Partnering closely with clients, architects, and communities to create lasting value." },
  { icon: "🌿", title: "Sustainability", desc: "Committed to green building practices and a net-zero future for every project we undertake." },
];

export default function AboutUs() {
  const [stats, setStats] = useState(FALLBACK_STATS);
  const [values, setValues] = useState(FALLBACK_VALUES);

  useEffect(() => {
    // Fetch stats
    fetch(`${API_BASE}/api/stats`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setStats([
            { num: "20+", label: "Years of Excellence" },
            { num: data.activeProjectsCount ? `${data.activeProjectsCount * 50}+` : "2,500+", label: "Homes Built" },
            { num: "500+", label: "Happy Families" },
            { num: data.safetyEMR ? `${data.safetyEMR} EMR` : "50+", label: "Safety Rating" }
          ]);
        }
      })
      .catch(err => console.log("Failed fetching stats for AboutUs, using defaults.", err));

    // Fetch company values
    fetch(`${API_BASE}/api/company-values`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const icons = ["🏗️", "⚙️", "🤝", "🌿"];
          setValues(data.map((v, i) => ({
            icon: icons[i % icons.length],
            title: v.title,
            desc: v.description
          })));
        }
      })
      .catch(err => console.log("Failed fetching values for AboutUs, using defaults.", err));
  }, []);

  return (
    <div style={{ fontFamily: "'Outfit', 'Helvetica Neue', Arial, sans-serif", color: "#1F2937" }}>
      {/* Hero */}
      <section style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1D4ED8 100%)",
        padding: "7rem 2rem 5rem",
        color: "white",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 70% 50%, rgba(59,130,246,0.15) 0%, transparent 60%)" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#93C5FD", marginBottom: 16 }}>OUR COMPANY</p>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>
            About Anu Building<br />
            <span style={{ color: "#60A5FA" }}>Constructions</span>
          </h1>
          <p style={{ fontSize: 20, color: "#BFDBFE", maxWidth: 640, lineHeight: 1.7 }}>
            Building the future of India — one landmark structure at a time. We are a trusted construction partner with over a century of excellence in residential, commercial, and infrastructure projects.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ background: "#1D4ED8", padding: "2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, textAlign: "center" }}>
          {stats.map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 36, fontWeight: 900, color: "white" }}>{s.num}</div>
              <div style={{ fontSize: 13, color: "#BFDBFE", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Are */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#1D4ED8", marginBottom: 12 }}>WHO WE ARE</p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: 24, color: "#0F172A" }}>
              A Legacy Built on Trust
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#4B5563", marginBottom: 20 }}>
              Founded over 120 years ago, Anu Building Constructions has grown from a small regional builder into one of India's most respected construction companies. We specialize in residential complexes, commercial towers, industrial facilities, and public infrastructure.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#4B5563", marginBottom: 20 }}>
              Our work has transformed skylines, revitalized communities, and created spaces where people live, work, and grow. We have earned recognition for undertaking large and complex projects with integrity and commitment.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.8, color: "#4B5563" }}>
              <em>"A promise made is a promise delivered"</em> — this rings as true today as it did when we first broke ground.
            </p>
          </div>
          <div style={{ position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80"
              alt="Anu Building Constructions team"
              style={{ width: "100%", height: 460, objectFit: "cover", boxShadow: "0 30px 80px rgba(0,0,0,0.2)" }}
            />
            <div style={{
              position: "absolute", bottom: -30, left: -30,
              background: "#1D4ED8", color: "white",
              padding: "1.5rem", width: 180
            }}>
              <div style={{ fontSize: 40, fontWeight: 900 }}>20+</div>
              <div style={{ fontSize: 13, opacity: 0.85 }}>Years Building Trust</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section style={{ background: "#F8FAFC", padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#1D4ED8", marginBottom: 12 }}>OUR VISION & MISSION</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "#0F172A", marginBottom: 16 }}>What Drives Us Forward</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            <div style={{ background: "white", padding: "2.5rem", borderLeft: "4px solid #1D4ED8", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", marginBottom: 16 }}>🎯 Our Vision</h3>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#4B5563" }}>
                To be the highest value provider of construction services and technical expertise across India — delivering projects of all types and sizes with unmatched quality and commitment to our communities.
              </p>
            </div>
            <div style={{ background: "white", padding: "2.5rem", borderLeft: "4px solid #EF4444", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", marginBottom: 16 }}>🚀 Our Mission</h3>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: "#4B5563" }}>
                To foster innovation, build sustainably, and conduct business with complete transparency and accountability — making a positive difference in the lives of our people, clients, and the communities we serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#1D4ED8", marginBottom: 12 }}>WHAT WE STAND FOR</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, color: "#0F172A" }}>Our Core Values</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
            {values.map(v => (
              <div key={v.title} style={{ padding: "2rem", background: "#F8FAFC", transition: "all 0.3s", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#1D4ED8"; e.currentTarget.style.color = "white"; e.currentTarget.querySelector(".val-title").style.color = "white"; e.currentTarget.querySelector(".val-desc").style.color = "#BFDBFE"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#F8FAFC"; e.currentTarget.style.color = "#1F2937"; e.currentTarget.querySelector(".val-title").style.color = "#0F172A"; e.currentTarget.querySelector(".val-desc").style.color = "#4B5563"; }}
              >
                <div style={{ fontSize: 40, marginBottom: 16 }}>{v.icon}</div>
                <h3 className="val-title" style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", marginBottom: 12 }}>{v.title}</h3>
                <p className="val-desc" style={{ fontSize: 14, lineHeight: 1.7, color: "#4B5563" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, #0f172a 0%, #1D4ED8 100%)", padding: "5rem 2rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "white", marginBottom: 16 }}>Ready to Build Something Great?</h2>
        <p style={{ fontSize: 18, color: "#BFDBFE", marginBottom: 36 }}>Partner with Anu Building Constructions — where vision meets craftsmanship.</p>
        <button style={{ background: "white", color: "#1D4ED8", border: "none", padding: "16px 40px", fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          Contact Us Today
        </button>
      </section>
    </div>
  );
}
