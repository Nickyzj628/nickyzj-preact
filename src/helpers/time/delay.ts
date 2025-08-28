/** 延迟`time`毫秒执行后续代码，默认150ms */
export const delay = async (time = 150) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
};