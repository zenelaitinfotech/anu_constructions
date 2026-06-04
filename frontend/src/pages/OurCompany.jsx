import React, { useState, useEffect } from "react";
import API_BASE from "../config/api";

const FALLBACK_DIVISIONS = [
  {
    title: "Sales & Business Management",
    description: "Our proactive Sales & Business Development team is dedicated to fully understanding your unique needs and delivering tailored solutions. They work closely with you to assess your requirements, recommend the most suitable options, and guide you through each step of the sales journey.",
    bullets: [
      "Client Relationship Management",
      "Market Research & Analysis",
      "Sales Prospecting & Qualification",
      "Negotiation & Contract Management"
    ],
    imageUrl: "https://images.unsplash.com/photo-1552581230-26425a3d4b6f?w=600&q=80"
  },
  {
    title: "Design & Innovation",
    description: "Our creative design team is passionate about crafting innovative and functional spaces. Collaborating closely with clients, they develop designs that reflect your vision and brand identity, while meticulously considering aesthetics, functionality, and sustainability.",
    bullets: [
      "Architectural & Interior Design",
      "Space Planning & Layout",
      "Material Selection & Specification",
      "3D Visualisation & Rendering"
    ],
    imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&q=80"
  },
  {
    title: "Project Management Consultancy",
    description: "At the heart of every successful project is a team that ensures flawless coordination, timely delivery, and uncompromising quality — meet our Project Management Committee.\n\nThis core unit acts as the backbone of our operations, seamlessly bridging the gap between design vision and on-ground execution. Whether it’s managing tight timelines, aligning cross-functional teams, or navigating on-site challenges, our committee ensures that every project is delivered with precision, professionalism, and purpose.\n\nWith a sharp focus on project milestones, quality control, and client communication, they are the driving force that turns complex ideas into tangible realities — on time, every time.",
    bullets: [],
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80"
  }
];

