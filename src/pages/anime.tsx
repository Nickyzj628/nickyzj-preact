import Episodes from "@/components/anime/episodes";
import Video from "@/components/anime/video";
import Loading from "@/components/loading";
import Tabs from "@/components/tabs";
import { useSize, useTitle } from "@/hooks/dom";
import { useAnime, useRouter } from "@/hooks/store";
import NotFound from "@/pages/not-found";

enum Tab {
    Episodes,
    Danmakus,
    Comments,
};

const Page = () => {
    const router = useRouter();
    const { season, title } = router.params;
    const { ep: epRaw } = router.search;
    const ep = Number(epRaw) || 1;

    // 获取番剧详情
    const { data, error, isLoading } = useAnime(season, title);
    useTitle(data?.title);

    // Tab 高度 = 视频高度
    const [videoContainerRef, videoContainerSize] = useSize();

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
            <div
                ref={videoContainerRef}
                className="w-full xl:flex-1 aspect-video rounded-xl"
            >
                <Video
                    anime={data}
                    ep={ep}
                />
            </div>
            <Tabs
                defaultValue={Tab.Episodes}
                className="w-full xl:w-64 overflow-hidden"
                style={{
                    height: videoContainerSize.height,
                }}
            >
                <Tabs.List>
                    <Tabs.Trigger value={Tab.Episodes}>
                        选集
                    </Tabs.Trigger>
                    <Tabs.Trigger value={Tab.Danmakus}>
                        弹幕
                    </Tabs.Trigger>
                    <Tabs.Trigger value={Tab.Comments}>
                        评论
                    </Tabs.Trigger>
                </Tabs.List>
                <div className="flex flex-col gap-1.5 p-3 rounded-xl bg-neutral-100 overflow-y-auto transition dark:bg-neutral-700">
                    <Tabs.Content
                        value={Tab.Episodes}
                        as={(
                            <Episodes
                                list={data.episodes}
                                activeIndex={ep - 1}
                            />
                        )}
                    />
                    <Tabs.Content
                        value={Tab.Danmakus}
                        as={(
                            <span>🚧施工中...</span>
                        )}
                    />
                    <Tabs.Content
                        value={Tab.Comments}
                        as={(
                            <span>🚧施工中...</span>
                        )}
                    />
                </div>
            </Tabs>
        </>
    );
};

export default Page;