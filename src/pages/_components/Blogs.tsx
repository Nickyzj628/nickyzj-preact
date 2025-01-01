import { AlbumIcon } from "@/assets/icons";
import Loading from "@/components/Loading";
import Title from "@/components/Title";
import { useRequest } from "@/hooks/useRequest";
import { clsx, removeSpaces } from "@/utils";
import { getImage } from "@/utils/network";
import dayjs from "dayjs";
import { ComponentChildren } from "preact";
import { useMemo } from "preact/hooks";
import { twMerge } from "tailwind-merge";
import { Link } from "wouter-preact";
import styles from "./Blogs.module.css";

type BlogsProps = {
  className?: string;
};

type LayoutProps = {
  className?: string;
  bodyClassName?: string;
  children?: ComponentChildren;
};

const Layout = ({ className, bodyClassName, children }: LayoutProps) => {
  return (
    <div className={twMerge(styles.layout, "flex flex-col gap-1.5 aspect-[2/3]", className)}>
      <Title className="text-red-300">近期文章</Title>
      <div className={twMerge("group relative flex flex-col flex-1 rounded-xl bg-zinc-100 text-zinc-400 overflow-hidden transition dark:text-zinc-500 dark:bg-zinc-800", bodyClassName)}>
        {children}
      </div>
    </div>
  );
};

const Blogs = ({ className }: BlogsProps) => {
  const { data, loading, error } = useRequest<BlogsResp>("/blogs");

  const filteredBlogs = useMemo(() => {
    if (!data) return [];
    return data.blogs
      .filter((blog) => blog.visibility === 1)
      .slice(0, 3);
  }, [data]);

  const isEmpty = filteredBlogs.length === 0;

  if (error) return (
    <Layout className={className} bodyClassName="items-center justify-center">
      <figcaption className="text-center">
        <AlbumIcon className="w-32" />
        <figure>{error.message}</figure>
      </figcaption>
    </Layout>
  );

  if (loading) return (
    <Layout className={className} bodyClassName="items-center justify-center">
      <Loading />
    </Layout>
  );

  if (isEmpty) return (
    <Layout className={className} bodyClassName="items-center justify-center">
      <figcaption className="text-center">
        <AlbumIcon className="w-32" />
        <figure>空空如也</figure>
      </figcaption>
    </Layout>
  );

  return (
    <Layout className={className}>
      {filteredBlogs.map((blog, i) => (
        <Link
          key={blog.id}
          href={`/blogs/${blog.id}`}
          className={clsx("block flex-1 w-full bg-zinc-200 bg-center bg-cover hover:no-underline", i === 0 ? "brightness-100" : "brightness-50 hover:brightness-100")}
          style={{ backgroundImage: `url(${getImage(`/blogs/${blog.id}.webp`)}), url(${getImage(`/default.webp`)})` }}
        >
          <div className={clsx("flex flex-col items-center justify-center size-full p-3 bg-black/40")}>
            <h4 className="text-balance text-center text-white">
              {blog.title}
            </h4>
            <span className="text-sm text-white transition dark:text-zinc-200">
              {removeSpaces(dayjs(parseInt(blog.id, 36)).fromNow())}
            </span>
          </div>
        </Link>
      ))}
    </Layout>
  );
};

export default Blogs;