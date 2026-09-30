import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ShieldCheck,
  CheckCircle,
  Truck,
  Store,
  Wallet,
  QrCode,
  CreditCard,
  Banknote,
  ArrowRight,
  MapPin,
  Layers,
} from 'lucide-react';
import { useKkmp } from '../context/KkmpContext';
import { KECAMATAN_DEPOK, ZONASI_DEPOK } from '../data/mockData';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartCount,
    cartTotal,
    cartRegularTotal,
    updateCartQty,
    removeFromCart,
    placeOrder,
    selectedKecamatanId,
    selectedKelurahan,
    setCurrentRole,
  } = useKkmp();

  const navigate = useNavigate();
  const [pickupType, setPickupType] = useState('Ambil di Pos Cabang Kelurahan');
  const [paymentMethod, setPaymentMethod] = useState('Saldo Koperasi');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);

  // Local checkout location state
  const [checkoutKecId, setCheckoutKecId] = useState(selectedKecamatanId || 'sukmajaya');
  const currentKec = KECAMATAN_DEPOK.find((k) => k.id === checkoutKecId) || KECAMATAN_DEPOK[0];
  const [checkoutKel, setCheckoutKel] = useState(selectedKelurahan || currentKec.kelurahan[0]);

  const currentZone = ZONASI_DEPOK.find((z) => z.id === currentKec.zoneId) || ZONASI_DEPOK[0];

  const savings = Math.max(0, cartRegularTotal - cartTotal);

  const handleCheckout = () => {
    const order = placeOrder({
      paymentMethod,
      pickupType: `${pickupType} (${currentKec.name})`,
      cabangId: currentKec.id,
      kecamatan: currentKec.name,
      kelurahan: checkoutKel,
    });
    if (order) {
      setCreatedOrder(order);
      setIsSuccessModalOpen(true);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs"
          >
            {/* Backdrop click to close */}
            <div
              className="absolute inset-0"
              onClick={() => setIsCartOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="relative bg-white/95 backdrop-blur-2xl w-full max-w-md h-full flex flex-col shadow-2xl border-l border-white/60 z-10"
            >
              
              {/* Header */}
              <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-rose-600 text-white flex items-center justify-center font-bold shadow-xs">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      Keranjang Belanja
                    </h3>
                    <p className="text-xs text-slate-500">
                      {cartCount} item komoditas dipilih
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 text-slate-400 space-y-3">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                      <ShoppingBag className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="font-bold text-slate-700">Keranjang masih kosong</p>
                    <p className="text-xs text-slate-500 max-w-xs">
                      Pilih aneka sembako dan produk komoditas berkualitas dari katalog Koperasi Merah Putih Mekarjaya.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Savings Pill */}
                    {savings > 0 && (
                      <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-3 flex items-center gap-2.5 text-xs text-emerald-800 backdrop-blur-xs">
                        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                        <div>
                          <span className="font-bold">Hemat Rp {savings.toLocaleString('id-ID')}</span> dengan tarif khusus Anggota Koperasi!
                        </div>
                      </div>
                    )}

                    {/* Items */}
                    <div className="space-y-2.5">
                      {cart.map(({ product, qty }) => {
                        const effectivePrice = product.memberPrice || product.price;
                        return (
                          <div
                            key={product.id}
                            className="p-3 bg-white/90 rounded-2xl border border-slate-200/90 shadow-2xs flex gap-3 items-center backdrop-blur-xs"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 rounded-xl object-cover bg-slate-100 shrink-0 aspect-square"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-slate-900 truncate">
                                {product.name}
                              </p>
                              <p className="text-[11px] text-slate-400">
                                {product.unit} &bull; {product.supplier}
                              </p>
                              <div className="mt-1 flex items-baseline gap-2">
                                <span className="text-xs font-black text-red-600">
                                  Rp {effectivePrice.toLocaleString('id-ID')}
                                </span>
                                {product.memberPrice && (
                                  <span className="text-[10px] text-slate-400 line-through">
                                    Rp {product.price.toLocaleString('id-ID')}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Qty controls */}
                            <div className="flex items-center gap-1.5 shrink-0 bg-slate-50 p-1 rounded-xl border border-slate-200">
                              <button
                                onClick={() => updateCartQty(product.id, qty - 1)}
                                className="w-6 h-6 rounded-lg bg-white shadow-2xs flex items-center justify-center text-slate-600 hover:text-red-600 text-xs font-bold cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-xs font-extrabold text-slate-800">
                                {qty}
                              </span>
                              <button
                                onClick={() => updateCartQty(product.id, qty + 1)}
                                className="w-6 h-6 rounded-lg bg-white shadow-2xs flex items-center justify-center text-slate-600 hover:text-red-600 text-xs font-bold cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(product.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* WILAYAH TUJUAN / ZONASI DISTRIBUSI DEPOK (Sesuai alur.jpeg) */}
                    <div className="p-3.5 bg-slate-50/90 rounded-2xl border border-slate-200 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
                          <MapPin className="w-4 h-4 text-red-600" />
                          <span>Zonasi Distribusi Depok</span>
                        </div>
                        <span className="text-[10px] font-black text-red-600 bg-red-100 border border-red-200 px-2 py-0.5 rounded-full">
                          {currentZone.code}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                            Kecamatan:
                          </label>
                          <select
                            value={checkoutKecId}
                            onChange={(e) => {
                              const newKecId = e.target.value;
                              setCheckoutKecId(newKecId);
                              const found = KECAMATAN_DEPOK.find((k) => k.id === newKecId);
                              if (found) setCheckoutKel(found.kelurahan[0]);
                            }}
                            className="w-full text-xs font-bold bg-white border border-slate-200 rounded-xl p-2 text-slate-800"
                          >
                            {KECAMATAN_DEPOK.map((k) => (
                              <option key={k.id} value={k.id}>
                                Kec. {k.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                            Kelurahan:
                          </label>
                          <select
                            value={checkoutKel}
                            onChange={(e) => setCheckoutKel(e.target.value)}
                            className="w-full text-xs font-bold bg-white border border-slate-200 rounded-xl p-2 text-slate-800"
                          >
                            {currentKec.kelurahan.map((kel) => (
                              <option key={kel} value={kel}>
                                Kel. {kel}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-white border border-slate-200/80 text-[10px] text-slate-600 space-y-1">
                        <p>
                          <strong className="text-slate-800">Pos Hub:</strong> {currentKec.posCabang}
                        </p>
                        <p className="text-slate-400">
                          {currentZone.fleetId} &bull; Rute dari Koperasi Induk Mekarjaya
                        </p>
                      </div>
                    </div>

                    {/* Delivery & Pickup Selector */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 block">
                        Metode Penerimaan:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setPickupType('Ambil di Pos Cabang Kelurahan')}
                          className={`p-2.5 rounded-2xl border text-xs font-semibold flex items-center gap-2 text-left transition-colors cursor-pointer ${
                            pickupType.includes('Ambil di Pos Cabang')
                              ? 'border-red-600 bg-red-50 text-red-700'
                              : 'border-slate-200 bg-slate-50 text-slate-700'
                          }`}
                        >
                          <Store className="w-4 h-4 text-red-600 shrink-0" />
                          <div>
                            <p className="leading-tight font-bold">Ambil di Cabang</p>
                            <p className="text-[10px] text-slate-400">Gratis (Pos Kelurahan)</p>
                          </div>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPickupType('Antar ke Rumah (Armada Depok)')}
                          className={`p-2.5 rounded-2xl border text-xs font-semibold flex items-center gap-2 text-left transition-colors cursor-pointer ${
                            pickupType.includes('Antar ke Rumah')
                              ? 'border-red-600 bg-red-50 text-red-700'
                              : 'border-slate-200 bg-slate-50 text-slate-700'
                          }`}
                        >
                          <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                          <div>
                            <p className="leading-tight font-bold">Antar ke Rumah</p>
                            <p className="text-[10px] text-slate-400">+Rp 10.000 (Zonasi)</p>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 block">
                        Metode Pembayaran:
                      </label>
                      <div className="space-y-1.5 text-xs">
                        {[
                          { id: 'Saldo Koperasi', label: 'Saldo Simpanan Koperasi (Rp 1.450.000)', icon: Wallet },
                          { id: 'QRIS', label: 'QRIS (Semua Bank & E-Wallet)', icon: QrCode },
                          { id: 'Transfer Bank', label: 'Transfer Bank / Virtual Account', icon: CreditCard },
                          { id: 'Bayar di Tempat', label: 'Bayar Tunai di Pos Cabang', icon: Banknote },
                        ].map((p) => {
                          const Icon = p.icon;
                          return (
                            <label
                              key={p.id}
                              className={`flex items-center gap-2.5 p-2 rounded-xl border cursor-pointer transition-colors ${
                                paymentMethod === p.id
                                  ? 'border-red-500 bg-red-50/60 font-semibold text-red-900'
                                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                              }`}
                            >
                              <input
                                type="radio"
                                name="payment"
                                value={p.id}
                                checked={paymentMethod === p.id}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="text-red-600 focus:ring-red-500"
                              />
                              <Icon className="w-4 h-4 text-slate-500" />
                              <span className="text-xs">{p.label}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Footer Checkout Summary */}
              {cart.length > 0 && (
                <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/90 backdrop-blur-xs space-y-3">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-500">
                      <span>Subtotal Reguler</span>
                      <span>Rp {cartRegularTotal.toLocaleString('id-ID')}</span>
                    </div>
                    {savings > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Diskon Anggota Koperasi</span>
                        <span>-Rp {savings.toLocaleString('id-ID')}</span>
                      </div>
                    )}
                    {pickupType.includes('Antar ke Rumah') && (
                      <div className="flex justify-between text-slate-500">
                        <span>Ongkos Kirim Armada ({currentZone.code})</span>
                        <span>Rp 10.000</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm sm:text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                      <span>Total Bayar</span>
                      <span className="text-red-600">
                        Rp {(cartTotal + (pickupType.includes('Antar ke Rumah') ? 10000 : 0)).toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold text-sm py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Konfirmasi Pesanan ({currentZone.code})</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccessModalOpen && createdOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-4 shadow-2xl border border-white/80"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900">
                  Pesanan Berhasil Masuk ke Induk!
                </h3>
                <p className="text-xs text-slate-500">
                  Nomor Pesanan: <strong className="text-slate-800">{createdOrder.id}</strong>
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 text-xs text-left space-y-2 border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-500">Tujuan Anggota:</span>
                  <span className="font-bold text-slate-900">
                    Kel. {createdOrder.kelurahan}, Kec. {createdOrder.kecamatan}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Zonasi Distribusi:</span>
                  <span className="font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
                    {createdOrder.zoneName || 'Zona 4'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Transaksi:</span>
                  <span className="font-black text-red-600">
                    Rp {createdOrder.total.toLocaleString('id-ID')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Metode Bayar:</span>
                  <span className="font-semibold text-slate-800">{createdOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Pengambilan:</span>
                  <span className="font-semibold text-slate-800">{createdOrder.pickupType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status Awal:</span>
                  <span className="font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                    {createdOrder.status}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setIsSuccessModalOpen(false);
                    setCurrentRole('anggota');
                    navigate('/portal/anggota');
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-3 rounded-xl transition-colors cursor-pointer"
                >
                  Lacak Alur Zonasi di Portal Anggota &rarr;
                </button>
                <button
                  onClick={() => {
                    setIsSuccessModalOpen(false);
                  }}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-3 rounded-xl transition-colors cursor-pointer"
                >
                  Tutup & Lanjut Belanja
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
