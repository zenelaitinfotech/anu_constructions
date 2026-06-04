import React, { useState, useEffect } from "react";
import { NEWS_DATA } from "../utils/constants";
import API_BASE from "../config/api";

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&q=80",
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80",
  "https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?w=500&q=80",
  "https://images.unsplash.com/photo-1562774053-701939374585?w=500&q=80"
];

// Rich detailed descriptions for news items
const getDetailedNewsExcerpt = (title) => {
  if (title.includes("Township")) {
    return "Anu Building Constructions has officially launched its flagship residential township project on Avinashi Road in Saravanampatti. Spanning across 15 acres, the gated community is planned to feature 100 modern solar-ready smart houses, comprehensive underground electrical cabling systems, broad blacktop roads, integrated organic waste disposal systems, multi-tier security, and standard groundwater recharging infrastructure. Ground excavation has completed and structural engineering is currently in progress.";
  }
  if (title.includes("3D House")) {
    return "Our engineering division has announced a strategic shift towards 3D concrete printing technologies for selected individual house projects in Coimbatore. By utilizing automated mortar layering machines, we expect to shrink wall construction timelines by up to 60%, drastically lower concrete waste, and achieve absolute structural precision in circular architecture. Field testing was completed and full-scale roll-outs will launch in late 2026.";
  }
  if (title.includes("Residential Builder")) {
    return "Anu Building Constructions was honored with the prestigious 'Best Residential Builder — South India' trophy at the 2026 Construction Excellence Awards held in Chennai. The jury recognized our commitment to delivering 250+ homes on-time with zero structural defect reports, our rigorous use of ISI-certified cement/steel, and our exemplary safety records across all individual housing and villa projects.";
  }
  if (title.includes("Solar-Ready")) {
    return "Beginning early June 2026, every single villa constructed by Anu Building Constructions will incorporate solar panel wiring, high-capacity EV charging provisions, and structured rainwater harvesting systems as a default standard inclusion. We aim to support net-zero carbon home configurations, allowing homeowners to generate up to 80% of their daily electrical power requirements onsite.";
  }
  if (title.includes("Flood-Affected")) {
    return "Our humanitarian division, Anu Foundation, has completed the construction and handover of 10 fully concrete-walled permanent houses for families affected by severe floods near Mettupalayam. Built in a record time of 45 days using prefabricated precast panels, the houses are fully waterproofed and feature elevated structural foundations to prevent future rainwater inundations.";
  }
  if (title.includes("Zero Accident")) {
    return "We have recorded an exemplary zero major accident record across all our residential construction projects in the fiscal year 2025. This safety milestone was achieved through the implementation of daily site safety supervisor checks, mandatory harness usage for height masonry works, strict field compliance checks, and regular hazard identification training workshops.";
  }
  return "Anu Building Constructions continues to push boundaries in quality residential and commercial building construction across South India. Stay tuned for further updates on groundbreaking, projects completions, technical innovations, and sustainability initiatives.";
};

export default function Blog() {
  const [newsList, setNewsList] = useState(NEWS_DATA);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/insights`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const mapped = data.map((item, index) => ({
            date: item.date,
            category: item.category,
            title: item.title,
            img: item.imageUrl || DEFAULT_IMAGES[index % DEFAULT_IMAGES.length],
            excerpt: item.summary || getDetailedNewsExcerpt(item.title)
          }));
          setNewsList(mapped);
        }
      })
      .catch(err => console.log("Failed fetching insights, using fallback.", err))
      .finally(() => setLoading(false));
  }, []);

  const cats = ["All","Press Release","Innovation","Sustainability","Awards","Community","Safety"];
  const filtered = activeCategory === "All" ? newsList : newsList.filter(n => n.category === activeCategory);

  return (
    <div style={{ fontFamily: "'Outfit','Helvetica Neue',Arial,sans-serif" }}>
      <section style={{ background:"#111827", padding:"8rem 0 3rem" }} className="animate-fade-in-up">
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 2rem" }}>
          <p style={{ color:"#93C5FD", fontSize:12, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:12 }}>Stay Informed</p>
          <h1 style={{ color:"white", fontSize:52, fontWeight:300, margin:0 }}>News & <strong style={{ fontWeight:800 }}>Insights</strong></h1>
        </div>
      </section>

      <section style={{ background:"#F9FAFB", padding:"3rem 0 5rem" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 2rem" }}>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:48 }} className="animate-fade-in-up">
            {cats.map(c=>(
              <button key={c} onClick={()=>setActiveCategory(c)}
                style={{ padding:"10px 22px", fontSize:13, fontWeight:700, borderRadius: 20, border:`1px solid ${activeCategory===c?"#1D4ED8":"#D1D5DB"}`, background: activeCategory===c?"#1D4ED8":"white", color: activeCategory===c?"white":"#4B5563", cursor:"pointer", transition:"all 0.2s", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
                {c}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "45vh", gap: 16 }}>
              <div className="animate-spin-infinite" style={{ width: 50, height: 50, border: "4px solid #E5E7EB", borderTop: "4px solid #1D4ED8", borderRadius: "50%" }}></div>
              <p style={{ color: "#4B5563", fontSize: 16, fontWeight: 600 }}>Loading news database...</p>
            </div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40 }}>
              {(filtered.length ? filtered : newsList).map((n, index)=>(
                <div 
                  key={n.title} 
                  className={`${index % 2 === 0 ? 'animate-slide-in-left' : 'animate-slide-in-right'} stagger-${(index % 4) + 1}`}
                  style={{ 
                    cursor:"pointer",
                    background: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: 12,
                    overflow: "hidden",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    display: "flex",
                    flexDirection: "column"
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
                  <div style={{ height:320, overflow:"hidden", position: "relative" }}>
                    <img src={n.img || DEFAULT_IMAGES[index % DEFAULT_IMAGES.length]} alt={n.title} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s" }}
                      onMouseEnter={e=>e.target.style.transform="scale(1.06)"} onMouseLeave={e=>e.target.style.transform="scale(1)"} />
                  </div>
                  <div style={{ padding: "2rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <span style={{ background:"#EFF6FF", color:"#1D4ED8", fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", padding:"5px 12px", borderRadius: 4 }}>{n.category}</span>
                      <p style={{ color:"#9CA3AF", fontSize:12, fontWeight: 700, margin:"14px 0 8px" }}>📅 {n.date}</p>
                      <h3 style={{ fontSize:22, fontWeight:800, color:"#111827", lineHeight:1.3, margin:"0 0 14px", transition:"color 0.2s" }}>{n.title}</h3>
                      <p style={{ color:"#4B5563", fontSize:15, lineHeight:1.8, margin:"0 0 20px", textAlign: "justify" }}>{n.excerpt || getDetailedNewsExcerpt(n.title)}</p>
                    </div>
                    <div>
                      <button style={{ background:"none", border:"none", cursor:"pointer", color:"#1D4ED8", fontSize:14, fontWeight:700, padding:0 }}>Read Full Article →</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
