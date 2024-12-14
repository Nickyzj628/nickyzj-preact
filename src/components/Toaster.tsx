import { AlertIcon, CheckCircleIcon, CloseCircleIcon, InformationIcon } from "@/assets/icons";
import { delay } from "@/utils";
import { batch, signal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";

type Toast = {
  id: string;
  type: "success" | "info" | "warning" | "error";
  message: string;
}

const toasts = signal<Toast[]>([]);
const toastsHeight = signal(0);

/** 创建一条通知 */
export const toast = (message: string, type: Toast["type"] = "info") => {
  const newToast = {
    id: Date.now().toString(36),
    type,
    message,
  }
  toasts.value = [...toasts.value, newToast];
};
toast.success = (message: string) => toast(message, "success");
toast.warning = (message: string) => toast(message, "warning");
toast.error = (message: string) => toast(message, "error");

const Toast = ({ type, message }: Toast) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dom = ref.current;
    if (!dom) return;
    // 将自身高度累加给toastsHeight，以实现Toaster动态高度
    toastsHeight.value = toastsHeight.value + dom.offsetHeight;
    // 假隐藏
    delay(4000).then(() => {
      dom.style.opacity = "0";
      // 真隐藏
      delay().then(() => {
        dom.style.display = "none";
      });
    });
  }, []);

  return (
    <div ref={ref} className="flex items-center gap-3 w-fit p-3 rounded-xl shadow-xl bg-white transition dark:bg-zinc-800">
      {type === "success" && <CheckCircleIcon className="size-6 text-green-500" />}
      {type === "info" && <InformationIcon className="size-6 text-blue-500" />}
      {type === "warning" && <AlertIcon className="size-6 text-yellow-500" />}
      {type === "error" && <CloseCircleIcon className="size-6 text-red-500" />}
      <span className="text-zinc-800 dark:text-zinc-200">{message}</span>
    </div>
  )
};

const Toaster = () => {
  const ref = useRef<HTMLDivElement>(null);

  // 容器高度回到0时清空状态
  useEffect(() => {
    if (!ref.current) return;
    let isFirst = true;
    const ob = new ResizeObserver(([entry]) => {
      const target = entry.target as HTMLDivElement;
      if (target.offsetHeight !== 0) return;
      // 修复第一个元素加入时offsetHeight=0仍会清空状态的问题
      if (target.children.length === 1 && isFirst) {
        isFirst = false;
        return;
      }
      isFirst = true;
      batch(() => {
        toastsHeight.value = 0;
        toasts.value = [];
      })
    });
    ob.observe(ref.current);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed bottom-3 right-3 z-40 flex flex-col items-end gap-3 w-96 transition-all"
      style={{
        maxHeight: toastsHeight.value + ((toasts.value.length || 1) - 1) * 12,
      }}
    >
      {toasts.value.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  )
};

export default Toaster;