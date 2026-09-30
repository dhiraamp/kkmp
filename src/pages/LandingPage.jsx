import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserPlus,
  ShieldCheck,
  Truck,
  Percent,
  Leaf,
  Search,
  ArrowRight,
  Heart,
  Star,
  Store,
  Users,
  Building2,
  Handshake,
  CheckCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Tag,
  Filter,
  Package,
  Layers,
  Clock,
  PhoneCall,
  MapPin,
  Check,
  Smartphone,
  Monitor,
  LayoutDashboard,
  Box,
  Share2,
} from 'lucide-react';
import { useKkmp } from '../context/KkmpContext';
import {
  CATEGORIES,
  KECAMATAN_DEPOK,
  ZONASI_DEPOK,
  SUPPLIER_CATEGORIES,
  ALUR_SISTEM_STEPS,
} from '../data/mockData';

// Framer motion animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function LandingPage({ onOpenRoleModal }) {
  const {
    products,
    setCurrentRole,
    selectedKecamatanId,
    selectedKelurahan,
    setLocation,
    activeKecamatan,
    activeZonasi,
  } = useKkmp();

  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState({});

  // Active Kecamatan Tab in Kecamatan Explorer
  const [explorerKecId, setExplorerKecId] = useState(selectedKecamatanId || 'sukmajaya');
  const explorerKec =
    KECAMATAN_DEPOK.find((k) => k.id === explorerKecId) || KECAMATAN_DEPOK[0];
  const explorerZone =
    ZONASI_DEPOK.find((z) => z.id === explorerKec.zoneId) || ZONASI_DEPOK[0];

  const toggleFavorite = (productId, e) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCategory =
        selectedCategory === 'semua' || p.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const scrollToCatalog = () => {
    const el = document.getElementById('katalog-produk-unggulan');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWilayah = () => {
    const el = document.getElementById('jaringan-wilayah');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative space-y-16 pb-24 overflow-hidden">
      
      {/* Dynamic Ambient Background Glow Blobs */}
      <div className="absolute top-10 right-[-10%] w-[38rem] h-[38rem] bg-gradient-to-br from-red-300/20 via-rose-200/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10 animate-float-gentle" />
      <div className="absolute top-[28rem] left-[-8%] w-[32rem] h-[32rem] bg-gradient-to-tr from-amber-200/20 via-orange-100/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10 animate-float-reverse" />
      <div className="absolute top-[75rem] right-[5%] w-[30rem] h-[30rem] bg-gradient-to-br from-purple-200/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-soft" />

      {/* =========================================================================
          1. HERO SECTION (Ultra-Modern Glassmorphism & Staggered Animations)
         ========================================================================= */}
      <section className="relative pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Tagline, Title, Subtitle, CTA buttons, 4 Feature Pills */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-6 space-y-6"
            >
              
              <motion.div variants={fadeInUp} custom={0} className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-red-200/80 shadow-xs text-red-700 text-xs font-bold tracking-wide">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-red-600" />
                  <span className="uppercase text-[11px] font-black tracking-wider">
                    Melayani 11 Kecamatan &bull; 63 Kelurahan Se-Kota Depok
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-[3.35rem] font-black text-slate-900 tracking-tight leading-[1.12]">
                  Koperasi Merah Putih <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-red-700">
                    Mekarjaya
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                  Marketplace resmi Koperasi Merah Putih Kota Depok. Menghubungkan langsung kelompok tani, produsen UMKM, dan distributor resmi dengan seluruh anggota keluarga koperasi di 11 kecamatan melalui sistem zonasi rantai pasok terpadu.
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={fadeInUp} custom={1} className="flex flex-wrap items-center gap-3 pt-1">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={scrollToCatalog}
                  className="flex items-center gap-2.5 bg-gradient-to-r from-red-600 via-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold text-sm px-7 py-3.5 rounded-2xl shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/35 transition-all cursor-pointer group"
                >
                  <Store className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Lihat Katalog Komoditas &rarr;</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={scrollToWilayah}
                  className="flex items-center gap-2 bg-white/90 backdrop-blur-md hover:bg-red-50/80 text-red-600 border-2 border-red-500/80 font-extrabold text-sm px-6 py-3.5 rounded-2xl transition-all cursor-pointer shadow-sm hover:shadow-md"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Jelajahi 11 Kecamatan Depok</span>
                </motion.button>
              </motion.div>

              {/* 4 Feature Pills (Value propositions with frosted glass) */}
              <motion.div variants={fadeInUp} custom={2} className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200/70">
                <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100/80 shadow-2xs">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 leading-tight truncate">Supplier Sah</p>
                    <p className="text-[10px] text-slate-500 truncate">Anggota & Industri</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100/80 shadow-2xs">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 leading-tight truncate">Distribusi Cepat</p>
                    <p className="text-[10px] text-slate-500 truncate">4 Zona &bull; 11 Cabang</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100/80 shadow-2xs">
                    <Percent className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 leading-tight truncate">Harga Subsidi</p>
                    <p className="text-[10px] text-slate-500 truncate">Hemat s/d 15%</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100/80 shadow-2xs">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 leading-tight truncate">Lokal Depok</p>
                    <p className="text-[10px] text-slate-500 truncate">63 Kelurahan</p>
                  </div>
                </div>
              </motion.div>

            </motion.div>

            {/* Right Column: Hero Visual with Frosted Glass Floating Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-slate-900 aspect-16/10 group backdrop-blur-xs">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80"
                  alt="Koperasi Merah Putih Mekarjaya"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                />

                {/* Overlaid badges representing the real image details */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/35 to-transparent p-6 flex flex-col justify-between">
                  <div className="flex items-center justify-between gap-2">
                    <span className="bg-red-600/90 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-red-400/50 shadow-md">
                      🇮🇩 KOPERASI RESMI KOTA DEPOK
                    </span>
                    <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-sm">
                      📍 Gedung Induk Mekarjaya
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-600 text-white flex items-center justify-center font-black text-xl shadow-lg border-2 border-white/80">
                        KKMP
                      </div>
                      <div>
                        <h4 className="text-white font-black text-base sm:text-lg drop-shadow-xs">
                          Armada Rantai Pasok 11 Kecamatan Depok
                        </h4>
                        <p className="text-slate-300 text-xs">
                          Mobil Box Berpendingin & Routing 4 Zona Distribusi
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Frosted Pill Badge 1 (Live Metric) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-3 bg-white/90 backdrop-blur-xl border border-white/90 p-3 rounded-2xl shadow-xl shadow-slate-900/10"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Cakupan Wilayah</p>
                  <p className="text-xs font-black text-slate-900">11 Kecamatan &bull; 63 Kelurahan</p>
                </div>
              </motion.div>

              {/* Floating Frosted Pill Badge 2 (Sensor Status) */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-4 -right-4 hidden sm:flex items-center gap-2.5 bg-white/90 backdrop-blur-xl border border-white/90 px-3.5 py-2 rounded-2xl shadow-xl shadow-slate-900/10"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-xs font-black text-slate-800">
                  Rantai Dingin: <strong className="text-emerald-600">4°C Higienis</strong>
                </span>
              </motion.div>
            </motion.div>

          </div>

          {/* Floating Search Bar (Centered at bottom of hero with modern frosted glass) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 relative max-w-3xl mx-auto"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                scrollToCatalog();
              }}
              className="bg-white/85 backdrop-blur-2xl rounded-2xl shadow-xl shadow-slate-200/50 border border-white/80 p-2 sm:p-2.5 flex items-center gap-2 focus-within:ring-4 focus-within:ring-red-500/15 focus-within:border-red-500 transition-all duration-300"
            >
              <div className="pl-3 text-slate-400">
                <Search className="w-5 h-5 text-red-600" />
              </div>
              <input
                id="search-input-hero"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari produk kebutuhan Anda (beras pandan wangi, minyak goreng, telur, sayur, sambal)..."
                className="w-full text-xs sm:text-sm font-medium bg-transparent border-none focus:outline-hidden text-slate-800 placeholder-slate-400"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold text-xs sm:text-sm px-6 sm:px-8 py-3 rounded-xl shadow-md shadow-red-500/20 transition-all shrink-0 cursor-pointer active:scale-95"
              >
                Cari
              </button>
            </form>
          </motion.div>

        </div>
      </section>

      {/* =========================================================================
          2. KATEGORI KOMODITAS (8 Kategori Rapi & Responsif)
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <motion.button
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id === selectedCategory ? 'semua' : cat.id);
                  scrollToCatalog();
                }}
                className={`p-3 rounded-2xl border-2 transition-all duration-300 text-center flex flex-col items-center justify-between group cursor-pointer backdrop-blur-md ${
                  isSelected
                    ? 'border-red-600 bg-red-50/90 shadow-md ring-2 ring-red-500/20'
                    : 'border-white/80 bg-white/75 hover:border-red-300 hover:bg-white shadow-2xs hover:shadow-md'
                }`}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden mb-2 bg-slate-100 shadow-2xs aspect-square shrink-0">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="min-w-0 w-full">
                  <p className="text-xs font-bold text-slate-800 truncate group-hover:text-red-600 transition-colors">
                    {cat.name}
                  </p>
                  <span className="text-[10px] text-slate-400 line-clamp-1 block">
                    {cat.desc}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          3. JARINGAN 11 KECAMATAN & 63 KELURAHAN KOTA DEPOK (Data Lengkap)
         ========================================================================= */}
      <section id="jaringan-wilayah" className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="bg-white/85 backdrop-blur-xl rounded-3xl border border-white/80 p-6 sm:p-8 shadow-md shadow-slate-200/50 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" />
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Jaringan 11 Kecamatan & 63 Kelurahan Koperasi Kota Depok
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Pilih kecamatan di bawah ini untuk melihat daftar kelurahan, zonasi distribusi, dan pos cabang penerima terdekat:
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-bold">Wilayah Aktif Anda:</span>
              <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-black border border-red-200">
                Kel. {selectedKelurahan} (Kec. {activeKecamatan.name})
              </span>
            </div>
          </div>

          {/* 11 Kecamatan Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-bold">
            {KECAMATAN_DEPOK.map((kec) => {
              const isSelected = explorerKecId === kec.id;

              return (
                <button
                  key={kec.id}
                  onClick={() => setExplorerKecId(kec.id)}
                  className={`px-3.5 py-2 rounded-2xl transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-md shadow-red-500/25 scale-102 font-extrabold'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span>{kec.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {kec.totalKelurahan}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Kecamatan Detail Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-slate-50/90 border border-slate-200/90 space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/70 pb-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-black text-slate-900">
                    {explorerKec.fullName}
                  </h4>
                  <span className="text-xs font-bold text-red-600 bg-red-100 px-2.5 py-0.5 rounded-full border border-red-200">
                    {explorerZone.code} &bull; {explorerZone.title}
                  </span>
                  {explorerKec.isCenter && (
                    <span className="text-xs font-black text-white bg-slate-900 px-2.5 py-0.5 rounded-full">
                      Pusat Koperasi Induk
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  {explorerKec.address} &bull; Kepala Pos: <strong>{explorerKec.manager}</strong> ({explorerKec.telp})
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-600 font-extrabold bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                  Kesiapan Stok: {explorerKec.stockScore}
                </span>
              </div>
            </div>

            {/* List of Kelurahan in Selected Kecamatan */}
            <div className="space-y-2">
              <p className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
                Daftar {explorerKec.totalKelurahan} Kelurahan di {explorerKec.fullName} (Klik untuk menetapkan sebagai lokasi aktif):
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
                {explorerKec.kelurahan.map((kel) => {
                  const isCurrentActive =
                    selectedKecamatanId === explorerKec.id && selectedKelurahan === kel;

                  return (
                    <button
                      key={kel}
                      onClick={() => setLocation(explorerKec.id, kel)}
                      className={`p-2.5 rounded-2xl text-xs font-bold transition-all text-left flex flex-col justify-between cursor-pointer border ${
                        isCurrentActive
                          ? 'bg-red-600 text-white border-red-600 shadow-md ring-2 ring-red-400/30'
                          : 'bg-white hover:bg-red-50/70 border-slate-200 hover:border-red-300 text-slate-800'
                      }`}
                    >
                      <span className="truncate">{kel}</span>
                      <span className={`text-[9px] mt-1 font-semibold ${
                        isCurrentActive ? 'text-red-200' : 'text-slate-400'
                      }`}>
                        {isCurrentActive ? '✓ Lokasi Anda' : 'Pilih Lokasi'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          5. PRODUK UNGGULAN (Rasio Gambar 1:1 Konsisten & Rapi)
         ========================================================================= */}
      <section id="katalog-produk-unggulan" className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Katalog Produk Unggulan
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Komoditas kebutuhan pokok dan produk olahan UMKM berkualitas dengan harga subsidi khusus anggota
            </p>
          </div>

          {/* Category Filter Pills with Badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-bold scrollbar-none">
            {[
              { id: 'semua', label: 'Semua Produk' },
              { id: 'sembako', label: 'Sembako' },
              { id: 'pertanian', label: 'Pertanian' },
              { id: 'segar', label: 'Produk Segar' },
              { id: 'umkm', label: 'Produk UMKM' },
              { id: 'rumahtangga', label: 'Rumah Tangga' },
              { id: 'elektronik', label: 'Elektronik' },
              { id: 'fashion', label: 'Fashion' },
              { id: 'lainnya', label: 'Lainnya' },
            ].map((tab) => (
              <motion.button
                whileTap={{ scale: 0.95 }}
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-full transition-all shrink-0 cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-red-600 text-white shadow-md shadow-red-500/20'
                    : 'bg-white/80 hover:bg-white text-slate-600 border border-slate-200/60'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid: Equal Aspect Ratios & Structured Cards */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/80 p-12 text-center text-slate-400 space-y-2">
            <Search className="w-10 h-10 mx-auto text-slate-300" />
            <p className="font-bold text-slate-700">Produk tidak ditemukan</p>
            <p className="text-xs">Coba cari dengan kata kunci lain atau pilih kategori Semua.</p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {filteredProducts.map((p) => {
              const isFav = !!favorites[p.id];
              const effectivePrice = p.memberPrice || p.price;
              const savingsPercent = p.memberPrice
                ? Math.round(((p.price - p.memberPrice) / p.price) * 100)
                : 0;

              return (
                <motion.div
                  layout
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.25 }}
                  key={p.id}
                  className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-2xs hover:shadow-xl hover:shadow-slate-300/40 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  {/* Strict Aspect Ratio Container for Product Photo (1:1 Ratio) */}
                  <div className="relative w-full aspect-square bg-slate-100 overflow-hidden shrink-0">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
                    />

                    {/* Savings Tag */}
                    {savingsPercent > 0 && (
                      <div className="absolute top-2.5 left-2.5 bg-red-600/90 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md border border-red-400/40">
                        Hemat {savingsPercent}%
                      </div>
                    )}

                    {/* Wishlist Heart Button */}
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      type="button"
                      onClick={(e) => toggleFavorite(p.id, e)}
                      className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-400 hover:text-red-600 shadow-sm transition-colors cursor-pointer border border-white/60"
                      title="Simpan ke favorit"
                    >
                      <Heart className={`w-4 h-4 transition-colors ${isFav ? 'fill-red-600 text-red-600' : ''}`} />
                    </motion.button>

                    {/* Supplier Tag Overlay at bottom of image with Frosted Glass */}
                    <div className="absolute bottom-2 left-2 right-2 bg-slate-950/75 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-xl flex items-center justify-between border border-white/10">
                      <span className="truncate max-w-[70%] font-medium">{p.supplier}</span>
                      <span className="font-bold text-amber-300">Stok: {p.stock}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      {/* Rating & Sold count */}
                      <div className="flex items-center gap-1.5 text-[11px] font-bold">
                        <span className="flex items-center gap-0.5 text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          {p.rating}
                        </span>
                        <span className="text-slate-400 font-normal">({p.sold} terjual)</span>
                      </div>

                      {/* Product Title (Consistent 2-line height) */}
                      <h3 className="h-10 text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                        {p.name}
                      </h3>

                      <p className="text-[11px] text-slate-500">
                        {p.unit}
                      </p>
                    </div>

                    {/* Pricing Block & Add To Cart Button */}
                    <div className="pt-2.5 border-t border-slate-100 flex items-end justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-[10px] font-extrabold uppercase text-emerald-600 tracking-wider block">
                          Harga Anggota:
                        </span>
                        <p className="text-sm sm:text-base font-black text-red-600 leading-tight">
                          Rp {effectivePrice.toLocaleString('id-ID')}
                        </p>
                        {p.memberPrice && (
                          <p className="text-[10px] text-slate-400 line-through">
                            Rp {p.price.toLocaleString('id-ID')}
                          </p>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => navigate('/portal/anggota')}
                        className="text-xs font-bold px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-red-600 text-white shadow-xs transition-all flex items-center gap-1.5 shrink-0 cursor-pointer group/btn"
                        title="Pesan Melalui Portal Anggota"
                      >
                        <span>Pesan</span>
                        <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </motion.div>
        )}

      </section>

      {/* =========================================================================
          6. TENTANG KAMI
         ========================================================================= */}
      <section id="tentang-kami" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/80 p-6 sm:p-10 shadow-md shadow-slate-200/50 space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs font-black text-red-600 uppercase tracking-widest block mb-1">
              Profil Koperasi Merah Putih Mekarjaya
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Membangun Kemandirian Pangan Keluarga di Kota Depok
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
              Koperasi Merah Putih Mekarjaya didirikan sebagai wadah gotong royong ekonomi bagi warga Kota Depok. Menghubungkan langsung kelompok tani, peternak, dan produsen UMKM dengan 11 pos cabang kecamatan dan 63 kelurahan se-Kota Depok tanpa perantara tengkulak.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-red-50/70 border border-red-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black">
                1
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">Kedaulatan Pangan Anggota</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Menyediakan sembako berkualitas premium (beras, minyak, telur, sayur) dengan harga subsidi terjangkau untuk seluruh keluarga anggota.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-orange-50/70 border border-orange-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black">
                2
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">Distribusi Cepat 11 Kecamatan</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Jaringan pos cabang di 11 kecamatan dan 63 kelurahan Kota Depok dengan armada mobil box pendingin memastikan barang tiba segar setiap hari.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black">
                3
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">Transparansi SHU & Simpanan</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pengelolaan simpanan dan pembagian Sisa Hasil Usaha (SHU) tahunan secara adil berdasarkan keaktifan belanja setiap anggota.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. BERITA & PENGUMUMAN KOPERASI
         ========================================================================= */}
      <section id="berita" className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-black text-red-600 uppercase tracking-widest block mb-1">
              Informasi Terkini
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Warta & Berita Koperasi Depok
            </h3>
          </div>
          <p className="text-xs text-slate-500 max-w-sm">
            Kabar penyaluran komoditas, kemitraan UMKM, dan kegiatan anggota koperasi di 11 kecamatan Kota Depok.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/80 overflow-hidden shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
            <div className="aspect-16/10 bg-slate-100 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"
                alt="Penyaluran Beras"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold bg-red-100 text-red-700 px-2.5 py-0.5 rounded-full">
                  Distribusi Sembako
                </span>
                <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-red-600 transition-colors mt-2 leading-snug">
                  Penyaluran 15 Ton Beras Subsidi Sukamajaya Siap Disebar ke 11 Kecamatan Depok
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Koperasi Induk Mekarjaya mulai mendistribusikan beras pandan wangi dan rojolele super kepada anggota di 4 zona distribusi.
                </p>
              </div>
              <p className="text-[10px] text-slate-400 pt-3 border-t border-slate-100">
                30 September 2026 &bull; Tim Humas KKMP Depok
              </p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/80 overflow-hidden shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
            <div className="aspect-16/10 bg-slate-100 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=600&q=80"
                alt="Pertanian Depok"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full">
                  Kemitraan Petani
                </span>
                <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-red-600 transition-colors mt-2 leading-snug">
                  Kerja Sama Panen Langsung dengan Kelompok Tani Mekar Subur Cipayung
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Pasokan cabai rawit dan sayur sop dipetik segar langsung dari lahan binaan di Cipayung dan Sawangan, menjamin mutu komoditas.
                </p>
              </div>
              <p className="text-[10px] text-slate-400 pt-3 border-t border-slate-100">
                28 September 2026 &bull; Divisi Rantai Pasok
              </p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/80 overflow-hidden shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between">
            <div className="aspect-16/10 bg-slate-100 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=600&q=80"
                alt="UMKM Depok"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full">
                  Pemberdayaan UMKM
                </span>
                <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-red-600 transition-colors mt-2 leading-snug">
                  Produk Sambal Kemasan & Keripik Tempe Sukamajaya Masuk Etalase Resmi Koperasi
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Sebanyak 24 UMKM kuliner ibu-ibu anggota koperasi kini telah terdaftar resmi dan produknya diserap langsung melalui katalog marketplace.
                </p>
              </div>
              <p className="text-[10px] text-slate-400 pt-3 border-t border-slate-100">
                25 September 2026 &bull; Bidang UMKM & Anggota
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. PUSAT BANTUAN & FAQ
         ========================================================================= */}
      <section id="bantuan" className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <span className="text-xs font-black text-red-400 uppercase tracking-widest block mb-1">
                Layanan & Dukungan Anggota
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Pusat Bantuan Koperasi Merah Putih Mekarjaya
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/6281299887766"
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>WhatsApp CS: 0812-9988-7766</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
              <h4 className="font-bold text-white text-sm">Bagaimana cara mendapatkan harga anggota?</h4>
              <p className="text-slate-300 leading-relaxed">
                Setiap warga Depok yang terdaftar sebagai anggota koperasi otomatis mendapatkan tarif subsidi pada seluruh komoditas tanpa batas minimum pembelian.
              </p>
            </div>

            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
              <h4 className="font-bold text-white text-sm">Bagaimana cara mengambil belanjaan di pos cabang?</h4>
              <p className="text-slate-300 leading-relaxed">
                Pilih pos cabang di kecamatan/kelurahan Anda saat checkout. Tunjukkan nomor pesanan (ORD) kepada petugas pos cabang saat serah terima barang tanpa biaya tambahan (Gratis).
              </p>
            </div>

            <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
              <h4 className="font-bold text-white text-sm">Kapan Sisa Hasil Usaha (SHU) dibagikan?</h4>
              <p className="text-slate-300 leading-relaxed">
                SHU dibagikan setiap tahun buku setelah Rapat Anggota Tahunan (RAT) berdasarkan akumulasi simpanan dan frekuensi transaksi belanja anggota.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. FOOTER
         ========================================================================= */}
      <footer className="border-t border-slate-200/80 pt-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-4 gap-8 pb-8 border-b border-slate-100">
          <div className="space-y-2">
            <h4 className="font-black text-slate-900 text-sm">Koperasi Merah Putih Mekarjaya</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Kantor Pusat: Jl. Tole Iskandar No. 45, Mekarjaya, Kec. Sukmajaya, Kota Depok, Jawa Barat 16412.
            </p>
            <p className="text-[11px] text-slate-400">
              Badan Hukum Koperasi No: AHU-0012891.AH.01.26.TAHUN 2026
            </p>
          </div>

          <div>
            <h5 className="font-bold text-slate-800 mb-2.5">Menu Navigasi</h5>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#katalog-produk-unggulan" className="hover:text-red-600">Katalog Produk Sembako</a></li>
              <li><a href="#jaringan-wilayah" className="hover:text-red-600">Jaringan 11 Kecamatan</a></li>
              <li><button onClick={() => { setCurrentRole('anggota'); navigate('/portal/anggota'); }} className="hover:text-red-600 cursor-pointer">Portal Anggota Koperasi</button></li>
              <li><button onClick={() => { setCurrentRole('cabang'); navigate('/portal/cabang'); }} className="hover:text-red-600 cursor-pointer">Portal Pos Cabang Kecamatan</button></li>
              <li><button onClick={() => { setCurrentRole('supplier'); navigate('/portal/supplier'); }} className="hover:text-red-600 cursor-pointer">Portal Supplier & UMKM</button></li>
              <li><button onClick={() => { setCurrentRole('logistik'); navigate('/portal/logistik'); }} className="hover:text-red-600 cursor-pointer">Armada Logistik Distribusi</button></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-800 mb-2.5">Wilayah Layanan 11 Kecamatan</h5>
            <p className="text-xs text-slate-500 leading-relaxed">
              Beji &bull; Bojongsari &bull; Cilodong &bull; Cimanggis &bull; Cinere &bull; Cipayung &bull; Limo &bull; Pancoran Mas &bull; Sawangan &bull; Sukmajaya &bull; Tapos (Total 63 Kelurahan).
            </p>
          </div>

          <div>
            <h5 className="font-bold text-slate-800 mb-2.5">Bantuan & Kontak</h5>
            <p className="text-xs text-slate-500">
              WhatsApp Layanan: <strong>0812-9988-7766</strong><br />
              Email: info@kkmp-mekarjaya.id<br />
              Jam Operasional: Senin - Sabtu (08.00 - 17.00 WIB)
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400">
          <p>© 2026 Koperasi Merah Putih Mekarjaya Kota Depok. Seluruh Hak Cipta Dilindungi.</p>
          <p>Sistem Rantai Pasok Terpadu 11 Kecamatan & 63 Kelurahan.</p>
        </div>
      </footer>

    </div>
  );
}
