import React, { useState } from 'react';
import { Compass, Map, User, RotateCcw, GraduationCap } from 'lucide-react';
import { MascotAvatar } from './Mascot';
import { AudioController } from './AudioController';
import { soundEngine } from '../utils/soundEngine';

export const Header = ({
  appData,
  onNavigate,
  onUpdateSettings,
  onReset
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleNav = (page) => {
    soundEngine.playClick();
    onNavigate(page);
  };

  const handleConfirmReset = () => {
    soundEngine.playClick();
    setShowResetConfirm(false);
    onReset();
  };

  return (
    <>
      <header className="header-bar">
        <div className="header-inner">
          {/* Brand */}
          <div className="brand-badge" onClick={() => handleNav('home')}>
            <div className="brand-icon-box">
              <Compass size={24} />
            </div>
            <div className="brand-text">
              <h1 className="font-heading">ANGLE ADVENTURE</h1>
              <p>Petualangan Dunia Sudut • Kelas 4 SD</p>
            </div>
          </div>

          {/* User Status & Action Buttons */}
          <div className="header-actions">
            {appData.studentName ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#f1f5f9',
                  padding: '4px 10px',
                  borderRadius: 9999,
                  border: '1px solid #cbd5e1'
                }}
              >
                <MascotAvatar character={appData.companion} size={28} />
                <div style={{ lineHeight: 1.2 }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', maxWidth: 90, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {appData.studentName}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#0d9488', fontWeight: 800 }}>
                    ⭐ {appData.score} Pts
                  </span>
                </div>
              </div>
            ) : null}

            {/* Mission Map shortcut */}
            {appData.studentName && (
              <button
                onClick={() => handleNav('mission-map')}
                className="btn btn-sm btn-secondary"
                title="Buka Peta Misi"
              >
                <Map size={16} />
                <span className="hidden sm:inline" style={{ display: 'none' }}>Peta</span>
              </button>
            )}

            {/* Audio Settings */}
            <AudioController
              audioSettings={appData.audioSettings}
              onUpdateSettings={onUpdateSettings}
            />

            {/* Teacher Mode */}
            <button
              onClick={() => handleNav('teacher')}
              className="btn btn-icon btn-outline"
              title="Menu Guru & RPP"
            >
              <GraduationCap size={18} />
            </button>

            {/* Reset Button */}
            {appData.studentName && (
              <button
                onClick={() => {
                  soundEngine.playClick();
                  setShowResetConfirm(true);
                }}
                className="btn btn-icon btn-outline"
                title="Reset Ulang Petualangan"
                style={{ color: '#ef4444', borderColor: '#fca5a5' }}
              >
                <RotateCcw size={16} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Confirmation Modal */}
      {showResetConfirm && (
        <div className="modal-overlay" onClick={() => setShowResetConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 400, textAlign: 'center' }}>
            <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: 10 }}>🔄</span>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', marginBottom: 10 }}>
              Ulangi Petualangan dari Awal?
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: 20 }}>
              Skor, kristal sudut, dan badge yang sudah dikumpulkan akan direset ke awal. Yakin ingin memulai kembali?
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="btn btn-outline"
                style={{ flex: 1 }}
              >
                Batal
              </button>
              <button
                onClick={handleConfirmReset}
                className="btn btn-primary"
                style={{ flex: 1, background: '#ef4444', borderColor: '#b91c1c' }}
              >
                Ya, Reset!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
