import React, { useState } from 'react';
import {
  Users,
  CreditCard,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  ArrowRight,
  Wallet,
  Coins,
  Store,
  ChevronRight,
  Package,
  Star,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { useKkmp } from '../../context/KkmpContext';
import { ROLE_INFO } from '../../data/mockData';

export default function AnggotaPortal() {
  const { orders, updateOrderStatus, products, addToCart, setIsCartOpen } = useKkmp();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'catalog' | 'savings'

  const info = ROLE_INFO.anggota;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header Profile & Digital Member Card */}
      <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-purple-800/40">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-white/5 skew-x-12 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
          
          {/* Left: Info Anggota */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-purple-400/20 text-purple-200 border border-purple-400/30 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
                Portal Peran 1 &bull; Anggota Koperasi
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Anggota Resmi Terverifikasi
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Selamat Datang, {info.name}!
            </h1>

            <p className="text-purple-200 text-xs sm:text-sm max-w-lg leading-relaxed">
              Sebagai anggota koperasi resmi Kota Depok, Anda berhak menikmati harga khusus subsidi untuk seluruh komoditas sembako, sayuran segar, dan produk olahan UMKM.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-2.5 border border-white/15">
                <span className="text-purple-300 block text-[10px] font-bold uppercase tracking-wider">
                  Nomor Anggota:
                </span>
                <span className="font-mono font-bold text-white text-sm">{info.memberId}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-4 py-2.5 border border-white/15">
                <span className="text-purple-300 block text-[10px] font-bold uppercase tracking-wider">
                  Pos Cabang Utama:
                </span>
                <span className="font-bold text-white text-sm">Cabang Sukamajaya (Pusat)</span>
              </div>
            </div>
          </div>

          {/* Right: Digital Wallet & Savings */}
          <div className="lg:col-span-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-500/30 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-purple-200" />
                </div>
                <div>
                  <span className="text-[11px] text-purple-200 font-medium block">
                    Saldo Simpanan Sukarela:
                  </span>
                  <span className="text-xl font-black text-amber-300">
                    Rp {info.simpanan.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-purple-200">
                <Coins className="w-4 h-4 text-amber-400" />
                <span>Poin Belanja Anggota:</span>
              </div>
              <span className="font-bold text-white bg-purple-950/80 px-3 py-1 rounded-xl border border-purple-400/30">
                {info.poin} Poin
              </span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsCartOpen(true)}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Buka Keranjang Belanja</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Modern Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs sm:text-sm font-bold overflow-x-auto">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-2.5 rounded-2xl transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
            activeTab === 'orders'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Riwayat & Pelacakan Pesanan ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-5 py-2.5 rounded-2xl transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
            activeTab === 'catalog'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Katalog Komoditas Anggota</span>
        </button>

        <button
          onClick={() => setActiveTab('savings')}
          className={`px-5 py-2.5 rounded-2xl transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
            activeTab === 'savings'
              ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Kartu Anggota & SHU</span>
        </button>
      </div>

      {/* ==========================================
          TAB 1: ORDERS & TRACKING
         ========================================== */}
      {activeTab === 'orders' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                Daftar Pesanan & Status Rantai Pasok
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Pantau proses persiapan barang dari Gudang Induk, armada pengiriman, hingga tiba di pos cabang.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {orders.map((ord) => {
              const isFinished = ord.status === 'Selesai';
              const isInTransit = ord.status === 'Dikirim Armada';

              return (
                <div
                  key={ord.id}
                  className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-black text-xs border border-purple-200 shadow-2xs">
                        ORD
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-slate-900">{ord.id}</span>
                          <span className="text-[11px] text-slate-400">&bull; {ord.date}</span>
                        </div>
                        <p className="text-xs text-slate-500">
                          Titik Penerimaan: <strong className="text-slate-700">{ord.pickupType}</strong>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
                          isFinished
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : isInTransit
                            ? 'bg-blue-50 text-blue-700 border-blue-200 animate-pulse'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {ord.status}
                      </span>

                      {!isFinished && (
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'Selesai', 'Pesanan diterima anggota')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs"
                        >
                          Konfirmasi Diterima
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Items Summary & Total */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                    <div className="md:col-span-7 space-y-2">
                      <p className="text-xs font-bold text-slate-700">Rincian Komoditas:</p>
                      <ul className="space-y-1 text-xs text-slate-600">
                        {ord.items.map((it, idx) => (
                          <li key={idx} className="flex justify-between border-b border-slate-50 pb-1.5">
                            <span>
                              {it.qty}x {it.name}
                            </span>
                            <span className="font-semibold text-slate-800">
                              Rp {(it.price * it.qty).toLocaleString('id-ID')}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="md:col-span-5 bg-slate-50 rounded-2xl p-4 border border-slate-100 text-xs space-y-1.5">
                      <div className="flex justify-between text-slate-500">
                        <span>Metode Pembayaran:</span>
                        <strong className="text-slate-800">{ord.paymentMethod}</strong>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Pos Cabang Terkait:</span>
                        <strong className="text-slate-800">Cabang Sukamajaya</strong>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-black text-slate-900">
                        <span>Total Belanja:</span>
                        <span className="text-red-600 font-black">
                          Rp {ord.total.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Live Tracking Stepper */}
                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                      Kronologi Pelacakan Rantai Pasok:
                    </p>
                    <div className="space-y-2.5">
                      {(ord.trackingTimeline || []).map((tl, tIdx) => (
                        <div key={tIdx} className="flex items-start gap-3 text-xs">
                          <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 text-[10px] font-black mt-0.5">
                            {tIdx + 1}
                          </div>
                          <div className="flex-1">
                            <span className="font-bold text-slate-800">{tl.title}</span>
                            <span className="text-slate-400 ml-2">({tl.time})</span>
                            <p className="text-slate-500 text-[11px] mt-0.5">{tl.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==========================================
          TAB 2: FAST CATALOG FOR MEMBERS (1:1 Ratio)
         ========================================== */}
      {activeTab === 'catalog' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                Katalog Belanja Anggota Koperasi
              </h3>
              <p className="text-xs text-slate-500">
                Nikmati harga khusus anggota yang telah disubsidi langsung oleh Koperasi Merah Putih Mekarjaya.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {products.slice(0, 8).map((p) => {
              const effectivePrice = p.memberPrice || p.price;
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-3xl border border-slate-200 p-3.5 flex flex-col justify-between space-y-3 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden group"
                >
                  <div className="w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between space-y-1">
                    <div>
                      <h4 className="h-9 text-xs font-bold text-slate-900 line-clamp-2 leading-tight">
                        {p.name}
                      </h4>
                      <p className="text-[11px] text-slate-400">{p.unit}</p>
                    </div>
                    <div className="pt-1">
                      <span className="text-xs sm:text-sm font-black text-red-600 block">
                        Rp {effectivePrice.toLocaleString('id-ID')}
                      </span>
                      {p.memberPrice && (
                        <span className="text-[10px] text-slate-400 line-through">
                          Rp {p.price.toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(p, 1)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>+ Keranjang</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==========================================
          TAB 3: KTA & SHU
         ========================================== */}
      {activeTab === 'savings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card KTA Visual */}
          <div className="bg-gradient-to-tr from-slate-950 via-purple-950 to-slate-900 text-white rounded-3xl p-7 shadow-xl border border-purple-800/40 space-y-6 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-extrabold tracking-widest text-purple-300 uppercase">
                  KARTU TANDA ANGGOTA RESMI
                </p>
                <h4 className="text-xl font-black text-white mt-1">Koperasi Merah Putih Mekarjaya</h4>
                <p className="text-xs text-purple-200">Kota Depok &bull; Jawa Barat</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center font-black text-white shadow-md text-base">
                KKMP
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-purple-300 uppercase tracking-wider font-semibold">
                Nama Anggota:
              </span>
              <p className="text-2xl font-black text-white">{info.name}</p>
              <p className="font-mono text-sm text-purple-200">{info.memberId}</p>
            </div>

            <div className="flex justify-between items-end pt-5 border-t border-purple-800/50 text-xs">
              <div>
                <span className="text-[10px] text-purple-400 block font-medium">Terdaftar Sejak:</span>
                <span className="font-bold text-white">01 Januari 2026</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-purple-400 block font-medium">Pos Pengambilan:</span>
                <span className="font-bold text-white">Cabang Sukamajaya</span>
              </div>
            </div>
          </div>

          {/* SHU & Simpanan breakdown */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 space-y-5 shadow-xs">
            <h4 className="text-base font-black text-slate-900">
              Rincian Simpanan & Proyeksi SHU
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-600">Simpanan Pokok (Sekali saat gabung)</span>
                <strong className="text-slate-900">Rp 100.000</strong>
              </div>
              <div className="flex justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-600">Simpanan Wajib (Rp 50.000 / bulan)</span>
                <strong className="text-slate-900">Rp 450.000</strong>
              </div>
              <div className="flex justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-600">Simpanan Sukarela (Dapat dibelanjakan)</span>
                <strong className="text-purple-700">Rp 900.000</strong>
              </div>
              <div className="flex justify-between p-3.5 bg-purple-50 rounded-2xl border border-purple-200 font-bold">
                <span className="text-purple-900">Total Simpanan Terakumulasi</span>
                <span className="text-purple-700">Rp 1.450.000</span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 space-y-1.5">
              <p className="font-bold">Estimasi Pembagian SHU (Sisa Hasil Usaha) 2026:</p>
              <p className="text-[11px] leading-relaxed">
                Berdasarkan partisipasi transaksi belanja komoditas dan saldo simpanan, estimasi dividen SHU Anda pada RAT tahun buku 2026 adalah <strong>Rp 340.000</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
