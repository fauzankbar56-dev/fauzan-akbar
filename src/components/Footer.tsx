import React, { useState } from 'react';
import { Mail, Clock, MapPin, Heart, Shield, Check, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-amber-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter banner */}
        <div className="bg-gradient-to-r from-amber-950 via-stone-800 to-amber-900 rounded-3xl p-8 mb-16 border border-amber-800/40 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center lg:text-left">
            <h4 className="font-display text-2xl font-bold text-amber-100">
              Dapatkan Diskon 15% untuk Pesanan Pertamamu!
            </h4>
            <p className="text-xs sm:text-sm text-stone-400">
              Bergabunglah dengan Sahabat Katumbiri untuk info promo brownies hangat dan kejutan manis di hari ulang tahunmu.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full sm:w-auto items-center gap-2">
            {subscribed ? (
              <div className="flex items-center gap-2 bg-emerald-900/60 border border-emerald-700/60 text-emerald-200 px-5 py-3 rounded-2xl text-xs font-bold">
                <Check className="w-4 h-4" />
                <span>Kode KATUM15 berhasil diaktifkan!</span>
              </div>
            ) : (
              <>
                <div className="relative w-full sm:w-72">
                  <Mail className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan alamat emailmu"
                    className="w-full bg-stone-900/80 border border-amber-700/50 rounded-2xl py-3 pl-10 pr-4 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-5 py-3 rounded-2xl font-extrabold text-xs shrink-0 transition-colors cursor-pointer shadow-md"
                >
                  Klaim 15%
                </button>
              </>
            )}
          </form>
        </div>

        {/* 4 Column links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14 text-xs">
          
          {/* Brand & Ethos */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-amber-700 text-amber-100 flex items-center justify-center font-display font-bold text-xl">
                K
              </div>
              <span className="font-display font-bold text-xl text-white">
                Katumbiri Kustome Cake
              </span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              Toko kue dan brownies artisan terpercaya. Terinspirasi dari keindahan pelangi kebahagiaan untuk melengkapi perayaan setiap keluarga dengan cita rasa cokelat Belgia murni.
            </p>
            <div className="flex items-center gap-2 text-amber-400 font-semibold pt-1">
              <Shield className="w-4 h-4" />
              <span>Jaminan 100% Cokelat Belgia & Halal</span>
            </div>
          </div>

          {/* Quick Bakery Links */}
          <div className="space-y-3">
            <h5 className="font-display font-bold text-sm text-amber-200">
              Koleksi Menu Pilihan
            </h5>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#bakery-menu" className="hover:text-amber-300 transition-colors">Signature Triple Fudge Brownies</a></li>
              <li><a href="#bakery-menu" className="hover:text-amber-300 transition-colors">Fudgy Choco Almond Melt</a></li>
              <li><a href="#bakery-menu" className="hover:text-amber-300 transition-colors">Salted Caramel & Roasted Walnut</a></li>
              <li><a href="#bakery-menu" className="hover:text-amber-300 transition-colors">Royal Truffle Celebration Cake</a></li>
              <li><a href="#sejarah-toko" className="hover:text-amber-300 transition-colors flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> Sejarah & Cerita Toko</a></li>
            </ul>
          </div>

          {/* Kitchen & Delivery Timings */}
          <div className="space-y-3">
            <h5 className="font-display font-bold text-sm text-amber-200 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              Jam Operasional & Pengiriman
            </h5>
            <div className="text-stone-400 space-y-1.5">
              <p><strong className="text-stone-200">Senin - Jumat:</strong> 06.30 – 21.00 WIB</p>
              <p><strong className="text-stone-200">Sabtu - Minggu:</strong> 07.00 – 22.00 WIB</p>
              <p className="text-amber-400/90 pt-1">
                Pengiriman Cepat: 45-60 menit langsung dalam kemasan termal terjaga hangat.
              </p>
            </div>
          </div>

          {/* Bakery Location & Contact */}
          <div className="space-y-3">
            <h5 className="font-display font-bold text-sm text-amber-200 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-amber-400" />
              Dapur Utama & Pesanan
            </h5>
            <div className="text-stone-400 space-y-1.5 leading-relaxed">
              <p>Jl. Katumbiri No. 18, Bandung Wetan</p>
              <p>Jawa Barat, Indonesia</p>
              <p className="pt-1">halo@katumbiricake.com</p>
              <p>WhatsApp: 0812-3456-7890</p>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-stone-800 text-[11px] text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Katumbiri Kustome Cake. Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center gap-4">
            <a href="#sejarah-toko" className="hover:text-stone-400">Tentang Kami</a>
            <a href="#bakery-menu" className="hover:text-stone-400">Pilihan Menu</a>
            <a href="#" className="hover:text-stone-400">Kebijakan Privasi</a>
          </div>
          <p className="flex items-center gap-1">
            Dipanggang dengan <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" /> dan cinta untuk setiap perayaan
          </p>
        </div>

      </div>
    </footer>
  );
};
