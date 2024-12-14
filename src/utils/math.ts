/** 生成随机整数，范围是[min, max] */
export const randomInt = (min: number, max: number) => {
  return min + Math.floor(Math.random() * (max - min + 1));
};