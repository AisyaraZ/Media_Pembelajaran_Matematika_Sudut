import React, { useState } from 'react';
import { Trees, CheckCircle2, Sparkles, Building2, Compass, Layers } from 'lucide-react';
import { MascotSpeech } from '../components/Mascot';
import { Navigation } from '../components/Navigation';
import { FeedbackModal } from '../components/FeedbackModal';
import { soundEngine } from '../utils/soundEngine';

const PBL_CHALLENGES = [
  {
    id: 1,
    title: 'Tantangan 1: Tiang Gerbang Utama Taman',
    scenario: 'Kiki dan Lala sedang membangun tiang gerbang utama taman. Agar gerbang berdiri kokoh, aman, dan tidak miring roboh menimpa pengunjung, sudut berapakah yang harus dibuat antara tiang tegak dan permukaan tanah?',
    options: ['45° (Sudut Lancip)', '90° (Sudut Siku-Siku)', '135° (Sudut Tumpul)', '180° (Sudut Lurus)'],
    correctAnswer: '90° (Sudut Siku-Siku)',
    explanation: 'Tiang gerbang harus dipasang tegak lurus 90° (sudut siku-siku) agar memiliki keseimbangan gravitasi terbaik dan tidak mudah runtuh.',
    icon: '⛩️'
  },
  {
    id: 2,
    title: 'Tantangan 2: Persimpangan Jalan Setapak',
    scenario: 'Dua jalan setapak di dalam taman dirancang bertemu dengan bukaan lebar 120° agar siswa dan guru dapat berpapasan dengan leluasa tanpa bertabrakan. Termasuk jenis sudut apakah persimpangan 120° ini?',
    options: ['Sudut Lancip', 'Sudut Siku-Siku', 'Sudut Tumpul', 'Sudut Lurus'],
    correctAnswer: 'Sudut Tumpul',
    explanation: 'Karena 120° lebih besar dari 90° dan kurang dari 180°, persimpangan jalan ini membentuk sudut tumpul yang luas dan nyaman dilalui.',
    icon: '🛤️'
  },
  {
    id: 3,
    title: 'Tantangan 3: Kemiringan Atap Gazebo Taman',
    scenario: 'Atap gazebo dirancang miring dengan sudut 40° terhadap tiang penyangga agar air hujan cepat mengalir dan tidak menggenang di atas atap. Jenis sudut kemiringan atap tersebut adalah...',
    options: ['Sudut Lancip', 'Sudut Siku-Siku', 'Sudut Tumpul', 'Sudut Refleks'],
    correctAnswer: 'Sudut Lancip',
    explanation: 'Sudut 40° lebih kecil dari 90°, menjadikannya sudut lancip yang efektif mengalirkan air hujan ke talang air.',
    icon: '🛖'
  }
];

