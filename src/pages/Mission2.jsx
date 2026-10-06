import React, { useState } from 'react';
import { Compass, CheckCircle2, Info, Sparkles } from 'lucide-react';
import { MascotSpeech } from '../components/Mascot';
import { Navigation } from '../components/Navigation';
import { soundEngine } from '../utils/soundEngine';

export const Mission2 = ({ onCompleteMission, onBackToMap, companion = 'kiki' }) => {
  const [activePart, setActivePart] = useState('vertex'); // 'vertex', 'arm1', 'arm2', 'area'
  const [exploredParts, setExploredParts] = useState(['vertex']);

  const partsInfo = {
    vertex: {
      name: 'Titik Sudut (Vertex)',
      color: '#f43f5e',
      desc: 'Titik pangkal tempat bertemunya dua garis atau kaki sudut. Diberi nama dengan huruf kapital (misal: Titik B).'
    },
    arm1: {
      name: 'Kaki Sudut 1 (Sinar Garis BA)',
      color: '#0284c7',
      desc: 'Garis lurus pertama yang membentuk sudut. Membentang dari titik sudut menuju titik A.'
    },
    arm2: {
      name: 'Kaki Sudut 2 (Sinar Garis BC)',
      color: '#0d9488',
      desc: 'Garis lurus kedua yang membentuk sudut. Membentang dari titik sudut menuju titik C.'
    },
    area: {
      name: 'Daerah Sudut (Besar Sudut)',
      color: '#f59e0b',
      desc: 'Ruang atau bukaan yang diapit oleh kedua kaki sudut. Besar daerah inilah yang kita ukur dalam satuan derajat (°).'
    }
  };

  const handleSelectPart = (partKey) => {
    soundEngine.playClick();
    setActivePart(partKey);
    if (!exploredParts.includes(partKey)) {
      setExploredParts([...exploredParts, partKey]);
    }
  };

  const handleFinish = () => {
    soundEngine.playFanfare();
    onCompleteMission(2, 'angle-finder', 20);
  };

  const allExplored = ['vertex', 'arm1', 'arm2', 'area'].every(p => exploredParts.includes(p));

  return (
    <div style={{ maxWidth: 840, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: '1.8rem' }}>📐</span>
        <div>
          <h2 className="font-heading" style={{ fontSize: '1.45rem', color: '#0f172a' }}>
            Misi 2: Mengenal Bagian-Bagian Sudut
          </h2>
          <span style={{ fontSize: '0.8rem', color: '#0d9488', fontWeight: 700 }}>
            Wilayah Lembah Geometri • Titik, Kaki, dan Daerah Sudut
          </span>
        </div>
      </div>

      <MascotSpeech
        character={companion}
        name={companion === 'kiki' ? 'Kiki' : 'Lala'}
        pose={allExplored ? 'cheer' : 'point'}
        message="Klik setiap bagian pada diagram sudut di bawah! Ada Titik Sudut, Kaki Sudut, dan Daerah Sudut. Pelajari ketiganya untuk membuka Kristal Titik Temu!"
      />

      <div className="card" style={{ padding: '24px', marginTop: 16 }}>
        {/* Interactive Diagram */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <svg
            viewBox="0 0 340 220"
            style={{ width: '100%', maxWidth: 440, height: 'auto', background: '#f8fafc', borderRadius: 20, border: '2px solid #cbd5e1' }}
          >
            {/* Shaded Angle Area (Interior Arc) */}
            <path
              d="M 80 160 L 280 160 A 80 80 0 0 0 200 68 Z"
              fill={activePart === 'area' ? 'rgba(245, 158, 11, 0.45)' : 'rgba(245, 158, 11, 0.15)'}
              stroke="#f59e0b"
              strokeWidth={activePart === 'area' ? 3 : 1}
              style={{ cursor: 'pointer' }}
              onClick={() => handleSelectPart('area')}
            />
            <path
              d="M 130 160 A 50 50 0 0 0 115 110"
              fill="none"
              stroke="#b45309"
              strokeWidth="2.5"
            />
            <text x="140" y="130" fill="#b45309" fontSize="12" fontWeight="bold">Daerah Sudut</text>

            {/* Arm 1 (Base horizontal line) */}
            <line
              x1="80"
              y1="160"
              x2="290"
              y2="160"
              stroke={activePart === 'arm1' ? '#0284c7' : '#64748b'}
              strokeWidth={activePart === 'arm1' ? 6 : 4}
              strokeLinecap="round"
              style={{ cursor: 'pointer' }}
              onClick={() => handleSelectPart('arm1')}
            />
            {/* Arrowhead Arm 1 */}
            <polygon points="295,160 285,155 285,165" fill={activePart === 'arm1' ? '#0284c7' : '#64748b'} />
            <text x="260" y="180" fill="#0369a1" fontSize="11" fontWeight="bold">Kaki Sudut BC</text>

            {/* Arm 2 (Slanted line) */}
            <line
              x1="80"
              y1="160"
              x2="220"
              y2="45"
              stroke={activePart === 'arm2' ? '#0d9488' : '#64748b'}
              strokeWidth={activePart === 'arm2' ? 6 : 4}
              strokeLinecap="round"
              style={{ cursor: 'pointer' }}
              onClick={() => handleSelectPart('arm2')}
            />
            {/* Arrowhead Arm 2 */}
            <polygon points="225,40 212,47 220,55" fill={activePart === 'arm2' ? '#0d9488' : '#64748b'} />
            <text x="175" y="40" fill="#0f766e" fontSize="11" fontWeight="bold">Kaki Sudut BA</text>

            {/* Vertex Point (Titik Sudut B) */}
            <circle
              cx="80"
              cy="160"
              r={activePart === 'vertex' ? 10 : 7}
              fill="#f43f5e"
              stroke="white"
              strokeWidth="2.5"
              style={{ cursor: 'pointer' }}
              onClick={() => handleSelectPart('vertex')}
              className={activePart === 'vertex' ? 'animate-pulse-glow' : ''}
            />
            <text x="65" y="190" fill="#be123c" fontSize="12" fontWeight="bold">Titik Sudut B</text>
          </svg>
        </div>

        {/* Buttons to inspect each part */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10, marginBottom: 20 }}>
          {Object.entries(partsInfo).map(([key, info]) => {
            const isSelected = activePart === key;
            const isDone = exploredParts.includes(key);

            return (
              <button
                key={key}
                onClick={() => handleSelectPart(key)}
                className="btn btn-outline"
                style={{
                  padding: '10px',
                  borderColor: isSelected ? info.color : '#e2e8f0',
                  background: isSelected ? '#f8fafc' : 'white',
                  borderWidth: isSelected ? 2 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: isSelected ? info.color : '#334155' }}>
                  {info.name.split(' ')[0]}
                </span>
                {isDone && <CheckCircle2 size={16} className="text-emerald-500" />}
              </button>
            );
          })}
        </div>

        {/* Active Part Info Box */}
        <div
          style={{
            background: '#f8fafc',
            border: `2px solid ${partsInfo[activePart].color}`,
            borderRadius: 16,
            padding: '16px 20px',
            marginBottom: 16
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: partsInfo[activePart].color }} />
            <h4 className="font-heading" style={{ fontSize: '1.15rem', color: partsInfo[activePart].color, margin: 0 }}>
              {partsInfo[activePart].name}
            </h4>
          </div>
          <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.5 }}>
            {partsInfo[activePart].desc}
          </p>
        </div>

        {allExplored && (
          <div style={{ background: '#f0fdf4', padding: '12px 16px', borderRadius: 12, border: '1px solid #86efac', textAlign: 'center', marginTop: 10 }}>
            <p style={{ color: '#166534', fontWeight: 700, fontSize: '0.9rem' }}>
              🎉 Hebat! Kamu sudah mengeksplorasi semua bagian sudut. Klik Lanjut untuk mengambil kristal!
            </p>
          </div>
        )}
      </div>

      <Navigation
        onPrev={onBackToMap}
        prevLabel="Peta Misi"
        onNext={handleFinish}
        nextLabel="Klaim Kristal & Selesai Misi 2"
        disableNext={!allExplored}
        onMap={onBackToMap}
      />
    </div>
  );
};
