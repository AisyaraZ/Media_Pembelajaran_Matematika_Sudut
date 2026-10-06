import React, { useState } from 'react';
import { Calculator, CheckCircle2, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { MascotSpeech } from '../components/Mascot';
import { Navigation } from '../components/Navigation';
import { FeedbackModal } from '../components/FeedbackModal';
import { soundEngine } from '../utils/soundEngine';

const MATH_LEVELS = [
  {
    level: 1,
    title: 'Level 1: Sudut Garis Lurus (180°)',
    question: 'Dua sudut berada pada sebuah garis lurus mendatar berjumlah 180°. Jika salah satu sudutnya sebesar 70°, berapakah besar sudut lainnya?',
    options: ['90°', '100°', '110°', '120°'],
    correctAnswer: '110°',
    explanation: 'Sudut garis lurus selalu bernilai 180°. Maka perhitungannya: 180° - 70° = 110°.',
    svgType: 'straight'
  },
  {
    level: 2,
    title: 'Level 2: Sudut Siku-Siku (90°)',
    question: 'Sebuah sudut siku-siku (90°) terbagi menjadi dua bagian. Jika bagian pertama sebesar 35°, berapakah besar bagian kedua?',
    options: ['45°', '55°', '65°', '145°'],
    correctAnswer: '55°',
    explanation: 'Sudut siku-siku bernilai 90°. Maka bagian kedua adalah: 90° - 35° = 55°.',
    svgType: 'right'
  },
  {
    level: 3,
    title: 'Level 3: Sudut Segitiga (180°)',
    question: 'Sebuah segitiga memiliki tiga sudut. Dua sudut di antaranya adalah 60° dan 70°. Berapakah besar sudut yang ketiga?',
    options: ['50°', '60°', '70°', '80°'],
    correctAnswer: '50°',
    explanation: 'Jumlah seluruh sudut di dalam segitiga adalah 180°. Maka: 180° - (60° + 70°) = 180° - 130° = 50°.',
    svgType: 'triangle'
  }
];

export const Mission5 = ({ onCompleteMission, onBackToMap, companion = 'kiki' }) => {
  const [levelIndex, setLevelIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const currentLevel = MATH_LEVELS[levelIndex];

  const handleSelectAnswer = (ans) => {
    soundEngine.playClick();
    const isCorrect = ans === currentLevel.correctAnswer;
    if (isCorrect) soundEngine.playCorrect();
    else soundEngine.playIncorrect();

    setFeedback({
      isCorrect,
      userAnswer: ans,
      correctAnswer: currentLevel.correctAnswer,
      explanation: currentLevel.explanation
    });
  };

  const handleNextLevel = () => {
    setFeedback(null);
    if (levelIndex < MATH_LEVELS.length - 1) {
      setLevelIndex(levelIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleClaimCrystal = () => {
    soundEngine.playFanfare();
    onCompleteMission(5, 'math-solver', 20);
  };

  return (
    <div style={{ maxWidth: 840, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: '1.8rem' }}>⚡</span>
        <div>
          <h2 className="font-heading" style={{ fontSize: '1.45rem', color: '#0f172a' }}>
            Misi 5: Menghitung Besar Sudut
          </h2>
          <span style={{ fontSize: '0.8rem', color: '#ec4899', fontWeight: 700 }}>
            Wilayah Lembah Hitung Cepat • Sudut Berpelurus &amp; Berpenyiku
          </span>
        </div>
      </div>

      <MascotSpeech
        character={companion}
        name={companion === 'kiki' ? 'Kiki' : 'Lala'}
        pose={isFinished ? 'cheer' : 'think'}
        message={
          !isFinished
            ? `Mari kita selesaikan ${currentLevel.title}! Gunakan rumus selisih pengurangan yang mudah.`
            : 'Hebat sekali! Semua perhitungan sudut garis lurus dan siku-siku berhasil kamu selesaikan dengan mulus!'
        }
      />

      <div className="card" style={{ padding: 24, marginTop: 16 }}>
        {!isFinished ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ec4899' }}>
                Level {currentLevel.level} dari {MATH_LEVELS.length}
              </span>
              <span style={{ fontSize: '0.82rem', background: '#fdf2f8', padding: '3px 10px', borderRadius: 9999, fontWeight: 700, color: '#db2777' }}>
                Kalkulasi Langkah demi Langkah
              </span>
            </div>

            {/* Visual Helper SVG */}
            <div style={{ background: '#f8fafc', borderRadius: 16, padding: 14, textAlign: 'center', border: '1px solid #e2e8f0', marginBottom: 18 }}>
              {currentLevel.svgType === 'straight' && (
                <svg width="280" height="90" viewBox="0 0 280 90">
                  <line x1="20" y1="70" x2="260" y2="70" stroke="#0f172a" strokeWidth="4" />
                  <line x1="140" y1="70" x2="200" y2="15" stroke="#ec4899" strokeWidth="4" />
                  <circle cx="140" cy="70" r="5" fill="#f43f5e" />
                  {/* Arcs */}
                  <path d="M 170 70 A 30 30 0 0 0 155 45" fill="none" stroke="#0284c7" strokeWidth="2.5" />
                  <text x="175" y="55" fill="#0369a1" fontSize="12" fontWeight="bold">70°</text>
                  <path d="M 110 70 A 30 30 0 0 1 130 35" fill="none" stroke="#ec4899" strokeWidth="2.5" />
                  <text x="100" y="55" fill="#db2777" fontSize="12" fontWeight="bold">? °</text>
                </svg>
              )}
              {currentLevel.svgType === 'right' && (
                <svg width="220" height="110" viewBox="0 0 220 110">
                  <line x1="50" y1="90" x2="190" y2="90" stroke="#0f172a" strokeWidth="4" />
                  <line x1="50" y1="90" x2="50" y2="10" stroke="#0f172a" strokeWidth="4" />
                  <line x1="50" y1="90" x2="150" y2="35" stroke="#ec4899" strokeWidth="4" />
                  <circle cx="50" cy="90" r="5" fill="#f43f5e" />
                  <rect x="50" y="78" width="12" height="12" fill="none" stroke="#64748b" strokeWidth="1.5" />
                  <text x="100" y="75" fill="#0369a1" fontSize="12" fontWeight="bold">35°</text>
                  <text x="65" y="45" fill="#db2777" fontSize="12" fontWeight="bold">? °</text>
                </svg>
              )}
              {currentLevel.svgType === 'triangle' && (
                <svg width="240" height="110" viewBox="0 0 240 110">
                  <polygon points="40,90 200,90 130,20" fill="#fce7f3" stroke="#db2777" strokeWidth="3" />
                  <text x="65" y="82" fill="#0369a1" fontSize="11" fontWeight="bold">60°</text>
                  <text x="165" y="82" fill="#0369a1" fontSize="11" fontWeight="bold">70°</text>
                  <text x="125" y="45" fill="#db2777" fontSize="12" fontWeight="bold">? °</text>
                </svg>
              )}
            </div>

            <h3 className="font-heading" style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: 16 }}>
              {currentLevel.question}
            </h3>

            {/* Answer Options */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12 }}>
              {currentLevel.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelectAnswer(opt)}
                  className="btn btn-outline btn-lg"
                  style={{ fontSize: '1.1rem' }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 10px' }}>
            <span style={{ fontSize: '3rem' }}>🎉 💎 ⚡</span>
            <h3 className="font-heading" style={{ fontSize: '1.45rem', color: '#166534', marginTop: 10, marginBottom: 8 }}>
              Keahlian Berhitung Sudut Terbukti!
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#475569', maxWidth: 460, margin: '0 auto 20px' }}>
              Kamu menguasai pengurangan sudut 180° dan 90° dengan sangat tangkas. Kristal Perhitungan siap kamu miliki!
            </p>
            <button
              onClick={handleClaimCrystal}
              className="btn btn-primary btn-lg"
            >
              Klaim Kristal Perhitungan &amp; Selesai Misi 5
            </button>
          </div>
        )}
      </div>

      <Navigation
        onPrev={onBackToMap}
        prevLabel="Peta Misi"
        onNext={isFinished ? handleClaimCrystal : null}
        nextLabel="Klaim Kristal Misi 5"
        onMap={onBackToMap}
      />

      <FeedbackModal
        isOpen={!!feedback}
        isCorrect={feedback?.isCorrect}
        userAnswer={feedback?.userAnswer}
        correctAnswer={feedback?.correctAnswer}
        explanation={feedback?.explanation}
        companion={companion}
        onNext={handleNextLevel}
      />
    </div>
  );
};
