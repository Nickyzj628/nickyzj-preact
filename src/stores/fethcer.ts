import { request } from "@/helpers/network";
import { qs } from "@/helpers/string";
import { nanoquery } from "@nanostores/query";

const [createFetcherStore, createMutatorStore] = nanoquery({
    fetcher: (...keys) => request(keys.join("")),
    dedupeTime: Infinity,
});

// ------------ 每日一句

export const createShanbayStore = () => {
    return createFetcherStore<ShanbayResp>(["/shanbay"]);
};

// ------------ 文章

export const createBlogsStore = (params?: BlogsParams) => {
    return createFetcherStore<BlogsResp>(["/blogs", `${qs.stringify(params, { addQueryPrefix: true })}`]);
};

export const createBlogStore = (year: number, id: string) => {
    return createFetcherStore<BlogResp>(["/blogs", `/${year}/${id}`]);
};

export const createBlogMutatorStore = () => {
    return createMutatorStore<BlogMutationBody>(async ({ data, revalidate }) => {
        revalidate((key) => key.startsWith("/blogs?page="));
        revalidate(`/blogs/${data.year}/${data.title}`);
        return request(`/blogs/${data.year}/${data.title}`, {
            method: "PUT",
            body: data,
        });
    });
};

// ------------ 番剧

export const createAnimesStore = (params?: AnimesParams) => {
    return createFetcherStore<AnimesResp>(["/animes", `${qs.stringify(params, { addQueryPrefix: true })}`]);
};

export const createAnimeStore = (season: string, title: string) => {
    return createFetcherStore<AnimeResp>(["/animes", `/${season}/${title}`]);
};

export const createAnimeMutatorStore = () => {
    return createMutatorStore<AnimeMutationBody>(async ({ data, revalidate }) => {
        revalidate((key) => key.startsWith("/animes?page="));
        revalidate(`/animes/${data.season}/${data.title}`);
        return request(`/animes/${data.season}/${data.title}`, {
            method: "PUT",
            body: data,
        });
    });
};