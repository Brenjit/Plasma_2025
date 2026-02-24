import { HTMLAttributes, ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export default function Card({
    children,
    className,
    hoverEffect = true,
    ...props
}: CardProps) {
    return (
        <div
            className={cn(
                "bg-white dark:bg-[#1a2233] rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm overflow-hidden",
                hoverEffect && "hover:shadow-lg transition-shadow duration-300",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
