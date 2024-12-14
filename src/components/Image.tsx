import { useEffect, useState } from "preact/hooks";
import { getImage } from "../utils/network";

type Props = {
  src?: string;
  className?: string;
}

/** 处理`http`和`/`开头的图片地址，返回具有对应`src`的`img`元素 */
const Image = ({ src, className }: Props) => {
  const [mySrc, setMySrc] = useState("");

  const onError = () => {
    setMySrc(getImage("/default.webp"));
  };

  useEffect(() => {
    if (!src) {
      return;
    }
    if (src.startsWith("http")) {
      setMySrc(src);
    }
    else if (src.startsWith("/")) {
      setMySrc(getImage(src));
    }
  }, [src]);

  if (!mySrc) {
    return null;
  }

  return (
    <img
      src={mySrc}
      alt=""
      className={className}
      onError={onError}
    />
  );
};

export default Image;