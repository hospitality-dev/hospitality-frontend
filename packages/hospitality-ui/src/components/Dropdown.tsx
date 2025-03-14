import {
  autoPlacement,
  autoUpdate,
  FloatingFocusManager,
  FloatingList,
  FloatingNode,
  FloatingPortal,
  FloatingTree,
  offset,
  safePolygon,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useHover,
  useInteractions,
  useListItem,
  useListNavigation,
  useMergeRefs,
  useRole,
} from "@floating-ui/react";
import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import { tv } from "tailwind-variants";

import { Icons } from "../enums";
import { availableIcons, IconThickness, PositionType, Variant } from "../types";
import { Icon } from "./Icon";

type DropdownItemType = {
  id: string;
  allowedPlacements?: PositionType;
  title?: string;
  child?: ReactNode;
  icon?: availableIcons;
  image?: string;
  iconColor?: string;
  iconThickness?: IconThickness;
  subItems?: DropdownItemType[];
  isDisabled?: boolean;
  onClick?: () => void;
  variant?: Variant;
  tooltip?: string;
};
type DropdownType = {
  allowedPlacements?: PositionType;
  children?: ReactNode | null;
  items: DropdownItemType[];
  isReferenceMaxSize?: boolean;
  isDisabled?: boolean;
  event?: MouseEvent<HTMLDivElement, MouseEvent> | null;
};

const DropdownClasses = tv({
  slots: {
    base: "font-lato z-30 max-w-fit min-w-fit outline-none",
    floatingBase:
      "font-lato absolute top-0 left-0 z-[9999] max-h-[40rem] overflow-y-auto rounded border border-zinc-600 shadow",
  },
});
const DropdownItemClasses = tv({
  base: "group m-0 flex h-10 min-h-[2.5rem] w-full cursor-pointer flex-nowrap items-center border-b border-zinc-600 bg-zinc-700 text-left text-white outline-0 group-hover:bg-zinc-500 last:border-0 hover:bg-zinc-500",
  variants: {
    variant: {
      primary: "bg-primary",
      secondary: "bg-secondary",
      info: "bg-info",
      success: "bg-success",
      warning: "bg-warning",
      error: "bg-error",
    },
    isDisabled: {
      true: "bg-disabled cursor-not-allowed text-zinc-200",
    },
    hasIcon: {
      true: "justify-between",
    },
    hasImage: {
      true: "justify-start gap-x-2",
    },
    hasSubitems: {
      true: {},
      false: {},
    },
    isEvent: {
      true: "absolute",
    },
    isRoot: {
      true: {},
      false: {},
    },
  },
});

