import Loading from "@/components/loading";
import { useAnimes } from "@/hooks/store/use-anime";
import { useState } from "preact/hooks";
import { useCounter } from "react-use";
import AnimeEditDrawer from "./anime-edit-drawer";
import Button from "@/components/button";

const Animes = () => {
    const [page, { dec: prevPage, inc: nextPage }] = useCounter(1);
    const { isLoading, error, data, hasPrevPage, hasNextPage } = useAnimes({ page });
    const animes = data?.data ?? [];

    const [anime, setAnime] = useState<Anime>();
    const isEditing = anime !== undefined;
    const onClickEdit = (anime: Anime) => setAnime(anime);
    const onCloseEdit = () => setAnime(undefined);

    if (error) {
        return error.message;
    }

    return (
        <div className="flex flex-1 flex-col gap-3 p-1.5 border border-neutral-300 rounded-xl overflow-x-auto transition dark:border-neutral-700">
            <table className="flex-1 transition dark:text-neutral-100">
                <thead>
                    <tr>
                        <th className="text-left px-1.5 pb-1.5">
                            标题
                        </th>
                        <th className="text-left px-1.5 pb-1.5">
                            季度
                        </th>
                        <th className="text-left px-1.5 pb-1.5">
                            集数
                        </th>
                        <th className="text-left px-1.5 pb-1.5">
                            更新时间
                        </th>
                        <th className="text-left px-1.5 pb-1.5">
                            操作
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading && (
                        <tr>
                            <td colSpan={5} className="text-center text-neutral-400 transition dark:text-neutral-500">
                                <Loading />
                            </td>
                        </tr>
                    )}
                    {animes.map((anime) => (
                        <tr key={anime.title} className="border-y border-neutral-300 transition-[border] hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800">
                            <td className="p-1.5 duration-0">
                                {anime.title}
                            </td>
                            <td className="p-1.5 duration-0">
                                {anime.season}
                            </td>
                            <td className="p-1.5 duration-0">
                                {anime.eps}
                            </td>
                            <td className="p-1.5 duration-0">
                                {new Date(anime.updated).toLocaleString()}
                            </td>
                            <td className="p-1.5 duration-0">
                                <Button
                                    size="lg"
                                    rounded="full"
                                    icon="icon-[mingcute--edit-line]"
                                    onClick={() => onClickEdit(anime)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-neutral-600 transition dark:text-neutral-300">
                    第{page}页 / 共{data?.pages}页
                </span>
                <div className="flex gap-1.5">
                    <Button
                        size="lg"
                        rounded="full"
                        disabled={!hasPrevPage}
                        icon="icon-[mingcute--left-line]"
                        onClick={() => prevPage()}
                    />
                    <Button
                        size="lg"
                        rounded="full"
                        disabled={!hasNextPage}
                        icon="icon-[mingcute--left-line] rotate-180"
                        onClick={() => nextPage()}
                    />
                </div>
            </div>
            <AnimeEditDrawer
                data={anime}
                isOpen={isEditing}
                onClose={onCloseEdit}
            />
        </div>
    );
};

export default Animes;
