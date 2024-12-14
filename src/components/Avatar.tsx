import { getImage } from "@/utils/network";
import { useState } from "preact/hooks";
import { twMerge } from "tailwind-merge";

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
      alt=""
      className={twMerge("no-zoom size-12 rounded-full", className)}
      onError={onError}
    />
  );
};

export default Avatar;