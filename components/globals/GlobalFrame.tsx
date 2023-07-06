import { ComponentChildren } from "preact";
import { GlobalFooter } from "./GlobalFooter.tsx";
import { GlobalHeader } from "./header/GlobalHeader.tsx";

export interface IGlobalFrame {
  children: ComponentChildren;
}

export const GlobalFrame = (props: IGlobalFrame) => {
  const { children } = props;

  return (
    <>
      <GlobalHeader />
      {children}
      <GlobalFooter />
    </>
  );
};
