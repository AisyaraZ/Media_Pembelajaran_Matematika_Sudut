import React, { useState } from 'react';
import { Layers, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';
import { MascotSpeech } from '../components/Mascot';
import { Navigation } from '../components/Navigation';
import { FeedbackModal } from '../components/FeedbackModal';
import { soundEngine } from '../utils/soundEngine';

const SHAPES = [
  { id: 'square', name: 'Persegi', sides: 4, angles: 4, color: '#0d9488', icon: '⏹️' },
  { id: 'rectangle', name: 'Persegi Panjang', sides: 4, angles: 4, color: '#0284c7', icon: '▭' },
  { id: 'triangle', name: 'Segitiga', sides: 3, angles: 3, color: '#f59e0b', icon: '▲' },
  { id: 'circle', name: 'Lingkaran', sides: 0, angles: 0, color: '#ec4899', icon: '●' },
  { id: 'trapezoid', name: 'Trapesium', sides: 4, angles: 4, color: '#8b5cf6', icon: '⏢' }
];

export const Mission1 = ({ onCompleteMission, onBackToMap, companion = 'kiki' }) => {
  const [step, setStep] = useState(1); // 1: Recall Sides, 2: Highlight Angles, 3: Synthesis
  const [selectedShape, setSelectedShape] = useState(null);
  const [highlightAngles, setHighlightAngles] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const handleSelectShapeQuestion = (shapeId) => {
    soundEngine.playClick();
    setSelectedShape(shapeId);
    if (shapeId === 'square' || shapeId === 'rectangle' || shapeId === 'trapezoid') {
      soundEngine.playCorrect();
      setFeedback({
        isCorrect: true,
        userAnswer: SHAPES.find(s => s.id === shapeId).name,
        correctAnswer: 'Persegi / Persegi Panjang / Trapesium',
        explanation: 'Tepat sekali! Bangun ini memiliki 4 sisi lurus dan 4 sudut pertemuan.'
      });
    } else {
      soundEngine.playIncorrect();
      setFeedback({
        isCorrect: false,
        userAnswer: SHAPES.find(s => s.id === shapeId).name,
        correctAnswer: 'Persegi / Persegi Panjang / Trapesium (memiliki 4 sisi)',
        explanation: `${SHAPES.find(s => s.id === shapeId).name} memiliki ${SHAPES.find(s => s.id === shapeId).sides} sisi. Coba perhatikan bentuk yang memiliki 4 sisi lurus!`
      });
    }
  };

  const handleNextStep = () => {
    setFeedback(null);
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else {
      // Mission Complete!
      soundEngine.playFanfare();
      onCompleteMission(1, 'shape-explorer', 20);
    }
  };

  return (
    <div style={{ maxWidth: 840, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: '1.8rem' }}>🔷</span>
        <div>
          <h2 className="font-heading" style={{ fontSize: '1.45rem', color: '#0f172a' }}>
            Misi 1: Recall Bangun Datar
          </h2>
          <span style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: 700 }}>
            Wilayah Lembah Bangun Datar • Menghubungkan Sisi dan Sudut
          </span>
        </div>
      </div>

      <MascotSpeech
        character={companion}
        name={companion === 'kiki' ? 'Kiki' : 'Lala'}
        pose={step === 3 ? 'cheer' : 'point'}
        message={
          step === 1
            ? 'Sebelum kita mempelajari sudut, mari kita ingat kembali bangun-bangun datar yang sudah pernah kita pelajari di kelas sebelumnya!'
            : step === 2
            ? 'Hebat! Sekarang perhatikan pojok-pojok pada bangun datar. Titik tempat bertemunya dua sisi itulah yang membentuk sebuah sudut!'
            : 'Luar biasa! Kamu sudah memahami bahwa sudut berasal dari dua garis sisi yang saling bertemu pada satu titik pojok!'
        }
      />

      {/* Step 1: Click & Recall Sides */}
      {step === 1 && (
        <div className="card" style={{ padding: '24px', marginTop: 16 }}>
          <h3 className="font-heading" style={{ fontSize: '1.25rem', color: '#0f766e', marginBottom: 8 }}>
            Tantangan 1: Manakah Bangun yang Memiliki 4 Sisi?
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: 18 }}>
            Klik pada salah satu bangun datar di bawah ini yang memiliki tepat 4 sisi lurus:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12, marginBottom: 20 }}>
            {SHAPES.map((shape) => (
              <button
                key={shape.id}
                onClick={() => handleSelectShapeQuestion(shape.id)}
                className="card"
                style={{
                  padding: '16px 10px',
                  textAlign: 'center',
                  borderColor: selectedShape === shape.id ? shape.color : '#e2e8f0',
                  background: selectedShape === shape.id ? '#f0fdf4' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ fontSize: '2.4rem', marginBottom: 6 }}>{shape.icon}</div>
                <strong style={{ fontSize: '0.92rem', color: '#1e293b', display: 'block' }}>{shape.name}</strong>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{shape.sides > 0 ? `${shape.sides} Sisi` : 'Garis Lengkung'}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Interactive Corner Highlighter */}
      {step === 2 && (
        <div className="card" style={{ padding: '24px', marginTop: 16 }}>
          <h3 className="font-heading" style={{ fontSize: '1.25rem', color: '#0f766e', marginBottom: 8 }}>
            Tantangan 2: Menemukan Sudut pada Bangun Datar
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: 16 }}>
            Perhatikan bangun <strong>Persegi</strong> di bawah. Klik tombol untuk menyorot 4 titik sudutnya!
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            <svg width="220" height="220" viewBox="0 0 220 220" style={{ background: '#f8fafc', borderRadius: 20, border: '2px solid #cbd5e1' }}>
              {/* Square Body */}
              <rect x="40" y="40" width="140" height="140" fill="#ccfbf1" stroke="#0d9488" strokeWidth="4" rx="4" />

              {/* Side Labels */}
              <text x="110" y="30" fill="#0f766e" fontSize="11" fontWeight="bold" textAnchor="middle">Sisi Atas</text>
              <text x="110" y="200" fill="#0f766e" fontSize="11" fontWeight="bold" textAnchor="middle">Sisi Bawah</text>
              <text x="25" y="115" fill="#0f766e" fontSize="11" fontWeight="bold" textAnchor="middle">Sisi Kiri</text>
              <text x="195" y="115" fill="#0f766e" fontSize="11" fontWeight="bold" textAnchor="middle">Sisi Kanan</text>

              {/* Corners / Angle Highlights */}
              {highlightAngles && (
                <>
                  <circle cx="40" cy="40" r="10" fill="#f43f5e" className="animate-pulse-glow" />
                  <path d="M 40 60 L 60 60 L 60 40" fill="none" stroke="#ef4444" strokeWidth="3" />

                  <circle cx="180" cy="40" r="10" fill="#f43f5e" className="animate-pulse-glow" />
                  <path d="M 160 40 L 160 60 L 180 60" fill="none" stroke="#ef4444" strokeWidth="3" />

                  <circle cx="40" cy="180" r="10" fill="#f43f5e" className="animate-pulse-glow" />
                  <path d="M 40 160 L 60 160 L 60 180" fill="none" stroke="#ef4444" strokeWidth="3" />

                  <circle cx="180" cy="180" r="10" fill="#f43f5e" className="animate-pulse-glow" />
                  <path d="M 160 180 L 160 160 L 180 160" fill="none" stroke="#ef4444" strokeWidth="3" />
                </>
              )}
            </svg>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => {
                soundEngine.playCorrect();
                setHighlightAngles(true);
              }}
              className={`btn ${highlightAngles ? 'btn-outline' : 'btn-accent'}`}
            >
              <Sparkles size={18} />
              <span>{highlightAngles ? 'Sudut Berhasil Disorot (4 Sudut Siku-Siku)' : 'Sorot Sudut Persegi!'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Synthesis & Bridge to Angle */}
      {step === 3 && (
        <div className="card" style={{ padding: '24px', marginTop: 16, background: '#f0fdf4', borderColor: '#86efac' }}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: '2.5rem' }}>🎉 💎</span>
            <h3 className="font-heading" style={{ fontSize: '1.4rem', color: '#166534', marginTop: 8 }}>
              Kesimpulan Jembatan Menuju Sudut!
            </h3>
          </div>

          <div style={{ background: 'white', padding: '16px', borderRadius: 16, border: '1px solid #bbf7d0', marginBottom: 18 }}>
            <ul style={{ fontSize: '0.92rem', color: '#1f2937', paddingLeft: 20, lineHeight: 1.6 }}>
              <li><strong>Sisi:</strong> Garis pembatas lurus pada bangun datar.</li>
              <li><strong>Titik Sudut:</strong> Titik pertemuan antara dua sisi bangun datar.</li>
              <li><strong>Sudut:</strong> Ruang atau bukaan yang dibentuk oleh kedua sisi tersebut!</li>
            </ul>
          </div>

          <p style={{ textAlign: 'center', fontSize: '0.95rem', fontWeight: 700, color: '#15803d' }}>
            Selamat! Kamu berhasil mendapatkan <strong>Kristal Geometri</strong> dan Lencana <strong>Shape Explorer</strong>!
          </p>
        </div>
      )}

      {/* Navigation Controls */}
      <Navigation
        onPrev={step > 1 ? () => setStep(step - 1) : null}
        onNext={step === 2 && !highlightAngles ? null : handleNextStep}
        nextLabel={step === 3 ? 'Klaim Kristal & Selesai Misi 1' : 'Lanjut'}
        onMap={onBackToMap}
      />

      {/* Feedback Modal for Question */}
      <FeedbackModal
        isOpen={!!feedback}
        isCorrect={feedback?.isCorrect}
        userAnswer={feedback?.userAnswer}
        correctAnswer={feedback?.correctAnswer}
        explanation={feedback?.explanation}
        companion={companion}
        onNext={handleNextStep}
      />
    </div>
  );
};
