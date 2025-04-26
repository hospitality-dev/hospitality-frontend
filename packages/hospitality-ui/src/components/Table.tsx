import { ReactNode } from "@tanstack/react-router";
import { ColumnDef, flexRender, getCoreRowModel, getExpandedRowModel, useReactTable } from "@tanstack/react-table";
import { Dispatch, useState } from "react";
import { tv } from "tailwind-variants";

import { Icons } from "../enums";
import { AvailableIcons, Size, TableActionType, TableExpandableTypes, Variant } from "../types";
import { Alert } from "./Alert";
import { Button } from "./Button";
import { ExpandedRow } from "./ExpandedRow";
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
  dispatch: Dispatch<TableActionType<T>>;
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
  type?: TableExpandableTypes | null;
};

const classes = tv({
  slots: {
    container: "relative h-full overflow-y-auto rounded-md border border-gray-300 bg-white",
    tableContainer: "transition-[height]",
    tableClasses: "min-w-full",
    thead: "sticky top-0 min-w-fit border-b border-gray-300 text-left text-gray-500",
    th: "flex min-w-fit flex-1 flex-nowrap items-center gap-x-2 bg-gray-100 p-2 text-sm font-light uppercase shadow-sm select-none",
    tbody: "flex min-h-10 flex-col divide-y divide-gray-300",
    tr: "flex w-full min-w-fit items-center [&>div:not(.expandedContainer)]:hover:bg-blue-100",
    td: "flex h-10 flex-1 items-center px-2",
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
    isOpen: { true: "", false: "" },
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
    isSorted: {
      true: {
        th: "text-info font-semibold",
      },
    },
    hasNoData: {
      true: {
        container: "max-h-fit",
        tbody: "p-2",
        tr: "",
      },
    },
  },
  compoundVariants: [
    {
      isCollapsible: true,
      isOpen: true,
      class: {
        tableContainer: "overflow-hidden",
      },
    },
    {
      isCollapsible: true,
      isOpen: false,
      class: {
        tableContainer: "h-0 overflow-hidden",
      },
    },
  ],
});

function getSortIcon(sort: "asc" | "desc" | null | undefined, isSorted: boolean) {
  if (!isSorted) return Icons.arrowsUpAndDown;
  if (sort === "asc") return Icons.arrowUp;
  if (sort === "desc") return Icons.arrowDown;
  return Icons.arrowsUpAndDown;
}
function TableSkeleton({ tr, td }: { tr: string; td: string }) {
  return (
    <>
      <tr className={tr}>
        <td className={td} />
      </tr>
    </>
  );
}

export function Table<T extends object>({
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
}: Props<T>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    meta,
  });
  const [isOpen, setIsOpen] = useState(isInitialOpen);
  const headers = table.getFlatHeaders();
  const { container, tableContainer, tableClasses, thead, th, tbody, tr, td } = classes({
    isOpen,
    isLoading,
    isCollapsible,
    hasNoData: !data.length,
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
          <div className="sticky top-0 left-0 w-full [&>h3]:font-medium [&>h3]:normal-case">
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
                      className={th({
                        isCentered: header.column.columnDef.meta?.isCentered,
                        isSorted: header.id === meta?.sort?.field,
                      })}
                      style={{
                        width: header.getSize(),
                      }}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.columnDef.meta?.isSortable && header.id ? (
                        <div>
                          <Button
                            className="h-4 w-4"
                            hasNoBorder
                            icon={getSortIcon(meta?.sort?.type, header.id === meta?.sort?.field)}
                            isOutline
                            onClick={() => {
                              if (meta?.sort?.type === "asc") {
                                dispatch({
                                  type: "SET_SORT",
                                  sort: null,
                                });
                              } else {
                                dispatch({
                                  type: "SET_SORT",
                                  sort: { field: header.id as keyof T, type: meta?.sort?.type === "desc" ? "asc" : "desc" },
                                });
                              }
                            }}
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
              <div className={tr({ hasNoData: true })}>
                <Alert content="Currently, there is no content." variant="info" />
              </div>
            ) : null}
            {isLoading && isOpen ? <TableSkeleton td={td()} tr={tr()} /> : null}
            {!isLoading && isOpen && data.length
              ? table.getRowModel().rows.map((row) => (
                  <div key={row.id} className="block w-full">
                    <div className={`${tr()} flex flex-col`}>
                      <div className="flex w-full">
                        {row.getVisibleCells().map((cell) => (
                          <div
                            key={cell.id}
                            className={`${td({ isCentered: cell.column.columnDef.meta?.isCentered })} td`}
                            style={{
                              width: cell.column.getSize(),
                            }}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </div>
                        ))}
                      </div>
                      {row.getIsExpanded() && "id" in row.original && typeof row.original.id === "string" && row.original.id ? (
                        <ExpandedRow id={row.original.id as string} type={type} />
                      ) : null}
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
