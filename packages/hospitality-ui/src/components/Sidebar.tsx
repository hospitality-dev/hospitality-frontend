import { AnyRoute } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { tv } from "tailwind-variants";

import { sidebarStateAtom } from "../atoms";
import { Icons } from "../enums";
import { useScreenSize } from "../hooks";
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

const classes = tv({
  slots: {
    base: "bg-blue-950 text-white",
    rootList: "flex h-full flex-col",
    moduleItemsList: "",
    settingsButton: "mt-auto mb-4 w-full",
  },
  variants: {
    isSmallScreen: {
      true: {
        base: "mt-auto h-16 max-h-16 w-full",
        rootList: "flex-row flex-nowrap items-center",
        moduleItemsList: "flex h-full flex-nowrap items-center",
        settingsButton: "mb-0 ml-auto flex h-full w-fit items-center",
      },
      false: "w-72",
    },
  },
});

function SidebarLink({ icon, title, to }: SidebarSectionType["links"][number]) {
  const { isLg } = useScreenSize();
  return (
    <Link
      className={`flex w-full items-center gap-x-2 px-4 font-semibold duration-0 select-none hover:bg-white hover:text-gray-900 ${isLg ? "h-fit py-2" : "h-full justify-center"} `}
      to={to}
      variant="secondary">
      <Icon fontSize={24} icon={icon} />
      {isLg ? <span>{title}</span> : null}
    </Link>
  );
}

function SidebarSection({ title, links }: SidebarSectionType) {
  const [sidebarState, setSidebarState] = useAtom(sidebarStateAtom);
  const { isLg } = useScreenSize();

  return (
    <li className="flex flex-col gap-y-2 border-y border-gray-500 first:pt-2 last:pb-2">
      <h3
        className="flex cursor-pointer items-center justify-between border-gray-100 px-4 py-1 text-sm font-bold"
        onClick={() => setSidebarState((prev) => ({ ...prev, isModulesOpen: !sidebarState.isModulesOpen }))}>
        <div className="flex items-center gap-x-2">
          <Icon fontSize={24} icon={Icons.modules} />
          {isLg ? <span className="pt-0.5 capitalize select-none">{title}</span> : null}
        </div>
        <Icon fontSize={24} icon={Icons[sidebarState.isModulesOpen ? "arrow-up" : "arrow-down"]} />
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
  const { isLg } = useScreenSize();
  const { base, rootList, moduleItemsList, settingsButton } = classes({ isSmallScreen: !isLg });
  return (
    <div className={base()}>
      <ul className={rootList()}>
        <li className={`flex h-16 flex-nowrap items-center gap-x-4 px-4 ${isLg ? "" : "justify-center"}`}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-blue-300 bg-blue-500 text-sm">
            LOGO
          </div>
          {isLg ? <h2 className="text-2xl">Filtz</h2> : null}
        </li>
        <ul className={moduleItemsList()}>
          {isLg
            ? sections.map((section) => <SidebarSection key={section.title} links={section.links} title={section.title} />)
            : sections.flatMap((section) =>
                section.links.map((link) => <SidebarLink key={link.to} icon={link.icon} title={link.title} to={link.to} />)
              )}
        </ul>
        <li className={settingsButton()}>
          <SidebarLink icon={Icons.settings} title="Settings" to="/settings/products" />
        </li>
      </ul>
    </div>
  );
}
