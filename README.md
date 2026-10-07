# MiniLemon 🍋

Website edukasi anak-anak yang ceria, dibangun dengan React + Vite, Tailwind CSS v4, React Router DOM, React Icons, dan AOS.

## Menjalankan Proyek

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

## Build untuk Produksi

```bash
npm run build
```

Hasil build ada di folder `dist/`.

## Struktur Folder

```
src/
├── assets/
│   ├── images/
│   └── icons/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── CharacterCard.jsx
│   ├── CharacterList.jsx
│   ├── About.jsx
│   ├── Gallery.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
├── data/
│   └── characters.js
├── pages/
│   ├── Home.jsx
│   └── CharacterDetail.jsx
├── styles/
├── App.jsx
├── main.jsx
└── index.css
```

## Fitur

- 6 karakter "Lemon Squad" dengan halaman detail masing-masing (`/karakter/:id`)
- Animasi scroll dengan AOS (fade, zoom)
- Desain sticker/comic ceria khas anak-anak: border tebal, shadow offset, warna lemon/hijau/biru muda
- Navbar responsif dengan menu mobile
- Form kontak interaktif
- Fully responsive (mobile, tablet, desktop)

## Palet Warna

- Cream (background): `#FFFDF5`
- Lemon: `#FFD93D`
- Leaf (hijau): `#4CB56F`
- Sky (biru muda): `#7FD6F5`
- Ink (teks): `#2C3A34`

## Font

- **Fredoka** — heading & display (playful, rounded)
- **Nunito** — body text (ramah dibaca, friendly)
