import React from 'react';
import { Trophy, CheckCircle2, Award, Star, ArrowRight, MessageSquare, FileCheck, Sparkles, RefreshCcw } from 'lucide-react';
import { MascotAvatar, MascotSpeech } from '../components/Mascot';
import { BADGES } from '../data/badges';
import { soundEngine } from '../utils/soundEngine';

export const Result = ({
  studentName = 'Petualang Hebat',
  score = 100,
  completedMissions = [],
  companion = 'kiki',
  onGoToReview,
  onGoToCertificate,
  onReplayMissions
}) => {
  const missionCount = completedMissions.filter((m) => typeof m === 'number').length;
  const isHighScorer = score >= 80;

  return (
    <div style={{ maxWidth: 840, margin: '0 auto', textAlign: 'center' }}>
      <MascotSpeech
        character={companion}
        name={companion === 'kiki' ? 'Kiki' : 'Lala'}
        pose="cheer"
        emotion="celebrating"
        message={
          isHighScorer
            ? `Bagus sekali, ${studentName}! Kamu sudah memahami seluruh konsep sudut dengan cemerlang! 6 Kristal Sudut telah kembali ke tempatnya!`
            : `Kamu sudah berusaha dengan hebat, ${studentName}! Belajar matematika adalah sebuah petualangan yang terus berkembang!`
        }
      />

      <div className="card card-hero" style={{ padding: '32px 24px', marginTop: 20 }}>
        {/* Trophy Icon */}
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #fef08a, #f59e0b)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 0 25px rgba(245, 158, 11, 0.45)'
          }}
          className="animate-float"
        >
          <Trophy size={48} className="text-amber-900" />
        </div>

        <h2 className="font-heading" style={{ fontSize: '2rem', color: '#0f172a', marginBottom: 6 }}>
          Petualangan Berhasil Dituntaskan! 🎉
        </h2>
        <p style={{ fontSize: '1.05rem', color: '#475569', fontWeight: 600, marginBottom: 24 }}>
          Nama Petualang: <strong style={{ color: '#0d9488' }}>{studentName}</strong>
        </p>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 26 }}>
          <div style={{ background: 'white', padding: '16px', borderRadius: 18, border: '2px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Total Skor Akhir</span>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f59e0b', marginTop: 2 }}>{score}</div>
            <span style={{ fontSize: '0.78rem', color: isHighScorer ? '#10b981' : '#0284c7', fontWeight: 700 }}>
              {isHighScorer ? '⭐ Sangat Cemerlang' : '👍 Berkembang Baik'}
            </span>
          </div>

          <div style={{ background: 'white', padding: '16px', borderRadius: 18, border: '2px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Misi Selesai</span>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0d9488', marginTop: 2 }}>{missionCount} / 6</div>
            <span style={{ fontSize: '0.78rem', color: '#0d9488', fontWeight: 700 }}>100% Selesai Ditaklukkan</span>
          </div>

          <div style={{ background: 'white', padding: '16px', borderRadius: 18, border: '2px solid #e2e8f0' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Kristal Sudut</span>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#0284c7', marginTop: 2 }}>6 💎</div>
            <span style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: 700 }}>Dunia Sudut Pulih</span>
          </div>
        </div>

        {/* Badges Collection Showcase */}
        <div style={{ background: 'white', borderRadius: 18, padding: '20px', border: '2px solid #e2e8f0', marginBottom: 24, textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <Award size={20} className="text-amber-500" />
            <h4 className="font-heading" style={{ fontSize: '1.1rem', color: '#0f172a', margin: 0 }}>
              Koleksi Lencana Petualanganmu:
            </h4>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 10 }}>
            {BADGES.map((b) => (
              <div
                key={b.id}
                style={{
                  background: '#f8fafc',
                  padding: '12px 10px',
                  borderRadius: 14,
                  border: '1.5px solid #e2e8f0',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: 4 }}>{b.icon}</div>
                <strong style={{ fontSize: '0.82rem', color: '#0f172a', display: 'block' }}>{b.title}</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Competencies Checklist */}
        <div style={{ background: '#f8fafc', borderRadius: 18, padding: '20px', textAlign: 'left', border: '1px solid #e2e8f0', marginBottom: 28 }}>
          <h4 className="font-heading" style={{ fontSize: '1.1rem', color: '#0f766e', marginBottom: 12 }}>
            📋 Daftar Capaian Kemampuan Matematika:
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'Mengingat bangun datar dan menghubungkannya dengan konsep sudut',
              'Mengidentifikasi titik sudut (vertex), kaki sudut, dan daerah sudut',
              'Membedakan sudut lancip (<90°), siku-siku (90°), tumpul (>90°), dan lurus (180°)',
              'Menentukan dan membaca ukuran sudut menggunakan busur derajat virtual',
              'Menghitung sudut berpelurus (180°) dan sudut berpenyiku (90°)',
              'Menyelesaikan studi kasus nyata Desain Taman Sekolah berbasis PBL'
            ].map((comp, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                <span style={{ fontSize: '0.88rem', color: '#334155', fontWeight: 600 }}>{comp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
          <button
            onClick={() => {
              soundEngine.playClick();
              onGoToReview();
            }}
            className="btn btn-outline btn-lg"
          >
            <MessageSquare size={20} />
            <span>Isi Ulasan &amp; Refleksi Belajar</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              onGoToCertificate();
            }}
            className="btn btn-primary btn-lg"
          >
            <FileCheck size={20} />
            <span>Buka Sertifikat Digital</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