export const Mission6 = ({ onCompleteMission, onBackToMap, companion = 'kiki' }) => {
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentTask = PBL_CHALLENGES[challengeIdx];

  const handleSelectAnswer = (ans) => {
    soundEngine.playClick();
    const isCorrect = ans === currentTask.correctAnswer;
    if (isCorrect) soundEngine.playCorrect();
    else soundEngine.playIncorrect();

    setFeedback({
      isCorrect,
      userAnswer: ans,
      correctAnswer: currentTask.correctAnswer,
      explanation: currentTask.explanation
    });
  };

  const handleNextChallenge = () => {
    setFeedback(null);
    if (challengeIdx < PBL_CHALLENGES.length - 1) {
      setChallengeIdx(challengeIdx + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleFinishMission = () => {
    soundEngine.playFanfare();
    onCompleteMission(6, 'pbl-architect', 25);
  };

  return (
    <div style={{ maxWidth: 840, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: '1.8rem' }}>🌿</span>
        <div>
          <h2 className="font-heading" style={{ fontSize: '1.45rem', color: '#0f172a' }}>
            Misi 6: Proyek PBL Desain Taman Sekolah
          </h2>
          <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700 }}>
            Wilayah Arsitektur Hijau • Penerapan Konsep Sudut dalam Kehidupan Nyata
          </span>
        </div>
      </div>

      <MascotSpeech
        character={companion}
        name={companion === 'kiki' ? 'Kiki' : 'Lala'}
        pose={isCompleted ? 'cheer' : 'point'}
        message={
          !isCompleted
            ? `Proyek PBL dimulai! Mari bantu kami menentukan sudut yang pas untuk pembangunan elemen taman sekolah (${challengeIdx + 1} dari 3)!`
            : 'Luar biasa! Desain Taman Sekolah selesai dengan tata letak sudut yang kokoh, rapi, dan estetis! Seluruh 6 Kristal berhasil kamu kumpulkan!'
        }
      />

      <div className="card" style={{ padding: 24, marginTop: 16 }}>
        {!isCompleted ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#059669' }}>
                Bagian Desain {challengeIdx + 1} dari {PBL_CHALLENGES.length}
              </span>
              <span style={{ fontSize: '0.82rem', background: '#d1fae5', padding: '3px 10px', borderRadius: 9999, fontWeight: 700, color: '#047857' }}>
                Studi Kasus PBL Nyata
              </span>
            </div>

            {/* Simulated Architectural Blue-Print Card */}
            <div style={{ background: '#f0fdf4', border: '2px dashed #86efac', borderRadius: 16, padding: '18px 20px', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: '2rem' }}>{currentTask.icon}</span>
                <h3 className="font-heading" style={{ fontSize: '1.2rem', color: '#14532d', margin: 0 }}>
                  {currentTask.title}
                </h3>
              </div>
              <p style={{ fontSize: '0.92rem', color: '#166534', lineHeight: 1.55 }}>
                {currentTask.scenario}
              </p>
            </div>

            <div style={{ marginBottom: 14 }}>
              <strong style={{ fontSize: '0.95rem', color: '#1e293b' }}>Keputusan Arsitek Cilik:</strong>
            </div>

            {/* Decision Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              {currentTask.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelectAnswer(opt)}
                  className="btn btn-outline"
                  style={{ padding: '14px 18px', textAlign: 'left', justifyContent: 'flex-start' }}
                >
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{opt}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          /* Finished Garden Blueprint celebration */
          <div style={{ textAlign: 'center', padding: '24px 12px' }}>
            <span style={{ fontSize: '3.5rem' }}>🌳 🏛️ 💎 🌺</span>
            <h3 className="font-heading" style={{ fontSize: '1.5rem', color: '#166534', marginTop: 12, marginBottom: 8 }}>
              Karya Desain Taman Sekolah Sukses Terwujud!
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#334155', maxWidth: 520, margin: '0 auto 20px', lineHeight: 1.5 }}>
              Kamu telah membuktikan bahwa pemahaman sudut sangat penting untuk membuat struktur yang seimbang, aman, dan indah di kehidupan nyata!
            </p>

            <button
              onClick={handleFinishMission}
              className="btn btn-primary btn-lg"
              style={{ minWidth: 260 }}
            >
              Klaim Kristal Karya Arsitek &amp; Buka Final Challenge!
            </button>
          </div>
        )}
      </div>

      <Navigation
        onPrev={onBackToMap}
        prevLabel="Peta Misi"
        onNext={isCompleted ? handleFinishMission : null}
        nextLabel="Klaim Kristal Misi 6"
        onMap={onBackToMap}
      />

      <FeedbackModal
        isOpen={!!feedback}
        isCorrect={feedback?.isCorrect}
        userAnswer={feedback?.userAnswer}
        correctAnswer={feedback?.correctAnswer}
        explanation={feedback?.explanation}
        companion={companion}
        onNext={handleNextChallenge}
      />
    </div>
  );
};
