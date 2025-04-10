import { ChangeEventHandler, MutableRefObject, useRef } from "react";
import { tv } from "tailwind-variants";

import { Icons } from "../enums";
import { AllowedFileTypes } from "../types";
import { Icon } from "./Icon";

type Props = {
  label: string;
  isDisabled?: boolean;
  isMultiple?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  types: AllowedFileTypes[];
};

const classes = tv({
  slots: {
    base: "flex h-56 items-center justify-center rounded-md border border-gray-400 bg-gray-50 p-4 shadow",
    titleClasses: "flex flex-col items-center justify-center gap-y-4 text-3xl text-gray-400",
  },
  variants: {
    isDisabled: {
      true: "cursor-no-drop",
      false: "cursor-pointer",
    },
  },
});

export function Upload({ label, isDisabled, isMultiple, onChange, types }: Props) {
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
        <input
          ref={inputRef}
          accept={types.map((t) => `.${t}`).join(", ")}
          className="hidden"
          id="upload"
          multiple={isMultiple}
          name="upload"
          onChange={onChange}
          type="file"
        />
      </div>
    </div>
  );
}
