# Koperasi Merah Putih Mekarjaya (KKMP) — Kota Depok

Website Marketplace & Ekosistem Rantai Pasok Terintegrasi untuk 5 Peran (5 Roles) Koperasi Merah Putih Kota Depok, dibangun presisi sesuai skema UI pada `src/images/skema_web_kkmp_sukamaja.jpeg` dan dokumen `docs/01-analisis-sistem.md`.

---

## 🌟 Fitur Utama & Kesesuaian Skema UI

### 1. Halaman Depan / Marketplace Publik (`/`)
* **Header Resmi**:
  - Logo Koperasi Merah Putih Mekarjaya Depok (emblem rumah merah & siluet 3 anggota keluarga).
  - Navigasi: *Beranda*, *Produk*, *Untuk Anggota*, *Koperasi Cabang*, *Tentang Kami*, *Berita*, *Bantuan*.
  - Lokasi interaktif: `📍 Kota Depok ⌄` dengan pilihan 8 cabang kecamatan.
  - Ikon Pencarian, Keranjang Belanja dengan indikator jumlah item real-time, dan tombol `Masuk / Daftar`.
* **Hero Banner**:
  - Tagline: *"Dari Koperasi, Untuk Anggota, Membangun Depok"*
  - Judul: **Koperasi Merah Putih Mekarjaya**
  - Deskripsi resmi marketplace koperasi Kota Depok.
  - Tombol CTA ganda: `Mulai Belanja →` & `Daftar Anggota`.
  - 4 Kartu Keunggulan (Value Propositions):
    1. *Produk Terpercaya* (Dari Supplier Pilihan)
    2. *Distribusi Cepat* (ke 8 Cabang Depok)
    3. *Harga Anggota* (Lebih Hemat)
    4. *Dukung UMKM* (Anggota Koperasi)
  - Floating Search Bar interaktif di bawah hero.
* **8 Kategori Komoditas**:
  - *Sembako*, *Produk Pertanian*, *Produk UMKM*, *Produk Segar*, *Kebutuhan Rumah Tangga*, *Elektronik & Peralatan*, *Fashion & Kerajinan*, *Lainnya*.
* **Statistik Koperasi**:
  - 1 Koperasi Induk, 8 Koperasi Cabang di Kota Depok, 10,000+ Anggota, 500+ Produk, 50+ Supplier Terpercaya, serta kartu ajakan daftar anggota.
* **Alur Rantai Pasok Terintegrasi (Supply Chain Workflow)**:
  - Diagram visual 5 tahapan dari Supplier → Induk → Logistik → 8 Cabang → Anggota. Tiap kartu dapat diklik langsung untuk membuka portal peran tersebut.
* **Katalog Produk Unggulan**:
  - Menampilkan harga reguler dan **Harga Khusus Anggota** (disubsidi koperasi).
  - Tombol favorit (wishlist) dan tombol `+ Keranjang` langsung.
* **Keranjang Belanja & Checkout (Slide-Over Drawer)**:
  - Perhitungan penghematan harga anggota secara otomatis.
  - Pilihan metode penerimaan: *Ambil di Cabang (Gratis di 8 cabang)* atau *Antar ke Rumah (Armada Depok)*.
  - Metode pembayaran: Saldo Koperasi, QRIS, Transfer Bank, atau Bayar di Tempat (COD).

---

## 👥 5 Portal Peran (5 Roles) Terintegrasi

Sistem menyediakan **Top Bar Demo Role Switcher** dan **Modal Pilihan Peran** untuk berpindah dan menguji seluruh peran dengan 1-klik tanpa perlu memasukkan password:

### 1. Peran 1: Anggota Koperasi (Warga / Anggota) — `/portal/anggota`
- **Kartu Tanda Anggota (KTA) Digital**: Nomor anggota resmi `KKMP-DPK-2026-0812`, status verifikasi, dan pos cabang utama.
- **Dompet Simpanan & Poin**: Saldo simpanan sukarela Rp 1.450.000 dan poin belanja anggota.
- **Pelacakan Rantai Pasok Pesanan**: Timeline real-time status pesanan (*Pesanan Dibuat → Diproses Gudang Induk → Dikirim Armada → Tiba di Cabang → Selesai*).
- **Katalog Belanja Cepat Anggota**: Belanja langsung dengan tarif subsidi anggota koperasi.
- **Rincian SHU**: Transparansi simpanan pokok, simpanan wajib, simpanan sukarela, dan estimasi bagi hasil SHU tahunan.

