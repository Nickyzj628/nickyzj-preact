import { clsx } from "@/helpers/string";
import { ReactNode } from "preact/compat";

const typeMap = {
    default: "bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300",
    info: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
    success: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
    warning: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300",
    danger: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300",
    invert: "bg-black text-white dark:bg-white dark:text-black",
};

export type BadgeType = keyof typeof typeMap;

const sizeMap = {
    small: {
        wrapper: "px-2 py-1 text-xs",
        icon: "w-3 h-3",
    },
    middle: {
        wrapper: "px-3 py-1 text-sm",
        icon: "w-4 h-4",
    },
};

export type BadgeSize = keyof typeof sizeMap;

const Badge = ({
    type = "default",
    size = "small",
    className,
    icon,
    showClose = false,
    onClose = () => void 0,
    children,
}: {
    type?: BadgeType,
    size?: BadgeSize,
    className?: string,
    /**
     * 请传入 \@iconify/tailwind4 插件支持的类名
     * @example "icon-[mingcute--align-arrow-left-line]"
     */
    icon?: string;
    showClose?: boolean;
    onClose?: () => void;
    children?: ReactNode,
}) => {
    return (
        <span className={clsx("inline-flex items-center gap-1 rounded-lg font-semibold transition", typeMap[type], sizeMap[size]["wrapper"], className)}>
            {icon && (
                <span className={clsx(icon, sizeMap[size]["icon"])} />
            )}
            {children}
            {showClose && (
                <span
                    className={clsx("icon-[mingcute--close-line] opacity-80 cursor-pointer hover:opacity-100", sizeMap[size]["icon"])}
                    onClick={onClose}
                />
            )}
        </span>
    );
};

export default Badge;
