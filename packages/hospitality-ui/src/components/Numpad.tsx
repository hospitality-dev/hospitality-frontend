import { Icons } from "../enums";
import { Button } from "./Button";

type Props = {
  onClick: (button: string) => void;
};

const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
export function Numpad({ onClick }: Props) {
  return (
    <div className="grid h-full w-full grid-cols-3 gap-4 bg-gray-200">
      {buttons.map((button) => (
        <div key={button} className="col-span-1 flex aspect-square max-w-full items-center justify-center">
          <Button className="h-full w-full text-6xl" label={button} onClick={() => onClick(button)} size="xl" />
        </div>
      ))}
      <div className="col-span-1 flex aspect-square max-w-full items-center justify-center">
        <Button className="h-full w-full text-6xl" icon={Icons.arrowRight} onClick={() => onClick("delete")} size="xl" />
      </div>
      <div className="col-span-1 flex aspect-square max-w-full items-center justify-center">
        <Button className="h-full w-full text-6xl" label={"0"} onClick={() => onClick("0")} size="xl" />
      </div>
      <div className="col-span-1 flex aspect-square max-w-full items-center justify-center">
        <Button className="h-full w-full text-6xl" label={"C"} onClick={() => onClick("clear")} size="xl" />
      </div>
    </div>
  );
}