### 2. Peran 2: Koperasi Cabang (8 Cabang Depok) — `/portal/cabang`
- **Pilihan 8 Cabang Kota Depok**: *Sukamajaya (Pusat)*, *Pancoran Mas*, *Beji*, *Cimanggis*, *Sawangan*, *Cilodong*, *Cipayung*, *Tapos*.
- **Stok Inventori Cabang**: Pantau ketersediaan bahan pangan di toko cabang (Status: Aman / Menipis).
- **Pengajuan Pasokan (PO) ke Koperasi Induk**: Form instan permintaan pasokan barang saat stok di cabang menipis.
- **Konfirmasi Penerimaan Logistik**: Verifikasi drop-off dari armada mobil box pengiriman.
- **Antrean Pengambilan Anggota**: Serahkan barang pesanan kepada anggota yang mengambil di pos cabang.

### 3. Peran 3: Supplier Komoditas & UMKM — `/portal/supplier`
- **Profil Pemasok Binaan**: Kelompok Tani Mekar Subur Depok & produsen olahan UMKM.
- **Katalog & Stok Supplier**: Tambah komoditas baru, atur harga reguler dan harga khusus anggota koperasi.
- **Notifikasi PO Masuk**: Pesanan pasokan dari Koperasi Induk yang siap disiapkan dan dijemput armada.
- **Rekapitulasi Keuangan & Pembayaran**: Tagihan cair ke rekening supplier binaan tanpa potongan tengkulak.

### 4. Peran 4: Logistik & Distribusi — `/portal/logistik`
- **Armada Mobil Box Kota Depok**:
  - `KKMP-01`: Truk Engkel Pendingin (Zona Barat: Pancoran Mas, Beji)
  - `KKMP-02`: Mobil Box Standar (Zona Timur: Sukamajaya, Cilodong, Cimanggis, Tapos)
  - `KKMP-03`: Mobil Pickup Box (Zona Selatan: Sawangan, Cipayung)
- **Monitoring Rantai Dingin**: Sensor suhu boks sayuran/daging untuk menjaga kesegaran komoditas.
- **Peta Rute Jaringan 8 Cabang**: Visualisasi koneksi rute pengiriman dari Gudang Induk ke 8 cabang kecamatan.
- **Kontrol Status Pengiriman Real-Time**: Ubah status: *Memuat di Gudang Induk* → *Dalam Perjalanan* → *Tiba & Serah Terima di Cabang*.

### 5. Peran 5: Koperasi Induk Mekarjaya (Admin Pusat) — `/portal/admin`
- **Pusat Komando & KPI Eksekutif**: Total omset perputaran komoditas pangan se-Kota Depok dan jumlah anggota aktif.
- **Monitoring Rantai Pasok Terpadu (5 Tahap)**: Pantau kondisi pasokan dari 54 supplier, gudang induk, 3 armada, 8 cabang, hingga penyerapan oleh anggota.
- **Manajemen Stok Terpusat (Bapokting)**: Pengawasan ketersediaan beras, minyak goreng, telur, dan daging sapi/ayam di gudang induk.
- **Kinerja 8 Pos Cabang**: Skor stok dan status operasional cabang di seluruh kecamatan Depok.
- **Laporan Keuangan & SHU**: Perhitungan margin koperasi dan dana cadangan SHU anggota.

---

## 🚀 Cara Menjalankan Project

### Jalankan Development Server:
```bash
npm run dev
```
Buka browser di: `http://localhost:5175/`

### Build untuk Produksi:
```bash
npm run build
```

---

## 🛠️ Tech Stack Ringkas & Cepat
- **Frontend Framework**: React 18
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite v6
- **State Management**: React Context API + LocalStorage Reactive Store (Data sinkron otomatis antar tab dan peran).
