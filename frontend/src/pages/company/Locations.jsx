import React from "react";

const offices = [
  { city: "Chennai", state: "Tamil Nadu", address: "12, Anna Salai, Thousand Lights, Chennai - 600006", phone: "+91 44 2345 6789", email: "chennai@anuconstructions.in", type: "Head Office", img: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=500&q=80" },
  { city: "Coimbatore", state: "Tamil Nadu", address: "45, Avinashi Road, Peelamedu, Coimbatore - 641004", phone: "+91 422 345 6789", email: "coimbatore@anuconstructions.in", type: "Regional Office", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=80" },
  { city: "Madurai", state: "Tamil Nadu", address: "78, Bypass Road, Palanganatham, Madurai - 625003", phone: "+91 452 345 6789", email: "madurai@anuconstructions.in", type: "Branch Office", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80" },
  { city: "Bengaluru", state: "Karnataka", address: "23, MG Road, Bangalore - 560001", phone: "+91 80 2345 6789", email: "bengaluru@anuconstructions.in", type: "Regional Office", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80" },
  { city: "Hyderabad", state: "Telangana", address: "56, Banjara Hills, Road No. 12, Hyderabad - 500034", phone: "+91 40 2345 6789", email: "hyderabad@anuconstructions.in", type: "Branch Office", img: "https://images.unsplash.com/photo-1562774053-701939374585?w=500&q=80" },
  { city: "Mumbai", state: "Maharashtra", address: "102, Nariman Point, Mumbai - 400021", phone: "+91 22 2345 6789", email: "mumbai@anuconstructions.in", type: "Branch Office", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80" },
];

export default function Locations() {
  return (
    <div style={{ fontFamily: "'Outfit','Helvetica Neue',Arial,sans-serif", color: "#1F2937" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #1e3a5f 0%, #0f172a 50%, #1D4ED8 100%)", padding: "7rem 2rem 5rem", color: "white" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#93C5FD", marginBottom: 16 }}>FIND US</p>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: 24 }}>Our Locations</h1>
          <p style={{ fontSize: 20, color: "#BFDBFE", maxWidth: 580, lineHeight: 1.7 }}>
            With offices across major cities in South India and beyond, we are always close to where you need us.
          </p>
        </div>
      </section>

      {/* Coverage Banner */}
      <section style={{ background: "#1D4ED8", padding: "2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 48, flexWrap: "wrap", justifyContent: "center" }}>
          {[{ n: "8", l: "Offices" }, { n: "6", l: "States" }, { n: "200+", l: "Active Sites" }, { n: "24/7", l: "Support" }].map(s => (
            <div key={s.l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: "white" }}>{s.n}</div>
              <div style={{ fontSize: 12, color: "#BFDBFE", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Offices Grid */}
      <section style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800, color: "#0F172A", textAlign: "center", marginBottom: 60 }}>Our Offices</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {offices.map(o => (
              <div key={o.city} style={{ background: "white", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", overflow: "hidden", transition: "all 0.3s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(0,0,0,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"; }}
              >
                <div style={{ position: "relative" }}>
                  <img src={o.img} alt={o.city} style={{ width: "100%", height: 160, objectFit: "cover" }} />
                  <span style={{ position: "absolute", top: 12, left: 12, background: o.type === "Head Office" ? "#EF4444" : "#1D4ED8", color: "white", fontSize: 10, fontWeight: 700, padding: "4px 10px", letterSpacing: "0.08em", textTransform: "uppercase" }}>{o.type}</span>
                </div>
                <div style={{ padding: "1.5rem" }}>
                  <h3 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A" }}>{o.city}</h3>
                  <p style={{ fontSize: 13, color: "#1D4ED8", fontWeight: 600, marginBottom: 12 }}>{o.state}</p>
                  <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6, marginBottom: 12 }}>📍 {o.address}</p>
                  <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 6 }}>📞 {o.phone}</p>
                  <p style={{ fontSize: 13, color: "#1D4ED8" }}>✉️ {o.email}</p>
                  <button style={{ marginTop: 16, background: "#1D4ED8", color: "white", border: "none", padding: "8px 20px", fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    Get Directions
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section style={{ background: "#F8FAFC", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0F172A", marginBottom: 24, textAlign: "center" }}>Service Coverage Area</h2>
          <div style={{ background: "#E0E7FF", height: 380, display: "flex", alignItems: "center", justifyContent: "center", border: "2px dashed #A5B4FC" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 60, marginBottom: 12 }}>🗺️</div>
              <p style={{ fontSize: 18, color: "#6366F1", fontWeight: 600 }}>Interactive Map Coming Soon</p>
              <p style={{ fontSize: 14, color: "#6B7280", marginTop: 8 }}>We serve all major cities across South India and beyond</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
