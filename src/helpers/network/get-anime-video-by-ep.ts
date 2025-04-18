import { ALIST_PORT, BASE_URL } from "@/constants";

/** 从`nickyzj.run:2020/Nickyzj/Animes/{...anime}/{ep}`获取番剧播放地址 */
export const getAnimeVideoByEP = (anime?: Anime, ep = 1) => {
  if (!anime || !anime.episodes) return;
  return `${BASE_URL}:${ALIST_PORT}/d/Nickyzj/Animes/${anime.cate}/${anime.title}/${anime.episodes[ep - 1]}`;
};