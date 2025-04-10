import { useImage } from "../hooks";
import { Spinner } from "./Spinner";

type Props = {
  imageId: string;
};

export function Image({ imageId }: Props) {
  const { data, isLoading } = useImage(imageId);
  return isLoading ? <Spinner /> : <img className="h-full w-full object-cover" src={data} />;
}
