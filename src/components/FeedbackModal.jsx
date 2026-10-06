import React from 'react';
import { CheckCircle2, ArrowRight, BookOpen, Lightbulb, Sparkles } from 'lucide-react';
import { MascotFullBody } from './Mascot';
import { soundEngine } from '../utils/soundEngine';

export const FeedbackModal = ({
  isOpen,
  isCorrect,
  userAnswer,
  correctAnswer,
  explanation,
  companion = 'kiki',
  onNext
}) => {
  if (!isOpen) return null;

  const handleNextClick = () => {
    soundEngine.playClick();
    onNext();
  };

  return (
    <div className="modal-overlay">
      <div
        className="modal-content animate-float"
        style={{
          maxWidth: 520,
          textAlign: 'center',
          borderColor: isCorrect ? '#10b981' : '#f59e0b',
          borderWidth: 3,
          borderRadius: 24,
          padding: '24px 20px'
        }}
      >
        {/* Full Body Mascot with Contextual Pose */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
          <div style={{ position: 'relative' }}>
            <MascotFullBody
              character={companion}
              pose={isCorrect ? 'cheer' : 'think'}
              emotion={isCorrect ? 'celebrating' : 'thinking'}
              size={120}
              interactive={true}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 10,
                right: -6,
                background: isCorrect ? '#10B981' : '#F59E0B',
                color: 'white',
                borderRadius: 9999,
                padding: 6,
                boxShadow: '0 3px 8px rgba(0,0,0,0.2)'
              }}
            >
              {isCorrect ? <CheckCircle2 size={24} /> : <Lightbulb size={24} />}
            </div>
          </div>
        </div>

        {/* Positive Encouraging Heading */}
        <h3
          className="font-heading"
          style={{
            fontSize: '1.5rem',
            color: isCorrect ? '#0f766e' : '#b45309',
            marginBottom: 4
          }}
        >
          {isCorrect ? '🎉 Hebat! Kamu Berhasil!' : '💡 Hampir Benar! Yuk Coba Lagi!'}
        </h3>
        <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: 16 }}>
          {isCorrect
            ? 'Jawabanmu tepat sekali! Kamu mendapatkan +10 Poin tambahan.'
            : 'Belajar matematika adalah proses mencoba! Mari kita pelajari caranya bersama-sama:'}
        </p>

        {/* Answers Comparison Box */}
        <div
          style={{
            background: isCorrect ? '#f0fdf4' : '#fffbeb',
            border: `1.5px solid ${isCorrect ? '#86efac' : '#fde68a'}`,
            borderRadius: 16,
            padding: '12px 16px',
            fontSize: '0.92rem',
            textAlign: 'left',
            marginBottom: 16
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, flexWrap: 'wrap', gap: 6 }}>
            <span style={{ color: '#475569' }}>
              Pilihanmu: <strong style={{ color: isCorrect ? '#15803d' : '#b91c1c' }}>{userAnswer || '-'}</strong>
            </span>
            <span style={{ color: '#15803d', fontWeight: 800 }}>
              Kunci Benar: {correctAnswer}
            </span>
          </div>
        </div>

        {/* Pedagogical Explanation Box */}
        <div
          style={{
            background: '#f8fafc',
            border: '2px solid #e2e8f0',
            borderRadius: 16,
            padding: '14px 18px',
            textAlign: 'left',
            marginBottom: 20
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <BookOpen size={18} className="text-teal-600" />
            <strong style={{ fontSize: '0.92rem', color: '#0f766e' }}>
              Penjelasan &amp; Cara Berpikir:
            </strong>
          </div>
          <p style={{ fontSize: '0.92rem', color: '#334155', lineHeight: 1.5, margin: 0 }}>
            {explanation}
          </p>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNextClick}
          className="btn btn-primary btn-lg"
          style={{ width: '100%', gap: 10, fontSize: '1.1rem', borderRadius: 18 }}
        >
          <span>Lanjut ke Tantangan Berikutnya</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};
