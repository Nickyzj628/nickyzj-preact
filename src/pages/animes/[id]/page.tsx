import Loading from "@/components/Loading";
import Tabs from "@/components/Tabs";
import { useRequest } from "@/hooks/useRequest";
import { clsx, setTitle } from "@/utils";
import { getAnimeVideo, stringToQuery } from "@/utils/network";
import { useEffect, useMemo, useRef } from "preact/hooks";
import { Link, Redirect, useParams, useSearch } from "wouter-preact";

const Page = () => {
  const { id } = useParams();
  const search = useSearch();

  const ep = useMemo<number>(() => stringToQuery(search).ep ?? 1, [search]);

  // 获取番剧详情
  const { data: anime, isLoading, error } = useRequest<Anime>(`/animes/${id}`);
  useEffect(() => {
    if (!anime) return;
    setTitle(`${anime.title} 第${ep}话`);
  }, [ep, anime]);

  // 播放器事件
  const playerRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    player.volume = localStorage.volume || "0.5";
    player.onvolumechange = () => {
      localStorage.volume = player.volume;
    };
  }, [anime]);

  if (error) return <Redirect to="/blogs" />;

  if (isLoading && !anime) return <Loading />;
  
  if (!anime) return <Redirect to="/error" />;

  return <>
    <video
      ref={playerRef}
      src={getAnimeVideo(anime, ep)}
      controls
      className="flex-1 2xl:h-full bg-black"
    />
    <Tabs
      names={["选集", "聊天"]}
      className="w-full xl:w-56 2xl:w-72 max-h-96 p-1.5 rounded-xl bg-zinc-100 transition dark:bg-zinc-700"
      tabClassName="p-0"
    >
      <div className="flex flex-col gap-1.5 overflow-y-auto">
        {anime.episodes?.map((episode, i) => (
          <Link
            href={`?ep=${i + 1}`}
            className={clsx(
              "text-sm transition hover:duration-0",
              i + 1 === ep ? "text-zinc-800 dark:text-zinc-200" : "text-zinc-400 hover:text-zinc-800 dark:text-zinc-500",
            )}
          >
            {episode}
          </Link>
        ))}
      </div>
      <div>维护中！</div>
    </Tabs>
  </>;
};

export default Page;