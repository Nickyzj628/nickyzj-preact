import "@/assets/hljs.css";
import Image from "@/components/image";
import Loading from "@/components/loading";
import Toggle from "@/components/toggle";
import { clsx } from "@/helpers/string";
import { fromNow } from "@/helpers/time";
import { useTitle } from "@/hooks/dom";
import { useZoom } from "@/hooks/observer";
import { useBlog, useRouter } from "@/hooks/store";
import NotFound from "@/pages/not-found";
import { useEffect, useMemo, useState } from "preact/hooks";

const Page = () => {
  const router = useRouter();
  const { id } = router.params;

  // 获取文章详情
  const { data, error, isLoading } = useBlog(id);
  useTitle(data?.title);

  // 生成目录
  const [isCatalogVisible, setIsCatalogVisible] = useState(window.innerWidth > 1152);
  const catalog = useMemo(() => {
    if (!data || !data.content) return [];

    const headers = data.content.match(/<h\d.*>.*<\/h\d>/g);
    if (!headers) return [];

    const levels = headers.map((header) => Number(header[2]));
    const baseLevel = Math.min(...levels);
    return headers.map((header, i) => {
      const level = levels[i];
      const id = header.match(/(?<=id=").+(?=">)/)?.[0];
      if (!id) return;
      return {
        id,
        text: header.slice(10 + id.length, -5),
        style: { marginLeft: (level - baseLevel) * 8 },
      };
    }).filter(Boolean);
  }, [data]);

  // 锚点跳转
  useEffect(() => {
    if (isLoading || !router.hash) return;

    const a = document.getElementById(
      decodeURIComponent(router.hash).replace("#", "")
    );
    if (!a) return;

    a.scrollIntoView();
  }, [isLoading, router.hash]);

  // 图片缩放
  const [articleRef] = useZoom();

  if (isLoading) {
    return (
      <div className="absolute inset-0 m-auto flex flex-col items-center gap-1 size-fit text-neutral-400 transition dark:text-neutral-500">
        <Loading />
      </div>
    );
  };

  if (error) {
    return <NotFound />;
  }

  return (
    <>
      {/* banner */}
      <figure className="relative w-full aspect-[18/9] sm:aspect-[28/9] lg:aspect-[32/9] xl:aspect-[40/9] rounded-xl overflow-hidden">
        <Image
          src={`/Blogs/${id}.webp`}
          alt={data.title}
          className="size-full"
        />
        <figcaption className="absolute top-0 left-0 flex flex-col items-center justify-center gap-0.5 size-full md:pb-16 p-3 bg-black/50">
          <h1 className="mb-3 text-white text-balance text-center">
            {data.title}
          </h1>
          <span className="text-sm text-neutral-200">
            {fromNow(parseInt(data.id, 36))}创建 / {fromNow(data.updated)}更新
          </span>
          <span className="text-sm text-neutral-200">
            全篇约{data.minutes ?? 0}分钟 / {data.minutes * 1500}字符
          </span>
        </figcaption>
      </figure>

      {/* article */}
      <article
        ref={articleRef}
        className="prose prose-neutral prose-img:inline prose-img:max-h-96 prose-img:mr-3 prose-img:mt-0 prose-img:mb-3 prose-img:shadow prose-img:rounded-xl prose-pre:rounded-xl md:-translate-y-20 p-5 mx-auto rounded-xl shadow-xl bg-white overflow-x-hidden transition dark:prose-invert prose-blockquote:dark:border-s-neutral-500 prose-pre:dark:bg-neutral-900 dark:bg-neutral-800"
        dangerouslySetInnerHTML={{ __html: data.content ?? "" }}
      />

      {/* gadgets */}
      <div className="fixed bottom-3 right-6 flex flex-col items-end gap-3">
        {/* catalog */}
        <div
          className={clsx(
            "max-h-96 max-w-72 p-3 rounded-xl shadow-lg bg-white overflow-x-hidden overflow-y-auto transition-all dark:bg-neutral-700",
            !isCatalogVisible && "invisible opacity-0"
          )}
        >
          {catalog.map((header) => (
            <a
              key={header.id}
              href={`#${header.id}`}
              style={header.style}
              className="block text-neutral-700 truncate transition dark:text-neutral-200"
            >
              {header.text}
            </a>
          ))}
        </div>
        <Toggle value={isCatalogVisible} onChange={setIsCatalogVisible} />
        {/* back top */}
        <button onClick={() => window.scrollTo(0, 0)}>
          <span className="icon-[mingcute--align-arrow-left-line] size-5 rotate-90" />
        </button>
      </div >
    </>
  )
};

export default Page;