/** 查询字符串 => 对象 */
export const queryStringToObject = (queryString: string) => {
    const searchParams = new URLSearchParams(queryString);
    const result: Recordable = {};

    for (let [key, value] of searchParams) {
        if (!isNaN(Number(value))) {
            result[key] = Number(value);
        } else {
            result[key] = value;
        }
    }

    return result;
};