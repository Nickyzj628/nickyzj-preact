import { h } from "preact";

type Props = {
  component: any;
  [key: string]: any;
};

const Dynamic = ({ component, ...props }: Props) => {
  if (!component) {
    return null;
  }
  return h(component, props);
}

export default Dynamic;