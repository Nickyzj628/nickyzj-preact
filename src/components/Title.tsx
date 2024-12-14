import { ComponentChildren } from "preact";
import { twMerge } from "tailwind-merge";

type Props = {
  children: ComponentChildren;
  className?: string;
};

const Title = ({ children, className }: Props) => {
  return (
    <div className={twMerge("flex items-center gap-1.5 text-zinc-300", className)}>
      <div className="h-6 w-2.5 rounded-full bg-current" />
      <h4>{children}</h4>
    </div>
  )
};

export default Title;