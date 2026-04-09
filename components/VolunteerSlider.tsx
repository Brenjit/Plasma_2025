"use client";

import { useState, useEffect } from "react";

const images = [
    "/Volunteers/Plasma_2025_committes_page-0001.jpg",
    "/Volunteers/Plasma_2025_committes_page-0002.jpg",
    "/Volunteers/Plasma_2025_committes_page-0003.jpg",
    "/Volunteers/Plasma_2025_committes_page-0004.jpg",
    "/Volunteers/Plasma_2025_committes_page-0005.jpg",
    "/Volunteers/Plasma_2025_committes_page-0006.jpg",
];

export default function VolunteerSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 8000); // 8 seconds per slide
        return () => clearInterval(interval);
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    return (
        <div className="relative w-full overflow-hidden rounded-xl bg-white group shadow-inner">
            <div className="relative aspect-video w-full">
                {images.map((img, index) => (
                    <div
                        key={img}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <img
                            src={img}
                            alt={`Volunteer/Committee List ${index + 1}`}
                            className="w-full h-full object-contain"
                        />
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <div className="absolute inset-y-0 left-0 flex items-center p-2">
                <button
                    onClick={prevSlide}
                    className="p-2 rounded-full bg-black/10 hover:bg-black/20 text-gray-800 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                >
                    <span className="material-symbols-outlined text-4xl">chevron_left</span>
                </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center p-2">
                <button
                    onClick={nextSlide}
                    className="p-2 rounded-full bg-black/10 hover:bg-black/20 text-gray-800 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                >
                    <span className="material-symbols-outlined text-4xl">chevron_right</span>
                </button>
            </div>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentIndex ? "bg-primary w-6" : "bg-gray-300"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
