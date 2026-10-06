import React, { useState } from 'react';
import { RotateCw, Info, Compass } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const ProtractorTool = ({ targetAngle = null, onAngleChange = null, interactive = true }) => {
  const [angle, setAngle] = useState(targetAngle || 45);

  const getAngleCategory = (deg) => {
    if (deg < 90) return { name: 'Sudut Lancip', color: '#0284c7', desc: 'Kurang dari 90° (< 90°)' };
    if (deg === 90) return { name: 'Sudut Siku-Siku', color: '#0d9488', desc: 'Tepat 90° (= 90°)' };
    if (deg < 180) return { name: 'Sudut Tumpul', color: '#f59e0b', desc: 'Antara 90° dan 180° (> 90° & < 180°)' };
    return { name: 'Sudut Lurus', color: '#8b5cf6', desc: 'Tepat 180° (= 180°)' };
  };

  const currentCategory = getAngleCategory(angle);

  const handleSliderChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setAngle(val);
    if (onAngleChange) onAngleChange(val);
  };

  const handlePreset = (deg) => {
    soundEngine.playClick();
    setAngle(deg);
    if (onAngleChange) onAngleChange(deg);
  };

  // Coordinates for the protractor ray
  const radius = 130;
  const centerX = 160;
  const centerY = 160;
  const rad = ((180 - angle) * Math.PI) / 180;
  const rayX = centerX + radius * Math.cos(rad);
  const rayY = centerY - radius * Math.sin(rad);

  return (
    <div style={{ background: '#ffffff', borderRadius: 24, padding: '20px 16px', border: '2px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Compass size={22} className="text-teal-600" />
          <h4 className="font-heading" style={{ fontSize: '1.1rem', margin: 0 }}>Simulasi Busur Derajat Interaktif</h4>
        </div>
        <div
          style={{
            background: currentCategory.color,
            color: 'white',
            padding: '4px 12px',
            borderRadius: 9999,
            fontWeight: 800,
            fontSize: '0.85rem'
          }}
        >
          {angle}° ({currentCategory.name})
        </div>
      </div>

      {/* SVG Protractor Visualizer */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
        <svg
          viewBox="0 0 320 200"
          style={{ width: '100%', maxWidth: 420, height: 'auto', background: '#f8fafc', borderRadius: 16, border: '1px solid #cbd5e1' }}
        >
          {/* Protractor Semi-Circle Glass Background */}
          <path
            d="M 20 160 A 140 140 0 0 1 300 160 Z"
            fill="rgba(204, 251, 241, 0.4)"
            stroke="#0d9488"
            strokeWidth="3"
          />

          {/* Inner Arc */}
          <path
            d="M 60 160 A 100 100 0 0 1 260 160 Z"
            fill="none"
            stroke="#99f6e4"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Degree Tick Marks & Numbers */}
          {[0, 30, 45, 60, 90, 120, 135, 150, 180].map((deg) => {
            const radTick = ((180 - deg) * Math.PI) / 180;
            const x1 = centerX + 140 * Math.cos(radTick);
            const y1 = centerY - 140 * Math.sin(radTick);
            const x2 = centerX + 125 * Math.cos(radTick);
            const y2 = centerY - 125 * Math.sin(radTick);
            const tx = centerX + 112 * Math.cos(radTick);
            const ty = centerY - 112 * Math.sin(radTick);

            return (
              <g key={deg}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0f766e" strokeWidth={deg % 90 === 0 ? 3 : 1.5} />
                <text
                  x={tx}
                  y={ty + 4}
                  fontSize="9"
                  fontWeight={deg === 90 ? 'bold' : 'normal'}
                  fill="#0f766e"
                  textAnchor="middle"
                >
                  {deg}°
                </text>
              </g>
            );
          })}

          {/* Baseline (Garis Dasar) */}
          <line x1="20" y1="160" x2="300" y2="160" stroke="#0f172a" strokeWidth="3" />

          {/* Active Ray 1 (Base Ray at 0°) */}
          <line x1="160" y1="160" x2="300" y2="160" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />

          {/* Measured Angle Colored Wedge */}
          {angle > 0 && (
            <path
              d={`M 160 160 L 300 160 A 140 140 0 0 0 ${centerX + 140 * Math.cos(rad)} ${centerY - 140 * Math.sin(rad)} Z`}
              fill="rgba(13, 148, 136, 0.25)"
            />
          )}

          {/* Active Ray 2 (Rotatable Ray) */}
          <line
            x1="160"
            y1="160"
            x2={rayX}
            y2={rayY}
            stroke="#f43f5e"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Center Point (Titik Pusat Busur) */}
          <circle cx="160" cy="160" r="6" fill="#f43f5e" stroke="white" strokeWidth="2" />
          <circle cx="160" cy="160" r="1.5" fill="white" />

          {/* Angle Arc Indicator */}
          <path
            d={`M 200 160 A 40 40 0 0 0 ${centerX + 40 * Math.cos(rad)} ${centerY - 40 * Math.sin(rad)}`}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3"
          />
          <text x={centerX + 25} y={centerY - 12} fontSize="12" fontWeight="bold" fill="#b45309">
            {angle}°
          </text>
        </svg>
      </div>

      {/* Interactive Controls */}
      {interactive && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Geser untuk Mengubah Sudut:</span>
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0d9488' }}>{angle}°</span>
          </div>

          <input
            type="range"
            min="0"
            max="180"
            step="1"
            value={angle}
            onChange={handleSliderChange}
            style={{ width: '100%', accentColor: '#0d9488', cursor: 'pointer', height: 8 }}
          />

          {/* Quick Angle Presets */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', alignSelf: 'center', marginRight: 4 }}>Contoh Cepat:</span>
            {[
              { label: 'Lancip (45°)', deg: 45 },
              { label: 'Siku-Siku (90°)', deg: 90 },
              { label: 'Tumpul (120°)', deg: 120 },
              { label: 'Lurus (180°)', deg: 180 }
            ].map((p) => (
              <button
                key={p.deg}
                onClick={() => handlePreset(p.deg)}
                className={`btn btn-sm ${angle === p.deg ? 'btn-primary' : 'btn-outline'}`}
                style={{ padding: '4px 10px', fontSize: '0.78rem' }}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '10px 14px', marginTop: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#166534', fontSize: '0.86rem', fontWeight: 700 }}>
              <Info size={16} />
              <span>Cara Membaca Busur:</span>
            </div>
            <ol style={{ fontSize: '0.82rem', color: '#14532d', paddingLeft: 18, marginTop: 4, lineHeight: 1.4 }}>
              <li>Himpitkan titik pusat busur (merah) ke titik sudut.</li>
              <li>Sejajarkan garis dasar busur dengan salah satu kaki sudut (0°).</li>
              <li>Lihat angka derajat yang ditunjuk oleh kaki sudut kedua!</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};
