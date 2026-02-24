"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import GalleryItem from "@/components/GalleryItem"; // Updated component
import galleryData from "@/data/gallery.json";

const Header = dynamic(() => import("@/components/Header"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

// Types matching updated JSON
interface GalleryImage {
    id: string;
    url: string;
    previewUrl?: string | null;
    tags: string[];
}

interface Event {
    id: string;
    name: string;
    folderId: string;
    thumbnail?: string;
    description: string;
    images: GalleryImage[];
}

export default function GalleryPage() {
    // Current active event ID. "all" means showing the list of events (Albums View).
    const [activeEventId, setActiveEventId] = useState("all");
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    // Events list
    const events: Event[] = galleryData.events;

    const activeEvent = useMemo(() =>
        events.find(e => e.id === activeEventId),
        [activeEventId, events]);

    return (
        <div className="bg-background-light min-h-screen flex flex-col font-display">
            <Header />

            <main className="flex-1 w-full">
                {/* Hero Section */}
                <section className="relative w-full bg-background-light py-12 lg:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="relative overflow-hidden rounded-2xl bg-[#0F172A] shadow-xl">
                            <div className="absolute inset-0 z-0">
                                <img
                                    alt="Abstract plasma energy visualization"
                                    className="h-full w-full object-cover opacity-50 mix-blend-overlay animate-slow-zoom"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSvk3pYLHA_E1X4a3f4-qXkW6iKcev0EsISYOhCRMdNpxKea0OTLRbbgI3vn3-bb70-Lt_R_d3lQ4CGSo8ZwHGGntIKPjPeA9KSua84mXTB4Yq7N1T7vDidJiMzlcBw4MOg45wYAJkQYluQ1hFwFGa6NroW2Y3oe73dtt7ifZGb3zu48bqvSOdnOnP_f19y_Iyxj5FMv2ZGBk8DB5bLr7i5BpzjqFjQ2PuU6MXVDKDBaCAzYRGOmVRQx3meWE04IMvRitj04p6Iw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/80 to-transparent"></div>
                            </div>
                            <div className="relative z-10 flex flex-col items-start gap-6 p-8 sm:p-12 lg:p-16 max-w-3xl">
                                <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-sm">
                                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                                        Official Archive
                                    </span>
                                </div>
                                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl font-display">
                                    Visual Highlights 2023
                                </h2>
                                <p className="text-lg font-light leading-relaxed text-gray-200 sm:text-xl border-l-2 border-primary pl-4">
                                    Exploring the frontiers of plasma science. A curated collection
                                    of moments from our community gathering, technical sessions,
                                    and cultural evenings.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Gallery Content */}
                <section className="w-full pb-20 pt-8">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                        {/* Navigation / Breadcrumbs */}
                        <div className="mb-10 flex items-center justify-between border-b border-gray-200 pb-4">
                            <div className="flex gap-2 items-center overflow-x-auto no-scrollbar">
                                <button
                                    onClick={() => setActiveEventId("all")}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${activeEventId === "all"
                                        ? "bg-primary text-white shadow-lg shadow-primary/30"
                                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-lg">grid_view</span>
                                    All Albums
                                </button>

                                {events.map(event => (
                                    <button
                                        key={event.id}
                                        onClick={() => setActiveEventId(event.id)}
                                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeEventId === event.id
                                            ? "bg-primary text-white shadow-lg shadow-primary/30"
                                            : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                                            }`}
                                    >
                                        {event.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* View: All Albums (Events) */}
                        {activeEventId === "all" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {events.map((event) => (
                                    <div
                                        key={event.id}
                                        onClick={() => setActiveEventId(event.id)}
                                        className="group cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                                    >
                                        {/* Cover Image */}
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={event.thumbnail || (event.images[0]?.url)}
                                                alt={event.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                                            <div className="absolute bottom-4 left-4 text-white">
                                                <h3 className="text-2xl font-bold font-display">{event.name}</h3>
                                                <p className="text-sm text-gray-200 flex items-center gap-1 mt-1">
                                                    <span className="material-symbols-outlined text-sm">photo_library</span>
                                                    {event.images.length} Photos
                                                </p>
                                            </div>

                                            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                                <span className="material-symbols-outlined text-white">arrow_forward</span>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="p-6">
                                            <p className="text-gray-600 leading-relaxed text-sm line-clamp-2">
                                                {event.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* View: Single Event Images */}
                        {activeEvent && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="mb-8 flex items-center gap-4">
                                    <button
                                        onClick={() => setActiveEventId("all")}
                                        className="h-10 w-10 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:border-primary hover:text-primary transition-colors"
                                    >
                                        <span className="material-symbols-outlined">arrow_back</span>
                                    </button>
                                    <div>
                                        <h2 className="text-3xl font-bold text-gray-900 font-display">{activeEvent.name}</h2>
                                        <p className="text-gray-500">{activeEvent.description}</p>
                                    </div>
                                </div>

                                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                                    {activeEvent.images.map((img) => (
                                        <GalleryItem
                                            key={img.id}
                                            item={img}
                                            onClick={() => setSelectedImage(img)}
                                        />
                                    ))}
                                    {activeEvent.images.length === 0 && (
                                        <p className="text-gray-400 italic">No images available for this event yet.</p>
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                </section>
            </main>

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-gradient-to-b from-black/5 to-black/30 p-4 animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        className="relative flex flex-col items-center justify-center max-w-[95vw] max-h-[95vh]"
                        onClick={e => e.stopPropagation()}
                    >

                        {/* Actions Bar - Directly above the image */}
                        <div className="w-full flex justify-end items-center gap-3 mb-3">
                            <a
                                href={`https://drive.google.com/u/0/uc?id=${selectedImage.id}&export=download`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 hover:bg-white/60 text-black backdrop-blur-md transition-all border border-white/20 shadow-sm hover:shadow-md group"
                                title="Download"
                            >
                                <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">download</span>
                                <span className="hidden sm:inline font-bold text-sm">Download</span>
                            </a>
                            <a
                                href={`https://drive.google.com/file/d/${selectedImage.id}/view`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/90 hover:bg-primary text-white backdrop-blur-md transition-all shadow-lg hover:shadow-primary/50 group"
                                title="View in Drive"
                            >
                                <span className="material-symbols-outlined text-lg group-hover:scale-110 transition-transform">open_in_new</span>
                                <span className="hidden sm:inline font-bold text-sm">Drive</span>
                            </a>
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="p-2 rounded-full bg-black/20 text-black hover:bg-red-500 hover:text-white transition-all border border-black/10 ml-2 backdrop-blur-md"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        {/* Main Image */}
                        <img
                            src={selectedImage.url}
                            alt="Gallery Preview"
                            className="w-auto h-auto max-h-[calc(90vh-80px)] object-contain rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.2)] ring-1 ring-black/5"
                        />
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
