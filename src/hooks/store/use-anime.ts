import { PAGE_SIZE } from "@/constants";
import { createAnimeMutatorStore, createAnimesStore, createAnimeStore } from "@/stores/fethcer";
import { useStore } from "@nanostores/preact";
import { useCallback, useMemo, useState } from "preact/hooks";

type Props = {
  page?: number;
  pageSize?: number;
};

export const useAnimes = (props?: Props) => {
  const {
    page = 1,
    pageSize = PAGE_SIZE,
  } = props ?? {};

  const [_page, setPage] = useState(page);

  const $animes = useMemo(() => createAnimesStore({
    page: _page,
    pageSize,
  }), [_page]);

  const { data, error, loading } = useStore($animes);
  const isLoading = loading || (!data && !error);
  const hasNext = _page < data?.pages;
  const hasPrev = _page > 1;

  const nextPage = useCallback(() => {
    if (!hasNext) return;
    setPage(_page + 1);
  }, [hasNext, _page]);

  const prevPage = useCallback(() => {
    if (!hasPrev) return;
    setPage(_page - 1);
  }, [hasPrev, _page]);

  return {
    data,
    error,
    isLoading,
    page: _page,
    pageSize,
    hasNext,
    hasPrev,
    nextPage,
    prevPage,
  };
};

export const useAnime = (id: string) => {
  const $anime = useMemo(() => createAnimeStore(id), [id]);

  const { data, error, loading } = useStore($anime);
  const isLoading = loading || (!data && !error);

  return {
    data,
    error,
    isLoading,
  };
};

export const useAnimeMutation = () => {
  const $updateAnime = createAnimeMutatorStore();
  return useStore($updateAnime);
};