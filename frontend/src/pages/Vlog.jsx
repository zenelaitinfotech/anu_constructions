import React, { useState, useEffect } from "react";
import API_BASE from "../config/api";

const FALLBACK_VLOGS = [
  {
    id: 1,
    title: "3BHK Luxury Villa — Full Construction Time-Lapse",
    description: "Watch the complete journey of a premium 3BHK luxury villa from foundation to final handover in this stunning construction time-lapse.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    driveUrl: "",
    thumbnailUrl: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=700&q=80",
    category: "Construction",
    date: "May 28, 2026"
  },
  {
    id: 2,
    title: "Interior Design Reveal — Modern Apartment Fit-Out",
    description: "A complete walkthrough of our latest interior design project — a modern apartment featuring custom modular kitchen, false ceiling LED designs, and imported marble flooring.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    driveUrl: "",
    thumbnailUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=700&q=80",
    category: "Interior Design",
    date: "May 15, 2026"
  },
  {
    id: 3,
    title: "3D Visualization Process — From Concept to Render",
    description: "See how our 3D visualization team transforms a simple floor plan into a hyper-realistic rendered walkthrough.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    driveUrl: "",
    thumbnailUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
    category: "3D Visualization",
    date: "April 30, 2026"
  }
];

const CATEGORIES = ["All", "Construction", "Interior Design", "3D Visualization", "Site Tour", "Testimonial", "Tips & Tricks"];

// ── URL Converters ──────────────────────────────────────────────────────────

/**
 * Convert any YouTube URL format → embed URL
 * Handles: watch?v=, youtu.be/, /embed/ already
 */
function toYoutubeEmbed(url) {
  if (!url) return null;
  if (url.includes("/embed/")) return url;
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=1&rel=0`;
  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=1&rel=0`;
  return url;
}

/**
 * Convert any Google Drive share/view URL → preview embed URL
 * Handles: /file/d/ID/view, /file/d/ID/edit, /open?id=ID
 */
function toDriveEmbed(url) {
  if (!url) return null;
  // Already a preview URL
  if (url.includes("/preview")) return url;
  // /file/d/ID/view or /file/d/ID/edit
  const fileMatch = url.match(/\/file\/d\/([^/?]+)/);
  if (fileMatch) return `https://drive.google.com/file/d/${fileMatch[1]}/preview`;
  // open?id=ID
  const openMatch = url.match(/[?&]id=([^&]+)/);
  if (openMatch) return `https://drive.google.com/file/d/${openMatch[1]}/preview`;
  return url;
}

/**
 * Determine the best embed URL to use:
 * Drive URL is preferred for in-page viewing (no ads, no exit)
 * Falls back to YouTube embed
 */
function getBestEmbed(vlog) {
  if (vlog.driveUrl) return { url: toDriveEmbed(vlog.driveUrl), type: "drive" };
  if (vlog.videoUrl) return { url: toYoutubeEmbed(vlog.videoUrl), type: "youtube" };
  return null;
}

// ── Component ───────────────────────────────────────────────────────────────

