/** 带时间的console.log */
export const log = (...messages: any[]) => {
  console.log(`[${new Date().toLocaleTimeString()}]`, ...messages);
};

/** 获取变量的精确类型 */
export const typeOf = (value: any) => {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
};