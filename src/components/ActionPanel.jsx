import React from 'react';

export default function ActionPanel({ canAdminister, requiresVerification, onAdminister, onOverride }) {
  const handleMainClick = (e) => {
    if (requiresVerification) {
      if (e.shiftKey) {
        onAdminister(true);
      } else {
        alert("SECURITY PROTOCOL: Hold SHIFT while clicking for High-Risk drugs.");
      }
    } else {
      onAdminister(false);
    }
  };

  return (
    <div className="action-container">
      <button 
        className={`btn-primary ${requiresVerification ? 'btn-verify' : ''}`}
        disabled={!canAdminister}
        onClick={handleMainClick}
      >
        {requiresVerification ? 'VERIFY & ADMINISTER (SHIFT + CLICK)' : 'ADMINISTER DOSE'}
      </button>
      
      <button className="btn-override" onClick={onOverride}>
        EMERGENCY OVERRIDE
      </button>
    </div>
  );
}