import React, { useState } from 'react';
import { X, Sparkles, Plus, Trash2, Check, Gift } from 'lucide-react';
import { BROWNIE_FLAVORS_OPTIONS, DRIZZLE_OPTIONS, formatRupiah } from '../data/bakeryData';
import { CartItem } from '../types';

interface BrownieBoxBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBoxToCart: (item: CartItem) => void;
}

const BOX_CAPACITY = 6;
const BOX_BASE_PRICE = 95000;

export const BrownieBoxBuilder: React.FC<BrownieBoxBuilderProps> = ({
  isOpen,
  onClose,
  onAddBoxToCart
}) => {
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([
    'Triple Belgian Fudge',
    'Triple Belgian Fudge',
    'Salted Butter Caramel',
    'Choco Almond Melt'
  ]);
  const [selectedDrizzle, setSelectedDrizzle] = useState<string>(DRIZZLE_OPTIONS[0]);
  const [includeCandle, setIncludeCandle] = useState<boolean>(true);
  const [giftNote, setGiftNote] = useState<string>('');

  if (!isOpen) return null;

  const addFlavor = (flavorName: string) => {
    if (selectedFlavors.length < BOX_CAPACITY) {
      setSelectedFlavors([...selectedFlavors, flavorName]);
    }
  };

  const removeFlavor = (index: number) => {
    setSelectedFlavors(selectedFlavors.filter((_, i) => i !== index));
  };

  const isFull = selectedFlavors.length === BOX_CAPACITY;

  const handleCompleteBox = () => {
    if (selectedFlavors.length === 0) return;

    // Calculate extra costs if drizzle has one
    let extraCost = 0;
    if (selectedDrizzle.includes('Rp 10.000')) extraCost += 10000;
    if (selectedDrizzle.includes('Rp 15.000')) extraCost += 15000;

    const customProduct = {
      id: `custom-box-${Date.now()}`,
      name: `Kotak Kustom Katumbiri (Isi ${selectedFlavors.length} Potong)`,
      tagline: `Pilihan Saus: ${selectedDrizzle}`,
      description: `Kombinasi pilihanmu: ${selectedFlavors.join(', ')}`,
      price: BOX_BASE_PRICE + extraCost,
      category: 'gift-boxes' as const,
      rating: 5.0,
      reviewsCount: 1,
      imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop',
      tags: ['Kustom Rasa', 'Box isi 6'],
      pieces: `${selectedFlavors.length} Potong Brownies`,
      serves: '4-6 orang'
    };

    onAddBoxToCart({
      id: `item-${Date.now()}`,
      product: customProduct,
      quantity: 1,
      selectedBoxFlavors: selectedFlavors,
      giftNote: giftNote.trim() || undefined,
      customization: {
        drizzle: selectedDrizzle,
        candle: includeCandle
      }
    });

    onClose();
  };

  const calculateTotal = () => {
    let extraCost = 0;
    if (selectedDrizzle.includes('Rp 10.000')) extraCost += 10000;
    if (selectedDrizzle.includes('Rp 15.000')) extraCost += 15000;
    return BOX_BASE_PRICE + extraCost;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-amber-200">
        
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-amber-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-stone-900">
                Kustom Box Brownies Katumbiri (Isi 6)
              </h3>
              <p className="text-xs text-stone-500">
                Pilih bebas 6 varian rasa favoritmu • Fresh from the oven
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
            aria-label="Tutup kustomisasi"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Box Slots Visualizer */}
          <div className="bg-amber-50/70 p-4 sm:p-5 rounded-2xl border border-amber-200/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Slot Kotakmu: ({selectedFlavors.length}/{BOX_CAPACITY})
              </span>
              <span className="text-xs font-semibold text-amber-800">
                {isFull ? '✓ Kotak Penuh & Siap Dikemas!' : `Tambahkan ${BOX_CAPACITY - selectedFlavors.length} rasa lagi`}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {Array.from({ length: BOX_CAPACITY }).map((_, index) => {
                const flavor = selectedFlavors[index];
                return (
                  <div
                    key={index}
                    className={`relative p-3 rounded-xl border text-left transition-all ${
                      flavor
                        ? 'bg-white border-amber-300 shadow-xs'
                        : 'border-dashed border-amber-300 bg-amber-100/30 flex items-center justify-center text-center'
                    }`}
                  >
                    {flavor ? (
                      <div className="flex flex-col justify-between h-14">
                        <span className="text-xs font-bold text-stone-900 leading-tight line-clamp-2">
                          {flavor}
                        </span>
                        <button
                          onClick={() => removeFlavor(index)}
                          className="self-end text-[11px] text-rose-500 hover:text-rose-700 flex items-center gap-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Hapus</span>
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-amber-700/70 font-medium">
                        Slot #{index + 1} Kosong
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Flavor Selection List */}
          <div>
            <h4 className="font-display font-bold text-sm text-stone-900 mb-2.5">
              Pilih Varian Rasa Brownies:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {BROWNIE_FLAVORS_OPTIONS.map((opt) => (
                <div
                  key={opt.id}
                  className="p-3 rounded-xl border border-stone-200 hover:border-amber-400 bg-white hover:bg-amber-50/40 transition-all flex items-center justify-between gap-3"
                >
                  <div>
                    <h5 className="text-xs font-bold text-stone-900">{opt.name}</h5>
                    <p className="text-[11px] text-stone-500">{opt.desc}</p>
                  </div>

                  <button
                    onClick={() => addFlavor(opt.name)}
                    disabled={isFull}
                    className={`p-2 rounded-lg font-bold text-xs flex items-center gap-1 transition-all ${
                      isFull
                        ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                        : 'bg-amber-800 hover:bg-amber-900 text-white cursor-pointer shadow-xs'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Pilih</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Finishing Drizzle */}
          <div className="space-y-2">
            <h4 className="font-display font-bold text-sm text-stone-900">
              Pilih Saus Lumer Pelengkap (Drizzle):
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {DRIZZLE_OPTIONS.map((drizzle) => (
                <label
                  key={drizzle}
                  className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedDrizzle === drizzle
                      ? 'border-amber-600 bg-amber-50/60 shadow-xs'
                      : 'border-stone-200 hover:border-amber-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="drizzle"
                    checked={selectedDrizzle === drizzle}
                    onChange={() => setSelectedDrizzle(drizzle)}
                    className="accent-amber-800 w-4 h-4"
                  />
                  <span className="text-xs font-medium text-stone-800">{drizzle}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Personalized Celebration Touch */}
          <div className="space-y-3 pt-2 border-t border-amber-100">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs font-semibold text-stone-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeCandle}
                  onChange={(e) => setIncludeCandle(e.target.checked)}
                  className="accent-amber-800 rounded-sm w-4 h-4"
                />
                <Gift className="w-4 h-4 text-amber-700" />
                <span>Gratis lilin perayaan emas & amplop ucapan</span>
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Pesan Kartu Ucapan Kustom (Opsional):
              </label>
              <textarea
                value={giftNote}
                onChange={(e) => setGiftNote(e.target.value)}
                placeholder="Contoh: Selamat Ulang Tahun Ayah tercinta! Semoga sehat selalu & bahagia. Dari kami berdua."
                rows={2}
                className="w-full text-xs p-3 rounded-xl border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-amber-50/20"
              />
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-6 py-4 border-t border-amber-100 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs text-stone-500">Total Harga Box:</div>
            <div className="text-xl font-black text-stone-900">
              {formatRupiah(calculateTotal())}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 font-bold text-xs cursor-pointer"
            >
              Batal
            </button>

            <button
              onClick={handleCompleteBox}
              disabled={selectedFlavors.length === 0}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer ${
                selectedFlavors.length > 0
                  ? 'bg-amber-900 hover:bg-amber-850 text-amber-50 hover:shadow-lg'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              <Check className="w-4 h-4 text-amber-300" />
              <span>Masukkan ke Keranjang</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
