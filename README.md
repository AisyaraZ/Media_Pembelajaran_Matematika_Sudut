# 📐 Angle Adventure: Petualangan Mencari Harta Sudut
### Media Pembelajaran Interaktif Matematika Kelas 4 SD (Berbasis Project Based Learning / PBL)

**Angle Adventure** adalah media pembelajaran interaktif berbasis web yang dikembangkan khusus untuk memecahkan kebosanan siswa terhadap metode ceramah konvensional. Melalui perpaduan alur cerita petualangan seru, dua maskot pemandu (Kiki & Lala), simulasi busur derajat virtual, mini-game, proyek perancangan taman sekolah nyata, kuis evaluasi 10 soal, dan sertifikat digital yang dapat dicetak langsung.

---

## 🌟 Fitur Utama

1. **Konsep Gamifikasi & Petualangan Misi (PBL)**:
   - Cerita pencarian 6 Kristal Sudut yang hilang untuk menyelamatkan Kerajaan Geometri.
   - Peta misi interaktif dengan sistem pembuka gembok (*mission unlocking*).
2. **Dua Maskot Pemandu (Kiki & Lala)**:
   - Karakter siswa SD berbusana petualang modern dengan balon dialog dan ekspresi dinamis.
   - Dilengkapi *Text-to-Speech* narator suara ramah anak dalam Bahasa Indonesia.
3. **Materi Lengkap 6 Misi**:
   - **Misi 1**: *Recall Bangun Datar* (Persegi, Persegi Panjang, Segitiga, Lingkaran, Trapesium; menyorot sudut).
   - **Misi 2**: *Mengenal Bagian Sudut* (Titik sudut/vertex, kaki sudut 1 & 2, daerah bukaan sudut).
   - **Misi 3**: *Macam-macam Sudut* (Lancip <90°, Siku-siku =90°, Tumpul >90° & <180°, Lurus =180° + mini-game).
   - **Misi 4**: *Menentukan & Mengukur Sudut* (Simulasi Busur Derajat / Protractor interaktif + Video pembelajaran).
   - **Misi 5**: *Menghitung Sudut* (Sudut garis lurus 180°, sudut siku-siku 90°, jumlah sudut segitiga 180°).
   - **Misi 6 (Inti PBL)**: *Proyek Desain Taman Sekolah* (Menentukan sudut tiang gerbang 90°, jalan setapak 120°, kemiringan atap gazebo 40°).
4. **Final Angle Challenge & Evaluasi**:
   - 10 butir soal evaluasi campuran dengan sistem skor instan (+10/soal).
   - Umpan balik pedagogis edukatif (tanpa mempermalukan siswa saat salah).
5. **Sertifikat Digital & Refleksi**:
   - Refleksi siswa dengan pilihan emoji & catatan disimpan ke `localStorage`.
   - Sertifikat digital resmi dengan nama siswa, skor, tanggal, lencana emas, dan tombol cetak/unduh PDF (`@media print`).
6. **Audio Architecture Tanpa Ketergantungan Eksternal**:
   - *Web Audio API Synthesizer*: Melodi BGM petualangan marimba, SFX klik, nada benar, nada motivasi salah, dan *fanfare* kemenangan tanpa risiko file audio 404!
   - Pengaturan volume, tombol On/Off Musik Latar, Efek Suara, dan Narasi Suara.
7. **Panel Khusus Guru (Teacher Mode)**:
   - Petunjuk pembelajaran di kelas atau mandiri.
   - Pemetaan Capaian Pembelajaran (CP) Kurikulum Merdeka Fase B.
   - Daftar 20 bank soal lengkap dengan kunci dan pembahasan.
   - Ringkasan data hasil belajar siswa dari `localStorage` & tombol reset.
8. **Responsif Mobile & Tablet**:
   - UI ramah sentuhan, tombol besar, font ramah anak (*Fredoka* & *Plus Jakarta Sans*), dan tanpa scroll horizontal.

