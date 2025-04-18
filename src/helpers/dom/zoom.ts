import { ZoomSelector } from "medium-zoom";

/** 给元素添加缩放交互 */
export const zoom = async (dom: ZoomSelector) => {
  const { default: mediumZoom } = await import("medium-zoom");
  mediumZoom(dom, {
    margin: 30,
    background: "rgba(0, 0, 0, 0.8)",
  });
};