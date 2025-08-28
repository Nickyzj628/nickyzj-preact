import { getImage } from "@/helpers/network";
import { useEffect, useState } from "preact/hooks";

type Props = {
    src: string;
    alt?: string;
    className?: string;
}

/** 处理`http`和`/`开头的图片地址，返回具有对应`src`的`img`元素 */
const Image = ({ src, alt, className }: Props) => {
    const [_src, setSrc] = useState("");

    const onError = () => {
        setSrc(getImage("/default.webp"));
    };

    useEffect(() => {
        if (!src) {
            return;
        }
        if (src.startsWith("http")) {
            setSrc(src);
        } else if (src.startsWith("/")) {
            setSrc(getImage(src));
        } else if (src.startsWith("data:image/")) {
            setSrc(src);
        }
    }, [src]);

    if (!_src) {
        return null;
    }

    return (
        <img
            src={_src}
            alt={alt}
            className={className}
            onError={onError}
        />
    );
};

export default Image;