import Link from "next/link";
import siteConfig from "@/data/site.config.json";

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand & Description */}
                    <div>
                        <div className="mb-6 flex items-center gap-2">
                            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold text-lg">P</div>
                            <span className="font-bold text-xl text-primary font-display tracking-tight">Plasma {siteConfig.year}</span>
                        </div>
                        <p className="text-gray-600 max-w-sm mb-6 text-sm leading-relaxed">
                            {siteConfig.description}
                        </p>
                        <div className="flex gap-4">
                            {/* Social placeholders */}
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-sm">public</span>
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-sm">mail</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-6 font-display">Quick Links</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li>
                                <Link href="/proceedings" className="hover:text-primary transition-colors">Proceedings</Link>
                            </li>
                            <li>
                                <Link href="/gallery" className="hover:text-primary transition-colors">Photo Gallery</Link>
                            </li>
                            <li>
                                <Link href="/#committee" className="hover:text-primary transition-colors">Organizing Committee</Link>
                            </li>
                            <li>
                                <Link href="/#contact" className="hover:text-primary transition-colors">Contact Us</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-6 font-display">Contact Info</h3>
                        <ul className="space-y-4 text-sm text-gray-600">
                            <li className="flex items-start gap-3">
                                <span className="material-symbols-outlined text-primary shrink-0 mt-0.5">
                                    location_on
                                </span>
                                <span>{siteConfig.contact.address}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary shrink-0">
                                    mail
                                </span>
                                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary">
                                    {siteConfig.contact.email}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary shrink-0">
                                    call
                                </span>
                                <span>{siteConfig.contact.phone}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Organized By */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-6 font-display">Organized By</h3>
                        <div className="flex flex-wrap gap-4 items-center">
                            <img src="/logos/iit-tirupati.png" alt="IIT Tirupati" className="h-12 w-auto object-contain bg-white rounded" />
                            <img src="/logos/iiser-tirupati.png" alt="IISER Tirupati" className="h-12 w-auto object-contain bg-white rounded" />
                            <img src="/logos/pssi.png" alt="PSSI" className="h-12 w-auto object-contain bg-white rounded" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-8 mt-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">
                        © {siteConfig.year} {siteConfig.venue}. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <a href="#" className="hover:text-primary">Privacy Policy</a>
                        <a href="#" className="hover:text-primary">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
