import { DUFS_PORT, BASE_URL } from "@/constants";

/** 从`nickyzj.run:2020/Photos{path}`获取图片，path以“/”开头 */
export const getImage = (path: string) => {
    return `${BASE_URL}:${DUFS_PORT}/Nickyzj/Photos${path}`;
};