export * from "./debounce";
export * from "./delay";
export * from "./delay-frames";
export * from "./from-now";
export * from "./get-period";
export * from "./throttle";

/**
 * 等待指定时间
 * @param ms 等待时间，默认 1000 ms
 */
export const sleep = (ms = 1000) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};