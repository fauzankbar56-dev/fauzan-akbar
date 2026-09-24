import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, CheckCircle2, Clock, Sparkles, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { formatRupiah } from '../data/bakeryData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

const FREE_SHIPPING_THRESHOLD = 150000; // Rp 150.000
const STANDARD_SHIPPING_FEE = 15000;    // Rp 15.000

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [deliverySlot, setDeliverySlot] = useState<string>('rush');
  const [tipAmount, setTipAmount] = useState<number>(5000);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING_FEE;
  const grandTotal = subtotal + shippingFee + (subtotal > 0 ? tipAmount : 0);
  const progressToFreeShipping = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `KTB-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newOrderId);
    setOrderConfirmed(true);
    setIsCheckingOut(false);
  };

  const handleFinish = () => {
    setOrderConfirmed(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-amber-100 flex items-center justify-between bg-amber-50/50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-900 text-amber-100 flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-stone-900">Keranjang Katumbiri</h3>
                <p className="text-xs text-stone-500">
                  {cartItems.length} {cartItems.length === 1 ? 'pesanan' : 'pesanan'} siap dipanggang
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-stone-200/60 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
              aria-label="Tutup keranjang"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {orderConfirmed ? (
              // Order Confirmation Screen
              <div className="py-8 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-display text-2xl font-extrabold text-stone-900">
                  Pesanan Berhasil Diterima!
                </h4>
                <div className="inline-block bg-amber-100/80 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-900">
                  Nomor Pesanan: #{orderId}
                </div>
                <p className="text-xs text-stone-600 leading-relaxed max-w-xs mx-auto">
                  Terima kasih, <strong className="text-stone-900">{customerName || 'Kakak'}</strong>! Tim baker Katumbiri Kustome Cake sedang menyiapkan pesanan hangatmu dengan kemasan eksklusif.
                </p>

                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-left text-xs space-y-2 mt-4">
                  <div className="flex items-center gap-2 text-amber-900 font-bold">
                    <Clock className="w-4 h-4 text-amber-700" />
                    <span>Perkiraan Tiba Hangat: 45 - 60 Menit</span>
                  </div>
                  <div className="text-stone-600">
                    Alamat Pengiriman: <span className="font-medium text-stone-800">{customerAddress || 'Alamat Anda'}</span>
                  </div>
                  <div className="text-[11px] text-stone-500 italic">
                    Konfirmasi WhatsApp telah dikirimkan ke {customerPhone || 'nomor kontak Anda'}.
                  </div>
                </div>

                <button
                  onClick={handleFinish}
                  className="w-full mt-6 bg-amber-900 hover:bg-amber-800 text-amber-50 py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  Kembali Menjelajah Menu
                </button>
              </div>
            ) : isCheckingOut ? (
              // Checkout Form Screen
              <form onSubmit={handlePlaceOrder} className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <h4 className="font-display font-bold text-base text-stone-900">Data Pengiriman</h4>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="text-xs text-amber-800 font-semibold hover:underline cursor-pointer"
                  >
                    ← Kembali ke Keranjang
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Nama Lengkap Penerima *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Contoh: Sarah Aulia"
                      className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Nomor WhatsApp Aktif *</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Contoh: 081234567890"
                      className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Alamat Lengkap & Patokan *</label>
                    <textarea
                      required
                      rows={2}
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="Nama Jalan, Nomor Rumah/Blok, RT/RW, Kelurahan, Kecamatan"
                      className="w-full text-xs p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Waktu Pengiriman</label>
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      <label className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer ${deliverySlot === 'rush' ? 'border-amber-700 bg-amber-50/70 font-semibold' : 'border-stone-200'}`}>
                        <span className="flex items-center gap-2">
                          <input type="radio" name="slot" checked={deliverySlot === 'rush'} onChange={() => setDeliverySlot('rush')} className="accent-amber-800" />
                          <span>Pengiriman Hangat Kilat (45-60 Menit)</span>
                        </span>
                        <span className="text-[10px] bg-amber-200/80 px-2 py-0.5 rounded-md text-amber-900 font-bold">Tercepat</span>
                      </label>

                      <label className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer ${deliverySlot === 'evening' ? 'border-amber-700 bg-amber-50/70 font-semibold' : 'border-stone-200'}`}>
                        <span className="flex items-center gap-2">
                          <input type="radio" name="slot" checked={deliverySlot === 'evening'} onChange={() => setDeliverySlot('evening')} className="accent-amber-800" />
                          <span>Perayaan Sore/Malam (17.00 - 19.30 WIB)</span>
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Catatan Tambahan untuk Kurir / Baker</label>
                    <input
                      type="text"
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="Contoh: Titipkan di pos satpam atau jangan bunyikan bel"
                      className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-amber-900 hover:bg-amber-800 text-amber-50 py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Konfirmasi & Kirim Pesanan ({formatRupiah(grandTotal)})</span>
                  </button>
                  <p className="text-[11px] text-stone-400 text-center mt-2">
                    Mendukung Transfer Bank, QRIS, & COD • Jaminan 100% Hangat & Fresh
                  </p>
                </div>
              </form>
            ) : cartItems.length === 0 ? (
              // Empty Cart
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-amber-100/60 text-amber-800 mx-auto flex items-center justify-center text-3xl">
                  🍫
                </div>
                <h4 className="font-display font-bold text-lg text-stone-900">Keranjang Masih Kosong</h4>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Yuk pilih brownies fudgy lumer, custom cake perayaan, atau hampers manis dari Katumbiri Kustome Cake!
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 inline-block bg-amber-900 text-amber-50 px-6 py-2.5 rounded-xl text-xs font-bold shadow-xs hover:bg-amber-800 cursor-pointer"
                >
                  Pilih Menu Sekarang
                </button>
              </div>
            ) : (
              // Active Items List
              <>
                {/* Free Shipping Progress bar */}
                <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200/70 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      {subtotal >= FREE_SHIPPING_THRESHOLD
                        ? '🎉 Selamat! Kamu mendapatkan GRATIS ONGKIR!'
                        : `Tambah ${formatRupiah(FREE_SHIPPING_THRESHOLD - subtotal)} lagi untuk GRATIS ONGKIR`}
                    </span>
                    <span className="text-amber-800 font-extrabold">{Math.round(progressToFreeShipping)}%</span>
                  </div>
                  <div className="w-full bg-amber-200/60 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-700 h-full rounded-full transition-all duration-500"
                      style={{ width: `${progressToFreeShipping}%` }}
                    />
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-stone-50 rounded-2xl border border-stone-200/80 flex items-start gap-3"
                    >
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h5 className="font-display font-bold text-xs text-stone-900 line-clamp-1">
                            {item.product.name}
                          </h5>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-stone-400 hover:text-rose-600 p-0.5 cursor-pointer"
                            title="Hapus menu"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Flavors list if custom box */}
                        {item.selectedBoxFlavors && (
                          <p className="text-[10px] text-amber-800 line-clamp-1 mt-0.5 font-medium">
                            Varian Box: {item.selectedBoxFlavors.join(', ')}
                          </p>
                        )}

                        {item.customization?.drizzle && (
                          <p className="text-[10px] text-stone-500 line-clamp-1">
                            Saus: {item.customization.drizzle}
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-stone-300 rounded-lg bg-white overflow-hidden">
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:bg-stone-100 text-stone-600 cursor-pointer"
                              title="Kurangi"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-stone-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:bg-stone-100 text-stone-600 cursor-pointer"
                              title="Tambah"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-xs font-bold text-stone-900">
                            {formatRupiah(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Baker Tip Section */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-2">
                    <span>Apresiasi untuk Tim Baker:</span>
                    <span className="text-amber-800 font-bold">{formatRupiah(tipAmount)}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    {[0, 5000, 10000, 15000].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setTipAmount(amount)}
                        className={`py-1.5 rounded-xl border text-center font-bold transition-all cursor-pointer ${
                          tipAmount === amount
                            ? 'bg-amber-800 text-white border-amber-800'
                            : 'bg-white text-stone-600 border-stone-200 hover:border-amber-300'
                        }`}
                      >
                        {amount === 0 ? 'Tidak' : formatRupiah(amount)}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

          </div>

          {/* Footer Totals & Checkout Button */}
          {!orderConfirmed && cartItems.length > 0 && !isCheckingOut && (
            <div className="p-6 border-t border-amber-100 bg-amber-50/40 space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-800">{formatRupiah(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ongkos Kirim</span>
                  <span className="font-semibold text-stone-800">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold">GRATIS</span>
                    ) : (
                      formatRupiah(shippingFee)
                    )}
                  </span>
                </div>
                {tipAmount > 0 && (
                  <div className="flex justify-between">
                    <span>Apresiasi Baker</span>
                    <span className="font-semibold text-stone-800">{formatRupiah(tipAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-stone-900 pt-2 border-t border-amber-200">
                  <span>Total Pembayaran</span>
                  <span>{formatRupiah(grandTotal)}</span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                id="proceed-checkout-button"
                className="w-full bg-amber-900 hover:bg-amber-850 text-amber-50 py-3.5 rounded-2xl font-bold text-sm shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Lanjut ke Pengiriman</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
