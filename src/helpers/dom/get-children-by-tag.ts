/** 递归收集一个元素及其内部，所有特定标签的元素 */
export const getChildrenByTag = <K extends keyof HTMLElementTagNameMap>(
  element: Element,
  tagName: K,
): HTMLElementTagNameMap[K][] => {
  const elements: HTMLElementTagNameMap[K][] = [];

  if (element.tagName === tagName.toUpperCase()) {
    elements.push(element as HTMLElementTagNameMap[K]);
  }

  // 递归遍历子元素
  Array.from(element.children).forEach((child) => {
    elements.push(...getChildrenByTag(child, tagName));
  });

  return elements;
};