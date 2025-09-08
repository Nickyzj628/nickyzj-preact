import { createBlogMutatorStore, createBlogsStore, createBlogStore } from "@/stores/fethcer";
import { useStore } from "@nanostores/preact";
import { useCallback, useMemo, useState } from "preact/hooks";

type Props = {
    page?: number;
};

export const useBlogs = (props?: Props) => {
    const {
        page = 1,
    } = props ?? {};

    const [_page, setPage] = useState(page);

    const $blogs = useMemo(() => createBlogsStore({
        page: _page,
    }), [_page]);

    const { data, error, loading } = useStore($blogs);
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
        hasNext,
        hasPrev,
        nextPage,
        prevPage,
    };
};

export const useBlog = (year: number, id: string) => {
    const $blog = useMemo(() => createBlogStore(year, id), [year, id]);

    const { data, error, loading } = useStore($blog);
    const isLoading = loading || (!data && !error);

    return {
        data,
        error,
        isLoading,
    };
};

export const useBlogMutation = () => {
    const $updateBlog = createBlogMutatorStore();
    return useStore($updateBlog);
};