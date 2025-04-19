import { Figcaption, Figure } from "@/components/figure";
import { PAGE_SIZE } from "@/constants";
import { clsx } from "@/helpers/string";
import { fromNow } from "@/helpers/time";
import { useInViewport } from "@/hooks/observer";
import { useBlogs } from "@/hooks/store";
import { useEffect, useMemo, useState } from "preact/hooks";

const Skeletons = () => {
  return Array.from({ length: PAGE_SIZE }).map((_, i) => (
    <div key={i} className="aspect-[4/3] rounded-xl bg-neutral-200 transition dark:bg-neutral-800" />
  ));
};

const Page = ({ page = 1 }: Partial<BlogsParams>) => {
  // 本页数据
  const { data, error, isLoading, hasNext } = useBlogs({ page });

  const filteredBlogs = useMemo(() => {
    if (!data || !data.blogs) return [];
    return data.blogs.filter((blog) => blog.visibility === 1);
  }, [data]);

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
      {filteredBlogs.map((blog, i) => {
        const isLatestBlog = page === 1 && i === 0;
        return (
          <a
            key={blog.id}
            href={`/blogs/${blog.id}`}
            className={clsx("flex aspect-[4/3]", isLatestBlog && "md:col-span-2 md:row-span-2")}
          >
            <Figure className="size-full">
              <Figure.Image src={`/Blogs/${blog.id}.webp`} alt={blog.title} />
              <Figcaption>
                <Figcaption.Title className={clsx("text-base text-pretty", isLatestBlog && "md:text-lg")}>
                  {blog.title}
                </Figcaption.Title>
                <Figcaption.Description>
                  {fromNow(parseInt(blog.id, 36))}
                </Figcaption.Description>
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
    <div className="relative grid flex-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3">
      <Page page={1} />
    </div>
  );
};

export default Pages;