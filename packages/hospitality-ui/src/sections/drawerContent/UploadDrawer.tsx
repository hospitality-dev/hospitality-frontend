import { useState } from "react";

import { DrawerTypes } from "../../atoms";
import { Button, FileDisplay, Upload } from "../../components";
import { useUploadFiles } from "../../hooks";
import { AllowedFileTypes } from "../../types";

export function UploadDrawer({ data }: Pick<Extract<DrawerTypes, { type: "upload" }>, "data">) {
  const [files, setFiles] = useState(new FormData());
  const { mutate } = useUploadFiles();
  return (
    <div className="flex h-full flex-col gap-y-2">
      <Upload
        isMultiple={data?.isMultiple}
        label=""
        onChange={(e) => {
          const newForm = new FormData();
          files.entries().forEach(([key, value]) => {
            newForm.append(key, value);
          });

          Array.from(e.target.files || []).forEach((file) => {
            newForm.append(file.name, file);
          });
          setFiles(newForm);
        }}
        types={data?.types || []}
      />
      <div className="flex flex-col gap-y-2">
        {files.keys().map((f) => (
          <FileDisplay
            key={f}
            label={f}
            onDelete={() => {}}
            onRename={() => {}}
            type={f.split(".").at(-1) as AllowedFileTypes}
          />
        ))}
      </div>
      <div className="mt-auto">
        <Button label="Upload" onClick={() => mutate({ value: files })} variant="success" />
      </div>
    </div>
  );
}
