import React, { useState } from 'react';
import {
  Building2,
  TrendingUp,
  Boxes,
  Users,
  Store,
  Truck,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  FileSpreadsheet,
} from 'lucide-react';
import { useKkmp } from '../../context/KkmpContext';
import { CABANG_DEPOK } from '../../data/mockData';

export default function IndukPortal() {
  const { products, orders, supplyOrders, fleet } = useKkmp();
  const [activeTab, setActiveTab] = useState('supplychain'); // 'supplychain' | 'centralstock' | 'branches' | 'finance'

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0) + 284500000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Top Banner: Central Executive Dashboard */}
      <div className="bg-gradient-to-r from-red-900 via-rose-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-red-500/20 text-red-200 border border-red-400/30 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                Portal Peran 5 &bull; Koperasi Induk Mekarjaya (Admin Pusat)
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Sistem Terintegrasi Live
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Pusat Komando Koperasi Merah Putih Mekarjaya
            </h1>

            <p className="text-red-100 text-xs sm:text-sm max-w-xl leading-relaxed">
              Pengawasan terpusat rantai pasok komoditas pangan Kota Depok. Mengelola kontrak kerja sama supplier, manajemen stok gudang induk, penugasan armada logistik, serta memonitor 8 pos cabang.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <span className="text-[10px] text-red-200 uppercase font-bold block">
                Total Perputaran Komoditas
              </span>
              <p className="text-lg font-black text-amber-300 mt-0.5">
                Rp {totalRevenue.toLocaleString('id-ID')}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <span className="text-[10px] text-red-200 uppercase font-bold block">
                Anggota Terdaftar
              </span>
              <p className="text-lg font-black text-white mt-0.5">
                10,480 Jiwa
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs sm:text-sm font-bold overflow-x-auto">
        <button
          onClick={() => setActiveTab('supplychain')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 shrink-0 ${
            activeTab === 'supplychain'
              ? 'bg-red-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Monitoring Rantai Pasok Terpadu</span>
        </button>

        <button
          onClick={() => setActiveTab('centralstock')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 shrink-0 ${
            activeTab === 'centralstock'
              ? 'bg-red-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Boxes className="w-4 h-4" />
          <span>Stok Gudang Induk ({products.length} SKU)</span>
        </button>

        <button
          onClick={() => setActiveTab('branches')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 shrink-0 ${
            activeTab === 'branches'
              ? 'bg-red-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Pengawasan 8 Cabang Depok</span>
        </button>

        <button
          onClick={() => setActiveTab('finance')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 shrink-0 ${
            activeTab === 'finance'
              ? 'bg-red-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Laporan Keuangan & SHU Koperasi</span>
        </button>
      </div>

      {/* ==========================================
          TAB 1: INTEGRATED SUPPLY CHAIN MONITORING
         ========================================== */}
      {activeTab === 'supplychain' && (
        <div className="space-y-6">
          {/* 5-Node Status Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs space-y-1">
              <span className="font-bold text-emerald-800">1. Supplier Mitra</span>
              <p className="text-xl font-black text-emerald-900">54 Pemasok</p>
              <span className="text-[10px] text-emerald-700">Pasokan bahan pangan lancar</span>
            </div>

            <div className="p-4 bg-red-50 rounded-2xl border border-red-200 text-xs space-y-1">
              <span className="font-bold text-red-800">2. Gudang Induk</span>
              <p className="text-xl font-black text-red-900">98.4% Kesiapan</p>
              <span className="text-[10px] text-red-700">Cadangan sembako aman 30 hari</span>
            </div>

            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 text-xs space-y-1">
              <span className="font-bold text-blue-800">3. Armada Logistik</span>
              <p className="text-xl font-black text-blue-900">3 Mobil Box</p>
              <span className="text-[10px] text-blue-700">Semua armada beroperasi normal</span>
            </div>

            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200 text-xs space-y-1">
              <span className="font-bold text-orange-800">4. Pos Cabang</span>
              <p className="text-xl font-black text-orange-900">8 Cabang</p>
              <span className="text-[10px] text-orange-700">Tersinkronisasi real-time</span>
            </div>

            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 text-xs space-y-1">
              <span className="font-bold text-purple-800">5. Anggota Koperasi</span>
              <p className="text-xl font-black text-purple-900">{orders.length} Transaksi</p>
              <span className="text-[10px] text-purple-700">Total belanja terserap baik</span>
            </div>
          </div>

          {/* Orders Tracking Table */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-black text-slate-900">
              Transaksi & Distribusi Terbaru
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                  <tr>
                    <th className="p-3">ID Pesanan</th>
                    <th className="p-3">Waktu</th>
                    <th className="p-3">Anggota</th>
                    <th className="p-3">Total Belanja</th>
                    <th className="p-3">Pos Cabang</th>
                    <th className="p-3">Status Rantai Pasok</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-slate-50/60">
                      <td className="p-3 font-mono font-bold text-slate-900">{ord.id}</td>
                      <td className="p-3 text-slate-500">{ord.date}</td>
                      <td className="p-3 font-semibold text-slate-800">
                        {ord.memberName} <span className="text-[10px] text-slate-400">({ord.memberId})</span>
                      </td>
                      <td className="p-3 font-bold text-red-600">
                        Rp {ord.total.toLocaleString('id-ID')}
                      </td>
                      <td className="p-3 text-slate-600">{ord.pickupType}</td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                            ord.status === 'Selesai'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB 2: CENTRAL STOCK
         ========================================== */}
      {activeTab === 'centralstock' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Stok Gudang Pusat Koperasi Induk Mekarjaya
              </h3>
              <p className="text-xs text-slate-500">
                Cadangan pasokan komoditas untuk menyuplai 8 cabang di Kota Depok
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3 flex items-center gap-3"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-16 h-16 rounded-xl object-cover bg-slate-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{p.name}</h4>
                  <p className="text-[11px] text-slate-400">Supplier: {p.supplier}</p>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="text-xs font-black text-slate-800">
                      Stok: {p.stock} {p.unit}
                    </span>
                    <span className="text-[11px] font-bold text-red-600">
                      Rp {p.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          TAB 3: 8 CABANG MONITORING
         ========================================== */}
      {activeTab === 'branches' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-slate-900">
              Kinerja & Kesiapan 8 Pos Cabang Kota Depok
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                  <tr>
                    <th className="p-3">Nama Pos Cabang</th>
                    <th className="p-3">Zona Wilayah</th>
                    <th className="p-3">Alamat</th>
                    <th className="p-3">Kepala Pos Cabang</th>
                    <th className="p-3">Skor Stok</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {CABANG_DEPOK.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-50/60">
                      <td className="p-3 font-bold text-slate-900">{c.name}</td>
                      <td className="p-3 text-slate-600">{c.zone}</td>
                      <td className="p-3 text-slate-500">{c.address}</td>
                      <td className="p-3 font-semibold text-slate-800">{c.manager}</td>
                      <td className="p-3 font-black text-emerald-600">{c.stockScore}</td>
                      <td className="p-3">
                        <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full text-[10px]">
                          Aktif Melayani
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          TAB 4: FINANCIAL & SHU
         ========================================== */}
      {activeTab === 'finance' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-5 shadow-xs">
            <h3 className="text-base font-black text-slate-900">
              Laporan Keuangan & Estimasi SHU Koperasi
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Omset Bruto</span>
                <p className="text-xl font-black text-slate-900 mt-1">Rp 284.500.000</p>
                <span className="text-[10px] text-emerald-600 font-semibold">+14.2% dari target</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Harga Pokok (HPP)</span>
                <p className="text-xl font-black text-slate-900 mt-1">Rp 241.800.000</p>
                <span className="text-[10px] text-slate-500">Pembayaran supplier & petani</span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Biaya Logistik & Armada</span>
                <p className="text-xl font-black text-slate-900 mt-1">Rp 12.400.000</p>
                <span className="text-[10px] text-slate-500">BBM & perawatan mobil box</span>
              </div>

              <div className="p-4 bg-red-50 rounded-2xl border border-red-200">
                <span className="text-[10px] font-bold text-red-800 uppercase">Sisa Hasil Usaha (SHU)</span>
                <p className="text-xl font-black text-red-700 mt-1">Rp 30.300.000</p>
                <span className="text-[10px] text-red-600 font-bold">Siap dialokasikan ke anggota</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
