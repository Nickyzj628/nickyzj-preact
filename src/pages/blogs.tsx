import { Figcaption, Figure } from "@/components/figure";
import Section from "@/components/section";
import { clsx } from "@/helpers/string";
import { fromNow } from "@/helpers/time";
import { useInViewport } from "@/hooks/observer";
import { useBlogs } from "@/hooks/store/use-blog";
import { useEffect, useState } from "preact/hooks";
import { Link } from "wouter-preact";

const Skeletons = () => {
    return Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="aspect-[4/3] rounded-xl bg-neutral-200 transition dark:bg-neutral-800" />
    ));
};

const Page = ({ page = 1 }: Partial<BlogsParams>) => {
    // 本页数据
    const { data, error, isLoading, hasNext } = useBlogs({ page });
    const blogs = data?.data ?? [];
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
                {blogs[0]?.year}年
            </Section.Title>
            {blogs.map((blog, i) => {
                return (
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
        <div className="relative grid flex-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3">
            <Page page={1} />
        </div>
    );
};

export default Pages;
