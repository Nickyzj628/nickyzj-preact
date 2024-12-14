/** 延迟`time`毫秒执行后续代码，默认150ms */
export const delay = async (time = 150) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

/** 防抖，使传入的函数距离上次调用`time`毫秒后再执行，默认150ms */
export const debounce = (fn: (...args: any[]) => void, time = 150) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), time);
  };
};

/** 节流，使传入的函数在一段时间内只执行一次，默认150ms */
export const throttle = (fn: (...args: any[]) => void, ms = 150) => {
  let timer: ReturnType<typeof setTimeout> | null;
  return async (...args: any[]) => {
    if (timer) return;
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, ms);
  };
};

/** 获取当前时间段 */
export const getPeriod = () => {
  const hour = new Date().getHours();
  if (hour < 6) return "凌晨";
  if (hour >= 6 && hour <= 8) return "早上";
  if (hour >= 9 && hour <= 11) return "上午";
  if (hour === 12) return "中午";
  if (hour >= 13 && hour <= 17) return "下午";
  if (hour >= 18 && hour <= 19) return "傍晚";
  return "晚上";
};