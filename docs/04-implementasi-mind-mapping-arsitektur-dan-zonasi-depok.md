# 04. Dokumentasi Implementasi Mind Mapping Architecture & Zonasi Distribusi 11 Kecamatan (63 Kelurahan) Kota Depok

Dokumen ini mencatat seluruh implementasi pembaruan alur sistem berdasarkan diagram resmi **Mind Mapping Architecture Sistem Marketplace Koperasi Merah Putih Kota Depok** (`src/images/alur.jpeg`), struktur data **11 Kecamatan & 63 Kelurahan**, pembagian **4 Zonasi Order & Distribusi**, serta fokus arsitektur pada tahap **Frontend (User Interface)**.

Tanggal Pembaruan: Rabu, 30 September 2026  
Status: **Terverifikasi & Live pada Port 5175**  
URL Lokal: [`http://localhost:5175/`](http://localhost:5175/)

---

## 1. Pemetaan Alur Sistem (Sesuai Diagram `alur.jpeg`)

Sesuai diagram arsitektur `alur.jpeg`, sistem rantai pasok dan marketplace Koperasi Merah Putih Mekarjaya terbagi menjadi 6 tahapan terintegrasi:

```
[Supplier (Anggota) & Supplier (Non-Anggota)]
                  │
                  ▼ (Supply Produk)
     [Koperasi Induk Mekarjaya] ◄──────────────► [Marketplace (Aplikasi)]
                  │                                        ▲
                  │ (Perintah Kirim)                       │ (Order Anggota)
                  ▼                                        ▼
    [Zonasi Order & Distribusi (4 Zona)]           [Anggota Koperasi]
                  │                                        ▲
                  ▼ (Instruksi per Zona)                   │ (Terima Produk)
       [Logistik / Transportasi]                           │
                  │ (Armada Mobil Box)                     │
                  ▼                                        │
[Cabang Koperasi Kelurahan (11 Kec / 63 Kel)] ─────────────┘
```

### 1.1 Supplier Komoditas (2 Kelompok Pemasok)
1. **Supplier (Anggota Koperasi)**:
   - **Produk Pertanian**: Cabai rawit merah, tomat, sayur mayur sup dari Kelompok Tani Mekar Subur & Petani Hidroponik Sawangan.
   - **Produk UMKM Anggota**: Sambal bawang kemasan botol (Ibu Eni Mekarjaya), keripik tempe renyah (Sukamaja Food), aneka olahan rumahan anggota.
   - **Produk Lokasi Depok**: Belimbing Dewa Depok, madu murni hutan, telur segar peternak ayam anggota.
2. **Supplier (Non Anggota)**:
   - **Distributor / Pabrik**: Pabrik beras pulen, pabrik minyak kelapa sawit skala industri pangan.
   - **Grosir**: Mitra grosir sembako komersial untuk buffer cadangan pangan (Bapokting).
   - **Produsen Nasional**: Minyak goreng Rose Brand, tepung terigu Bogasari, gula pasir Kristal Putih bermutu BPOM/SNI.

### 1.2 Koperasi Induk Mekarjaya (Pusat Kendali Eksekutif)
- **Fungsi Utama**:
  1. Manajemen Produk & Penetapan Tarif Subsidi Khusus Anggota.
  2. Pengadaan & Supply (Menyerap komoditas dari petani lokal dan produsen industri).
  3. Manajemen Stok Gudang Induk (Menjaga ketersediaan bahan pokok penting / Bapokting).
  4. Order Management (Verifikasi dan rekapitulasi pesanan masuk).
  5. Zonasi Distribusi (Memetakan pesanan ke 4 zona pengiriman).
  6. Instruksi Logistik (Penerbitan surat jalan digital dan penugasan armada mobil box).
  7. Laporan & Monitoring (Rekapitulasi omset, laba, dan Sisa Hasil Usaha / SHU).

### 1.3 Marketplace (Aplikasi Web & Mobile)
- **Fungsi Anggota**:
  - Anggota Login menggunakan identitas resmi anggota koperasi.
  - Lihat Produk & perbandingan harga normal vs harga khusus subsidi.
  - Pesan Komoditi dengan pilihan pengambilan di pos cabang terdekat atau antar ke rumah.
  - Pembayaran fleksibel (Saldo Simpanan Koperasi, QRIS, Virtual Account, atau Tunai).
  - Tracking Order secara live dari Gudang Induk hingga tiba di pos cabang kelurahan.
  - Notifikasi pesanan siap diambil.

### 1.4 Zonasi Order & Distribusi (4 Langkah Otomasi Sistem)
Sesuai tahapan pada peta alur `alur.jpeg`:
1. **Langkah 1**: Order masuk dari anggota melalui aplikasi marketplace.
2. **Langkah 2**: Sistem secara otomatis memfilter pesanan berdasarkan lokasi pembeli (Kecamatan & Kelurahan anggota).
3. **Langkah 3**: Order dikelompokkan per zona sesuai lokasi Koperasi Cabang (Zona 1, 2, 3, atau 4).
4. **Langkah 4**: Koperasi Induk menginstruksikan divisi logistik untuk pengiriman ke masing-masing cabang kelurahan.

### 1.5 Logistik & Transportasi (Armada Mobil Box Berpendingin)
- Armada mobil box (KKMP-01 s/d KKMP-04) dengan sensor pemantauan suhu rantai dingin (4°C) menjalankan instruksi pengiriman per zona dari Gudang Induk Mekarjaya ke pos cabang tujuan.

### 1.6 Cabang Koperasi Kelurahan Merah Putih
- Melayani anggota di seluruh kelurahan se-Kota Depok.
- Menerima drop-off logistik dan melakukan serah terima langsung kepada anggota pemesan.

---

## 2. Struktur Resmi 11 Kecamatan & 63 Kelurahan Kota Depok

| No | Kecamatan | Jumlah Kelurahan | Daftar Nama Kelurahan Resmi | Zonasi Distribusi | Pos Cabang Hub |
|---|---|---|---|---|---|
| 1 | **Beji** | 6 | Beji, Beji Timur, Kemiri Muka, Kukusan, Pondok Cina, Tanah Baru | **Zona 1 (Barat Laut)** | Pos Cabang Beji |
| 2 | **Bojongsari** | 7 | Bojongsari, Bojongsari Baru, Curug, Duren Mekar, Duren Seribu, Pondok Petir, Serua | **Zona 2 (Barat Daya)** | Pos Cabang Bojongsari |
| 3 | **Cilodong** | 5 | Cilodong, Jatimulya, Kalibaru, Kalimulya, Sukamaju | **Zona 4 (Pusat & Tenggara)** | Pos Cabang Cilodong |
| 4 | **Cimanggis** | 6 | Cisalak Pasar, Curug, Harjamukti, Mekarsari, Pasir Gunung Selatan, Tugu | **Zona 3 (Timur Laut)** | Pos Cabang Cimanggis |
| 5 | **Cinere** | 4 | Cinere, Gandul, Pangkalan Jati, Pangkalan Jati Baru | **Zona 1 (Barat Laut)** | Pos Cabang Cinere |
| 6 | **Cipayung** | 5 | Bojong Pondok Terong, Cipayung, Cipayung Jaya, Pondok Jaya, Ratu Jaya | **Zona 2 (Barat Daya)** | Pos Cabang Cipayung |
| 7 | **Limo** | 4 | Grogol, Krukut, Limo, Meruyung | **Zona 1 (Barat Laut)** | Pos Cabang Limo |
| 8 | **Pancoran Mas** | 6 | Depok, Depok Jaya, Mampang, Pancoran Mas, Rangkapan Jaya, Rangkapan Jaya Baru | **Zona 2 (Barat Daya)** | Pos Cabang Pancoran Mas |
| 9 | **Sawangan** | 7 | Bedahan, Cinangka, Kedaung, Pasir Putih, Pengasinan, Sawangan Baru, Sawangan | **Zona 2 (Barat Daya)** | Pos Cabang Sawangan |
| 10 | **Sukmajaya** | 6 | Abadijaya, Baktijaya, Cisalak, Mekarjaya, Sukmajaya, Tirtajaya | **Zona 4 (Pusat & Tenggara)** | Gedung Koperasi Induk Mekarjaya (Pusat) |
| 11 | **Tapos** | 7 | Cilangkap, Cimpaeun, Jatijajar, Leuwinanggung, Sukamaju Baru, Sukatani, Tapos | **Zona 3 (Timur Laut)** | Pos Cabang Tapos |
| **Total** | **11 Kecamatan** | **63 Kelurahan** | Seluruh wilayah administratif Kota Depok terlayani 100% | **4 Zona Distribusi** | **11 Pos Cabang Kecamatan** |

---

## 3. Pembagian 4 Zona Distribusi (Routing Logistik Depok)

1. **Zona 1 (Depok Barat Laut)**:
   - Cakupan: Kecamatan Beji (6), Cinere (4), Limo (4) — Total 14 Kelurahan.
   - Karakteristik: Perbatasan Jakarta Selatan/Tangerang Selatan, kawasan pendidikan (UI, Margonda), dan perumahan Cinere.
   - Armada: Mobil Box KKMP-03 (Driver: Doni Iskandar).
2. **Zona 2 (Depok Barat Daya)**:
   - Cakupan: Kecamatan Pancoran Mas (6), Cipayung (5), Sawangan (7), Bojongsari (7) — Total 25 Kelurahan.
   - Karakteristik: Kawasan sentra pertanian lokal, peternakan, perikanan air tawar, dan pemukiman berkembang.
   - Armada: Truk Engkel Berpendingin KKMP-01 (Driver: Bambang Suherman).
3. **Zona 3 (Depok Timur Laut)**:
   - Cakupan: Kecamatan Cimanggis (6), Tapos (7) — Total 13 Kelurahan.
   - Karakteristik: Koridor industri Raya Bogor KM 29 - KM 36, perumahan Cimanggis, dan Leuwinanggung.
   - Armada: Mobil Box Pendingin KKMP-04 (Driver: Budi Santoso).
4. **Zona 4 (Depok Pusat & Tenggara — Wilayah Induk Mekarjaya)**:
   - Cakupan: Kecamatan Sukmajaya (6), Cilodong (5) — Total 11 Kelurahan.
   - Karakteristik: Pusat administrasi pemerintahan Kota Depok, Gedung Koperasi Induk Mekarjaya (Jl. Tole Iskandar), dan Cilodong.
   - Armada: Mobil Box KKMP-02 (Driver: Ahmad Rifai).

---

## 4. Batasan Ruang Lingkup: Fokus Tahap Frontend Saja

Sesuai arahan spesifik: *"namun hanya sampai tahap frontend pising saja ya"*, arsitektur sistem pada dokumen diagram diimplementasikan secara interaktif dan berfokus penuh pada **Frontend (User Interface)**:
1. **Aplikasi Mobile (PWA & Responsive Web View)**: Antarmuka yang dioptimalkan untuk layar ponsel pintar anggota keluarga koperasi.
2. **Website Marketplace Resmi**: Katalog komoditas, pencarian cerdas, pemilih 11 kecamatan & 63 kelurahan, serta alur belanja transparan.
3. **Portal Multi-Role (5 Peran)**: Simulasi 1-klik untuk mencoba operasional Anggota, Cabang, Supplier, Logistik, dan Koperasi Induk secara lokal.

Semua data tersimpan secara reaktif melalui **React Context API & LocalStorage**, tanpa memerlukan server backend atau database eksternal terpisah.
