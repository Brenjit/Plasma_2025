import SponsorCard from "@/components/SponsorCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const sponsors = {
    title: [
        {
            name: "ATOS Instruments Marketing Services",
            logo: "/sponsors/atos.jpg",
            description:
                "Formed in 2013, ATOS is the preferred instrumentation partner of the scientific community. We are usually entrusted with implementation of end-to-end solutions for complex applications. Our customer base reads like a who’s who of the Indian scientific research community with several repeat customers. We specialize in the fields of Scientific Imaging and Spectroscopy, Cryogenics, Lasers, Microscopy, light characterization tools, Biomedical, Non-Destructive Testing etc. ATOS Instruments Marketing Services is associated with principal companies who are world leaders. In association with us, our principal companies are committed to bringing the state-of-the-art products and highest levels of service to the Indian market. Several initiatives have also been taken by ATOS to take to market indigenously developed technologies via technology transfers with renowned national laboratories and scientific research groups.",
            website: "https://www.atosindia.com/",
        },
        {
            name: "Ozone Crop Innovate Pvt. Ltd. (OCIPL)",
            logo: "/sponsors/ocipl.jpeg",
            description:
                "Ozone Crop Innovate Private Limited (OCIPL) is an agriculture-focused technology company dedicated to revolutionizing farming through sustainable and innovative solutions. Guided by its vision “Innovating Agriculture for a Sustainable Future,” the company aims to address critical challenges such as over-dependence on chemical fertilizers, soil degradation, and the environmental impact of conventional farming practices. OCIPL has developed advanced technologies, including a non-thermal plasma reactor for converting wastewater to nitrate fertilizers and an ozonized water sprayer for effective pest and disease management. These solutions are designed to enhance crop productivity, improve soil health, and significantly reduce environmental impact. The company works in collaboration with leading institutions such as IIT Tirupati.",
            website: "https://event.ipr.res.in/event/16", // Note: Original link was to event page, keeping as is or should use company site if found? Using event link for now as per legacy.
        },
    ],
    diamond: [
        {
            name: "Anusandhan National Research Foundation (ANRF)",
            logo: "/sponsors/anrf.jpeg",
            description:
                "The Anusandhan National Research Foundation (ANRF), established through the ANRF Act, 2023, provides strategic direction for research, innovation, and entrepreneurship across natural sciences, engineering, technology, environmental and earth sciences, health, agriculture, and interdisciplinary areas. It aims to strengthen research and development ecosystems in universities, colleges, research institutions, and R&D laboratories nationwide. As an apex body, ANRF promotes a culture of innovation, supports advanced scientific research, and facilitates collaboration among industry, academia, and government agencies. Guided by the National Education Policy, ANRF emphasizes that its strategies must align with the vision of Viksit Bharat 2047 and follow global best practices in research governance.",
            website: "https://www.anrfonline.in/",
        },
        {
            name: "Board of Research in Nuclear Sciences (BRNS)",
            logo: "/sponsors/brns.jpeg",
            description:
                "The Board of Research in Nuclear Sciences (BRNS), an advisory body of the Department of Atomic Energy (DAE), supports research in areas relevant to DAE’s mandate by funding universities, institutes, and national laboratories. DAE focuses on developing nuclear power using indigenous resources, advancing reactors, producing radioisotopes, and applying radiation technologies in medicine, agriculture, and industry. It also develops advanced technologies such as lasers, accelerators, instrumentation, and materials science. BRNS promotes collaborative research between DAE scientists and external institutions, supports conferences and workshops, and funds young researchers through fellowships and associateships. It also honors eminent scientists through the Raja Ramanna Fellowship and Homi Bhabha Chair.",
            website: "https://brns.res.in/",
        },
    ],
    platinum: [
        {
            name: "SIMCO Scientific Instrument Marketing Company",
            logo: "/sponsors/simco.png",
            description:
                "SIMCO stands for Scientific Instrument Marketing Company, providing advanced solutions in the field of Photonics, Semiconductor, Quantum, Material Science to name a few. It was established with a vision to connect the community of Indian Scientists with cutting-edge technology, tailored to their specific needs. More than 40 years in operation, SIMCO is the most trusted technology partner helping you achieve your Research and Development objectives, with a host of Global companies of pioneering technologies, unmatched service, and valuable expertise.",
            website: "https://www.simcoglobal.com/",
        },
        {
            name: "Bruker",
            logo: "/sponsors/bruker.png",
            description:
                "Bruker is enabling scientists and engineers to make breakthrough post-genomic discoveries and develop new applications that improve the quality of human life. Bruker’s high-performance scientific instruments and high-value analytical and diagnostic solutions enable scientists to explore materials and life at molecular, cellular, and microscopic levels. In close cooperation with our customers, Bruker is enabling innovation, improved productivity, and customer success in nanotechnology and materials science research, life science research, pharmaceuticals, biotechnology, applied markets, cell biology, clinical research, microbiology, and in-vitro diagnostics.",
            website: "https://www.bruker.com/en.html",
        },
    ],
    gold: [
        {
            name: "Eltech Engineers Pvt. Ltd.",
            logo: "/sponsors/eltech.png",
            description:
                "Eltech Engineers Pvt. Ltd. proudly showcases its Low-Pressure and Atmospheric Plasma Systems. With 30+ years of expertise, Eltech delivers Made-in-India solutions for R&D and industry-enabling advanced surface modification, nanotechnology, adhesion, coating, and biomedical applications. Alongside ozone and corona technologies, Eltech empowers academia and industry with sustainable, future-ready innovations trusted worldwide.",
            website: "https://www.eltech.in/",
        },
        {
            name: "Plasma Science Society of India (PSSI)",
            logo: "/sponsors/pssi.png",
            description:
                "The Plasma Science Society of India (PSSI) was established in 1978 with the mandate of providing a national platform for interaction among academicians, scientists, engineers, and industry professionals working in the fields of plasma science, technology, and allied areas. It is the largest national body supporting a wide range of activities in this domain. To learn more about PSSI and become a member of the society, please visit their website.",
            website: "https://www.pssi.in/",
        },
        {
            name: "Agnira Sanlayan Pvt. Ltd. (ASPL Fusion)",
            logo: "/sponsors/aspl_fusion.jpg",
            description:
                "Agnira Sanlayan Pvt. Ltd. (ASPL Fusion) aims to advance India’s energy independence through clean fusion power while addressing the nation’s reliance on imported medical radioisotopes. Its first phase focuses on domestic isotope production using neutron generators and accelerator systems, forming the foundation for long-term fusion R&D. Guided by experts like Prof. Prabhat Ranjan, Mr. Abhay K. Jha, and Mr. Abhinav Jha, ASPL Fusion integrates healthcare, clean energy, and national self-reliance.",
            website: "http://www.asplfusion.com/",
        },
        {
            name: "SS Deepam Biotek Pvt. Ltd.",
            logo: "/sponsors/ss_deepam.png",
            description:
                "SS Deepam Biotek Pvt. Ltd. is committed to transforming Indian agriculture through innovative and eco-friendly solutions. Focused on sustainability, the company promotes organic and bio-based inputs that improve soil health, enhance crop productivity, and reduce dependence on chemical fertilizers and pesticides. Combining scientific research with field-tested practices, its products include low-cost post-harvest solutions, plant growth promoters, and natural pest-management agents. With strong quality standards and a farmer-centric approach, SS Deepam Biotek continues to support a more resilient and productive agricultural future for India.",
            website:
                "https://www.indiafilings.com/search/ssdeepam-biotek-private-limited-cin-U01500KA2024PTC191547",
        },
    ],
    silver: [
        {
            name: "Swan Scientific",
            logo: "/sponsors/swan_scientific.png",
            description:
                "SWAN SCIENTIFIC, an offshoot of SWAN ENVIRONMENTAL PVT. LTD., with over three decades’ expertise, provides world-class scientific instruments and solutions to academic institutions, R&D organizations, forensic and QC labs, and industries, delivering advanced technology to the scientific community’s doorstep.",
            website: "https://www.swanscientific.in/",
        },
        {
            name: "Laser Science",
            logo: "/sponsors/laser_science.png",
            description:
                "At Laser Science, we deliver customized laser solutions tailored to your exact requirements. With expertise in precision, power, and unique wavelengths, we ensure your project advances without compromise, empowering you to achieve your vision and push the boundaries of innovation.",
            website: "https://laserscience.co.in/",
        },
        {
            name: "Pfeiffer Vacuum",
            logo: "/sponsors/pfeiffer.png",
            description:
                "Cutting-edge vacuum solutions for exploring the frontiers of knowledge. Pushing innovation beyond its limits and advancing humanity through excellence in high and ultra-high vacuum technology.",
            website: "https://www.pfeiffer-vacuum.com/in/en/",
        },
    ],
    bronze: [
        {
            name: "PerkinElmer",
            logo: "/sponsors/perkinelmer.jpg",
            description: "",
            website: "https://www.perkinelmer.com/",
        },
        {
            name: "Defence Research and Development Organisation (DRDO)",
            logo: "/sponsors/drdo.png",
            description: "",
            website: "https://drdo.gov.in/",
        },
    ],
    award: [
        {
            name: "IOP Publishing",
            logo: "/sponsors/iop.png",
            description: "",
            website: "https://ioppublishing.org/",
        },
        {
            name: "Plasma Science Society of India (PSSI)",
            logo: "/sponsors/pssi.png",
            description: "",
            website: "https://www.pssi.in/",
        },
        {
            name: "Power Beam Society of India",
            logo: "/sponsors/power_beam.png",
            description: "",
            website: "https://www.powerbeamsociety.in/",
        },
    ],
    other: [
        {
            name: "COMSOL",
            logo: "/sponsors/comsol.png",
            description: "",
            website: "https://www.comsol.com/",
        },
        {
            name: "Sponsor",
            logo: "/sponsors/other_1.png",
            description: "",
            website: "#",
        },
        {
            name: "Sponsor",
            logo: "/sponsors/other_2.jpeg",
            description: "",
            website: "#",
        },
        {
            name: "Sponsor",
            logo: "/sponsors/other_3.jpeg",
            description: "",
            website: "#",
        },
        {
            name: "Sponsor",
            logo: "/sponsors/other_4.jpg",
            description: "",
            website: "#",
        },
    ],
};

