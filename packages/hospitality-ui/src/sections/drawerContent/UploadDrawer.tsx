import { useState } from "react";

import { DrawerTypes } from "../../atoms";
import { Button, FileDisplay, Upload } from "../../components";
import { useCloseDrawer, useUploadFiles } from "../../hooks";
import { AllowedFileTypes } from "../../types";

export function UploadDrawer({ data }: Pick<Extract<DrawerTypes, { type: "upload" }>, "data">) {
  const [files, setFiles] = useState<File[]>([]);
  const { mutate } = useUploadFiles({ uploadType: data.uploadType }, { invalidateModels: ["files"] });
  const closeDrawer = useCloseDrawer();
  return (
    <div className="flex h-full flex-col gap-y-2">
      <Upload
        isMultiple={data?.isMultiple}
        label=""
        onChange={(e) => {
          if (e.target.files?.length) {
            const temp: File[] = [...files];
            Array.from(e.target.files || []).forEach((file) => {
              temp.push(file);
            });
            setFiles(temp);
          }
        }}
        types={data?.types || []}
      />
      <div className="flex flex-col gap-y-2">
        {files.map((f, index) => (
          <FileDisplay
            key={f.name}
            label={f.name}
            onDelete={() => {}}
            onRename={(newName) => {
              setFiles((prev) =>
                prev.map((file, i) => {
                  if (index === i) {
                    return new File([file], newName, { type: file.type });
                  }
                  return file;
                })
              );
            }}
            type={f.type.split("/").at(-1) as AllowedFileTypes}
          />
        ))}
      </div>
      <div className="mt-auto">
        <Button
          label="Upload"
          onClick={() => {
            const formData = new FormData();
            for (let index = 0; index < files.length; index++) {
              formData.append(files[index].name, files[index]);
            }
            mutate({ id: data.id, value: formData }, { onSuccess: closeDrawer });
          }}
          variant="success"
        />
      </div>
    </div>
  );
}