---

## 🚀 Cara Menjalankan Proyek

Pastikan Anda telah menginstal **Node.js** (versi 18 ke atas disarankan).

### 1. Menjalankan Server Pengembangan (Dev Server)
Buka terminal / PowerShell di direktori proyek dan jalankan:
```bash
npm run dev
```
Buka browser di alamat yang ditampilkan di terminal, misalnya:
👉 **`http://localhost:5174/`** atau **`http://localhost:5173/`**

### 2. Membangun Proyek untuk Produksi (Production Build)
```bash
npm run build
```
File siap saji akan dibuat di folder `dist/` dan dapat di-hosting di server sekolah, Netlify, Vercel, maupun GitHub Pages.

### 3. Menguji Pratinjau Build Produksi
```bash
npm run preview
```

---

## 📁 Struktur Direktori
```text
src/
├── assets/                  # Aset gambar, audio, dan video
├── components/
│   ├── AudioController.jsx  # Modal dan kontrol suara BGM/SFX/Voice
│   ├── FeedbackModal.jsx    # Umpan balik penjelasan ramah anak
│   ├── Header.jsx           # Navigasi atas, skor live, profil siswa
│   ├── Mascot.jsx           # Ilustrasi SVG Kiki & Lala + narator
│   ├── Navigation.jsx       # Tombol navigasi Lanjut, Kembali, Peta
│   ├── ProgressBar.jsx      # Indikator progres petualangan
│   ├── ProtractorTool.jsx   # Simulasi busur derajat interaktif
│   └── VideoPlayer.jsx      # Pemutar video edukasi dengan bab & subtitle
├── data/
│   ├── badges.js            # Daftar lencana petualangan
│   ├── missions.js          # Informasi 6 misi dan keterkaitan kurikulum
│   └── questions.js         # Bank 20 soal matematika sudut
├── pages/
│   ├── Home.jsx             # Halaman pembuka / landing petualangan
│   ├── NameInput.jsx        # Formulir nama petualang & pemilihan maskot
│   ├── Introduction.jsx     # Cerita latar belakang Kristal Sudut
│   ├── MissionMap.jsx       # Peta 6 wilayah ekspedisi & pedestal final
│   ├── Mission1.jsx         # Recall bangun datar & sisi-sudut
│   ├── Mission2.jsx         # Mengenal titik, kaki, dan daerah sudut
│   ├── Mission3.jsx         # 4 jenis sudut & mini game interaktif
│   ├── Mission4.jsx         # Busur derajat interaktif & video belajar
│   ├── Mission5.jsx         # Menghitung sudut garis lurus & siku-siku
│   ├── Mission6.jsx         # Proyek PBL: Desain Taman Sekolah
│   ├── FinalMission.jsx     # Final evaluation 10 soal & confetti
│   ├── Result.jsx           # Rangkuman capaian kompetensi & skor
│   ├── Review.jsx           # Refleksi perasaan belajar siswa
│   ├── CertificatePage.jsx  # Sertifikat digital resmi siap cetak/PDF
│   └── TeacherMode.jsx      # Modul ajar, petunjuk guru, data nilai
├── utils/
│   ├── soundEngine.js       # Synthesizer Web Audio API & Web Speech API
│   └── storage.js           # Pengelola localStorage otomatis
├── App.jsx                  # State router & koordinator aplikasi
├── index.css                # Desain sistem ramah anak & aturan cetak
└── main.jsx                 # Entry point React
```

---

## 🧑‍🏫 Panduan Kustomisasi Guru

- **Mengganti Video Asli**: Letakkan video format MP4 di direktori `public/assets/video/angle-learning.mp4`.
- **Menambah Soal**: Buka berkas `src/data/questions.js` dan tambahkan objek soal baru sesuai kategori.
- **Mengubah Nilai Kelulusan atau Reset**: Gunakan tombol **Reset** di pojok kanan atas Header atau dari menu **Guru**.
