import Loading from "@/components/loading";
import Tabs from "@/components/tabs";
import { SocketProvider } from "@/contexts/socket";
import { useTitle } from "@/hooks/dom";
import { useAnime, useRouter } from "@/hooks/store";
import Episodes from "@/pages/anime/episodes";
import Room from "@/pages/anime/room";
import Video from "@/pages/anime/video";
import NotFound from "@/pages/not-found";
import { useState } from "preact/hooks";

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

    const tabContentClassName = "flex flex-col gap-1.5 p-3 rounded-xl bg-neutral-100 overflow-y-auto transition dark:bg-neutral-700";

    /**
     * 房间相关状态
     */

    const [isHost, setIsHost] = useState(true);

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
                isHost={isHost}
            />
            <Tabs
                defaultValue={Tab.Episodes}
                className="w-full xl:w-64 max-h-96 overflow-hidden"
            >
                <Tabs.List>
                    <Tabs.Trigger value={Tab.Episodes}>
                        选集
                    </Tabs.Trigger>
                    <Tabs.Trigger value={Tab.Room}>
                        聊天
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content
                    value={Tab.Episodes}
                    className={tabContentClassName}
                >
                    <Episodes
                        list={data.episodes}
                        activeIndex={ep - 1}
                        disabled={!isHost}
                    />
                </Tabs.Content>
                <Tabs.Content
                    value={Tab.Room}
                    className={tabContentClassName}
                >
                    <Room
                        isHost={isHost}
                        onChangeHost={setIsHost}
                    />
                </Tabs.Content>
            </Tabs>
        </SocketProvider>
    );
};

export default Page;