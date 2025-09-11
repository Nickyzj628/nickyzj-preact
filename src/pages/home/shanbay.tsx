import { Figcaption, Figure } from "@/components/figure";
import Loading from "@/components/loading";
import Section from "@/components/section";
import { clsx } from "@/helpers/string";
import { useRequest } from "@/hooks/network";

const Shanbay = () => {
    const { isLoading, error, data } = useRequest<ShanbayResp>("/shanbay");

    return (
        <Section className={"aspect-[2/3] w-full sm:w-80 lg:w-96 mt-2"}>
            <Section.Title className="text-blue-300">
                每日一句
            </Section.Title>
            <div className={clsx("relative flex flex-1 text-neutral-400 bg-neutral-100 rounded-xl overflow-hidden transition dark:text-neutral-500 dark:bg-neutral-800", !data && "items-center justify-center")}>
                {isLoading && (
                    <Loading />
                )}
                {error && (
                    <div>
                        <div className="icon-[mingcute--pic-line] size-32" />
                        <p className="text-center">{error.message}</p>
                    </div>
                )}
                {data && (
                    <Figure className="flex-1">
                        <Figure.Image src={data.image} alt="扇贝每日一句" />
                        <Figcaption>
                            <Figcaption.Title>
                                {data.content}
                            </Figcaption.Title>
                            <Figcaption.Description>
                                {data.translation}
                            </Figcaption.Description>
                            <Figcaption.Extra className="text-right">
                                {`-- ${data.author}`}
                            </Figcaption.Extra>
                        </Figcaption>
                    </Figure>
                )}
            </div>
        </Section>
    );
};

export default Shanbay;
