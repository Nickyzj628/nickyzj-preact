/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

type Shanbay = {
  content: string;
  translation: string;
  author: string;
  image: string;
  href: string;
};

type Blog = {
  id: string;
  title: string;
  visibility: number;
  updated: number;
  minutes?: number;
  content?: string;
};

type Anime = {
  id: string;
  title: string;
  cate: string;
  eps: number;
  ep_pattern: string;
  episodes?: string[];
  updated: number;
};

type Recordable = Record<string, any>;

type Resp = {
  statusCode: number;
  message: string;
};

type RespWithpage = Resp & {
  page: number;
  pageSize: number;
  pages: number;
};

type ShanbayResp = Resp & Shanbay;

type BlogsResp = RespWithpage & {
  blogs: Blog[];
};

type BlogResp = Resp & Blog;

type AnimesResp = RespWithpage & {
  animes: Anime[];
};

type AnimeResp = Resp & Anime;