import Card from "@/components/Card";
import Loading from "@/components/Loading";
import Timeline from "@/components/Timeline";
import Title from "@/components/Title";
import { useRequest } from "@/hooks/useRequest";
import { clsx } from "@/utils";
import { getImage } from "@/utils/network";
import dayjs from "dayjs";
import { useCallback, useMemo } from "preact/hooks";
import { Link } from "wouter-preact";

type GroupedAnimes = (Anime & { diffDay: number })[][];

type Props = {
  className?: string;
};

const DAY_LOCALE_STRING = ["今天", "昨天", "前天"];

const Animes = ({ className }: Props) => {
  const { data, isLoading, error } = useRequest<AnimesResp>("/animes");

  const groupedAnimes = useMemo<GroupedAnimes>(() => {
    if (!data) return [];
    const now = dayjs();
    return data.animes
      .reduce((result, anime) => {
        const diffDay = now.diff(dayjs(anime.updated), "day");
        if (diffDay > 30) {
          return result;
        }
        if (!result[diffDay]) {
          result[diffDay] = [];
        }
        result[diffDay].push({ ...anime, diffDay });
        return result;
      }, [] as GroupedAnimes)
      .filter(Boolean);
  }, [data]);

  const getTime = useCallback((diffDay: number) => {
    if (diffDay > DAY_LOCALE_STRING.length) return `${diffDay}天前`;
    return DAY_LOCALE_STRING[diffDay];
  }, []);

  if (error) return null;

  return (
    <div className={clsx("flex flex-col gap-1.5 flex-1", className)}>
      <Title className="text-yellow-300">本季新番</Title>
      <div className="relative flex-1 p-3 rounded-xl bg-zinc-100 overflow-x-hidden transition dark:bg-zinc-800">
        {!data && isLoading && (
          <Loading />
        )}
        {groupedAnimes.map((group) => (
          <Timeline key={group[0].diffDay} time={getTime(group[0].diffDay)}>
            {group.map((anime) => (
              <Link key={anime.id} href={`/animes/${anime.id}`}>
                <Card
                  image={getImage(`/animes/${anime.id}.webp`)}
                  title={anime.title}
                  description={`第${anime.eps}话`}
                  className="max-w-36 aspect-[2/3]"
                  titleClassName="truncate-2 text-lg"
                />
              </Link>
            ))}
          </Timeline>
        ))}
      </div>
    </div>
  );
};

export default Animes;