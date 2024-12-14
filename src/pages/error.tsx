import { Link } from "wouter-preact";

const Error = () => {
  return (
    <div class="flex flex-1 flex-col items-center justify-center gap-1.5 h-full">
      <h1 class="text-6xl font-semibold sm:text-8xl">ERROR</h1>
      <p class="text-zinc-500 transition dark:text-zinc-400">您的页面好像偏离了地球...</p>
      <Link href="/" className="button mt-5 items-center gap-1 rounded-xl px-8 hover:no-underline">返回主页</Link>
    </div>
  )
};

export default Error;