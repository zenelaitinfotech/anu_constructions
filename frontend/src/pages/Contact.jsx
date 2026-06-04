import React, { useState, useEffect, useRef } from "react";
import API_BASE from "../config/api";

// ==========================================
// SCROLL REVEAL COMPONENT (Alight Motion inspired ease)
// ==========================================
function ScrollReveal({ children, delay = 0, duration = 1.0, distance = '50px', direction = 'up' }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (visible) return 'translate(0, 0) scale(1)';
    switch (direction) {
      case 'up': return `translate(0, ${distance}) scale(0.96)`;
      case 'down': return `translate(0, -${distance}) scale(0.96)`;
      case 'left': return `translate(${distance}, 0) scale(0.96)`;
      case 'right': return `translate(-${distance}, 0) scale(0.96)`;
      default: return 'translate(0, 0)';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ==========================================
// 3D TILT CARD COMPONENT
// ==========================================
function Card3D({ children, style }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const tiltX = (yc - y) / 8; // degrees of tilt on X-axis
    const tiltY = (x - xc) / 8; // degrees of tilt on Y-axis
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: isHovered
          ? 'perspective(1000px) rotateY(360deg) scale3d(1.05, 1.05, 1.05)'
          : 'perspective(1000px) rotateY(0deg) scale3d(1, 1, 1)',
        transition: 'transform 1.4s cubic-bezier(0.58, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
      }}
    >
      <div style={{ transform: 'translateZ(25px)', transformStyle: 'preserve-3d', height: '100%' }}>
        {children}
      </div>
    </div>
  );
}

// ==========================================
// ANIMATED PREMIUM BUTTON
// ==========================================
function AnimatedButton({ onClick, children, disabled }) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => { setPressed(false); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
      style={{
        position: 'relative',
        background: '#1E40AF',
        borderRadius: '6px',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        outline: 'none',
        boxShadow: hovered ? '0 12px 25px rgba(29, 78, 216, 0.45)' : '0 6px 10px rgba(29, 78, 216, 0.2)',
        transition: 'all 0.15s ease',
        display: 'inline-block',
        overflow: 'hidden'
      }}
    >
      <style>{`
        @keyframes lighterFlash {
          0% { left: -100%; }
          100% { left: 150%; }
        }
      `}</style>

      {/* 3D depth edge */}
      <span style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '6px',
        background: '#172554',
      }} />

      {/* Front click layer */}
      <span style={{
        display: 'block',
        padding: '14px 28px',
        borderRadius: '6px',
        background: pressed ? '#2563EB' : '#1D4ED8',
        color: 'white',
        fontSize: '13px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        transform: pressed ? 'translateY(2px)' : hovered ? 'translateY(-4px)' : 'translateY(-2px)',
        transition: 'transform 0.15s cubic-bezier(.3, 1, 0.2, 1)',
        position: 'relative',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        overflow: 'hidden'
      }}>
        {children}

        {/* Lighter flash animation sheen */}
        <span style={{
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '50%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
          transform: 'skewX(-30deg)',
          animation: hovered ? 'lighterFlash 1.2s infinite' : 'none'
        }} />
      </span>
    </button>
  );
}

