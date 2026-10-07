import minggus from "../assets/character/minggus.webp";
import slamet from "../assets/character/slamet.webp";
import ucup from "../assets/character/ucup.webp";
import togar from "../assets/character/togar.webp";
import wayan from "../assets/character/wayan.webp";
import memey from "../assets/character/memey.webp";
import amink from "../assets/character/amink.webp";
import bibie from "../assets/character/bibie.webp";
import tigor from "../assets/character/tigor.webp";
import ruD1 from "../assets/character/RU-D1.webp";

// Data karakter "Lemon Squad" - geng buah ceria MiniLemon
// Setiap karakter mewakili keberagaman budaya Nusantara
const characters = [
  {
    id: "minggus",
    name: "Minggus",
    image: minggus,
    role: "Si Petualang dari Papua",
    color: "#8FD14F",
    ring: "#5FAE2A",
    subject: "Papua",
    tagline: "Ayo coba hal baru bareng aku!",
    description:
      "Minggus merupakan karakter yang berasal dari Papua. Ia dikenal sebagai anak yang aktif, penuh semangat, pemberani, dan memiliki rasa ingin tahu yang tinggi. Minggus selalu antusias mencoba hal-hal baru dan tidak mudah menyerah ketika menghadapi tantangan.",
    traits: ["Aktif", "Pemberani", "Ingin Tahu"],
    favThing: "Radio jadul kesayangan",
  },
  {
    id: "slamet",
    name: "Slamet",
    image: slamet,
    role: "Si Bijak dari Jawa",
    color: "#FFB84C",
    ring: "#E8971C",
    subject: "Jawa",
    tagline: "Tenang dan sabar, hati jadi lapang.",
    description:
      "Slamet berasal dari suku Jawa. Ia memiliki sifat sopan, tenang, ramah, dan bijaksana. Dalam kelompoknya, Slamet sering menjadi penengah ketika terjadi perbedaan pendapat serta selalu berusaha menjaga keharmonisan di antara teman-temannya.",
    traits: ["Sopan", "Bijaksana", "Penengah"],
    favThing: "Cangkir teh hangat",
  },
  {
    id: "ucup",
    name: "Ucup",
    image: ucup,
    role: "Si Ceria dari Sunda",
    color: "#7FD6F5",
    ring: "#3FB7E0",
    subject: "Sunda",
    tagline: "Hidup itu harus penuh tawa!",
    description:
      "Ucup berasal dari budaya Sunda. Ia dikenal sebagai anak yang ceria, humoris, mudah bergaul, dan senang membuat suasana menjadi menyenangkan. Kehadirannya sering membawa keceriaan bagi seluruh anggota kelompok.",
    traits: ["Ceria", "Humoris", "Mudah Bergaul"],
    favThing: "Bendera kecil kesayangan",
  },
  {
    id: "togar",
    name: "Togar",
    image: togar,
    role: "Si Pemimpin dari Batak",
    color: "#FF6B7A",
    ring: "#E8465A",
    subject: "Batak",
    tagline: "Tegas di luar, peduli di dalam.",
    description:
      "Togar mewakili budaya Batak. Ia memiliki karakter yang berani, percaya diri, tegas, serta memiliki jiwa kepemimpinan. Walaupun terlihat keras, Togar sebenarnya sangat peduli terhadap teman-temannya dan selalu siap membantu ketika dibutuhkan.",
    traits: ["Berani", "Tegas", "Pemimpin"],
    favThing: "Bola sepak kesayangan",
  },
  {
    id: "wayan",
    name: "Wayan",
    image: wayan,
    role: "Si Seniman dari Bali",
    color: "#B48CE0",
    ring: "#8E5FC7",
    subject: "Bali",
    tagline: "Keindahan ada di setiap ide!",
    description:
      "Wayan berasal dari Bali. Ia dikenal sebagai sosok yang kreatif, sabar, santun, serta menyukai keindahan dan seni. Wayan sering memberikan ide-ide menarik yang membantu kelompok menyelesaikan berbagai masalah.",
    traits: ["Kreatif", "Sabar", "Santun"],
    favThing: "Kuas dan palet lukis",
  },
  {
    id: "memey",
    name: "Memey",
    image: memey,
    role: "Si Cerdas dari Tionghoa",
    color: "#FFD93D",
    ring: "#F3B900",
    subject: "Tionghoa",
    tagline: "Belajar itu paling seru bareng-bareng!",
    description:
      "Memey merupakan karakter perempuan yang mewakili budaya Tionghoa di Indonesia. Ia memiliki sifat yang cerdas, teliti, rajin belajar, serta senang berbagi ilmu kepada teman-temannya. Memey juga dikenal sebagai anak yang baik hati dan selalu menghargai orang lain.",
    traits: ["Cerdas", "Teliti", "Baik Hati"],
    favThing: "Bunga kecil kesayangan",
  },
  {
    id: "amink",
    name: "Amink",
    image: amink,
    role: "Si Kekinian Sepupu Memey",
    color: "#FF8FD1",
    ring: "#E8579A",
    subject: "Kekinian",
    tagline: "Udah tau belum? Aku duluan yang tau!",
    description:
      "Amink adalah sepupu Memey yang selalu mengikuti tren terbaru dan sering terlihat ingin menunjukkan pengetahuannya kepada teman-temannya. Walaupun tampak acuh tak acuh, sebenarnya ia rajin bekerja dan senang memperkenalkan berbagai hal baru kepada orang-orang di sekitarnya.",
    traits: ["Kekinian", "Suka Pamer Ilmu", "Rajin"],
    favThing: "Gadget dan tren terbaru",
  },
  {
    id: "bibie",
    name: "Bibie",
    image: bibie,
    role: "Si Jenius dari Betawi",
    color: "#5FD9C7",
    ring: "#22A896",
    subject: "Betawi",
    tagline: "Sains itu seru, walau bikin ngantuk!",
    description:
      "Bibie adalah karakter asal Betawi yang sangat cerdas dan ahli dalam bidang teknologi. Ia menjadi sosok di balik terciptanya portal waktu. Karena terlalu fokus mendalami sains dan teknologi, Bibie sering mengalami sulit tidur sehingga terkadang tertidur secara tiba-tiba.",
    traits: ["Cerdas", "Ahli Teknologi", "Mudah Ngantuk"],
    favThing: "Portal waktu ciptaannya",
  },
  {
    id: "tigor",
    name: "Tigor",
    image: tigor,
    role: "Paman Togar yang Doyan Cokelat",
    color: "#C4854A",
    ring: "#8F5A28",
    subject: "Paman Togar",
    tagline: "Yang penting aku senang dulu!",
    description:
      "Tigor merupakan paman Togar yang sangat menyukai cokelat. Ia dipercaya untuk menjaga anak-anak Mini Lemon, tetapi sering kali kurang berhasil menjalankan tanggung jawabnya. Sifatnya yang keras kepala, gemar membanggakan diri, dan lebih mengutamakan kepentingannya sendiri sering membuat keadaan menjadi lebih rumit.",
    traits: ["Keras Kepala", "Suka Pamer", "Egois"],
    favThing: "Cokelat kesukaannya",
  },
  {
    id: "ru-d1",
    name: "RU-D1",
    image: ruD1,
    role: "Robot Pintar Ciptaan Bibie",
    color: "#AEB9C7",
    ring: "#6E7A8A",
    subject: "Robot Canggih",
    tagline: "Data lengkap, siap membantu!",
    description:
      "RU-D1 merupakan robot canggih hasil karya Bibie yang dibekali berbagai teknologi modern. Robot ini mampu mengumpulkan serta memproses informasi dengan cepat dan akurat, sehingga menjadi asisten andal dalam setiap petualangan dan misi penting Mini Lemon.",
    traits: ["Cerdas", "Cepat", "Andal"],
    favThing: "Database canggihnya",
  },
];

export default characters;
