import React, { useState } from 'react';
import {
  Handshake,
  Package,
  Plus,
  Edit2,
  DollarSign,
  TrendingUp,
  Star,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Boxes,
  X,
} from 'lucide-react';
import { useKkmp } from '../../context/KkmpContext';
import { ROLE_INFO } from '../../data/mockData';

export default function SupplierPortal() {
  const { products, addProduct, updateProduct, supplyOrders } = useKkmp();
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'po' | 'finance'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form
  const [name, setName] = useState('');
  const [category, setCategory] = useState('sembako');
  const [price, setPrice] = useState('');
  const [memberPrice, setMemberPrice] = useState('');
  const [unit, setUnit] = useState('kg');
  const [stock, setStock] = useState(50);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(
    'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=400&q=80'
  );

  const supplierInfo = ROLE_INFO.supplier;

  // Filter products by this supplier or show mock supplier products
  const myProducts = products.filter(
    (p) => p.supplierId === 'sup-1' || p.supplier.includes('Mekar Subur')
  );

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    addProduct({
      name,
      category,
      price: Number(price),
      memberPrice: Number(memberPrice) || Math.round(Number(price) * 0.9),
      unit,
      stock: Number(stock),
      description,
      image,
      supplier: 'Kelompok Tani Mekar Subur Depok',
      supplierId: 'sup-1',
    });
    setIsAddModalOpen(false);
    setName('');
    setPrice('');
    setMemberPrice('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Supplier Profile Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                Portal Peran 3 &bull; Supplier Komoditas & UMKM
              </span>
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Mitra Resmi Terverifikasi
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {supplierInfo.name}
            </h1>

            <p className="text-emerald-100 text-xs sm:text-sm max-w-xl leading-relaxed">
              Sebagai produsen komoditas pertanian dan sembako lokal Kota Depok, Anda memasok produk segar langsung ke Koperasi Induk Mekarjaya tanpa perantara tengkulak dengan kepastian serapan pasar koperasi.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-3">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <span className="text-[10px] text-emerald-200 uppercase font-bold block">
                Total Omset Bulan Ini
              </span>
              <p className="text-lg font-black text-amber-300 mt-0.5">
                Rp {supplierInfo.totalOmset.toLocaleString('id-ID')}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <span className="text-[10px] text-emerald-200 uppercase font-bold block">
                Komoditas Terdaftar
              </span>
              <p className="text-lg font-black text-white mt-0.5">
                {myProducts.length} Produk
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs sm:text-sm font-bold overflow-x-auto">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 shrink-0 ${
            activeTab === 'products'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Katalog Komoditas Saya ({myProducts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('po')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 shrink-0 ${
            activeTab === 'po'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Boxes className="w-4 h-4" />
          <span>PO Pasokan Masuk ({supplyOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('finance')}
          className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 shrink-0 ${
            activeTab === 'finance'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Laporan Pembayaran & Tagihan</span>
        </button>
      </div>

      {/* ==========================================
          TAB 1: PRODUCTS LIST & ADD
         ========================================== */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Daftar Produk Komoditas yang Disuplai
              </h3>
              <p className="text-xs text-slate-500">
                Atur harga reguler, subsidi harga anggota, dan stok yang siap dipasok ke Gudang Induk Mekarjaya
              </p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 self-start sm:self-auto transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Komoditas Baru</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {myProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3 flex flex-col justify-between"
              >
                <div className="flex gap-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-16 rounded-xl object-cover bg-slate-100 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {p.category}
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 mt-1 line-clamp-1">{p.name}</h4>
                    <p className="text-[11px] text-slate-400">{p.unit}</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Harga Anggota:</span>
                    <strong className="text-red-600">Rp {p.memberPrice?.toLocaleString('id-ID')}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Harga Reguler:</span>
                    <span className="text-slate-700">Rp {p.price.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-1">
                    <span className="text-slate-500">Stok Pasokan:</span>
                    <strong className="text-slate-900">{p.stock} unit</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      const newStock = prompt(`Update jumlah stok untuk "${p.name}":`, p.stock);
                      if (newStock !== null) updateProduct(p.id, { stock: Number(newStock) });
                    }}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs py-1.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Ubah Stok
                  </button>
                  <button
                    onClick={() => {
                      const newPrice = prompt(`Update harga anggota untuk "${p.name}":`, p.memberPrice);
                      if (newPrice !== null) updateProduct(p.id, { memberPrice: Number(newPrice) });
                    }}
                    className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs py-1.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Atur Harga
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          TAB 2: PO DARI INDUK
         ========================================== */}
      {activeTab === 'po' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              Permintaan Pasokan (PO) Masuk dari Koperasi Induk
            </h3>
            <p className="text-xs text-slate-500">
              Pesanan restock komoditas untuk pemenuhan pasokan 8 cabang Kota Depok
            </p>
          </div>

          <div className="space-y-3">
            {supplyOrders.map((po) => (
              <div
                key={po.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xs text-slate-900">{po.id}</span>
                    <span className="text-[11px] text-slate-400">&bull; {po.date}</span>
                    <span className="text-[10px] font-bold bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                      Tujuan: {po.cabangName}
                    </span>
                  </div>
                  <span className="text-xs font-bold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {po.status}
                  </span>
                </div>

                <div className="text-xs">
                  <p className="font-semibold text-slate-700 mb-1">Rincian Komoditas:</p>
                  <ul className="space-y-1 text-slate-600">
                    {po.items.map((it, idx) => (
                      <li key={idx} className="flex justify-between bg-slate-50 px-2.5 py-1 rounded-lg">
                        <span>{it.name}</span>
                        <strong className="text-slate-800">{it.qty} {it.unit}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ==========================================
          TAB 3: FINANCE & INVOICE
         ========================================== */}
      {activeTab === 'finance' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h3 className="text-base font-black text-slate-900">
              Rekapitulasi Pembayaran dari Koperasi Induk
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                <span className="text-[10px] font-bold text-emerald-800 uppercase">Sudah Dicairkan</span>
                <p className="text-xl font-black text-emerald-700 mt-1">Rp 36.200.000</p>
                <span className="text-[10px] text-emerald-600">Transfer ke Rekening BCA Poktan</span>
              </div>
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
                <span className="text-[10px] font-bold text-amber-800 uppercase">Menunggu Pembayaran</span>
                <p className="text-xl font-black text-amber-700 mt-1">Rp 12.300.000</p>
                <span className="text-[10px] text-amber-600">Jatuh tempo: 05 Okt 2026</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-700 uppercase">Total Volume Suplai</span>
                <p className="text-xl font-black text-slate-800 mt-1">4.8 Ton</p>
                <span className="text-[10px] text-slate-500">Beras, Telur, dan Sayuran</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add Commodity */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                Tambah Komoditas Pasokan Baru
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Produk:</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Beras Rojolele Depok 5kg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kategori:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-emerald-500"
                  >
                    <option value="sembako">Sembako</option>
                    <option value="pertanian">Pertanian</option>
                    <option value="segar">Produk Segar</option>
                    <option value="umkm">Produk UMKM</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Satuan:</label>
                  <input
                    type="text"
                    required
                    placeholder="sak (5kg) / kg / botol"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Harga Reguler (Rp):</label>
                  <input
                    type="number"
                    required
                    placeholder="75000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-emerald-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Harga Anggota (Rp):</label>
                  <input
                    type="number"
                    placeholder="68000"
                    value={memberPrice}
                    onChange={(e) => setMemberPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Stok Awal:</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-emerald-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">URL Foto Produk:</label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition-colors cursor-pointer mt-2"
              >
                Simpan & Daftarkan ke Katalog Koperasi
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
