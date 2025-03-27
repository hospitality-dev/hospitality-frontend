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
  hasNoHeader?: boolean;
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
    container: "overflow-x-auto rounded-md border border-gray-300 bg-gray-100 px-2",
    tableContainer: "transition-[height]",
    tableClasses: "min-w-full overflow-auto",
    thead: "border-b border-gray-300 text-left text-gray-500",
    th: "flex-1 p-2 text-sm font-light uppercase",
    tbody: "flex min-h-10 flex-col divide-y divide-gray-300 py-2",
    tr: "flex w-full items-center rounded has-[td]:hover:bg-gray-200",
    td: "flex h-10 flex-1 items-center px-2",
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
    isCollapsible: {
      true: {
        container: "py-2",
      },
    },
    isLoading: {
      true: {
        tbody: "",
        tr: "min-h-10 animate-pulse rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-50 py-1",
      },
    },
    isCentered: {
      true: {
        th: "flex w-full justify-center",
        td: "flex w-full justify-center",
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
  columns = [],
  data,
  title,
  titleVariant,
  isInitialOpen = true,
  isCollapsible = false,
  action,
  onExpand,
  isLoading,
  hasNoHeader,
}: Props<T>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  const [isOpen, setIsOpen] = useState(isInitialOpen);
  const headers = table.getFlatHeaders();
  const { container, tableContainer, tableClasses, thead, th, tbody, tr, td } = classes({ isOpen, isLoading, isCollapsible });

  return (
    <div className={container()}>
      {title ? (
        <div
          className="relative flex cursor-pointer flex-row flex-nowrap justify-between"
          onClick={() => {
            if (onExpand && !isOpen) onExpand();
            setIsOpen(!isOpen);
          }}>
          <div className="absolute top-0 left-0 w-full">
            <Title hasBorder={isOpen} label={title} size="lg" variant={titleVariant} />
          </div>
          <div className="relative z-0 flex flex-1 justify-end gap-x-4">
            {action ? (
              <div>
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
              </div>
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
        style={{ height: (isCollapsible && isOpen) || !isCollapsible ? "calc-size(auto, size)" : 0 }}>
        <table className={tableClasses()}>
          {hasNoHeader ? null : (
            <thead className={thead()}>
              {headers.length ? (
                <tr className={tr()}>
                  {headers.map((header) => (
                    <th
                      key={header.id}
                      className={th({ isCentered: header.column.columnDef.meta?.isCentered })}
                      style={{ maxWidth: header.column.columnDef.maxSize }}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ) : null}
            </thead>
          )}
          <tbody className={tbody()}>
            {!isLoading && !data.length ? (
              <tr className={tr()}>
                <td>ALERT HERE</td>
              </tr>
            ) : null}
            {isLoading && isOpen ? <TableSkeleton td={td()} tr={tr()} /> : null}
            {!isLoading && isOpen && data.length
              ? table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className={tr()}>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={td({ isCentered: cell.column.columnDef.meta?.isCentered })}
                        style={{ maxWidth: cell.column.columnDef.maxSize }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
