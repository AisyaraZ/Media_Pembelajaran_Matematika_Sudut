export const QUESTIONS = [
  // --- KELOMPOK 1: RECALL BANGUN DATAR & KONSEPNYA (Mission 1) ---
  {
    id: 1,
    mission: 1,
    category: 'recall',
    question: 'Bangun datar yang memiliki tepat 4 sisi sama panjang dan 4 sudut siku-siku adalah...',
    options: ['Segitiga', 'Persegi', 'Lingkaran', 'Trapesium'],
    correctAnswer: 'Persegi',
    explanation: 'Persegi memiliki 4 sisi yang sama panjang dan semua 4 sudutnya berukuran 90° (sudut siku-siku).',
    tip: 'Ingat bentuk ubin lantai atau papan catur!'
  },
  {
    id: 2,
    mission: 1,
    category: 'recall',
    question: 'Berapakah jumlah sudut yang dimiliki oleh sebuah bangun segitiga?',
    options: ['2 sudut', '3 sudut', '4 sudut', 'Tidak memiliki sudut'],
    correctAnswer: '3 sudut',
    explanation: 'Sesuai namanya, bangun segitiga memiliki 3 buah sisi dan 3 buah sudut.',
    tip: 'Hitung setiap ujung lancip pada segitiga.'
  },
  {
    id: 3,
    mission: 1,
    category: 'recall',
    question: 'Bangun datar manakah yang TIDAK memiliki titik sudut sama sekali?',
    options: ['Persegi panjang', 'Jajar genjang', 'Lingkaran', 'Segitiga siku-siku'],
    correctAnswer: 'Lingkaran',
    explanation: 'Lingkaran dibentuk oleh satu garis lengkung yang tertutup, sehingga tidak mempunyai titik sudut.',
    tip: 'Pikirkan bentuk koin atau roda sepeda.'
  },
  {
    id: 4,
    mission: 1,
    category: 'recall',
    question: 'Pada persegi panjang, berapakah besar setiap sudut yang terbentuk pada pojok-pojoknya?',
    options: ['45°', '90°', '120°', '180°'],
    correctAnswer: '90°',
    explanation: 'Setiap pojok persegi panjang tegak lurus membentuk sudut siku-siku yang besarnya tepat 90°.',
    tip: 'Pojok buku atau pintu selalu tegak lurus.'
  },
  {
    id: 5,
    mission: 1,
    category: 'recall',
    question: 'Dua garis lurus yang berpotongan pada sebuah titik akan membentuk...',
    options: ['Garis lengkung', 'Sudut', 'Lingkaran penuh', 'Jarak'],
    correctAnswer: 'Sudut',
    explanation: 'Sudut terbentuk dari pertemuan dua sinar/kaki garis pada satu titik pertemuan yang dinamakan titik sudut.',
    tip: 'Pertemuan dua garis di satu titik menghasilkan sudut.'
  },

  // --- KELOMPOK 2: MACAM-MACAM SUDUT (Mission 2 & 3) ---
  {
    id: 6,
    mission: 3,
    category: 'types',
    question: 'Sudut yang besarnya kurang dari 90° (antara 0° sampai 90°) disebut...',
    options: ['Sudut tumpul', 'Sudut siku-siku', 'Sudut lancip', 'Sudut lurus'],
    correctAnswer: 'Sudut lancip',
    explanation: 'Sudut yang lebih kecil dari 90° disebut sudut lancip, bentuknya runcing seperti ujung pensil atau paruh burung.',
    tip: 'Bentuknya tajam dan lebih sempit dari sudut siku-siku.'
  },
  {
    id: 7,
    mission: 3,
    category: 'types',
    question: 'Sudut yang besarnya tepat 90° dan berbentuk seperti huruf L tegak dinamakan...',
    options: ['Sudut siku-siku', 'Sudut lancip', 'Sudut refleks', 'Sudut tumpul'],
    correctAnswer: 'Sudut siku-siku',
    explanation: 'Sudut 90° disebut sudut siku-siku. Dua kakinya saling tegak lurus menyerupai huruf L.',
    tip: 'Bisa dicek menggunakan pojok buku tulis kamu!'
  },
  {
    id: 8,
    mission: 3,
    category: 'types',
    question: 'Sudut sebesar 125° termasuk ke dalam kategori jenis sudut apa?',
    options: ['Sudut lancip', 'Sudut siku-siku', 'Sudut tumpul', 'Sudut lurus'],
    correctAnswer: 'Sudut tumpul',
    explanation: 'Karena 125° lebih besar dari 90° dan lebih kecil dari 180°, maka sudut tersebut adalah sudut tumpul.',
    tip: 'Lebih lebar dari sudut siku-siku 90°.'
  },
  {
    id: 9,
    mission: 3,
    category: 'types',
    question: 'Sudut yang membentuk satu garis lurus sempurna memiliki besar ukuran...',
    options: ['90°', '120°', '180°', '360°'],
    correctAnswer: '180°',
    explanation: 'Sudut lurus adalah sudut yang ukurannya tepat 180°, tampak seperti garis lurus mendatar.',
    tip: 'Dua kali sudut siku-siku (90° + 90°).'
  },
  {
    id: 10,
    mission: 3,
    category: 'types',
    question: 'Jarum jam yang menunjukkan pukul 09.00 tepat membentuk sudut...',
    options: ['Sudut lancip', 'Sudut siku-siku', 'Sudut tumpul', 'Sudut lurus'],
    correctAnswer: 'Sudut siku-siku',
    explanation: 'Pada jam 09.00, jarum pendek di angka 9 dan jarum panjang di angka 12, membentuk sudut tepat 90° (siku-siku).',
    tip: 'Jarak 3 angka pada jam analog selalu membentuk sudut 90°.'
  },

  // --- KELOMPOK 3: MENENTUKAN & MENGHITUNG SUDUT (Mission 4 & 5) ---
  {
    id: 11,
    mission: 4,
    category: 'measurement',
    question: 'Alat bantu matematika yang digunakan untuk mengukur dan menggambar besar sudut dinamakan...',
    options: ['Jangka', 'Busur derajat', 'Meteran rol', 'Termometer'],
    correctAnswer: 'Busur derajat',
    explanation: 'Busur derajat (protractor) adalah alat setengah lingkaran yang memiliki skala angka 0° sampai 180° untuk mengukur sudut.',
    tip: 'Bentuknya setengah lingkaran dengan garis skala derajat.'
  },
  {
    id: 12,
    mission: 5,
    category: 'calculation',
    question: 'Dua sudut pada sebuah garis lurus berjumlah 180°. Jika salah satu sudutnya adalah 70°, berapakah besar sudut lainnya?',
    options: ['90°', '100°', '110°', '120°'],
    correctAnswer: '110°',
    explanation: 'Sudut garis lurus = 180°. Maka sudut lainnya = 180° - 70° = 110°.',
    tip: 'Kurangkan 180° dengan sudut yang sudah diketahui.'
  },
  {
    id: 13,
    mission: 5,
    category: 'calculation',
    question: 'Sebuah sudut siku-siku (90°) dibagi menjadi dua bagian. Jika bagian pertama sebesar 35°, berapakah bagian kedua?',
    options: ['45°', '55°', '65°', '145°'],
    correctAnswer: '55°',
    explanation: 'Sudut siku-siku = 90°. Maka bagian kedua = 90° - 35° = 55°.',
    tip: 'Ingat total sudut siku-siku selalu 90°.'
  },
  {
    id: 14,
    mission: 5,
    category: 'calculation',
    question: 'Jumlah seluruh sudut di dalam sebuah bangun segitiga selalu sama dengan...',
    options: ['90°', '180°', '270°', '360°'],
    correctAnswer: '180°',
    explanation: 'Jumlah ketiga sudut dalam segitiga apa pun selalu berjumlah tepat 180°.',
    tip: 'Jika ketiga sudut segitiga dipotong dan digabung, akan membentuk garis lurus (180°).'
  },
  {
    id: 15,
    mission: 4,
    category: 'measurement',
    question: 'Langkah pertama yang benar saat mengukur sudut menggunakan busur derajat adalah...',
    options: [
      'Menghitung panjang garis kaki',
      'Meletakkan titik pusat busur tepat pada titik sudut',
      'Membalik busur derajat ke arah bawah',
      'Melihat angka paling besar terlebih dahulu'
    ],
    correctAnswer: 'Meletakkan titik pusat busur tepat pada titik sudut',
    explanation: 'Langkah pertama selalu menghimpitkan titik pusat busur derajat tepat di atas titik pertemuan sudut.',
    tip: 'Pusat busur harus pas di titik sudut (vertex).'
  },

  // --- KELOMPOK 4: PROBLEM SOLVING & PENERAPAN NYATA / PBL (Mission 6) ---
  {
    id: 16,
    mission: 6,
    category: 'pbl',
    question: 'Kiki dan Lala merancang tiang gerbang masuk taman yang harus kokoh tegak lurus dengan tanah. Sudut berapakah yang harus dibuat antara tiang dan tanah?',
    options: ['45° (lancip)', '90° (siku-siku)', '135° (tumpul)', '180° (lurus)'],
    correctAnswer: '90° (siku-siku)',
    explanation: 'Agar tiang gerbang berdiri tegak dan tidak miring roboh, tiang harus membentuk sudut siku-siku 90° dengan permukaan tanah.',
    tip: 'Tiang yang kokoh harus berdiri tegak lurus.'
  },
  {
    id: 17,
    mission: 6,
    category: 'pbl',
    question: 'Di taman sekolah, dua jalan setapak bertemu dan membentuk sudut 130°. Pengunjung dapat berbelok dengan leluasa. Jenis sudut persimpangan tersebut adalah...',
    options: ['Sudut lancip', 'Sudut siku-siku', 'Sudut tumpul', 'Sudut lurus'],
    correctAnswer: 'Sudut tumpul',
    explanation: 'Karena 130° berada di antara 90° dan 180°, persimpangan jalan tersebut membentuk sudut tumpul yang luas.',
    tip: '130° lebih besar dari 90°.'
  },
  {
    id: 18,
    mission: 6,
    category: 'pbl',
    question: 'Atap gazebo taman didesain miring agar air hujan cepat mengalir ke bawah. Sudut kemiringan atap terhadap tiang penyangga adalah 40°. Termasuk jenis sudut apa?',
    options: ['Sudut lancip', 'Sudut siku-siku', 'Sudut tumpul', 'Sudut refleks'],
    correctAnswer: 'Sudut lancip',
    explanation: 'Sudut 40° lebih kecil dari 90°, sehingga termasuk jenis sudut lancip yang ramping.',
    tip: '40° kurang dari 90°.'
  },
  {
    id: 19,
    mission: 6,
    category: 'pbl',
    question: 'Sebuah papan petunjuk arah di taman dipasang dengan sudut 60°. Berapakah sisa sudut agar papan petunjuk tersebut membentuk sudut siku-siku (90°)?',
    options: ['20°', '30°', '40°', '50°'],
    correctAnswer: '30°',
    explanation: 'Untuk mencapai 90°, kita kurangkan 90° - 60° = 30°.',
    tip: 'Cari selisih ke 90°.'
  },
  {
    id: 20,
    mission: 6,
    category: 'pbl',
    question: 'Mengapa pemahaman tentang sudut sangat penting dalam merancang bangunan dan taman di kehidupan nyata?',
    options: [
      'Hanya untuk menghias gambar agar berwarna',
      'Agar bangunan kokoh, aman, fungsional, dan tertata rapi',
      'Supaya ukuran tanah terlihat lebih kecil',
      'Tidak ada hubungannya dengan keamanan bangunan'
    ],
    correctAnswer: 'Agar bangunan kokoh, aman, fungsional, dan tertata rapi',
    explanation: 'Sudut menentukan keseimbangan arsitektur tiang, kemiringan atap mengalirkan air, dan tata letak jalan yang nyaman bagi manusia.',
    tip: 'Arsitek dan insinyur selalu mengukur sudut agar bangunan tidak runtuh.'
  }
];

// Helper to get 10 mixed questions for Final Mission
export const getFinalExamQuestions = () => {
  // Take 2 from recall, 3 from types, 3 from calculation/measurement, 2 from pbl
  const recall = QUESTIONS.filter(q => q.category === 'recall').slice(0, 2);
  const types = QUESTIONS.filter(q => q.category === 'types').slice(0, 3);
  const math = QUESTIONS.filter(q => q.category === 'calculation' || q.category === 'measurement').slice(0, 3);
  const pbl = QUESTIONS.filter(q => q.category === 'pbl').slice(0, 2);

  return [...recall, ...types, ...math, ...pbl];
};
