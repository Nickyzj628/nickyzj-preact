import { clsx } from "@/helpers/string";
import { ComponentChildren } from "preact";

type SectionProps = {
  className?: string;
  children?: ComponentChildren;
};

type TitleProps = {
  className?: string;
  children: ComponentChildren;
};

const Section = ({ className, children, }: SectionProps) => {
  return (
    <div className={clsx("flex flex-col gap-1.5", className)}>
      {children}
    </div>
  );
};

Section.Title = ({
  className = "text-neutral-300",
  children,
}: TitleProps) => {
  return (
    <div className={clsx("flex items-center gap-1.5", className)}>
      <div className="w-2.5 h-6 rounded-full bg-current" />
      <h4>{children}</h4>
    </div>
  );
};

export default Section;