export default function SponsorsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <Header />
            <main className="flex-grow pt-8 pb-12">
                <div className="container mx-auto px-4">
                    {/* Page Title */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl hover:text-[#8a211d] md:text-5xl font-bold text-[#8a211d] mb-4 uppercase tracking-wide">
                            Our Sponsors
                        </h1>
                        <div className="h-1 w-24 bg-[#FFD700] mx-auto rounded-full"></div>
                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                            We are grateful for the generous support of our sponsors who help make
                            PLASMA 2025 possible.
                        </p>
                    </div>

                    {/* Title Sponsors */}
                    <section className="mb-20">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent to-[#8a211d]"></div>
                            <h2 className="text-3xl font-bold text-[#8a211d] uppercase tracking-wider text-center">
                                Title Sponsors
                            </h2>
                            <div className="h-[2px] flex-grow bg-gradient-to-l from-transparent to-[#8a211d]"></div>
                        </div>
                        <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
                            {sponsors.title.map((sponsor, index) => (
                                <SponsorCard key={index} {...sponsor} tier="Title" />
                            ))}
                        </div>
                    </section>

                    {/* Diamond Sponsors */}
                    <section className="mb-20">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent to-[#324158]"></div>
                            <h2 className="text-2xl font-bold text-[#324158] uppercase tracking-wider text-center">
                                Diamond Sponsors
                            </h2>
                            <div className="h-[2px] flex-grow bg-gradient-to-l from-transparent to-[#324158]"></div>
                        </div>
                        <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
                            {sponsors.diamond.map((sponsor, index) => (
                                <SponsorCard key={index} {...sponsor} tier="Diamond" />
                            ))}
                        </div>
                    </section>

                    {/* Platinum Sponsors */}
                    <section className="mb-20">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent to-[#324158]"></div>
                            <h2 className="text-2xl font-bold text-[#324158] uppercase tracking-wider text-center">
                                Platinum Sponsors
                            </h2>
                            <div className="h-[2px] flex-grow bg-gradient-to-l from-transparent to-[#324158]"></div>
                        </div>
                        <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
                            {sponsors.platinum.map((sponsor, index) => (
                                <SponsorCard key={index} {...sponsor} tier="Platinum" />
                            ))}
                        </div>
                    </section>

                    {/* Gold Sponsors */}
                    <section className="mb-20">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent to-[#324158]"></div>
                            <h2 className="text-2xl font-bold text-[#324158] uppercase tracking-wider text-center">
                                Gold Sponsors
                            </h2>
                            <div className="h-[2px] flex-grow bg-gradient-to-l from-transparent to-[#324158]"></div>
                        </div>
                        <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
                            {sponsors.gold.map((sponsor, index) => (
                                <SponsorCard key={index} {...sponsor} tier="Gold" />
                            ))}
                        </div>
                    </section>

                    {/* Silver Sponsors */}
                    <section className="mb-20">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent to-[#324158]"></div>
                            <h2 className="text-2xl font-bold text-[#324158] uppercase tracking-wider text-center">
                                Silver Sponsors
                            </h2>
                            <div className="h-[2px] flex-grow bg-gradient-to-l from-transparent to-[#324158]"></div>
                        </div>
                        <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
                            {sponsors.silver.map((sponsor, index) => (
                                <SponsorCard key={index} {...sponsor} tier="Silver" />
                            ))}
                        </div>
                    </section>

                    {/* Bronze, Award, and Other Sponsors - Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                        {/* Bronze Sponsors */}
                        <section>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent to-[#324158]"></div>
                                <h2 className="text-xl font-bold text-[#324158] uppercase tracking-wider text-center">
                                    Bronze Sponsors
                                </h2>
                                <div className="h-[2px] flex-grow bg-gradient-to-l from-transparent to-[#324158]"></div>
                            </div>
                            <div className="grid grid-cols-1 gap-6">
                                {sponsors.bronze.map((sponsor, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center justify-center hover:shadow-md transition-shadow"
                                    >
                                        <div className="relative w-full h-24 mb-4">
                                            <img
                                                src={sponsor.logo}
                                                alt={sponsor.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        {sponsor.website !== "#" && (
                                            <a
                                                href={sponsor.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm font-medium text-[#8a211d] hover:underline"
                                            >
                                                Visit Website
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Award Sponsors */}
                        <section>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent to-[#324158]"></div>
                                <h2 className="text-xl font-bold text-[#324158] uppercase tracking-wider text-center">
                                    Award Sponsors
                                </h2>
                                <div className="h-[2px] flex-grow bg-gradient-to-l from-transparent to-[#324158]"></div>
                            </div>
                            <div className="grid grid-cols-1 gap-6">
                                {sponsors.award.map((sponsor, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center justify-center hover:shadow-md transition-shadow"
                                    >
                                        <div className="relative w-full h-24 mb-4">
                                            <img
                                                src={sponsor.logo}
                                                alt={sponsor.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        {sponsor.website !== "#" && (
                                            <a
                                                href={sponsor.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm font-medium text-[#8a211d] hover:underline"
                                            >
                                                Visit Website
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Other Sponsors */}
                        <section>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent to-[#324158]"></div>
                                <h2 className="text-xl font-bold text-[#324158] uppercase tracking-wider text-center">
                                    Other Sponsors
                                </h2>
                                <div className="h-[2px] flex-grow bg-gradient-to-l from-transparent to-[#324158]"></div>
                            </div>
                            <div className="grid grid-cols-1 gap-6">
                                {sponsors.other.map((sponsor, index) => (
                                    <div
                                        key={index}
                                        className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center justify-center hover:shadow-md transition-shadow"
                                    >
                                        <div className="relative w-full h-24 mb-4">
                                            <img
                                                src={sponsor.logo}
                                                alt={sponsor.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        {sponsor.website !== "#" && (
                                            <a
                                                href={sponsor.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm font-medium text-[#8a211d] hover:underline"
                                            >
                                                Visit Website
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
