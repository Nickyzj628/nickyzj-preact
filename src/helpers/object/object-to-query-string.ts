/** 对象 => queryString */
export const objectToQueryString = (object: Recordable = {}) => {
    const result = Object
        .entries(object)
        .map((item) => item.join("="))
        .join("&");
    return result;
};