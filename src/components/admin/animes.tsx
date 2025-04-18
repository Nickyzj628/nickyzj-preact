import { useAnimes } from "@/hooks/store";
import { useState } from "preact/hooks";
import Loading from "../loading";
import AnimeEditDrawer from "./anime-edit-drawer";

const Animes = () => {
  const {
    data,
    error,
    isLoading,
    page,
    pageSize,
    hasPrev,
    hasNext,
    prevPage,
    nextPage,
  } = useAnimes();

  const isEmpty = data && data.animes.length === 0;

  const [anime, setAnime] = useState<Anime>();
  const isEditing = anime !== undefined;

  const onClickEdit = (anime: Anime) => setAnime(anime);
  const onCloseEdit = () => setAnime(undefined);

  return (
    <div className="flex flex-1 flex-col gap-3 p-1.5 border border-neutral-300 rounded-xl overflow-x-auto transition dark:border-neutral-700">
      <table className="flex-1 transition dark:text-neutral-100">
        <thead>
          <tr>
            <th className="text-left px-1.5 pb-1.5">
              ID
            </th>
            <th className="text-left px-1.5 pb-1.5">
              Title
            </th>
            <th className="text-left px-1.5 pb-1.5">
              Cate
            </th>
            <th className="text-left px-1.5 pb-1.5">
              Eps
            </th>
            <th className="text-left px-1.5 pb-1.5">
              Updated
            </th>
            <th className="text-left px-1.5 pb-1.5">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {(isLoading || isEmpty || error) && (
            <tr>
              <td colSpan={5} className="text-center text-neutral-400 transition dark:text-neutral-500">
                {isLoading && (
                  <Loading />
                )}
                {isEmpty && (
                  "空空如也"
                )}
                {error && (
                  error
                )}
              </td>
            </tr>
          )}
          {data?.animes.map((anime) => (
            <tr key={anime.id} className="border-y border-neutral-300 transition-[border] hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800">
              <td className="px-1.5 py-0.5 duration-0">
                {anime.id}
              </td>
              <td className="px-1.5 py-0.5 duration-0">
                {anime.title}
              </td>
              <td className="px-1.5 py-0.5 duration-0">
                {anime.cate}
              </td>
              <td className="px-1.5 py-0.5 duration-0">
                {anime.eps}
              </td>
              <td className="px-1.5 py-0.5 duration-0">
                {new Date(anime.updated).toLocaleString()}
              </td>
              <td className="px-1.5 py-0.5 duration-0">
                <button onClick={() => onClickEdit(anime)}>
                  <span className="icon-[mingcute--edit-line]" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!isLoading && !isEmpty && (
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-neutral-600 transition dark:text-neutral-300">
            第{page}页 / 共{data?.pages}页 / 每页{pageSize}个
          </span>
          <div>
            <button
              disabled={!hasPrev}
              className="px-3 py-1.5"
              onClick={prevPage}
            >
              <span className="icon-[mingcute--left-line] size-6" />
            </button>
            <button
              disabled={!hasNext}
              className="px-3 py-1.5"
              onClick={() => nextPage()}
            >
              <span className="icon-[mingcute--left-line] size-6 rotate-180" />
            </button>
          </div>
        </div>
      )}
      <AnimeEditDrawer
        data={anime}
        isOpen={isEditing}
        onClose={onCloseEdit}
      />
    </div>
  );
};

export default Animes;