import React, { useState } from 'react';
import { ArrowRight, Sparkles, User, CheckCircle } from 'lucide-react';
import { MascotFullBody, MascotSpeech } from '../components/Mascot';
import { soundEngine } from '../utils/soundEngine';

export const NameInput = ({ onSubmitName, initialName = '', initialCompanion = 'kiki' }) => {
  const [name, setName] = useState(initialName);
  const [companion, setCompanion] = useState(initialCompanion);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Tuliskan namamu terlebih dahulu ya, Sahabat Cilik! 😊');
      soundEngine.playIncorrect();
      return;
    }
    if (trimmed.length < 2) {
      setError('Namamu minimal 2 huruf ya!');
      soundEngine.playIncorrect();
      return;
    }

    soundEngine.playCorrect();
    onSubmitName(trimmed, companion);
  };

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
      <MascotSpeech
        character={companion}
        name={companion === 'kiki' ? 'Kiki' : 'Lala'}
        pose="wave"
        message="Halo sahabat baru! Sebelum kita memulai petualangan di Dunia Sudut, perkenalkan dirimu dulu ya! Siapa namamu?"
      />

      <div className="card" style={{ padding: '32px 24px', marginTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 8 }}>
          <Sparkles size={22} className="text-amber-500" />
          <h2 className="font-heading" style={{ fontSize: '1.65rem', color: '#0f172a' }}>
            Siapa Nama Petualang Hebat Hari Ini?
          </h2>
        </div>
        <p style={{ fontSize: '0.92rem', color: '#64748b', marginBottom: 26 }}>
          Pilih teman belajarmu dan tuliskan nama untuk dicantumkan di Sertifikat Resmi!
        </p>

        <form onSubmit={handleSubmit}>
          {/* Companion Full Body Selector Cards */}
          <div style={{ marginBottom: 28, textAlign: 'left' }}>
            <label style={{ fontSize: '0.92rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 12 }}>
              Pilih Sahabat Teman Belajarmu:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              {/* Kiki Option Card */}
              <div
                onClick={() => {
                  soundEngine.playClick();
                  setCompanion('kiki');
                }}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '16px 14px',
                  borderRadius: 20,
                  cursor: 'pointer',
                  borderWidth: companion === 'kiki' ? 3 : 2,
                  borderColor: companion === 'kiki' ? '#0d9488' : '#e2e8f0',
                  background: companion === 'kiki' ? 'linear-gradient(145deg, #ffffff, #ccfbf1)' : 'white',
                  boxShadow: companion === 'kiki' ? '0 8px 20px rgba(13, 148, 136, 0.2)' : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                <MascotFullBody character="kiki" pose={companion === 'kiki' ? 'wave' : 'stand'} size={120} interactive={false} />
                <div style={{ marginTop: 6, textAlign: 'center' }}>
                  <strong style={{ fontSize: '1.05rem', color: '#0f766e', display: 'block' }}>Kiki si Penjelajah</strong>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Ceria, Aktif &amp; Penasaran</span>
                </div>
                {companion === 'kiki' && (
                  <span style={{ marginTop: 8, fontSize: '0.75rem', fontWeight: 800, color: '#0d9488', background: '#ccfbf1', padding: '3px 10px', borderRadius: 9999 }}>
                    ✓ Teman Terpilih
                  </span>
                )}
              </div>

              {/* Lala Option Card */}
              <div
                onClick={() => {
                  soundEngine.playClick();
                  setCompanion('lala');
                }}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '16px 14px',
                  borderRadius: 20,
                  cursor: 'pointer',
                  borderWidth: companion === 'lala' ? 3 : 2,
                  borderColor: companion === 'lala' ? '#f59e0b' : '#e2e8f0',
                  background: companion === 'lala' ? 'linear-gradient(145deg, #ffffff, #fef3c7)' : 'white',
                  boxShadow: companion === 'lala' ? '0 8px 20px rgba(245, 158, 11, 0.2)' : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                <MascotFullBody character="lala" pose={companion === 'lala' ? 'wave' : 'stand'} size={120} interactive={false} />
                <div style={{ marginTop: 6, textAlign: 'center' }}>
                  <strong style={{ fontSize: '1.05rem', color: '#b45309', display: 'block' }}>Lala si Cerdas</strong>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Cerdas, Teliti &amp; Ceria</span>
                </div>
                {companion === 'lala' && (
                  <span style={{ marginTop: 8, fontSize: '0.75rem', fontWeight: 800, color: '#b45309', background: '#fef3c7', padding: '3px 10px', borderRadius: 9999 }}>
                    ✓ Teman Terpilih
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Name Input Field */}
          <div style={{ marginBottom: 20, textAlign: 'left' }}>
            <label style={{ fontSize: '0.92rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: 8 }}>
              Tuliskan Namamu:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="Contoh: Aisyara, Budi, Siti..."
              maxLength={25}
              autoFocus
              style={{
                width: '100%',
                padding: '15px 18px',
                fontSize: '1.15rem',
                fontWeight: 600,
                borderRadius: 16,
                border: error ? '2.5px solid #ef4444' : '2.5px solid #cbd5e1',
                outline: 'none',
                background: 'white',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)'
              }}
            />
            {error && (
              <p style={{ color: '#ef4444', fontSize: '0.84rem', marginTop: 6, fontWeight: 700 }}>
                {error}
              </p>
            )}
          </div>

          {/* Live Greeting Preview */}
          {name.trim() && (
            <div
              style={{
                background: '#f0fdf4',
                border: '1.5px solid #86efac',
                borderRadius: 14,
                padding: '12px 18px',
                marginBottom: 22,
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: 12
              }}
            >
              <CheckCircle size={22} className="text-emerald-600 shrink-0" />
              <span style={{ fontSize: '0.95rem', color: '#166534', fontWeight: 600 }}>
                Halo, <strong>{name.trim()}</strong>! Siap berpetualang dan belajar sudut bersama {companion === 'kiki' ? 'Kiki' : 'Lala'}?
              </span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: '100%', padding: '16px 24px', fontSize: '1.2rem', borderRadius: 20 }}
          >
            <span>AYO MULAI BELAJAR!</span>
            <ArrowRight size={22} />
          </button>
        </form>
      </div>
    </div>
  );
};
