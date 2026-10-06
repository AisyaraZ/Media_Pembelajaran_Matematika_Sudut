import React, { useState } from 'react';
import { Lock, CheckCircle2, Play, Award, Sparkles, Star, ChevronRight, AlertTriangle, Unlock } from 'lucide-react';
import { MISSIONS } from '../data/missions';
import { BADGES } from '../data/badges';
import { ProgressBar } from '../components/ProgressBar';
import { MascotSpeech, MascotAvatar } from '../components/Mascot';
import { soundEngine } from '../utils/soundEngine';

export const MissionMap = ({
  completedMissions = [],
  onSelectMission,
  studentName = 'Petualang',
  companion = 'kiki',
  score = 0
}) => {
  const [lockedPrompt, setLockedPrompt] = useState(null);
  const [teacherOverride, setTeacherOverride] = useState(false);

  const isMissionUnlocked = (index) => {
    if (teacherOverride) return true;
    if (index === 0) return true; // Mission 1 is always open
    const prevMissionId = MISSIONS[index - 1].id;
    return completedMissions.includes(prevMissionId);
  };

  const isFinalUnlocked = () => {
    if (teacherOverride) return true;
    return MISSIONS.every((m) => completedMissions.includes(m.id));
  };

  const isFinalCompleted = completedMissions.includes('final');

  const handleMissionClick = (mission, index) => {
    const unlocked = isMissionUnlocked(index);
    if (unlocked) {
      soundEngine.playClick();
      onSelectMission(mission.key);
    } else {
      soundEngine.playIncorrect();
      const prevMission = MISSIONS[index - 1];
      setLockedPrompt({
        title: mission.title,
        requiredMission: prevMission.title
      });
    }
  };

  const completedCount = completedMissions.filter((m) => typeof m === 'number').length;

  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <MascotSpeech
        character={companion}
        name={companion === 'kiki' ? 'Kiki' : 'Lala'}
        message={`Peta Ekspedisi Dunia Sudut sudah terbuka, ${studentName}! Selesaikan misi secara berurutan untuk mengumpulkan ke-6 Kristal Sudut legendaris!`}
      />

      {/* Progress & Stat Banner */}
      <div className="card" style={{ padding: '20px 24px', marginBottom: 24, background: 'linear-gradient(135deg, #ffffff, #f0fdf4)' }}>
        <ProgressBar
          currentStep={completedCount}
          totalSteps={6}
          label="Progres Kristal Sudut yang Terkumpul"
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, borderTop: '1px solid #e2e8f0', paddingTop: 12, marginTop: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: '1.4rem' }}>💎</span>
            <div>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f766e', display: 'block' }}>
                {completedCount} dari 6 Kristal Ditemukan
              </span>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                {completedCount === 6 ? 'Semua Kristal Lengkap! Final Challenge Terbuka!' : 'Selesaikan misi selanjutnya untuk kristal berikutnya!'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fef3c7', padding: '6px 14px', borderRadius: 9999, border: '1px solid #fde68a' }}>
              <Star size={16} className="text-amber-500 fill-amber-500" />
              <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#b45309' }}>
                Skor: {score} Pts
              </span>
            </div>

            {/* Teacher unlock shortcut toggle */}
            <button
              onClick={() => {
                soundEngine.playClick();
                setTeacherOverride(!teacherOverride);
              }}
              className="btn btn-outline btn-sm"
              style={{ padding: '4px 8px', fontSize: '0.72rem', color: teacherOverride ? '#0d9488' : '#94a3b8' }}
              title="Mode Guru: Buka Semua Misi Sekaligus"
            >
              <Unlock size={13} />
              <span>{teacherOverride ? 'Kunci Misi' : 'Buka Semua (Guru)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Mission Trail Header */}
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <h3 className="font-heading" style={{ fontSize: '1.35rem', color: '#0f172a' }}>
          🗺️ Jalur Ekspedisi 6 Wilayah
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
          Misi berikutnya akan otomatis terbuka setelah misi sebelumnya selesai!
        </p>
      </div>

      {/* Mission Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 28 }}>
        {MISSIONS.map((mission, index) => {
          const unlocked = isMissionUnlocked(index);
          const completed = completedMissions.includes(mission.id);
          const badge = BADGES.find((b) => b.id === mission.badgeId);

          return (
            <div
              key={mission.id}
              onClick={() => handleMissionClick(mission, index)}
              className="card"
              style={{
                cursor: unlocked ? 'pointer' : 'not-allowed',
                opacity: unlocked ? 1 : 0.65,
                borderColor: completed ? '#10b981' : unlocked ? '#0d9488' : '#cbd5e1',
                background: completed ? '#f0fdf4' : unlocked ? '#ffffff' : '#f8fafc',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: unlocked ? '0 6px 14px rgba(13, 148, 136, 0.12)' : 'none',
                position: 'relative',
                borderWidth: unlocked ? 2.5 : 2
              }}
            >
              {/* Top Tag & Status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: completed ? '#15803d' : unlocked ? '#0f766e' : '#64748b',
                    background: completed ? '#dcfce7' : unlocked ? '#ccfbf1' : '#f1f5f9',
                    padding: '3px 10px',
                    borderRadius: 9999
                  }}
                >
                  Misi {mission.id}
                </span>

                {completed ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#16a34a', fontWeight: 800, fontSize: '0.8rem' }}>
                    <CheckCircle2 size={16} /> Selesai
                  </span>
                ) : unlocked ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#0284c7', fontWeight: 800, fontSize: '0.8rem' }} className="animate-pulse">
                    <Play size={14} /> Mainkan
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#94a3b8', fontWeight: 700, fontSize: '0.8rem' }}>
                    <Lock size={15} /> Terkunci
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <h4 className="font-heading" style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: 4 }}>
                {mission.shortTitle}
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.45, marginBottom: 14 }}>
                {mission.subtitle}
              </p>

              {/* Crystal & Badge Rewards Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: '1.25rem', filter: completed ? 'none' : 'grayscale(100%) opacity(60%)' }}>
                    💎
                  </span>
                  <span style={{ fontSize: '0.78rem', color: completed ? '#15803d' : '#64748b', fontWeight: 700 }}>
                    {mission.crystalName}
                  </span>
                </div>
                {badge && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: '1.1rem', filter: completed ? 'none' : 'grayscale(100%) opacity(40%)' }}>
                      {badge.icon}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>
                      +20 Pts
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* FINAL CHALLENGE PEDESTAL */}
      <div
        className="card"
        onClick={() => {
          if (isFinalUnlocked()) {
            soundEngine.playClick();
            onSelectMission('final-mission');
          } else {
            soundEngine.playIncorrect();
            setLockedPrompt({
              title: 'Final Angle Challenge',
              requiredMission: 'Semua 6 Misi Pembelajaran Sudut'
            });
          }
        }}
        style={{
          cursor: isFinalUnlocked() ? 'pointer' : 'not-allowed',
          opacity: isFinalUnlocked() ? 1 : 0.75,
          background: isFinalCompleted
            ? 'linear-gradient(135deg, #fef3c7, #fef08a)'
            : isFinalUnlocked()
              ? 'linear-gradient(135deg, #f0fdf4, #e0f2fe)'
              : '#f8fafc',
          border: isFinalUnlocked() ? '3px solid #f59e0b' : '2px dashed #cbd5e1',
          padding: '28px 20px',
          textAlign: 'center',
          boxShadow: isFinalUnlocked() ? '0 10px 25px -5px rgba(245, 158, 11, 0.3)' : 'none'
        }}
      >
        <div style={{ fontSize: '2.8rem', marginBottom: 8 }} className={isFinalUnlocked() ? 'animate-float' : ''}>
          👑 💎 🏆
        </div>
        <h3 className="font-heading" style={{ fontSize: '1.5rem', color: '#78350f', marginBottom: 6 }}>
          Tantangan Akhir: Final Angle Challenge
        </h3>
        <p style={{ fontSize: '0.9rem', color: '#64748b', maxWidth: 520, margin: '0 auto 16px' }}>
          {isFinalUnlocked()
            ? 'Hebat! Seluruh 6 Kristal Sudut telah terkumpul! Buktikan kemampuanmu dalam 10 Soal Evaluasi Campuran untuk merebut Gelar Master Sudut & Sertifikat Resmi!'
            : 'Selesaikan seluruh 6 misi terlebih dahulu untuk membuka Tantangan Ujian Akhir ini!'}
        </p>

        <button
          disabled={!isFinalUnlocked()}
          className={`btn ${isFinalUnlocked() ? 'btn-accent btn-lg' : 'btn-outline'}`}
        >
          {isFinalCompleted ? (
            <span>ULANGI FINAL CHALLENGE</span>
          ) : isFinalUnlocked() ? (
            <span>MULAI FINAL CHALLENGE SEKARANG</span>
          ) : (
            <span><Lock size={16} /> MASIH TERKUNCI (SELESAIKAN 6 MISI)</span>
          )}
        </button>
      </div>

      {/* Locked Mission Friendly Mascot Popup */}
      {lockedPrompt && (
        <div className="modal-overlay" onClick={() => setLockedPrompt(null)}>
          <div className="modal-content animate-float" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 440, textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
              <MascotAvatar character={companion} size={76} emotion="thinking" />
            </div>

            <div style={{ display: 'inline-flex', padding: 8, borderRadius: '50%', background: '#fee2e2', color: '#ef4444', marginBottom: 8 }}>
              <Lock size={24} />
            </div>

            <h3 className="font-heading" style={{ fontSize: '1.35rem', color: '#0f172a', marginBottom: 8 }}>
              Wilayah Ini Masih Terkunci! 🔒
            </h3>

            <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.5, marginBottom: 20 }}>
              Untuk memasuki <strong>{lockedPrompt.title}</strong>, kamu harus menyelesaikan <strong>{lockedPrompt.requiredMission}</strong> terlebih dahulu ya!
            </p>

            <button
              onClick={() => {
                soundEngine.playClick();
                setLockedPrompt(null);
              }}
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Baik, Saya Siap Selesaikan!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
