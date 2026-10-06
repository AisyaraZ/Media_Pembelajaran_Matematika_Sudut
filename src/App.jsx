import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, X } from 'lucide-react';
import { loadAppData, saveAppData, resetProgress } from './utils/storage';
import { soundEngine } from './utils/soundEngine';
import { BADGES } from './data/badges';

// Components
import { Header } from './components/Header';

// Pages
import { Home } from './pages/Home';
import { NameInput } from './pages/NameInput';
import { Introduction } from './pages/Introduction';
import { MissionMap } from './pages/MissionMap';
import { Mission1 } from './pages/Mission1';
import { Mission2 } from './pages/Mission2';
import { Mission3 } from './pages/Mission3';
import { Mission4 } from './pages/Mission4';
import { Mission5 } from './pages/Mission5';
import { Mission6 } from './pages/Mission6';
import { FinalMission } from './pages/FinalMission';
import { Result } from './pages/Result';
import { Review } from './pages/Review';
import { CertificatePage } from './pages/CertificatePage';
import { TeacherMode } from './pages/TeacherMode';

export default function App() {
  const [appData, setAppData] = useState(() => loadAppData());
  const [currentPage, setCurrentPage] = useState('home');
  const [unlockedBadge, setUnlockedBadge] = useState(null);

  // Synchronize audio settings on mount
  useEffect(() => {
    soundEngine.setSettings(appData.audioSettings);
  }, []);

  // Persist appData changes
  const updateData = (newData) => {
    setAppData(newData);
    saveAppData(newData);
  };

  const handleUpdateAudioSettings = (newAudioSettings) => {
    updateData({ ...appData, audioSettings: newAudioSettings });
  };

  const handleReset = () => {
    resetProgress();
    const fresh = loadAppData();
    setAppData(fresh);
    setCurrentPage('home');
    soundEngine.stopBGM();
  };

  // Badge Celebration Popup Handler
  const triggerBadgeUnlock = (badgeId) => {
    const badge = BADGES.find((b) => b.id === badgeId);
    if (badge) {
      setUnlockedBadge(badge);
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.5 }
        });
      } catch (e) { }
    }
  };

  // Complete Mission handler
  const handleCompleteMission = (missionId, badgeId, pointsToAdd = 20) => {
    const isAlreadyCompleted = appData.completedMissions.includes(missionId);
    const updatedCompleted = isAlreadyCompleted
      ? appData.completedMissions
      : [...appData.completedMissions, missionId];

    const updatedBadges = appData.badges.includes(badgeId)
      ? appData.badges
      : [...appData.badges, badgeId];

    const updatedScore = isAlreadyCompleted ? appData.score : appData.score + pointsToAdd;

    updateData({
      ...appData,
      completedMissions: updatedCompleted,
      badges: updatedBadges,
      score: updatedScore
    });

    if (!isAlreadyCompleted) {
      triggerBadgeUnlock(badgeId);
    }

    setCurrentPage('mission-map');
  };

  // Final Exam finish handler
  const handleFinishExam = (finalExamScore, answers) => {
    const updatedCompleted = appData.completedMissions.includes('final')
      ? appData.completedMissions
      : [...appData.completedMissions, 'final'];

    const updatedBadges = appData.badges.includes('master-adventure')
      ? appData.badges
      : [...appData.badges, 'master-adventure'];

    const newTotal = appData.score + finalExamScore;

    updateData({
      ...appData,
      score: newTotal,
      completedMissions: updatedCompleted,
      badges: updatedBadges,
      quizAnswers: answers
    });

    triggerBadgeUnlock('master-adventure');
    setCurrentPage('result');
  };

  // Save Student Review
  const handleSaveReview = (reviewData) => {
    updateData({
      ...appData,
      review: reviewData
    });
  };

  // Navigation router
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home
            studentName={appData.studentName}
            onStart={() => {
              if (appData.studentName) {
                setCurrentPage('mission-map');
              } else {
                setCurrentPage('name-input');
              }
            }}
            onOpenTeacher={() => setCurrentPage('teacher')}
          />
        );

      case 'name-input':
        return (
          <NameInput
            initialName={appData.studentName}
            initialCompanion={appData.companion}
            onSubmitName={(name, companion) => {
              updateData({ ...appData, studentName: name, companion });
              setCurrentPage('introduction');
            }}
          />
        );

      case 'introduction':
        return (
          <Introduction
            studentName={appData.studentName}
            companion={appData.companion}
            onProceedToMap={() => setCurrentPage('mission-map')}
          />
        );

      case 'mission-map':
        return (
          <MissionMap
            studentName={appData.studentName}
            companion={appData.companion}
            score={appData.score}
            completedMissions={appData.completedMissions}
            onSelectMission={(missionKey) => setCurrentPage(missionKey)}
          />
        );

      case 'mission-1':
        return (
          <Mission1
            companion={appData.companion}
            onBackToMap={() => setCurrentPage('mission-map')}
            onCompleteMission={handleCompleteMission}
          />
        );

      case 'mission-2':
        return (
          <Mission2
            companion={appData.companion}
            onBackToMap={() => setCurrentPage('mission-map')}
            onCompleteMission={handleCompleteMission}
          />
        );

      case 'mission-3':
        return (
          <Mission3
            companion={appData.companion}
            onBackToMap={() => setCurrentPage('mission-map')}
            onCompleteMission={handleCompleteMission}
          />
        );

      case 'mission-4':
        return (
          <Mission4
            companion={appData.companion}
            onBackToMap={() => setCurrentPage('mission-map')}
            onCompleteMission={handleCompleteMission}
          />
        );

      case 'mission-5':
        return (
          <Mission5
            companion={appData.companion}
            onBackToMap={() => setCurrentPage('mission-map')}
            onCompleteMission={handleCompleteMission}
          />
        );

      case 'mission-6':
        return (
          <Mission6
            companion={appData.companion}
            onBackToMap={() => setCurrentPage('mission-map')}
            onCompleteMission={handleCompleteMission}
          />
        );

      case 'final-mission':
        return (
          <FinalMission
            studentName={appData.studentName}
            companion={appData.companion}
            onFinishExam={handleFinishExam}
          />
        );

      case 'result':
        return (
          <Result
            studentName={appData.studentName}
            score={appData.score}
            completedMissions={appData.completedMissions}
            companion={appData.companion}
            onGoToReview={() => setCurrentPage('review')}
            onGoToCertificate={() => setCurrentPage('certificate')}
          />
        );

      case 'review':
        return (
          <Review
            studentName={appData.studentName}
            companion={appData.companion}
            onSubmitReview={handleSaveReview}
            onGoToCertificate={() => setCurrentPage('certificate')}
          />
        );

      case 'certificate':
        return (
          <CertificatePage
            studentName={appData.studentName}
            score={appData.score}
            companion={appData.companion}
            onBackToHome={() => setCurrentPage('home')}
          />
        );

      case 'teacher':
        return (
          <TeacherMode
            appData={appData}
            onBack={() => setCurrentPage('home')}
            onResetData={handleReset}
          />
        );

      default:
        return <Home onStart={() => setCurrentPage('name-input')} />;
    }
  };

  return (
    <div className="app-container">
      {/* Global Header */}
      <Header
        appData={appData}
        onNavigate={(page) => setCurrentPage(page)}
        onUpdateSettings={handleUpdateAudioSettings}
        onReset={handleReset}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {renderCurrentPage()}
      </main>

      {/* Badge Unlock Celebration Modal */}
      {unlockedBadge && (
        <div className="modal-overlay" onClick={() => setUnlockedBadge(null)}>
          <div
            className="modal-content animate-float"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 420, textAlign: 'center', borderColor: unlockedBadge.color }}
          >
            <div style={{ fontSize: '3.5rem', marginBottom: 10 }}>{unlockedBadge.icon}</div>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: unlockedBadge.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Lencana Baru Terbuka!
            </span>
            <h3 className="font-heading" style={{ fontSize: '1.45rem', color: '#0f172a', margin: '4px 0 10px' }}>
              {unlockedBadge.title}
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: 20 }}>
              {unlockedBadge.description}
            </p>
            <button
              onClick={() => {
                soundEngine.playClick();
                setUnlockedBadge(null);
              }}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              <CheckCircle2 size={18} />
              <span>Simpan Lencana &amp; Lanjut</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
