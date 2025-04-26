/* eslint-disable no-undef */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import "@tanstack/react-table"; // or vue, svelte, solid, qwik, etc.

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    isSortable?: boolean;
    isStretch?: boolean;
    alignment?: "left" | "center" | "right";
  }
}
