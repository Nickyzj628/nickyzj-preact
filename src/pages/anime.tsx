import Episodes from "@/components/anime/episodes";
import Room from "@/components/anime/room";
import Video from "@/components/anime/video";
import Loading from "@/components/loading";
import Tabs from "@/components/tabs";
import { SocketProvider } from "@/contexts/socket";
import { useIsMobile } from "@/hooks/device";
import { useTitle } from "@/hooks/dom";
import { useAnime, useRouter } from "@/hooks/store";
import NotFound from "@/pages/not-found";

enum Tab {
    Episodes,
    Room,
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

    /**
     * Tab 相关状态
     */

    const isMobile = useIsMobile();
    const restHeight = isMobile ? "50vh" : "calc(100vh - 24px - 64px - 12px)";
    const tabContentClassName = "flex flex-col gap-1.5 p-3 rounded-xl bg-neutral-100 overflow-y-auto transition dark:bg-neutral-700";

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
        <SocketProvider config={{ path: "/rooms" }}>
            <Video
                anime={data}
                ep={ep}
                restHeight={isMobile ? "" : restHeight}
            />
            <Tabs
                defaultValue={Tab.Room}
                className="w-full xl:w-64 overflow-hidden"
                style={{
                    height: restHeight,
                }}
            >
                <Tabs.List>
                    <Tabs.Trigger value={Tab.Episodes}>
                        选集
                    </Tabs.Trigger>
                    <Tabs.Trigger value={Tab.Room}>
                        聊天
                    </Tabs.Trigger>
                    <Tabs.Trigger value={Tab.Comments}>
                        评论区
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content
                    value={Tab.Episodes}
                    className={tabContentClassName}
                >
                    <Episodes
                        list={data.episodes}
                        activeIndex={ep - 1}
                    />
                </Tabs.Content>
                <Tabs.Content
                    value={Tab.Room}
                    className={tabContentClassName}
                >
                    <Room />
                </Tabs.Content>
                <Tabs.Content
                    value={Tab.Comments}
                    className={tabContentClassName}
                >
                    <span>🚧施工中...</span>
                </Tabs.Content>
            </Tabs>
        </SocketProvider>
    );
};

export default Page;