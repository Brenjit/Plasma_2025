import Button from "./Button";
import Link from "next/link";

interface TalkProps {
    id: string;
    title: string;
    speakerName: string;
    affiliation: string;
    session: string;
    date: string;
    time?: string;
    type: string;
    tags: string[];
    abstract: string;
    resources: {
        slides?: string;
        video?: string;
        poster?: string;
    };
}

const typeColors: Record<string, string> = {
    Invited: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    Plenary: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    Oral: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    Poster: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
};

export default function ProceedingsCard({ talk }: { talk: TalkProps }) {
    return (
        <div className="group bg-white dark:bg-[#1a2233] rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-200 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex flex-col md:flex-row gap-6">
                {/* Content */}
                <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap gap-2 mb-1">
                        {talk.tags.slice(0, 1).map((tag) => (
                            <span
                                key={tag}
                                className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-bold uppercase tracking-wide"
                            >
                                {tag}
                            </span>
                        ))}
                        <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${typeColors[talk.type] || "bg-gray-100 text-gray-700"
                                }`}
                        >
                            {talk.type} Talk
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-text-main dark:text-white group-hover:text-primary transition-colors font-display">
                        {talk.title}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-text-secondary dark:text-gray-400">
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[18px]">person</span>
                            <span className="font-medium text-text-main dark:text-gray-200">
                                {talk.speakerName}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[18px]">
                                apartment
                            </span>
                            <span>{talk.affiliation}</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:ml-auto">
                            <span className="material-symbols-outlined text-[18px]">
                                calendar_today
                            </span>
                            <span>
                                {new Date(talk.date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })}
                                , {talk.time}
                            </span>
                        </div>
                    </div>
                    <p className="text-sm text-text-secondary dark:text-gray-400 line-clamp-2 mt-2">
                        {talk.abstract}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex md:flex-col items-center justify-start gap-3 md:border-l md:border-gray-100 md:dark:border-gray-700 md:pl-6 min-w-[140px]">
                    {talk.resources.slides && (
                        <Link href={talk.resources.slides} className="w-full">
                            <Button
                                size="sm"
                                className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-white"
                                icon={<span className="material-symbols-outlined text-[20px]">download</span>}
                            >
                                Slides
                            </Button>
                        </Link>
                    )}
                    {talk.resources.poster && (
                        <Link href={talk.resources.poster} className="w-full">
                            <Button
                                size="sm"
                                className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-white"
                                icon={<span className="material-symbols-outlined text-[20px]">download</span>}
                            >
                                Poster
                            </Button>
                        </Link>
                    )}
                    {talk.resources.video ? (
                        <Link href={talk.resources.video} className="w-full">
                            <Button
                                size="sm"
                                variant="outline"
                                className="w-full dark:bg-transparent"
                                icon={<span className="material-symbols-outlined text-[20px]">play_circle</span>}
                            >
                                Watch
                            </Button>
                        </Link>
                    ) : (
                        <button
                            disabled
                            className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg border border-gray-100 dark:border-gray-700 text-gray-300 dark:text-gray-600 font-bold text-xs bg-gray-50 dark:bg-gray-800 cursor-not-allowed"
                        >
                            <span className="material-symbols-outlined text-[18px]">videocam_off</span>
                            No Video
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
