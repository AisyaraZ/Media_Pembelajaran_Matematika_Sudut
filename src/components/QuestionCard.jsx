import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, Sparkles, Lightbulb } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export const QuestionCard = ({
  questionData,
  questionNumber = 1,
  totalQuestions = 10,
  selectedAnswer = null,
  onSelectAnswer,
  isAnswered = false
}) => {
  const [showTip, setShowTip] = useState(false);

  if (!questionData) return null;

  const {
    id,
    question,
    options = [],
    category = 'umum',
    tip,
    explanation,
    svgType
  } = questionData;

  const handleChoose = (opt) => {
    if (isAnswered) return;
    soundEngine.playClick();
    onSelectAnswer(opt);
  };

  const categoryLabels = {
    recall: { label: 'Recall Bangun Datar', color: '#0284c7', bg: '#e0f2fe' },
    types: { label: 'Macam-Macam Sudut', color: '#d97706', bg: '#fef3c7' },
    measurement: { label: 'Pengukuran Sudut', color: '#8b5cf6', bg: '#ede9fe' },
    calculation: { label: 'Hitung Sudut', color: '#db2777', bg: '#fce7f3' },
    pbl: { label: 'Tantangan PBL Nyata', color: '#059669', bg: '#d1fae5' }
  };

  const badgeInfo = categoryLabels[category] || { label: 'Latihan Sudut', color: '#0d9488', bg: '#ccfbf1' };

  return (
    <div className="card" style={{ padding: '24px', position: 'relative' }}>
      {/* Top Meta Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: badgeInfo.color,
              background: badgeInfo.bg,
              padding: '4px 10px',
              borderRadius: 9999
            }}
          >
            {badgeInfo.label}
          </span>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#64748b' }}>
            Soal {questionNumber} dari {totalQuestions}
          </span>
        </div>

        {tip && (
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              setShowTip(!showTip);
            }}
            className="btn btn-outline btn-sm"
            style={{ padding: '4px 10px', fontSize: '0.78rem', color: '#b45309', borderColor: '#fde68a', background: '#fef3c7' }}
          >
            <Lightbulb size={14} className="text-amber-600" />
            <span>{showTip ? 'Tutup Petunjuk' : 'Petunjuk Cilik'}</span>
          </button>
        )}
      </div>

      {/* Tip Banner if opened */}
      {showTip && tip && (
        <div
          style={{
            background: '#fffbeb',
            border: '1px solid #fde68a',
            borderRadius: 14,
            padding: '10px 14px',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>💡</span>
          <span style={{ fontSize: '0.85rem', color: '#92400e', lineHeight: 1.4 }}>
            <strong>Petunjuk:</strong> {tip}
          </span>
        </div>
      )}

      {/* Question Text */}
      <h3
        className="font-heading"
        style={{
          fontSize: '1.25rem',
          color: '#0f172a',
          lineHeight: 1.5,
          marginBottom: 18
        }}
      >
        {question}
      </h3>

      {/* Options List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {options.map((opt, idx) => {
          const letter = String.fromCharCode(65 + idx);
          const isSelected = selectedAnswer === opt;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleChoose(opt)}
              disabled={isAnswered}
              className="btn btn-outline"
              style={{
                padding: '14px 16px',
                textAlign: 'left',
                justifyContent: 'flex-start',
                fontSize: '0.96rem',
                borderWidth: isSelected ? 3 : 2,
                borderColor: isSelected ? '#0d9488' : '#e2e8f0',
                background: isSelected ? '#f0fdf4' : 'white',
                borderRadius: 16,
                transition: 'all 0.15s ease',
                cursor: isAnswered ? 'default' : 'pointer',
                opacity: isAnswered && !isSelected ? 0.7 : 1
              }}
            >
              <span
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 9999,
                  background: isSelected ? '#0d9488' : '#f1f5f9',
                  color: isSelected ? 'white' : '#475569',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  marginRight: 12,
                  flexShrink: 0
                }}
              >
                {letter}
              </span>
              <span style={{ fontWeight: isSelected ? 700 : 500, color: '#1e293b' }}>
                {opt}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
