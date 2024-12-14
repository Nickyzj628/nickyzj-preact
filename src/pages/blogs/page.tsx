import Card from "@/components/Card";
import Loading from "@/components/Loading";
import { clsx, observe, removeSpaces } from "@/utils";
import { getBlogs, getImage } from "@/utils/network";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "preact/hooks";
import { Link } from "wouter-preact";

type DiffedBlog = Blog & { diff: string };

const Page = () => {
  const loadRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef(0);
  const [blogs, setBlogs] = useState<DiffedBlog[]>();

  useEffect(() => {
    if (!loadRef.current) return;

    const ob = observe(loadRef.current, async () => {
      const res = await getBlogs({
        page: ++pageRef.current,
      });
      setBlogs((prev) => [
        ...prev ?? [],
        ...res.blogs
          .filter((blog) => blog.visibility === 1)
          .map((blog) => ({ ...blog, diff: removeSpaces(dayjs(parseInt(blog.id, 36)).fromNow()) }))
      ]);
      return pageRef.current < res.pages;
    });

    return () => {
      setBlogs([]);
      ob.disconnect();
    };
  }, []);

  return <>
    <div className="grid flex-1 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
      {!blogs && (
        <Loading />
      )}
      {blogs && blogs.map((blog, i) => (
        <Link key={blog.id} href={`/blogs/${blog.id}`} className={clsx("aspect-[4/3]", i === 0 && "col-span-2 row-span-2")}>
          <Card
            image={getImage(`/Blogs/${blog.id}.webp`)}
            title={blog.title}
            description={blog.diff}
            className="size-full"
            titleClassName="text-base sm:text-lg text-pretty"
          />
        </Link>
      ))}
    </div>
    <div ref={loadRef} className="absolute bottom-80 pointer-events-none" />
  </>;
};

export default Page;