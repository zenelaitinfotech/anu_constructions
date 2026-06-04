import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import OurCompany from './pages/OurCompany';
import Vlog from './pages/Vlog';

// Our Company pages
import AboutUs from './pages/company/AboutUs';
import Leadership from './pages/company/Leadership';
import MarketSectors from './pages/company/MarketSectors';
import Foundation from './pages/company/Foundation';
import Locations from './pages/company/Locations';

// Our Culture pages
import ESGStrategy from './pages/culture/ESGStrategy';
import Community from './pages/culture/Community';
import Diversity from './pages/culture/Diversity';
import Safety from './pages/culture/Safety';
import Innovation from './pages/culture/Innovation';

// Our Services pages
import Preconstruction from './pages/services/Preconstruction';
import ConstructionManagement from './pages/services/ConstructionManagement';
import ProjectManagement from './pages/services/ProjectManagement';
import LeanConstruction from './pages/services/LeanConstruction';

export default function App() {
  const [page, setPage] = useState("home");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const setPageAndScroll = (p) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setPage(p);
      window.scrollTo({ top: 0 });
      setIsTransitioning(false);
    }, 280);
  };

  const pages = {
    home: <Home setPage={setPageAndScroll} />,
    about: <About />,
    services: <Services />,
    projects: <Projects />,
    news: <Blog />,
    careers: <Careers />,
    contact: <Contact />,
    admin: <AdminDashboard />,
    "our-company": <OurCompany setPage={setPageAndScroll} />,
    vlog: <Vlog />,

    // Our Company
    "about-us": <AboutUs />,
    "leadership": <Leadership />,
    "market-sectors": <MarketSectors />,
    "foundation": <Foundation />,
    "locations": <Locations />,

    // Our Culture
    "esg-strategy": <ESGStrategy />,
    "community": <Community />,
    "diversity": <Diversity />,
    "safety": <Safety />,
    "innovation": <Innovation />,

    // Our Services
    "preconstruction": <Preconstruction />,
    "construction-management": <ConstructionManagement />,
    "project-management": <ProjectManagement />,
    "lean-construction": <LeanConstruction />,
  };

  React.useEffect(() => {
    // Check if device is mobile or touch based
    const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

    // 1. Scroll & progress tracker
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
      const progressBar = document.querySelector('.scroll-progress-bar');
      if (progressBar) progressBar.style.width = `${progress}%`;
      document.documentElement.style.setProperty('--scroll-y', window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let dotX = 0, dotY = 0;
    let animId;
    let timer;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX + window.scrollX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY + window.scrollY}px`);
    };

    const updateCursor = () => {
      const dot = document.querySelector('.custom-cursor-dot');
      const ringNode = document.querySelector('.custom-cursor-ring');
      
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      dotX += (mouseX - dotX) * 0.4;
      dotY += (mouseY - dotY) * 0.4;

      if (ringNode) {
        ringNode.style.transform = `translate3d(calc(${ringX}px - 50%), calc(${ringY}px - 50%), 0)`;
      }
      if (dot) {
        dot.style.transform = `translate3d(calc(${dotX}px - 50%), calc(${dotY}px - 50%), 0)`;
      }
      animId = requestAnimationFrame(updateCursor);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;
      const isInteractive = target.closest('a, button, select, input, textarea, .flip-card, [style*="cursor: pointer"], [onclick]');
      if (isInteractive) {
        document.body.classList.add('cursor-hovering');
      } else {
        document.body.classList.remove('cursor-hovering');
      }
    };

    const handleTilt = (e) => {
      const tiltEl = e.target.closest('.interactive-3d-tilt');
      if (!tiltEl) return;
      const rect = tiltEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const rx = -((y / rect.height) - 0.5) * 24;
      const ry = ((x / rect.width) - 0.5) * 24;
      
      tiltEl.style.setProperty('--rx', rx.toFixed(2));
      tiltEl.style.setProperty('--ry', ry.toFixed(2));
      tiltEl.style.setProperty('--tz', '35');
    };

    const handleTiltLeave = (e) => {
      const tiltEl = e.target.closest('.interactive-3d-tilt');
      if (!tiltEl) return;
      tiltEl.style.setProperty('--rx', '0');
      tiltEl.style.setProperty('--ry', '0');
      tiltEl.style.setProperty('--tz', '0');
    };

    // Only set up heavy mouse tracking & tilt controls for desktop
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      animId = requestAnimationFrame(updateCursor);
      window.addEventListener('mouseover', handleMouseOver, { passive: true });

      const updateTiltElements = () => {
        const cards = document.querySelectorAll(
          'section div[style*="grid"] > div, .flip-card, section div[style*="grid-template-columns"] > div, section div[style*="display: flex"] > div:not([style*="width: 100%"]), section div[style*="display:flex"] > div:not([style*="width: 100%"])'
        );
        cards.forEach(card => {
          if (card.parentElement && card.parentElement.closest('.interactive-3d-tilt')) {
            return; // Skip nested children
          }
          if (!card.classList.contains('interactive-3d-tilt')) {
            card.classList.add('interactive-3d-tilt');
          }
        });
      };
      timer = setTimeout(updateTiltElements, 300);

      window.addEventListener('mousemove', handleTilt);
      window.addEventListener('mouseout', handleTiltLeave);
    }

    // 5. Cinematic Scroll Reveal Observer (Enabled on both mobile & desktop)
    const sections = document.querySelectorAll('section, footer, header, .to-be-scaled');
    sections.forEach(sec => {
      if (!sec.classList.contains('cinematic-3d-reveal')) {
        sec.classList.add('cinematic-3d-reveal');
      }
    });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: "0px 0px -50px 0px"
    });

    sections.forEach(sec => revealObserver.observe(sec));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseover', handleMouseOver);
        window.removeEventListener('mousemove', handleTilt);
        window.removeEventListener('mouseout', handleTiltLeave);
        cancelAnimationFrame(animId);
        clearTimeout(timer);
      }
      revealObserver.disconnect();
    };
  }, [page]);

  return (
    <div style={{ minHeight:"100vh", fontFamily:"'Helvetica Neue',Arial,sans-serif", background:"white" }}>
      {/* 3D Scroll Progress Bar */}
      <div className="scroll-progress-bar"></div>

      {/* Modern custom cursor */}
      <div className="custom-cursor-dot" style={{ transform: 'translate3d(-50%, -50%, 0)' }}></div>
      <div className="custom-cursor-ring" style={{ transform: 'translate3d(-50%, -50%, 0)' }}></div>

      {/* Cinematic Ambient Grid Background Layer */}
      <div className="cinematic-bg-overlay">
        <div className="cyber-grid"></div>
        <div className="cursor-glow"></div>
      </div>

      <style>{`
        html { scroll-behavior: smooth; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { overflow-x: hidden; }
        img { display: block; }
        button { font-family: inherit; }
        input, select, textarea { font-family: inherit; }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Global transitions for maximum smoothness */
        button, a, select, input, textarea {
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .animate-fade-in-up {
          animation: fadeInUp 1.2s cubic-bezier(0.25, 1, 0.5, 1) both;
        }

        .animate-slide-in-left {
          animation: slideInLeft 1.2s cubic-bezier(0.25, 1, 0.5, 1) both;
        }

        .animate-slide-in-right {
          animation: slideInRight 1.2s cubic-bezier(0.25, 1, 0.5, 1) both;
        }

        .stagger-1 { animation-delay: 0.05s; }
        .stagger-2 { animation-delay: 0.1s; }
        .stagger-3 { animation-delay: 0.15s; }
        .stagger-4 { animation-delay: 0.2s; }
        .stagger-5 { animation-delay: 0.25s; }
        .stagger-6 { animation-delay: 0.35s; }
        .stagger-7 { animation-delay: 0.45s; }
        .stagger-8 { animation-delay: 0.55s; }
        .stagger-9 { animation-delay: 0.65s; }
        .stagger-10 { animation-delay: 0.75s; }

        /* Fade Animation */
        @keyframes fadeInOnly {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade {
          animation: fadeInOnly 1.2s cubic-bezier(0.25, 1, 0.5, 1) both;
        }

        /* Scale / Zoom Animation */
        @keyframes scaleZoomIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-zoom {
          animation: scaleZoomIn 1.2s cubic-bezier(0.25, 1, 0.5, 1) both;
        }

        /* Infinite Loader Spinner */
        @keyframes rotateSpinner {
          to { transform: rotate(360deg); }
        }
        .animate-spin-infinite {
          animation: rotateSpinner 1s linear infinite;
        }

        /* 3D Flip Card System */
        .flip-card {
          background-color: transparent;
          width: 100%;
          height: 420px;
          perspective: 1000px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
        }
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 12px;
          border: 1px solid #E5E7EB;
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        }
        .flip-card-front {
          background-color: white;
          color: black;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 2rem;
        }
        .flip-card-back {
          background-color: #1D4ED8;
          color: white;
          transform: rotateY(180deg);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }

        .to-be-scaled {
          overflow: hidden;
        }
        .to-be-scaled:hover img, .to-be-scaled img {
            -webkit-transition: -webkit-transform .5s ease-in-out;
            transition: -webkit-transform .5s ease-in-out;
            -o-transition: transform .5s ease-in-out;
            transition: transform .5s ease-in-out;
            transition: transform .5s ease-in-out, -webkit-transform .5s ease-in-out;
        }
        .to-be-scaled:hover img {
            -webkit-transform: scale(1.1);
            transform: scale(1.1);
        }
        @media(max-width:768px) {
          /* Stack all inline styled grids */
          div[style*="grid-template-columns"] { 
            grid-template-columns: 1fr !important; 
            gap: 24px !important; 
          }
          section > div[style*="grid-template-columns"] { 
            grid-template-columns: 1fr !important; 
            gap: 32px !important; 
          }
          
          /* Handle elements with side-by-side flex layout */
          div[style*="display: flex"], div[style*="display:flex"] { 
            flex-wrap: wrap !important;
          }
          
          /* Layout section sizing */
          section { 
            padding: 3rem 0 !important; 
          }
          section > div { 
            padding: 0 1.25rem !important; 
          }
          
          /* Typography scaling */
          h1 { font-size: clamp(2rem, 8vw, 3rem) !important; }
          h2 { font-size: clamp(1.6rem, 6vw, 2.2rem) !important; }
          
          /* Footer layout */
          footer > div { 
            grid-template-columns: 1fr !important; 
            gap: 32px !important; 
          }
        }
      `}</style>
      <Navbar setPage={setPageAndScroll} />
      <main style={{ 
        paddingTop: page === "home" ? 0 : 68,
        opacity: isTransitioning ? 0 : 1,
        transform: isTransitioning ? 'translateY(12px)' : 'translateY(0)',
        transition: 'opacity 0.28s cubic-bezier(0.25, 1, 0.5, 1), transform 0.28s cubic-bezier(0.25, 1, 0.5, 1)'
      }}>
        {pages[page] || pages.home}
      </main>
      <Footer setPage={setPageAndScroll} />
    </div>
  );
}
