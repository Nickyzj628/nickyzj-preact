import { clsx } from "@/helpers/string";
import { useEffect, useRef } from "preact/hooks";

type EpisodesProps = {
  list?: string[];
  activeIndex?: number;
};

type EpisodeProps = {
  label: string;
  value: number;
  isActive: boolean;
};

const Episode = ({
  label,
  value,
  isActive
}: EpisodeProps) => {
  // 选中时进入视图
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (!isActive) return;
    ref.current?.scrollIntoView({
      block: "nearest",
    });
  }, [isActive]);

  return (
    <a
      ref={ref}
      href={`?ep=${value}`}
      className={clsx(
        "text-sm",
        isActive ? "dark:text-white" : "text-neutral-400 hover:text-black dark:hover:text-white"
      )}
    >
      {label}
    </a>
  );
};

const Episodes = ({
  list = [],
  activeIndex = 0,
}: EpisodesProps) => {
  return list.map((episode, i) => {
    const ep = i + 1;
    const isActive = i === activeIndex;

    return (
      <Episode
        key={ep}
        label={episode}
        value={ep}
        isActive={isActive}
      />
    );
  });
};

export default Episodes;