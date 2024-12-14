import mediumZoom, { ZoomSelector } from "medium-zoom";
import { delay } from "./time";

/** 设置页面标题 */
export const setTitle = (title?: string) => {
  document.title = `${title || "加载中"} / NICKYZJ`;
};

/** 给元素添加缩放交互 */
export const zoom = (dom: ZoomSelector) => {
  mediumZoom(dom, {
    margin: 30,
  });
};

/** 观察到元素进入窗口后执行函数，函数里如果返回`false`就立即停止观察 */
export const observe = (
  element: HTMLElement,
  fn: () => void | boolean | Promise<void | boolean>,
  options?: IntersectionObserverInit,
) => {
  const ob = new IntersectionObserver(async (entries) => {
    if (!entries[0].isIntersecting) return;
    const canUnobserve = await fn();
    if (canUnobserve === false) {
      ob.unobserve(element);
      return;
    }
    ob.unobserve(element);
    await delay();
    ob.observe(element);
  }, options);
  ob.observe(element);
  return ob;
};

/** 递归收集一个元素及其内部，所有特定标签的元素 */
export const getElementsOf = <K extends keyof HTMLElementTagNameMap>(
  element: Element,
  tagName: K,
): HTMLElementTagNameMap[K][] => {
  const elements: HTMLElementTagNameMap[K][] = [];

  if (element.tagName === tagName.toUpperCase()) {
    elements.push(element as HTMLElementTagNameMap[K]);
  }

  // 递归遍历子元素
  Array.from(element.children).forEach((child) => {
    elements.push(...getElementsOf(child, tagName));
  });

  return elements;
};