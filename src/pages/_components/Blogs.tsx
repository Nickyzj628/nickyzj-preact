import Loading from "@/components/Loading";
import Title from "@/components/Title";
import { useRequest } from "@/hooks/useRequest";
import { clsx, removeSpaces } from "@/utils";
import { getImage } from "@/utils/network";
import dayjs from "dayjs";
import { useMemo } from "preact/hooks";
import { Link } from "wouter-preact";
import styles from "./Blogs.module.css";

type Props = {
  className?: string;
};

const Blogs = ({ className }: Props) => {
  const { data, isLoading, error } = useRequest<BlogsResp>("/blogs");

  const filteredBlogs = useMemo(() => {
    if (!data) return [];
    return data.blogs
      .filter((blog) => blog.visibility === 1)
      .slice(0, 3);
  }, [data]);

  if (error) return null;

  return (
    <div className={clsx(styles.container, "flex flex-col gap-1.5 aspect-[2/3]", className)}>
      <Title className="text-red-300">近期文章</Title>
      <div className="group relative flex-1 rounded-xl overflow-hidden">
        {!data && isLoading && (
          <Loading className="rounded-xl bg-zinc-100 dark:bg-zinc-800" />
        )}
        {filteredBlogs.map((blog, i) => (
          <Link
            key={blog.id}
            href={`/blogs/${blog.id}`}
            className={clsx("block w-full h-1/3 bg-zinc-200 bg-center bg-cover hover:no-underline", i === 0 ? "brightness-100" : "brightness-50 hover:brightness-100")}
            style={{ backgroundImage: `url(${getImage(`/blogs/${blog.id}.webp`)})` }}
          >
            <div className={clsx("flex flex-col items-center justify-center size-full bg-black/40")}>
              <h4 className="text-white">{blog.title}</h4>
              <span className="text-sm text-white">{removeSpaces(dayjs(parseInt(blog.id, 36)).fromNow())}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blogs;