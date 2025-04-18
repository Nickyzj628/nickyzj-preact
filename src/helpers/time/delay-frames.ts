/** 延迟`frames`帧后执行后续代码，默认1帧 */
export const delayFrames = async (frames = 1) => {
  return new Promise((resolve) => {
    let frameCount = 0;

    const onFrame = () => {
      frameCount++;
      if (frameCount >= frames) {
        resolve(undefined);
      } else {
        requestAnimationFrame(onFrame);
      }
    };

    requestAnimationFrame(onFrame);
  });
};