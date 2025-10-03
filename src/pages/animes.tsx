import { Figcaption, Figure } from "@/components/figure";
import Section from "@/components/section";
import { clsx } from "@/helpers/string";
import { fromNow } from "@/helpers/time";
import { useAnimes } from "@/hooks/store/use-anime";
import { useEffect, useRef, useState } from "preact/hooks";
import { useIntersection } from "react-use";
import { Link } from "wouter-preact";

const Page = ({
    page = 1,
    onLoaded = (hasNextPage: boolean) => void 0,
}) => {
    const { isLoading, error, data, hasNextPage } = useAnimes({ page });
    const isFirstPage = page === 1;

    const animes = data?.data ?? [];
    const season = animes[0]?.season ?? "";

    useEffect(() => {
        if (!isLoading) {
            onLoaded(hasNextPage);
        }
    }, [isLoading]);

    if (error) {
        return null;
    }

    return (
        <>
            <Section.Title className={clsx("col-span-full", isFirstPage ? "text-blue-300 dark:text-blue-600/60" : "mt-2 text-neutral-300 dark:text-neutral-600/60")}>
                {season}
            </Section.Title>
            {isLoading && (
                Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="aspect-[2/3] rounded-xl bg-neutral-200 transition dark:bg-neutral-800" />
                ))
            )}
            {animes.map((anime) => (
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
            ))}
        </>
    );
};

const Pages = () => {
    const [page, setPage] = useState(1);
    const [isLoadingPage, setIsLoadingPage] = useState(true);
    const [hasNextPage, setHasNextPage] = useState(true);

    const nextPage = () => {
        setPage((prev) => prev + 1);
        setIsLoadingPage(true);
    };

    const onPageLoaded = (hasNextPage: boolean) => {
        setHasNextPage(hasNextPage);
        setIsLoadingPage(false);
    };

    const pager = useRef<HTMLButtonElement>(null);
    const intersection = useIntersection(pager, {});
    useEffect(() => {
        if (isLoadingPage || !hasNextPage || !intersection?.isIntersecting) {
            return;
        }
        nextPage();
    }, [isLoadingPage, hasNextPage, intersection]);

    return (
        <div className="grid flex-1 grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-9 gap-3">
            {Array.from({ length: page }).map((_, i) => (
                <Page
                    key={i}
                    page={i + 1}
                    onLoaded={onPageLoaded}
                />
            ))}
            {hasNextPage && (
                <button
                    ref={pager}
                    aria-label="下一页"
                    className="size-full"
                    onClick={nextPage}
                />
            )}
        </div>
    );
};

export default Pages;
