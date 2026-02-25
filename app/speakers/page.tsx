"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import speakersData from "@/data/speakers.json";

function SpeakerCard({ speaker, index }: { speaker: typeof speakersData[0]; index: number }) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div
            className="group flex flex-col items-center text-center"
            style={{ animationDelay: `${index * 40}ms` }}
        >
            {/* Photo container */}
            <div className="relative rounded-xl overflow-hidden w-full aspect-square mb-3 bg-gray-200 border border-gray-200 shadow-sm group-hover:shadow-lg transition-all duration-300">

                {/* Shimmer skeleton */}
                {!loaded && (
                    <div className="absolute inset-0 shimmer rounded-xl" />
                )}

                <img
                    alt={speaker.name}
                    src={speaker.image}
                    className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105"
                    style={{
                        opacity: loaded ? 1 : 0,
                        transform: loaded ? "scale(1)" : "scale(1.04)",
                        transition: "opacity 0.6s ease, transform 0.6s ease",
                    }}
                    onLoad={() => setLoaded(true)}
                    onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(speaker.name)}&background=8B1A1A&color=fff&size=400&font-size=0.33`;
                        setLoaded(true);
                    }}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-3 pointer-events-none">
                    <p className="text-white text-xs font-medium leading-tight translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        {speaker.affiliation}
                    </p>
                </div>
            </div>

            {/* Name */}
            <h3 className="text-sm font-bold text-gray-900 font-display leading-tight mb-1">
                {speaker.name}
            </h3>
            {/* Affiliation */}
            <p className="text-xs text-primary font-medium leading-tight line-clamp-2">
                {speaker.affiliation}
            </p>
        </div>
    );
}

export default function SpeakersPage() {
    return (
        <div className="relative flex min-h-screen w-full flex-col bg-gray-50 text-gray-900 font-sans">
            <style>{`
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .shimmer {
          background: linear-gradient(
            90deg,
            #e5e7eb 25%,
            #f3f4f6 50%,
            #e5e7eb 75%
          );
          background-size: 800px 100%;
          animation: shimmer 1.4s infinite linear;
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .speaker-card-enter {
          opacity: 0;
          animation: fadeSlideUp 0.5s ease forwards;
        }
      `}</style>

            <Header />

            <main className="flex-grow">
                {/* Page Header */}
                <section className="bg-white border-b border-gray-200 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <span className="h-px w-8 bg-primary"></span>
                            <span className="text-primary font-bold text-sm uppercase tracking-wider">PLASMA 2025</span>
                            <span className="h-px w-8 bg-primary"></span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 font-display mb-4">
                            Distinguished Speakers
                        </h1>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                            Leading voices in Plasma Physics who graced the 40th PSSI National Symposium.
                        </p>
                    </div>
                </section>

                {/* Speakers Grid */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {speakersData.map((speaker, index) => (
                                <div
                                    key={speaker.id}
                                    className="speaker-card-enter"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <SpeakerCard speaker={speaker} index={index} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
