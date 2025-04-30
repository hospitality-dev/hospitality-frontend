import { useAtomValue } from "jotai";
import { useResetAtom } from "jotai/utils";
import { tv } from "tailwind-variants";

import { dialogAtom } from "../atoms";
import { Button } from "./Button";

const classes = tv({
  slots: {
    background: "pointer-events-none absolute z-[99] flex h-screen w-screen bg-black/50 transition-opacity duration-100",
    modal: "bg-layout mx-auto my-auto w-2/3 transform rounded p-4 shadow transition-transform duration-[400ms] ease-out",
    titleClasses: "mb-4 text-center text-3xl font-medium",
    descriptionClasses: "h-fit min-h-32 text-center",
    actionsClasses: "flex h-full flex-nowrap items-end gap-x-2",
  },
  variants: {
    isOpen: {
      false: {
        background: "opacity-0",
        modal: "translate-y-52",
      },
      true: {
        background: "",
        modal: "pointer-events-auto translate-y-0",
      },
    },
  },
});

export function Modal() {
  const dialog = useAtomValue(dialogAtom);
  const resetDialog = useResetAtom(dialogAtom);
  const { background, modal, titleClasses, descriptionClasses, actionsClasses } = classes({ isOpen: dialog.isOpen });
  return (
    <div className={background()}>
      <div className={modal()}>
        <h2 className={titleClasses()}>{dialog.title}</h2>
        {dialog?.description ? <p className={descriptionClasses()}>{dialog?.description.content}</p> : null}
        <div className={actionsClasses()}>
          {dialog?.actions?.length ? (
            dialog.actions.map((action) => (
              <div key={action.id} className="flex-1">
                <Button
                  icon={action.icon}
                  isDisabled={action.isDisabled}
                  label={action.label}
                  onClick={action.onClick}
                  size="lg"
                  tooltip={action.tooltip}
                  variant={action.variant}
                />
              </div>
            ))
          ) : (
            <Button label="Close" onClick={resetDialog} size="lg" />
          )}
        </div>
      </div>
    </div>
  );
}
