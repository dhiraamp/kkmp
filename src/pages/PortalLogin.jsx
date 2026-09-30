import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Store,
  Handshake,
  Truck,
  Building2,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  ChevronRight,
  HelpCircle,
  Activity,
  Layers,
  Check,
} from 'lucide-react';
import { useKkmp } from '../context/KkmpContext';
import { ROLE_INFO } from '../data/mockData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function PortalLogin() {
  const { currentRole, setCurrentRole } = useKkmp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('quick'); // 'quick' | 'form'
  const [selectedRoleId, setSelectedRoleId] = useState('anggota');
  const [email, setEmail] = useState('anggota@kkmp-depok.id');
  const [password, setPassword] = useState('password123');

  const ROLES = [
    {
      id: 'anggota',
      step: '01',
      title: 'Anggota Koperasi',
      subtitle: 'Konsumen & Keluarga Anggota',
      category: 'Pemesanan Komoditi',
      desc: 'Buka aplikasi marketplace, pilih produk kebutuhan pokok harga subsidi, pesan komoditi, bayar saldo/QRIS, dan terima dari cabang terdekat.',
      icon: Users,
      email: 'anggota@kkmp-depok.id',
      theme: 'purple',
      gradient: 'from-purple-600 via-indigo-600 to-purple-700',
      glowColor: 'hover:shadow-purple-500/20 hover:border-purple-400',
      badgeStyle: 'bg-purple-50 text-purple-700 border-purple-200',
      accentBg: 'bg-purple-500/10 text-purple-600',
      btnHover: 'group-hover:bg-purple-600 group-hover:text-white',
      avatarGradient: 'from-purple-500 to-indigo-600',
      demoInitials: 'BS',
      demoName: 'Budi Santoso',
      demoRole: 'Kel. Mekarjaya, Sukmajaya',
      features: ['Harga Khusus Anggota', 'Simpanan & SHU', 'Ambil Cabang Terdekat'],
      route: '/portal/anggota',
    },
    {
      id: 'cabang',
      step: '02',
      title: 'Koperasi Cabang',
      subtitle: 'Pos Cabang 11 Kecamatan & 63 Kelurahan',
      category: 'Distribusi Cabang',
      desc: 'Menerima drop-off pasokan logistik per zona, kelola stok cabang kelurahan, dan melayani serah terima langsung ke anggota.',
      icon: Store,
      email: 'cabang@kkmp-depok.id',
      theme: 'orange',
      gradient: 'from-amber-500 via-orange-600 to-red-600',
      glowColor: 'hover:shadow-orange-500/20 hover:border-orange-400',
      badgeStyle: 'bg-orange-50 text-orange-700 border-orange-200',
      accentBg: 'bg-orange-500/10 text-orange-600',
      btnHover: 'group-hover:bg-orange-600 group-hover:text-white',
      avatarGradient: 'from-amber-500 to-orange-600',
      demoInitials: 'SR',
      demoName: 'Siti Rahmawati',
      demoRole: 'Pos Sukmajaya (Mekarjaya)',
      features: ['11 Kecamatan Depok', '63 Kelurahan Tercover', 'Serah Terima Anggota'],
      route: '/portal/cabang',
    },
    {
      id: 'supplier',
      step: '03',
      title: 'Supplier Komoditas',
      subtitle: 'Mitra Anggota & Non Anggota',
      category: 'Penyedia Barang',
      desc: 'Suplai produk pertanian binaan, UMKM lokal Depok, serta pasokan distributor dan produsen pangan nasional ke Koperasi Induk.',
      icon: Handshake,
      email: 'supplier@kkmp-depok.id',
      theme: 'emerald',
      gradient: 'from-emerald-500 via-teal-600 to-emerald-700',
      glowColor: 'hover:shadow-emerald-500/20 hover:border-emerald-400',
      badgeStyle: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      accentBg: 'bg-emerald-500/10 text-emerald-600',
      btnHover: 'group-hover:bg-emerald-600 group-hover:text-white',
      avatarGradient: 'from-emerald-500 to-teal-600',
      demoInitials: 'HW',
      demoName: 'Hendra Wijaya',
      demoRole: 'Kel. Tani Mekar Subur Depok',
      features: ['Suplai Anggota & Non-Anggota', 'Kontrak Serapan Panen', 'Rekap Pembayaran'],
      route: '/portal/supplier',
    },
    {
      id: 'logistik',
      step: '04',
      title: 'Logistik & Distribusi',
      subtitle: 'Armada Pengiriman 4 Zona Depok',
      category: 'Armada Pengiriman',
      desc: 'Armada mobil box & truk berpendingin mendistribusikan barang dari Koperasi Induk ke pos cabang kelurahan sesuai 4 rute zona.',
      icon: Truck,
      email: 'logistik@kkmp-depok.id',
      theme: 'blue',
      gradient: 'from-blue-600 via-indigo-600 to-cyan-600',
      glowColor: 'hover:shadow-blue-500/20 hover:border-blue-400',
      badgeStyle: 'bg-blue-50 text-blue-700 border-blue-200',
      accentBg: 'bg-blue-500/10 text-blue-600',
      btnHover: 'group-hover:bg-blue-600 group-hover:text-white',
      avatarGradient: 'from-blue-500 to-indigo-600',
      demoInitials: 'AR',
      demoName: 'Ahmad Rifai',
      demoRole: 'Mobil Box KKMP-02 (Zona 4 - Pusat)',
      features: ['Rute 4 Zona Depok', 'Sensor Suhu Rantai Dingin', 'Surat Jalan Digital'],
      route: '/portal/logistik',
    },
    {
      id: 'admin',
      step: '05',
      title: 'Koperasi Induk',
      subtitle: 'Pusat Komando & Pengawas Eksekutif',
      category: 'Admin Pusat',
      desc: 'Pusat kendali eksekutif, pengadaan & supply, manajemen stok terpusat (Bapokting), filtering zonasi order, dan instruksi logistik.',
      icon: Building2,
      email: 'admin@kkmp-depok.id',
      theme: 'red',
      gradient: 'from-red-600 via-rose-600 to-red-800',
      glowColor: 'hover:shadow-red-500/20 hover:border-red-400',
      badgeStyle: 'bg-red-50 text-red-700 border-red-200',
      accentBg: 'bg-red-500/10 text-red-600',
      btnHover: 'group-hover:bg-red-600 group-hover:text-white',
      avatarGradient: 'from-red-600 to-rose-700',
      demoInitials: 'BS',
      demoName: 'Drs. H. Bambang S.',
      demoRole: 'Pengurus Koperasi Induk Mekarjaya',
      features: ['Manajemen Pengadaan & Stok', 'Otomasi 4 Zona Order', 'Laporan Keuangan & SHU'],
      route: '/portal/admin',
    },
  ];

  const handleQuickLogin = (r) => {
    setCurrentRole(r.id);
    navigate(r.route);
  };

  const handleFormLogin = (e) => {
    e.preventDefault();
    setCurrentRole(selectedRoleId);
    navigate(`/portal/${selectedRoleId}`);
  };

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 overflow-hidden">
      
      {/* Ambient glowing gradient orbs */}
      <div className="absolute top-10 left-1/4 w-[36rem] h-[36rem] bg-red-200/20 rounded-full blur-3xl pointer-events-none -z-10 animate-float-gentle" />
      <div className="absolute bottom-10 right-1/4 w-[36rem] h-[36rem] bg-indigo-200/20 rounded-full blur-3xl pointer-events-none -z-10 animate-float-reverse" />

      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* =========================================================================
            HEADER & TITLE SECTION
           ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/90 shadow-xs text-xs font-bold text-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-red-600 uppercase tracking-wider text-[11px] font-black">
              KKMP KOTA DEPOK
            </span>
            <span className="text-slate-300">&bull;</span>
            <span className="text-slate-500">Sistem Terintegrasi Koperasi Kota Depok</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Portal Layanan Koperasi Merah Putih
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Pilih peran operasional Anda untuk masuk langsung ke dashboard. Setiap peran terhubung secara *real-time* ke alur rantai pasok Koperasi Merah Putih Mekarjaya.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="inline-flex p-1.5 bg-slate-200/70 backdrop-blur-md rounded-2xl text-xs font-bold text-slate-700 shadow-inner">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab('quick')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'quick'
                  ? 'bg-white text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Pilih Peran Operasional</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab('form')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'form'
                  ? 'bg-white text-slate-950 shadow-md font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Lock className="w-4 h-4 text-slate-500" />
              <span>Formulir Kredensial</span>
            </motion.button>
          </div>
        </motion.div>

        {/* =========================================================================
            INTERACTIVE SUPPLY CHAIN PIPELINE MINI-BAR
           ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/80 p-3 sm:p-4 shadow-sm"
        >
          <div className="flex items-center justify-between gap-2 overflow-x-auto text-xs pb-1 sm:pb-0 scrollbar-none">
            <div className="flex items-center gap-2 text-slate-400 font-bold shrink-0 pl-2">
              <Layers className="w-4 h-4 text-red-600" />
              <span className="text-[11px] uppercase tracking-wider text-slate-700">Alur Rantai:</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {ROLES.map((r, idx) => (
                <React.Fragment key={r.id}>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleQuickLogin(r)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200/90 bg-slate-50/80 hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all cursor-pointer text-[11px] font-bold text-slate-700 shadow-2xs"
                  >
                    <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[9px] font-black">
                      {idx + 1}
                    </span>
                    <span>{r.title}</span>
                  </motion.button>
                  {idx < ROLES.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>

        {/* =========================================================================
            TAB 1: ULTRA-MODERN 1-CLICK ROLE CARDS
           ========================================================================= */}
        {activeTab === 'quick' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
          >
            {ROLES.map((r) => {
              const Icon = r.icon;
              const isCurrent = currentRole === r.id;

              return (
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.25 }}
                  key={r.id}
                  onClick={() => handleQuickLogin(r)}
                  className={`bg-white/85 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border-2 transition-all duration-300 flex flex-col justify-between space-y-5 cursor-pointer group shadow-sm hover:shadow-2xl ${r.glowColor} ${
                    isCurrent
                      ? 'ring-2 ring-red-500 border-red-500 bg-red-50/20'
                      : 'border-white/80 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-4">
                    
                    {/* Top Row: Icon + Step Badge */}
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${r.gradient} text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-1 transition-all duration-300`}
                      >
                        <Icon className="w-7 h-7" />
                      </div>

                      <div className="text-right">
                        <span className="inline-block text-[10px] font-black tracking-widest text-slate-400 uppercase">
                          TAHAP {r.step}
                        </span>
                        <div className={`mt-0.5 text-[11px] font-extrabold px-3 py-0.5 rounded-full border ${r.badgeStyle}`}>
                          {r.category}
                        </div>
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-red-600 transition-colors">
                        {r.title}
                      </h3>
                      <p className="text-xs font-semibold text-slate-400 mt-0.5">
                        {r.subtitle}
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed mt-2.5">
                        {r.desc}
                      </p>
                    </div>

                    {/* Key Features Micro-chips */}
                    <div className="pt-1 flex flex-wrap gap-1.5">
                      {r.features.map((feat, fIdx) => (
                        <span
                          key={fIdx}
                          className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-100/80 border border-slate-200/60 px-2.5 py-1 rounded-lg"
                        >
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>{feat}</span>
                        </span>
                      ))}
                    </div>

                  </div>

                  {/* Bottom: Demo User Avatar & Action Button */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${r.avatarGradient} text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs`}
                      >
                        {r.demoInitials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {r.demoName}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">
                          {r.demoRole}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      className={`shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-900 text-white transition-all shadow-md group-hover:shadow-lg ${r.btnHover}`}
                    >
                      <span>Masuk</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </motion.div>
              );
            })}

            {/* Card 6: Guide & FAQ Box */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.01 }}
              className="bg-gradient-to-br from-slate-900/95 via-slate-900/95 to-slate-950/95 backdrop-blur-2xl text-white rounded-3xl p-7 border border-slate-800 flex flex-col justify-between shadow-2xl space-y-6"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 text-white flex items-center justify-center shadow-inner">
                  <Sparkles className="w-7 h-7 text-amber-400" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">
                    PANDUAN OPERASIONAL RESMI
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">
                    Aksesibilitas Multi-Layanan
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2">
                    Sistem operasional terintegrasi memungkinkan pengurus koperasi, mitra cabang kelurahan, logistik pengiriman, dan supplier mengakses dashboard sesuai kewenangan otentikasi resmi masing-masing.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-white transition-colors"
                >
                  <span>&larr; Halaman Depan Marketplace</span>
                </Link>
                <span className="text-[10px] text-slate-400">Depok 2026</span>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* =========================================================================
            TAB 2: CLASSIC CREDENTIAL FORM
           ========================================================================= */}
        {activeTab === 'form' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-xl mx-auto bg-white/90 backdrop-blur-2xl rounded-3xl border border-white/80 p-7 sm:p-9 shadow-2xl space-y-6"
          >
            <div className="space-y-1.5 border-b border-slate-100 pb-4">
              <h3 className="text-xl font-black text-slate-900">
                Formulir Kredensial Multi-Peran
              </h3>
              <p className="text-xs text-slate-500">
                Pilih peran tujuan dan konfirmasi kredensial akun operasional:
              </p>
            </div>

            <form onSubmit={handleFormLogin} className="space-y-4 text-xs">
              {/* Select Role */}
              <div className="space-y-2">
                <label className="font-bold text-slate-700 block">Pilih Peran Sistem:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ROLES.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => {
                        setSelectedRoleId(r.id);
                        setEmail(r.email);
                      }}
                      className={`p-3 rounded-2xl border-2 text-left flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                        selectedRoleId === r.id
                          ? 'border-red-600 bg-red-50 text-red-700 shadow-sm'
                          : 'border-slate-200 bg-slate-50/60 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="truncate">{r.title}</p>
                        <p className="text-[10px] text-slate-400 font-normal">{r.category}</p>
                      </div>
                      {selectedRoleId === r.id && <span className="text-red-600 font-black">✓</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Alamat Email:</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-slate-800 font-medium focus:outline-red-500 text-xs"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="font-bold text-slate-700 block">Kata Sandi:</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-slate-800 font-medium focus:outline-red-500 text-xs"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-black text-xs sm:text-sm py-3.5 rounded-2xl shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Masuk ke Dashboard {ROLES.find((r) => r.id === selectedRoleId)?.title}</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        )}

      </div>
    </div>
  );
}
