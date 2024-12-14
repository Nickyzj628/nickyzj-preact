import Card from "@/components/Card";
import Loading from "@/components/Loading";
import { clsx, observe, removeSpaces } from "@/utils";
import { getAnimes, getImage } from "@/utils/network";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "preact/hooks";
import { Link } from "wouter-preact";

type DiffedAnime = Anime & { diff: string };

const Page = () => {
  const loadRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef(0);
  const [animes, setAnimes] = useState<DiffedAnime[]>();

  useEffect(() => {
    if (!loadRef.current) return;
    const ob = observe(loadRef.current, async () => {
      const res = await getAnimes({
        page: ++pageRef.current,
      });
      setAnimes((prev) => [
        ...prev ?? [],
        ...res.animes
          .map((anime) => ({ ...anime, diff: removeSpaces(dayjs(anime.updated).fromNow()) }))
      ]);
      return pageRef.current < res.pages;
    });
    return () => {
      setAnimes([]);
      ob.disconnect();
    };
  }, []);

  return <>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 w-full">
      {!animes && (
        <Loading />
      )}
      {animes && animes.map((anime, i) => (
        <Link key={anime.id} href={`/animes/${anime.id}`} className={clsx(i === 0 && "col-span-2 row-span-2")}>
          <Card
            image={getImage(`/animes/${anime.id}.webp`)}
            title={anime.title}
            description={`第${anime.eps}话 / ${anime.diff}`}
            titleClassName="text-base sm:text-lg text-pretty"
          />
        </Link>
      ))}
    </div>
    <div ref={loadRef} className="absolute bottom-80 pointer-events-none" />
  </>;
};

export default Page;