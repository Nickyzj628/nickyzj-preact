import { Figcaption, Figure } from "@/components/figure";
import { PAGE_SIZE } from "@/constants";
import { clsx } from "@/helpers/string";
import { fromNow } from "@/helpers/time";
import { useInViewport } from "@/hooks/observer";
import { useAnimes } from "@/hooks/store";
import { useEffect, useState } from "preact/hooks";

const Skeletons = () => {
  return Array.from({ length: PAGE_SIZE }).map((_, i) => (
    <div key={i} className="aspect-[2/3] rounded-xl bg-neutral-200 transition dark:bg-neutral-800" />
  ));
};

const Page = ({ page = 1 }: Partial<AnimesParams>) => {
  // 本页数据
  const { data, error, isLoading, hasNext } = useAnimes({ page });

  // 滚动翻页
  const [nextPagerRef, isNextPagerInView] = useInViewport();
  const [renderNext, setRenderNext] = useState(false);

  useEffect(() => {
    if (!isNextPagerInView) return;
    setRenderNext(true);
  }, [isNextPagerInView]);

  if (isLoading) {
    return <Skeletons />;
  }

  if (error) {
    return null;
  }

  return (
    <>
      {data.animes.map((anime, i) => {
        const isBig = i === 0;
        return (
          <a
            key={anime.id}
            href={`/animes/${anime.id}`}
            className={clsx("flex aspect-[2/3]", isBig && "md:col-span-2 md:row-span-2")}
          >
            <Figure className="size-full">
              <Figure.Image src={`/Animes/${anime.id}.webp`} alt={anime.title} />
              <Figcaption>
                <Figcaption.Title className={clsx("text-base text-pretty", isBig && "md:text-lg")}>
                  {anime.title}
                </Figcaption.Title>
                <Figcaption.Description>
                  {anime.eps}话 / {fromNow(parseInt(anime.id, 36))}
                </Figcaption.Description>
                <Figcaption.Extra>
                  收录于{anime.cate}
                </Figcaption.Extra>
              </Figcaption>
            </Figure>
          </a>
        )
      })}
      {hasNext && !renderNext && (
        <button
          ref={nextPagerRef}
          className="size-full rounded-xl"
          aria-label="下一页"
          onClick={() => setRenderNext(true)}
        />
      )}
      {renderNext && (
        <Page page={page + 1} />
      )}
    </>
  );
};

const Pages = () => {
  return (
    <div className="relative grid flex-1 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-3">
      <Page page={1} />
    </div>
  );
};

export default Pages;