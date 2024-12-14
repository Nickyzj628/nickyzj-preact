import { zoom } from "@/utils";
import { getElementsOf } from "@/utils/dom";
import { Inputs, MutableRef, useEffect } from "preact/hooks";

type Options = {
  reloadDeps?: Inputs;
};

/** 传入`ref`，等待`ref.current`下所有图片加载完成，给这些图片添加缩放交互，不需要交互的图片请加上`.no-zoom` */
const useZoom = (ref: MutableRef<HTMLElement | null>, options: Options = {}) => {
  const {
    reloadDeps = [],
  } = options;

  useEffect(() => {
    const dom = ref.current;
    if (!dom) return;

    const ob = new MutationObserver((entries) => {
      /** 收集所有需要添加交互的图片 */
      const images: HTMLImageElement[] = [];
      // 遍历observer监听到的变化数组
      entries.forEach((entry) => {
        if (!entry.addedNodes.length) return;
        const nodes = entry.addedNodes;
        // 遍历有变化的节点
        nodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          // 收集、遍历节点内所有图片
          const imagesInNode = getElementsOf(node, "img");
          imagesInNode.forEach((image) => {
            if (image.classList.contains("medium-zoom-image") || image.classList.contains("no-zoom")) return;
            images.push(image);
          });
        });
      });

      /** 所有图片加载完成后添加交互 */
      let loadedImageCount = 0;
      const onImageLoaded = async () => {
        if (++loadedImageCount < images.length) return;
        images.forEach((image) => {
          zoom(image);
        });
      };
      images.forEach((image) => {
        image.onload = onImageLoaded;
      });
    });

    // 立即添加一次
    dom.querySelectorAll("img:not(.medium-zoom-image, .no-zoom)").forEach((child) => {
      zoom(child as HTMLImageElement);
    });

    // 观察容器，对容器内所有新图片添加缩放交互
    ob.observe(dom, {
      subtree: true,
      childList: true,
    });

    return () => {
      ob.disconnect();
    };
  }, [...reloadDeps]);
};

export default useZoom;