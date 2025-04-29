import { useIsMutating } from "@tanstack/react-query";
import { tv } from "tailwind-variants";

type Props = {
  value?: number;
};

const classes = tv({
  base: "bg-info-highlight absolute top-16 h-0.5 animate-pulse transition-[width]",
});

export function Progress({ value }: Props) {
  const isMutating = useIsMutating();
  return <div className={classes()} style={{ width: isMutating ? `${value || 100}%` : 0 }}></div>;
}
