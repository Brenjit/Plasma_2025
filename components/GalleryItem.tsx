interface GalleryImage {
    id: string;
    url: string;
    previewUrl?: string | null; // Add optional previewUrl
    tags: string[];
}

export default function GalleryItem({ item, onClick }: { item: GalleryImage, onClick?: () => void }) {
    return (
        <div
            className="group relative break-inside-avoid mb-6 rounded-xl bg-gray-100 dark:bg-[#1a2233] shadow-sm transition-all hover:shadow-md border border-gray-200 dark:border-gray-800 overflow-hidden cursor-pointer"
            onClick={onClick}
        >
            <div className="relative overflow-hidden aspect-[4/3]">
                <img
                    src={item.previewUrl || item.url} // Use previewUrl if available
                    alt={item.tags ? item.tags.join(", ") : "Gallery Image"}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="material-symbols-outlined text-white text-3xl drop-shadow-lg">zoom_in</span>
                </div>
                {/* Tags Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-wrap gap-1">
                    {item.tags?.map((tag, idx) => (
                        <span key={idx} className="text-[10px] font-bold uppercase tracking-wider text-white bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
