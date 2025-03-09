import { AnyRoute } from "@tanstack/react-router";
import { Dispatch, SetStateAction, useState } from "react";
import { tv } from "tailwind-variants";

import { Link } from "./Link";

type TabType = {
  title: string;
  link?: AnyRoute["to"];
  isDisabled?: boolean;
  isActive?: boolean;
};
type Props = {
  tabs: TabType[];
};

const tabContainer = tv({
  base: "relative box-content flex w-full flex-row flex-nowrap items-center border-b-2 border-gray-300",
});

const tabClasses = tv({
  slots: {
    tab: "relative top-0.5 box-content flex min-w-fit cursor-pointer justify-center border-b-2 py-1 text-lg font-medium transition-colors",
    linkClasses: "px-4 active:text-gray-500",
  },
  variants: {
    isActive: {
      true: { tab: "border-blue-400" },
      false: { tab: "border-gray-300 hover:border-blue-300" },
    },
    isDisabled: {
      true: {
        tab: "cursor-not-allowed border-gray-300 hover:border-gray-300",
        linkClasses: "text-gray-400 active:text-gray-400",
      },
    },
  },
});

function Tab({
  title,
  link,
  isDisabled,
  isActive,
  setActive,
}: Props["tabs"][number] & { setActive: Dispatch<SetStateAction<string>> }) {
  const { tab, linkClasses } = tabClasses({ isActive, isDisabled });
  return (
    <li className={tab()} onClick={() => setActive(title)}>
      <Link className={linkClasses()} isDisabled={isDisabled} onClick={() => setActive(title)} title={title} to={link}>
        {title}
      </Link>
    </li>
  );
}

export function Tabs({ tabs }: Props) {
  const [active, setActive] = useState(tabs?.[0]?.title);
  return (
    <ul className={tabContainer()}>
      {tabs.map((tab) => (
        <Tab
          key={tab.title}
          isActive={active === tab.title}
          isDisabled={tab?.isDisabled}
          link={tab?.link}
          setActive={setActive}
          title={tab.title}
        />
      ))}
    </ul>
  );
}
