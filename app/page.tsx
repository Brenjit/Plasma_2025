"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import HeroSlider from "@/components/HeroSlider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import siteConfig from "@/data/site.config.json";
import speakersData from "@/data/speakers.json";

function CountUp({ target, suffix = "", duration = 3000, delay = 500 }: { target: number; suffix?: string; duration?: number; delay?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Delay the start slightly so the user sees it begin after the page paints
          setTimeout(() => setStarted(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);

      // easeOutExpo: incredibly fast start, very drawn-out creeping finish
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCount(Math.floor(eased * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  const [sponsorsVisible, setSponsorsVisible] = useState(false);
  const sponsorsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSponsorsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sponsorsRef.current) {
      observer.observe(sponsorsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root bg-gray-50 text-gray-900 font-sans">
      <Header />

      <main className="flex-grow flex flex-col">
        {/* Hero Section — Split layout with blurred bg */}
        <section className="relative w-full overflow-hidden">

          {/* Blurred background slider — same photos, soft behind everything */}
          <div className="absolute inset-0 z-0 scale-110">
            <HeroSlider isBackground={true} />
          </div>
          {/* Dark gradient overlay over the background */}
          <div className="absolute inset-0 z-0 backdrop-blur-sm bg-black/5 bg-gradient-to-br from-black/80 via-[#1a0505]/70 to-black/50" />

          {/* Foreground content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-10 py-14 lg:py-20">

              {/* Left — Text content */}
              <div className="flex-1 flex flex-col items-start justify-center text-white order-2 lg:order-1">
                <div className="mb-4 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary backdrop-blur-sm border border-white/10">
                  Official Archive
                </div>
                <h1 className="mb-2 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-white font-display uppercase">
                  PLASMA 2025
                </h1>
                <p className="mb-2 text-xl sm:text-2xl text-gray-100 font-medium">
                  40th PSSI National Symposium on Plasma Science & Technology
                </p>
                <p className="mb-5 text-lg sm:text-xl text-secondary font-display italic tracking-wide">
                  For Sustainable Future
                </p>
                <p className="mb-8 text-lg text-gray-300 flex items-center gap-2 flex-wrap">
                  <span className="material-symbols-outlined text-secondary">calendar_month</span>
                  Dec 27 - 29, 2025
                  <span className="mx-2 text-gray-500">|</span>
                  <span className="material-symbols-outlined text-secondary">location_on</span>
                  IIT Tirupati
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/proceedings">
                    <button className="bg-primary hover:bg-primary-dark text-white text-base font-bold h-12 px-8 rounded-lg transition-all duration-200 animate-glow-primary flex items-center gap-2">
                      <span className="material-symbols-outlined">article</span>
                      View Proceedings
                    </button>
                  </Link>
                  <Link href="/gallery">
                    <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-base font-bold h-12 px-8 rounded-lg transition-all duration-200 backdrop-blur-sm animate-glow-white flex items-center gap-2">
                      <span className="material-symbols-outlined">photo_library</span>
                      View Gallery
                    </button>
                  </Link>
                </div>
              </div>

              {/* Right — Sharp card slider */}
              <div className="w-full lg:w-[52%] order-1 lg:order-2 flex-shrink-0">
                <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/10" style={{ aspectRatio: "16/10" }}>
                  <HeroSlider isBackground={false} />
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* Stats Grid */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Delegates", target: 400, suffix: "+" },
                { label: "Keynote Speakers", target: 40, suffix: "+" },
                { label: "Technical Sessions", target: 100, suffix: "+" },
                { label: "Sponsors", target: 20, suffix: "+" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-1 items-start hover:border-primary/50 transition-all duration-300 hover:shadow-md"
                  style={{ animation: `fadeSlideUp 0.5s ease ${i * 100}ms both` }}
                >
                  <span className="text-primary text-4xl font-bold tracking-tight font-display">
                    <CountUp target={stat.target} suffix={stat.suffix} />
                  </span>
                  <span className="text-gray-600 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @keyframes fadeSlideUp {
              from { opacity: 0; transform: translateY(20px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </section>

        {/* Welcome & Features - Split Layout */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-16">
              {/* Left: Welcome Message */}
              <div className="lg:w-5/12 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="h-px w-8 bg-primary"></span>
                  <span className="text-primary font-bold text-sm uppercase tracking-wider">From the Organizers</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight font-display">
                  Thank You for a Grand Success
                </h2>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                  We extend our heartfelt gratitude to the <strong>400+ delegates, 40+ keynote speakers, and 20+ sponsors</strong> who made Plasma 2025 a resounding success.
                </p>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  The symposium featured over <strong>100 technical sessions</strong> covering breakthroughs in fusion energy, space plasma, and sustainable technologies, fostering invaluable collaborations for the future.
                </p>
                <Link href="/about" className="block mb-4">
                  <button className="group w-fit flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors">
                    Read Conveners' Messages
                    <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </button>
                </Link>

                {/* Conveners Section */}
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <h3 className="text-xl font-bold text-gray-900 font-display uppercase tracking-wider mb-6 flex items-center gap-3">
                    <span className="w-8 h-px bg-primary"></span>
                    Conveners
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="flex flex-col items-start group">
                      <div className="w-24 h-24 rounded-full overflow-hidden mb-3 shadow-md border-2 border-primary/10 group-hover:border-primary/30 transition-colors">
                        <img src="/Conveners/Reetesh.png" alt="Dr. Reetesh K. Gangwar" className="w-full h-full object-cover object-top" />
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 font-display">Dr. Reetesh K. Gangwar</h4>
                      <p className="text-gray-600 text-xs font-medium">Associate Professor</p>
                      <p className="text-primary text-[10px] font-bold uppercase tracking-wider mt-1">Physics, IIT Tirupati</p>
                    </div>

                    <div className="flex flex-col items-start group">
                      <div className="w-24 h-24 rounded-full overflow-hidden mb-3 shadow-md border-2 border-primary/10 group-hover:border-primary/30 transition-colors">
                        <img src="/Conveners/Shihabudhee.png" alt="Prof. Shihabudheen M. Maliyekkal" className="w-full h-full object-cover object-top" />
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 font-display">Prof. Shihabudheen</h4>
                      <p className="text-gray-600 text-xs font-medium">Professor</p>
                      <p className="text-primary text-[10px] font-bold uppercase tracking-wider mt-1">CEE, IIT Tirupati</p>
                    </div>

                    <div className="flex flex-col items-start group">
                      <div className="w-24 h-24 rounded-full overflow-hidden mb-3 shadow-md border-2 border-primary/10 group-hover:border-primary/30 transition-colors">
                        <img src="/Conveners/Sunil.png" alt="Dr. S. Sunil Kumar" className="w-full h-full object-cover object-top" />
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 font-display">Dr. S. Sunil Kumar</h4>
                      <p className="text-gray-600 text-xs font-medium">Associate Professor</p>
                      <p className="text-primary text-[10px] font-bold uppercase tracking-wider mt-1">Physics, IISER Tirupati</p>
                    </div>
                  </div>
                </div>
                
                <Link href="/about#nac-sac" className="block mt-8 mb-2">
                  <button className="group w-fit flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors">
                    Click here to see National and Scientific Advisory Committee
                    <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </button>
                </Link>
              </div>

              {/* Right: Sponsors tiered showcase */}
              <div ref={sponsorsRef} className="lg:w-7/12 flex items-center justify-center">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm w-full space-y-6 lg:space-y-8">
                  <h3 className="text-center text-gray-500 font-medium uppercase tracking-widest text-sm mb-2">Our Sponsors</h3>

                  {/* Title Sponsor — largest */}
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 text-center mb-3">Title Sponsor</p>
                    <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-8">
                      <img src="/sponsors/AtosLogofinal_edited.png" alt="ATOS" className={`h-16 sm:h-20 w-auto object-contain hover:scale-105 transition-all duration-700 ease-out delay-[100ms] ${sponsorsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} />
                      <img src="/sponsors/Ozone_crop.jpeg" alt="OCIPL" className={`h-32 sm:h-40 w-auto object-contain hover:scale-105 transition-all duration-700 ease-out delay-[200ms] ${sponsorsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} />
                    </div>
                  </div>

                  <div className="border-t border-gray-100" />

                  {/* Diamond + Platinum — large */}
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 text-center mb-3">Diamond / Platinum</p>
                    <div className="flex flex-wrap justify-center items-center gap-5 lg:gap-8">
                      <img src="/sponsors/ANRF_Anushandhan.jpeg" alt="ANRF" className={`h-14 sm:h-16 w-auto object-contain hover:scale-105 transition-all duration-700 ease-out delay-[300ms] ${sponsorsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} />
                      <img src="/sponsors/BRNS.jpeg" alt="BRNS" className={`h-14 sm:h-16 w-auto object-contain hover:scale-105 transition-all duration-700 ease-out delay-[400ms] ${sponsorsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} />
                      <img src="/sponsors/Simco high definition.png" alt="SIMCO" className={`h-14 sm:h-16 w-auto object-contain hover:scale-105 transition-all duration-700 ease-out delay-[500ms] ${sponsorsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} />
                      <img src="/sponsors/brunker.svg" alt="Bruker" className={`h-14 sm:h-16 w-auto object-contain hover:scale-105 transition-all duration-700 ease-out delay-[600ms] ${sponsorsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} />
                    </div>
                  </div>

                  <div className="border-t border-gray-100" />

                  {/* Gold — medium */}
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 text-center mb-3">Gold Sponsors</p>
                    <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-6">
                      <img src="/sponsors/ELTECH LOGO (1).png" alt="Eltech" className={`h-10 sm:h-12 w-auto object-contain hover:scale-105 transition-all duration-700 ease-out delay-[700ms] ${sponsorsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} />
                      <img src="/sponsors/PSSI.png" alt="PSSI" className={`h-10 sm:h-12 w-auto object-contain hover:scale-105 transition-all duration-700 ease-out delay-[800ms] ${sponsorsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} />
                      <img src="/sponsors/ASPL_FUSION.jpg" alt="ASPL Fusion" className={`h-10 sm:h-12 w-auto object-contain hover:scale-105 transition-all duration-700 ease-out delay-[900ms] ${sponsorsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} />
                      <img src="/sponsors/Deepam Biotek.png" alt="Deepam Biotek" className={`h-10 sm:h-12 w-auto object-contain hover:scale-105 transition-all duration-700 ease-out delay-[1000ms] ${sponsorsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} />
                    </div>
                  </div>

                  <div className="border-t border-gray-100" />

                  {/* Silver / Bronze / Others — small */}
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 text-center mb-3">Silver · Bronze · Others</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6 justify-items-center items-center">
                      <img src="/sponsors/swan-scientific-logo.png" alt="Swan Scientific" className={`h-8 sm:h-10 w-auto object-contain hover:scale-105 transition-all duration-700 ease-out delay-[1100ms] ${sponsorsVisible ? 'opacity-80 hover:opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} />
                      <img src="/sponsors/LASER_Science.png" alt="Laser Science" className={`h-8 sm:h-10 w-auto object-contain hover:scale-105 transition-all duration-700 ease-out delay-[1200ms] ${sponsorsVisible ? 'opacity-80 hover:opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} />
                      <img src="/sponsors/Pfeiffer.png" alt="Pfeiffer" className={`h-8 sm:h-10 w-auto object-contain hover:scale-105 transition-all duration-700 ease-out delay-[1300ms] ${sponsorsVisible ? 'opacity-80 hover:opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} />
                      <img src="/sponsors/PerkinElmer SWP Full Color.jpg" alt="PerkinElmer" className={`h-8 sm:h-10 w-auto object-contain hover:scale-105 transition-all duration-700 ease-out delay-[1400ms] ${sponsorsVisible ? 'opacity-80 hover:opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} />
                      <img src="/sponsors/DRDO.png" alt="DRDO" className={`h-8 sm:h-10 w-auto object-contain hover:scale-105 transition-all duration-700 ease-out delay-[1500ms] ${sponsorsVisible ? 'opacity-80 hover:opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} />
                      <img src="/sponsors/comsol-logo-130x20.png" alt="COMSOL" className={`h-8 sm:h-10 w-auto object-contain hover:scale-105 transition-all duration-700 ease-out delay-[1600ms] ${sponsorsVisible ? 'opacity-80 hover:opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} />
                      <img src="/sponsors/IOP_publishing.png" alt="IOP Publishing" className={`h-8 sm:h-10 w-auto object-contain hover:scale-105 transition-all duration-700 ease-out delay-[1700ms] ${sponsorsVisible ? 'opacity-80 hover:opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} />
                      <img src="/sponsors/Power Beam Society.png" alt="Power Beam" className={`h-8 sm:h-10 w-auto object-contain hover:scale-105 transition-all duration-700 ease-out delay-[1800ms] ${sponsorsVisible ? 'opacity-80 hover:opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Proceedings and Gallery Section */}
        <section className="py-16 bg-gray-50 border-t border-gray-200" >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 font-display text-center">
              Event Highlights
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* ── Proceedings Card ── */}
              <Link href="/proceedings" className="group relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 bg-white flex flex-col cursor-pointer">
                {/* Photo collage — asymmetric magazine layout */}
                <div className="relative h-64 flex gap-0.5 overflow-hidden flex-shrink-0">

                  {/* Left column — tall portrait spanning full height */}
                  <div className="w-[45%] overflow-hidden flex-shrink-0">
                    <img
                      src="/home_proceeding_collage/DSC_2273.jpg"
                      alt="Conference"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Middle column — wide landscape stacked above a short strip */}
                  <div className="flex-1 flex flex-col gap-0.5">
                    <div className="flex-[2] overflow-hidden">
                      <img
                        src="/home_proceeding_collage/DSC_2551.jpg"
                        alt="Conference"
                        className="w-full h-full object-cover transition-transform duration-700 delay-75 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-[1] overflow-hidden">
                      <img
                        src="/home_proceeding_collage/DSC_2566.jpg"
                        alt="Conference"
                        className="w-full h-full object-cover transition-transform duration-700 delay-150 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Right narrow column — a single tall sliver */}
                  <div className="w-[18%] overflow-hidden flex-shrink-0">
                    <img
                      src="/home_proceeding_collage/DSC_2800.jpg"
                      alt="Conference"
                      className="w-full h-full object-cover object-center transition-transform duration-700 delay-200 group-hover:scale-105"
                    />
                  </div>

                  {/* Dark overlay + badge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4">
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Proceedings</span>
                  </div>
                </div>

                {/* Text content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <span className="material-symbols-outlined text-2xl">article</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">Conference Proceedings</h3>
                  <p className="text-gray-600 leading-relaxed text-sm flex-grow">
                    Access the full collection of abstract books and technical papers presented at Plasma 2025.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                    View Proceedings
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </span>
                </div>
              </Link>

              {/* ── Gallery Card ── */}
              <Link href="/gallery" className="group relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 bg-white flex flex-col cursor-pointer">
                {/* 4-photo mosaic */}
                <div className="relative h-56 grid grid-cols-2 grid-rows-2 gap-0.5 overflow-hidden flex-shrink-0">
                  <div className="overflow-hidden">
                    <img
                      src="https://lh3.googleusercontent.com/d/1q_RNKE0I5fRRoiQKNsZgFq-fvTUDc3hr"
                      alt="Gallery Day 2"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <img
                      src="https://lh3.googleusercontent.com/d/1UT0OAqULY4jz9nDXgvRncvt9LRpEbjM3"
                      alt="Gallery Day 2"
                      className="w-full h-full object-cover transition-transform duration-700 delay-75 group-hover:scale-110"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <img
                      src="https://lh3.googleusercontent.com/d/1lGIfkwWL_w03gbLFUg8Ky6ly6M-BBqbi"
                      alt="Gallery Day 3"
                      className="w-full h-full object-cover transition-transform duration-700 delay-150 group-hover:scale-110"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <img
                      src="https://lh3.googleusercontent.com/d/1w0is6gzH0alTTjgrwtXHn7XWEnowZ_7h"
                      alt="Gallery Day 1"
                      className="w-full h-full object-cover transition-transform duration-700 delay-100 group-hover:scale-110"
                    />
                  </div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30">Day 1 · Day 2 · Day 3</span>
                  </div>
                </div>

                {/* Text content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <span className="material-symbols-outlined text-2xl">photo_library</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">Event Gallery</h3>
                  <p className="text-gray-600 leading-relaxed text-sm flex-grow">
                    Explore the visual highlights of the symposium — technical sessions, keynote addresses, and cultural evenings across 3 days.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                    View Gallery
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </span>
                </div>
              </Link>

            </div>
          </div>
        </section>

        {/* Media Coverage Section */}
        <section className="py-20 relative overflow-hidden bg-white">
          {/* Subtle background gradient & patterns */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none"></div>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl mix-blend-multiply pointer-events-none"></div>
          <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl mix-blend-multiply pointer-events-none"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-secondary font-bold text-sm uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full mb-3 inline-block"></span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-display">
                Media Coverage
              </h2>
              <div className="mx-auto w-[240px] max-w-[60%] h-[5px] mt-6 bg-primary rounded-full"></div>
            </div>

            <div className="flex justify-center">
              <div className="relative rounded-2xl overflow-hidden bg-white p-2 shadow-2xl ring-1 ring-gray-900/5 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 max-w-5xl group">
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/10 rounded-2xl transition-colors pointer-events-none z-10"></div>

                <img
                  src="/images/News_report.png"
                  alt="Plasma 2025 paper Report"
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Speakers Section - Horizontal Scroll */}
        <section id="speakers" className="py-16 bg-gray-50 border-t border-gray-200" >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 font-display">Distinguished Speakers</h2>
                <p className="text-gray-500 mt-2">Leading voices in Plasma Physics who graced the occasion.</p>
              </div>
              <Link href="/speakers" className="hidden sm:flex items-center text-primary font-semibold hover:underline">
                View All Speakers
                <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
              </Link>
            </div>

            <div className="flex overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory gap-6 no-scrollbar">
              {speakersData.map((speaker, index) => (
                <div key={speaker.id} className="snap-start shrink-0 w-40 md:w-48">
                  <div className="group relative rounded-xl overflow-hidden aspect-[4/5] mb-4 bg-gray-100 border border-gray-100">
                    <img
                      alt={speaker.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={speaker.image}
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/300x400?text=Speaker";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <p className="text-white text-sm font-medium">{speaker.affiliation}</p>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 font-display">{speaker.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-1">{speaker.affiliation}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
