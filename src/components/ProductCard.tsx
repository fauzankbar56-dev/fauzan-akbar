import React, { useState } from 'react';
import { Star, Plus, Check, Heart, Sparkles } from 'lucide-react';
import { BakeryProduct } from '../types';
import { formatRupiah } from '../data/bakeryData';

interface ProductCardProps {
  product: BakeryProduct;
  onAddToCart: (product: BakeryProduct) => void;
  onQuickCustomize?: (product: BakeryProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickCustomize
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="group relative bg-white rounded-3xl p-3.5 sm:p-4 border border-amber-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      <div>
        {/* Product Image Container */}
        <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-amber-50">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 items-start">
            {product.badge && (
              <span className="bg-amber-900/90 backdrop-blur-xs text-amber-100 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                {product.badge}
              </span>
            )}
            {product.isEggless && (
              <span className="bg-emerald-700/90 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                100% Eggless
              </span>
            )}
          </div>

          {/* Like button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-xs text-stone-600 hover:text-rose-600 transition-colors shadow-xs cursor-pointer"
            aria-label="Simpan ke favorit"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'text-rose-500 fill-rose-500' : ''}`} />
          </button>

          {/* Portion/servings badge on hover */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-stone-900/80 backdrop-blur-xs text-white text-[11px] py-1 px-2.5 rounded-xl flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span>{product.pieces || product.weight}</span>
            <span>{product.serves}</span>
          </div>
        </div>

        {/* Content Details */}
        <div className="pt-3.5 space-y-1.5">
          {/* Rating & category */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-amber-600 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-stone-400">({product.reviewsCount})</span>
            </div>
            <span className="text-[11px] font-medium text-stone-500 capitalize">
              {product.category === 'brownies' ? 'Brownies Fudgy' : product.category === 'cakes' ? 'Kue Perayaan' : product.category === 'pastries' ? 'Artisan Pastry' : 'Paket Hampers'}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-stone-900 text-base sm:text-lg leading-snug line-clamp-1 group-hover:text-amber-800 transition-colors">
            {product.name}
          </h3>

          {/* Tagline / Description */}
          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Flavor Notes tags */}
          {product.flavorNotes && (
            <div className="flex flex-wrap gap-1 pt-1">
              {product.flavorNotes.slice(0, 2).map((note, i) => (
                <span key={i} className="text-[10px] bg-amber-50 text-amber-900 border border-amber-200/60 px-2 py-0.5 rounded-md font-medium">
                  {note}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Pricing & Add to Basket Button */}
      <div className="pt-4 mt-3 border-t border-amber-100/80 flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-extrabold text-stone-900">
              {formatRupiah(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through">
                {formatRupiah(product.originalPrice)}
              </span>
            )}
          </div>
          <span className="text-[10px] text-stone-400">Fresh dipanggang harian</span>
        </div>

        <div className="flex items-center gap-1.5">
          {product.category === 'brownies' && onQuickCustomize && (
            <button
              onClick={() => onQuickCustomize(product)}
              className="p-2.5 rounded-xl border border-amber-300 text-amber-800 hover:bg-amber-100 transition-colors text-xs font-semibold cursor-pointer"
              title="Kustomisasi box atau topping"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={handleAdd}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-all cursor-pointer ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-amber-900 hover:bg-amber-800 text-amber-50 hover:shadow-md'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Masuk!</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Pesan</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
