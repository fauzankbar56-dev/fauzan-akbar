import React from 'react';
import { Sparkles, Heart, Flame, Award, Clock, Users, Coffee } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="sejarah-toko" className="py-20 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/60 border-t border-amber-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Tag & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-amber-900 text-xs font-bold uppercase tracking-widest bg-amber-100/90 border border-amber-300/70 px-4 py-1.5 rounded-full mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>Cerita & Dedikasi Kami</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
            Sejarah di Balik <br className="hidden sm:inline" />
            <span className="text-amber-800 underline decoration-amber-300 decoration-wavy">
              Katumbiri Kustome Cake
            </span>
          </h2>

          <p className="text-stone-600 text-sm sm:text-base mt-4 leading-relaxed">
            Dari oven rumahan kecil hingga menjadi pilihan terpercaya ribuan keluarga untuk melengkapi momen manis penuh kenangan.
          </p>
        </div>

        {/* Story Grid 1: Meaning of Katumbiri & Origin */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          {/* Visual card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-amber-100 bg-amber-50 aspect-4/3 sm:aspect-5/4">
              <img
                src="https://images.unsplash.com/photo-1556911073-38141963c9e0?q=80&w=800&auto=format&fit=crop"
                alt="Dapur Bakery Artisan Katumbiri Kustome Cake"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Filosofi Nama</span>
                <h4 className="font-display font-bold text-xl sm:text-2xl mt-1">Katumbiri = Pelangi Kehidupan</h4>
                <p className="text-xs text-amber-100/90 mt-1">
                  Membawa warna-warni kebahagiaan dan kehangatan di setiap perayaan.
                </p>
              </div>
            </div>

            {/* Accent badge */}
            <div className="absolute -bottom-5 -right-4 bg-white p-4 rounded-2xl shadow-lg border border-amber-200 hidden sm:flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Flame className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900">Dimulai Sejak 2018</div>
                <div className="text-[11px] text-stone-500">Resep Turun-Temurun Keluarga</div>
              </div>
            </div>
          </div>

          {/* Text narrative */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Terinspirasi dari Kehangatan Pelangi Kasih</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
              Bagaimana Toko Ini Lahir & Mengapa Dinamai Katumbiri?
            </h3>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Kata <strong>"Katumbiri"</strong> diambil dari bahasa Sunda yang bermakna <em>Pelangi</em>. Bagi kami, pelangi adalah lambang keindahan sehabis rintik hujan—hadir menghiasi langit dengan aneka warna yang memancarkan harapan, kedamaian, dan senyum kebahagiaan.
            </p>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Kisah ini berawal pada tahun 2018 di sebuah dapur rumahan sederhana. Sang pendiri terinspirasi oleh kebiasaan nenek yang gemar memanggang brownies cokelat hangat setiap akhir pekan untuk cucu-cucunya. Aroma pekat lelehan cokelat murni, mentega gurih, dan tekstur <em>crinkly crust</em> yang renyah di luar serta lumer di dalam selalu berhasil merekatkan seluruh anggota keluarga di satu meja perjamuan.
            </p>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Dari rasa cinta akan momen kebersamaan itulah lahir komitmen: <strong>"Setiap perayaan berhak memiliki kue istimewa yang dibuat khusus (kustome) sesuai cerita dan selera pemiliknya."</strong>
            </p>
          </div>

        </div>

        {/* Story Grid 2: Three Pillars of Inspiration */}
        <div className="bg-amber-100/40 rounded-3xl p-6 sm:p-10 border border-amber-200/70 mb-14">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h4 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
              Tiga Inspirasi Utama di Dapur Katumbiri
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Prinsip yang kami jaga di setiap loyang brownies dan kue perayaan yang keluar dari oven.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-amber-200/60 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Award className="w-6 h-6 text-amber-700" />
              </div>
              <h5 className="font-display font-bold text-base text-stone-900">
                1. Cokelat Belgia Asli & Mentega Murni
              </h5>
              <p className="text-xs text-stone-600 leading-relaxed">
                Kami menolak kompromi bahan. Menggunakan 100% Callebaut Dark Couverture Chocolate 70% dan butter Eropa murni, menghasilkan rasa cokelat pekat yang elegan tanpa sensasi manis berlebih.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-amber-200/60 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-amber-700" />
              </div>
              <h5 className="font-display font-bold text-base text-stone-900">
                2. Kustomisasi Sepenuh Hati (Kustome)
              </h5>
              <p className="text-xs text-stone-600 leading-relaxed">
                Kata "Kustome Cake" bukan sekadar nama, melainkan janji. Kami mewujudkan kue impian mulai dari rasa brownies, aneka drizzle saus, pesan personal tulisan tangan, hingga ornamen perayaan ulang tahun dan pernikahan.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-amber-200/60 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-700" />
              </div>
              <h5 className="font-display font-bold text-base text-stone-900">
                3. Selalu Fresh Dipanggang Pagi Hari
              </h5>
              <p className="text-xs text-stone-600 leading-relaxed">
                Tidak ada kue atau brownies dingin sisa kemarin. Tim baker kami menyalakan oven mulai pukul 06.00 pagi setiap hari agar setiap pesanan sampai dalam kondisi prima dan hangat.
              </p>
            </div>

          </div>
        </div>

        {/* Milestone Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
          <div className="p-5 bg-white rounded-2xl border border-amber-100 shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-amber-900">6+ Tahun</div>
            <div className="text-xs text-stone-500 mt-1">Menemani Momen Manis</div>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-amber-100 shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-amber-900">18.000+</div>
            <div className="text-xs text-stone-500 mt-1">Loyang Brownies & Cake Terkirim</div>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-amber-100 shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-amber-900">100%</div>
            <div className="text-xs text-stone-500 mt-1">Bahan Pilihan Tanpa Pengawet</div>
          </div>
          <div className="p-5 bg-white rounded-2xl border border-amber-100 shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-amber-900">4.9 / 5.0</div>
            <div className="text-xs text-stone-500 mt-1">Tingkat Kepuasan Pelanggan</div>
          </div>
        </div>

      </div>
    </section>
  );
};
