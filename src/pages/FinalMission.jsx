import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, ArrowRight, HelpCircle, Trophy, Sparkles } from 'lucide-react';
import { getFinalExamQuestions } from '../data/questions';
import { MascotSpeech } from '../components/Mascot';
import { ProgressBar } from '../components/ProgressBar';
import { QuestionCard } from '../components/QuestionCard';
import { FeedbackModal } from '../components/FeedbackModal';
import { soundEngine } from '../utils/soundEngine';

export const FinalMission = ({ onFinishExam, companion = 'kiki', studentName = 'Petualang' }) => {
  const [questions] = useState(() => getFinalExamQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [examScore, setExamScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [answeredMap, setAnsweredMap] = useState({});

  const currentQ = questions[currentIndex];

  const handleSelectOption = (option) => {
    setSelectedAnswer(option);

    const isCorrect = option === currentQ.correctAnswer;
    if (isCorrect) {
      soundEngine.playCorrect();
      setExamScore((prev) => prev + 10);
    } else {
      soundEngine.playIncorrect();
    }

    setAnsweredMap((prev) => ({
      ...prev,
      [currentQ.id]: { option, isCorrect }
    }));

    setFeedback({
      isCorrect,
      userAnswer: option,
      correctAnswer: currentQ.correctAnswer,
      explanation: currentQ.explanation
    });
  };

  const handleNextQuestion = () => {
    setFeedback(null);
    setSelectedAnswer(null);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Completed all 10 questions!
      soundEngine.playFanfare();
      try {
        confetti({
          particleCount: 140,
          spread: 90,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      onFinishExam(examScore, answeredMap);
    }
  };

  return (
    <div style={{ maxWidth: 840, margin: '0 auto' }}>
      {/* Quiz Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '2.2rem' }}>👑</span>
          <div>
            <h2 className="font-heading" style={{ fontSize: '1.45rem', color: '#0f172a', margin: 0 }}>
              Final Angle Challenge
            </h2>
            <span style={{ fontSize: '0.8rem', color: '#d97706', fontWeight: 700 }}>
              Ujian Akhir Master Sudut • 10 Soal Evaluasi Campuran
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fef3c7', padding: '8px 16px', borderRadius: 9999, border: '1.5px solid #fde68a' }}>
          <Sparkles size={18} className="text-amber-600" />
          <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#b45309' }}>
            Skor Ujian: {examScore} / 100
          </span>
        </div>
      </div>

      <MascotSpeech
        character={companion}
        name={companion === 'kiki' ? 'Kiki' : 'Lala'}
        pose="cheer"
        message={`Kamu hebat sudah menuntaskan 6 misi, ${studentName}! Jawab setiap soal dengan teliti ya. Jawaban benar bernilai +10 poin!`}
      />

      <div style={{ margin: '16px 0 20px' }}>
        <ProgressBar
          currentStep={currentIndex + 1}
          totalSteps={questions.length}
          label={`Kemajuan Ujian: Soal ${currentIndex + 1} dari ${questions.length}`}
        />
      </div>

      {/* Modular Question Card Component */}
      <QuestionCard
        questionData={currentQ}
        questionNumber={currentIndex + 1}
        totalQuestions={questions.length}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={handleSelectOption}
        isAnswered={!!feedback}
      />

      {/* Non-punitive Pedagogical Feedback Modal */}
      <FeedbackModal
        isOpen={!!feedback}
        isCorrect={feedback?.isCorrect}
        userAnswer={feedback?.userAnswer}
        correctAnswer={feedback?.correctAnswer}
        explanation={feedback?.explanation}
        companion={companion}
        onNext={handleNextQuestion}
      />
    </div>
  );
};
