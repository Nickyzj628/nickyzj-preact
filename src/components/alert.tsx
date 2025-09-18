import { clsx } from "@/helpers/string";
import { CSSProperties, forwardRef } from "preact/compat";
import { MutableRef } from "preact/hooks";

const typeMap = {
    info: {
        wrapper: "bg-blue-50 text-blue-500 dark:bg-blue-950",
        icon: "icon-[mingcute--information-fill]",
    },
    success: {
        wrapper: "bg-green-50 text-green-500 dark:bg-green-950",
        icon: "icon-[mingcute--check-circle-fill]",
    },
    warning: {
        wrapper: "bg-yellow-50 text-yellow-500 dark:bg-yellow-950",
        icon: "icon-[mingcute--warning-fill]",
    },
    danger: {
        wrapper: "bg-red-50 text-red-500 dark:bg-red-950",
        icon: "icon-[mingcute--close-circle-fill]",
    },
};
type Type = keyof typeof typeMap;
export type AlertType = Type;

type Props = {
    type?: Type;
    title?: string;
    description?: string;
    actions?: { text: string, onClick: () => void }[];
    className?: string;
    style?: CSSProperties;
    showIcon?: boolean;
    showClose?: boolean;
    onClose?: () => void;
};
export type AlertProps = Props;

const Alert = forwardRef(({
    type = "info",
    title,
    description,
    actions = [],
    className,
    style,
    showIcon = true,
    showClose = false,
    onClose = () => void 0,
}: Props, ref: MutableRef<HTMLDivElement>) => {
    return (
        <div
            ref={ref}
            className={clsx(
                "flex gap-3 p-3 rounded-xl text-sm transition",
                typeMap[type]["wrapper"],
                className,
            )}
            style={style}
        >
            {showIcon && (
                <span className={clsx(
                    "size-5 shrink-0",
                    typeMap[type]["icon"]
                )} />
            )}
            <div>
                {title && (
                    <h4 className="text-current font-bold leading-none">{title}</h4>
                )}
                {description && (
                    <p className="mt-1">{description}</p>
                )}
                {actions.length > 0 && (
                    <div className="flex gap-4 mt-2">
                        {actions.map((action, index) => (
                            <button
                                key={index}
                                className="font-bold leading-loose"
                                onClick={action.onClick}
                            >
                                {action.text}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            {showClose && (
                <button className="shrink-0 ml-auto" onClick={onClose}>
                    <span className="icon-[mingcute--close-line] size-4" />
                </button>
            )}
        </div>
    );
});

export default Alert;
