import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
  svgClassName?: string;
}

/** 覆盖在父容器之上的加载态，需要给父容器设置`potision: relative` */
const Loading = ({ className, svgClassName }: Props) => {
  return (
    <div className={twMerge("absolute top-0 left-0 grid place-items-center size-full transition dark:text-zinc-200", className)}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={twMerge("animate-spin size-10", svgClassName)}>
        <g fill="none" fill-rule="evenodd">
          <path d="M24 0v24H0V0zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01z" />
          <path fill="currentColor" d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12" opacity=".1" />
          <path fill="currentColor" d="M12 4a7.958 7.958 0 0 0-5.533 2.222 1 1 0 1 1-1.384-1.444A9.958 9.958 0 0 1 12 2a1 1 0 1 1 0 2" />
        </g>
      </svg>
    </div>
  )
};

export default Loading;