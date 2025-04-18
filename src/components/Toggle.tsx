import { clsx } from "@/helpers/string";
import { useEffect, useState } from "preact/hooks";

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

  useEffect(() => {
    setIsClicked(value === true);
  }, [value]);

  return (
    <button
      className={clsx("flex-col justify-center gap-2 size-10 px-3", className)}
      onClick={onClick}
    >
      <div className={clsx("w-full transition", isClicked && "translate-y-[5px]")}>
        <div
          className={clsx(
            "w-full h-0.5 rounded-full bg-neutral-600 transition dark:bg-neutral-300",
            isClicked && "rotate-45"
          )}
        />
      </div>
      <div className={clsx("w-full transition", isClicked && "translate-y-[-5px]")}>
        <div
          className={clsx(
            "w-full h-0.5 rounded-full bg-neutral-600 transition dark:bg-neutral-300",
            isClicked && "-rotate-45"
          )}
        />
      </div>
    </button>
  );
};

export default Toggle;