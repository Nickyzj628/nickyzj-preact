import Card from "@/components/Card";
import Loading from "@/components/Loading";
import Title from "@/components/Title";
import { useRequest } from "@/hooks/useRequest";
import { clsx } from "@/utils";

type Props = {
  className?: string;
};

const Shanbay = ({ className }: Props) => {
  const { data, isLoading, error } = useRequest<Shanbay>("/shanbay");

  if (error) return null;

  return (
    <div className={clsx("relative flex flex-col gap-1.5 aspect-[2/3]", className)}>
      <Title className="text-blue-300">每日一句</Title>
      {!data && isLoading && (
        <Loading className="static flex-1 rounded-xl bg-zinc-100 dark:bg-zinc-800" />
      )}
      {data && (
        <Card
          image={data.image}
          title={data.content}
          description={data.translation}
          extra={`-- ${data.author}`}
          className="flex-1 hover:scale-[0.98]"
          contentClassName="pb-5"
          extraClassName="text-right"
        />
      )}
    </div>
  );
};

export default Shanbay;