function DropdownComponent({ allowedPlacements = [], children, items, isReferenceMaxSize, event, isDisabled }: DropdownType) {
  const { base, floatingBase } = DropdownClasses();

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const elementsRef = useRef<Array<HTMLButtonElement | null>>([]);

  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();

  const isNested = parentId !== null;

  const { floatingStyles, refs, context } = useFloating({
    nodeId,
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: isNested ? "right-start" : "bottom-start",
    middleware: [
      offset({ mainAxis: isNested ? 8 : 4, alignmentAxis: 0 }),
      autoPlacement({ allowedPlacements }),
      shift(),

      size({
        apply({ rects, elements }) {
          Object.assign(elements?.floating?.style, {
            minWidth: "fit-content",
            width: `${rects.reference.width}px`,
            maxWidth: isReferenceMaxSize ? `${rects.reference.width}px` : "",
          });
        },
        padding: 10,
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, {
    enabled: isNested && !isDisabled,
    delay: { open: 75 },
    handleClose: safePolygon({ blockPointerEvents: true }),
  });
  const click = useClick(context, {
    event: "mousedown",
    toggle: !isNested,
    ignoreMouse: isNested,
  });
  const role = useRole(context, { role: "menu" });
  const dismiss = useDismiss(context, { bubbles: true });
  const listNavigation = useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    nested: isNested,
    onNavigate: setActiveIndex,
  });

  const tree = useFloatingTree();

  useEffect(() => {
    if (!tree) return () => {};

    function handleTreeClick() {
      setIsOpen(false);
    }

    function onSubMenuOpen(evt: { nodeId: string; parentId: string }) {
      if (evt.nodeId !== nodeId && evt.parentId === parentId) {
        setIsOpen(false);
      }
    }

    tree.events.on("click", handleTreeClick);
    tree.events.on("menuopen", onSubMenuOpen);

    return () => {
      tree.events.off("click", handleTreeClick);
      tree.events.off("menuopen", onSubMenuOpen);
    };
  }, [tree, nodeId, parentId]);

  useEffect(() => {
    if (isOpen && tree) {
      tree.events.emit("menuopen", { parentId, nodeId });
    }
  }, [tree, isOpen, nodeId, parentId]);
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, click, role, dismiss, listNavigation]);
  const item = useListItem();
  const mergedRefs = useMergeRefs([refs.setReference, item.ref]);
  useEffect(() => {
    if (event) {
      refs.setPositionReference({
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: event.clientX,
            y: event.clientY,
            top: event.clientY,
            right: event.clientX,
            bottom: event.clientY,
            left: event.clientX,
          };
        },
      });
      setIsOpen(true);
    }
  }, [event]);
  if (items?.length === 0) return null;
  const dropdownItemClasses = DropdownItemClasses({ isRoot: true, hasSubitems: !!items?.length });

  return (
    <FloatingNode id={nodeId}>
      <div
        ref={mergedRefs}
        className={isNested ? dropdownItemClasses : base()}
        role={isNested ? "menuitem" : undefined}
        tabIndex={!isNested ? 0 : -1}
        {...getReferenceProps()}>
        {children || null}
      </div>
      <FloatingList elementsRef={elementsRef}>
        {isOpen ? (
          <FloatingPortal>
            <FloatingFocusManager context={context} initialFocus={isNested ? -1 : 0} modal={false} returnFocus={!isNested}>
              <div
                ref={refs.setFloating}
                className={floatingBase()}
                style={{ transform: floatingStyles.transform }}
                {...getFloatingProps()}>
                {items && isOpen
                  ? items.map((dropdownItem) =>
                      dropdownItem.subItems?.length ? (
                        <Dropdown
                          key={dropdownItem.id}
                          allowedPlacements={dropdownItem?.allowedPlacements || allowedPlacements}
                          isDisabled={dropdownItem?.isDisabled}
                          items={dropdownItem.subItems}>
                          <DropdownItem
                            allowedPlacements={dropdownItem?.allowedPlacements || allowedPlacements}
                            child={dropdownItem?.child}
                            icon={dropdownItem.icon}
                            iconColor={dropdownItem?.iconColor}
                            iconThickness={dropdownItem?.iconThickness}
                            id={dropdownItem.id}
                            image={dropdownItem?.image}
                            isDisabled={dropdownItem?.isDisabled}
                            onClick={() => {
                              if (dropdownItem?.isDisabled) return;
                              if (dropdownItem?.onClick) {
                                dropdownItem.onClick();
                              }
                              tree?.events.emit("click");
                              setIsOpen(false);
                            }}
                            subItems={dropdownItem.subItems}
                            title={dropdownItem.title}
                            tooltip={dropdownItem?.tooltip}
                            variant={dropdownItem?.variant || "primary"}
                          />
                        </Dropdown>
                      ) : (
                        <DropdownItem
                          key={dropdownItem.id}
                          allowedPlacements={dropdownItem?.allowedPlacements || allowedPlacements}
                          child={dropdownItem?.child}
                          icon={dropdownItem.icon}
                          iconColor={dropdownItem?.iconColor}
                          iconThickness={dropdownItem?.iconThickness}
                          id={dropdownItem.id}
                          image={dropdownItem?.image}
                          isDisabled={dropdownItem?.isDisabled}
                          onClick={() => {
                            if (dropdownItem?.isDisabled) return;
                            if (dropdownItem?.onClick) {
                              dropdownItem.onClick();
                            }
                            tree?.events.emit("click");
                            setIsOpen(false);
                          }}
                          subItems={dropdownItem.subItems}
                          title={dropdownItem.title}
                          tooltip={dropdownItem?.tooltip}
                          variant={dropdownItem?.variant || "primary"}
                        />
                      )
                    )
                  : null}
              </div>
            </FloatingFocusManager>
          </FloatingPortal>
        ) : null}
      </FloatingList>
    </FloatingNode>
  );
}

function DropdownItem({
  title: label,
  icon,
  onClick,
  subItems,
  iconColor,
  isDisabled,
  image,
  iconThickness,
  child,
  variant = "primary",
}: DropdownItemType) {
  const dropdownItemClasses = DropdownItemClasses({
    isDisabled,
    hasSubitems: !!subItems?.length,
    hasImage: !!image,
    hasIcon: !!icon,
    variant,
  });
  return (
    <div
      className={dropdownItemClasses}
      onClick={(e) => {
        e?.preventDefault();
        e?.stopPropagation();
        if (onClick) onClick();
      }}
      onKeyDown={() => {}}
      role="menuitem"
      tabIndex={0}>
      {/* {image && !subItems?.length ? <Avatar image_id={image} size="sm" /> : null} */}
      {label && !child ? <div className="truncate px-2 select-none">{label}</div> : null}
      {child ?? null}
      <div className="ml-auto flex gap-x-2 pr-2">
        {icon ? (
          <div>
            <Icon color={iconColor || "#ffffff"} fontSize={20} icon={icon} thickness={iconThickness || "regular"} />
          </div>
        ) : null}
        {subItems?.length ? (
          <div>
            <Icon color={"#ffffff"} fontSize={20} icon={Icons["arrow-right"]} thickness={iconThickness || "regular"} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function Dropdown(props: DropdownType) {
  const parentId = useFloatingParentNodeId();

  if (parentId === null) {
    return (
      <FloatingTree>
        <DropdownComponent {...props} />
      </FloatingTree>
    );
  }

  return <DropdownComponent {...props} />;
}
