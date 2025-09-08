import { Figcaption, Figure } from "@/components/figure";
import Section from "@/components/section";
import { clsx } from "@/helpers/string";
import { fromNow } from "@/helpers/time";
import { useInViewport } from "@/hooks/observer";
import { useAnimes } from "@/hooks/store/use-anime";
import { useEffect, useState } from "preact/hooks";
import { Link } from "wouter-preact";

const Skeletons = () => {
    return Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="aspect-[2/3] rounded-xl bg-neutral-200 transition dark:bg-neutral-800" />
    ));
};

const Page = ({ page = 1 }: Partial<AnimesParams>) => {
    // 本页数据
    const { data, error, isLoading, hasNext } = useAnimes({ page });
    const animes = data?.data ?? [];
    const isFirstPage = page === 1;

    // 滚动翻页
    const [nextPagerRef, isNextPagerInView] = useInViewport();
    const [isRenderNext, setIsRenderNext] = useState(false);

    useEffect(() => {
        if (!isNextPagerInView) return;
        setIsRenderNext(true);
    }, [isNextPagerInView]);

    if (isLoading) {
        return <Skeletons />;
    }

    if (error) {
        return null;
    }

    return (
        <>
            <Section.Title className={clsx("col-span-full text-neutral-300", !isFirstPage && "mt-2")}>
                {animes[0]?.season}
            </Section.Title>
            {animes.map((anime, i) => {
                return (
                    <Link
                        key={anime.title}
                        href={`/animes/${anime.season}/${anime.title}`}
                        className="flex aspect-[2/3]"
                    >
                        <Figure className="size-full">
                            <Figure.Image src={`/Animes/${anime.title}.webp`} alt={anime.title} />
                            <Figcaption>
                                <Figcaption.Title className="text-base text-pretty">
                                    {anime.title}
                                </Figcaption.Title>
                                <Figcaption.Description>
                                    共{anime.eps}话
                                </Figcaption.Description>
                                <Figcaption.Extra>
                                    {fromNow(anime.updated)}更新
                                </Figcaption.Extra>
                            </Figcaption>
                        </Figure>
                    </Link>
                )
            })}
            {hasNext && !isRenderNext && (
                <button
                    ref={nextPagerRef}
                    className="size-full rounded-xl"
                    aria-label="下一页"
                    onClick={() => setIsRenderNext(true)}
                />
            )}
            {isRenderNext && (
                <Page page={page + 1} />
            )}
        </>
    );
};

const Pages = () => {
    return (
        <div className="relative grid flex-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-3">
            <Page page={1} />
        </div>
    );
};

export default Pages;
