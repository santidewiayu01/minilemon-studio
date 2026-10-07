// Single source of truth for Studio Minilemon's 8 creative divisions.
// Used by the Divisions section, the Activities section, Our Works,
// the Internship Program section, and the Kegiatan Studio page —
// so an edit here updates the whole site consistently.
//
// `accent` was moved to a vivid neon palette (one hue per division) to
// match the "sci-fi creative lab" redesign of the dark cinematic
// sections (Division Experience, Kegiatan Studio, the homepage
// pipeline diagram) — gold/blue/cyan/purple/orange/red/green/indigo,
// each division keeping one fixed color everywhere it appears.
//
// `tools` and `contribution` were added for the same redesign: `tools`
// is the real software stack that division works in day to day, and
// `contribution` is a one-line answer to "what does this stage hand
// off to the rest of the pipeline" — used to frame the site around
// process/workflow instead of finished portfolio pieces.

const divisions = [
  {
    id: "illustration",
    icon: "illustration",
    name: "Illustration",
    accent: "#FFD84D",
    bg: "bg-lemon-light",
    description:
      "Membuat konsep visual, karakter, aset, dan ilustrasi yang digunakan dalam berbagai proyek studio.",
    activities: ["Mendesain karakter", "Membuat concept art", "Membuat storyboard"],
    tools: ["Adobe Photoshop", "Procreate", "Clip Studio Paint"],
    contribution:
      "Menentukan wajah visual karakter dan dunia cerita sebelum masuk ke tahap produksi 3D.",
  },
  {
    id: "modeling",
    icon: "modeling",
    name: "Modeling",
    accent: "#38BDF8",
    bg: "bg-sky-light",
    description:
      "Membangun aset dan model 3D — dari karakter hingga lingkungan — sebagai fondasi visual setiap produksi.",
    activities: ["Membuat model 3D", "Membuat aset lingkungan"],
    tools: ["Blender", "Autodesk Maya", "ZBrush"],
    contribution:
      "Mengubah konsep 2D menjadi aset 3D yang siap dianimasikan dan dirender.",
  },
  {
    id: "rigging",
    icon: "rigging",
    name: "Rigging",
    accent: "#22D3EE",
    bg: "bg-leaf-light",
    description:
      "Menyiapkan struktur pergerakan karakter agar siap dianimasikan dengan presisi dan ekspresif.",
    activities: ["Membuat sistem tulang karakter"],
    tools: ["Blender", "Autodesk Maya"],
    contribution:
      "Memberi kerangka dan kontrol gerak pada model agar animator bisa menggerakkannya secara natural.",
  },
  {
    id: "animation",
    icon: "animation",
    name: "Animation",
    accent: "#A78BFA",
    bg: "bg-berry/20",
    description:
      "Menghidupkan karakter dan objek melalui gerakan yang menarik dan ekspresif.",
    activities: ["Membuat animasi karakter"],
    tools: ["Blender", "Autodesk Maya", "Toon Boom Harmony"],
    contribution: "Menghidupkan karakter lewat gerakan dan ekspresi yang membawa cerita.",
  },
  {
    id: "editing",
    icon: "editing",
    name: "Editing",
    accent: "#FB923C",
    bg: "bg-lemon-light",
    description:
      "Menyusun hasil produksi menjadi satu karya utuh — dari penyusunan gambar hingga penyelarasan warna dan suara.",
    activities: ["Menyusun hasil produksi", "Color correction", "Audio syncing"],
    tools: ["Adobe Premiere Pro", "DaVinci Resolve", "Adobe After Effects"],
    contribution:
      "Menyatukan seluruh hasil produksi jadi satu tayangan utuh yang siap dinikmati penonton.",
  },
  {
    id: "broadcasting",
    icon: "broadcasting",
    name: "Broadcasting",
    accent: "#FB7185",
    bg: "bg-sky-light",
    description:
      "Menangani produksi konten media, siaran langsung, hingga dokumentasi kegiatan studio.",
    activities: ["Produksi konten media", "Live production", "Dokumentasi kegiatan"],
    tools: ["OBS Studio", "Adobe Premiere Pro", "Kamera DSLR/Mirrorless"],
    contribution:
      "Merekam dan menyiarkan proses produksi maupun kegiatan studio ke publik secara real-time.",
  },
  {
    id: "branding",
    icon: "branding",
    name: "Branding",
    accent: "#4ADE80",
    bg: "bg-leaf-light",
    description:
      "Merancang identitas visual, konten media sosial, dan kampanye yang membangun citra sebuah brand.",
    activities: ["Social media content", "Visual branding", "Campaign design"],
    tools: ["Adobe Illustrator", "Canva", "Figma"],
    contribution:
      "Membangun identitas visual dan kehadiran studio maupun klien di berbagai kanal digital.",
  },
  {
    id: "software-development",
    icon: "software",
    name: "Software Development",
    accent: "#818CF8",
    bg: "bg-berry/20",
    description:
      "Mengembangkan website, aplikasi, dan solusi digital yang mendukung kebutuhan studio serta proyek kreatif.",
    activities: ["Website development", "Landing page", "Internal system development"],
    tools: ["React", "Node.js", "Figma"],
    contribution:
      "Membangun sistem dan platform digital yang mendukung operasional dan showcase karya studio.",
  },
];

export default divisions;
