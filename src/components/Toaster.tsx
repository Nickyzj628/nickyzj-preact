import pubsub from "@/helpers/pubsub";
import { clsx } from "@/helpers/string";
import { $toasts } from "@/stores/toast";
import { useStore } from "@nanostores/preact";
import { useCallback, useEffect, useRef, useState } from "preact/hooks";

const Toast = ({ id, type, message, lifecycle }: Toast) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [translateY, setTranslateY] = useState(32);
    useEffect(() => {
        /**
         * 进入视图前：
         * 1. 往下位移一段距离，准备飞入
         * 2. 获取 DOM 高度，通知其他 Toast 向上位移，让出空间
         */
        if (lifecycle === "beforeEnter") {
            setTranslateY(32);

            const { current: container } = containerRef;
            if (!container) return;

            const height = container.clientHeight;
            pubsub.publish("newToastEntered", {
                id,
                height,
            });
            return;
        }

        /**
         * 从视图移除前：
         * 1. 往上位移一段距离
         */
        if (lifecycle === "beforeExit") {
            setTranslateY((prev) => prev - 32);
            return;
        }

        /**
         * 进入视图后：
         * 1. 重置位移距离
         * 2. 监听后续 Toast 进入事件，做相应位移
         */
        setTranslateY(0);

        const handleNewToast = (toast: Recordable) => {
            setTranslateY((prev) => prev - toast.height - 16);
        };

        const unsubscribe = pubsub.subscribe("newToastEntered", handleNewToast);
        return () => unsubscribe();
    }, [lifecycle]);

    const Icon = useCallback(() => {
        switch (type) {
            case "success":
                return <span class="icon-[mingcute--check-circle-line] shrink-0 size-6 text-green-500" />;
            case "info":
                return <span class="icon-[mingcute--information-line] shrink-0 size-6 text-blue-500" />;
            case "warning":
                return <span class="icon-[mingcute--warning-line] shrink-0 size-6 text-yellow-500" />;
            case "error":
                return <span class="icon-[mingcute--close-circle-line] shrink-0 size-6 text-red-500" />;
        }
    }, [type]);

    return (
        <div
            ref={containerRef}
            className={clsx(
                "absolute bottom-0 right-0 flex gap-3 p-3 rounded-xl shadow-xl bg-white transition dark:bg-zinc-800",
                lifecycle !== "entered" && "opacity-0",
            )}
            style={{
                transform: `translateY(${translateY}px)`,
            }}
        >
            <Icon />
            <span className="text-zinc-800 transition dark:text-zinc-200">
                {message}
            </span>
        </div>
    )
};

const Toaster = () => {
    const toasts = useStore($toasts);

    return (
        <div className="fixed bottom-3 right-3 z-40 w-80">
            {toasts.map((toast) => (
                <Toast key={toast.id} {...toast} />
            ))}
        </div>
    );
};

export default Toaster;