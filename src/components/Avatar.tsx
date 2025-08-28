import { getImage } from "@/helpers/network";
import { clsx } from "@/helpers/string";
import { useState } from "preact/hooks";

type Props = {
    name?: string;
    className?: string;
};

const Avatar = ({ name = "Guest", className }: Props) => {
    const [_name, setName] = useState(name);

    const onError = () => {
        if (_name === "Guest") return;
        setName("Guest");
    };

    return (
        <img
            src={getImage(`/Avatars/${_name}.webp`)}
            alt={_name}
            className={clsx("no-zoom size-12 rounded-full", className)}
            onError={onError}
        />
    );
};

export default Avatar;