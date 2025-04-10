import { useState } from "react";

import { Icons } from "../enums";
import { AllowedFileTypes } from "../types";
import { Button } from "./Button";
import { Card } from "./Card";
import { Icon } from "./Icon";
import { Input } from "./Input";

type Props = {
  label: string;
  type: AllowedFileTypes;
  onDelete: () => void;
  onRename: (newValue: string) => void;
};

export function FileDisplay({ label, type, onDelete, onRename }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [edited, setEdited] = useState(label);

  return (
    <Card hasNoShadow isFullWidth>
      <div className="flex h-10 max-h-10 cursor-default items-center gap-x-2 px-2 text-xl">
        <div>
          <Icon fontSize={24} icon={Icons[type]} />
        </div>
        {isEditing ? (
          <Input
            isAutofocused
            label=""
            name="filename"
            onBlur={() => {
              setIsEditing(false);
              onRename(edited);
            }}
            onChange={(e) => setEdited(e.target.value)}
            value={edited}
          />
        ) : (
          <p
            className="hover:text-info-highlight cursor-text truncate font-medium transition-colors"
            onClick={() => setIsEditing(true)}>
            {label}
          </p>
        )}
        <div className="ml-auto">
          <Button hasNoBorder icon={Icons.delete} isOutline onClick={onDelete} variant="error" />
        </div>
      </div>
    </Card>
  );
}
