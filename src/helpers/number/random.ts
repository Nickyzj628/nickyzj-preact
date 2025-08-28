export const random = (min: number, max: number) => {
    if (min > max) {
        throw new Error("最小值不能超过最大值");
    }
    const range = max - min + 1;
    return min + Math.floor(Math.random() * range);
};