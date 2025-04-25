import { Button, createColumnHelper, Icons, SuppliersType, Table, useList, useTable } from "@hospitality/hospitality-ui";

type Entity = Pick<SuppliersType, "id" | "title">;
const columnHelper = createColumnHelper<Entity>();

const columns = [
  columnHelper.accessor("title", {
    header: "Title",
    cell: (info) => (
      <span className="flex max-w-full items-center gap-x-1 overflow-hidden">
        <div>
          <Button
            hasNoBorder
            icon={info.row.getIsExpanded() ? Icons.arrowDown : Icons.arrowRight}
            isOutline
            onClick={() => info.row.toggleExpanded(!info.row.getIsExpanded())}
          />
        </div>
        <div className="truncate">{info.getValue()}</div>
      </span>
    ),
  }),

  columnHelper.display({
    id: "isActive",
    header: "Actions",
    cell: () => <Button hasNoBorder icon={Icons.menu} isOutline onClick={() => {}} size="xl" />,
    minSize: 100,
    maxSize: 120,
    size: 120,
    meta: {
      isCentered: true,
    },
  }),
];

export function Suppliers() {
  const { data: suppliers = [] } = useList<SuppliersType>({ model: "suppliers", fields: ["id", "title"] });
  const [meta, dispatch] = useTable<Entity>();
  return (
    <div className="flex flex-col gap-y-2">
      <div className="ml-auto w-fit">
        <Button icon={Icons.add} label="Create" onClick={undefined} variant="info" />
      </div>
      <Table<Entity> columns={columns} data={suppliers} dispatch={dispatch} meta={meta} />
    </div>
  );
}
