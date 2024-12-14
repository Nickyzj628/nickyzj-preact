import { clsx } from "@/utils";
import { ComponentChildren } from "preact";
import { forwardRef } from "preact/compat";
import { useMemo, useState } from "preact/hooks";
import { twMerge } from "tailwind-merge";
import styles from "./Tabs.module.css";

type Props = {
  names?: string[];
  children: ComponentChildren;
  className?: string;
  tabClassName?: string;
  onChange?: (active: number) => void;
}

const Tabs = forwardRef(({ names, children, className, tabClassName, onChange }: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
  const _names = useMemo(
    () => Array
      .from({ length: Array.isArray(children) ? children.length : 1 })
      .map((_, i) => names?.[i] ?? `未命名${i + 1}`),
    [names]
  );

  const [active, setActive] = useState(0);
  const onClickTab = (tabIdx: number) => {
    setActive(tabIdx);
    onChange?.(tabIdx);
  };

  return (
    <div ref={ref} className={twMerge("flex flex-col gap-1.5", className)}>
      <div className={twMerge("flex shrink-0 gap-1 p-1 rounded-xl bg-zinc-100 overflow-x-auto transition dark:bg-zinc-700", styles.tab, tabClassName)}>
        {_names.map((name, i) => (
          <button className={clsx("flex-1 justify-center px-5 py-1.5 rounded-xl whitespace-nowrap", active === i && "active")} onClick={() => onClickTab(i)}>
            {name}
          </button>
        ))}
      </div>
      {Array.isArray(children) ? children[active] : children}
    </div>
  )
});

export default Tabs;