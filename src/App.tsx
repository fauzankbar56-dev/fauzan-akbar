import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { StorySection } from './components/StorySection';
import { BrownieBoxBuilder } from './components/BrownieBoxBuilder';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { BAKERY_PRODUCTS } from './data/bakeryData';
import { BakeryCategory, BakeryProduct, CartItem } from './types';
import { CheckCircle2, Flame, Award, Truck, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<BakeryCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isBoxBuilderOpen, setIsBoxBuilderOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initial cart with Katumbiri signature brownie item
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'initial-fudge-item',
      product: BAKERY_PRODUCTS[0],
      quantity: 1,
      customization: {
        drizzle: 'Saus Dark Chocolate Ganache Hangat (Gratis)'
      }
    }
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleAddToCart = (product: BakeryProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && !item.selectedBoxFlavors);
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `cart-${product.id}-${Date.now()}`,
          product,
          quantity: 1
        }
      ];
    });
    showToast(`"${product.name}" berhasil ditambahkan ke keranjang!`);
  };

  const handleAddBoxToCart = (item: CartItem) => {
    setCartItems((prev) => [...prev, item]);
    showToast(`Kotak Kustom Katumbiri berhasil masuk ke keranjang!`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToMenu = () => {
    const el = document.getElementById('bakery-menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/20 text-stone-900 selection:bg-amber-300 selection:text-amber-950 font-sans">
      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onOpenBoxBuilder={() => setIsBoxBuilderOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1">
        {/* Hero Section with rotating brownie bowl video in loop, muted, no black overlay */}
        <Hero
          onOrderNow={scrollToMenu}
          onOpenBoxBuilder={() => setIsBoxBuilderOpen(true)}
        />

        {/* Bakery Value Proposition Ribbon */}
        <div className="bg-white border-y border-amber-200/60 py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-stone-700 text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100/80 text-amber-800 flex items-center justify-center shrink-0">
                  <Flame className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <div className="font-bold text-stone-900">Fresh Oven 06.00</div>
                  <div className="text-[11px] text-stone-500">Dipanggang hangat setiap pagi</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100/80 text-amber-800 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <div className="font-bold text-stone-900">70% Cokelat Belgia</div>
                  <div className="text-[11px] text-stone-500">Callebaut couverture murni</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100/80 text-amber-800 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <div className="font-bold text-stone-900">Pengiriman Cepat</div>
                  <div className="text-[11px] text-stone-500">Kemasan termal terjaga hangat</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100/80 text-amber-800 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <div className="font-bold text-stone-900">Kustome Cake Spesial</div>
                  <div className="text-[11px] text-stone-500">Sempurna untuk setiap perayaan</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <MenuSection
          products={BAKERY_PRODUCTS}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onAddToCart={handleAddToCart}
          onOpenBoxBuilder={() => setIsBoxBuilderOpen(true)}
          searchQuery={searchQuery}
        />

        {/* Sejarah & Cerita Toko Katumbiri Kustome Cake (Replacing Reviews) */}
        <StorySection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Custom Brownie Box Modal */}
      <BrownieBoxBuilder
        isOpen={isBoxBuilderOpen}
        onClose={() => setIsBoxBuilderOpen(false)}
        onAddBoxToCart={handleAddBoxToCart}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900/95 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl border border-amber-500/40 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
