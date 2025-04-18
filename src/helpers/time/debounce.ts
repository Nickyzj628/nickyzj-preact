/** 防抖，使传入的函数距离上次调用`time`毫秒后再执行，默认150ms */
export const debounce = (fn: (...args: any[]) => void, time = 150) => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), time);
  };
};