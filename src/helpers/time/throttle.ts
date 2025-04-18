/** 节流，使传入的函数在一段时间内只执行一次，默认150ms */
export const throttle = (fn: (...args: any[]) => void, ms = 150) => {
  let timer: NodeJS.Timeout;
  return async (...args: any[]) => {
    if (timer) return;
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, ms);
  };
};