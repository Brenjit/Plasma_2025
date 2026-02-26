"use client";

import { useState, useEffect } from "react";

// Global state to sync multiple slider instances
let globalImages: string[] = [];
let globalCurrentIndex = 0;
let globalImagesLoaded = false;
let globalIntervalStarted = false;

interface HeroSliderProps {
    isBackground?: boolean;
}

export default function HeroSlider({ isBackground = false }: HeroSliderProps) {
    const [images, setImages] = useState<string[]>(globalImages);
    const [currentIndex, setCurrentIndex] = useState(globalCurrentIndex);

    // Fetch images once globally
    useEffect(() => {
        if (!globalImagesLoaded) {
            globalImagesLoaded = true;
            fetch("/api/slider-images")
                .then((res) => res.json())
                .then((data) => {
                    if (data.images && data.images.length > 0) {
                        globalImages = data.images;
                        // Dispatch event for all instances
                        window.dispatchEvent(new CustomEvent("slider-images-loaded"));
                    }
                })
                .catch((err) => console.error("Failed to load slider images", err));
        }

        const handleImagesLoaded = () => setImages(globalImages);
        window.addEventListener("slider-images-loaded", handleImagesLoaded);

        // Initial set in case it loaded before this component mounted
        if (globalImages.length > 0) setImages(globalImages);

        return () => window.removeEventListener("slider-images-loaded", handleImagesLoaded);
    }, []);

    // Sync interval globally
    useEffect(() => {
        if (images.length <= 1) return;

        // Only the main (foreground) slider controls the interval to avoid double-ticks
        if (!isBackground && !globalIntervalStarted) {
            globalIntervalStarted = true;
            const interval = setInterval(() => {
                globalCurrentIndex = (globalCurrentIndex + 1) % globalImages.length;
                window.dispatchEvent(new CustomEvent("slider-index-changed", { detail: globalCurrentIndex }));
            }, 5000); // 5 seconds per slide

            return () => {
                clearInterval(interval);
                globalIntervalStarted = false;
            };
        }
    }, [images, isBackground]);

    // Listen for index changes
    useEffect(() => {
        const handleIndexChanged = (e: any) => setCurrentIndex(e.detail);
        window.addEventListener("slider-index-changed", handleIndexChanged);
        return () => window.removeEventListener("slider-index-changed", handleIndexChanged);
    }, []);

    const prevSlide = () => {
        globalCurrentIndex = (globalCurrentIndex - 1 + images.length) % images.length;
        window.dispatchEvent(new CustomEvent("slider-index-changed", { detail: globalCurrentIndex }));
    };

    const nextSlide = () => {
        globalCurrentIndex = (globalCurrentIndex + 1) % images.length;
        window.dispatchEvent(new CustomEvent("slider-index-changed", { detail: globalCurrentIndex }));
    };

    if (images.length === 0) {
        return (
            <img
                src="/home_slider/1_Group.jpg"
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

            {/* Arrows - Only show on foreground slider */}
            {!isBackground && images.length > 1 && (
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
