import React, { useState } from 'react';

export default function Button3D({ children, onClick, style }) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
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
        boxShadow: hovered ? '0 12px 20px rgba(29, 78, 216, 0.4)' : '0 6px 10px rgba(29, 78, 216, 0.2)',
        transition: 'all 0.15s ease',
        ...style
      }}
    >
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
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {children}
      </span>
    </button>
  );
}
