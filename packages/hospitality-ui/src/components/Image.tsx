import kebabCase from "lodash.kebabcase";

import { useImage } from "../hooks";
import { AllowedUploadTypes } from "../types";
import { Spinner } from "./Spinner";

type Props = {
  imageId: string;
  type: AllowedUploadTypes;
};

export function Image({ imageId, type }: Props) {
  const { data, isLoading } = useImage(imageId, { urlSuffix: type ? kebabCase(type) : undefined });
  return isLoading ? <Spinner /> : <img className="h-full w-full object-cover" src={data} />;
}
