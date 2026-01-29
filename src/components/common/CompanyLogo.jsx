import React from 'react';

export default function CompanyLogo({ size = "md" }) {
  const sizes = {
    sm: { container: "w-0 h-0", circle: 8, stroke: 2 },
    md: { container: "w-12 h-12", circle: 10, stroke: 2.5 },
    lg: { container: "w-24 h-24", circle: 20, stroke: 4 }
  };
  
  const { container, circle, stroke } = sizes[size];
  
  return (
    <div className={`${container} relative flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Three circles in triangular formation */}
        <circle cx="50" cy="25" r={circle} fill="#10b981" /> {/* Top - teal/green */}
        <circle cx="25" cy="75" r={circle} fill="#f59e0b" /> {/* Bottom-left - orange */}
        <circle cx="75" cy="75" r={circle} fill="#a855f7" /> {/* Bottom-right - purple */}
        
        {/* Semi-transparent X in the center */}
        <line 
          x1="30" 
          y1="30" 
          x2="70" 
          y2="70" 
          stroke="rgba(148, 163, 184, 0.4)" 
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        <line 
          x1="70" 
          y1="30" 
          x2="30" 
          y2="70" 
          stroke="rgba(148, 163, 184, 0.4)" 
          strokeWidth={stroke}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}