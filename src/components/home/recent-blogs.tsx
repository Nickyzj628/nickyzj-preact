import { getImage } from "@/helpers/network";
import { clsx } from "@/helpers/string";
import { fromNow } from "@/helpers/time";
import { useBlogs } from "@/hooks/store";
import { ComponentChildren } from "preact";
import { useMemo } from "preact/hooks";
import Loading from "../loading";
import Section from "../section";

type ContainerProps = {
  className?: string;
  bodyClassName?: string;
  children: ComponentChildren;
};

const Container = ({ className, bodyClassName, children }: ContainerProps) => {
  return (
    <Section className={clsx("aspect-[2/3] w-full sm:w-80 lg:w-96 mt-2", className)}>
      <Section.Title className="text-red-300">近期文章</Section.Title>
      <div className={clsx("flex flex-col flex-1 text-neutral-400 rounded-xl bg-neutral-100 overflow-hidden transition dark:text-neutral-500 dark:bg-neutral-800", bodyClassName)}>
        {children}
      </div>
    </Section>
  );
};

const RecentBlogs = () => {
  const { data, error, isLoading } = useBlogs();
  const blogs = (data?.data ?? []).slice(0, 3);

  if (isLoading) {
    return (
      <Container bodyClassName="items-center justify-center">
        <Loading />
      </Container>
    );
  }

  if (error) {
    return (
      <Container bodyClassName="items-center justify-center">
        <div>
          <div className="icon-[mingcute--pic-line] size-32" />
          <p className="text-center">{error.message}</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      {blogs.map((blog, i) => (
        <a
          key={blog.title}
          href={`/blogs/${blog.year}/${blog.title}`}
          className="flex flex-1 w-full bg-zinc-200 bg-center bg-cover"
          style={{
            backgroundImage: `url(${getImage(`/Blogs/${blog.title}.webp`)}), url(${getImage(`/default.webp`)})`,
          }}
        >
          <div
            className={clsx(
              "group flex flex-col items-center justify-center size-full p-3 transition",
              i === 0 ? "bg-black/40" : "bg-black/60 hover:bg-black/40",
            )}
          >
            <h4 className={clsx("text-balance text-center", i === 0 ? "text-white" : "text-neutral-400 group-hover:text-white")}>
              {blog.title}
            </h4>
            <span className={clsx("text-sm transition", i === 0 ? "text-white" : "text-neutral-400 group-hover:text-white")}>
              {fromNow(blog.updated)}更新
            </span>
          </div>
        </a>
      ))}
    </Container>
  );
};

export default RecentBlogs;