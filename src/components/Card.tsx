import { twMerge } from "tailwind-merge";
import Image from "./Image";

type Props = {
  className?: string;
  image?: string;
  imageClassName?: string;
  contentClassName?: string;
  title?: string;
  titleClassName?: string;
  description?: string;
  descriptionClassName?: string;
  extra?: string;
  extraClassName?: string;
}

const Card = ({ className, image, imageClassName, contentClassName, title, titleClassName, description, descriptionClassName, extra, extraClassName }: Props) => {
  return (
    <div className={twMerge("group/card relative rounded-xl overflow-hidden transition hover:scale-95", className)}>
      {image && (
        <Image src={image} className={twMerge("size-full bg-zinc-200 group-hover/card:scale-110 dark:bg-zinc-800", imageClassName)} />
      )}
      {(title || description || extra) && (
        <div className={twMerge("absolute bottom-0 w-full pt-8 pb-3 px-3 bg-gradient-to-t from-black transition-all", extra ? "group-hover/card:pb-10" : "group-hover/card:pb-4", contentClassName)}>
          <h3 title={title} className={twMerge("text-white dark:text-zinc-200", titleClassName)}>{title}</h3>
          <p className={twMerge("mt-1 text-sm text-zinc-100 transition dark:text-zinc-300", descriptionClassName)}>{description}</p>
          <p className={twMerge("opacity-0 h-0 text-sm text-zinc-100 transition group-hover/card:opacity-100 dark:text-zinc-300", extraClassName)}>{extra}</p>
        </div>
      )}
    </div>
  )
}

export default Card;