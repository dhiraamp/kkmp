import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { KkmpProvider, useKkmp } from './context/KkmpContext';
import Navbar from './components/Navbar';
import RoleSwitcherModal from './components/RoleSwitcherModal';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';

import LandingPage from './pages/LandingPage';
import PortalLogin from './pages/PortalLogin';
import AnggotaPortal from './pages/roles/AnggotaPortal';
import CabangPortal from './pages/roles/CabangPortal';
import SupplierPortal from './pages/roles/SupplierPortal';
import LogistikPortal from './pages/roles/LogistikPortal';
import IndukPortal from './pages/roles/IndukPortal';

function AppContent() {
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenSearch = () => {
    navigate('/');
    setTimeout(() => {
      const searchEl = document.getElementById('search-input-hero');
      if (searchEl) {
        searchEl.focus();
        searchEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Universal Header with 5-Role quick bar */}
      <Navbar
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
        onOpenSearch={handleOpenSearch}
      />

      {/* Main Pages Content */}
      <main className="flex-1">
        <Routes>
          {/* Public Landing & Marketplace */}
          <Route path="/" element={<LandingPage onOpenRoleModal={() => setIsRoleModalOpen(true)} />} />
          <Route path="/marketplace" element={<Navigate to="/" replace />} />
          
          {/* Portal Multi-Role Login */}
          <Route path="/portal" element={<PortalLogin />} />
          
          {/* 5 Role Dedicated Portals */}
          <Route path="/portal/anggota" element={<AnggotaPortal />} />
          <Route path="/portal/cabang" element={<CabangPortal />} />
          <Route path="/portal/supplier" element={<SupplierPortal />} />
          <Route path="/portal/logistik" element={<LogistikPortal />} />
          <Route path="/portal/admin" element={<IndukPortal />} />

          {/* Compatibility redirects for paths mentioned in docs */}
          <Route path="/warga/*" element={<Navigate to="/portal/anggota" replace />} />
          <Route path="/mitra/*" element={<Navigate to="/portal/cabang" replace />} />
          <Route path="/supplier/*" element={<Navigate to="/portal/supplier" replace />} />
          <Route path="/logistik/*" element={<Navigate to="/portal/logistik" replace />} />
          <Route path="/admin/*" element={<Navigate to="/portal/admin" replace />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Role Switcher Modal (accessible from anywhere) */}
      <RoleSwitcherModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
      />

      {/* Universal Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Universal Toast Notifications */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <KkmpProvider>
      <Router>
        <AppContent />
      </Router>
    </KkmpProvider>
  );
}
