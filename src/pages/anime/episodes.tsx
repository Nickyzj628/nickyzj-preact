import { useSocket } from "@/contexts/socket";
import { clsx, qs } from "@/helpers/string";
import { useRouter } from "@/hooks/store";
import { $router } from "@/stores/router";
import { useEffect, useMemo, useRef } from "preact/hooks";

type EpisodesProps = {
    list?: string[];
    activeIndex?: number;
    disabled?: boolean;
};

type EpisodeProps = {
    label: string;
    value: number;
    isActive: boolean;
    disabled: boolean;
    onEpChange?: (ep: number, href: string) => void;
};

const Episode = ({
    label,
    value,
    isActive,
    disabled = false,
    onEpChange,
}: EpisodeProps) => {
    const router = useRouter();
    const href = useMemo(() => {
        return `${router.path}?${qs.stringify({ ...router.search, ep: value })}`;
    }, [router]);

    // 选中时进入视图
    const ref = useRef<HTMLAnchorElement>(null);
    useEffect(() => {
        if (!isActive) {
            return;
        }
        ref.current?.scrollIntoView({
            block: "nearest",
        });
    }, [isActive]);

    return (
        <a
            ref={ref}
            href={href}
            className={clsx(
                "text-sm",
                isActive ? "dark:text-white" : "text-neutral-400",
                disabled ? "pointer-events-none opacity-50" : "hover:text-black dark:hover:text-white",
            )}
            onClick={() => onEpChange?.(value, href)}
        >
            {label}
        </a>
    );
};

const Episodes = ({
    list = [],
    activeIndex = 0,
    disabled = false,
}: EpisodesProps) => {
    const socket = useSocket();

    const onEpChange = (ep: number, href: string) => {
        $router.open(href);
        socket.emit("epChange", ep);
    };

    return list.map((episode, i) => {
        const ep = i + 1;
        const isActive = i === activeIndex;

        return (
            <Episode
                key={ep}
                label={episode}
                value={ep}
                isActive={isActive}
                disabled={disabled}
                onEpChange={onEpChange}
            />
        );
    });
};

export default Episodes;