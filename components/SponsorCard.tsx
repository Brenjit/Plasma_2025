import Image from "next/image";
import Link from "next/link";

interface SponsorCardProps {
    name: string;
    logo: string;
    description: string;
    website: string;
    tier: string;
}

export default function SponsorCard({
    name,
    logo,
    description,
    website,
    tier,
}: SponsorCardProps) {
    return (
        <div className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-lg p-4 w-full md:w-64 h-48">
                <div className="relative w-full h-full">
                    <Image
                        src={logo}
                        alt={`${name} Logo`}
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
            <div className="flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold text-[#8a211d] mb-2">{name}</h3>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4 text-justify">
                        {description}
                    </p>
                </div>
                <div>
                    <Link
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#8a211d] text-white rounded-md hover:bg-[#6b1a16] transition-colors text-sm font-medium"
                    >
                        Learn More <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
