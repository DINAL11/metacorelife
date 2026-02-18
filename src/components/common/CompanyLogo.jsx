import React, { useState, useEffect } from 'react';

const LOGO_SRC = typeof import.meta.env?.BASE_URL === 'string'
  ? `${import.meta.env.BASE_URL}logo.png`
  : '/logo.png';

/**
 * CompanyLogo displays the MetaCoreLife logo.
 * Place logo.png in the public folder. If missing, falls back to the default SVG.
 */
export default function CompanyLogo({ size = "md" }) {
  const [imgError, setImgError] = useState(false);
  const sizes = {
    sm: { container: "w-8 h-8", circle: 8, stroke: 2 },
    md: { container: "w-12 h-12", circle: 10, stroke: 2.5 },
    lg: { container: "w-24 h-24", circle: 20, stroke: 4 }
  };

  useEffect(() => {
    setImgError(false);
  }, []);

  const { container, circle, stroke } = sizes[size];

  if (!imgError) {
    return (
      <div className={`${container} relative flex items-center justify-center shrink-0`}>
        <img
          src={LOGO_SRC}
          alt="MetaCoreLife"
          className="w-full h-full object-contain"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  // Fallback SVG when logo.png is not found
  return (
    <div className={`${container} relative flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="25" r={circle} fill="#10b981" />
        <circle cx="25" cy="75" r={circle} fill="#f59e0b" />
        <circle cx="75" cy="75" r={circle} fill="#a855f7" />
        <line x1="30" y1="30" x2="70" y2="70" stroke="rgba(148, 163, 184, 0.4)" strokeWidth={stroke} strokeLinecap="round" />
        <line x1="70" y1="30" x2="30" y2="70" stroke="rgba(148, 163, 184, 0.4)" strokeWidth={stroke} strokeLinecap="round" />
      </svg>
    </div>
  );
}