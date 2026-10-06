import React from 'react';
import { ArrowRight, Compass, Sparkles, Map, ShieldCheck } from 'lucide-react';
import { MascotAvatar, MascotSpeech } from '../components/Mascot';
import { soundEngine } from '../utils/soundEngine';

export const Introduction = ({ studentName, companion = 'kiki', onProceedToMap }) => {
  return (
    <div style={{ maxWidth: 780, margin: '0 auto' }}>
      <MascotSpeech
        character={companion}
        name={companion === 'kiki' ? 'Kiki' : 'Lala'}
        pose="point"
        message={`Halo ${studentName}! Kerajaan Dunia Sudut sedang mengalami kejadian misterius. Seluruh 6 Kristal Sudut yang menjaga keseimbangan geometri telah terpencar! Ayo temukan semuanya!`}
      />

      <div className="card" style={{ padding: '28px 24px', marginTop: 16 }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ display: 'inline-flex', padding: 12, borderRadius: '50%', background: '#fef3c7', marginBottom: 12 }}>
            <span style={{ fontSize: '2.5rem' }}>💎</span>
          </div>
          <h2 className="font-heading" style={{ fontSize: '1.7rem', color: '#0f172a', marginBottom: 8 }}>
            Misteri Kristal Sudut yang Hilang
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#64748b', maxWidth: 560, margin: '0 auto' }}>
            Setiap kristal tersimpan di wilayah tantangan matematika yang berbeda. Untuk membuka kristal tersebut, kamu harus menuntaskan misi bersama Kiki &amp; Lala!
          </p>
        </div>

        {/* 3 Step Adventure Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 28 }}>
          <div style={{ background: '#f0fdf4', padding: '16px', borderRadius: 16, border: '1px solid #bbf7d0', textAlign: 'center' }}>
            <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: 6 }}>1️⃣</span>
            <strong style={{ fontSize: '0.95rem', color: '#166534', display: 'block', marginBottom: 4 }}>Pelajari Konsep</strong>
            <span style={{ fontSize: '0.82rem', color: '#14532d' }}>Pahami sudut melalui cerita, animasi interaktif, dan simulasi busur derajat.</span>
          </div>

          <div style={{ background: '#e0f2fe', padding: '16px', borderRadius: 16, border: '1px solid #bae6fd', textAlign: 'center' }}>
            <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: 6 }}>2️⃣</span>
            <strong style={{ fontSize: '0.95rem', color: '#0369a1', display: 'block', marginBottom: 4 }}>Pecahkan Misi (PBL)</strong>
            <span style={{ fontSize: '0.82rem', color: '#075985' }}>Rancang Desain Taman Sekolah dengan menerapkan jenis dan ukuran sudut yang tepat.</span>
          </div>

          <div style={{ background: '#fef3c7', padding: '16px', borderRadius: 16, border: '1px solid #fde68a', textAlign: 'center' }}>
            <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: 6 }}>3️⃣</span>
            <strong style={{ fontSize: '0.95rem', color: '#b45309', display: 'block', marginBottom: 4 }}>Raih Sertifikat</strong>
            <span style={{ fontSize: '0.82rem', color: '#78350f' }}>Kumpulkan seluruh 6 lencana petualang dan dapatkan Sertifikat Resmi Master Sudut!</span>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => {
              soundEngine.playClick();
              onProceedToMap();
            }}
            className="btn btn-primary btn-lg"
            style={{ minWidth: 260, fontSize: '1.15rem' }}
          >
            <Map size={22} />
            <span>BUKA PETA MISI PETUALANGAN</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
