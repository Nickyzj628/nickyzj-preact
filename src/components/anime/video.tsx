import { useSocket } from "@/contexts/socket";
import { getAnimeVideoByEP } from "@/helpers//network";
import { clsx } from "@/helpers/string";
import Danmaku from "danmaku/dist/esm/danmaku.dom.js";
import { useEffect, useRef } from "preact/hooks";

type Props = {
    anime: Anime;
    ep: number;
    /** 屏幕剩余高度 */
    restHeight: string;
};

const Video = ({
    anime,
    ep,
    restHeight = "100%",
}: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const socket = useSocket();

    /**
    * 弹幕处理逻辑
    */

    useEffect(() => {
        if (!socket) {
            return;
        }
        const danmaku = new Danmaku({
            container: containerRef.current,
        });
        socket.on("roomMessage", (message) => {
            danmaku.emit({
                text: message.text,
                style: {
                    padding: "2px 4px",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                },
            });
        });
    }, [socket]);

    /**
     * 视频控制逻辑
     */

    const loadVolume = () => {
        const prevVolume = localStorage.getItem("volume");
        videoRef.current.volume = parseFloat(prevVolume ?? "0.5");
    };

    const saveVolume = () => {
        localStorage.setItem("volume", String(videoRef.current.volume));
    };

    useEffect(() => {
        const { current: video } = videoRef;
        if (!video) return;

        // 恢复音量大小
        loadVolume();
        video.addEventListener("volumechange", saveVolume);

        return () => {
            video.removeEventListener("volumechange", saveVolume);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={clsx("relative w-full xl:flex-1 rounded-xl bg-black", !restHeight && "aspect-video")}
            style={{
                height: restHeight,
            }}
        >
            <video
                ref={videoRef}
                src={getAnimeVideoByEP(anime, ep)}
                controls
                className="absolute top-0 left-0 size-full"
            />
        </div>
    );
};

export default Video;