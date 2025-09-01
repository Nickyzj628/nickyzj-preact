import { clsx } from "@/helpers/string";
import { ReactNode } from "preact/compat";

const typeClassName = {
    default: "bg-neutral-50 text-neutral-500 dark:bg-white/10 dark:text-white",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500",
    success: "bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-500",
    danger: "bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500",
    invert: "bg-white text-neutral-800 dark:bg-neutral-800 dark:text-white",
};

const Badge = ({
    type = "default",
    className = "",
    children,
}: {
    type?: keyof typeof typeClassName,
    className?: string,
    children?: ReactNode,
}) => {
    return (
        <span className={clsx(`inline-flex items-center gap-x-1.5 py-1 px-2.5 rounded-lg text-xs font-medium transition ${typeClassName[type]}`, className)}>
            {children}
        </span>
    );
};

export default Badge;