// ==========================================
// CONTACT COMPONENT
// ==========================================
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", type: "General Inquiry", message: "" });
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !form.email.includes("@")) e.email = "Valid email is required";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setIsSending(true);

    fetch(`${API_BASE}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (res.ok) {
          setSent(true);
        } else {
          alert("Failed to submit inquiry. Please try again.");
        }
      })
      .catch(err => {
        console.error(err);
        alert("Failed to connect to the backend server.");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <>
      <section style={{
        background: "linear-gradient(-45deg, #111827, #1E3A8A, #0F172A, #1D4ED8)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 10s ease infinite",
        padding: "8rem 0 5rem",
        overflow: "hidden"
      }}>
        <style>{`
          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>

          {/* Info Side */}
          <div>
            <ScrollReveal direction="right" delay={0.1}>
              <p style={{ color: "#93C5FD", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>Get In Touch</p>
              <h1 style={{ color: "white", fontSize: 52, fontWeight: 300, margin: "0 0 16px" }}>Contact <strong style={{ fontWeight: 800 }}>Us</strong></h1>
              <p style={{ color: "#9CA3AF", lineHeight: 1.9, marginBottom: 40 }}>Have a project in mind? We'd love to discuss how Anu Building Constructions can help bring your vision to life.</p>
            </ScrollReveal>

            <div style={{ display: "grid", gap: 28 }}>
              {[
                ["📍", "Headquarters", "375 Hudson Street, 6th Floor, New York, NY 10014"],
                ["📞", "Phone", "(212) 229-6000"],
                ["📧", "Email", "info@Anu Building Constructionsconstruction.com"],
                ["🕐", "Business Hours", "Monday – Friday, 8:00 AM – 6:00 PM EST"]
              ].map(([icon, label, val], i) => (
                <ScrollReveal key={label} direction="right" delay={0.2 + i * 0.1}>
                  <div style={{ display: "flex", gap: 16 }}>
                    <span style={{ fontSize: 24, flexShrink: 0 }}>{icon}</span>
                    <div>
                      <p style={{ color: "#6B7280", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{label}</p>
                      <p style={{ color: "#E5E7EB", fontSize: 14 }}>{val}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <ScrollReveal direction="left" delay={0.2}>
            <div style={{ background: "white", padding: "2.5rem", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
              {isSending ? (
                <div style={{
                  textAlign: "center",
                  padding: "4rem 1rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "300px",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  <style>{`
                    @keyframes sendFly {
                      0% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 1; }
                      15% { transform: translate(-20px, 20px) scale(0.9) rotate(-15deg); opacity: 1; }
                      100% { transform: translate(450px, -450px) scale(0.2) rotate(45deg); opacity: 0; }
                    }
                  `}</style>

                  {/* Rocket Element */}
                  <div style={{
                    fontSize: 80,
                    animation: "sendFly 1.8s cubic-bezier(0.25, 1, 0.5, 1) infinite",
                    display: "inline-block",
                    zIndex: 10
                  }}>
                    🚀
                  </div>

                  <h3 style={{ fontSize: 22, fontWeight: 700, color: "#111827", marginTop: 24, zIndex: 10 }}>Sending Message...</h3>
                  <p style={{ color: "#6B7280", marginTop: 8, zIndex: 10 }}>Your inquiry is launching to our headquarters!</p>
                </div>
              ) : sent ? (
                <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                  <div style={{ fontSize: 64, marginBottom: 16, animation: "bounce 1.5s infinite" }}>✅</div>
                  <h3 style={{ fontSize: 24, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Message Sent!</h3>
                  <p style={{ color: "#6B7280", marginBottom: 24 }}>Thank you for reaching out. A Anu Building Constructions representative will be in touch within 1-2 business days.</p>
                  <AnimatedButton onClick={() => { setSent(false); setForm({ name: "", email: "", company: "", phone: "", type: "General Inquiry", message: "" }); }}>
                    Send Another Message
                  </AnimatedButton>
                </div>
              ) : (
                <>
                  <h2 style={{ fontSize: 24, fontWeight: 700, color: "#111827", marginBottom: 24 }}>Send Us a Message</h2>
                  <div style={{ display: "grid", gap: 16 }}>
                    {[["name", "Full Name *", "text"], ["email", "Email Address *", "email"], ["company", "Company", "text"], ["phone", "Phone Number", "tel"]].map(([key, ph, type]) => (
                      <div key={key}>
                        <input
                          type={type}
                          placeholder={ph}
                          value={form[key]}
                          onChange={e => { setForm({ ...form, [key]: e.target.value }); setErrors({ ...errors, [key]: "" }); }}
                          style={{ width: "100%", border: `1px solid ${errors[key] ? "#EF4444" : "#D1D5DB"}`, padding: "12px 16px", fontSize: 14, outline: "none", boxSizing: "border-box", transition: "all 0.3s" }}
                          onFocus={e => { e.target.style.borderColor = "#1D4ED8"; e.target.style.boxShadow = "0 0 10px rgba(29,78,216,0.15)"; }}
                          onBlur={e => { e.target.style.borderColor = errors[key] ? "#EF4444" : "#D1D5DB"; e.target.style.boxShadow = "none"; }}
                        />
                        {errors[key] && <p style={{ color: "#EF4444", fontSize: 12, marginTop: 4 }}>{errors[key]}</p>}
                      </div>
                    ))}
                    <select
                      value={form.type}
                      onChange={e => setForm({ ...form, type: e.target.value })}
                      style={{ border: "1px solid #D1D5DB", padding: "12px 16px", fontSize: 14, outline: "none", background: "white", transition: "all 0.3s" }}
                      onFocus={e => { e.target.style.borderColor = "#1D4ED8"; e.target.style.boxShadow = "0 0 10px rgba(29,78,216,0.15)"; }}
                      onBlur={e => { e.target.style.borderColor = "#D1D5DB"; e.target.style.boxShadow = "none"; }}
                    >
                      {["General Inquiry", "Project Inquiry", "Subcontractor Registration", "Career Inquiry", "Media Inquiry", "Other"].map(o => <option key={o}>{o}</option>)}
                    </select>
                    <div>
                      <textarea
                        placeholder="Message *"
                        rows={5}
                        value={form.message}
                        onChange={e => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: "" }); }}
                        style={{ width: "100%", border: `1px solid ${errors.message ? "#EF4444" : "#D1D5DB"}`, padding: "12px 16px", fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box", transition: "all 0.3s", fontFamily: "inherit" }}
                        onFocus={e => { e.target.style.borderColor = "#1D4ED8"; e.target.style.boxShadow = "0 0 10px rgba(29,78,216,0.15)"; }}
                        onBlur={e => { e.target.style.borderColor = errors.message ? "#EF4444" : "#D1D5DB"; e.target.style.boxShadow = "none"; }}
                      />
                      {errors.message && <p style={{ color: "#EF4444", fontSize: 12, marginTop: 4 }}>{errors.message}</p>}
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <AnimatedButton onClick={handleSubmit}>
                        Submit Inquiry →
                      </AnimatedButton>
                    </div>
                  </div>
                </>
              )}
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ background: "#F3F4F6", padding: "5rem 0", overflow: "hidden" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 2rem" }}>

          <ScrollReveal direction="up">
            <h2 style={{ fontSize: 32, fontWeight: 700, color: "#111827", marginBottom: 8 }}>Client Testimonials</h2>
            <p style={{ color: "#6B7280", marginBottom: 40 }}>Hover over the cards to rotate them and read what our clients say about us.</p>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {[
              {
                name: "Johnathan Miller",
                role: "VP of Operations, Summit Commercial",
                quote: "The team at Anu Building Constructions demonstrated exceptional commitment to quality. Their lean construction methods kept our office tower project strictly on track.",
                rating: "⭐⭐⭐⭐⭐",
                project: "Summit Office Tower"
              },
              {
                name: "Dr. Aris Vance",
                role: "Facilities Director, Metro Medical Center",
                quote: "Delivering a complex trauma facility requires absolute precision. Their preconstruction phase was transparent and saved us millions in early coordination.",
                rating: "⭐⭐⭐⭐⭐",
                project: "Metro Medical Center"
              },
              {
                name: "Linda Henderson",
                role: "Provost, Centennial University",
                quote: "Their virtual design modeling (VDC) allowed our science lab building to proceed smoothly, coordinating MEP lines without any field errors.",
                rating: "⭐⭐⭐⭐⭐",
                project: "Centennial Science Hall"
              },
              {
                name: "Captain David Vance",
                role: "Aviation Infrastructure Consultant",
                quote: "Aviation projects demand high security and zero operations interruption. Anu Building Constructions managed our terminal expansion seamlessly.",
                rating: "⭐⭐⭐⭐⭐",
                project: "Terminal B Expansion"
              }
            ].map((t, i) => (
              <ScrollReveal key={t.name} direction="up" delay={i * 0.1} duration={0.8}>
                <Card3D style={{ height: "100%" }}>
                  <div style={{
                    background: "white",
                    padding: "2rem 1.5rem",
                    borderTop: "4px solid #1D4ED8",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                    height: "100%",
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}>
                    <div>
                      <div style={{ color: "#FBBF24", fontSize: 14, marginBottom: 12 }}>{t.rating}</div>
                      <p style={{ color: "#4B5563", fontSize: 14, lineHeight: 1.7, fontStyle: "italic", marginBottom: 20 }}>
                        "{t.quote}"
                      </p>
                    </div>
                    <div>
                      <h4 style={{ fontSize: 15, fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>{t.name}</h4>
                      <p style={{ color: "#6B7280", fontSize: 12, margin: "0 0 6px" }}>{t.role}</p>
                      <span style={{ color: "#1D4ED8", fontSize: 11, fontWeight: 600, background: "#EFF6FF", padding: "4px 8px", borderRadius: "4px" }}>
                        {t.project}
                      </span>
                    </div>
                  </div>
                </Card3D>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
