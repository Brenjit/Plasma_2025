"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import siteConfig from "@/data/site.config.json";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Proceedings", href: "/proceedings" },
        { name: "Gallery", href: "/gallery" },
        { name: "Speakers", href: "/speakers" },
        { name: "Sponsors", href: "/sponsors" },
        { name: "About", href: "/about" },
    ];

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-24">
                        {/* Logo Area */}
                        <Link href="/" className="flex items-center gap-4 group">
                            <div className="w-20 h-20 rounded-lg bg-primary/10 flex items-center justify-center text-primary overflow-hidden">
                                <img
                                    src="/images/plasma_logo.jpg"
                                    alt="Plasma 2025 Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-3xl font-bold leading-none tracking-tight text-gray-900 font-display uppercase">
                                    PLASMA {siteConfig.year}
                                </h1>
                                <span className="text-xs font-medium text-gray-500">
                                    {siteConfig.venue} Archive
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? "text-primary font-bold" : "text-gray-600"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        {/* CTA Button */}
                        <div className="hidden md:flex">
                            <a href="https://drive.google.com/file/d/1fWks6hCb-ywvMGdnoVGJGDYCSYoakB9Q/view" target="_blank" rel="noopener noreferrer">
                                <button className="bg-primary hover:bg-primary-dark text-white text-sm font-bold py-2.5 px-5 rounded-lg transition-all duration-200 shadow-lg shadow-primary/20 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">download</span>
                                    Abstract Book
                                </button>
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                className="text-gray-600 hover:text-primary p-2"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                <span className="material-symbols-outlined text-2xl">
                                    {isMobileMenuOpen ? "close" : "menu"}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden animate-fade-in">
                    <nav className="flex flex-col gap-6 text-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-2xl font-bold text-gray-900 hover:text-primary transition-colors font-display"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <a href="https://drive.google.com/file/d/1fWks6hCb-ywvMGdnoVGJGDYCSYoakB9Q/view" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>
                            <button className="w-full bg-primary text-white py-3 rounded-lg font-bold text-lg shadow-md mt-4 flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined">download</span>
                                Abstract Book
                            </button>
                        </a>
                    </nav>
                </div>
            )}
        </>
    );
}
