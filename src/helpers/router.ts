/** `"/blogs/abc?d=e&f=g"` => `"/blogs"` */
export const getPathRoot = (path?: string) => {
    if (!path) return "";
    return path.match(/^\/[^\/]*/)?.[0];
};