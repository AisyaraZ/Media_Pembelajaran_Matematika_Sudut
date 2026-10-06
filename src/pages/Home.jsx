import React, { useState } from 'react';
import { Compass, Sparkles, Map, Info, Award, Play, BookOpen, Music, Film } from 'lucide-react';
import { MascotDuoGreeting, MascotFullBody } from '../components/Mascot';
import { soundEngine } from '../utils/soundEngine';

export const Home = ({ onStart, onOpenTeacher, studentName }) => {
  const [showAbout, setShowAbout] = useState(false);

  const handleStart = () => {
    soundEngine.playClick();
    onStart();
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
      {/* Educational Floating Doodles (Decorative Icons) */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginBottom: 12 }}>
        <span style={{ fontSize: '1.5rem' }} className="animate-float">✏️</span>
        <span style={{ fontSize: '1.5rem' }} className="animate-float-delayed">📐</span>
        <span style={{ fontSize: '1.5rem' }} className="animate-float">⭐</span>
        <span style={{ fontSize: '1.5rem' }} className="animate-float-delayed">📚</span>
        <span style={{ fontSize: '1.5rem' }} className="animate-float">☁️</span>
      </div>

      {/* Top Banner Tag */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: 'linear-gradient(135deg, #ccfbf1, #e0f2fe)',
          border: '1.5px solid #99f6e4',
          padding: '6px 18px',
          borderRadius: 9999,
          marginBottom: 14,
          boxShadow: '0 2px 6px rgba(13, 148, 136, 0.1)'
        }}
      >
        <Sparkles size={16} className="text-teal-600" />
        <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0f766e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Kelas Interaktif Matematika Kelas 4 SD
        </span>
      </div>

      {/* Main Title */}
      <h1
        className="font-heading"
        style={{
          fontSize: 'clamp(2.3rem, 5vw, 3.6rem)',
          lineHeight: 1.15,
          marginBottom: 10,
          background: 'linear-gradient(135deg, #0f766e 0%, #0284c7 50%, #f59e0b 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        ANGLE ADVENTURE
      </h1>
      <p style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)', color: '#334155', fontWeight: 600, maxWidth: 640, margin: '0 auto 24px' }}>
        Petualangan Seru Menaklukkan Dunia Sudut bersama Kiki &amp; Lala! 📐✨
      </p>

      {/* Hero Card with Both Mascots Greeting */}
      <div
        className="card card-hero"
        style={{
          padding: '32px 24px',
          marginBottom: 32,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Floating corner doodle accents */}
        <div style={{ position: 'absolute', top: 16, left: 20, fontSize: '2rem', opacity: 0.7 }} className="animate-float">📐</div>
        <div style={{ position: 'absolute', top: 20, right: 24, fontSize: '2rem', opacity: 0.7 }} className="animate-float-delayed">⭐</div>
        <div style={{ position: 'absolute', bottom: 16, left: 24, fontSize: '1.8rem', opacity: 0.6 }} className="animate-float-delayed">🔷</div>
        <div style={{ position: 'absolute', bottom: 20, right: 24, fontSize: '1.8rem', opacity: 0.7 }} className="animate-float">🧭</div>

        {/* Dual Mascot Welcome: Kiki & Lala Full Body */}
        <MascotDuoGreeting size={135} />

        {/* Speech Welcome Greeting */}
        <div
          style={{
            background: 'white',
            borderRadius: 20,
            padding: '14px 22px',
            maxWidth: 580,
            margin: '0 auto 26px',
            border: '2px solid #ccfbf1',
            boxShadow: '0 4px 12px rgba(13, 148, 136, 0.08)'
          }}
        >
          <p style={{ fontSize: '1rem', color: '#1e293b', lineHeight: 1.5, margin: 0 }}>
            {studentName ? (
              <span>Halo kembali, <strong>{studentName}</strong>! Kami siap menemanimu melanjutkan misi mencari Kristal Sudut!</span>
            ) : (
              <span>"Halo sahabat petualang kelas 4 SD! Mari belajar sudut dengan seru, bernyanyi lagu sudut, dan selesaikan tantangan bersama kami!"</span>
            )}
          </p>
        </div>

        {/* Big Start Button */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
          <button
            onClick={handleStart}
            className="btn btn-primary btn-lg animate-pulse-glow"
            style={{
              minWidth: 260,
              fontSize: '1.2rem',
              padding: '16px 36px',
              borderRadius: 20
            }}
          >
            <Play size={22} style={{ fill: 'white' }} />
            <span>{studentName ? 'LANJUTKAN PETUALANGAN' : 'MULAI BELAJAR SEKARANG'}</span>
          </button>
        </div>

        {/* Secondary Navigation Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 22, flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              soundEngine.playClick();
              setShowAbout(true);
            }}
            className="btn btn-outline btn-sm"
            style={{ borderRadius: 14 }}
          >
            <Info size={16} className="text-teal-600" />
            <span>Tentang Media</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenTeacher();
            }}
            className="btn btn-outline btn-sm"
            style={{ borderRadius: 14 }}
          >
            <BookOpen size={16} className="text-amber-600" />
            <span>Panduan Guru &amp; RPP</span>
          </button>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, textAlign: 'left' }}>
        <div className="card" style={{ padding: '20px', borderColor: '#bae6fd', background: 'linear-gradient(145deg, #ffffff, #f0f9ff)' }}>
          <span style={{ fontSize: '2rem', display: 'block', marginBottom: 8 }}>🧭</span>
          <h4 className="font-heading" style={{ fontSize: '1.1rem', color: '#0369a1', marginBottom: 4 }}>Petualangan 6 Misi (PBL)</h4>
          <p style={{ fontSize: '0.86rem', color: '#64748b', lineHeight: 1.45 }}>Mulai dari recall bangun datar hingga proyek merancang Desain Taman Sekolah nyata.</p>
        </div>

        <div className="card" style={{ padding: '20px', borderColor: '#fde68a', background: 'linear-gradient(145deg, #ffffff, #fffbeb)' }}>
          <span style={{ fontSize: '2rem', display: 'block', marginBottom: 8 }}>🎵</span>
          <h4 className="font-heading" style={{ fontSize: '1.1rem', color: '#b45309', marginBottom: 4 }}>Lagu Edukatif &amp; Video</h4>
          <p style={{ fontSize: '0.86rem', color: '#64748b', lineHeight: 1.45 }}>Belajar macam-macam sudut dengan lagu asyik bersumber langsung dari YouTube.</p>
        </div>

        <div className="card" style={{ padding: '20px', borderColor: '#bbf7d0', background: 'linear-gradient(145deg, #ffffff, #f0fdf4)' }}>
          <span style={{ fontSize: '2rem', display: 'block', marginBottom: 8 }}>📜</span>
          <h4 className="font-heading" style={{ fontSize: '1.1rem', color: '#15803d', marginBottom: 4 }}>Sertifikat Master Sudut</h4>
          <p style={{ fontSize: '0.86rem', color: '#64748b', lineHeight: 1.45 }}>Raih skor terbaik dan unduh sertifikat resmi digital langsung ke format PDF.</p>
        </div>
      </div>

      {/* About Modal */}
      {showAbout && (
        <div className="modal-overlay" onClick={() => setShowAbout(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: '2rem' }}>ℹ️</span>
              <h3 className="font-heading" style={{ fontSize: '1.35rem', color: '#0f172a' }}>Tentang Angle Adventure</h3>
            </div>
            <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.5, marginBottom: 16 }}>
              <strong>Angle Adventure</strong> dirancang khusus sebagai solusi inovatif pembelajaran Matematika kelas 4 SD agar siswa tidak jenuh dengan metode ceramah konvensional.
            </p>
            <ul style={{ fontSize: '0.88rem', color: '#334155', paddingLeft: 18, marginBottom: 20, lineHeight: 1.6 }}>
              <li><strong>Model:</strong> Project Based Learning (PBL) berorientasi petualangan misi.</li>
              <li><strong>Target Pembelajaran:</strong> Pengukuran &amp; Macam Sudut Kurikulum Merdeka Fase B.</li>
              <li><strong>Maskot Cilik:</strong> Kiki si Penjelajah dan Lala si Cerdas dengan tubuh utuh interaktif.</li>
              <li><strong>Fitur Khusus:</strong> Video Lagu Pembelajaran YouTube, Busur Derajat Virtual, Evaluasi 10 Soal, &amp; Cetak Sertifikat Digital.</li>
            </ul>
            <button
              onClick={() => setShowAbout(false)}
              className="btn btn-primary"
              style={{ width: '100%', borderRadius: 16 }}
            >
              Ayo Mulai Belajar!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
