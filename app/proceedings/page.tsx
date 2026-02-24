"use client";

import { useState } from "react";
import proceedingsData from "@/data/proceedings.json";
import dynamic from "next/dynamic";
import Link from "next/link";

const Header = dynamic(() => import("@/components/Header"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export default function ProceedingsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("All");

    // Flatten the data structure to make searching easier while keeping hierarchy
    // Actually, keeping the hierarchy (Days -> Slots -> Sessions) is better for display.
    // We will filter the slots/sessions based on the search/filter criteria.

    const filterSlots = (days: any[]) => {
        return days.map(day => {
            // Early return if no filter
            if (!searchTerm && selectedType === "All") return day;

            const filteredSlots = day.slots.map((slot: any) => {
                // 1. Text Search Filter (Slot Title / Subtitle)
                const slotString = JSON.stringify(slot).toLowerCase();
                const term = searchTerm.toLowerCase();
                const textMatch = !searchTerm || slotString.includes(term);

                // Parent-level matches (Slot)
                // If the slot title or chair matches, we arguably might want to show the content.
                const slotMatches = !searchTerm ||
                    (slot.title || "").toLowerCase().includes(term) ||
                    (slot.subtitle || "").toLowerCase().includes(term) ||
                    (slot.chair || "").toLowerCase().includes(term);

                // 2. Type/Search Deep Filter
                let newSlot = { ...slot };
                let hasContent = false;

                // Helper to check if a talk matches search
                const isTalkMatch = (talk: any, parentSessionMatches: boolean = false) => {
                    if (selectedType !== "All") {
                        const type = (talk.type || "").toLowerCase();
                        const selected = selectedType.toLowerCase();
                        // Strict check for type
                        if (type !== selected && !type.includes(selected)) return false;
                        // Special handling for "Invited Talk" vs "Invited" if needed, 
                        // but generic includes logic usually works if strings align.
                        // Actually, strict equality for "Invited Talk" from UI:
                        if (selectedType === "Invited Talk" && talk.type !== "Invited Talk") return false;
                        if (selectedType === "Oral" && talk.type !== "Oral") return false;
                        if (selectedType === "Poster" && talk.type !== "Poster") return false;
                    }

                    if (!searchTerm) return true;

                    // If parent (Session/Slot) matched the text search, we include the talk (context match)
                    if (slotMatches || parentSessionMatches) return true;

                    // Otherwise check talk fields
                    return (
                        (talk.title || "").toLowerCase().includes(term) ||
                        (talk.speaker || "").toLowerCase().includes(term) ||
                        (talk.code || "").toLowerCase().includes(term) ||
                        (talk.type || "").toLowerCase().includes(term)
                    );
                };

                // Handle Parallel Sessions
                if (slot.sessions) {
                    const filteredSessions = slot.sessions.map((session: any) => {
                        // Check if session itself matches (e.g. Chair or Session Name)
                        const sessionMatches =
                            (session.name || "").toLowerCase().includes(term) ||
                            (session.chair || "").toLowerCase().includes(term);

                        const filteredTalks = session.talks.filter((talk: any) => isTalkMatch(talk, sessionMatches));

                        if (filteredTalks.length > 0) {
                            return { ...session, talks: filteredTalks };
                        }
                        return null;
                    }).filter(Boolean);

                    if (filteredSessions.length > 0) {
                        newSlot.sessions = filteredSessions;
                        hasContent = true;
                    }
                }

                // Handle Common Talks
                if (slot.talks) {
                    const filteredTalks = slot.talks.filter((talk: any) => isTalkMatch(talk));

                    if (filteredTalks.length > 0) {
                        newSlot.talks = filteredTalks;
                        hasContent = true;
                    }
                }

                // Special case: If it's a "break" or just a structural slot with no talks (e.g. Registration)
                // We show it ONLY if searching/filtering is "All" OR if text matches explicitly.
                // But usually, when filtering for "Invited Talk", we probably want to hide "Lunch".
                if (!slot.sessions && !slot.talks) {
                    if (selectedType === "All" && textMatch) return slot;
                }

                return hasContent ? newSlot : null;
            }).filter(Boolean);

            if (filteredSlots.length === 0) return null;

            return {
                ...day,
                slots: filteredSlots
            };
        }).filter(Boolean);
    };

    const filteredDays = filterSlots(proceedingsData.days);

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
            <Header />

            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 font-display mb-4">Proceedings & Talks Archive</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Search and explore the comprehensive record of sessions, presentations, and technical talks from Plasma 2025.
                    </p>
                </div>

                {/* Search & Filter Bar */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                        <input
                            type="text"
                            placeholder="Search speakers, titles, or topics..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        {/* Dynamic Filters */}
                        {(() => {
                            // Extract unique types from data
                            const uniqueTypes = new Set<string>(["All", "Invited Talk", "Oral", "Poster"]);
                            proceedingsData.days.forEach(day => {
                                day.slots.forEach((slot: any) => {
                                    if (slot.talks) slot.talks.forEach((t: any) => t.type && uniqueTypes.add(t.type));
                                    if (slot.sessions) {
                                        slot.sessions.forEach((s: any) => {
                                            s.talks.forEach((t: any) => t.type && uniqueTypes.add(t.type));
                                        });
                                    }
                                });
                            });
                            return Array.from(uniqueTypes);
                        })().map((type) => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-bold transition-colors border ${selectedType === type
                                    ? "bg-primary text-white border-primary"
                                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-12">
                    {filteredDays.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 border-dashed">
                            <span className="material-symbols-outlined text-6xl text-gray-200 mb-4">search_off</span>
                            <p className="text-gray-500 text-lg">No sessions found matching your criteria.</p>
                        </div>
                    ) : (
                        filteredDays.map((day: any) => (
                            <div key={day.id}>
                                <div className="flex items-center gap-4 mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900 font-display">{day.title}</h2>
                                    <span className="h-px flex-1 bg-gray-200"></span>
                                    <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{day.date}</span>
                                </div>

                                <div className="space-y-4">
                                    {day.slots.map((slot: any, slotIndex: number) => (
                                        <div key={slotIndex} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                                            <div className="p-6">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-primary font-bold">{slot.time} - {slot.endTime}</span>
                                                            {slot.type === 'break' && <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-orange-100 text-orange-700">Break</span>}
                                                        </div>
                                                        <h3 className="text-xl font-bold text-gray-900">
                                                            {slot.title}
                                                        </h3>
                                                        {slot.subtitle && <p className="text-gray-500 text-sm mt-1">{slot.subtitle}</p>}
                                                        {slot.chair && <p className="text-sm text-primary font-medium mt-2"><span className="text-gray-400 font-normal">Session Chair:</span> {slot.chair}</p>}
                                                    </div>
                                                </div>

                                                {/* Parallel Sessions Block */}
                                                {slot.sessions && (
                                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-gray-100 mt-4">
                                                        {slot.sessions.map((session: any, sIdx: number) => (
                                                            <div key={sIdx} className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                                                                <h4 className="font-bold text-gray-900 mb-1">{session.name}</h4>
                                                                {session.chair && <p className="text-xs text-gray-500 mb-4">Chair: {session.chair}</p>}

                                                                <div className="space-y-4">
                                                                    {session.talks.map((talk: any, tIdx: number) => (
                                                                        <div key={tIdx} className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-white border border-gray-200 hover:border-blue-300 transition-all shadow-sm hover:shadow-md">
                                                                            <div className="flex-1">
                                                                                <div className="flex items-center gap-2 mb-2">
                                                                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${talk.type === 'Invited Talk' ? 'bg-purple-100 text-purple-700' :
                                                                                        talk.type === 'Oral' ? 'bg-blue-100 text-blue-700' :
                                                                                            'bg-gray-100 text-gray-600'
                                                                                        }`}>
                                                                                        {talk.type || 'Talk'}
                                                                                    </span>
                                                                                    <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                                                                                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                                                                                        {talk.duration}
                                                                                    </span>
                                                                                    {talk.code && (
                                                                                        <span className="text-xs font-mono text-gray-400 bg-gray-50 px-1.5 rounded">
                                                                                            {talk.code}
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                                <h5 className="font-bold text-gray-900 text-lg leading-snug mb-1">{talk.title}</h5>
                                                                                <p className="text-sm text-primary font-medium flex items-center gap-1">
                                                                                    <span className="material-symbols-outlined text-sm">person</span>
                                                                                    {talk.speaker}
                                                                                </p>
                                                                            </div>

                                                                            <div className="flex sm:flex-col gap-2 shrink-0 border-t sm:border-t-0 sm:border-l border-gray-100 pt-3 sm:pt-0 sm:pl-4 mt-2 sm:mt-0 items-start sm:items-end justify-center">
                                                                                <a
                                                                                    href={talk.slides || '#'}
                                                                                    target={talk.slides ? "_blank" : "_self"}
                                                                                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border rounded-lg transition-colors w-full sm:w-auto justify-center ${talk.slides
                                                                                        ? "text-gray-700 bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                                                                                        : "text-gray-400 bg-gray-50 border-gray-100 cursor-not-allowed"
                                                                                        }`}
                                                                                    onClick={(e) => !talk.slides && e.preventDefault()}
                                                                                >
                                                                                    <span className="material-symbols-outlined text-base">picture_as_pdf</span>
                                                                                    Slides
                                                                                </a>
                                                                                <a
                                                                                    href={talk.video || '#'}
                                                                                    target={talk.video ? "_blank" : "_self"}
                                                                                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors shadow-sm w-full sm:w-auto justify-center ${talk.video
                                                                                        ? "text-white bg-primary hover:bg-primary-dark"
                                                                                        : "text-gray-400 bg-gray-200 shadow-none cursor-not-allowed"
                                                                                        }`}
                                                                                    onClick={(e) => !talk.video && e.preventDefault()}
                                                                                >
                                                                                    <span className="material-symbols-outlined text-base">play_circle</span>
                                                                                    Video
                                                                                </a>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Common Session Talks */}
                                                {slot.talks && (
                                                    <div className="mt-4 space-y-3">
                                                        {slot.talks.map((talk: any, tIdx: number) => (
                                                            <div key={tIdx} className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-blue-300 transition-all shadow-sm hover:shadow-md">
                                                                <div className="flex-1">
                                                                    <div className="flex items-center gap-2 mb-2">
                                                                        <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                                                                            <span className="material-symbols-outlined text-[14px]">schedule</span>
                                                                            {talk.duration}
                                                                        </span>
                                                                        {talk.type && (
                                                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-white border border-gray-200 text-gray-500">
                                                                                {talk.type}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                    <h5 className="font-bold text-gray-900 text-lg leading-snug mb-1">{talk.title}</h5>
                                                                    <p className="text-sm text-primary font-medium flex items-center gap-1">
                                                                        <span className="material-symbols-outlined text-sm">person</span>
                                                                        {talk.speaker}
                                                                    </p>
                                                                </div>

                                                                <div className="flex sm:flex-col gap-2 shrink-0 border-t sm:border-t-0 sm:border-l border-gray-200 pt-3 sm:pt-0 sm:pl-4 mt-2 sm:mt-0 items-start sm:items-end justify-center">
                                                                    <a
                                                                        href={talk.slides || '#'}
                                                                        target={talk.slides ? "_blank" : "_self"}
                                                                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border rounded-lg transition-colors w-full sm:w-auto justify-center ${talk.slides
                                                                            ? "text-gray-700 bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                                                                            : "text-gray-400 bg-gray-50 border-gray-100 cursor-not-allowed"
                                                                            }`}
                                                                        onClick={(e) => !talk.slides && e.preventDefault()}
                                                                    >
                                                                        <span className="material-symbols-outlined text-base">picture_as_pdf</span>
                                                                        Slides
                                                                    </a>
                                                                    <a
                                                                        href={talk.video || '#'}
                                                                        target={talk.video ? "_blank" : "_self"}
                                                                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors shadow-sm w-full sm:w-auto justify-center ${talk.video
                                                                            ? "text-white bg-primary hover:bg-primary-dark"
                                                                            : "text-gray-400 bg-gray-200 shadow-none cursor-not-allowed"
                                                                            }`}
                                                                        onClick={(e) => !talk.video && e.preventDefault()}
                                                                    >
                                                                        <span className="material-symbols-outlined text-base">play_circle</span>
                                                                        Video
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
