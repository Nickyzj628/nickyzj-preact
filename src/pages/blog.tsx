import "@/assets/hljs.css";
import Loading from "@/components/loading";
import Toggle from "@/components/toggle";
import { setTitle } from "@/helpers/dom";
import { getImage } from "@/helpers/network";
import { clsx } from "@/helpers/string";
import { useZoom } from "@/hooks/observer";
import { useBlog } from "@/hooks/store/use-blog";
import NotFound from "@/pages/not-found";
import { useEffect, useMemo, useState } from "preact/hooks";
import { useHash } from "react-use";
import { useParams } from "wouter-preact";

type Params = {
    id: string;
    year: string;
};

const Page = () => {
    const { id, year } = useParams<Params>();
    const [hash] = useHash();

    // 获取文章详情
    const { data, error, isLoading } = useBlog(parseInt(year), id);
    useEffect(() => {
        if (data?.title) {
            setTitle(data.title);
        }
    }, [data]);

    // 生成目录
    const [isCatalogVisible, setIsCatalogVisible] = useState(window.innerWidth > 1152);
    const catalog = useMemo(() => {
        if (!data || !data.content) {
            return [];
        }

        const headers = data.content.match(/<h\d.*>.*<\/h\d>/g);
        if (!headers) {
            return [];
        }

        const levels = headers.map((header) => Number(header[2]));
        const baseLevel = Math.min(...levels);
        return headers.map((header, i) => {
            const level = levels[i];
            const id = header.match(/(?<=id=").+(?=">)/)?.[0];
            if (!id) {
                return;
            }

            return {
                id,
                text: header.slice(10 + id.length, -5),
                style: { marginLeft: (level - baseLevel) * 8 },
            };
        }).filter((header) => !!header);
    }, [data]);

    // 锚点跳转
    useEffect(() => {
        if (isLoading || !hash) {
            return;
        }

        const a = document.getElementById(
            decodeURIComponent(hash).replace("#", "")
        );
        a?.scrollIntoView();
    }, [isLoading, hash]);

    // 图片缩放
    const [articleRef] = useZoom();

    if (isLoading) return (
        <div className="absolute inset-0 m-auto flex flex-col items-center gap-1 size-fit text-neutral-400 transition dark:text-neutral-500">
            <Loading />
        </div>
    );

    if (error) return (
        <NotFound />
    );

    return (
        <>
            {/* banner */}
            <div
                className="absolute top-0 left-0 w-full aspect-square sm:aspect-[18/9] lg:aspect-[21/9] xl:aspect-[32/9] rounded-xl bg-cover bg-center bg-no-repeat bg-fixed overflow-hidden"
                style={{
                    backgroundImage: `url(${getImage(`/Blogs/${data.title}.webp`)})`
                }}
            >
                <div className="absolute top-0 left-0 size-full rounded-xl backdrop-brightness-50 backdrop-blur-sm" />
            </div>
            <div className="relative flex flex-col items-center gap-0.5 w-full mt-8 sm:mt-16 mb-4 sm:mb-8 p-3">
                <h1 className="mb-3 text-white text-balance text-center">
                    {data.title}
                </h1>
                <span className="text-sm text-neutral-200">
                    创建于{year}年
                </span>
                <span className="text-sm text-neutral-200">
                    全篇约{data.minutes ?? 0}分钟
                </span>
            </div>

            {/* article */}
            <article
                ref={articleRef}
                className="relative prose prose-neutral prose-img:inline prose-img:max-h-96 prose-img:mr-3 prose-img:mt-0 prose-img:mb-3 prose-img:shadow prose-img:rounded-xl prose-pre:rounded-xl p-5 mx-auto rounded-xl shadow-xl bg-white overflow-x-hidden transition dark:prose-invert prose-blockquote:dark:border-s-neutral-500 prose-pre:dark:bg-neutral-900 dark:bg-neutral-800"
                dangerouslySetInnerHTML={{ __html: data.content ?? "" }}
            />

            {/* gadgets */}
            <div className="fixed bottom-3 right-6 flex flex-col items-end gap-3">
                {/* catalog */}
                <div className={clsx(
                    "flex flex-col gap-2 w-48 max-h-96 p-3 rounded-xl shadow-lg bg-white overflow-x-hidden overflow-y-auto transition-all dark:bg-neutral-700",
                    !isCatalogVisible && "invisible opacity-0"
                )}>
                    {catalog.map((header) => {
                        const isHeadline = header.style.marginLeft === 0;
                        return (
                            <a
                                key={header.id}
                                href={`#${header.id}`}
                                style={header.style}
                                className={clsx(
                                    "relative block shrink-0 truncate text-sm text-neutral-500 transition duration-150 hover:duration-0 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100",
                                    isHeadline && "pl-3 before:absolute before:top-0 before:bottom-0 before:left-0 before:my-auto before:w-1 before:h-4 before:rounded-full before:bg-current"
                                )}
                            >
                                {header.text}
                            </a>
                        );
                    })}
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
