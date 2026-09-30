import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Store,
  Handshake,
  Truck,
  Building2,
  X,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Check,
} from 'lucide-react';
import { useKkmp } from '../context/KkmpContext';

export default function RoleSwitcherModal({ isOpen, onClose }) {
  const { currentRole, setCurrentRole } = useKkmp();
  const navigate = useNavigate();

  const ROLES = [
    {
      id: 'anggota',
      step: '01',
      title: 'Anggota Koperasi',
      subtitle: 'Konsumen & Keluarga Anggota',
      category: 'Pemesanan Komoditi',
      desc: 'Buka aplikasi marketplace, pilih produk kebutuhan pokok harga subsidi, pesan komoditi, bayar saldo/QRIS, dan terima dari cabang terdekat.',
      icon: Users,
      gradient: 'from-purple-600 to-indigo-600',
      badgeStyle: 'bg-purple-100 text-purple-800 border-purple-200',
      cardHover: 'hover:border-purple-400 hover:shadow-purple-500/15',
      demoInitials: 'BS',
      demoUser: 'Budi Santoso',
      demoId: 'Kel. Mekarjaya, Sukmajaya',
      features: ['Harga Khusus Anggota', 'Simpanan & SHU'],
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
      gradient: 'from-amber-500 to-orange-600',
      badgeStyle: 'bg-orange-100 text-orange-800 border-orange-200',
      cardHover: 'hover:border-orange-400 hover:shadow-orange-500/15',
      demoInitials: 'SR',
      demoUser: 'Siti Rahmawati',
      demoId: 'Pos Sukmajaya (Mekarjaya)',
      features: ['11 Kecamatan Depok', '63 Kelurahan'],
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
      gradient: 'from-emerald-500 to-teal-600',
      badgeStyle: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      cardHover: 'hover:border-emerald-400 hover:shadow-emerald-500/15',
      demoInitials: 'HW',
      demoUser: 'Hendra Wijaya',
      demoId: 'Kel. Tani Mekar Subur Depok',
      features: ['Suplai Anggota & Non-Anggota', 'Rekap Pembayaran'],
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
      gradient: 'from-blue-600 to-cyan-600',
      badgeStyle: 'bg-blue-100 text-blue-800 border-blue-200',
      cardHover: 'hover:border-blue-400 hover:shadow-blue-500/15',
      demoInitials: 'AR',
      demoUser: 'Ahmad Rifai',
      demoId: 'Mobil Box KKMP-02 (Zona 4 - Pusat)',
      features: ['Rute 4 Zona Depok', 'Sensor Rantai Dingin'],
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
      gradient: 'from-red-600 to-rose-700',
      badgeStyle: 'bg-red-100 text-red-800 border-red-200',
      cardHover: 'hover:border-red-400 hover:shadow-red-500/15',
      demoInitials: 'BS',
      demoUser: 'Drs. H. Bambang S.',
      demoId: 'Pengurus Koperasi Induk',
      features: ['Otomasi 4 Zona Order', 'Laporan Keuangan & SHU'],
      route: '/portal/admin',
    },
  ];

  const handleSelectRole = (role) => {
    setCurrentRole(role.id);
    onClose();
    navigate(role.route);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/80 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden"
          >
            
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50/90 via-white to-red-50/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-600 text-white flex items-center justify-center shadow-md shadow-red-200">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">
                    Pusat Akses Layanan Koperasi
                  </h3>
                  <p className="text-xs text-slate-500">
                    Pilih peran di bawah ini untuk membuka dashboard operasional:
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Roles List */}
            <div className="p-6 overflow-y-auto space-y-3.5">
              {ROLES.map((r) => {
                const Icon = r.icon;
                const isCurrent = currentRole === r.id;

                return (
                  <motion.div
                    whileHover={{ y: -3, scale: 1.008 }}
                    whileTap={{ scale: 0.99 }}
                    key={r.id}
                    onClick={() => handleSelectRole(r)}
                    className={`p-4 sm:p-5 rounded-3xl border-2 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group bg-white/90 backdrop-blur-md shadow-xs hover:shadow-xl ${
                      r.cardHover
                    } ${
                      isCurrent
                        ? 'border-red-500 ring-2 ring-red-400/30 bg-red-50/20'
                        : 'border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-start gap-4 min-w-0">
                      {/* Glowing Gradient Icon Badge */}
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${r.gradient} text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-7 h-7" />
                      </div>

                      <div className="min-w-0 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            TAHAP {r.step}
                          </span>
                          <h4 className="font-extrabold text-base text-slate-900 group-hover:text-red-600 transition-colors">
                            {r.title}
                          </h4>
                          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${r.badgeStyle}`}>
                            {r.category}
                          </span>
                          {isCurrent && (
                            <span className="text-[10px] font-bold text-red-600 bg-red-100 border border-red-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Sedang Aktif
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
                          {r.desc}
                        </p>

                        {/* Features and demo user */}
                        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px]">
                          <div className="flex items-center gap-1.5 font-bold text-slate-800">
                            <span className="w-5 h-5 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-600">
                              {r.demoInitials}
                            </span>
                            <span>{r.demoUser}</span>
                            <span className="text-slate-400 font-normal">({r.demoId})</span>
                          </div>

                          <div className="hidden sm:flex items-center gap-1.5">
                            {r.features.map((f, idx) => (
                              <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold flex items-center gap-0.5">
                                <Check className="w-2.5 h-2.5 text-emerald-600" />
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 bg-slate-900 group-hover:bg-red-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                      >
                        <span>Masuk Peran</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-medium">Otentikasi Terpadu Koperasi Merah Putih Mekarjaya</span>
              </div>
              <button
                onClick={() => {
                  setCurrentRole(null);
                  onClose();
                  navigate('/');
                }}
                className="text-slate-700 hover:text-red-600 font-bold underline underline-offset-2 cursor-pointer"
              >
                Kembali ke Beranda
              </button>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
