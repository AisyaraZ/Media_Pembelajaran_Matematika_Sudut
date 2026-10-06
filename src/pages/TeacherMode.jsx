import React, { useState } from 'react';
import { GraduationCap, ArrowLeft, BookOpen, Users, CheckCircle, Database, HelpCircle, FileText, Trash2 } from 'lucide-react';
import { MISSIONS } from '../data/missions';
import { QUESTIONS } from '../data/questions';
import { soundEngine } from '../utils/soundEngine';

export const TeacherMode = ({ appData, onBack, onResetData }) => {
  const [activeTab, setActiveTab] = useState('guide'); // 'guide', 'curriculum', 'questions', 'studentData'

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <button
          onClick={() => {
            soundEngine.playClick();
            onBack();
          }}
          className="btn btn-outline"
        >
          <ArrowLeft size={18} />
          <span>Kembali</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ background: '#fef3c7', padding: 8, borderRadius: 12 }}>
            <GraduationCap size={24} className="text-amber-700" />
          </div>
          <div>
            <h2 className="font-heading" style={{ fontSize: '1.35rem', color: '#0f172a', margin: 0 }}>
              Panel Panduan Guru &amp; RPP
            </h2>
            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
              Media Pembelajaran Interaktif Matematika Kelas 4 SD
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        <button
          onClick={() => {
            soundEngine.playClick();
            setActiveTab('guide');
          }}
          className={`btn ${activeTab === 'guide' ? 'btn-primary' : 'btn-outline'}`}
        >
          <BookOpen size={16} />
          <span>Petunjuk &amp; Cara Pakai</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            setActiveTab('curriculum');
          }}
          className={`btn ${activeTab === 'curriculum' ? 'btn-primary' : 'btn-outline'}`}
        >
          <FileText size={16} />
          <span>Capaian Pembelajaran (CP/TP)</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            setActiveTab('questions');
          }}
          className={`btn ${activeTab === 'questions' ? 'btn-primary' : 'btn-outline'}`}
        >
          <HelpCircle size={16} />
          <span>Bank Soal ({QUESTIONS.length})</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            setActiveTab('studentData');
          }}
          className={`btn ${activeTab === 'studentData' ? 'btn-primary' : 'btn-outline'}`}
        >
          <Database size={16} />
          <span>Data Belajar Siswa</span>
        </button>
      </div>

      {/* TAB 1: GUIDE */}
      {activeTab === 'guide' && (
        <div className="card" style={{ padding: 24 }}>
          <h3 className="font-heading" style={{ fontSize: '1.25rem', color: '#0f766e', marginBottom: 12 }}>
            💡 Petunjuk Penggunaan untuk Guru di Kelas
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: '#f8fafc', padding: 16, borderRadius: 14, border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontSize: '1rem', color: '#0369a1', marginBottom: 6 }}>1. Pembelajaran di Kelas Berbasis Proyek (PBL)</h4>
              <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5 }}>
                Guru dapat menampilkan media ini di proyektor kelas atau membagikan tautan kepada gawai siswa.
                Gunakan narasi pembuka tentang hilangnya <em>Angle Crystal</em> untuk memicu rasa ingin tahu (orientasi masalah).
                Pada Misi 6, dorong siswa berdiskusi merancang Desain Taman Sekolah.
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: 16, borderRadius: 14, border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontSize: '1rem', color: '#0d9488', marginBottom: 6 }}>2. Belajar Mandiri di Rumah</h4>
              <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5 }}>
                Siswa dapat menjalankan media ini dari browser smartphone atau laptop tanpa perlu registrasi rumit. Seluruh kemajuan belajar, skor, dan refleksi tersimpan otomatis di perangkat siswa (localStorage).
              </p>
            </div>

            <div style={{ background: '#f8fafc', padding: 16, borderRadius: 14, border: '1px solid #e2e8f0' }}>
              <h4 style={{ fontSize: '1rem', color: '#d97706', marginBottom: 6 }}>3. Kustomisasi Audio &amp; Video</h4>
              <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.5 }}>
                Guru dapat meletakkan file video asli di folder <code>/public/assets/video/angle-learning.mp4</code> atau file audio di <code>/public/assets/audio/</code>.
                Jika belum ada file fisik, sistem secara otomatis mensintesis suara Web Audio API dan simulasi interaktif tanpa error!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CURRICULUM */}
      {activeTab === 'curriculum' && (
        <div className="card" style={{ padding: 24 }}>
          <h3 className="font-heading" style={{ fontSize: '1.25rem', color: '#0f766e', marginBottom: 12 }}>
            📚 Capaian &amp; Alur Tujuan Pembelajaran (ATP)
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: 16 }}>
            Diselaraskan dengan Kurikulum Merdeka Matematika Fase B (Kelas 4 SD) Elemen Pengukuran dan Geometri:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MISSIONS.map((m) => (
              <div key={m.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: 12, background: '#f8fafc', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <span style={{ background: m.color, color: 'white', padding: '3px 8px', borderRadius: 6, fontWeight: 800, fontSize: '0.75rem', shrink: 0 }}>
                  Misi {m.id}
                </span>
                <div>
                  <strong style={{ fontSize: '0.92rem', color: '#0f172a', display: 'block' }}>{m.title}</strong>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>{m.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: QUESTIONS BANK */}
      {activeTab === 'questions' && (
        <div className="card" style={{ padding: 24 }}>
          <h3 className="font-heading" style={{ fontSize: '1.25rem', color: '#0f766e', marginBottom: 12 }}>
            📝 Bank Soal Terstruktur ({QUESTIONS.length} Butir Soal)
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#64748b', marginBottom: 16 }}>
            Setiap soal dilengkapi kunci jawaban dan penjelasan pedagogis yang memotivasi siswa saat salah:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 480, overflowY: 'auto' }}>
            {QUESTIONS.map((q, idx) => (
              <div key={q.id} style={{ background: '#f8fafc', padding: 14, borderRadius: 12, border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0d9488' }}>No. {idx + 1} ({q.category.toUpperCase()})</span>
                  <span style={{ fontSize: '0.78rem', background: '#dcfce7', color: '#166534', padding: '2px 8px', borderRadius: 6, fontWeight: 700 }}>
                    Kunci: {q.correctAnswer}
                  </span>
                </div>
                <strong style={{ fontSize: '0.9rem', color: '#1e293b', display: 'block', marginBottom: 6 }}>
                  {q.question}
                </strong>
                <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>
                  💡 <strong>Penjelasan:</strong> {q.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: STUDENT DATA */}
      {activeTab === 'studentData' && (
        <div className="card" style={{ padding: 24 }}>
          <h3 className="font-heading" style={{ fontSize: '1.25rem', color: '#0f766e', marginBottom: 12 }}>
            📊 Catatan Hasil Belajar Siswa (localStorage)
          </h3>

          {appData.studentName ? (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 20 }}>
                <div style={{ background: '#f0fdf4', padding: 14, borderRadius: 12, border: '1px solid #86efac' }}>
                  <span style={{ fontSize: '0.78rem', color: '#166534', fontWeight: 700 }}>Nama Siswa:</span>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#14532d' }}>{appData.studentName}</div>
                </div>

                <div style={{ background: '#fef3c7', padding: 14, borderRadius: 12, border: '1px solid #fde68a' }}>
                  <span style={{ fontSize: '0.78rem', color: '#b45309', fontWeight: 700 }}>Total Skor:</span>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#92400e' }}>{appData.score} Poin</div>
                </div>

                <div style={{ background: '#e0f2fe', padding: 14, borderRadius: 12, border: '1px solid #bae6fd' }}>
                  <span style={{ fontSize: '0.78rem', color: '#0369a1', fontWeight: 700 }}>Misi Selesai:</span>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#075985' }}>
                    {appData.completedMissions.filter(m => typeof m === 'number').length} / 6
                  </div>
                </div>
              </div>

              {appData.review && (
                <div style={{ background: '#f8fafc', padding: 16, borderRadius: 14, border: '1px solid #e2e8f0', marginBottom: 20 }}>
                  <h4 style={{ fontSize: '0.95rem', color: '#0f172a', marginBottom: 6 }}>Refleksi Siswa Terakhir:</h4>
                  <p style={{ fontSize: '0.85rem', color: '#334155' }}>
                    <strong>Perasaan:</strong> {appData.review.feeling} • <strong>Aktivitas Favorit:</strong> {appData.review.favorite}
                  </p>
                  {appData.review.notes && (
                    <p style={{ fontSize: '0.85rem', color: '#64748b', fontStyle: 'italic', marginTop: 4 }}>
                      "{appData.review.notes}"
                    </p>
                  )}
                </div>
              )}

              <button
                onClick={() => {
                  soundEngine.playClick();
                  if (window.confirm('Reset data belajar siswa untuk dipakai oleh murid berikutnya?')) {
                    onResetData();
                  }
                }}
                className="btn btn-outline"
                style={{ color: '#ef4444', borderColor: '#fca5a5' }}
              >
                <Trash2 size={16} />
                <span>Reset Data Siswa Ini</span>
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '30px 10px', color: '#64748b' }}>
              <p>Belum ada data petualangan siswa yang tersimpan di perangkat ini.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
