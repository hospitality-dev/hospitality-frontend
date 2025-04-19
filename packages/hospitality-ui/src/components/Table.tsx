import { ReactNode } from "@tanstack/react-router";
import { ColumnDef, flexRender, getCoreRowModel, getExpandedRowModel, useReactTable } from "@tanstack/react-table";
import { Dispatch, Fragment, useState } from "react";
import { tv } from "tailwind-variants";

import { Icons } from "../enums";
import { AvailableIcons, Size, TableActionType, Variant } from "../types";
import { Button } from "./Button";
import { ExpandedRow } from "./ExpandedRow";
import { Title } from "./Title";

type Props<T = { id?: string } & Record<string, unknown>> = {
  columns: ColumnDef<T, ReactNode>[];
  data: T[];
  title?: string;
  titleVariant?: Variant;
  isCollapsible?: boolean;
  isInitialOpen?: boolean;
  isLoading?: boolean;
  hasNoHeader?: boolean;
  onExpand?: () => void;
  dispatch: Dispatch<TableActionType>;
  meta?: {
    sort?: { field: string; type: "asc" | "desc" } | null;
    page?: number | null;
  };
  action?: {
    onClick: () => void;
    label: string;
    icon?: AvailableIcons;
    variant?: Variant;
    size?: Size;
  };
  type?: "product_grouped_by_expiration_date" | null;
};

const classes = tv({
  slots: {
    container: "overflow-x-auto rounded-md border border-gray-300 bg-gray-100",
    tableContainer: "transition-[height]",
    tableClasses: "min-w-full overflow-auto",
    thead: "border-b border-gray-300 text-left text-gray-500",
    th: "flex flex-1 flex-nowrap items-center gap-x-2 p-2 text-sm font-light uppercase select-none",
    tbody: "flex min-h-10 flex-col divide-y divide-gray-300",
    tr: "flex w-full items-center rounded",
    td: "flex h-10 flex-1 items-center px-2",
    expandedRowContainer: "bg-gray-300 p-2",
  },
  variants: {
    variant: {
      primary: { tr: "border-primary" },
      secondary: { tr: "border-secondary" },
      info: { tr: "border-info" },
      success: { tr: "border-success" },
      warning: { tr: "border-warning" },
      error: { tr: "border-error border-2" },
    },
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
        container: "p-2",
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
export function Table<T = { id?: string; variant?: Variant } & Record<string, unknown>>({
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
  type,
  meta,
  dispatch,
}: Props<T & { id?: string; variant?: Variant } & Record<string, unknown>>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    meta,
  });
  const [isOpen, setIsOpen] = useState(isInitialOpen);
  const headers = table.getFlatHeaders();
  const { container, tableContainer, tableClasses, thead, th, tbody, tr, td, expandedRowContainer } = classes({
    isOpen,
    isLoading,
    isCollapsible,
  });

  return (
    <div className={container()}>
      {title ? (
        <div
          className="relative flex cursor-pointer flex-row flex-nowrap justify-between"
          onClick={() => {
            if (onExpand && !isOpen) onExpand();
            setIsOpen(!isOpen);
          }}>
          <div className="absolute top-0.5 left-0 w-full [&>h3]:font-medium [&>h3]:normal-case">
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
                  icon={isOpen ? Icons.arrowUp : Icons.arrowDown}
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
        <div className={tableClasses()}>
          {hasNoHeader ? null : (
            <div className={thead()}>
              {headers.length ? (
                <div className={tr()}>
                  {headers.map((header) => (
                    <div
                      key={header.id}
                      className={th({ isCentered: header.column.columnDef.meta?.isCentered })}
                      style={{ maxWidth: header.column.columnDef.maxSize }}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.columnDef.meta?.isSortable && header.id ? (
                        <div>
                          <Button
                            className="h-4 w-4"
                            hasNoBorder
                            icon={meta?.sort?.type === "desc" ? Icons.arrowDown : Icons.arrowUp}
                            isOutline
                            onClick={() =>
                              dispatch({
                                type: "SET_SORT",
                                sort: { field: header.id, type: meta?.sort?.type === "desc" ? "asc" : "desc" },
                              })
                            }
                            size="xs"
                          />
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          )}
          <div className={tbody()}>
            {!isLoading && !data.length ? (
              <div className={tr()}>
                <div>ALERT HERE</div>
              </div>
            ) : null}
            {isLoading && isOpen ? <TableSkeleton td={td()} tr={tr()} /> : null}
            {!isLoading && isOpen && data.length
              ? table.getRowModel().rows.map((row) => (
                  <Fragment key={row.id}>
                    <div className={tr()}>
                      {row.getVisibleCells().map((cell) => (
                        <div
                          key={cell.id}
                          className={td({ isCentered: cell.column.columnDef.meta?.isCentered })}
                          style={{ maxWidth: cell.column.columnDef.maxSize }}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                      ))}
                    </div>
                    {row.getIsExpanded() && row.original.id ? (
                      <div className={expandedRowContainer()}>
                        <ExpandedRow id={row.original.id} type={type} />
                      </div>
                    ) : null}
                  </Fragment>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
