import { clsx } from "@/helpers/string";
import { useAnimes } from "@/hooks/store";
import dayjs from "dayjs";
import { ComponentChildren } from "preact";
import { useCallback, useMemo } from "preact/hooks";
import { Figcaption, Figure } from "../figure";
import Loading from "../loading";
import Section from "../section";
import Timeline from "../timeline";

type ContainerProps = {
  className?: string;
  bodyClassName?: string;
  children: ComponentChildren;
};

type GroupedAnimes = (Anime & {
  dayDiff: number;
  dayDiffLocale: string;
})[][];

const DAY_LOCALE_STRING = ["今天", "昨天", "前天"];

const Container = ({ className, bodyClassName, children }: ContainerProps) => {
  return (
    <Section className={clsx("flex flex-col flex-1 gap-1.5 min-w-72 w-full sm:w-80 lg:w-96 h-[36rem] mt-2", className)}>
      <Section.Title className="text-yellow-300">本月新番</Section.Title>
      <div className={clsx("relative flex flex-col flex-1 p-3 text-zinc-400 rounded-xl bg-zinc-100 overflow-x-hidden transition dark:text-zinc-500 dark:bg-zinc-800", bodyClassName)}>
        {children}
      </div>
    </Section>
  );
};

const RecentAnimes = () => {
  const { data, error, isLoading } = useAnimes();

  const dayDiffToLocale = useCallback((diffDay: number) => {
    if (diffDay >= DAY_LOCALE_STRING.length) return `${diffDay}天前`;
    return DAY_LOCALE_STRING[diffDay];
  }, []);

  const groupedAnimes = useMemo<GroupedAnimes>(() => {
    if (!data || !data.animes) return [];
    const now = dayjs();
    return data.animes
      .reduce((result, anime) => {
        const dayDiff = now.diff(dayjs(anime.updated), "day");
        if (dayDiff > 30) {
          return result;
        }
        if (!result[dayDiff]) {
          result[dayDiff] = [];
        }
        result[dayDiff].push({
          ...anime,
          dayDiff,
          dayDiffLocale: dayDiffToLocale(dayDiff),
        });
        return result;
      }, [] as GroupedAnimes)
  }, [data]);

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
      {groupedAnimes.map((group) => (
        <Timeline
          key={group[0].dayDiff}
          time={group[0].dayDiffLocale}
        >
          {group.map((anime) => (
            <a
              key={anime.id}
              href={`/animes/${anime.id}?ep=${anime.eps}`}
            >
              <Figure className="max-w-36 aspect-[2/3]">
                <Figure.Image
                  src={`/animes/${anime.id}.webp`}
                  alt={anime.title}
                />
                <Figcaption>
                  <Figcaption.Title className="text-base line-clamp-2">
                    {anime.title}
                  </Figcaption.Title>
                  <Figcaption.Description>
                    {`第${anime.eps}话`}
                  </Figcaption.Description>
                </Figcaption>
              </Figure>
            </a>
          ))}
        </Timeline>
      ))}
    </Container>
  );
};

export default RecentAnimes;