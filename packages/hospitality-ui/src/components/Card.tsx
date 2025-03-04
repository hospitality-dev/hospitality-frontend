import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export function Card({ children }: Props) {
  return (
    <div className="aspect-square w-fit min-w-32 cursor-pointer rounded bg-white shadow-sm transition-shadow hover:shadow-md">
      {children}
    </div>
  );
}
