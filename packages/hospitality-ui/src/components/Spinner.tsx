import { Icons } from "../enums";
import { Icon } from "./Icon";

export function Spinner() {
  return <Icon className="text-info-highlight animate-spin" fontSize={96} icon={Icons.loading} />;
}
