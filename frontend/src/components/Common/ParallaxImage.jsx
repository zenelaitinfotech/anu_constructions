import React, { useRef, useState, useEffect } from 'react';

export default function ParallaxImage({ src, alt, style, height = '300px' }) {
  const containerRef = useRef(null);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate element distance from center of viewport
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distance = elementCenter - viewportCenter;
      
      // Subtle scroll translation movement
      const offset = (distance / viewportHeight) * -35; 
      setTranslateY(offset);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        height, 
        overflow: 'hidden', 
        position: 'relative', 
        borderRadius: '4px',
        ...style 
      }}
    >
      <img 
        src={src} 
        alt={alt} 
        style={{ 
          width: '100%', 
          height: '160%', 
          objectFit: 'cover',
          position: 'absolute',
          top: '-30%',
          left: 0,
          transform: `translateY(${translateY}px)`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      />
    </div>
  );
}
