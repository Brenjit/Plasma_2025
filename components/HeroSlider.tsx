"use client";

import { useState, useEffect } from "react";

export default function HeroSlider() {
    const [images, setImages] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetch("/api/slider-images")
            .then((res) => res.json())
            .then((data) => {
                if (data.images && data.images.length > 0) {
                    setImages(data.images);
                }
            })
            .catch((err) => console.error("Failed to load slider images", err));
    }, []);

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000); // 5 seconds per slide
        return () => clearInterval(interval);
    }, [images]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    if (images.length === 0) {
        return (
            <img
                src="/images/hero.png"
                alt="Hero Fallback"
                className="w-full h-full object-cover opacity-60 mix-blend-overlay"
            />
        );
    }

    return (
        <div className="absolute inset-0 z-0 overflow-hidden group">
            {images.map((img, index) => (
                <div
                    key={img}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <img
                        src={img}
                        alt={`Slide ${index + 1}`}
                        className={`w-full h-full object-cover ${index === currentIndex ? "animate-slow-zoom" : ""}`}
                    />
                </div>
            ))}

            {/* Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50 backdrop-blur-sm z-20"
                    >
                        <span className="material-symbols-outlined text-3xl">chevron_left</span>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50 backdrop-blur-sm z-20"
                    >
                        <span className="material-symbols-outlined text-3xl">chevron_right</span>
                    </button>
                </>
            )}
        </div>
    );
}
