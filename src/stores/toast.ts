import { delay } from "@/helpers/time";
import { atom } from "nanostores";

export const $toasts = atom<Toast[]>([]);

const addToast = async (message: string, type: Toast["type"] = "info", duration = 3000) => {
  const id = Date.now().toString(36);
  const newToast: Toast = { id, message, type, duration, lifecycle: "beforeEnter" };

  $toasts.set([...$toasts.get(), newToast]);

  // 淡入
  await delay(10);
  $toasts.set($toasts.get().map((toast) => {
    if (toast.id !== id) return toast;
    return {
      ...toast,
      lifecycle: "entered",
    };
  }));

  // 淡出
  await delay(duration);
  $toasts.set($toasts.get().map((toast) => {
    if (toast.id !== id) return toast;
    return {
      ...toast,
      lifecycle: "beforeExit",
    };
  }));

  // 移除
  await delay(150);
  $toasts.set($toasts.get().filter((toast) => toast.id !== id));
};

export const toast = {
  success: (message: string, duration?: number) => addToast(message, "success", duration),
  info: (message: string, duration?: number) => addToast(message, "info", duration),
  warning: (message: string, duration?: number) => addToast(message, "warning", duration),
  error: (message: string, duration?: number) => addToast(message, "error", duration),
};