export default function Vlog() {
  const [vlogs, setVlogs] = useState(FALLBACK_VLOGS);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeVlog, setActiveVlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/vlogs`)
      .then(res => res.json())
      .then(data => { if (data && data.length > 0) setVlogs(data); })
      .catch(err => console.log("Using default vlogs.", err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === "All"
    ? vlogs
    : vlogs.filter(v => v.category === activeCategory);

  return (
    <>
      <style>{`
        @keyframes vlogHeroBG {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes rotateSpinner { to { transform: rotate(360deg); } }

        .vlog-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #E5E7EB;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(0,0,0,0.05);
          transition: transform 0.35s cubic-bezier(0.25,1,0.5,1), box-shadow 0.35s cubic-bezier(0.25,1,0.5,1);
        }
        .vlog-card:hover { transform: translateY(-6px); box-shadow: 0 24px 48px rgba(0,0,0,0.13); }

        .vlog-thumb { width:100%; height:220px; object-fit:cover; transition: transform 0.5s cubic-bezier(0.25,1,0.5,1); display:block; }
        .vlog-card:hover .vlog-thumb { transform: scale(1.06); }

        .vlog-play-overlay {
          position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
          background: rgba(17,24,39,0.42);
          opacity:0; transition:opacity 0.3s;
        }
        .vlog-card:hover .vlog-play-overlay { opacity:1; }

        .play-circle {
          width:64px; height:64px; background:white; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          font-size:22px; box-shadow:0 8px 24px rgba(0,0,0,0.25);
          transition:transform 0.2s;
        }
        .vlog-card:hover .play-circle { transform:scale(1.12); }

        .cat-btn {
          padding:8px 20px; border:1.5px solid #E5E7EB; border-radius:50px;
          background:white; font-size:13px; font-weight:600; cursor:pointer;
          color:#4B5563; transition:all 0.2s; white-space:nowrap;
        }
        .cat-btn:hover { border-color:#1D4ED8; color:#1D4ED8; }
        .cat-btn.active { background:#1D4ED8; border-color:#1D4ED8; color:white; }

        /* Modal */
        .vlog-modal-backdrop {
          position:fixed; inset:0; background:rgba(0,0,0,0.90); z-index:9999;
          display:flex; align-items:center; justify-content:center; padding:1.5rem;
          animation: fadeInBackdrop 0.25s ease;
        }
        @keyframes fadeInBackdrop { from{opacity:0} to{opacity:1} }

        .vlog-modal-box {
          width:100%; max-width:920px;
          background:#0d1117; border-radius:20px; overflow:hidden;
          animation: scaleInModal 0.3s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 40px 80px rgba(0,0,0,0.6);
        }
        @keyframes scaleInModal { from{transform:scale(0.90);opacity:0} to{transform:scale(1);opacity:1} }

        .video-frame-wrap {
          position:relative; width:100%; padding-top:56.25%; background:#000;
        }
        .video-frame-wrap iframe {
          position:absolute; inset:0; width:100%; height:100%; border:none;
        }

        .video-source-badge {
          display:inline-flex; align-items:center; gap:6px;
          padding:4px 12px; border-radius:20px; font-size:11px; font-weight:700;
          text-transform:uppercase; letter-spacing:0.08em;
        }
        .badge-drive { background:#1a73e8; color:white; }
        .badge-youtube { background:#FF0000; color:white; }

        .switch-btn {
          background: rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15);
          color:white; padding:6px 14px; border-radius:8px; font-size:12px;
          font-weight:600; cursor:pointer; transition:all 0.2s;
        }
        .switch-btn:hover { background:rgba(255,255,255,0.15); }
        .switch-btn.active-src { background:#1D4ED8; border-color:#1D4ED8; }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(-45deg, #111827, #1E3A8A, #0F172A, #1D4ED8)",
        backgroundSize: "400% 400%",
        animation: "vlogHeroBG 12s ease infinite",
        padding: "8rem 0 5rem",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{ position:"absolute", inset:0, opacity:0.05,
          backgroundImage:"radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize:"32px 32px" }} />
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 2rem", position:"relative", zIndex:2 }}>
          <p style={{ color:"#93C5FD", fontSize:12, fontWeight:700, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:16 }}>
            📹 Behind the Build
          </p>
          <h1 style={{ color:"white", fontSize:56, fontWeight:300, margin:"0 0 20px", lineHeight:1.1 }}>
            Our <strong style={{ fontWeight:800 }}>Vlogs</strong>
          </h1>
          <p style={{ color:"#9CA3AF", fontSize:18, maxWidth:560, lineHeight:1.8, margin:0 }}>
            Watch time-lapses, design reveals, 3D walkthroughs, and client stories — all without leaving this page.
          </p>
        </div>
      </section>

      {/* ── Category Filter ───────────────────────────────────────────────── */}
      <section style={{ background:"white", borderBottom:"1px solid #E5E7EB", padding:"1.2rem 0", position:"sticky", top:68, zIndex:40 }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 2rem", display:"flex", gap:10, flexWrap:"wrap" }}>
          {CATEGORIES.map(cat => (
            <button key={cat} className={`cat-btn${activeCategory === cat ? " active" : ""}`}
              onClick={() => setActiveCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Vlogs Grid ───────────────────────────────────────────────────── */}
      <section style={{ background:"#F9FAFB", padding:"5rem 0" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 2rem" }}>
          {loading ? (
            <div style={{ display:"flex", justifyContent:"center", alignItems:"center", height:300 }}>
              <div style={{ width:48, height:48, border:"4px solid #E5E7EB", borderTop:"4px solid #1D4ED8",
                borderRadius:"50%", animation:"rotateSpinner 1s linear infinite" }} />
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign:"center", padding:"5rem 0", color:"#9CA3AF" }}>
              <div style={{ fontSize:56, marginBottom:16 }}>📭</div>
              <p style={{ fontSize:18, fontWeight:600 }}>No vlogs in this category yet.</p>
            </div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:28 }}>
              {filtered.map((vlog, i) => {
                const embed = getBestEmbed(vlog);
                const hasDrive = !!vlog.driveUrl;
                const hasYouTube = !!vlog.videoUrl;
                return (
                  <div key={vlog.id || i} className="vlog-card" onClick={() => setActiveVlog(vlog)}>
                    <div style={{ position:"relative", overflow:"hidden" }}>
                      <img
                        className="vlog-thumb"
                        src={vlog.thumbnailUrl || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&q=80"}
                        alt={vlog.title}
                      />
                      <div className="vlog-play-overlay">
                        <div className="play-circle">▶</div>
                      </div>
                      {/* Source badges */}
                      <div style={{ position:"absolute", top:12, left:12, display:"flex", gap:6 }}>
                        <span style={{
                          background:"#1D4ED8", color:"white", fontSize:10, fontWeight:700,
                          padding:"3px 10px", borderRadius:20, letterSpacing:"0.1em", textTransform:"uppercase"
                        }}>{vlog.category}</span>
                      </div>
                      <div style={{ position:"absolute", bottom:12, right:12, display:"flex", gap:5 }}>
                        {hasDrive && <span className="video-source-badge badge-drive">🗂 Drive</span>}
                        {hasYouTube && <span className="video-source-badge badge-youtube">▶ YouTube</span>}
                      </div>
                    </div>
                    <div style={{ padding:"1.25rem" }}>
                      <p style={{ color:"#9CA3AF", fontSize:11, marginBottom:8 }}>{vlog.date}</p>
                      <h3 style={{ fontSize:16, fontWeight:700, color:"#111827", lineHeight:1.4, marginBottom:8 }}>
                        {vlog.title}
                      </h3>
                      <p style={{ color:"#6B7280", fontSize:13, lineHeight:1.7, margin:0 }}>
                        {vlog.description ? vlog.description.slice(0,100) + "…" : ""}
                      </p>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:14, color:"#1D4ED8", fontSize:13, fontWeight:700 }}>
                        ▶ Watch Now
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── Video Modal ───────────────────────────────────────────────────── */}
      {activeVlog && (
        <VideoModal vlog={activeVlog} onClose={() => setActiveVlog(null)} />
      )}
    </>
  );
}

// ── Video Modal with source switcher ────────────────────────────────────────

function VideoModal({ vlog, onClose }) {
  const hasDrive = !!vlog.driveUrl;
  const hasYouTube = !!vlog.videoUrl;

  // Prefer Google Drive (stays on-site, no ads); fall back to YouTube
  const [source, setSource] = useState(hasDrive ? "drive" : "youtube");

  const embedUrl = source === "drive"
    ? toDriveEmbed(vlog.driveUrl)
    : toYoutubeEmbed(vlog.videoUrl);

  return (
    <div className="vlog-modal-backdrop" onClick={onClose}>
      <div className="vlog-modal-box" onClick={e => e.stopPropagation()}>

        {/* ── Video Player ── */}
        <div className="video-frame-wrap">
          {embedUrl ? (
            <iframe
              key={`${source}-${vlog.id}`}
              src={embedUrl}
              title={vlog.title}
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
            />
          ) : (
            <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center",
              justifyContent:"center", color:"#9CA3AF", fontSize:16 }}>
              No video URL provided.
            </div>
          )}
        </div>

        {/* ── Info Panel ── */}
        <div style={{ padding:"1.4rem 2rem 1.8rem" }}>

          {/* Source Switcher — only show if both URLs exist */}
          {hasDrive && hasYouTube && (
            <div style={{ display:"flex", gap:8, marginBottom:14 }}>
              <button
                className={`switch-btn${source === "drive" ? " active-src" : ""}`}
                onClick={() => setSource("drive")}
              >
                🗂 Google Drive
              </button>
              <button
                className={`switch-btn${source === "youtube" ? " active-src" : ""}`}
                onClick={() => setSource("youtube")}
              >
                ▶ YouTube
              </button>
            </div>
          )}

          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:16 }}>
            <div style={{ flex:1 }}>
              {/* Active source badge */}
              <span className={`video-source-badge ${source === "drive" ? "badge-drive" : "badge-youtube"}`}>
                {source === "drive" ? "🗂 Google Drive" : "▶ YouTube"}
              </span>
              <span style={{ marginLeft:10, background:"rgba(29,78,216,0.15)", color:"#93C5FD",
                fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:20,
                textTransform:"uppercase", letterSpacing:"0.1em" }}>
                {vlog.category}
              </span>
              <h2 style={{ color:"white", fontSize:20, fontWeight:700, margin:"12px 0 8px", lineHeight:1.3 }}>
                {vlog.title}
              </h2>
              <p style={{ color:"#9CA3AF", fontSize:13, lineHeight:1.7, margin:0 }}>{vlog.description}</p>
              <p style={{ color:"#6B7280", fontSize:12, marginTop:8 }}>{vlog.date}</p>
            </div>
            <button onClick={onClose} style={{
              background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)",
              color:"white", fontSize:18, cursor:"pointer", padding:"8px 14px",
              borderRadius:10, flexShrink:0, transition:"background 0.2s"
            }}
              onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.18)"}
              onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.08)"}
            >✕</button>
          </div>
        </div>
      </div>
    </div>
  );
}
