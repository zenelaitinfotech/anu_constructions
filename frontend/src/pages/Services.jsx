import React, { useState, useEffect } from "react";
import { SERVICES_DATA } from "../utils/constants";
import API_BASE from "../config/api";

const FALLBACK_EXPERTISE = [
  "Foundation & Structural Engineering", "RCC Frame Construction",
  "Brick & Block Masonry", "Roofing & Waterproofing",
  "Plumbing & Sanitary Works", "Electrical & Wiring",
  "Plastering & Painting", "Flooring & Tiling",
  "Doors, Windows & Glazing", "Interior Design & Fit-Out",
  "Landscaping & Compound Walls"
];

// Rich detailed descriptions for Services page to expand content
const getDetailedServiceDesc = (title) => {
  if (title.includes("Individual House")) {
    return "We design and build customized individual houses from ground up. Our services encompass soil bearing strength tests, earthquake-resistant foundation designs, top-grade RCC frame concrete casting, premium thermal-insulated block masonry, water piping laying, fire-safe electrical wiring, and architectural paint finishing. We ensure each house layout maximizes ventilation and sunlight, tailored precisely to your budget and lifestyle.";
  }
  if (title.includes("Luxury Villa")) {
    return "Our premium villa construction is the ultimate expression of structural elegance and residential luxury. We build bespoke high-end villas using premium materials like Italian marble, imported sanitaryware, and custom teak wood fittings. Each villa design features smart home automation, landscaped gardens, solar-ready electricity setups, custom swimming pools, and natural airflow architecture designed by top-tier consultants.";
  }
  if (title.includes("Apartment")) {
    return "We undertake comprehensive multi-storey apartment tower constructions for real estate firms and developers. Utilizing advanced modular formwork, high-strength concrete mixes, and professional project scheduling, we deliver residential blocks with integrated firefighting pipes, community water treatment setups, backup electric generators, rainwater sumps, and elegant common staircases.";
  }
  if (title.includes("Renovation")) {
    return "Breathe new life into your existing home or office space with our structural renovation and modernization services. We perform structural load retrofitting, replace obsolete plumbing and electrical systems, construct new terrace slabs, modernize kitchens and bathrooms, install premium flooring, and modify exterior building elevations with minimal disturbance to neighbors.";
  }
  if (title.includes("Commercial")) {
    return "From retail shops to multi-level corporate offices and shopping complexes, we deliver high-durability commercial structures. We build open-plan workspaces, heavy-load commercial floors, complex curtain glass facades, passenger lift shafts, fire safety zones, and secure basement parking facilities complying fully with local building bylaws.";
  }
  if (title.includes("Interior")) {
    return "Transform your indoor spaces with our end-to-end interior design and fit-out services. We create space-efficient modular kitchens, beautiful TV unit panelings, custom wardrobe layouts, modern false ceilings with LED lighting, and soundproof partition walls for office spaces, combining premium aesthetics with functional daily comfort.";
  }
  if (title.includes("Architecture")) {
    return "Our in-house architects deliver comprehensive architectural planning services — from site feasibility studies, concept sketches, and AutoCAD floor plan layouts to DTCP/CMDA building permit drawings, structural engineering coordination, and 3D elevation design. Every blueprint is crafted to maximize space efficiency, natural light, and ventilation while meeting all local building regulations.";
  }
  if (title.includes("Turnkey")) {
    return "Our turnkey construction service is the ultimate hassle-free solution. We act as your single point of contact — coordinating architectural design, soil testing, material procurement, construction, MEP (mechanical, electrical, plumbing) works, interior finishing, and final handover. Fixed price, defined timeline, and zero compromise on quality. You hand us the key brief; we hand you the completed building.";
  }
  if (title.includes("3D")) {
    return "Visualize your project in stunning photorealistic detail before construction begins. Our 3D visualization team creates lifelike architectural renders, animated walkthroughs, and immersive 360° virtual tours using industry-leading software. Choose your tiles, wall colors, furniture layouts, and lighting schemes in a virtual environment — ensuring complete design confidence and zero costly revisions after construction starts.";
  }
  return "We provide premium construction services handling planning, regulatory approvals, structural engineering, raw construction, interior finishing, and utilities installation with ISI-certified materials and strict supervisor inspections.";
};

