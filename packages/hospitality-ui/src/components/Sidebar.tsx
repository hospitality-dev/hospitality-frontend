import { AnyRoute } from "@tanstack/react-router";
import { useAtom } from "jotai";

import { sidebarStateAtom } from "../atoms";
import { Icons } from "../enums";
import { availableIcons } from "../types";
import { Icon } from "./Icon";
import { Link } from "./Link";

type SidebarSectionType = {
  title: string;
  links: {
    icon: availableIcons;
    title: string;
    to: AnyRoute["to"];
  }[];
};
type Props = { sections: SidebarSectionType[] };

function SidebarLink({ icon, title, to }: SidebarSectionType["links"][number]) {
  return (
    <Link
      className="flex h-fit w-full items-center gap-x-2 px-4 py-2 font-semibold duration-0 select-none hover:bg-white hover:text-gray-900"
      to={to}
      variant="secondary">
      <Icon fontSize={20} icon={icon} />
      <span>{title}</span>
    </Link>
  );
}

function SidebarSection({ title, links }: SidebarSectionType) {
  const [sidebarState, setSidebarState] = useAtom(sidebarStateAtom);
  return (
    <li className="flex flex-col gap-y-2 border-y border-gray-500 first:pt-2 last:pb-2">
      <h3
        className="flex cursor-pointer items-center justify-between border-gray-100 px-4 py-1 text-sm font-bold"
        onClick={() => setSidebarState((prev) => ({ ...prev, isModulesOpen: !sidebarState.isModulesOpen }))}>
        <span className="pt-0.5 capitalize select-none">{title}</span>
        <Icon fontSize={18} icon={Icons[sidebarState.isModulesOpen ? "arrow-up" : "arrow-down"]} />
      </h3>
      <div
        className={`flex flex-col gap-y-1 ${sidebarState.isModulesOpen ? "h-auto" : "h-0"} overflow-hidden transition-[height]`}>
        {links.map((link) => (
          <SidebarLink key={link.to} icon={link.icon} title={link.title} to={link.to} />
        ))}
      </div>
    </li>
  );
}

export function Sidebar({ sections = [] }: Props) {
  return (
    <div className="w-72 bg-blue-950 text-white">
      <ul className="flex h-full flex-col">
        <li className="flex h-16 flex-nowrap items-center gap-x-4 px-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-blue-300 bg-blue-500 text-sm">
            LOGO
          </div>
          <h2 className="text-2xl">Filtz</h2>
        </li>
        <ul>
          {sections.map((section) => (
            <SidebarSection key={section.title} links={section.links} title={section.title} />
          ))}
        </ul>
        <li className="mt-auto mb-4 flex w-full">
          <SidebarLink icon={Icons.settings} title="Settings" to="/settings/users" />
        </li>
      </ul>
    </div>
  );
}
