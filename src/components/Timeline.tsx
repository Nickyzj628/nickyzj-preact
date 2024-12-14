import { ComponentChildren } from "preact";
import { twMerge } from "tailwind-merge";

type Props = {
  time?: string;
  children?: ComponentChildren;
  className?: string;
  childrenContainerClassname?: string;
};

const Timeline = ({ time, children, className, childrenContainerClassname }: Props) => {
  return (
    <div className={className}>
      <div className="pl-2">
        <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{time}</h3>
      </div>
      <div className="flex gap-x-1">
        <div className="relative after:absolute after:bottom-0 after:start-3.5 after:top-7 after:w-px after:-translate-x-[0.5px] after:bg-zinc-300 after:transition last:after:hidden dark:after:bg-zinc-600">
          <div className="relative z-10 flex items-center justify-center size-7">
            <div className="size-2 rounded-full bg-zinc-400 transition dark:bg-zinc-600"></div>
          </div>
        </div>
        <div className={twMerge("flex flex-1 flex-wrap gap-3 pt-2.5 pb-8 mb-2", childrenContainerClassname)}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Timeline;