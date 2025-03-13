import { ReactNode } from "@tanstack/react-router";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { tv } from "tailwind-variants";

import { Icons } from "../enums";
import { availableIcons, Size, Variant } from "../types";
import { Button } from "./Button";
import { Title } from "./Title";

type Props<T> = {
  columns: ColumnDef<T, ReactNode>[];
  data: T[];
  title?: string;
  titleVariant?: Variant;
  isCollapsible?: boolean;
  isInitialOpen?: boolean;
  isLoading?: boolean;
  onExpand?: () => void;
  action?: {
    onClick: () => void;
    label: string;
    icon?: availableIcons;
    variant?: Variant;
    size?: Size;
  };
};

const classes = tv({
  slots: {
    container: "overflow-x-auto rounded-md border border-gray-300 bg-gray-100 px-4 py-2",
    tableContainer: "transition-[height]",
    tableClasses: "min-w-full overflow-auto",
    thead: "border-b border-gray-300 text-left text-gray-500",
    th: "p-2 text-sm font-light uppercase",
    tbody: "flex min-h-10 flex-col divide-y divide-gray-300 py-2",
    tr: "flex h-10 w-full items-center rounded has-[td]:hover:bg-gray-200",
    td: "h-10 flex-1 p-2",
  },
  variants: {
    isOpen: {
      true: {
        tableContainer: "overflow-hidden",
      },
      false: {
        tableContainer: "h-0 overflow-hidden",
      },
    },
    isLoading: {
      true: {
        tbody: "",
        tr: "animate-pulse rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-50",
      },
    },
  },
});

function TableSkeleton({ tr, td }: { tr: string; td: string }) {
  return (
    <>
      <tr className={tr}>
        <td className={td} />
      </tr>
    </>
  );
}
export function Table<T>({
  columns,
  data,
  title,
  titleVariant,
  isInitialOpen = true,
  isCollapsible = false,
  action,
  onExpand,
  isLoading,
}: Props<T>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  const [isOpen, setIsOpen] = useState(isInitialOpen);
  const headers = table.getFlatHeaders().filter((h) => !!h.column.columnDef.header);
  const { container, tableContainer, tableClasses, thead, th, tbody, tr, td } = classes({ isOpen, isLoading });

  return (
    <div className={container()}>
      {title ? (
        <div
          className="flex cursor-pointer flex-row flex-nowrap justify-between"
          onClick={() => {
            if (onExpand && !isOpen) onExpand();
            setIsOpen(!isOpen);
          }}>
          <Title hasBorder={isOpen} label={title} size="lg" variant={titleVariant} />
          <div className="flex">
            {action ? (
              <Button
                hasNoBorder
                icon={action.icon}
                isOutline
                label={action.label}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  action.onClick();
                }}
                size={action.size}
                variant={action.variant}
              />
            ) : null}
            {isCollapsible ? (
              <div>
                <Button
                  hasNoBorder
                  icon={isOpen ? Icons["arrow-up"] : Icons["arrow-down"]}
                  isOutline
                  label=""
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
      <div
        className={tableContainer()}
        style={{ height: (isCollapsible && isOpen) || !isCollapsible ? "calc-size(auto, round(up, size, 0px))" : 0 }}>
        <table className={tableClasses()}>
          <thead className={thead()}>
            {headers.length ? (
              <tr className={tr()}>
                {headers.map((header) => (
                  <th key={header.id} className={th()}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ) : null}
          </thead>
          <tbody className={tbody()}>
            {!isLoading && !data.length ? (
              <tr className={tr()}>
                <td>ALERT HERE</td>
              </tr>
            ) : null}
            {isLoading ? (
              <TableSkeleton tr={tr()} td={td()} />
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className={tr()}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={td()}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