export default function Services() {
  const [services, setServices] = useState(SERVICES_DATA);
  const [expertise, setExpertise] = useState(FALLBACK_EXPERTISE.map(name => ({ name })));
  const [loading, setLoading] = useState(true);
  const [selectedExpertise, setSelectedExpertise] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchServices = fetch(`${API_BASE}/api/services`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const mapped = data.map(s => ({
            title: s.title,
            descText: s.descText || getDetailedServiceDesc(s.title),
            img: s.img
          }));
          setServices(mapped);
        }
      });

    const fetchExpertise = fetch(`${API_BASE}/api/expertise`)
      .then(res => res.json())
      .then(data => { if (data && data.length > 0) setExpertise(data); });

    Promise.allSettled([fetchServices, fetchExpertise])
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ fontFamily: "'Outfit','Helvetica Neue',Arial,sans-serif" }}>
      <section style={{ position: "relative", height: 320, overflow: "hidden", background: "#111827", display: "flex", alignItems: "flex-end" }} className="animate-fade-in-up">
        <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 2rem 3rem", width: "100%" }}>
          <p style={{ color: "#93C5FD", fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>What We Offer</p>
          <h1 style={{ color: "white", fontSize: 52, fontWeight: 300, margin: 0 }}>Our <strong style={{ fontWeight: 800 }}>Services</strong></h1>
        </div>
      </section>

      <section style={{ background: "white", borderBottom: "1px solid #E5E7EB", position: "sticky", top: 68, zIndex: 40 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", display: "flex", gap: 32 }}>
          {["Approach", "Expertise"].map(t => (
            <button key={t} onClick={() => {
              const element = document.getElementById(t.toLowerCase());
              if (element) {
                const offset = 140; // account for sticky header height
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = element.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;
                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth"
                });
              }
            }} style={{ background: "none", border: "none", cursor: "pointer", padding: "18px 0", fontSize: 14, fontWeight: 600, color: "#4B5563", borderBottom: "2px solid transparent", transition: "all 0.2s" }}
              onMouseEnter={e => { e.target.style.color = "#1D4ED8"; e.target.style.borderBottomColor = "#1D4ED8" }}
              onMouseLeave={e => { e.target.style.color = "#4B5563"; e.target.style.borderBottomColor = "transparent" }}>
              {t}
            </button>
          ))}
        </div>
      </section>

      <section id="approach" style={{ background: "white", padding: "5rem 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <p style={{ color: "#EF4444", fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }} className="animate-fade-in-up">Approach</p>
          <h2 style={{ fontSize: 36, fontWeight: 300, color: "#111827", marginBottom: 70 }} className="animate-fade-in-up">How We <strong style={{ fontWeight: 800 }}>Deliver</strong></h2>

          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "45vh", gap: 16 }}>
              <div className="animate-spin-infinite" style={{ width: 50, height: 50, border: "4px solid #E5E7EB", borderTop: "4px solid #1D4ED8", borderRadius: "50%" }}></div>
              <p style={{ color: "#4B5563", fontSize: 16, fontWeight: 600 }}>Loading services database...</p>
            </div>
          ) : (
            services.map((s, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={s.title}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 80,
                    alignItems: "center",
                    marginBottom: 100
                  }}
                >
                  {/* Text Block */}
                  <div
                    className={isLeft ? "animate-slide-in-left" : "animate-slide-in-right"}
                    style={{ order: isLeft ? 1 : 2, padding: "40px", borderRadius: "40px" }}
                  >
                    <h3 style={{ fontSize: 36, fontWeight: 800, color: "#111827", marginBottom: 20 }}>
                      {s.title}
                    </h3>
                    <p style={{ color: "#4B5563", lineHeight: 1.9, fontSize: 18, marginBottom: 28, textAlign: "justify" }}>
                      {s.descText || getDetailedServiceDesc(s.title)}
                    </p>
                    <button onClick={() => setSelectedService(s)} style={{ background: "none", border: "none", cursor: "pointer", color: "#1D4ED8", fontSize: 15, fontWeight: 700, padding: 0 }}>
                      Learn More About {s.title} →
                    </button>
                  </div>

                  {/* Image Block */}
                  <div
                    className={isLeft ? "animate-slide-in-right" : "animate-slide-in-left"}
                    style={{
                      order: isLeft ? 2 : 1,
                      overflow: "hidden",
                      borderRadius: 12,
                      boxShadow: "0 10px 40px rgba(0,0,0,0.07)"
                    }}
                  >
                    <img
                      src={s.img}
                      alt={s.title}
                      style={{
                        width: "100%",
                        height: 400,
                        objectFit: "cover",
                        transition: "transform 0.6s"
                      }}
                      onMouseEnter={e => e.target.style.transform = "scale(1.08)"}
                      onMouseLeave={e => e.target.style.transform = "scale(1)"}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      <section id="expertise" style={{ background: "#111827", padding: "6rem 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>
          <h2 style={{ color: "white", fontSize: 36, fontWeight: 300, marginBottom: 16 }}>Construction <strong style={{ fontWeight: 800 }}>Specializations</strong></h2>
          <p style={{ color: "#9CA3AF", marginBottom: 50, maxWidth: 600, fontSize: 16 }}>Our in-house expertise covers every aspect of home and building construction — from foundation to finishing, we do it all.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {expertise.map((item, index) => (
              <div
                key={item.name}
                onClick={() => setSelectedExpertise(item)}
                className={`animate-fade-in-up stagger-${(index % 5) + 1}`}
                style={{
                  border: "1px solid #374151",
                  borderRadius: 8,
                  padding: "20px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  transition: "all 0.25s"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "#60A5FA";
                  e.currentTarget.style.background = "rgba(29,78,216,0.15)";
                  e.currentTarget.style.transform = "translateX(6px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "#374151";
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <span style={{ color: "#E5E7EB", fontSize: 16, fontWeight: 600 }}>{item.name}</span>
                <span style={{ color: "#60A5FA", fontSize: 20 }}>→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Detail Modal */}
      {selectedExpertise && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(17,24,39,0.75)", backdropFilter: "blur(12px)", padding: "1.5rem", animation: "fadeInModal 0.3s ease-out" }}>
          <style>{`
            @keyframes fadeInModal {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUpModal {
              from { transform: translateY(30px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `}</style>
          <div style={{ background: "white", borderRadius: 20, width: "100%", maxWidth: 680, overflow: "hidden", boxShadow: "0 25px 50px rgba(0,0,0,0.25)", border: "1px solid #E5E7EB", animation: "slideUpModal 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
            {selectedExpertise.imageUrl && (
              <div style={{ height: 260, position: "relative" }}>
                <img src={selectedExpertise.imageUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }}></div>
                <h3 style={{ position: "absolute", bottom: 20, left: 24, right: 24, color: "white", fontSize: 24, fontWeight: 800, margin: 0 }}>{selectedExpertise.name}</h3>
              </div>
            )}
            <div style={{ padding: "2rem" }}>
              {!selectedExpertise.imageUrl && (
                <h3 style={{ fontSize: 24, fontWeight: 800, color: "#111827", marginTop: 0, marginBottom: 16 }}>{selectedExpertise.name}</h3>
              )}
              <h4 style={{ color: "#1D4ED8", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Specialization Details</h4>
              <p style={{ color: "#4B5563", fontSize: 16, lineHeight: 1.8, marginBottom: 30, textAlign: "justify" }}>
                {selectedExpertise.description || "Our teams execute these engineering designs to perfection utilizing premium components and daily inspections."}
              </p>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button onClick={() => setSelectedExpertise(null)} style={{ background: "#111827", color: "white", border: "none", padding: "12px 30px", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={e => e.target.style.background = "#1D4ED8"} onMouseLeave={e => e.target.style.background = "#111827"}>
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Service Detail Modal */}
      {selectedService && (
        <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(17,24,39,0.75)", backdropFilter: "blur(12px)", padding: "1.5rem", animation: "fadeInModal 0.3s ease-out" }}>
          <div style={{ background: "white", borderRadius: 20, width: "100%", maxWidth: 840, overflow: "hidden", boxShadow: "0 25px 50px rgba(0,0,0,0.25)", border: "1px solid #E5E7EB", animation: "slideUpModal 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "400px 1fr", minHeight: 460 }}>
              {/* Left Side Gallery */}
              <div style={{ background: "#F3F4F6", display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{ flex: 1, position: "relative", minHeight: 280 }}>
                  <img src={selectedService.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", bottom: 12, left: 16, background: "rgba(17,24,39,0.7)", color: "white", padding: "4px 10px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>Primary View</div>
                </div>
                {/* Secondary Images Gallery Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, padding: 6, background: "#E5E7EB" }}>
                  {[
                    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=300&q=80",
                    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&q=80"
                  ].map((url, uidx) => (
                    <div key={uidx} style={{ height: 90 }}>
                      <img src={url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side Content */}
              <div style={{ padding: "2.5rem 2rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <span style={{ color: "#EF4444", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>Core Service Detail</span>
                  <h3 style={{ fontSize: 26, fontWeight: 800, color: "#111827", margin: "6px 0 16px" }}>{selectedService.title}</h3>
                  <p style={{ color: "#4B5563", fontSize: 14, lineHeight: 1.7, marginBottom: 20, textAlign: "justify" }}>
                    {selectedService.descText}
                  </p>
                  
                  <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#111827", marginBottom: 10 }}>Service Standards & Scope:</h4>
                  <ul style={{ paddingLeft: 18, margin: 0, fontSize: 13, color: "#4B5563", lineHeight: 1.7 }}>
                    <li>100% ISI-Certified grade structural concrete & steel reinforcement</li>
                    <li>Full site engineering supervisor allocation and quality validation logs</li>
                    <li>Transparent estimation breakdown with zero hidden material costs</li>
                    <li>On-schedule project delivery backed by modern scheduling systems</li>
                  </ul>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
                  <button onClick={() => setSelectedService(null)} style={{ background: "#1D4ED8", color: "white", border: "none", padding: "12px 32px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "background 0.2s" }}
                    onMouseEnter={e => e.target.style.background = "#1E40AF"} onMouseLeave={e => e.target.style.background = "#1D4ED8"}>
                    Close Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
