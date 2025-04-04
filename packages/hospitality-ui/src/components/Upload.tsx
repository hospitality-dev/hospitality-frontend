import { MutableRefObject, useRef } from "react";
import { tv } from "tailwind-variants";

import { Icons } from "../enums";
import { Icon } from "./Icon";

type Props = {
  label: string;
  isDisabled?: boolean;
  onChange: () => void;
};

const classes = tv({
  slots: {
    base: "flex h-56 items-center justify-center rounded border border-gray-300 bg-gray-100 p-4 shadow",
    titleClasses: "flex flex-col items-center justify-center gap-y-4 text-3xl text-gray-400",
  },
  variants: {
    isDisabled: {
      true: "cursor-no-drop",
      false: "cursor-pointer",
    },
  },
});

export function Upload({ label, isDisabled }: Props) {
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  const { base, titleClasses } = classes({ isDisabled });

  return (
    <div className="flex flex-col">
      <label htmlFor="upload">{label}</label>
      <div className={base()} onClick={() => inputRef?.current?.click()}>
        <h3 className={titleClasses()}>
          <span>Click here or drag files to upload</span>
          <Icon fontSize={56} icon={Icons.upload} />
        </h3>
        <input ref={inputRef} className="hidden" id="upload" multiple name="upload" type="file" />
      </div>
    </div>
  );
}
