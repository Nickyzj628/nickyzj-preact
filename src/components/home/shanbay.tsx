import { clsx } from "@/helpers/string";
import { useShanbay } from "@/hooks/store";
import { ComponentChildren } from "preact";
import { Figcaption, Figure } from "../figure";
import Loading from "../loading";
import Section from "../section";

type ContainerProps = {
  className?: string;
  bodyClassName?: string;
  children: ComponentChildren;
};

const Container = ({ className, bodyClassName, children }: ContainerProps) => {
  return (
    <Section className={clsx("aspect-[2/3] w-full sm:w-80 lg:w-96 mt-2", className)}>
      <Section.Title className="text-blue-300">
        每日一句
      </Section.Title>
      <div className={clsx("relative flex flex-1 text-neutral-400 bg-neutral-100 rounded-xl overflow-hidden transition dark:text-neutral-500 dark:bg-neutral-800", bodyClassName)}>
        {children}
      </div>
    </Section>
  );
};

const Shanbay = () => {
  const { data, error, isLoading } = useShanbay();

  if (isLoading) {
    return (
      <Container bodyClassName="items-center justify-center">
        <Loading />
      </Container>
    );
  }

  if (error) {
    return (
      <Container bodyClassName="items-center justify-center">
        <div>
          <div className="icon-[mingcute--pic-line] size-32" />
          <p className="text-center">{error.message}</p>
        </div>
      </Container>
    );
  }

  return (
    <Container bodyClassName="bg-transparent!">
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
    </Container>
  );
};

export default Shanbay;