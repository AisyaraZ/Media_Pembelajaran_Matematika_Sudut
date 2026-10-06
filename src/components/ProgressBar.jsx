import React from 'react';

export const ProgressBar = ({ currentStep, totalSteps = 6, label = 'Progres Petualangan' }) => {
  const percent = Math.min(100, Math.round((currentStep / totalSteps) * 100));

  return (
    <div style={{ width: '100%', marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f766e', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {label}
        </span>
        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0d9488' }}>
          {currentStep} / {totalSteps} ({percent}%)
        </span>
      </div>
      <div
        style={{
          width: '100%',
          height: 12,
          background: '#e2e8f0',
          borderRadius: 9999,
          overflow: 'hidden',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #0d9488, #0284c7)',
            borderRadius: 9999,
            transition: 'width 0.4s ease-in-out'
          }}
        />
      </div>
    </div>
  );
};
