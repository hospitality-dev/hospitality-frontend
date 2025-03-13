import { autoUpdate, useFloating, useMergeRefs, useTransitionStyles } from "@floating-ui/react";
import { useLocation } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import { useEffect, useState } from "react";
import { tv } from "tailwind-variants";

import { drawerAtom } from "../atoms";
import { useClickOutside } from "../hooks";
import { Product, ProductsCategories } from "../sections/drawerContent";

const DrawerClasses = tv({
  slots: {
    base: "pointer-events-auto absolute top-0 right-0 z-[60] h-full max-h-full border-l border-gray-400 bg-gray-100 px-4 pb-4 shadow-md transition-all duration-500 ease-in-out",
    title:
      "font-merriweather mb-4 flex h-16 max-h-[4rem] flex-nowrap items-center justify-between border-b border-gray-400 text-center text-2xl text-gray-900",
  },
  variants: {
    size: {
      xs: "md:w-[24rem]",
      sm: "md:w-[24rem]",
      md: "md:w-[28rem]",
      lg: "md:w-[32rem]",
      xl: "md:w-[36rem]",
      half: "w-full lg:w-1/2",
      full: "w-full",
    },
    isExpanded: {
      true: "mg:w-full w-full lg:w-full",
    },
  },
});

export function Drawer() {
  const [drawer, setDrawer] = useAtom(drawerAtom);
  const resetDrawer = useResetAtom(drawerAtom);
  //   const [isExpanded, setIsExpanded] = useState(false);
  const [renderContent, setRenderContent] = useState(false);
  const ref = useClickOutside(() => setDrawer((prev) => ({ ...prev, isOpen: false })));
  const location = useLocation();
  const { refs, context } = useFloating({
    placement: "right",
    transform: true,
    open: drawer.isOpen,
    onOpenChange: (isOpen) => setDrawer((prev) => ({ ...prev, isOpen })),
    whileElementsMounted: autoUpdate,
  });
  const { isMounted, styles } = useTransitionStyles(context, {
    initial: {
      position: "absolute",
      transform: "translateX(100%)",
      //   width: isExpanded ? "100%" : "10rem",
      width: "10rem",
    },
    common: ({ side }) => ({
      position: "absolute",
      transformOrigin: {
        top: 0,
        bottom: 0,
        left: "100%",
        right: "0px",
      }[side],
    }),
  });

  const merged = useMergeRefs([ref, refs.setFloating]);
  const { base, title } = DrawerClasses({ size: "xl", isExpanded: false });

  // Close drawer if the location changes
  useEffect(() => {
    resetDrawer();
  }, [location.pathname]);

  useEffect(() => {
    if (drawer.isOpen) {
      const timeout = setTimeout(() => {
        setRenderContent(drawer.isOpen);
      }, 250);

      return () => {
        clearTimeout(timeout);
      };
    } else {
      setRenderContent(false);
      return () => {};
    }
  }, [drawer.isOpen]);

  if (isMounted)
    return (
      <div className="absolute top-0 left-0 z-50 h-screen w-screen bg-[#62657080] transition-all">
        <div ref={merged} className={base()} style={styles}>
          <h3 className={title()}>
            <span className="truncate font-semibold">{drawer.title}</span>
            <div className="flex items-center gap-x-2">
              {/* <div className="w-min">
              <Button
              hasNoBorder
              icon={Icons.expand}
              iconSize={22}
              isOutline
              onClick={() => setIsExpanded((prev) => !prev)}
              />
              </div> */}
            </div>
          </h3>
          {renderContent ? (
            <div className="h-[92.5%]">
              {drawer.type === "products_categories" ? <ProductsCategories /> : null}
              {drawer.type === "products" ? <Product /> : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  return null;
}
