import React, { useState } from 'react';
import { PieChart, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { MascotSpeech } from '../components/Mascot';
import { Navigation } from '../components/Navigation';
import { FeedbackModal } from '../components/FeedbackModal';
import { soundEngine } from '../utils/soundEngine';

const ANGLE_TYPES = [
  {
    id: 'lancip',
    name: 'Sudut Lancip',
    range: '< 90°',
    sampleDeg: 45,
    color: '#0284c7',
    icon: '📐',
    desc: 'Lebih kecil dari 90°. Ujungnya runcing dan sempit menyerupai paruh burung atau gunting setengah terbuka.'
  },
  {
    id: 'siku',
    name: 'Sudut Siku-Siku',
    range: '= 90°',
    sampleDeg: 90,
    color: '#0d9488',
    icon: '⏹️',
    desc: 'Tepat 90°. Dua kakinya tegak lurus membentuk huruf "L". Sering ditandai simbol kotak siku-siku.'
  },
  {
    id: 'tumpul',
    name: 'Sudut Tumpul',
    range: '> 90° dan < 180°',
    sampleDeg: 125,
    color: '#f59e0b',
    icon: '🔺',
    desc: 'Lebih besar dari 90° tetapi kurang dari 180°. Bukaan kakinya lebar menyerupai kipas yang terbuka lebar.'
  },
  {
    id: 'lurus',
    name: 'Sudut Lurus',
    range: '= 180°',
    sampleDeg: 180,
    color: '#8b5cf6',
    icon: '➖',
    desc: 'Tepat 180°. Dua kakinya membentuk satu garis lurus mendatar sempurna.'
  }
];

const MINI_GAME_ITEMS = [
  { id: 1, angleDeg: 45, correctType: 'Sudut Lancip', explanation: 'Sudut 45° lebih kecil dari 90°, jadi termasuk sudut lancip.' },
  { id: 2, angleDeg: 90, correctType: 'Sudut Siku-Siku', explanation: 'Sudut 90° tepat berbentuk huruf L tegak lurus, yaitu sudut siku-siku.' },
  { id: 3, angleDeg: 120, correctType: 'Sudut Tumpul', explanation: 'Sudut 120° lebih besar dari 90° dan kurang dari 180°, jadi termasuk sudut tumpul.' },
  { id: 4, angleDeg: 180, correctType: 'Sudut Lurus', explanation: 'Sudut 180° membentuk garis lurus mendatar sempurna, yaitu sudut lurus.' }
];

export const Mission3 = ({ onCompleteMission, onBackToMap, companion = 'kiki' }) => {
  const [tab, setTab] = useState('concept'); // 'concept' or 'game'
  const [gameIndex, setGameIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [gameSolved, setGameSolved] = useState(false);

  const currentGameItem = MINI_GAME_ITEMS[gameIndex];

  const handleAnswerGame = (selectedTypeName) => {
    soundEngine.playClick();
    const isCorrect = selectedTypeName === currentGameItem.correctType;
    if (isCorrect) soundEngine.playCorrect();
    else soundEngine.playIncorrect();

    setFeedback({
      isCorrect,
      userAnswer: selectedTypeName,
      correctAnswer: currentGameItem.correctType,
      explanation: currentGameItem.explanation
    });
  };

  const handleNextGameItem = () => {
    setFeedback(null);
    if (gameIndex < MINI_GAME_ITEMS.length - 1) {
      setGameIndex(gameIndex + 1);
    } else {
      setGameSolved(true);
    }
  };

  const handleFinish = () => {
    soundEngine.playFanfare();
    onCompleteMission(3, 'angle-expert', 20);
  };

  return (
    <div style={{ maxWidth: 840, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: '1.8rem' }}>⭐</span>
        <div>
          <h2 className="font-heading" style={{ fontSize: '1.45rem', color: '#0f172a' }}>
            Misi 3: Macam-Macam Sudut
          </h2>
          <span style={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 700 }}>
            Wilayah Spektrum Sudut • Lancip, Siku-Siku, Tumpul, dan Lurus
          </span>
        </div>
      </div>

      <MascotSpeech
        character={companion}
        name={companion === 'kiki' ? 'Kiki' : 'Lala'}
        pose={tab === 'concept' ? 'point' : 'cheer'}
        message={
          tab === 'concept'
            ? 'Ada 4 macam sudut utama yang wajib kamu ketahui! Pelajari perbedaan ukuran derajatnya, lalu uji kemampuanmu di mini-game!'
            : 'Tebak jenis sudut berdasarkan gambar busur derajat di bawah! Pilih tombol jawaban yang paling tepat!'
        }
      />

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, margin: '16px 0' }}>
        <button
          onClick={() => {
            soundEngine.playClick();
            setTab('concept');
          }}
          className={`btn ${tab === 'concept' ? 'btn-primary' : 'btn-outline'}`}
          style={{ flex: 1 }}
        >
          📖 Materi 4 Jenis Sudut
        </button>
        <button
          onClick={() => {
            soundEngine.playClick();
            setTab('game');
          }}
          className={`btn ${tab === 'game' ? 'btn-accent' : 'btn-outline'}`}
          style={{ flex: 1 }}
        >
          🎮 Mini Game Tebak Sudut
        </button>
      </div>

      {/* TAB 1: CONCEPT CARDS */}
      {tab === 'concept' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
          {ANGLE_TYPES.map((type) => (
            <div key={type.id} className="card" style={{ borderColor: type.color, padding: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: '1.5rem' }}>{type.icon}</span>
                <span style={{ background: type.color, color: 'white', padding: '2px 10px', borderRadius: 9999, fontWeight: 800, fontSize: '0.82rem' }}>
                  {type.range}
                </span>
              </div>
              <h3 className="font-heading" style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: 4 }}>
                {type.name}
              </h3>
              <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.45, marginBottom: 12 }}>
                {type.desc}
              </p>

              {/* Angle Visualization Mini SVG */}
              <div style={{ background: '#f8fafc', borderRadius: 12, padding: 8, textAlign: 'center', border: '1px solid #e2e8f0' }}>
                <svg width="140" height="70" viewBox="0 0 140 70">
                  <line x1="30" y1="55" x2="110" y2="55" stroke="#64748b" strokeWidth="3" />
                  {type.id === 'lancip' && <line x1="30" y1="55" x2="80" y2="15" stroke={type.color} strokeWidth="3.5" />}
                  {type.id === 'siku' && (
                    <>
                      <line x1="30" y1="55" x2="30" y2="10" stroke={type.color} strokeWidth="3.5" />
                      <rect x="30" y="43" width="12" height="12" fill="none" stroke={type.color} strokeWidth="1.5" />
                    </>
                  )}
                  {type.id === 'tumpul' && <line x1="70" y1="55" x2="20" y2="18" stroke={type.color} strokeWidth="3.5" />}
                  {type.id === 'lurus' && <line x1="30" y1="55" x2="110" y2="55" stroke={type.color} strokeWidth="4" />}
                  <circle cx={type.id === 'tumpul' ? 70 : 30} cy="55" r="4" fill="#f43f5e" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: MINI GAME */}
      {tab === 'game' && (
        <div className="card" style={{ padding: 24 }}>
          {!gameSolved ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f59e0b' }}>
                  Tantangan {gameIndex + 1} dari {MINI_GAME_ITEMS.length}
                </span>
                <span style={{ fontSize: '0.82rem', background: '#fef3c7', padding: '3px 10px', borderRadius: 9999, fontWeight: 700, color: '#b45309' }}>
                  Tebak Jenis Sudut
                </span>
              </div>

              {/* Big Angle Card */}
              <div style={{ background: '#f8fafc', borderRadius: 20, padding: 20, textAlign: 'center', border: '2px solid #e2e8f0', marginBottom: 20 }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0d9488', display: 'block', marginBottom: 4 }}>
                  {currentGameItem.angleDeg}°
                </span>
                <p style={{ fontSize: '0.95rem', color: '#475569' }}>
                  Jika sebuah sudut berukuran <strong>{currentGameItem.angleDeg}°</strong>, termasuk jenis sudut apakah itu?
                </p>
              </div>

              {/* Answer Option Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
                {['Sudut Lancip', 'Sudut Siku-Siku', 'Sudut Tumpul', 'Sudut Lurus'].map((typeName) => (
                  <button
                    key={typeName}
                    onClick={() => handleAnswerGame(typeName)}
                    className="btn btn-outline"
                    style={{ padding: '14px 16px', fontSize: '0.95rem' }}
                  >
                    {typeName}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 10px' }}>
              <span style={{ fontSize: '3rem' }}>🎉 💎 ⭐</span>
              <h3 className="font-heading" style={{ fontSize: '1.45rem', color: '#166534', marginTop: 10, marginBottom: 8 }}>
                Semua Tantangan Sudut Terpecahkan!
              </h3>
              <p style={{ fontSize: '0.92rem', color: '#334155', maxWidth: 460, margin: '0 auto 20px' }}>
                Kamu sudah membuktikan keahlianmu membedakan sudut lancip, siku-siku, tumpul, dan lurus. Kristal Spektrum siap diklaim!
              </p>
              <button
                onClick={handleFinish}
                className="btn btn-primary btn-lg"
              >
                Klaim Kristal Spektrum &amp; Selesai Misi 3
              </button>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <Navigation
        onPrev={onBackToMap}
        prevLabel="Peta Misi"
        onNext={tab === 'concept' ? () => setTab('game') : gameSolved ? handleFinish : null}
        nextLabel={tab === 'concept' ? 'Mainkan Mini Game' : 'Klaim Kristal Misi 3'}
        onMap={onBackToMap}
      />

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={!!feedback}
        isCorrect={feedback?.isCorrect}
        userAnswer={feedback?.userAnswer}
        correctAnswer={feedback?.correctAnswer}
        explanation={feedback?.explanation}
        companion={companion}
        onNext={handleNextGameItem}
      />
    </div>
  );
};
