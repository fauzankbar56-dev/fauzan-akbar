import React, { useState } from 'react';
import { ShoppingBag, Search, Sparkles, Heart, Clock, Menu, X, ChevronRight, Phone, BookOpen } from 'lucide-react';
import { BakeryCategory } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  activeCategory: BakeryCategory;
  onSelectCategory: (cat: BakeryCategory) => void;
  onOpenBoxBuilder: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  activeCategory,
  onSelectCategory,
  onOpenBoxBuilder,
  searchQuery,
  onSearchChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const categories: { label: string; value: BakeryCategory }[] = [
    { label: 'Semua Menu', value: 'all' },
    { label: 'Fudgy Brownies', value: 'brownies' },
    { label: 'Kustome Cake', value: 'cakes' },
    { label: 'Artisan Pastry', value: 'pastries' },
    { label: 'Hampers & Box', value: 'gift-boxes' },
  ];

  const handleNavClick = (cat: BakeryCategory) => {
    onSelectCategory(cat);
    setMobileMenuOpen(false);
    const el = document.getElementById('bakery-menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToStory = () => {
    setMobileMenuOpen(false);
    const el = document.getElementById('sejarah-toko');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100/80 shadow-xs transition-all">
      {/* Top announcement bar */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-amber-50 text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Dipanggang Segar Tiap Pagi: Gratis Saus Dark Chocolate Belgia untuk pesanan di atas Rp 150.000!</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-amber-200 text-xs">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              Pesan Sebelum Jam 14.00 untuk Pengiriman Hari Ini
            </span>
            <span className="text-amber-400">|</span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-amber-300" />
              WhatsApp: 0812-3456-7890
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo: Katumbiri Kustome Cake */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-amber-800 text-amber-100 flex items-center justify-center font-display font-bold text-2xl shadow-md group-hover:scale-105 transition-transform duration-200">
              K
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xl sm:text-2xl tracking-tight text-amber-950 group-hover:text-amber-800 transition-colors">
                Katumbiri Kustome Cake
              </span>
              <span className="text-[10px] uppercase tracking-widest text-amber-700 font-semibold -mt-0.5">
                Artisanal Brownies & Custom Cake
              </span>
            </div>
          </a>

          {/* Desktop Category Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleNavClick(cat.value)}
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.value
                    ? 'bg-amber-100/90 text-amber-900 shadow-xs'
                    : 'text-stone-700 hover:text-amber-900 hover:bg-amber-50'
                }`}
              >
                {cat.label}
              </button>
            ))}

            <button
              onClick={handleScrollToStory}
              className="px-3 py-2 rounded-xl text-sm font-semibold text-stone-700 hover:text-amber-900 hover:bg-amber-50 transition-all cursor-pointer flex items-center gap-1"
            >
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>Sejarah Toko</span>
            </button>

            <button
              onClick={onOpenBoxBuilder}
              className="ml-2 px-3.5 py-2 rounded-xl text-sm font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Kustom Brownies Box</span>
            </button>
          </nav>

          {/* Right Action Icons & Search */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search toggler / bar */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center bg-amber-50/80 border border-amber-200 rounded-full px-3 py-1.5 w-44 sm:w-60 shadow-xs">
                  <Search className="w-4 h-4 text-amber-700 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Cari brownies, custom cake..."
                    className="w-full bg-transparent pl-2 text-xs sm:text-sm text-stone-800 focus:outline-none placeholder:text-stone-400"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      onSearchChange('');
                      setShowSearchInput(false);
                    }}
                    className="text-stone-400 hover:text-stone-600 text-xs ml-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  className="p-2.5 rounded-full text-stone-600 hover:text-amber-900 hover:bg-amber-50 transition-colors cursor-pointer"
                  title="Cari kue dan brownies"
                  aria-label="Cari kue dan brownies"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Quick Favorites link */}
            <a
              href="#bakery-menu"
              className="hidden sm:flex p-2.5 rounded-full text-stone-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Menu favorit"
              aria-label="Menu favorit"
            >
              <Heart className="w-5 h-5" />
            </a>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              id="cart-trigger-button"
              className="relative flex items-center gap-2 bg-amber-900 hover:bg-amber-850 text-amber-50 px-4 py-2.5 rounded-full font-semibold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
              aria-label="Lihat Keranjang Belanja"
            >
              <ShoppingBag className="w-5 h-5 text-amber-300" />
              <span className="hidden sm:inline">Keranjang</span>
              {cartCount > 0 && (
                <span className="flex items-center justify-center bg-amber-500 text-amber-950 text-xs font-extrabold w-5 h-5 rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-amber-50 focus:outline-none cursor-pointer"
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-amber-100 animate-fadeIn">
            <div className="flex flex-col gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleNavClick(cat.value)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-semibold transition-colors ${
                    activeCategory === cat.value
                      ? 'bg-amber-100 text-amber-900'
                      : 'text-stone-700 hover:bg-amber-50'
                  }`}
                >
                  <span>{cat.label}</span>
                  <ChevronRight className="w-4 h-4 text-amber-600" />
                </button>
              ))}

              <button
                onClick={handleScrollToStory}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-semibold text-stone-700 hover:bg-amber-50"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-700" />
                  <span>Sejarah Toko Katumbiri</span>
                </span>
                <ChevronRight className="w-4 h-4 text-amber-600" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBoxBuilder();
                }}
                className="mt-2 w-full flex items-center justify-center gap-2 bg-amber-700 text-white py-3 rounded-xl font-bold text-sm shadow-xs cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                Kustom Box Brownies Pilihanmu
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
