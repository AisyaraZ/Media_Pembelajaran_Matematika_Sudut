import React, { useState } from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

/**
 * FULL BODY 3D MASCOT (Disney / Pixar 3D Cute Kids Render)
 * Kiki (Anak Laki-Laki Penjelajah dengan Rompi & Topi Safari)
 * Lala (Anak Perempuan Cerdas dengan Baret Merah & Overall Denim)
 */
export const MascotFullBody = ({
  character = 'kiki',
  pose = 'wave',
  emotion = 'happy',
  size = 180,
  interactive = true,
  onClick = null
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isKiki = character === 'kiki';
  const imageSrc = isKiki ? '/assets/images/kiki.png' : '/assets/images/lala.png';

  const handleClick = (e) => {
    soundEngine.playClick();
    if (onClick) onClick(e);
  };

  return (
    <div
      className={`mascot-fullbody-wrapper ${interactive ? 'cursor-pointer' : ''}`}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        userSelect: 'none',
        position: 'relative',
        transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      title={`${isKiki ? 'Kiki si Penjelajah 🧭' : 'Lala si Cerdas 🎒'} - Klik untuk sapa!`}
    >
      <div
        className="mascot-body-anim"
        style={{
          width: size,
          height: size * 1.48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.2s ease',
          transform: isHovered ? 'scale(1.05) translateY(-4px)' : 'none'
        }}
      >
        <img
          src={imageSrc}
          alt={isKiki ? 'Kiki si Penjelajah' : 'Lala si Cerdas'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 8px 16px rgba(13, 148, 136, 0.18))',
            pointerEvents: 'none'
          }}
          loading="lazy"
        />
      </div>
    </div>
  );
};

/**
 * COMPACT AVATAR (For small Header pills, question cards & medal badges)
 */
export const MascotAvatar = ({ character = 'kiki', size = 48, emotion = 'happy' }) => {
  const isKiki = character === 'kiki';
  const headSrc = isKiki ? '/assets/images/kiki_head.png' : '/assets/images/lala_head.png';

  return (
    <div
      className="mascot-avatar-container"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: isKiki ? 'linear-gradient(135deg, #ccfbf1, #99f6e4)' : 'linear-gradient(135deg, #fef3c7, #fde68a)',
        border: `2.5px solid ${isKiki ? '#0d9488' : '#f59e0b'}`,
        boxShadow: '0 3px 8px rgba(0, 0, 0, 0.12)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        flexShrink: 0
      }}
    >
      <img
        src={headSrc}
        alt={isKiki ? 'Kiki Avatar' : 'Lala Avatar'}
        style={{
          width: '94%',
          height: '94%',
          objectFit: 'contain',
          transform: 'translateY(2px)'
        }}
      />
    </div>
  );
};

/**
 * CONTEXTUAL MASCOT SPEECH & GUIDE
 * Full body mascot standing beside or above dialogue bubble
 */
export const MascotSpeech = ({
  character = 'kiki',
  name = 'Kiki',
  message = '',
  pose = 'wave',
  emotion = 'happy',
  mascotSize = 135,
  onSpeak = null,
  showAudioBtn = true
}) => {
  const isKiki = character === 'kiki';

  const handleVoice = () => {
    soundEngine.speak(message);
    if (onSpeak) onSpeak();
  };

  return (
    <div className="mascot-fullbody-dialogue-container">
      {/* Full Body Mascot Companion */}
      <div className="mascot-character-side">
        <MascotFullBody
          character={character}
          pose={pose}
          emotion={emotion}
          size={mascotSize}
          interactive={true}
        />
        <div className="mascot-tag-pill">
          {isKiki ? 'Kiki si Penjelajah 🧭' : 'Lala si Cerdas 🎒'}
        </div>
      </div>

      {/* Speech Bubble */}
      <div className="speech-bubble-fullbody">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: '1.1rem' }}>💬</span>
            <span className="mascot-name-badge">
              Teman Belajar: <strong>{isKiki ? 'Kiki' : 'Lala'}</strong>
            </span>
          </div>

          {showAudioBtn && (
            <button
              onClick={handleVoice}
              className="btn btn-outline btn-sm"
              style={{
                padding: '4px 10px',
                borderRadius: '14px',
                fontSize: '0.78rem',
                gap: 5,
                background: '#F0FDFA',
                borderColor: '#99F6E4'
              }}
              title="Dengarkan Suara Guru/Maskot"
            >
              <Volume2 size={15} className="text-teal-600" />
              <span>Dengarkan</span>
            </button>
          )}
        </div>

        <p className="speech-text" style={{ fontSize: '0.98rem', lineHeight: 1.55 }}>
          {message}
        </p>
      </div>
    </div>
  );
};

/**
 * DUAL MASCOT WELCOME GREETING
 * Displays both Kiki and Lala in 3D cute animation render
 */
export const MascotDuoGreeting = ({ size = 260 }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10px auto 20px',
        maxWidth: 620,
        width: '100%'
      }}
    >
      <div
        className="mascot-body-anim"
        style={{
          width: '100%',
          maxWidth: 520,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <img
          src="/assets/images/mascots_duo.png"
          alt="Kiki dan Lala - Maskot Pembelajaran Sudut"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: 340,
            objectFit: 'contain',
            filter: 'drop-shadow(0 10px 24px rgba(13, 148, 136, 0.22))'
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: 20, marginTop: 4 }}>
        <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0D9488', background: '#CCFBF1', padding: '3px 14px', borderRadius: 9999, border: '1px solid #99F6E4' }}>
          🧭 Kiki si Penjelajah
        </span>
        <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#B45309', background: '#FEF3C7', padding: '3px 14px', borderRadius: 9999, border: '1px solid #FDE68A' }}>
          🎒 Lala si Cerdas
        </span>
      </div>
    </div>
  );
};
