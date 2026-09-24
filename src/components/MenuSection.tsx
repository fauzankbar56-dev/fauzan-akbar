import React, { useState, useMemo } from 'react';
import { BakeryCategory, BakeryProduct } from '../types';
import { ProductCard } from './ProductCard';
import { Sparkles, Filter, Flame, Check } from 'lucide-react';

interface MenuSectionProps {
  products: BakeryProduct[];
  activeCategory: BakeryCategory;
  onSelectCategory: (category: BakeryCategory) => void;
  onAddToCart: (product: BakeryProduct) => void;
  onOpenBoxBuilder: () => void;
  searchQuery: string;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  onAddToCart,
  onOpenBoxBuilder,
  searchQuery
}) => {
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'bestseller' | 'eggless'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories: { label: string; value: BakeryCategory; icon: string }[] = [
    { label: 'Semua Menu', value: 'all', icon: '✨' },
    { label: 'Fudgy Brownies', value: 'brownies', icon: '🍫' },
    { label: 'Kustome Cake', value: 'cakes', icon: '🎂' },
    { label: 'Artisan Pastry', value: 'pastries', icon: '🥐' },
    { label: 'Hampers & Box', value: 'gift-boxes', icon: '🎁' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        // Category filter
        if (activeCategory !== 'all' && item.category !== activeCategory) {
          return false;
        }
        // Dietary filter
        if (dietaryFilter === 'bestseller' && !item.isBestseller) {
          return false;
        }
        if (dietaryFilter === 'eggless' && !item.isEggless) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = item.name.toLowerCase().includes(q);
          const matchDesc = item.description.toLowerCase().includes(q);
          const matchTags = item.tags.some(t => t.toLowerCase().includes(q));
          if (!matchName && !matchDesc && !matchTags) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured default order
      });
  }, [products, activeCategory, dietaryFilter, sortBy, searchQuery]);

  return (
    <section id="bakery-menu" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-amber-800 text-xs font-bold uppercase tracking-widest bg-amber-100/80 px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Koleksi Segar Dipanggang dengan Cinta</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Menu Katumbiri Kustome Cake
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-1.5 max-w-xl">
            Pilihan brownies panggang cokelat Belgia asli, kue perayaan custom berlapis lembut, dan pastry renyah yang siap menemani setiap momen bahagiamu.
          </p>
        </div>

        {/* Custom Box Builder Spotlight CTA */}
        <button
          onClick={onOpenBoxBuilder}
          className="self-start md:self-auto flex items-center gap-2.5 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-amber-50 px-5 py-3 rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Kustom Box Brownies</span>
          <span className="bg-amber-500 text-amber-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full ml-1">
            Pilih 6 Rasa
          </span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => onSelectCategory(cat.value)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-900 text-amber-50 shadow-md scale-102'
                  : 'bg-white text-stone-700 border border-amber-200/70 hover:bg-amber-50 hover:text-amber-900'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-amber-50/60 rounded-2xl border border-amber-200/50 mb-8">
        
        {/* Dietary Toggles */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-stone-500 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-amber-700" /> Filter:
          </span>

          <button
            onClick={() => setDietaryFilter('all')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              dietaryFilter === 'all'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-amber-100'
            }`}
          >
            Semua Menu
          </button>

          <button
            onClick={() => setDietaryFilter('bestseller')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
              dietaryFilter === 'bestseller'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-amber-100'
            }`}
          >
            <Flame className="w-3 h-3 text-amber-300" />
            <span>Paling Laris</span>
          </button>

          <button
            onClick={() => setDietaryFilter('eggless')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1 ${
              dietaryFilter === 'eggless'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-emerald-50 hover:text-emerald-800'
            }`}
          >
            <Check className="w-3 h-3" />
            <span>100% Eggless</span>
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 text-xs text-stone-600">
          <span>Urutkan:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-amber-200 rounded-xl px-3 py-1.5 text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
          >
            <option value="featured">Pilihan Rekomendasi Chef</option>
            <option value="rating">Rating Tertinggi (★ 5.0)</option>
            <option value="price-asc">Harga: Terendah ke Tertinggi</option>
            <option value="price-desc">Harga: Tertinggi ke Terendah</option>
          </select>
        </div>

      </div>

      {/* Search Result Feedback */}
      {searchQuery && (
        <div className="mb-6 text-sm text-stone-600 flex items-center justify-between">
          <span>Hasil pencarian untuk: <strong className="text-stone-900">"{searchQuery}"</strong> ({filteredProducts.length} menu ditemukan)</span>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickCustomize={product.category === 'brownies' ? () => onOpenBoxBuilder() : undefined}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-amber-100 max-w-md mx-auto my-8">
          <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-2xl mb-4">
            🔍
          </div>
          <h3 className="font-display font-bold text-xl text-stone-900 mb-2">
            Menu tidak ditemukan
          </h3>
          <p className="text-sm text-stone-500 mb-6">
            Kami tidak menemukan menu yang cocok dengan filter pencarianmu. Coba reset filter atau jelajahi brownies signature Katumbiri!
          </p>
          <button
            onClick={() => {
              onSelectCategory('all');
              setDietaryFilter('all');
            }}
            className="bg-amber-900 text-amber-50 px-6 py-2.5 rounded-xl font-bold text-sm shadow-xs hover:bg-amber-800 cursor-pointer"
          >
            Reset Filter
          </button>
        </div>
      )}

      {/* Rotating Bowl Callout Strip */}
      <div className="mt-16 bg-gradient-to-r from-amber-900 via-stone-900 to-amber-950 text-amber-50 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-amber-700/40">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-bold tracking-wider uppercase">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Langsung Dari Mangkuk Brownies Hangat ke Rumahmu</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
            Ingin Menikmati Brownies yang Berputar di Video?
          </h3>
          <p className="text-amber-200/80 text-sm max-w-xl">
            Setiap loyang dipanggang dengan tekstur fudgy dan shiny crust renyah. Hangatkan selama 15 detik di microwave untuk melelehkan cokelat di dalamnya!
          </p>
        </div>

        <button
          onClick={onOpenBoxBuilder}
          className="shrink-0 bg-amber-400 hover:bg-amber-300 text-amber-950 px-6 py-3.5 rounded-2xl font-extrabold text-sm shadow-lg hover:scale-105 transition-all cursor-pointer"
        >
          Kustom Box Brownies Sekarang →
        </button>
      </div>

    </section>
  );
};
