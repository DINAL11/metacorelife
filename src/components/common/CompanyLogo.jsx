import React from 'react';

export default function CompanyLogo({ size = "md" }) {
  const sizes = {
    sm: { container: "w-8 h-8", circle: 3 },
    md: { container: "w-12 h-12", circle: 4 },
    lg: { container: "w-24 h-24", circle: 8 }
  };
  
  const { container, circle } = sizes[size];
  
  return (
    <div className={`${container} relative flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="20" r={circle} fill="#10b981" />
        <circle cx="25" cy="70" r={circle} fill="#f59e0b" />
        <circle cx="75" cy="70" r={circle} fill="#a855f7" />
        <line x1="50" y1="20" x2="25" y2="70" stroke="#cbd5e1" strokeWidth="2" />
        <line x1="50" y1="20" x2="75" y2="70" stroke="#cbd5e1" strokeWidth="2" />
        <line x1="25" y1="70" x2="75" y2="70" stroke="#cbd5e1" strokeWidth="2" />
      </svg>
    </div>
  );
}