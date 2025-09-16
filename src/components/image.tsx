import { getImage } from "@/helpers/network";
import { useEffect, useState } from "preact/hooks";

type Props = {
    /** 支持 WebDav 相对路径、base64、HTTP 地址 */
    src: string;
    alt?: string;
    className?: string;
};

const Image = ({ src, alt, className }: Props) => {
    const [fullSrc, setFullSrc] = useState("");

    const setDefaultSrc = () => {
        setFullSrc(getImage("/default.webp"));
    };

    useEffect(() => {
        if (!src) {
            return;
        }

        if (src.startsWith("http")) {
            setFullSrc(src);
        } else if (src.startsWith("data:image/")) {
            setFullSrc(src);
        } else if (src.startsWith("/")) {
            setFullSrc(getImage(src));
        } else {
            setDefaultSrc();
        }
    }, [src]);

    if (!fullSrc) {
        return null;
    }

    return (
        <img
            src={fullSrc}
            alt={alt}
            className={className}
            onError={setDefaultSrc}
        />
    );
};

export default Image;
