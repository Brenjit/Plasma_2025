
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans selection:bg-secondary/20 selection:text-primary">
            <Header />
            <main className="flex-grow">
                {/* Hero Section - Parallax style */}
                <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-[#2a0a0a]">
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/Media/about/image.png"
                            alt="Plasma 2025 Conference"
                            fill
                            className="object-cover opacity-80 animate-slow-zoom"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2a0a0a]/30 to-transparent"></div>
                    </div>
                    <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-secondary font-medium tracking-widest text-sm uppercase shadow-lg">
                            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                            December 27-29, 2025
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-display tracking-tight drop-shadow-2xl">
                            About Plasma 2025
                        </h1>
                        <p className="text-xl md:text-2xl text-white font-light max-w-2xl mx-auto leading-relaxed border-t border-white/10 pt-6">
                            Fostering innovation in plasma science and technology for a sustainable future.
                        </p>
                    </div>
                </section>

                {/* Welcome Message - Clean & Elegant */}
                <section className="relative py-24 bg-white overflow-hidden">
                    {/* Decorative background element */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

                    <div className="container mx-auto px-4 max-w-5xl relative z-10">
                        <div className="flex flex-col md:flex-row gap-12 items-start">
                            <div className="w-full md:w-1/3 lg:w-1/4 sticky top-24">
                                <div className="text-6xl text-primary/10 font-serif leading-none absolute -top-10 -left-6 select-none">
                                    “
                                </div>
                                <h2 className="text-3xl font-bold text-primary font-display mb-4 relative z-10">
                                    A Note of Gratitude
                                </h2>
                                <div className="h-1 w-20 bg-gradient-to-r from-secondary to-yellow-400 mb-6 rounded-full"></div>
                                <p className="text-gray-500 text-sm font-medium uppercase tracking-wider flex items-center gap-2">
                                    <span className="h-px w-4 bg-gray-400"></span>
                                    From the Chairman
                                </p>
                            </div>

                            <div className="w-full md:w-2/3 lg:w-3/4">
                                <div className="prose prose-lg text-gray-700 leading-relaxed font-light text-lg">
                                    <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-2 first-letter:float-left">
                                        It is with great pride that we reflect on the <strong className="text-primary font-semibold">40th National Symposium on Plasma Science and Technology for Sustainable Future (Plasma 2025)</strong>, the nation’s largest and most distinguished gathering dedicated to the field of plasma science, engineering, and technology. As Chairman of this milestone event, I was delighted to host researchers, industry leaders, innovators, and policymakers from <strong>27–29 December 2025</strong> in IIT Tirupati and IISER Tirupati, for what was a truly transformative experience.
                                    </p>
                                    <p>
                                        We were joined by over <strong>500 delegates, 40 keynote speakers, and 20 sponsors</strong>, making this a landmark event. Plasma 2025 served as a vital platform to explore developments through a rich program of over <strong>100 technical sessions</strong>, panel discussions, and interactive workshops.
                                    </p>
                                    <p>
                                        Topics spanned fusion energy, additive manufacturing, plasma diagnostics, surface engineering, and applications in sustainability. With participation from academia, government, and industry, the symposium showcased the latest research and fostered strategic collaborations for the future of plasma-aided technologies.
                                    </p>
                                    <p>
                                        The local organizing committee extends its heartfelt thanks to all participants for their engagement and insights. We hope you took full advantage of this opportunity to shape the direction of plasma science and its role in building a better, more sustainable world. We look forward to our continued collaboration in the future.
                                    </p>
                                    <div className="flex items-center gap-4 mt-8 pt-8 border-t border-gray-100">
                                        {/* Optional Signature Space */}
                                        <div className="font-handwriting text-2xl text-primary opacity-80 rotate-[-2deg]">
                                            Plasma 2025 Organizing Committee
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Hosts - Split Layouts */}
                <section className="py-24 bg-gray-50 relative">
                    <div className="absolute inset-0 bg-[url('/patterns/topography.svg')] opacity-[0.03]"></div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center mb-20">
                            <span className="text-secondary font-bold uppercase tracking-widest text-xs border border-secondary/30 px-3 py-1 rounded-full bg-secondary/5">Venue & Organizers</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-primary mt-4 font-display">Our Distinguished Hosts</h2>
                            <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent mx-auto mt-6 rounded-full"></div>
                        </div>

                        {/* Host 1: IIT Tirupati */}
                        <div className="flex flex-col lg:flex-row items-stretch gap-0 mb-24 bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 group border border-gray-100">
                            <div className="w-full lg:w-1/2 relative min-h-[400px]">
                                <Image
                                    src="/about/iit_tirupati_2.jpg"
                                    alt="IIT Tirupati Campus"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/10"></div>
                                <div className="absolute bottom-8 left-8 text-white z-20">
                                    <div className="bg-primary text-white px-4 py-1 inline-block text-sm font-bold rounded mb-2">Host Institute</div>
                                    <div className="text-2xl font-bold font-display">IIT Tirupati</div>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
                                <h3 className="text-3xl font-bold text-gray-900 font-display mb-6 group-hover:text-primary transition-colors">Indian Institute of Technology Tirupati</h3>
                                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                                    Indian Institute of Technology Tirupati (IIT Tirupati) is an autonomous institution established by the Government of India as part of the prestigious IIT system. Founded in 2015 and located in the culturally rich state of Andhra Pradesh, it has rapidly emerged as a center of excellence in technical education, research, and innovation.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    The institute offers cutting-edge undergraduate, postgraduate, and doctoral programs across disciplines including engineering, sciences, and humanities. With a strong emphasis on interdisciplinary research, IIT Tirupati is actively involved in addressing global challenges in energy, materials, environment, infrastructure, and emerging technologies.
                                </p>
                            </div>
                        </div>

                        {/* Host 2: IISER Tirupati */}
                        <div className="flex flex-col lg:flex-row-reverse items-stretch gap-0 bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 group border border-gray-100">
                            <div className="w-full lg:w-1/2 relative min-h-[400px]">
                                <Image
                                    src="/about/iiser_tirupati.jpg"
                                    alt="IISER Tirupati Campus"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-transparent lg:to-black/10"></div>
                                <div className="absolute bottom-8 right-8 text-white z-20 text-right">
                                    <div className="bg-secondary text-primary px-4 py-1 inline-block text-sm font-bold rounded mb-2">Host Institute</div>
                                    <div className="text-2xl font-bold font-display">IISER Tirupati</div>
                                </div>
                            </div>

                            <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center text-right">
                                <h3 className="text-3xl font-bold text-gray-900 font-display mb-6 group-hover:text-primary transition-colors">Indian Institute of Science Education and Research</h3>
                                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                                    IISER Tirupati is an autonomous premier institute established by the Government of India in 2015. As part of the prestigious IISER network, it is dedicated to promoting world-class education and cutting-edge research in the basic sciences.
                                </p>
                                <p className="text-gray-600 leading-relaxed">
                                    Located in the temple town of Tirupati, Andhra Pradesh, IISER Tirupati offers integrated B.S.-M.S. and Ph.D. programs. The institute is rapidly developing as a hub for high-impact scientific research in molecular biology, quantum physics, nanoscience, atmospheric chemistry, and data science.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Symposium Topics - Detailed Grid */}
                <section className="py-24 bg-white text-gray-900 relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('/patterns/topography.svg')]"></div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center mb-16">
                            <span className="text-secondary font-bold uppercase tracking-widest text-sm border-b border-secondary pb-1">Scientific Program</span>
                            <h2 className="text-4xl md:text-5xl font-bold mt-4 font-display text-primary">Symposium Topics</h2>
                            <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                                Exploring the frontiers of plasma science through a diverse range of technical sessions, bridging theory and application.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
                            {[
                                { title: "Plasma Fundamentals", icon: "science" },
                                { title: "Plasma Diagnostics", icon: "biotech" },
                                { title: "Computational Modelling", icon: "terminal" },
                                { title: "AI & Data Science", icon: "smart_toy" },
                                { title: "Atomic & Molecular Data", icon: "dataset" },
                                { title: "Pulsed & Laser Plasma", icon: "flash_on" },
                                { title: "Quantum Computing", icon: "memory" },
                                { title: "Exotic/Dusty Plasma", icon: "grain" },
                                { title: "Space & Astrophysical", icon: "rocket_launch" },
                                { title: "Fusion Science & Tech", icon: "bolt" },
                                { title: "Environmental Apps", icon: "eco" },
                                { title: "Agriculture & Food", icon: "agriculture" },
                                { title: "Material Processing", icon: "precision_manufacturing" },
                                { title: "Semiconductor Mfg", icon: "developer_board" },
                                { title: "Propulsion & Generation", icon: "flight_takeoff" },
                                { title: "Energy Applications", icon: "solar_power" },
                                { title: "Biomedical Applications", icon: "medical_services" },
                                { title: "Smart Manufacturing", icon: "factory" },
                                { title: "Automotive Sector", icon: "directions_car" }
                            ].map((topic, index) => (
                                <div key={index} className="group p-5 rounded-xl bg-white border border-gray-200 hover:border-secondary/50 transition-all duration-300 flex items-center gap-4 hover:transform hover:-translate-y-1 hover:shadow-lg relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0 z-10">
                                        <span className="material-symbols-outlined text-2xl">{topic.icon}</span>
                                    </div>
                                    <span className="font-medium text-lg text-gray-700 group-hover:text-primary z-10">{topic.title}</span>
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
