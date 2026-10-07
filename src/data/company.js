// Founders
import reno from "../assets/image company/Reno.webp";
import heri from "../assets/image company/Heri.webp";
import watin from "../assets/image company/Watin.webp";

// Studio Minilemon team
import arif from "../assets/image company/Arif.webp";
import abdan from "../assets/image company/Abdan.webp";
import andepp from "../assets/image company/Andepp.webp";
import noto from "../assets/image company/Noto.webp";
import dimas from "../assets/image company/Dimas.webp";
import naufal from "../assets/image company/Naufal.webp";
import auriga from "../assets/image company/Auriga.webp";
import gilbert from "../assets/image company/Gilbert.webp";

const companyData = {
  about: {
    title: "Tentang Kami",
    content: [
      "Studio Minilemon adalah studio kreatif yang bergerak di bidang produksi konten visual, animasi, branding, dan media digital. Kami merancang, memproduksi, dan menghadirkan karya visual mulai dari konsep, ilustrasi, model 3D, hingga hasil akhir yang siap tayang.",
      "Selain menjadi rumah produksi, Studio Minilemon juga menjadi tempat praktik industri dan magang bagi siswa maupun mahasiswa yang ingin belajar langsung dalam lingkungan kerja kreatif profesional — mendampingi mereka membangun portofolio nyata melalui delapan divisi kreatif studio.",
    ],
  },

  vision: {
    title: "Visi",
    content: [
      "Menjadi studio kreatif yang tumbuh bersama talenta muda Indonesia, menghasilkan karya visual, animasi, dan produk digital berkualitas industri sekaligus membuka jalan bagi generasi kreatif berikutnya.",
    ],
  },

  // A qualitative arc rather than invented exact dates/figures — honest
  // to what the studio actually knows about its own story, while still
  // giving the "Tentang Studio" page a real sense of progression.
  journey: [
    {
      label: "Awal Mula",
      title: "Dari ruang kerja kecil, satu visi besar",
      description:
        "Studio Minilemon dimulai dari sekelompok kreator yang ingin memproduksi karya visual berkualitas industri — sambil percaya bahwa proses itu sendiri layak dibagikan ke generasi berikutnya.",
    },
    {
      label: "Bertumbuh",
      title: "Delapan divisi, satu alur produksi",
      description:
        "Seiring bertambahnya proyek, studio berkembang menjadi delapan divisi kreatif yang saling terhubung — dari ilustrasi dan modeling hingga branding dan pengembangan software.",
    },
    {
      label: "Membuka Pintu",
      title: "Jadi tempat praktik industri sungguhan",
      description:
        "Studio membuka pintunya bagi siswa dan mahasiswa magang, menempatkan mereka langsung dalam proyek nyata bersama tim profesional — bukan sekadar observasi.",
    },
    {
      label: "Hari Ini",
      title: "Terus berkarya, terus membuka jalan",
      description:
        "Kini Studio Minilemon terus memproduksi karya untuk klien sekaligus menjadi ruang belajar bagi ratusan peserta magang yang membangun portofolio nyata mereka di sini.",
    },
  ],

  mission: {
    title: "Misi",
    items: [
      "Memproduksi karya visual, animasi, branding, dan media digital yang berkualitas dan berkelanjutan.",
      "Menyediakan lingkungan praktik industri dan magang yang nyata bagi siswa dan mahasiswa di delapan divisi kreatif studio.",
      "Membangun tim profesional yang kolaboratif, adaptif, dan terus berkembang mengikuti kebutuhan industri kreatif.",
    ],
  },

  founders: [
    { name: "Reno Halsamer", position: "Founder", image: reno },
    { name: "Heriyadi Natawijaya", position: "Co-Founder, CEO", image: heri },
    { name: "Wathin Ciptawan", position: "Special Partner", image: watin },
  ],

  // General team structure of Studio Minilemon. Individual members are not
  // mapped to a single division here since that day-to-day assignment
  // shifts per project — the studio-wide roster is shown instead.
  team: {
    title: "Tim Studio Minilemon",
    members: [
      { name: "Arif Rakhman H", image: arif },
      { name: "Fikri Abdan", image: abdan },
      { name: "Andi Hardjani", image: andepp },
      { name: "Ignatius Mubiarnoto N", image: noto },
      { name: "Dimas Ramadhan", image: dimas },
      { name: "Naufal Mufit", image: naufal },
      { name: "Auriga F Vereno", image: auriga },
      { name: "Abraham Gilbert Halsamer", image: gilbert },
    ],
  },
};

export default companyData;
