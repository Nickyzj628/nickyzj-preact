import { getAnimeVideoByEP } from "@/helpers//network";
import { useEffect, useRef } from "preact/hooks";

type Props = {
    anime: Anime;
    ep: number;
}

const Video = ({
    anime,
    ep,
}: Props) => {
    const videoRef = useRef<HTMLVideoElement>(null);

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
        <video
            ref={videoRef}
            src={getAnimeVideoByEP(anime, ep)}
            controls
            className="size-full"
        />
    );
};

export default Video;