import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Search,
  ShoppingCart,
  User,
  ChevronDown,
  Building2,
  Users,
  Store,
  Truck,
  Handshake,
  LogOut,
  X,
  Menu,
  Sparkles,
  Zap,
  PhoneCall,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Navigation,
  Clock,
} from 'lucide-react';
import { useKkmp } from '../context/KkmpContext';
import { ROLE_INFO, KECAMATAN_DEPOK, ZONASI_DEPOK } from '../data/mockData';

export default function Navbar({ onOpenRoleModal, onOpenSearch }) {
  const {
    currentRole,
    setCurrentRole,
    cartCount,
    cartTotal,
    setIsCartOpen,
    selectedKecamatanId,
    selectedKelurahan,
    setLocation,
    activeKecamatan,
    activeZonasi,
  } = useKkmp();

  const navigate = useNavigate();
  const location = useLocation();

  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navSearchQuery, setNavSearchQuery] = useState('');
  const [locationSearchFilter, setLocationSearchFilter] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  const locationRef = useRef(null);

  // Monitor scroll for enhanced backdrop blur effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setIsLocationDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roleData = currentRole ? ROLE_INFO[currentRole] : null;

  const handleNavSearchSubmit = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    }
    setTimeout(() => {
      const heroSearchInput = document.getElementById('search-input-hero');
      if (heroSearchInput) {
        heroSearchInput.value = navSearchQuery;
        heroSearchInput.focus();
        heroSearchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  // Filter kecamatan & kelurahan in location popover
  const filteredKecamatanList = useMemo(() => {
    if (!locationSearchFilter.trim()) return KECAMATAN_DEPOK;
    const q = locationSearchFilter.toLowerCase();
    return KECAMATAN_DEPOK.filter(
      (k) =>
        k.name.toLowerCase().includes(q) ||
        k.zoneName.toLowerCase().includes(q) ||
        k.kelurahan.some((kel) => kel.toLowerCase().includes(q))
    );
  }, [locationSearchFilter]);



  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      
      {/* =========================================================================
          1. SLIM ANNOUNCEMENT STRIP (Modern Dark Glass, Non-intrusive)
         ========================================================================= */}
      <div className="bg-slate-950/95 backdrop-blur-md text-slate-300 text-[11px] py-1.5 px-4 sm:px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Official City Badge & Hotline */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-slate-300 font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Koperasi Resmi Kota Depok &bull; Melayani 11 Kecamatan & 63 Kelurahan</span>
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400">
              <PhoneCall className="w-3 h-3 text-red-400" />
              <span>Hotline: <strong className="text-slate-200">0812-9988-7766</strong></span>
            </span>
          </div>

          {/* Right: Operational Status & Portal Link */}
          <div className="flex items-center gap-3">
            <span className="hidden md:flex items-center gap-1.5 text-slate-400 text-xs">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>Layanan: <strong className="text-slate-200">Senin - Sabtu (08.00 - 17.00 WIB)</strong></span>
            </span>

            {currentRole ? (
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/70 border border-red-500/30 text-amber-300 font-bold text-[11px] shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{roleData?.label}</span>
                </span>
                <button
                  onClick={() => {
                    setCurrentRole(null);
                    navigate('/');
                  }}
                  className="text-[10px] font-bold text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <Link
                to="/portal"
                className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-[11px] border border-white/15 transition-all cursor-pointer shadow-xs backdrop-blur-xs"
              >
                <Building2 className="w-3 h-3 text-red-400" />
                <span>Portal Layanan</span>
              </Link>
            )}
          </div>

        </div>
      </div>

      {/* =========================================================================
          2. MAIN MODERN ULTRA-FROSTED GLASS NAVBAR
         ========================================================================= */}
      <div className={`transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-2xl border-b border-slate-200/70 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)]'
          : 'bg-white/95 backdrop-blur-xl border-b border-slate-200/60 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20 gap-3 sm:gap-6">
            
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-red-700 via-red-600 to-rose-600 flex items-center justify-center text-white shadow-md shadow-red-500/25 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-red-500/40 transition-all duration-300">
                <svg viewBox="0 0 48 48" fill="none" className="w-7 h-7 sm:w-8 sm:h-8" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 6L6 20H12V40H36V20H42L24 6Z" fill="white" />
                  <circle cx="24" cy="24" r="3.5" fill="#dc2626" />
                  <path d="M19 35C19 31.5 21.2 29 24 29C26.8 29 29 31.5 29 35H19Z" fill="#dc2626" />
                  <circle cx="16" cy="26" r="2.5" fill="#dc2626" />
                  <path d="M12 35C12 32.5 13.8 30.5 16 30.5C17.5 30.5 18.7 31.4 19.3 32.7C19.1 33.4 19 34.2 19 35H12Z" fill="#dc2626" />
                  <circle cx="32" cy="26" r="2.5" fill="#dc2626" />
                  <path d="M36 35H29C29 34.2 28.9 33.4 28.7 32.7C29.3 31.4 30.5 30.5 32 30.5C34.2 30.5 36 32.5 36 35Z" fill="#dc2626" />
                </svg>
              </div>
              <div className="leading-tight">
                <div className="font-black text-sm sm:text-base tracking-tight text-slate-900 group-hover:text-red-600 transition-colors">
                  KOPERASI <span className="text-red-600">MERAH PUTIH</span>
                </div>
                <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                  MEKARJAYA &bull; KOTA DEPOK
                </div>
              </div>
            </Link>

            {/* LOCATION SELECTOR: 11 KECAMATAN & 63 KELURAHAN DEPOK */}
            <div className="relative shrink-0 hidden md:block" ref={locationRef}>
              <motion.button
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-2xl border border-slate-200/80 bg-slate-50/80 hover:bg-slate-100/90 hover:border-slate-300 text-xs font-bold text-slate-800 transition-all cursor-pointer shadow-2xs backdrop-blur-xs"
              >
                <div className="w-6 h-6 rounded-lg bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[9px] text-slate-400 uppercase leading-none font-bold">Wilayah Anggota:</p>
                    <span className="text-[9px] font-black text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.2 rounded-md">
                      {activeZonasi?.code || 'ZONA'}
                    </span>
                  </div>
                  <p className="text-xs font-black text-slate-900 leading-tight truncate max-w-[140px]">
                    Kel. {selectedKelurahan}
                  </p>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 ml-0.5 transition-transform duration-200 ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              {/* Location Popover (11 Kecamatan & 63 Kelurahan) */}
              <AnimatePresence>
                {isLocationDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute left-0 mt-2 w-88 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200/90 py-3 z-50 max-h-[85vh] flex flex-col"
                  >
                    <div className="px-4 pb-2.5 border-b border-slate-100">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-xs font-black text-slate-900">
                          11 Kecamatan & 63 Kelurahan Depok
                        </p>
                        <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                          {activeZonasi.title}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mb-2">
                        Pilih kelurahan Anda untuk menentukan rute zonasi dan pos cabang terdekat
                      </p>
                      
                      {/* Search in popover */}
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                        <input
                          type="text"
                          value={locationSearchFilter}
                          onChange={(e) => setLocationSearchFilter(e.target.value)}
                          placeholder="Cari kelurahan (cth: Mekarjaya, Kukusan, Harjamukti)..."
                          className="w-full bg-slate-100 rounded-xl pl-8 pr-3 py-1.5 text-[11px] text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                        />
                      </div>
                    </div>

                    <div className="overflow-y-auto px-2 py-2 divide-y divide-slate-100 space-y-2">
                      {filteredKecamatanList.map((kec) => {
                        const isKecActive = selectedKecamatanId === kec.id;

                        return (
                          <div key={kec.id} className="pt-2 first:pt-0">
                            <div className="flex items-center justify-between px-2 py-1 bg-slate-50/70 rounded-xl mb-1">
                              <span className="font-extrabold text-[11px] text-slate-800">
                                Kec. {kec.name} ({kec.totalKelurahan} Kelurahan)
                              </span>
                              <span className="text-[9px] font-bold text-slate-400">
                                {kec.zoneName.split('(')[0]}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-1 px-1">
                              {kec.kelurahan.map((kel) => {
                                const isCurrent =
                                  isKecActive && selectedKelurahan === kel;

                                return (
                                  <button
                                    key={kel}
                                    type="button"
                                    onClick={() => {
                                      setLocation(kec.id, kel);
                                      setIsLocationDropdownOpen(false);
                                    }}
                                    className={`text-left p-1.5 rounded-xl text-[11px] transition-colors cursor-pointer flex items-center justify-between ${
                                      isCurrent
                                        ? 'bg-red-600 text-white font-black shadow-xs'
                                        : 'hover:bg-slate-100 text-slate-700 font-medium'
                                    }`}
                                  >
                                    <span className="truncate">{kel}</span>
                                    {isCurrent && <span className="text-[10px]">✓</span>}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* INTEGRATED MODERN SEARCH BAR */}
            <div className="flex-1 max-w-md hidden lg:block">
              <form onSubmit={handleNavSearchSubmit} className="relative group">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 group-focus-within:text-red-600 transition-colors" />
                <input
                  type="text"
                  value={navSearchQuery}
                  onChange={(e) => setNavSearchQuery(e.target.value)}
                  placeholder="Cari beras, minyak, telur, sayur, sambal..."
                  className="w-full bg-slate-100/70 hover:bg-slate-100/90 focus:bg-white border border-slate-200/80 focus:border-red-500 rounded-2xl pl-10 pr-20 py-2.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-4 focus:ring-red-500/10 transition-all shadow-inner"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] px-3.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  Cari
                </button>
              </form>
            </div>

            {/* NAVIGATION LINKS (Persis skema UI & Tanpa '5 Role Portal') */}
            <nav className="hidden xl:flex items-center gap-6 text-xs font-extrabold text-slate-700">
              <Link
                to="/"
                className={`hover:text-red-600 transition-colors py-1 relative ${
                  location.pathname === '/' ? 'text-red-600 font-black' : ''
                }`}
              >
                Beranda
                {location.pathname === '/' && (
                  <motion.div
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 rounded-full"
                  />
                )}
              </Link>
              <a href="#katalog-produk-unggulan" className="hover:text-red-600 transition-colors">
                Katalog Produk
              </a>
              <a href="#jaringan-wilayah" className="hover:text-red-600 transition-colors">
                11 Kecamatan
              </a>
              <a href="#tentang-kami" className="hover:text-red-600 transition-colors">
                Tentang Kami
              </a>
              <a href="#berita" className="hover:text-red-600 transition-colors">
                Berita
              </a>
              <a href="#bantuan" className="hover:text-red-600 transition-colors">
                Bantuan
              </a>
            </nav>

            {/* RIGHT CONTROLS: CART & USER ACTION */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Cart Pill with Subtotal Preview - Hidden on Tampilan Awal */}
              {location.pathname !== '/' && currentRole === 'anggota' && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-2xl bg-slate-100/80 hover:bg-red-50 hover:text-red-600 text-slate-800 font-bold text-xs transition-all cursor-pointer border border-slate-200/80 relative shadow-2xs group backdrop-blur-xs"
                  title="Keranjang Belanja"
                >
                  <div className="relative">
                    <ShoppingCart className="w-4 h-4 text-slate-700 group-hover:text-red-600 transition-colors" />
                    {cartCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-xs"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </div>
                  <span className="hidden sm:inline font-black text-xs">
                    {cartCount > 0 ? `Rp ${cartTotal.toLocaleString('id-ID')}` : 'Keranjang'}
                  </span>
                </motion.button>
              )}

              {/* User Login / Active Role Chip */}
              {currentRole ? (
                <div className="flex items-center gap-1.5">
                  <Link
                    to={`/portal/${currentRole}`}
                    className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2.5 rounded-2xl shadow-md transition-all group"
                  >
                    <div className="w-5 h-5 rounded-lg bg-red-600 text-white flex items-center justify-center text-[10px] font-black">
                      {roleData?.label.charAt(0)}
                    </div>
                    <span className="hidden md:inline truncate max-w-[120px]">
                      {roleData?.name.split(' ')[0]}
                    </span>
                  </Link>

                  <button
                    onClick={() => {
                      setCurrentRole(null);
                      navigate('/');
                    }}
                    className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-slate-100 rounded-2xl transition-colors cursor-pointer"
                    title="Keluar ke mode publik"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/portal"
                  className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white text-xs font-bold px-4 sm:px-5 py-2.5 rounded-2xl shadow-md shadow-red-500/25 hover:shadow-lg hover:shadow-red-500/35 hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span>Masuk Portal</span>
                </Link>
              )}

              {/* Mobile menu hamburger */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-2xl bg-slate-100/90 text-slate-700 hover:bg-slate-200 transition-colors"
                title="Buka Menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* =========================================================================
          3. MODERN MOBILE DRAWER OVERLAY
         ========================================================================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200 px-5 pt-4 pb-6 space-y-4 shadow-2xl overflow-hidden"
          >
            {/* Mobile Search */}
            <form onSubmit={handleNavSearchSubmit} className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={navSearchQuery}
                onChange={(e) => setNavSearchQuery(e.target.value)}
                placeholder="Cari kebutuhan sembako..."
                className="w-full bg-slate-100/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-red-500/20"
              />
            </form>

            {/* Quick Kecamatan & Kelurahan selector in mobile */}
            <div className="space-y-2 pt-1 border-t border-slate-100">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Pilih Wilayah Anda (11 Kecamatan & 63 Kelurahan):
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <select
                  value={selectedKecamatanId}
                  onChange={(e) => {
                    const kec = KECAMATAN_DEPOK.find((k) => k.id === e.target.value);
                    if (kec) setLocation(kec.id, kec.kelurahan[0]);
                  }}
                  className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800"
                >
                  {KECAMATAN_DEPOK.map((k) => (
                    <option key={k.id} value={k.id}>
                      Kec. {k.name}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedKelurahan}
                  onChange={(e) => setLocation(selectedKecamatanId, e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800"
                >
                  {activeKecamatan.kelurahan.map((kel) => (
                    <option key={kel} value={kel}>
                      Kel. {kel}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-[10px] text-red-600 font-bold">
                {activeZonasi.title} &bull; Hub: {activeKecamatan.posCabang}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <Link
                to="/portal"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold text-xs flex items-center justify-between shadow-md shadow-red-500/20"
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>Masuk Portal Layanan Koperasi</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Links */}
            <div className="flex flex-col space-y-2 pt-2 border-t border-slate-100 text-xs font-bold text-slate-700">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 px-3 rounded-xl hover:bg-red-50 hover:text-red-600"
              >
                Beranda Marketplace
              </Link>
              <a
                href="#katalog-produk-unggulan"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 px-3 rounded-xl hover:bg-red-50 hover:text-red-600"
              >
                Katalog Produk Sembako
              </a>
              <a
                href="#jaringan-wilayah"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 px-3 rounded-xl hover:bg-red-50 hover:text-red-600"
              >
                11 Kecamatan Depok
              </a>
              <a
                href="#tentang-kami"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 px-3 rounded-xl hover:bg-red-50 hover:text-red-600"
              >
                Tentang Kami
              </a>
              <a
                href="#berita"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 px-3 rounded-xl hover:bg-red-50 hover:text-red-600"
              >
                Berita
              </a>
              <a
                href="#bantuan"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 px-3 rounded-xl hover:bg-red-50 hover:text-red-600"
              >
                Bantuan
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
