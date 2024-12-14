import { clsx } from "@/utils";
import { useEffect, useState } from "preact/hooks";
import { twMerge } from "tailwind-merge";

type Props = {
  value?: boolean;
  className?: string;
  onChange?: (value: boolean) => void;
}

const Toggle = ({ value, className, onChange }: Props) => {
  const [isClicked, setIsClicked] = useState(false);
  const onClick = () => {
    const next = !isClicked;
    setIsClicked(next);
    onChange?.(next);
  };
  const onBlur = () => {
    setIsClicked(false);
    onChange?.(false);
  };
  useEffect(() => {
    setIsClicked(value === true);
  }, [value]);

  return (
    <button className={twMerge("flex-col justify-center gap-2 size-10 px-3", className)} onClick={onClick} onBlur={onBlur}>
      <div className={clsx("w-full h-0.5 rounded-full bg-zinc-600 transition dark:bg-zinc-300", isClicked && "translate-y-[5px] rotate-45")} />
      <div className={clsx("w-full h-0.5 rounded-full bg-zinc-600 transition dark:bg-zinc-300", isClicked && "-translate-y-[5px] -rotate-45")} />
    </button>
  )
};

export default Toggle;