export default function OurCompany({ setPage }) {
  const [divisions, setDivisions] = useState(FALLBACK_DIVISIONS);

  useEffect(() => {
    fetch(`${API_BASE}/api/team-divisions`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setDivisions(data);
        }
      })
      .catch(err => console.log("Failed fetching team divisions, using defaults.", err));
  }, []);

  return (
    <>
      {/* Hero Header */}
      <section style={{ position: "relative", height: 360, overflow: "hidden", background: "#0B132B", display: "flex", alignItems: "flex-end" }}>
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.3 }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 2rem 4rem", width: "100%" }}>
          <p style={{ color: "#d4af37", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>Our Company</p>
          <h1 style={{ color: "white", fontSize: 56, fontWeight: 300, margin: 0, lineHeight: 1.1 }}>
            About Us & <strong style={{ fontWeight: 800 }}>Our Team</strong>
          </h1>
        </div>
      </section>

      {/* About Us Description */}
      <style>{`
        @keyframes aboutDescBG {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes aboutDescCardBG {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <section style={{
        background: "linear-gradient(-45deg, #ddddf0, #dacdfcff, #c0cdf5ff, #dfd8f7, #515153)",
        backgroundSize: "400% 400%",
        animation: "aboutDescBG 12s ease infinite",
        padding: "6rem 0 4rem"
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          <div style={{
            padding: "1rem",
            borderRadius: "40px",
            background: "linear-gradient(-45deg, #ddddf0, #ecd4ee, #dfd8f7, #bbadbdff, #ddddf0)",
            backgroundSize: "300% 300%",
            animation: "aboutDescCardBG 9s ease infinite",
            boxShadow: "0 20px 60px rgba(81,81,83,0.3)"
          }}>
            <h2 style={{ fontSize: 38, fontWeight: 300, color: "#111827", lineHeight: 1.3, marginBottom: 24 }}>
              Shaping the Future with <strong style={{ fontWeight: 800 }}>Proven Excellence</strong>
            </h2>
            <p style={{ color: "#1f1f2e", fontSize: 17, lineHeight: 1.8, marginBottom: 20 }}>
              Anu Building Constructions is a trusted builder delivering quality homes, luxury villas, and commercial buildings. Over the years, we have built a reputation for excellence, utilizing premium certified materials and advanced project management systems.
            </p>
            <p style={{ color: "#2d2d3a", fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
              Together, our teams work seamlessly to deliver precision, efficiency, and outstanding results. With over a decade of industry expertise, we are dedicated to providing innovative, sustainable, and high-quality prefabricated sales offices and building structures that exceed expectations.
            </p>
            <p style={{ color: "#111827", fontSize: 18, fontWeight: 700, margin: 0 }}>
              Trust the industry leaders to shape your future with decades of proven excellence.
            </p>
          </div>
          <div>
            <div style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}>
              <img src="https://5.imimg.com/data5/SELLER/Default/2025/6/515823482/SN/QL/WV/113282588/home-construction-services-500x500.jpg" alt="About Anu Building Constructions" style={{ width: "100%", height: 380, objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <style>{`
        @keyframes teamSectionBG {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes teamCardBG {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <section style={{
        background: "linear-gradient(-45deg, #ddddf0, #222233, #caebf8, #1a1a2e)",
        backgroundSize: "400% 400%",
        animation: "teamSectionBG 14s ease infinite",
        padding: "6rem 0"
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <div style={{ textAlign: "center", marginBottom: 60, maxWidth: 800, margin: "0 auto 60px" }}>
            <p style={{ color: "#EF4444", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Driving Forces</p>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: "#111827", marginBottom: 20 }}>Our Driving Teams</h2>
            <p style={{ color: "#6B7280", fontSize: 16, lineHeight: 1.7 }}>
              Here are our driving forces, leading by example and setting the standard for excellence within our organisation.
            </p>
          </div>

          <div style={{ display: "grid", gap: 60 }}>
            {divisions.map((division, idx) => (
              <div
                key={division.title}
                style={{
                  background: "white",
                  borderRadius: 16,
                  padding: "3rem",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
                  border: "1px solid #E5E7EB",
                  display: "grid",
                  gridTemplateColumns: idx % 2 === 0 ? "1.2fr 1fr" : "1fr 1.2fr",
                  gap: "4rem",
                  alignItems: "center"
                }}
              >
                <div style={{ order: idx % 2 === 0 ? 1 : 2, padding: "2rem", borderRadius: "40px", background: "linear-gradient(-45deg, #ddddf0, #caebf8, #ddddf0, #caebf8)", backgroundSize: "300% 300%", animation: "teamCardBG 8s ease infinite", boxShadow: "0 20px 60px rgba(34,34,51,0.3)" }}>
                  <h3 style={{ fontSize: 26, fontWeight: 800, color: "#1D4ED8", marginBottom: 16 }}>{division.title}</h3>
                  <p style={{ color: "#4B5563", lineHeight: 1.8, marginBottom: 24, fontSize: 15, whiteSpace: "pre-line" }}>
                    {division.description}
                  </p>

                  {division.bullets && division.bullets.length > 0 && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      {division.bullets.map(bullet => (
                        <div key={bullet} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#374151", fontWeight: 600 }}>
                          <span style={{ color: "#EF4444", fontSize: 16 }}>✓</span>
                          {bullet}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ order: idx % 2 === 0 ? 2 : 1, overflow: "hidden", borderRadius: 12 }}>
                  <img
                    src={division.imageUrl || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"}
                    alt={division.title}
                    style={{ width: "100%", height: 300, objectFit: "cover", borderRadius: 12 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Subcontractor CTA */}
      <section style={{ position: "relative", padding: "8rem 0", overflow: "hidden", textAlign: "center" }}>
        <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(11,19,43,0.85)" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 800, margin: "0 auto", padding: "0 2rem" }}>
          <p style={{ color: "#d4af37", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>Subcontracting Opportunities</p>
          <h2 style={{ color: "white", fontSize: 44, fontWeight: 800, marginBottom: 20 }}>Become a Subcontractor</h2>
          <p style={{ color: "#BFDBFE", fontSize: 16, lineHeight: 1.8, marginBottom: 36 }}>
            Partner with South India's premier builder. We seek dedicated, high-quality subcontractors to collaborate on luxury villa development, commercial construction, and interior fitting. Submit your details to our partner desk today.
          </p>
          <button
            onClick={() => setPage("contact")}
            style={{
              background: "#d4af37",
              color: "#0B132B",
              border: "none",
              cursor: "pointer",
              padding: "16px 40px",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              borderRadius: 4,
              boxShadow: "0 10px 20px rgba(212,175,87,0.25)",
              transition: "all 0.3s"
            }}
            onMouseEnter={e => { e.target.style.background = "#c5a880"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.background = "#d4af37"; e.target.style.transform = "none"; }}
          >
            Apply Now & Join Us →
          </button>
        </div>
      </section>
    </>
  );
}
