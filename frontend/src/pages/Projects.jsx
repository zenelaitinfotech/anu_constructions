import React, { useState, useEffect } from "react";
import { PROJECTS_DATA } from "../utils/constants";
import API_BASE from "../config/api";

// Map titles to rich descriptions to add detail to Projects page cards
const getProjectDesc = (title) => {
  if (title.includes("Kavitha")) {
    return "A premium luxury villa construction incorporating architectural space planning, custom landscape design, private infinity swimming pool, Italian marble flooring, and centralized VRF air-conditioning systems. Built utilizing high-durability concrete masonry and completed within 12 months.";
  }
  if (title.includes("Rajesh")) {
    return "An elegant contemporary residential duplex featuring double-height ceiling architectural design, custom teakwood doors, expansive floor-to-ceiling glass fenestration, premium modular kitchen layout, and smart home automation controls.";
  }
  if (title.includes("Residency")) {
    return "A structural marvel consisting of 24 premium residential apartments built on a strong pile foundation with RCC framed superstructure. Features sewage treatment plant, grid-connected solar power for common lighting, and underground sump water tanks.";
  }
  if (title.includes("Plaza")) {
    return "A state-of-the-art commercial shopping and office complex featuring structural glazing glass facades, high-speed passenger elevators, dedicated multi-level car parking bays, and comprehensive fire fighting systems.";
  }
  if (title.includes("Restoration")) {
    return "Careful structural retrofitting and modern architectural restoration of a heritage building. We preserved structural beams while adding premium modern utilities, bathrooms, wiring, and high-performance wall coatings.";
  }
  if (title.includes("Enclave")) {
    return "A sprawling gated township containing 48 premium villas. Features landscaped gardens, wide internal asphalt roads, sewage lines, rainwater drainage, overhead tanks, and automated entrance security systems.";
  }
  if (title.includes("Senthil")) {
    return "A budget-friendly yet premium individual residence constructed using solid sand cement blocks, featuring premium vitrified tiles, customized safety gates, and ISI certified sanitary fittings.";
  }
  return "A state-of-the-art building project engineered and constructed to premium quality standards using ISI-certified structural materials, featuring beautiful modern facade layouts, natural lighting, and environment-friendly utilities.";
};

export default function Projects() {
  const [projectsList, setProjectsList] = useState(PROJECTS_DATA);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/projects`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const mapped = data.map(p => ({
            cat: p.category || p.cat,
            location: p.location,
            title: p.title,
            img: p.image || p.img,
            desc: p.description || getProjectDesc(p.title)
          }));
          setProjectsList(mapped);
        }
      })
      .catch(err => console.log("Failed fetching projects, using fallback.", err))
      .finally(() => setLoading(false));
  }, []);

  const cats = ["All","Individual House","Luxury Villa","Apartment Complex","Gated Community","Commercial","Renovation","Interior Design"];
  const filtered = projectsList.filter(p =>
    (filter === "All" || p.cat === filter) &&
    (search === "" || p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ fontFamily: "'Outfit','Helvetica Neue',Arial,sans-serif" }}>
      <section style={{ position:"relative", height:340, overflow:"hidden" }} className="animate-fade-in-up">
        <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80" alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        <div style={{ position:"absolute", inset:0, background:"rgba(17,24,39,0.7)" }} />
        <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"2rem", maxWidth:1280, margin:"0 auto" }}>
          <p style={{ color:"#93C5FD", fontSize:12, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:8 }}>FEATURED PROJECT</p>
          <h2 style={{ color:"white", fontSize:28, fontWeight:800, margin:0 }}>Green Valley Enclave — 48-Home Gated Township</h2>
          <p style={{ color: "#D1D5DB", fontSize: 15, marginTop: 10, maxWidth: 800 }}>Coimbatore's premium residential gated township featuring solar-ready modern villas, landscaped parks, and club amenities built by Anu Building Constructions.</p>
        </div>
      </section>

      <section style={{ background:"white", borderBottom:"1px solid #E5E7EB", padding:"20px 0", position:"sticky", top:68, zIndex:40 }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 2rem", display:"flex", gap:16, alignItems:"center" }}>
          <div style={{ flex:1, display:"flex", alignItems:"center", border:"1px solid #D1D5DB", borderRadius: 8, padding:"12px 18px", gap:8, background: "#F9FAFB" }}>
            <span style={{ fontSize:18 }}>🔍</span>
            <input placeholder="Find A Project" value={search} onChange={e=>setSearch(e.target.value)}
              style={{ flex:1, border:"none", outline:"none", fontSize:15, color:"#374151", background:"transparent" }} />
          </div>
        </div>
      </section>

      <section style={{ background:"#F9FAFB", padding:"3rem 0 5rem" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 2rem" }}>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:48 }} className="animate-fade-in-up">
            {cats.map(c=>(
              <button key={c} onClick={()=>setFilter(c)}
                style={{ padding:"10px 22px", fontSize:13, fontWeight:700, borderRadius: 20, border:`1px solid ${filter===c?"#1D4ED8":"#D1D5DB"}`, background: filter===c?"#1D4ED8":"white", color: filter===c?"white":"#4B5563", cursor:"pointer", transition:"all 0.2s", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
                {c}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "45vh", gap: 16 }}>
              <div className="animate-spin-infinite" style={{ width: 50, height: 50, border: "4px solid #E5E7EB", borderTop: "4px solid #1D4ED8", borderRadius: "50%" }}></div>
              <p style={{ color: "#4B5563", fontSize: 16, fontWeight: 600 }}>Loading projects database...</p>
            </div>
          ) : (
            <>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40 }}>
                {(filtered.length ? filtered : projectsList).map((p, index)=>(
                  <div 
                    key={p.title} 
                    className={`${index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'} stagger-${(index % 4) + 1}`}
                    style={{ 
                      cursor:"pointer",
                      background: "white",
                      border: "1px solid #E5E7EB",
                      borderRadius: 12,
                      overflow: "hidden",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                      transition: "transform 0.3s, box-shadow 0.3s"
                    }}
                    onMouseEnter={e=>{
                      e.currentTarget.style.transform = "translateY(-6px)";
                      e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,0.1)";
                      e.currentTarget.querySelector("h3").style.color="#1D4ED8";
                    }}
                    onMouseLeave={e=>{
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.04)";
                      e.currentTarget.querySelector("h3").style.color="#111827";
                    }}>
                    <div style={{ height:340, overflow:"hidden", position:"relative" }}>
                      <img src={p.img} alt={p.title} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s" }}
                        onMouseEnter={e=>e.target.style.transform="scale(1.06)"} onMouseLeave={e=>e.target.style.transform="scale(1)"} />
                      <div style={{ position:"absolute", top:16, left:16, background:"#1D4ED8", padding:"6px 14px", borderRadius: 4 }}>
                        <span style={{ color:"white", fontSize:12, fontWeight:700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{p.cat}</span>
                      </div>
                    </div>
                    <div style={{ padding: "2rem" }}>
                      <p style={{ color:"#9CA3AF", fontSize:12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom:8 }}>📍 {p.location}</p>
                      <h3 style={{ fontSize:22, fontWeight:800, color:"#111827", lineHeight:1.3, margin:"0 0 12px", transition:"color 0.2s" }}>{p.title}</h3>
                      <p style={{ color:"#6B7280", fontSize:15, lineHeight:1.8, margin: 0, textAlign: "justify" }}>
                        {p.desc || getProjectDesc(p.title)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {filtered.length === 0 && (
                <div style={{ textAlign:"center", padding:"4rem", color:"#6B7280" }}>
                  <p style={{ fontSize:18 }}>No projects found matching your search.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
