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
  base: "relative top-0.5 box-content flex min-w-fit cursor-pointer justify-center border-b-2 px-4 py-1 text-lg font-medium transition-colors",
  variants: {
    isActive: {
      true: "border-blue-400",
      false: "border-gray-300 hover:border-blue-300",
    },
    isDisabled: {
      true: "cursor-not-allowed border-gray-300 hover:border-gray-300 [&>*]:text-gray-400 [&>*]:active:text-gray-400",
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
  const classes = tabClasses({ isActive, isDisabled });
  return (
    <li className={classes} onClick={() => setActive(title)}>
      <Link isDisabled={isDisabled} onClick={() => setActive(title)} title={title} to={link}>
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
