# 03. Dokumentasi Modernisasi Desain, Animasi Smooth & Efek Glassmorphism (Blurring) — KKMP Kota Depok

Dokumen ini mencatat seluruh pembaruan desain visual, arsitektur animasi *hardware-accelerated*, implementasi *glassmorphism* (*frosted blur*), serta peningkatan pengalaman pengguna (*User Experience*) pada aplikasi web **Koperasi Merah Putih Mekarjaya (KKMP) — Kota Depok** (`G:\WORK\picing\frontend\kkmp`).

Tanggal Rilis: Rabu, 30 September 2026  
Status: **Production Ready & Live pada Port 5175**  
URL Lokal: [`http://localhost:5175/`](http://localhost:5175/)

---

## 1. Ringkasan Objektif Pembaruan

Pembaruan ini mengubah tampilan website KKMP Mekarjaya menjadi berstandar web modern 2026 (*ultra-modern, sleek, tactile & lively*), dengan fokus pada tiga pilar utama:
1. **Glassmorphism & Multi-Segment Blurring**: Penggunaan efek *frosted glass* (`backdrop-blur-xl`, `backdrop-blur-2xl`, `bg-white/80`, `border-white/80`) pada navbar, kartu produk, kartu peran, search bar, dan modal popover.
2. **Smooth Fluid Animations**: Mengintegrasikan `framer-motion` untuk *spring physics*, *staggered card entrance*, *micro-interactions* interaktif pada hover/tap, serta transisi drawer yang mulus.
3. **Ambient Lighting & Depth**: Penambahan *ambient glowing gradient orbs* (`blur-3xl`) dengan animasi melayang lembut (*float keyframes*) yang memberikan kedalaman (*depth visual*) tanpa membebani performa browser.

---

## 2. Segmen & Detail Efek Blurring (Glassmorphism)

| Segmen Antarmuka | Spesifikasi Efek Blur & Transparansi | Fungsi & Nilai Estetika |
|---|---|---|
| **Sticky Navbar Header** | `backdrop-blur-2xl bg-white/85 border-b border-slate-200/70` | Memberikan kesan bilah navigasi melayang (*floating glass bar*) dengan deteksi scroll dinamis. |
| **Top Announcement Strip** | `backdrop-blur-md bg-slate-950/95 border-b border-white/5` | Frosted dark glass yang elegan, menampilkan status live AHU koperasi dan hotline resmi. |
| **Floating Search Bar** | `backdrop-blur-2xl bg-white/85 border border-white/80 shadow-xl` | Kotak pencarian transparan dengan efek glowing ring merah lembut saat aktif. |
| **Pill Selector Cabang & Role** | `backdrop-blur-md bg-slate-50/80 border border-slate-200/80` | Tombol interaktif semi-transparan dengan popover *high-blur* 8 cabang dan 5 role. |
| **4 Feature Pills (Hero)** | `backdrop-blur-md bg-white/70 border border-white/80 shadow-2xs` | Menampilkan nilai keunggulan produk terpercaya, distribusi 8 cabang, harga anggota, dan UMKM. |
| **Hero Overlaid Badges** | `backdrop-blur-xl bg-white/90 border border-white/90 shadow-xl` | Floating metric pills di atas foto banner hero (indikator 15 ton beras dan rantai dingin 4°C). |
| **8 Kategori Komoditas** | `backdrop-blur-md bg-white/75 border border-white/80` | Kartu kategori semi-transparan dengan rasio foto 1:1 dan highlight saat dipilih. |
| **Panel Bar Statistik** | `backdrop-blur-xl bg-white/80 border border-white/80 shadow-md` | Panel statistik 5 metrik (1 Induk, 8 Cabang, 10.000+ Anggota, 500+ Produk, 50+ Supplier). |
| **5 Kartu Alur Rantai Pasok** | `backdrop-blur-md bg-gradient-to-b from-[role]/80 via-white/80 to-white/95 border-2` | Kartu tahapan interaktif dengan *glow shadow* sesuai warna khas masing-masing peran. |
| **Overlay Kartu Produk** | `backdrop-blur-md bg-slate-950/75 border border-white/10` | Tag nama supplier dan sisa stok yang menempel di bawah foto produk rasio 1:1. |
| **Slide-over Cart Drawer** | `backdrop-blur-2xl bg-white/95 border-l border-white/60` | Drawer keranjang belanja dengan *backdrop blur* gelap `bg-slate-950/60 backdrop-blur-xs`. |
| **Role Switcher Modal** | `backdrop-blur-2xl bg-white/95 border border-white/80 shadow-2xl` | Modal peralihan peran multi-role dengan latar belakang `backdrop-blur-md bg-slate-950/70`. |

---

## 3. Arsitektur Animasi Smooth (Framer Motion + Keyframes)

### 3.1 Animasi Framer Motion
- **Staggered Container Animation**: Konten hero section dan grid produk muncul secara berurutan (*staggered reveal*) dengan kurva bezier halus `[0.21, 0.47, 0.32, 0.98]`.
- **Card Hover Physics**:
  ```jsx
  whileHover={{ y: -6, scale: 1.01 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.25 }}
  ```
- **Active Navigation Underline**: Navigasi `Beranda`, `Untuk Anggota`, dan `Koperasi Cabang` memiliki garis bawah merah dinamis (*layoutId="navUnderline"*) yang berpindah mulus mengikuti rute aktif.
- **Cart Feedback**: Tombol "+ Keranjang" langsung berganti menjadi badge hijau "Ditambah!" dengan animasi scale dan centang selama 1.2 detik.
- **Spring Slide-over**: Keranjang belanja bergeser masuk dari sisi kanan layar menggunakan fisika pegas (`damping: 28, stiffness: 280`).

### 3.2 Keyframe CSS Khusus (`src/index.css`)
- `@keyframes float-gentle`: Menggerakkan *gradient blob* di latar belakang ke atas dan ke bawah sejauh 8px selama 6 detik secara berulang (*infinite loop*).
- `@keyframes float-reverse`: Menggerakkan *gradient blob* sekunder dengan fase berlawanan selama 7 detik.
- `@keyframes pulse-soft`: Memberikan efek pulsasi lembut pada pencahayaan ambien latar belakang.
- `@keyframes shimmer`: Efek kilau cahaya horizontal pada elemen badge promosi.

---

## 4. Verifikasi Aturan Desain & Konsistensi Dokumen

1. **Port Server**: Tetap terkunci pada **Port 5175** (`http://localhost:5175/`).
2. **Menu Navbar**: Bersih dari tautan bertuliskan *"5 Role Portal"*; menu tetap rapi sesuai skema gambar UI (`Beranda`, `Produk`, `Untuk Anggota`, `Koperasi Cabang`, `Tentang Kami`, `Berita`, `Bantuan`).
3. **Penyebutan Role Anggota**: Bersih dari kata `(warga)`, konsisten sebagai **Anggota Koperasi**.
4. **Rasio Foto Produk**: 100% konsisten pada rasio **1:1 (`aspect-square object-cover`)**, tidak melar, dan tidak terdistorsi.
5. **Kualitas Kode**: Zero compilation error pada produksi (`npm run build` sukses 100%).
