/**
 * 生成随机整数
 * @param min 最小值
 * @param max 最大值
 * @example
 * random(1, 100); // 1 ~ 100 之间的随机整数
 */
export const random = (min: number, max: number) => {
    const range = Math.abs(max - min) + 1;
    return min + Math.floor(Math.random() * range);
};
