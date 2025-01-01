import { PicIcon } from "@/assets/icons";
import Card from "@/components/Card";
import Loading from "@/components/Loading";
import Title from "@/components/Title";
import { useRequest } from "@/hooks/useRequest";
import { ComponentChildren } from "preact";
import { twMerge } from "tailwind-merge";

type LayoutProps = {
  className?: string;
  bodyClassName?: string;
  children?: ComponentChildren;
};

type ShanbayProps = {
  className?: string;
};

const Layout = ({ className, bodyClassName, children }: LayoutProps) => {
  return (
    <div className={twMerge("relative flex flex-col gap-1.5 aspect-[2/3]", className)}>
      <Title className="text-blue-300">每日一句</Title>
      <div className={twMerge("relative flex flex-1 rounded-xl bg-zinc-100 text-zinc-400 overflow-hidden transition dark:text-zinc-500 dark:bg-zinc-800", bodyClassName)}>
        {children}
      </div>
    </div>
  );
};

const Shanbay = ({ className }: ShanbayProps) => {
  const { data, loading, error } = useRequest<Shanbay>("/shanbay");

  const isEmpty = !data?.content;

  if (error) return (
    <Layout className={className} bodyClassName="items-center justify-center">
      <figcaption className="text-center">
        <PicIcon className="w-32" />
        <figure>{error.message}</figure>
      </figcaption>
    </Layout>
  );

  if (loading) return (
    <Layout className={className} bodyClassName="items-center justify-center">
      <Loading />
    </Layout>
  );

  if (isEmpty) return (
    <Layout className={className} bodyClassName="items-center justify-center">
      <figcaption className="text-center">
        <PicIcon className="w-32" />
        <figure>空空如也</figure>
      </figcaption>
    </Layout>
  );

  return (
    <Layout className={className} bodyClassName="bg-transparent dark:bg-transparent">
      <Card
        image={data.image}
        title={data.content}
        description={data.translation}
        extra={`-- ${data.author}`}
        className="flex-1 hover:scale-[0.98]"
        contentClassName="pb-5"
        extraClassName="text-right"
      />
    </Layout>
  );
};

export default Shanbay;