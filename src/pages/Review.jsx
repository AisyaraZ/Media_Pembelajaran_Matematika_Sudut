import React, { useState } from 'react';
import { Heart, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { MascotSpeech } from '../components/Mascot';
import { soundEngine } from '../utils/soundEngine';

const FEELINGS = [
  { emoji: '😀', label: 'Sangat Seru!' },
  { emoji: '🙂', label: 'Menyenangkan' },
  { emoji: '😐', label: 'Biasa Saja' },
  { emoji: '😕', label: 'Masih Sulit' }
];

const FAVORITES = [
  { id: 'story', label: 'Petualangan & Maskot 🧭' },
  { id: 'video', label: 'Video Pembelajaran 🎬' },
  { id: 'protractor', label: 'Busur Derajat Virtual 📐' },
  { id: 'pbl', label: 'Proyek Desain Taman 🌿' },
  { id: 'quiz', label: 'Tantangan Soal Kuis 👑' }
];

export const Review = ({ onSubmitReview, onGoToCertificate, companion = 'kiki', studentName = 'Petualang' }) => {
  const [selectedFeeling, setSelectedFeeling] = useState('😀');
  const [selectedFav, setSelectedFav] = useState('pbl');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    soundEngine.playCorrect();
    onSubmitReview({
      feeling: selectedFeeling,
      favorite: selectedFav,
      notes: notes.trim(),
      date: new Date().toLocaleDateString('id-ID')
    });
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <MascotSpeech
        character={companion}
        name={companion === 'kiki' ? 'Kiki' : 'Lala'}
        pose="wave"
        message={`Wah ${studentName}, kami senang sekali bisa belajar bersamamu! Yuk ceritakan pengalaman belajarmu hari ini kepada guru dan kami!`}
      />

      <div className="card" style={{ padding: '28px 24px', marginTop: 16 }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ display: 'inline-flex', padding: 10, borderRadius: '50%', background: '#fee2e2', color: '#ef4444', marginBottom: 10 }}>
            <Heart size={28} />
          </div>
          <h2 className="font-heading" style={{ fontSize: '1.5rem', color: '#0f172a' }}>
            Refleksi &amp; Ulasan Belajar Siswa
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748b' }}>
            Pendapatmu sangat berharga agar guru dan media pembelajaran ini semakin keren!
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            {/* Question 1: Feeling */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.92rem', color: '#334155', marginBottom: 10 }}>
                1. Bagaimana perasaanmu belajar sudut hari ini?
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                {FEELINGS.map((f) => (
                  <button
                    type="button"
                    key={f.emoji}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedFeeling(f.emoji);
                    }}
                    className="card"
                    style={{
                      padding: '14px 6px',
                      textAlign: 'center',
                      borderColor: selectedFeeling === f.emoji ? '#0d9488' : '#e2e8f0',
                      background: selectedFeeling === f.emoji ? '#ccfbf1' : 'white',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ fontSize: '2rem', display: 'block', marginBottom: 4 }}>{f.emoji}</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>{f.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2: Favorite Activity */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.92rem', color: '#334155', marginBottom: 10 }}>
                2. Bagian mana yang paling kamu sukai?
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
                {FAVORITES.map((fav) => (
                  <button
                    type="button"
                    key={fav.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedFav(fav.id);
                    }}
                    className="btn btn-outline"
                    style={{
                      padding: '12px 14px',
                      justifyContent: 'flex-start',
                      borderColor: selectedFav === fav.id ? '#0d9488' : '#e2e8f0',
                      background: selectedFav === fav.id ? '#ccfbf1' : 'white',
                      fontWeight: selectedFav === fav.id ? 800 : 600
                    }}
                  >
                    {fav.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3: Feedback text */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.92rem', color: '#334155', marginBottom: 6 }}>
                3. Pesan singkat atau bagian yang ingin dipelajari lagi: (opsional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Sangat suka menggeser busur derajat! Seru sekali mendesain taman sekolah!"
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 14,
                  border: '2px solid #cbd5e1',
                  fontFamily: 'inherit',
                  fontSize: '0.92rem',
                  outline: 'none'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              <Send size={18} />
              <span>Kirim Refleksi &amp; Buka Sertifikat</span>
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 10px' }}>
            <div style={{ display: 'inline-flex', padding: 12, borderRadius: '50%', background: '#dcfce7', color: '#16a34a', marginBottom: 12 }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 className="font-heading" style={{ fontSize: '1.4rem', color: '#166534', marginBottom: 8 }}>
              Terima Kasih Atas Ulasanmu!
            </h3>
            <p style={{ fontSize: '0.92rem', color: '#475569', marginBottom: 20 }}>
              Refleksimu telah tersimpan. Sekarang saatnya melihat dan mencetak Sertifikat Prestasimu!
            </p>
            <button
              onClick={() => {
                soundEngine.playClick();
                onGoToCertificate();
              }}
              className="btn btn-primary btn-lg"
            >
              <span>Lihat Sertifikat Digital Saya</span>
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
