import { AlbumIcon } from "@/assets/icons";
import Card from "@/components/Card";
import Loading from "@/components/Loading";
import Timeline from "@/components/Timeline";
import Title from "@/components/Title";
import { useRequest } from "@/hooks/useRequest";
import { getImage } from "@/utils/network";
import dayjs from "dayjs";
import { ComponentChildren } from "preact";
import { useCallback, useMemo } from "preact/hooks";
import { twMerge } from "tailwind-merge";
import { Link } from "wouter-preact";

type Props = {
  className?: string;
};

type LayoutProps = {
  className?: string;
  bodyClassName?: string;
  children?: ComponentChildren;
};

type GroupedAnimes = (Anime & { diffDay: number })[][];

const DAY_LOCALE_STRING = ["今天", "昨天", "前天"];

const Layout = ({ className, bodyClassName, children }: LayoutProps) => {
  return (
    <div className={twMerge("flex flex-col gap-1.5 flex-1", className)}>
      <Title className="text-yellow-300">本季新番</Title>
      <div className={twMerge("relative flex flex-col flex-1 p-3 rounded-xl bg-zinc-100 text-zinc-400 overflow-x-hidden transition dark:bg-zinc-800 dark:text-zinc-500", bodyClassName)}>
        {children}
      </div>
    </div>
  );
};

const Animes = ({ className }: Props) => {
  const { data, loading, error } = useRequest<AnimesResp>("/animes");

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

  const isEmpty = groupedAnimes.length === 0;

  const getTime = useCallback((diffDay: number) => {
    if (diffDay > DAY_LOCALE_STRING.length) return `${diffDay}天前`;
    return DAY_LOCALE_STRING[diffDay];
  }, []);

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
      {groupedAnimes.map((group) => (
        <Timeline key={group[0].diffDay} time={getTime(group[0].diffDay)}>
          {group.map((anime) => (
            <Link key={anime.id} href={`/animes/${anime.id}?ep=${anime.eps}`}>
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
    </Layout>
  );
};

export default Animes;