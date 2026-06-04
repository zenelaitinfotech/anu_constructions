import React, { useState, useEffect } from "react";

export default function Hero() {
  const phrases = [
    "Individual Houses.",
    "Luxury Villas.",
    "Apartment Complexes.",
    "Commercial Plazas.",
    "Modern Renovations."
  ];
  const [currentText, setCurrentText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const fullPhrase = phrases[phraseIndex];
      if (!isDeleting) {
        setCurrentText(fullPhrase.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullPhrase) {
          setTypingSpeed(2000); // Hold phrase
          setIsDeleting(true);
        }
      } else {
        setCurrentText(fullPhrase.substring(0, currentText.length - 1));
        setTypingSpeed(55);

        if (currentText === "") {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
          setTypingSpeed(500); // Pause before next phrase
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex, typingSpeed]);

  return (
    <section style={{ position:"relative", height:"100vh", minHeight:600, overflow:"hidden" }}>
      {/* Background Video */}
      <div style={{ position:"absolute", inset:0 }}>
        <video 
          src="/hero_video.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          style={{ width:"100%", height:"100%", objectFit:"cover" }}
        />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg,rgba(17,24,39,0.8) 0%,rgba(17,24,39,0.4) 50%,rgba(17,24,39,0.2) 100%)" }} />
      </div>

      <div style={{ position:"relative", zIndex:2, height:"100%", display:"flex", alignItems:"center" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0 3rem", width:"100%" }}>
          <p style={{ color:"#93C5FD", fontSize:12, letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:700, marginBottom:16 }} className="animate-fade-in-up">
            ACTIVE CARING | TEAM WORK | INTEGRITY | COMMITMENT
          </p>
          <h1 style={{ color:"white", fontSize:"clamp(2.5rem,6.5vw,5rem)", fontWeight:300, lineHeight:1.1, margin:"0 0 2rem", maxWidth:900 }} className="animate-fade-in-up stagger-1">
            Making a{" "}
            <span style={{ fontWeight:800, fontStyle:"italic", position:"relative", display:"inline-block" }}>
              Difference
              <span style={{ position:"absolute", bottom:-4, left:0, right:0, height:4, background:"#EF4444", borderRadius:2 }} />
            </span>
            <br />
            <span style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)", fontWeight: 300, color: "#E0F2FE", marginTop: 12, display: "block" }}>
              Building <span style={{ fontWeight: 800, borderRight: "4px solid #EF4444", paddingRight: 6, color: "#60A5FA" }}>{currentText}</span>
            </span>
          </h1>
          <button style={{ background:"none", border:"none", cursor:"pointer", color:"white", fontSize:13, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", display:"flex", alignItems:"center", gap:12, marginTop:32, padding:0, transition:"gap 0.3s" }}
            className="animate-fade-in-up stagger-2"
            onMouseEnter={e=>{e.currentTarget.style.gap="20px"}} onMouseLeave={e=>{e.currentTarget.style.gap="12px"}}>
            WHAT DO YOU WANT TO BUILD?
            <span style={{ color:"#60A5FA", fontSize:20 }}>→</span>
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position:"absolute", left:48, bottom:100, zIndex:3, display:"flex", flexDirection:"column", alignItems:"center", gap:8, opacity:0.5 }}>
        <span style={{ color:"white", fontSize:10, letterSpacing:"0.2em", textTransform:"uppercase", writingMode:"vertical-rl" }}>Scroll</span>
        <div style={{ width:1, height:48, background:"rgba(255,255,255,0.4)" }} />
      </div>
    </section>
  );
}
