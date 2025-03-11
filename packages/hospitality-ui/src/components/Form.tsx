import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  handleSubmit: () => Promise<void>;
};
export function Form({ handleSubmit, children }: Props) {
  return (
    <form
      className="h-full w-full"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
      {children}
    </form>
  );
}
