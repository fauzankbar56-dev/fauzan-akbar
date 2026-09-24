import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, ShoppingBag, Volume2, VolumeX, Play, Pause, Award, Flame, ShieldCheck, Heart } from 'lucide-react';
import { HERO_VIDEO_URL } from '../data/bakeryData';

interface HeroProps {
  onOrderNow: () => void;
  onOpenBoxBuilder: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNow, onOpenBoxBuilder }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Ensure muted autoplay succeeds in all browsers
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/70 via-orange-50/30 to-amber-50/50 py-10 lg:py-16">
      {/* Delicate warm bakery background accents (NOT black, fully bright and warm) */}
      <div className="absolute top-0 right-10 -z-10 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -z-10 w-96 h-96 bg-orange-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Brand Story & Call-to-Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-6">
            
            {/* Live Oven Batch pill */}
            <div className="inline-flex items-center gap-2 bg-amber-100/90 text-amber-900 border border-amber-300/70 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide w-fit shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block"></span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 -ml-3.5 inline-block"></span>
              <Flame className="w-3.5 h-3.5 text-amber-700 ml-1" />
              <span>FRESH FROM OVEN • BATCH PAGI SIAP DIKIRIM</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.14]">
                Katumbiri Kustome Cake <br />
                <span className="text-amber-800 underline decoration-amber-400 decoration-wavy decoration-from-font">
                  Brownies Fudgy Lumer
                </span>
              </h1>
              
              <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-xl">
                Dipanggang segar dengan 70% Callebaut cocoa Belgia dan mentega murni. 
                Nikmati perpaduan lapisan atas <em>shiny crinkly crust</em> yang renyah dan bagian dalam yang super lembut, lumer, serta aneka pilihan custom cake untuk setiap perayaan spesialmu.
              </p>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <button
                onClick={onOrderNow}
                id="hero-order-brownies-button"
                className="flex items-center justify-center gap-2.5 bg-amber-800 hover:bg-amber-900 text-amber-50 px-7 py-3.5 rounded-2xl font-bold text-base shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 text-amber-300" />
                <span>Pesan Brownies Hangat</span>
              </button>

              <button
                onClick={onOpenBoxBuilder}
                id="hero-build-box-button"
                className="flex items-center justify-center gap-2 bg-white hover:bg-amber-50 text-amber-900 border-2 border-amber-300 px-6 py-3.5 rounded-2xl font-bold text-base shadow-xs hover:border-amber-400 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-amber-600" />
                <span>Kustom Box Pilihanmu</span>
              </button>
            </div>

            {/* Quality Badges */}
            <div className="pt-4 border-t border-amber-200/60 grid grid-cols-3 gap-3">
              <div className="flex items-center gap-2 text-stone-700">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-800">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">70% Callebaut</div>
                  <div className="text-[11px] text-stone-500">Cokelat Belgia Asli</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-stone-700">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-800">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">Oven 06.00 Pagi</div>
                  <div className="text-[11px] text-stone-500">Selalu Fresh Oven</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-stone-700">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 text-amber-800">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">Kustome Cake</div>
                  <div className="text-[11px] text-stone-500">Desain Sesuai Ceritamu</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: VIDEO SHOWCASE (100% visible, NO black overlay, muted in loop) */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Outer decorative bakery frame */}
              <div className="relative rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-amber-200/80 via-amber-100 to-orange-100 shadow-2xl border border-amber-300/80">
                
                {/* VIDEO CONTAINER: NO BLACK OVERLAY LAYER. Video is completely visible! */}
                <div className="relative aspect-4/3 sm:aspect-16/10 rounded-2xl overflow-hidden bg-amber-50">
                  
                  <video
                    ref={videoRef}
                    src={HERO_VIDEO_URL}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    onLoadedData={() => setVideoLoaded(true)}
                    className="w-full h-full object-cover rounded-2xl transition-all duration-300"
                    title="Brownies berputar di mangkuk - Katumbiri Kustome Cake"
                  />

                  {/* Video Loading Skeleton until video is ready */}
                  {!videoLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-amber-100/60 animate-pulse text-amber-900">
                      <Flame className="w-10 h-10 animate-bounce mb-2 text-amber-700" />
                      <span className="text-sm font-semibold">Memuat Brownies Katumbiri...</span>
                    </div>
                  )}

                  {/* Floating Top Badge (Light & Crisp, does not obscure the video) */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-amber-950 shadow-md border border-amber-200">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    <span>LIVE OVEN</span>
                    <span className="text-stone-400">|</span>
                    <span className="text-amber-800 font-medium">Brownies Bowl Katumbiri</span>
                  </div>

                  {/* Interactive controls bar on bottom right (Unobtrusive) */}
                  <div className="absolute bottom-3.5 right-3.5 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-amber-200 text-stone-700">
                    <button
                      onClick={togglePlay}
                      className="p-1.5 hover:text-amber-800 transition-colors cursor-pointer"
                      title={isPlaying ? "Jeda video" : "Putar video"}
                      aria-label={isPlaying ? "Jeda video" : "Putar video"}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    
                    <span className="w-px h-4 bg-amber-200"></span>

                    <button
                      onClick={toggleMute}
                      className="p-1.5 hover:text-amber-800 transition-colors flex items-center gap-1.5 cursor-pointer text-xs font-semibold"
                      title={isMuted ? "Aktifkan suara" : "Bisukan suara"}
                      aria-label={isMuted ? "Aktifkan suara" : "Bisukan suara"}
                    >
                      {isMuted ? (
                        <>
                          <VolumeX className="w-4 h-4 text-stone-500" />
                          <span className="text-[11px] text-stone-500">Muted</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4 text-amber-700" />
                          <span className="text-[11px] text-amber-800">Suara Aktif</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Gentle bottom-left taste tag */}
                  <div className="absolute bottom-3.5 left-3.5 hidden sm:flex items-center gap-1.5 bg-amber-950/85 backdrop-blur-md text-amber-100 px-3 py-1.5 rounded-full text-xs font-medium shadow-md">
                    <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                    <span>Fudgy, crinkly crust & lumer</span>
                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
