import React, { useState } from 'react';
import { Play, ExternalLink, Music, Video, Info, Sparkles, CheckCircle2 } from 'lucide-react';
import { MascotFullBody } from './Mascot';
import { soundEngine } from '../utils/soundEngine';

export const VideoPlayer = ({ companion = 'lala' }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoUrl = "https://www.youtube.com/embed/-QL9tE98RPg?rel=0&cc_load_policy=1&autoplay=1";
  const videoTitle = "LAGU PEMBELAJARAN - SUDUT | MACAM-MACAM SUDUT | UNTUK SD | Nada : Lihat Kebunku";
  const originalLink = "https://youtu.be/-QL9tE98RPg?si=Kz0S1aQ43SQdq3HJ";

  const handleStartPlay = () => {
    soundEngine.playClick();
    setIsPlaying(true);
  };

  return (
    <div
      className="card"
      style={{
        padding: '24px 20px',
        background: 'linear-gradient(145deg, #ffffff, #f0fdf4)',
        borderColor: '#a7f3d0',
        borderRadius: 24,
        boxShadow: '0 12px 28px -6px rgba(13, 148, 136, 0.15)'
      }}
    >
      {/* Header Info */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: '#fee2e2',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(239, 68, 68, 0.2)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </div>
          <div>
            <h3 className="font-heading" style={{ fontSize: '1.25rem', color: '#0f172a', margin: 0 }}>
              Video Lagu Pembelajaran Sudut 🎵
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#0d9488', fontWeight: 700 }}>
              Materi Edukasi Interaktif • Nada: Lihat Kebunku
            </span>
          </div>
        </div>

        <a
          href={originalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline btn-sm"
          style={{ gap: 6, fontSize: '0.78rem', color: '#dc2626', borderColor: '#fca5a5', background: '#fff5f5' }}
          title="Buka langsung di YouTube"
        >
          <span>Buka di YouTube</span>
          <ExternalLink size={14} />
        </a>
      </div>

      {/* Mascot Invitation Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          background: 'white',
          border: '2px solid #ccfbf1',
          borderRadius: 18,
          padding: '12px 18px',
          marginBottom: 18
        }}
      >
        <div style={{ flexShrink: 0 }}>
          <MascotFullBody character={companion} pose="point" size={80} interactive={true} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <Sparkles size={16} className="text-amber-500" />
            <strong style={{ fontSize: '0.88rem', color: '#0f766e' }}>
              Ajakan {companion === 'kiki' ? 'Kiki' : 'Lala'}:
            </strong>
          </div>
          <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.45, margin: 0 }}>
            "Yuk teman-teman, tonton video lagu ceria ini untuk mengingat macam-macam sudut dengan irama lagu yang asyik!"
          </p>
        </div>
      </div>

      {/* Responsive YouTube Video Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '56.25%', // 16:9 Aspect Ratio
          borderRadius: 20,
          overflow: 'hidden',
          background: '#0f172a',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.18)',
          border: '3px solid #1e293b'
        }}
      >
        {!isPlaying ? (
          /* Attractive Initial Play Overlay */
          <div
            onClick={handleStartPlay}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #0f172a, #134e4a)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: 24,
              textAlign: 'center'
            }}
          >
            {/* Animated Big Play Button */}
            <div
              style={{
                width: 76,
                height: 76,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 30px rgba(239, 68, 68, 0.6)',
                marginBottom: 16
              }}
              className="animate-pulse-glow"
            >
              <Play size={36} style={{ fill: 'white', marginLeft: 4 }} />
            </div>

            <h4 style={{ color: 'white', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', fontWeight: 700, margin: '0 0 6px' }}>
              {videoTitle}
            </h4>
            <span style={{ color: '#5eead4', fontSize: '0.84rem', fontWeight: 600 }}>
              Klik di sini untuk memutar video (YouTube Embed)
            </span>
          </div>
        ) : (
          /* YouTube Embed Iframe */
          <iframe
            src={videoUrl}
            title={videoTitle}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>

      {/* Attribution & Legal Credit Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: 14,
          padding: '12px 16px',
          marginTop: 16
        }}
      >
        <Info size={18} className="text-sky-600 shrink-0" style={{ marginTop: 2 }} />
        <div style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.45 }}>
          <strong style={{ color: '#334155' }}>Sumber &amp; Atribusi Konten:</strong> Video pembelajaran disematkan secara legal melalui <em>YouTube Embed Player</em> resmi. Seluruh hak cipta audio, visual, dan lagu sepenuhnya milik pembuat konten asli di kanal YouTube. Fitur subtitle/caption (CC) dapat diaktifkan melalui pemutar YouTube.
        </div>
      </div>
    </div>
  );
};
