import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Mic, Settings, X, Check } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const AudioController = ({ audioSettings, onUpdateSettings }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBgm = () => {
    const updated = { ...audioSettings, bgmEnabled: !audioSettings.bgmEnabled };
    soundEngine.setSettings(updated);
    onUpdateSettings(updated);
    soundEngine.playClick();
  };

  const toggleSfx = () => {
    const updated = { ...audioSettings, sfxEnabled: !audioSettings.sfxEnabled };
    soundEngine.setSettings(updated);
    onUpdateSettings(updated);
    if (updated.sfxEnabled) soundEngine.playClick();
  };

  const toggleVoice = () => {
    const updated = { ...audioSettings, voiceEnabled: !audioSettings.voiceEnabled };
    soundEngine.setSettings(updated);
    onUpdateSettings(updated);
    soundEngine.playClick();
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    const updated = { ...audioSettings, volume: vol };
    soundEngine.setSettings(updated);
    onUpdateSettings(updated);
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <button
          onClick={toggleBgm}
          className={`btn btn-icon ${audioSettings.bgmEnabled ? 'btn-outline' : 'btn-outline'}`}
          title={audioSettings.bgmEnabled ? 'Musik Aktif (Klik untuk Matikan)' : 'Musik Mati (Klik untuk Nyalakan)'}
          style={{
            borderColor: audioSettings.bgmEnabled ? '#0d9488' : '#cbd5e1',
            color: audioSettings.bgmEnabled ? '#0d9488' : '#94a3b8'
          }}
        >
          <Music size={18} />
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            setIsOpen(true);
          }}
          className="btn btn-icon btn-outline"
          title="Pengaturan Suara & Audio"
        >
          <Settings size={18} />
        </button>
      </div>

      {/* Modal Settings */}
      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 420 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: '1.4rem' }}>🎵</span>
                <h3 className="font-heading" style={{ fontSize: '1.25rem' }}>Pengaturan Audio</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-icon btn-outline"
                style={{ width: 32, height: 32 }}
              >
                <X size={16} />
              </button>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: 18 }}>
              Sesuaikan musik latar petualangan, efek suara tombol/kuis, dan suara pendamping belajar:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* BGM Toggle */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '12px 16px', borderRadius: 14, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Music size={20} className="text-teal-600" />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem' }}>Musik Latar (BGM)</strong>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Melodi petualangan marimba</span>
                  </div>
                </div>
                <button
                  onClick={toggleBgm}
                  className={`btn btn-sm ${audioSettings.bgmEnabled ? 'btn-primary' : 'btn-outline'}`}
                >
                  {audioSettings.bgmEnabled ? 'ON' : 'OFF'}
                </button>
              </div>

              {/* SFX Toggle */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '12px 16px', borderRadius: 14, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Volume2 size={20} className="text-sky-600" />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem' }}>Efek Suara (SFX)</strong>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Dentang jawaban benar/salah & klik</span>
                  </div>
                </div>
                <button
                  onClick={toggleSfx}
                  className={`btn btn-sm ${audioSettings.sfxEnabled ? 'btn-primary' : 'btn-outline'}`}
                >
                  {audioSettings.sfxEnabled ? 'ON' : 'OFF'}
                </button>
              </div>

              {/* Voice Over Toggle */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '12px 16px', borderRadius: 14, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Mic size={20} className="text-amber-600" />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem' }}>Suara Narator (Voice)</strong>
                    <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Membacakan pesan Kiki & Lala</span>
                  </div>
                </div>
                <button
                  onClick={toggleVoice}
                  className={`btn btn-sm ${audioSettings.voiceEnabled ? 'btn-primary' : 'btn-outline'}`}
                >
                  {audioSettings.voiceEnabled ? 'ON' : 'OFF'}
                </button>
              </div>

              {/* Volume Slider */}
              <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: 14, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Tingkat Volume:</span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0d9488' }}>
                    {Math.round(audioSettings.volume * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={audioSettings.volume}
                  onChange={handleVolumeChange}
                  style={{ width: '100%', cursor: 'pointer', accentColor: '#0d9488' }}
                />
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: 20 }}
            >
              <Check size={18} />
              Simpan & Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
};
