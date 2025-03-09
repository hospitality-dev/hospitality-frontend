import { ReactNode } from "@tanstack/react-router";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

type Props<T> = {
  columns: ColumnDef<T, ReactNode>[];
  data: T[];
};

export function Table<T>({ columns, data }: Props<T>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-md border border-gray-300 bg-gray-100 px-4 pt-4 pb-2">
      <table className="min-w-full">
        <thead className="border-b border-gray-300 text-left text-gray-500">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4 py-2 text-sm font-light uppercase">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-300">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-blue-100">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
