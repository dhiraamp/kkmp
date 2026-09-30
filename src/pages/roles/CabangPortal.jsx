import React, { useState } from 'react';
import {
  Store,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Plus,
  Send,
  AlertTriangle,
  ArrowRight,
  ClipboardList,
  Building2,
  Users,
} from 'lucide-react';
import { useKkmp } from '../../context/KkmpContext';
import { CABANG_DEPOK } from '../../data/mockData';

export default function CabangPortal() {
  const {
    activeBranchId,
    setActiveBranchId,
    activeBranch,
    supplyOrders,
    createSupplyOrder,
    updateSupplyOrderStatus,
    orders,
    updateOrderStatus,
  } = useKkmp();

  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'po' | 'deliveries' | 'pickup'

  // New PO form state
  const [poItemName, setPoItemName] = useState('Beras Pandan Wangi Super 5kg');
  const [poQty, setPoQty] = useState(30);
  const [poUnit, setPoUnit] = useState('sak');

  // Filtered orders for this branch
  const branchOrders = orders.filter((o) => !o.cabangId || o.cabangId === activeBranchId);
  const branchSupplyOrders = supplyOrders.filter((po) => po.cabangId === activeBranchId);

  const handleCreatePO = (e) => {
    e.preventDefault();
    createSupplyOrder({
      items: [{ name: poItemName, qty: Number(poQty), unit: poUnit }],
      cabangId: activeBranchId,
    });
    setPoQty(30);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Top Banner: Branch Identification & Branch Switcher */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-orange-950/40 text-orange-100 border border-orange-300/30 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                Portal Peran 2 &bull; Koperasi Cabang (8 Cabang Depok)
              </span>
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {activeBranch.zone}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {activeBranch.name}
            </h1>

            <p className="text-orange-100 text-xs sm:text-sm max-w-xl leading-relaxed">
              Pos distribusi tingkat kecamatan bertanggung jawab menerima suplai dari Koperasi Induk via armada logistik, menjaga ketersediaan komoditas pangan, dan melayani penyerahan belanja kepada anggota keluarga koperasi.
            </p>

            <div className="pt-1 text-xs text-orange-200">
              <p>📍 Alamat: <strong>{activeBranch.address}</strong> &bull; Kepala Cabang: <strong>{activeBranch.manager}</strong></p>
            </div>
          </div>

          {/* Quick Branch Selector Switcher */}
          <div className="lg:col-span-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 space-y-2">
            <label className="text-[11px] font-bold uppercase text-orange-200 block">
              Ganti Tampilan Cabang (8 Cabang):
            </label>
            <select
              value={activeBranchId}
              onChange={(e) => setActiveBranchId(e.target.value)}
              className="w-full bg-slate-900/80 text-white font-bold text-xs p-2.5 rounded-xl border border-white/20 focus:outline-orange-300"
            >
              {CABANG_DEPOK.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.zone})
                </option>
              ))}
            </select>
            <div className="pt-1 flex justify-between text-[11px] text-orange-100">
              <span>Tingkat Ketersediaan:</span>
              <strong className="text-white">{activeBranch.stockScore}</strong>
            </div>
          </div>

        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs sm:text-sm font-bold overflow-x-auto">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 shrink-0 ${
            activeTab === 'inventory' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Stok Inventori Cabang</span>
        </button>

        <button
          onClick={() => setActiveTab('po')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 shrink-0 ${
            activeTab === 'po' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>Pengajuan Pasokan ke Induk ({branchSupplyOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('pickup')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 shrink-0 ${
            activeTab === 'pickup' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Pengambilan Belanja Anggota ({branchOrders.length})</span>
        </button>
      </div>

      {/* ==========================================
          TAB 1: INVENTORY CABANG
         ========================================== */}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Inventori Komoditas di {activeBranch.name}
              </h3>
              <p className="text-xs text-slate-500">
                Monitoring ketersediaan fisik di rak dan gudang pendingin cabang
              </p>
            </div>
            <button
              onClick={() => setActiveTab('po')}
              className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 self-start sm:self-auto transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Ajukan Restock ke Induk</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Beras Pandan Wangi 5kg', qty: 45, unit: 'sak', status: 'Aman', min: 20 },
              { name: 'Minyak Goreng 2 Liter', qty: 68, unit: 'pouch', status: 'Aman', min: 30 },
              { name: 'Telur Ayam Negeri', qty: 12, unit: 'kg', status: 'Menipis', min: 25 },
              { name: 'Daging Sapi Segar', qty: 8, unit: 'kg', status: 'Menipis', min: 10 },
              { name: 'Daging Ayam Broiler', qty: 22, unit: 'kg', status: 'Aman', min: 15 },
              { name: 'Cabai Rawit Merah', qty: 15, unit: 'pack', status: 'Aman', min: 10 },
              { name: 'Bawang Merah Brebes', qty: 18, unit: 'pack', status: 'Aman', min: 10 },
              { name: 'Aneka Sambal UMKM', qty: 34, unit: 'botol', status: 'Aman', min: 15 },
            ].map((item, idx) => {
              const isWarning = item.status === 'Menipis';
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border bg-white shadow-2xs space-y-2 ${
                    isWarning ? 'border-amber-300 bg-amber-50/40' : 'border-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        isWarning
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="text-[10px] text-slate-400">Min. {item.min} {item.unit}</span>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{item.name}</h4>
                    <p className="text-xl font-black text-slate-800 mt-1">
                      {item.qty} <span className="text-xs font-normal text-slate-500">{item.unit}</span>
                    </p>
                  </div>

                  {isWarning && (
                    <button
                      onClick={() => {
                        setActiveTab('po');
                        setPoItemName(item.name);
                      }}
                      className="w-full text-left text-[11px] font-bold text-orange-600 hover:text-orange-700 flex items-center justify-between pt-1 border-t border-amber-200"
                    >
                      <span>Minta Tambah Stok</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==========================================
          TAB 2: PO KE INDUK
         ========================================== */}
      {activeTab === 'po' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Form: Create PO */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                <Plus className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">
                  Form Pengajuan Pasokan (PO)
                </h3>
                <p className="text-[11px] text-slate-500">
                  Kirim permintaan pasokan ke Gudang Koperasi Induk Mekarjaya
                </p>
              </div>
            </div>

            <form onSubmit={handleCreatePO} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Pilih Komoditas yang Dibutuhkan:
                </label>
                <select
                  value={poItemName}
                  onChange={(e) => setPoItemName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-semibold focus:outline-orange-500"
                >
                  <option value="Beras Pandan Wangi Super 5kg">Beras Pandan Wangi Super 5kg (sak)</option>
                  <option value="Minyak Goreng Rose Brand 2 Liter">Minyak Goreng Rose Brand 2L (pouch)</option>
                  <option value="Telur Ayam Negeri Segar 1kg">Telur Ayam Negeri Segar (kg)</option>
                  <option value="Daging Sapi Segar Paha Depan 1kg">Daging Sapi Segar (kg)</option>
                  <option value="Daging Ayam Broiler Utuh Segar">Daging Ayam Broiler Segar (kg)</option>
                  <option value="Cabai Rawit Merah Segar">Cabai Rawit Merah Segar (pack)</option>
                  <option value="Bawang Merah Brebes Pilihan">Bawang Merah Brebes Pilihan (pack)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jumlah:</label>
                  <input
                    type="number"
                    min="5"
                    max="500"
                    value={poQty}
                    onChange={(e) => setPoQty(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-bold focus:outline-orange-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Satuan:</label>
                  <input
                    type="text"
                    value={poUnit}
                    onChange={(e) => setPoUnit(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-bold focus:outline-orange-500"
                  />
                </div>
              </div>

              <div className="p-3 bg-orange-50 rounded-xl border border-orange-200 text-orange-900 text-[11px] leading-relaxed">
                ℹ️ Pesanan pasokan yang dikirim sebelum pukul 11.00 WIB akan dijadwalkan pengiriman hari yang sama oleh Armada Logistik KKMP.
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs py-3 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Pengajuan ke Gudang Induk</span>
              </button>
            </form>
          </div>

          {/* Right List: PO Status */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="text-sm font-black text-slate-900">
              Riwayat Pengajuan Pasokan Cabang Ini ({branchSupplyOrders.length})
            </h3>

            {branchSupplyOrders.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400 text-xs">
                Belum ada pengajuan pasokan untuk {activeBranch.name}.
              </div>
            ) : (
              branchSupplyOrders.map((po) => {
                const isDelivered = po.status === 'Selesai Tiba';
                return (
                  <div
                    key={po.id}
                    className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                      <div>
                        <span className="font-black text-xs text-slate-900">{po.id}</span>
                        <span className="text-[11px] text-slate-400 ml-2">&bull; {po.date}</span>
                      </div>
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          isDelivered
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {po.status}
                      </span>
                    </div>

                    <div className="text-xs space-y-1">
                      <p className="font-semibold text-slate-700">Daftar Komoditas:</p>
                      <ul className="list-disc list-inside text-slate-600">
                        {po.items.map((it, iIdx) => (
                          <li key={iIdx}>
                            {it.name}: <strong>{it.qty} {it.unit}</strong>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-1 text-[11px] text-slate-500">
                        Armada: <strong className="text-slate-800">{po.assignedFleet}</strong> &bull; Estimasi: {po.estimatedArrival}
                      </div>
                    </div>

                    {!isDelivered && (
                      <div className="pt-2 border-t border-slate-100 flex justify-end">
                        <button
                          onClick={() => updateSupplyOrderStatus(po.id, 'Selesai Tiba')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                        >
                          Konfirmasi Drop-off Tiba di Cabang
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

        </div>
      )}

      {/* ==========================================
          TAB 3: ANGGOTA PICKUP
         ========================================== */}
      {activeTab === 'pickup' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Antrean Pengambilan Pesanan Anggota ({branchOrders.length})
            </h3>
            <p className="text-xs text-slate-500">
              Pesanan anggota yang memilih titik ambil di {activeBranch.name}
            </p>
          </div>

          <div className="space-y-3">
            {branchOrders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xs text-slate-900">{ord.id}</span>
                    <span className="text-[11px] text-slate-400">&bull; {ord.date}</span>
                    <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                      {ord.memberName} ({ord.memberId})
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    {ord.items.map((i) => `${i.qty}x ${i.name}`).join(', ')}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Total: <strong className="text-slate-800">Rp {ord.total.toLocaleString('id-ID')}</strong> ({ord.paymentMethod})
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      ord.status === 'Selesai'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {ord.status}
                  </span>

                  {ord.status !== 'Selesai' && (
                    <button
                      onClick={() => updateOrderStatus(ord.id, 'Selesai', `Diserahkan di ${activeBranch.name}`)}
                      className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                    >
                      Serahkan ke Anggota
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
