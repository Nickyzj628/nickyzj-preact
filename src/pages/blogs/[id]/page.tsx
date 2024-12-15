import { AlignArrowLeftIcon } from "@/assets/icons";
import Image from "@/components/Image";
import Loading from "@/components/Loading";
import Toggle from "@/components/Toggle";
import { useRequest } from "@/hooks/useRequest";
import useZoom from "@/hooks/useZoom";
import { clsx, removeSpaces, setTitle } from "@/utils";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "preact/hooks";
import { Redirect, useParams } from "wouter-preact";
import "./hljs.css";

type Catalog = {
  id: string;
  text: string;
  style: Record<string, any>;
};

const Page = () => {
  const { id } = useParams();

  // 获取文章详情
  const { data: blog, isLoading, error } = useRequest<BlogResp>(`/blogs/${id}`);
  useEffect(() => {
    if (!blog) return;
    setTitle(blog.title);
  }, [blog]);

  // 锚点、目录
  const [isShowCatalog, setIsShowCatalog] = useState(window.innerWidth > 1280);
  const [catalog, setCatalog] = useState<Catalog[]>([]);
  useEffect(() => {
    if (!blog?.content) return;

    // 锚点导航
    if (window.location.hash) {
      const a = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      a?.scrollIntoView();
    }

    // 生成目录
    const headers = blog.content.match(/<h\d.*>.*<\/h\d>/g);
    if (!headers) return;
    const levels = headers.map((header) => +header[2]);
    const baseLevel = Math.min(...levels);
    const result: Catalog[] = [];
    headers.forEach((header, i) => {
      const level = levels[i];
      const id = header.match(/(?<=id=").+(?=">)/)?.[0];
      if (!id) return;
      result.push({
        id,
        text: header.slice(10 + id.length, -5),
        style: { transform: `translateX(${(level - baseLevel) * 8}px)` },
      });
    });
    setCatalog(result);
  }, [blog]);

  // 图片缩放
  const articleRef = useRef<HTMLDivElement>(null);
  useZoom(articleRef, {
    reloadDeps: [blog],
  });

  if (error) return <Redirect to="/blogs" />;

  if (isLoading && !blog) return <Loading />;

  if (!blog) return <Redirect to="/error" />;

  return <>
    {/* banner */}
    <figure className="relative w-full aspect-[18/9] sm:aspect-[28/9] lg:aspect-[32/9] xl:aspect-[40/9] rounded-xl overflow-hidden">
      <Image src={`/Blogs/${id}.webp`} className="size-full" />
      <figcaption className="absolute top-0 left-0 flex flex-col items-center justify-center gap-0.5 size-full md:pb-16 p-3 bg-black/50">
        <h1 className="mb-3 text-white text-balance text-center">{blog.title}</h1>
        <span className="text-sm text-zinc-200">
          {removeSpaces(dayjs(parseInt(blog.id ?? "", 36)).fromNow())}创建 / {removeSpaces(dayjs(blog.updated).fromNow())}更新
        </span>
        <span className="text-sm text-zinc-200">全篇约{blog.minutes ?? 0}分钟</span>
      </figcaption>
    </figure>

    {/* article */}
    <article
      ref={articleRef}
      className="prose prose-zinc prose-img:inline prose-img:max-h-96 prose-img:mr-3 prose-img:mt-0 prose-img:mb-3 prose-img:shadow prose-img:rounded-xl prose-pre:rounded-xl md:-translate-y-20 p-5 mx-auto rounded-xl shadow-xl bg-white overflow-x-hidden transition dark:prose-invert prose-blockquote:dark:border-s-zinc-500 prose-pre:dark:bg-zinc-900 dark:bg-zinc-700"
      dangerouslySetInnerHTML={{ __html: blog.content ?? "" }}
    />

    {/* gadgets */}
    <div className="fixed bottom-3 right-6 flex flex-col items-end gap-3">
      {/* catalog */}
      <div className={clsx("max-h-96 max-w-72 p-3 rounded-xl shadow-lg bg-white overflow-x-hidden overflow-y-auto transition-all dark:bg-zinc-700", !isShowCatalog && "invisible opacity-0")}>
        {catalog.map((header) => (
          <a href={`#${header.id}`} style={header.style} className="block text-zinc-700 truncate transition dark:text-zinc-200">
            {header.text}
          </a>
        ))}
      </div>
      <Toggle value={isShowCatalog} onChange={setIsShowCatalog} />
      {/* back top */}
      <button onClick={() => window.scrollTo(0, 0)}>
        <AlignArrowLeftIcon className="size-5 rotate-90" />
      </button>
    </div>
  </>
};

export default Page;