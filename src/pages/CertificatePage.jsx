import React from 'react';
import { Printer, Download, ArrowLeft, Award, Sparkles, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';
import { MascotAvatar, MascotFullBody } from '../components/Mascot';
import { soundEngine } from '../utils/soundEngine';

export const CertificatePage = ({
  studentName = 'Aisyara',
  score = 100,
  companion = 'kiki',
  onBackToHome
}) => {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handlePrint = () => {
    soundEngine.playClick();
    window.print();
  };

  return (
    <div style={{ maxWidth: 940, margin: '0 auto' }}>
      {/* Action Header (Hidden in Print) */}
      <div
        className="no-print"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
          flexWrap: 'wrap',
          gap: 12
        }}
      >
        <button
          onClick={() => {
            soundEngine.playClick();
            onBackToHome();
          }}
          className="btn btn-outline"
        >
          <ArrowLeft size={18} />
          <span>Kembali ke Beranda</span>
        </button>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={handlePrint}
            className="btn btn-primary btn-lg"
            style={{ gap: 8, boxShadow: '0 4px 14px rgba(13, 148, 136, 0.35)' }}
          >
            <Printer size={20} />
            <span>Cetak / Unduh PDF Sertifikat</span>
          </button>
        </div>
      </div>

      {/* Official Certificate Canvas Container */}
      <div
        className="certificate-box card"
        style={{
          background: 'radial-gradient(ellipse at center, #ffffff 0%, #f0fdf4 100%)',
          border: '10px double #0d9488',
          borderRadius: 24,
          padding: '44px 36px',
          textAlign: 'center',
          boxShadow: '0 20px 40px -10px rgba(13, 148, 136, 0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Watermark in background */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '18rem',
            opacity: 0.04,
            pointerEvents: 'none',
            userSelect: 'none'
          }}
        >
          📐
        </div>

        {/* Decorative corner ornaments */}
        <div style={{ position: 'absolute', top: 16, left: 20, fontSize: '2.2rem', opacity: 0.85 }}>📐</div>
        <div style={{ position: 'absolute', top: 16, right: 20, fontSize: '2.2rem', opacity: 0.85 }}>💎</div>
        <div style={{ position: 'absolute', bottom: 16, left: 20, fontSize: '2.2rem', opacity: 0.85 }}>🧭</div>
        <div style={{ position: 'absolute', bottom: 16, right: 20, fontSize: '2.2rem', opacity: 0.85 }}>⭐</div>

        {/* Certificate Header Top Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: '#ccfbf1',
            padding: '6px 20px',
            borderRadius: 9999,
            marginBottom: 12,
            border: '1px solid #99f6e4'
          }}
        >
          <Sparkles size={16} className="text-teal-700" />
          <span
            style={{
              fontSize: '0.82rem',
              fontWeight: 800,
              color: '#0f766e',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}
          >
            Kurikulum Merdeka • Matematika Fase B (Kelas 4 SD)
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-heading"
          style={{
            fontSize: 'clamp(2.1rem, 4.5vw, 3rem)',
            color: '#0f766e',
            letterSpacing: '0.04em',
            margin: '4px 0 6px',
            lineHeight: 1.15
          }}
        >
          CERTIFICATE OF ACHIEVEMENT
        </h1>
        <p
          style={{
            fontSize: '0.92rem',
            color: '#64748b',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            fontWeight: 700
          }}
        >
          Sertifikat Resmi Penghargaan Master Sudut Cilik
        </p>

        {/* Recipient Name */}
        <div style={{ margin: '26px 0 14px' }}>
          <span style={{ fontSize: '0.95rem', color: '#475569', fontStyle: 'italic', display: 'block', marginBottom: 4 }}>
            Dengan bangga dan penuh apresiasi diberikan kepada:
          </span>
          <h2
            className="font-heading"
            style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 3.4rem)',
              color: '#0d9488',
              margin: '0',
              lineHeight: 1.2,
              textDecoration: 'underline',
              textUnderlineOffset: '8px',
              textDecorationColor: '#f59e0b'
            }}
          >
            {studentName}
          </h2>
        </div>

        <p
          style={{
            fontSize: '1rem',
            color: '#334155',
            maxWidth: 680,
            margin: '0 auto 24px',
            lineHeight: 1.6
          }}
        >
          Telah berhasil menyelesaikan seluruh <strong>6 Misi Petualangan Matematika</strong>, menguasai konsep dan pengukuran sudut, serta sukses memecahkan <strong>Proyek PBL Desain Taman Sekolah</strong> dalam media:
        </p>

        {/* Program Title Banner */}
        <div
          style={{
            display: 'inline-block',
            background: '#e0f2fe',
            padding: '10px 24px',
            borderRadius: 16,
            border: '2px solid #7dd3fc',
            marginBottom: 28
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
              color: '#0369a1',
              fontWeight: 700
            }}
          >
            "ANGLE ADVENTURE: PETUALANGAN MENCARI HARTA SUDUT"
          </span>
        </div>

        {/* Mascots, Seal, & Signature Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 20,
            borderTop: '2px dashed #cbd5e1',
            paddingTop: 24,
            marginTop: 6
          }}
        >
          {/* Left: Guide Mascots (Full Body) */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
            <MascotFullBody character="kiki" pose="cheer" size={72} interactive={false} />
            <MascotFullBody character="lala" pose="cheer" size={72} interactive={false} />
            <div style={{ textAlign: 'left', paddingBottom: 8 }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0d9488', display: 'block' }}>
                Kiki &amp; Lala
              </span>
              <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
                Mentor Petualang Cilik
              </span>
            </div>
          </div>

          {/* Center: Golden Badge Seal */}
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 78,
                height: 78,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #fef08a, #f59e0b)',
                border: '4px solid #b45309',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                boxShadow: '0 4px 12px rgba(180, 83, 9, 0.25)'
              }}
            >
              <Award size={32} className="text-amber-900" />
              <span style={{ fontSize: '0.64rem', fontWeight: 900, color: '#78350f', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                MASTER
              </span>
            </div>
            <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#b45309', display: 'block', marginTop: 4 }}>
              Nilai: {score} / 100
            </span>
          </div>

          {/* Right: Teacher Signature */}
          <div style={{ textAlign: 'center', minWidth: 160 }}>
            <div
              style={{
                height: 44,
                borderBottom: '2px solid #0f172a',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                marginBottom: 4
              }}
            >
              <span style={{ fontFamily: 'cursive', fontSize: '1.35rem', color: '#0f766e' }}>
                Guru Matematika SD
              </span>
            </div>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#1e293b', display: 'block' }}>
              Tanda Tangan Guru Pengampu
            </span>
            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
              {currentDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
