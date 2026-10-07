import petualangan from "../assets/our product/petualangan-minilemon.webp";
import saveTheEarth from "../assets/our product/minilemon-save-the-earth.webp";
import explorer from "../assets/our product/minilemon-explorer-to-jogja.webp";
import liveParenting from "../assets/our product/poster-parenting.webp";
import panggungBoneka from "../assets/our product/panggung-boneka-minilemon.webp";

// Data produk & karya MiniLemon
const products = [
  {
    id: "petualangan-si-minilemon",
    title: "Petualangan Si Mini Lemon",
    image: petualangan,
    category: "Film Animasi",
    ageRange: "4 - 10 Tahun",
    platform: "YouTube & TV",
    contentType: "Film Animasi",
    excerpt:
      "Kisah seru Lemon Squad menyelamatkan Ucup dari kelompok pemburu hewan langka.",
    description: [
      "Kisah Petualangan Si Mini Lemon dimulai dari tingkah usil Ucup dan Togar yang tanpa sengaja membuat sekelompok angsa marah. Kejadian tersebut berubah menjadi petualangan besar ketika Ucup tiba-tiba menghilang setelah menemukan sebuah mesin portal misterius milik Kak Bibie.",
      "Karena khawatir dengan keadaan Ucup, anak-anak Mini Lemon bekerja sama untuk mencarinya. Dengan bantuan Kak Bibie dan Paman Tigor, mereka melakukan perjalanan ke berbagai tempat menarik di Indonesia.",
      "Dalam pencarian itu, mereka menemukan bahwa Ucup ternyata diculik oleh kelompok pemburu hewan langka ilegal. Petualangan ini dipenuhi aksi menegangkan, persahabatan, dan kerja sama untuk menyelamatkan Ucup sekaligus menghentikan kejahatan tersebut.",
    ],
  },
  {
    id: "mini-lemon-save-the-earth",
    title: "Mini Lemon Save The Earth",
    image: saveTheEarth,
    category: "Serial Edukasi",
    ageRange: "5 - 11 Tahun",
    platform: "YouTube & TV",
    contentType: "Serial Edukasi",
    excerpt:
      "Belajar menjaga bumi dan lingkungan bersama Kak Bibie dan Lemon Squad.",
    description: [
      "Serial Mini Lemon Save The Earth mengajak anak-anak memahami pentingnya menjaga bumi dan lingkungan sekitar. Dipimpin oleh Kak Bibie, para karakter Mini Lemon belajar tentang ekosistem, keberagaman makhluk hidup, serta cara melestarikan alam.",
      "Melalui berbagai petualangan, mereka tidak hanya memperoleh pengetahuan tentang lingkungan, tetapi juga belajar bertanggung jawab terhadap alam dan membiasakan diri melakukan hal-hal positif untuk menjaga bumi tetap lestari.",
    ],
  },
  {
    id: "mini-lemon-explorer",
    title: "Mini Lemon Explorer",
    image: explorer,
    category: "Permainan Edukatif",
    ageRange: "6 - 12 Tahun",
    platform: "Aplikasi Mobile",
    contentType: "Permainan Interaktif",
    excerpt:
      "Menjelajahi budaya dan kekayaan Nusantara lewat petualangan interaktif.",
    description: [
      "Mini Lemon Explorer adalah permainan edukatif yang menggabungkan cerita dan petualangan interaktif. Anak-anak diajak menjelajahi berbagai daerah di Indonesia sambil belajar tentang budaya, tempat wisata, dan kekayaan Nusantara.",
      "Salah satu tujuan perjalanan mereka adalah Yogyakarta, kota yang terkenal dengan budaya dan sejarahnya. Ke depannya, permainan ini terus berkembang dengan menghadirkan lokasi-lokasi ikonik lain seperti Bali, Kalimantan, Papua, dan banyak wilayah menarik lainnya.",
    ],
  },
  {
    id: "mini-lemon-live-parenting",
    title: "Mini Lemon Live Parenting",
    image: liveParenting,
    category: "Program Parenting",
    ageRange: "Untuk Orang Tua",
    platform: "YouTube Live",
    contentType: "Talkshow",
    excerpt:
      "Tips dan saran praktis untuk orang tua dalam mendidik karakter anak.",
    description: [
      "Program Mini Lemon Live Parenting dibuat dengan keyakinan bahwa pendidikan karakter anak membutuhkan peran aktif orang tua, bukan hanya tontonan edukatif.",
      "Melalui program ini, para orang tua mendapatkan berbagai tips dan saran praktis yang dapat diterapkan di rumah untuk membantu mendidik anak menjadi lebih mandiri, disiplin, dan berkarakter baik.",
    ],
  },
  {
    id: "panggung-boneka-minilemon",
    title: "Panggung Boneka Mini Lemon",
    image: panggungBoneka,
    category: "Pertunjukan Boneka",
    ageRange: "3 - 9 Tahun",
    platform: "Pertunjukan Langsung",
    contentType: "Panggung Boneka",
    excerpt:
      "Pertunjukan boneka lucu yang sarat pesan moral untuk si kecil.",
    description: [
      "Panggung Boneka Mini Lemon merupakan pertunjukan boneka yang menghadirkan cerita-cerita lucu dan menghibur dari kehidupan sehari-hari para karakter Mini Lemon.",
      "Selain menghibur, setiap pertunjukan juga menyampaikan pesan moral seperti pentingnya persahabatan, kejujuran, gotong royong, dan tanggung jawab. Anak-anak diajak belajar sambil tertawa melalui cerita yang ringan dan menyenangkan.",
    ],
  },
];

export default products;
