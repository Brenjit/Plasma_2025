"use client";

import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import siteConfig from "@/data/site.config.json";
import speakersData from "@/data/speakers.json";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root bg-gray-50 text-gray-900 font-sans">
      <Header />

      <main className="flex-grow flex flex-col">
        {/* Hero Section - Full Width */}
        <section className="relative w-full lg:h-[60vh] lg:min-h-[500px]">
          <div className="relative overflow-hidden bg-[#2a0a0a] text-white shadow-2xl h-full flex items-center">
            {/* Hero Image Slider */}
            <div className="absolute inset-0 z-0">
              <HeroSlider />
              {/* Subtle Gradient from Left to Right */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#2a0a0a]/90 via-[#2a0a0a]/40 to-transparent pointer-events-none"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-start justify-center px-6 py-20 sm:px-12 lg:px-16 lg:py-0 max-w-7xl mx-auto w-full">

              <div className="mb-4 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary backdrop-blur-sm border border-white/10">
                Official Symposium
              </div>
              <h1 className="mb-2 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-white font-display uppercase">
                PLASMA 2025
              </h1>
              <p className="mb-2 max-w-3xl text-xl sm:text-2xl text-gray-100 font-medium">
                40th PSSI National Symposium on Plasma Science & Technology
              </p>
              <p className="mb-6 text-lg sm:text-xl text-secondary font-display italic tracking-wide">
                For Sustainable Future
              </p>
              <p className="mb-8 max-w-2xl text-lg text-gray-300 sm:text-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">calendar_month</span>
                Dec 27 - 29, 2025
                <span className="mx-2 text-gray-500">|</span>
                <span className="material-symbols-outlined text-secondary">location_on</span>
                IIT Tirupati
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/proceedings">
                  <button className="bg-primary hover:bg-primary-dark text-white text-base font-bold h-12 px-8 rounded-lg transition-all duration-200 shadow-lg shadow-primary/30 flex items-center gap-2">
                    <span className="material-symbols-outlined">article</span>
                    View Proceedings
                  </button>
                </Link>
                <Link href="#speakers">
                  <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-base font-bold h-12 px-8 rounded-lg transition-all duration-200 backdrop-blur-sm flex items-center gap-2">
                    <span className="material-symbols-outlined">group</span>
                    View Speakers
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Delegates", value: "500+" },
                { label: "Keynote Speakers", value: "40+" },
                { label: "Technical Sessions", value: "100+" },
                { label: "Sponsors", value: "20+" },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-1 items-start hover:border-primary/50 transition-colors">
                  <span className="text-primary text-4xl font-bold tracking-tight font-display">{stat.value}</span>
                  <span className="text-gray-600 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
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
                  We extend our heartfelt gratitude to the <strong>500+ delegates, 40+ keynote speakers, and 20+ sponsors</strong> who made Plasma 2025 a resounding success.
                </p>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  The symposium featured over <strong>100 technical sessions</strong> covering breakthroughs in fusion energy, space plasma, and sustainable technologies, fostering invaluable collaborations for the future.
                </p>
                <Link href="/about">
                  <button className="group w-fit flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors">
                    Read Chairman's Message
                    <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </button>
                </Link>
              </div>

              {/* Right: Logos Grid */}
              <div className="lg:w-7/12 flex items-center justify-center">
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm w-full">
                  <h3 className="text-center text-gray-500 font-medium uppercase tracking-widest mb-8 text-sm">Organized By</h3>
                  <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    <img
                      src="/logos/pssi.png"
                      alt="PSSI"
                      className="h-20 w-auto object-contain hover:scale-105 transition-transform duration-300"
                    />
                    <div className="h-12 w-px bg-gray-200 hidden sm:block"></div>
                    <img
                      src="/logos/iit-tirupati.png"
                      alt="IIT Tirupati"
                      className="h-20 w-auto object-contain hover:scale-105 transition-transform duration-300"
                    />
                    <div className="h-12 w-px bg-gray-200 hidden sm:block"></div>
                    <img
                      src="/logos/iiser-tirupati.png"
                      alt="IISER Tirupati"
                      className="h-20 w-auto object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Proceedings and Gallery Section */}
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 font-display text-center">
              Event Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Proceedings Card */}
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-3xl">article</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-display">Conference Proceedings</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Access the full collection of abstract books and technical papers presented at Plasma 2025.
                </p>
                <Link href="/proceedings">
                  <button className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
                    View Proceedings
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </button>
                </Link>
              </div>

              {/* Gallery Card */}
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-3xl">photo_library</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 font-display">Event Gallery</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Explore the visual highlights of the symposium, including technical sessions and cultural events.
                </p>
                <Link href="/gallery">
                  <button className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
                    View Gallery
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Speakers Section - Horizontal Scroll */}
        <section id="speakers" className="py-16 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 font-display">Distinguished Speakers</h2>
                <p className="text-gray-500 mt-2">Leading voices in Plasma Physics who graced the occasion.</p>
              </div>
              <Link href="/proceedings" className="hidden sm:flex items-center text-primary font-semibold hover:underline">
                View All Speakers
                <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
              </Link>
            </div>

            <div className="flex overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory gap-6 no-scrollbar">
              {speakersData.map((speaker, index) => (
                <div key={speaker.id} className="snap-start shrink-0 w-64 md:w-72">
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
                      <p className="text-white text-sm font-medium">{speaker.role}</p>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 font-display">{speaker.name}</h3>
                  <p className="text-sm text-primary font-medium mb-1">{speaker.role.split(':')[0]}</p>
                  <p className="text-sm text-gray-500 line-clamp-1">{speaker.affiliation}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sponsors Section */}
        <section id="sponsors" className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">Sponsored By</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-70 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0">
              {/* Real Logos */}
              <img src="/logos/pssi.png" alt="PSSI" className="h-16 w-auto object-contain mix-blend-multiply" />
              <img src="/logos/iit-tirupati.png" alt="IIT Tirupati" className="h-16 w-auto object-contain mix-blend-multiply" />
              <img src="/logos/iiser-tirupati.png" alt="IISER Tirupati" className="h-16 w-auto object-contain mix-blend-multiply" />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
