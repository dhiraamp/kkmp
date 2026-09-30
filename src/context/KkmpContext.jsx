import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_SUPPLY_ORDERS,
  INITIAL_FLEET,
  ROLE_INFO,
  CABANG_DEPOK,
  KECAMATAN_DEPOK,
  ZONASI_DEPOK,
} from '../data/mockData';

const KkmpContext = createContext(null);

export const KkmpProvider = ({ children }) => {
  // Current user role: null (guest) or 'anggota' | 'cabang' | 'supplier' | 'logistik' | 'admin'
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('kkmp_role') || null;
  });

  // Active Kecamatan & Kelurahan selection (default: Sukmajaya, Mekarjaya — Pusat Koperasi Induk)
  const [selectedKecamatanId, setSelectedKecamatanId] = useState(() => {
    return localStorage.getItem('kkmp_kecamatan') || 'sukmajaya';
  });

  const [selectedKelurahan, setSelectedKelurahan] = useState(() => {
    return localStorage.getItem('kkmp_kelurahan') || 'Mekarjaya';
  });

  const [activeBranchId, setActiveBranchId] = useState(() => {
    return localStorage.getItem('kkmp_branch') || 'sukmajaya';
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('kkmp_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('kkmp_cart');
    return saved ? JSON.parse(saved) : [
      { product: INITIAL_PRODUCTS[0], qty: 1 },
      { product: INITIAL_PRODUCTS[1], qty: 1 },
    ];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('kkmp_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [supplyOrders, setSupplyOrders] = useState(() => {
    const saved = localStorage.getItem('kkmp_supply_orders');
    return saved ? JSON.parse(saved) : INITIAL_SUPPLY_ORDERS;
  });

  const [fleet, setFleet] = useState(() => {
    const saved = localStorage.getItem('kkmp_fleet');
    return saved ? JSON.parse(saved) : INITIAL_FLEET;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    if (currentRole) localStorage.setItem('kkmp_role', currentRole);
    else localStorage.removeItem('kkmp_role');
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('kkmp_branch', activeBranchId);
  }, [activeBranchId]);

  useEffect(() => {
    localStorage.setItem('kkmp_kecamatan', selectedKecamatanId);
  }, [selectedKecamatanId]);

  useEffect(() => {
    localStorage.setItem('kkmp_kelurahan', selectedKelurahan);
  }, [selectedKelurahan]);

  useEffect(() => {
    localStorage.setItem('kkmp_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('kkmp_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('kkmp_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('kkmp_supply_orders', JSON.stringify(supplyOrders));
  }, [supplyOrders]);

  useEffect(() => {
    localStorage.setItem('kkmp_fleet', JSON.stringify(fleet));
  }, [fleet]);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const switchRole = (role) => {
    setCurrentRole(role);
    if (role) {
      showToast(`Beralih ke peran: ${ROLE_INFO[role]?.label || role}`);
    } else {
      showToast('Keluar ke Halaman Publik (Tamu)');
    }
  };

  // Helper to change kecamatan and auto-select its first kelurahan
  const setLocation = (kecamatanId, kelurahanName) => {
    const kec = KECAMATAN_DEPOK.find((k) => k.id === kecamatanId) || KECAMATAN_DEPOK[0];
    setSelectedKecamatanId(kec.id);
    setActiveBranchId(kec.id);

    const targetKel = kelurahanName || (kec.kelurahan && kec.kelurahan[0]) || 'Pusat';
    setSelectedKelurahan(targetKel);

    showToast(`Lokasi aktif: Kel. ${targetKel}, Kec. ${kec.name} (${kec.zoneName})`);
  };

  const activeKecamatan =
    KECAMATAN_DEPOK.find((k) => k.id === selectedKecamatanId) || KECAMATAN_DEPOK[0];

  const activeZonasi =
    ZONASI_DEPOK.find((z) => z.id === activeKecamatan.zoneId) || ZONASI_DEPOK[0];

  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { product, qty }];
    });
    showToast(`"${product.name}" ditambahkan ke keranjang!`);
  };

  const updateCartQty = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, qty } : item))
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Produk dihapus dari keranjang', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  const cartTotal = cart.reduce(
    (acc, item) => acc + (item.product.memberPrice || item.product.price) * item.qty,
    0
  );

  const cartRegularTotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0
  );

  const placeOrder = ({ paymentMethod, pickupType, cabangId, kecamatan, kelurahan }) => {
    if (cart.length === 0) return null;

    const kecObj =
      KECAMATAN_DEPOK.find((k) => k.id === (cabangId || selectedKecamatanId)) || activeKecamatan;
    const zonasiObj =
      ZONASI_DEPOK.find((z) => z.id === kecObj.zoneId) || activeZonasi;

    const finalKel = kelurahan || selectedKelurahan;
    const finalKec = kecamatan || kecObj.name;

    const newOrder = {
      id: `ORD-2026-${String(orders.length + 1).padStart(3, '0')}`,
      date: 'Hari ini, ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      memberId: 'KKMP-DPK-2026-0812',
      memberName: 'Budi Santoso',
      kecamatan: finalKec,
      kelurahan: finalKel,
      zoneId: zonasiObj.id,
      zoneName: zonasiObj.title,
      items: cart.map((c) => ({
        name: c.product.name,
        qty: c.qty,
        price: c.product.memberPrice || c.product.price,
      })),
      total: cartTotal,
      paymentMethod,
      pickupType: pickupType || `Ambil di Pos Cabang ${finalKec}`,
      cabangId: kecObj.id,
      status: 'Menunggu Konfirmasi',
      trackingTimeline: [
        {
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          title: 'Pesanan Masuk dari Anggota',
          desc: `Tujuan: Kel. ${finalKel}, Kec. ${finalKec} — Total Rp ${cartTotal.toLocaleString('id-ID')}`,
        },
        {
          time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          title: `Filter Zonasi Otomatis: ${zonasiObj.title}`,
          desc: `Pesanan dikelompokkan ke rute distribusi armada ${zonasiObj.fleetId}`,
        },
      ],
    };

    setOrders([newOrder, ...orders]);
    clearCart();
    setIsCartOpen(false);
    showToast(`Pesanan #${newOrder.id} (${zonasiObj.title}) berhasil dibuat!`);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus, note = '') => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const newTimeline = [
            ...(o.trackingTimeline || []),
            {
              time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
              title: newStatus,
              desc: note || `Status diperbarui menjadi ${newStatus}`,
            },
          ];
          return { ...o, status: newStatus, trackingTimeline: newTimeline };
        }
        return o;
      })
    );
    showToast(`Pesanan ${orderId} diupdate: ${newStatus}`);
  };

  const createSupplyOrder = ({ items, cabangId }) => {
    const selectedCabang = CABANG_DEPOK.find((c) => c.id === cabangId) || CABANG_DEPOK[0];
    const newPO = {
      id: `PO-IND-${Math.floor(100 + Math.random() * 900)}`,
      date: 'Hari ini, ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      cabangId: selectedCabang.id,
      cabangName: selectedCabang.name,
      items,
      status: 'Menunggu Muat',
      assignedFleet: 'Belum ditugaskan',
      estimatedArrival: 'Dalam estimasi 2 jam',
    };
    setSupplyOrders([newPO, ...supplyOrders]);
    showToast(`Pengajuan Pasokan #${newPO.id} berhasil dikirim ke Koperasi Induk!`);
    return newPO;
  };

  const updateSupplyOrderStatus = (poId, status, fleetName = '') => {
    setSupplyOrders((prev) =>
      prev.map((po) =>
        po.id === poId
          ? {
              ...po,
              status,
              ...(fleetName ? { assignedFleet: fleetName } : {}),
            }
          : po
      )
    );
    showToast(`PO #${poId} diupdate: ${status}`);
  };

  const updateFleetStatus = (fleetId, status, location = '') => {
    setFleet((prev) =>
      prev.map((f) =>
        f.id === fleetId
          ? {
              ...f,
              status,
              ...(location ? { currentLocation: location } : {}),
            }
          : f
      )
    );
    showToast(`Armada ${fleetId} update: ${status}`);
  };

  const addProduct = (newProd) => {
    const prod = {
      ...newProd,
      id: `p-${Date.now()}`,
      rating: 5.0,
      sold: 0,
      isFeatured: false,
    };
    setProducts([prod, ...products]);
    showToast(`Produk "${prod.name}" berhasil ditambahkan ke katalog!`);
  };

  const updateProduct = (prodId, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === prodId ? { ...p, ...updatedFields } : p))
    );
    showToast('Data produk berhasil diperbarui');
  };

  return (
    <KkmpContext.Provider
      value={{
        currentRole,
        setCurrentRole: switchRole,
        activeBranchId,
        setActiveBranchId,
        activeBranch: CABANG_DEPOK.find((c) => c.id === activeBranchId) || CABANG_DEPOK[0],
        selectedKecamatanId,
        selectedKelurahan,
        setLocation,
        activeKecamatan,
        activeZonasi,
        products,
        cart,
        cartCount,
        cartTotal,
        cartRegularTotal,
        orders,
        supplyOrders,
        fleet,
        isCartOpen,
        setIsCartOpen,
        toastMessage,
        showToast,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        placeOrder,
        updateOrderStatus,
        createSupplyOrder,
        updateSupplyOrderStatus,
        updateFleetStatus,
        addProduct,
        updateProduct,
      }}
    >
      {children}
    </KkmpContext.Provider>
  );
};

export const useKkmp = () => {
  const context = useContext(KkmpContext);
  if (!context) {
    throw new Error('useKkmp must be used within a KkmpProvider');
  }
  return context;
};
