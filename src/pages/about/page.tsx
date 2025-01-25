import Avatar from "@/components/Avatar";
import Tabs from "@/components/Tabs";
import History from "./_components/History";
import Links from "./_components/Links";
import Works from "./_components/Works";

const Page = () => {
  return <>
    <div className="flex items-center gap-3 w-full">
      <Avatar name="Nickyzj" className="size-24 sm:size-28" />
      <div>
        <span className="text-sm text-zinc-500 transition dark:text-zinc-400">nickyzj2019@qq.com</span>
        <h1 className="my-0.5">杨智杰</h1>
        <span className="text-sm text-zinc-500 transition dark:text-zinc-400">24岁 · JavaScript · 前端试用生</span>
      </div>
    </div>

    <Tabs names={["建站史", "作品集", "友情链接"]} className="overflow-x-hidden" tabClassName="w-fit mt-5">
      <History />
      <Works />
      <Links />
    </Tabs>
  </>;
};

export default Page;