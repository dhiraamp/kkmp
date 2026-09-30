import React, { useState } from 'react';
import {
  Truck,
  MapPin,
  CheckCircle2,
  Clock,
  Navigation,
  FileText,
  Thermometer,
  ShieldCheck,
  AlertCircle,
  Play,
  RotateCcw,
} from 'lucide-react';
import { useKkmp } from '../../context/KkmpContext';
import { CABANG_DEPOK } from '../../data/mockData';

export default function LogistikPortal() {
  const { fleet, updateFleetStatus, supplyOrders, updateSupplyOrderStatus } = useKkmp();
  const [activeFleetId, setActiveFleetId] = useState('KKMP-02');

  const selectedFleet = fleet.find((f) => f.id === activeFleetId) || fleet[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Top Banner: Fleet & Logistics Overview */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-blue-500/20 text-blue-200 border border-blue-400/30 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                Portal Peran 4 &bull; Logistik & Distribusi
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Armada Aktif di Jalan
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Manajemen Armada Distribusi 8 Cabang Depok
            </h1>

            <p className="text-blue-200 text-xs sm:text-sm max-w-xl leading-relaxed">
              Memastikan seluruh bahan pangan, sembako, dan produk komoditas didistribusikan dari Gudang Induk Mekarjaya ke 8 pos cabang dengan tepat waktu, higienis, dan terintegrasi sistem barcode.
            </p>
          </div>

          {/* Quick Select Fleet */}
          <div className="lg:col-span-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 space-y-2">
            <label className="text-[11px] font-bold uppercase text-blue-200 block">
              Pilih Armada Mobil Box:
            </label>
            <div className="space-y-1.5">
              {fleet.map((fl) => (
                <button
                  key={fl.id}
                  onClick={() => setActiveFleetId(fl.id)}
                  className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                    activeFleetId === fl.id
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-white/5 hover:bg-white/10 text-blue-100'
                  }`}
                >
                  <div>
                    <p>{fl.id} &bull; {fl.driver}</p>
                    <p className="text-[10px] opacity-75">{fl.zone}</p>
                  </div>
                  <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded-md">
                    {fl.status.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Selected Fleet Status Card & Actions */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-slate-900">
                  {selectedFleet.id} — {selectedFleet.driver}
                </h3>
                <span className="font-mono text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-bold">
                  {selectedFleet.plate}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Tipe: {selectedFleet.type} &bull; Wilayah: {selectedFleet.zone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1 rounded-full">
              Status: {selectedFleet.status}
            </span>
          </div>
        </div>

        {/* Live Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
            <span className="text-slate-500 block">Posisi Saat Ini:</span>
            <strong className="text-slate-800 text-sm flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-red-600" />
              {selectedFleet.currentLocation}
            </strong>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
            <span className="text-slate-500 block">Monitoring Rantai Dingin:</span>
            <strong className="text-emerald-700 text-sm flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-emerald-600" />
              {selectedFleet.temperature}
            </strong>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
            <span className="text-slate-500 block">Jumlah Muatan Cabang:</span>
            <strong className="text-slate-800 text-sm flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-600" />
              {selectedFleet.manifestCount} Manifest Surat Jalan
            </strong>
          </div>
        </div>

        {/* Update Status Buttons */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-700 mr-2">Update Status Pengiriman:</span>
          <button
            onClick={() => updateFleetStatus(selectedFleet.id, 'Memuat di Gudang Induk', 'Gudang Induk Mekarjaya')}
            className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
          >
            1. Memuat di Gudang Induk
          </button>
          <button
            onClick={() => updateFleetStatus(selectedFleet.id, 'Dalam Perjalanan ke Sukamajaya', 'Jl. Tole Iskandar Depok')}
            className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 hover:bg-blue-100 text-xs font-bold text-blue-700 transition-colors cursor-pointer"
          >
            2. Dalam Perjalanan
          </button>
          <button
            onClick={() => updateFleetStatus(selectedFleet.id, 'Tiba & Serah Terima di Cabang', 'Pos Cabang Sukamajaya')}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white transition-colors cursor-pointer"
          >
            3. Tiba & Serah Terima Selesai
          </button>
        </div>
      </div>

      {/* Visual Interactive Map of Depok 8 Branches */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Navigation className="w-5 h-5 text-blue-400" />
              Peta Jaringan Distribusi Rantai Pasok Kota Depok
            </h3>
            <p className="text-xs text-slate-400">
              Pusat Gudang Induk Mekarjaya menghubungkan 8 Pos Cabang Kecamatan
            </p>
          </div>
          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-full">
            Koneksi Jalur Aman & Lancar
          </span>
        </div>

        {/* Visual Map Layout */}
        <div className="relative bg-slate-950/80 rounded-2xl p-6 border border-slate-800 overflow-hidden">
          {/* Central Hub */}
          <div className="text-center py-4 mb-6">
            <div className="inline-flex flex-col items-center p-3 bg-red-600/90 border-2 border-white rounded-2xl shadow-xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-200">
                PUSAT DISTRIBUSI INDUK
              </span>
              <h4 className="text-sm font-black text-white">Gudang Koperasi Induk Mekarjaya</h4>
              <p className="text-[10px] text-white/80">Jl. Tole Iskandar No. 45 Depok</p>
            </div>
          </div>

          {/* 8 Connected Branches */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {CABANG_DEPOK.map((c, idx) => (
              <div
                key={c.id}
                className="p-3 bg-slate-800/90 border border-slate-700 rounded-xl space-y-1 hover:border-blue-500 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-blue-400">{c.zone}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                </div>
                <p className="font-bold text-white text-xs">{c.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{c.address}</p>
                <div className="pt-1 flex justify-between text-[10px] text-slate-500">
                  <span>Jarak dari Induk:</span>
                  <span className="text-slate-300 font-semibold">{3 + idx * 1.5} km</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
