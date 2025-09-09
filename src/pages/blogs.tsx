import { Figcaption, Figure } from "@/components/figure";
import Section from "@/components/section";
import { clsx } from "@/helpers/string";
import { fromNow } from "@/helpers/time";
import { useBlogs } from "@/hooks/store/use-blog";
import { useEffect, useRef, useState } from "preact/hooks";
import { useIntersection } from "react-use";
import { Link } from "wouter-preact";

const Page = ({
    page = 1,
    onLoaded = (hasNextPage: boolean) => void 0,
}) => {
    const { isLoading, error, data, hasNextPage } = useBlogs({ page });
    const isFirstPage = page === 1;

    const blogs = data?.data ?? [];
    const year = blogs[0]?.year ?? (new Date().getFullYear() - page + 1);

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
            <Section.Title className={clsx("col-span-full text-neutral-300", !isFirstPage && "mt-2")}>
                {`${year}年`}
            </Section.Title>
            {isLoading && (
                Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="aspect-[4/3] rounded-xl bg-neutral-200 transition dark:bg-neutral-800" />
                ))
            )}
            {blogs.map((blog) => (
                <Link
                    key={blog.title}
                    href={`/blogs/${blog.year}/${blog.title}`}
                    className="flex aspect-[4/3]"
                >
                    <Figure className="size-full">
                        <Figure.Image src={`/Blogs/${blog.title}.webp`} alt={blog.title} />
                        <Figcaption>
                            <Figcaption.Title className="text-base text-pretty">
                                {blog.title}
                            </Figcaption.Title>
                            <Figcaption.Extra>
                                {fromNow(blog.updated)}更新
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
        <div className="relative grid flex-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
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
                    className="size-full rounded-xl"
                    onClick={nextPage}
                />
            )}
        </div>
    );
};

export default Pages;
