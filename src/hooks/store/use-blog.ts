import { request } from "@/helpers/network";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import useSWRMutation from "swr/mutation";

/**
 * 常规文章列表请求，只能获取一页数据
 * @example
 * const { isLoading, error, data, hasNextPage } = useBlogs({ page: 1 });
 */
export const useBlogs = (options?: BlogsParams) => {
    const { page = 1 } = options ?? {};
    const { isLoading, error, data } = useSWR<BlogsResp>(`/blogs?page=${page}`);

    const hasPrevPage = data ? page > 1 : false;
    const hasNextPage = data ? page < data.pages : false;

    return {
        isLoading,
        error,
        data,
        hasPrevPage,
        hasNextPage,
    };
};

/**
 * 无限加载文章列表请求，保留所有已加载页数据
 * @example
 * const { isLoading, error, blogs, hasNextPage, nextPage } = useInfiniteBlogs();
 * const loadMore = () => {
 *     if (hasNextPage) {
 *         nextPage();
 *     }
 * };
 */
export const useInfiniteBlogs = () => {
    const getKey = (currSize: number, prevPageData: BlogsResp) => {
        if (prevPageData && prevPageData.data.length === 0) {
            return null;
        }
        return `/blogs?page=${currSize + 1}`;
    };

    const { isLoading, error, data, setSize } = useSWRInfinite<BlogsResp>(getKey);
    const isLoadingFirstPage = !data && isLoading;

    const latestData = data?.at(-1);
    const hasNextPage = latestData?.page < latestData?.pages;
    const nextPage = () => setSize((prev) => hasNextPage ? prev + 1 : prev);

    const blogs = data ? data.flatMap((pageData) => pageData.data) : [];

    return {
        isLoading,
        isLoadingFirstPage,
        error,
        blogs,
        hasNextPage,
        nextPage,
    };
};

/**
 * 获取文章详情
 * @example
 * const { isLoading, error, data } = useBlog(2025, "年度总结2");
 */
export const useBlog = (year: number, title: string) => {
    return useSWR<Blog>(`/blogs/${year}/${title}`);
};

/**
 * 更新文章信息
 * @example
 * const { trigger, isMutating, error } = useBlogMutation(2025, "年度总结2");
 * trigger({
 *   cover: "base64...",
 * });
 */
export const useBlogMutation = (year: number, title: string) => {
    const updater = (key: string, { arg }: { arg: Partial<BlogMutationBody> }) => request(key, {
        method: "PUT",
        body: {
            title,
            year,
            ...arg,
        },
    });
    return useSWRMutation(`/blogs/${year}/${title}`, updater);
};
