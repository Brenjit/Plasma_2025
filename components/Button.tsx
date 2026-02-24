import { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "outline";
    size?: "sm" | "md" | "lg";
    children: ReactNode;
    className?: string;
    icon?: ReactNode;
}

export default function Button({
    variant = "primary",
    size = "md",
    children,
    className,
    icon,
    ...props
}: ButtonProps) {
    const baseStyles =
        "inline-flex items-center justify-center gap-2 rounded-lg font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary:
            "bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/20",
        secondary:
            "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm",
        ghost: "text-text-secondary hover:text-primary hover:bg-primary/5",
        outline:
            "border border-gray-200 text-text-main hover:border-primary hover:text-primary bg-white",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-8 py-3 text-base h-12",
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {icon && <span className="material-symbols-outlined text-lg">{icon}</span>}
            {children}
        </button>
    );
}
