import { AnyRoute } from "@tanstack/react-router";
import { Dispatch, SetStateAction } from "react";
import { tv } from "tailwind-variants";

import { Link } from "./Link";

type TabType = {
  id: string;
  title: string;
  link?: AnyRoute["to"];
  isNavControlled?: boolean;
  isDisabled?: boolean;
  isActive?: boolean;
};
type Props = {
  tabs: TabType[];
  active: string;
  isNavControlled?: boolean;
  setActive?: Dispatch<SetStateAction<string>>;
};

const tabContainer = tv({
  base: "after:bg-secondary-highlight relative box-content flex w-full max-w-full flex-row flex-nowrap items-center overflow-x-auto after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full",
});

const tabClasses = tv({
  slots: {
    tab: "pointer-events-none relative flex min-w-fit cursor-pointer justify-center py-1 text-lg font-medium transition-colors select-none after:absolute after:bottom-0 after:left-0 after:z-10 after:h-0.5 after:w-full",
    linkClasses: "pointer-events-auto px-4 active:text-gray-500",
  },
  variants: {
    isActive: {
      true: {
        tab: "after:bg-info",
      },
      false: { tab: "hover:after:bg-info-highlight border-transparent" },
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
  id,
  title,
  link,
  isDisabled,
  isActive,
  isNavControlled,
  setActive,
}: Props["tabs"][number] & { setActive: Props["setActive"] }) {
  const { tab, linkClasses } = tabClasses({ isActive, isDisabled });
  return (
    <li
      className={tab()}
      onClick={() => {
        if (!isNavControlled && setActive) setActive(id);
      }}>
      <Link
        className={linkClasses()}
        isDisabled={isDisabled}
        onClick={() => {
          if (!isNavControlled && setActive) setActive(id);
        }}
        title={title}
        to={link}>
        {title}
      </Link>
    </li>
  );
}

export function Tabs({ tabs, active, setActive, isNavControlled }: Props) {
  return (
    <ul className={tabContainer()}>
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          id={tab.id}
          isActive={active === tab.id}
          isDisabled={tab?.isDisabled}
          isNavControlled={isNavControlled}
          link={tab?.link}
          setActive={setActive}
          title={tab.title}
        />
      ))}
    </ul>
  );
}
