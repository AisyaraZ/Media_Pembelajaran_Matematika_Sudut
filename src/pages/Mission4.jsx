import React, { useState } from 'react';
import { Target, Film, Compass, CheckCircle2 } from 'lucide-react';
import { MascotSpeech } from '../components/Mascot';
import { Navigation } from '../components/Navigation';
import { ProtractorTool } from '../components/ProtractorTool';
import { VideoPlayer } from '../components/VideoPlayer';
import { FeedbackModal } from '../components/FeedbackModal';
import { soundEngine } from '../utils/soundEngine';

export const Mission4 = ({ onCompleteMission, onBackToMap, companion = 'kiki' }) => {
  const [activeTab, setActiveTab] = useState('video'); // 'video' or 'protractor' or 'practice'
  const [practiceAnswer, setPracticeAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [practiceDone, setPracticeDone] = useState(false);

  const handlePracticeSubmit = (targetDegree) => {
    soundEngine.playClick();
    const isCorrect = targetDegree === 60;
    if (isCorrect) soundEngine.playCorrect();
    else soundEngine.playIncorrect();

    setFeedback({
      isCorrect,
      userAnswer: `${targetDegree}°`,
      correctAnswer: '60°',
      explanation: 'Kaki sudut pertama berada di garis dasar 0°, dan kaki kedua menunjuk tepat pada angka skala 60°. Maka besar sudut tersebut adalah 60° (sudut lancip).'
    });
  };

  const handleFinish = () => {
    soundEngine.playFanfare();
    onCompleteMission(4, 'angle-reader', 20);
  };

  return (
    <div style={{ maxWidth: 840, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <span style={{ fontSize: '1.8rem' }}>🎯</span>
        <div>
          <h2 className="font-heading" style={{ fontSize: '1.45rem', color: '#0f172a' }}>
            Misi 4: Menentukan &amp; Mengukur Besar Sudut
          </h2>
          <span style={{ fontSize: '0.8rem', color: '#8b5cf6', fontWeight: 700 }}>
            Wilayah Lembah Pengukuran • Video Pembelajaran &amp; Busur Derajat
          </span>
        </div>
      </div>

      <MascotSpeech
        character={companion}
        name={companion === 'kiki' ? 'Kiki' : 'Lala'}
        message={
          activeTab === 'video'
            ? 'Yuk tonton video singkat pembelajaran sudut di bawah ini! Setelah itu kita akan berlatih memegang busur derajat virtual.'
            : activeTab === 'protractor'
            ? 'Cobalah geser busur derajat ini untuk melihat bagaimana sudut lancip, siku-siku, dan tumpul terbentuk secara nyata!'
            : 'Perhatikan gambar sudut misterius di bawah! Berapakah besar derajat sudut yang ditunjukkan oleh busur?'
        }
      />

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, margin: '16px 0', flexWrap: 'wrap' }}>
        <button
          onClick={() => {
            soundEngine.playClick();
            setActiveTab('video');
          }}
          className={`btn ${activeTab === 'video' ? 'btn-primary' : 'btn-outline'}`}
          style={{ flex: 1, minWidth: 160 }}
        >
          <Film size={16} />
          <span>1. Tonton Video Lagu Sudut</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            setActiveTab('protractor');
          }}
          className={`btn ${activeTab === 'protractor' ? 'btn-primary' : 'btn-outline'}`}
          style={{ flex: 1, minWidth: 160 }}
        >
          <Compass size={16} />
          <span>2. Eksplorasi Busur Derajat</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            setActiveTab('practice');
          }}
          className={`btn ${activeTab === 'practice' ? 'btn-accent' : 'btn-outline'}`}
          style={{ flex: 1, minWidth: 160 }}
        >
          <Target size={16} />
          <span>3. Ayo Coba Pengukuran!</span>
        </button>
      </div>

      {/* TAB 1: YOUTUBE VIDEO */}
      {activeTab === 'video' && (
        <div style={{ marginTop: 12 }}>
          <VideoPlayer companion={companion} />
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('protractor');
              }}
              className="btn btn-primary"
              style={{ borderRadius: 16 }}
            >
              <span>Lanjut ke Eksplorasi Busur Derajat</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: PROTRACTOR SIMULATOR */}
      {activeTab === 'protractor' && (
        <div className="card" style={{ padding: 20 }}>
          <ProtractorTool interactive={true} targetAngle={60} />
        </div>
      )}

      {/* TAB 3: PRACTICE QUESTION */}
      {activeTab === 'practice' && (
        <div className="card" style={{ padding: 24 }}>
          <h3 className="font-heading" style={{ fontSize: '1.25rem', color: '#0f766e', marginBottom: 12 }}>
            Tantangan: Berapa Besar Sudut Ini?
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: 16 }}>
            Perhatikan busur derajat di bawah. Kaki sudut membentang dari titik 0° ke angka tertentu. Pilih besar sudut yang tepat:
          </p>

          <ProtractorTool interactive={false} targetAngle={60} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10, marginTop: 20 }}>
            {[30, 60, 90, 120].map((deg) => (
              <button
                key={deg}
                onClick={() => handlePracticeSubmit(deg)}
                className="btn btn-outline btn-lg"
              >
                {deg}°
              </button>
            ))}
          </div>

          {practiceDone && (
            <div style={{ background: '#f0fdf4', padding: '14px', borderRadius: 14, border: '1px solid #86efac', textAlign: 'center', marginTop: 16 }}>
              <p style={{ color: '#166534', fontWeight: 700 }}>
                🎉 Hebat! Kamu sudah menguasai cara membaca busur derajat!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <Navigation
        onPrev={onBackToMap}
        prevLabel="Peta Misi"
        onNext={
          activeTab === 'video'
            ? () => setActiveTab('protractor')
            : activeTab === 'protractor'
            ? () => setActiveTab('practice')
            : practiceDone
            ? handleFinish
            : null
        }
        nextLabel={practiceDone ? 'Klaim Kristal Misi 4' : 'Lanjut'}
        onMap={onBackToMap}
      />

      <FeedbackModal
        isOpen={!!feedback}
        isCorrect={feedback?.isCorrect}
        userAnswer={feedback?.userAnswer}
        correctAnswer={feedback?.correctAnswer}
        explanation={feedback?.explanation}
        companion={companion}
        onNext={() => {
          setFeedback(null);
          setPracticeDone(true);
        }}
      />
    </div>
  );
};
