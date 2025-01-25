import Card from "@/components/Card";
import { useHitBottom, useSize, useWindowSize } from "@/hooks/dom";
import { removeSpaces } from "@/utils";
import { getAnimes, getImage } from "@/utils/network";
import dayjs from "dayjs";
import { useContainerPosition, useMasonry, usePositioner, useResizeObserver, useScroller } from "masonic";
import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { Link } from "wouter-preact";

type DiffedAnime = Anime & { diff: string };

type AnimeMasonryItem = {
  index: number;
  width: number;
  data: DiffedAnime;
};

const Anime = ({ index, width, data: anime }: AnimeMasonryItem) => {
  const height = useMemo(() => {
    if (index % 2) return width / 0.65;
    return width / 0.7;
  }, [width]);

  if (!anime.title) return (
    <div
      className="flex bg-zinc-100 rounded-xl"
      style={{ height }}
    />
  )

  return (
    <Link href={`/animes/${anime.id}`} className="flex" style={{ height }}>
      <Card
        image={getImage(`/animes/${anime.id}.webp`)}
        title={anime.title}
        description={`第${anime.eps}话`}
        extra={`${anime.diff}更新`}
        titleClassName="text-base sm:text-lg text-pretty"
      />
    </Link>
  );
};

const Page = () => {
  // @ts-ignore
  const [animes, setAnimes] = useState<DiffedAnime[]>(Array
    .from({ length: 12 })
    .map((_, index) => ({
      id: index,
    }))
  );

  // 瀑布流定位
  const containerRef = useRef<HTMLDivElement>(null);
  const { width: windowWidth } = useWindowSize();
  const columnCount = useMemo(() => {
    if (windowWidth < 640) return 2;
    if (windowWidth < 768) return 3;
    if (windowWidth < 1024) return 4;
    if (windowWidth < 1280) return 5;
    if (windowWidth < 1536) return 5;
    if (windowWidth < 1728) return 6;
    return 7;
  }, [windowWidth]);
  const { width, height } = useSize(containerRef);
  const { offset } = useContainerPosition(containerRef, [height]);
  const { scrollTop, isScrolling } = useScroller(offset);
  const positioner = usePositioner({
    width,
    columnCount,
    columnGutter: 12,
    rowGutter: 12,
  });
  const resizeObserver = useResizeObserver(positioner);

  // 使用瀑布流
  const masonry = useMasonry({
    containerRef,
    scrollTop,
    isScrolling,
    height,
    positioner,
    resizeObserver,
    items: animes,
    itemKey: (anime) => anime.id,
    render: Anime,
  });

  // 滚动翻页
  const isHitBottom = useHitBottom(containerRef, {
    thresholdPercent: 0.8,
  });
  const pageRef = useRef(0);
  const pagesRef = useRef(1);
  useEffect(() => {
    const { current: page } = pageRef;
    const { current: pages } = pagesRef;
    if (!isHitBottom && page > 0) return;
    if (page === pages) return;

    getAnimes({ page: page + 1, }).then((res) => {
      pageRef.current = res.page;
      pagesRef.current = res.pages;
      const newAnimes = res.animes.map((anime) => ({
        ...anime,
        diff: removeSpaces(dayjs(anime.updated).fromNow())
      }));
      if (page === 0) setAnimes(newAnimes);
      else setAnimes((prev) => [
        ...prev ?? [],
        ...newAnimes,
      ]);
    });
  }, [isHitBottom]);

  // 清理翻页参数
  useEffect(() => {
    return () => {
      pageRef.current = 0;
      pagesRef.current = 1;
      setAnimes([]);
    };
  }, []);

  return masonry;
};

export default Page;