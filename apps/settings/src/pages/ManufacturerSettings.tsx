import {
  Button,
  CellContext,
  createColumnHelper,
  Icons,
  Table,
  useDrawer,
  useList,
  useTable,
} from "@hospitality/hospitality-ui/src";
import { ManufacturersType } from "@hospitality/hospitality-ui/src/types/manufacturerTypes";

const columnHelper = createColumnHelper<ManufacturersType>();

function ActionButton(info: CellContext<ManufacturersType, unknown>) {
  return (
    <div>
      {info.row.original.companyId ? (
        <Button
          allowedPlacements={["left", "left-start", "left-end"]}
          hasNoBorder
          icon={Icons.menu}
          isOutline
          items={[
            {
              id: "edit_manufacturer",
              title: "Edit manufacturer",
              icon: Icons.edit,
            },
            {
              id: "add_brand",
              title: "Add brand",
              icon: Icons.addBrand,
            },
          ]}
          onClick={undefined}
          size="xl"
        />
      ) : null}
    </div>
  );
}

const columns = [
  columnHelper.accessor("title", {
    header: "Title",
    cell: (info) => (
      <div className="flex max-w-full items-center gap-x-2">
        <div>
          <Button
            hasNoBorder
            icon={info.row.getIsExpanded() ? Icons.arrowDown : Icons.arrowRight}
            isOutline
            onClick={() => info.row.toggleExpanded(!info.row.getIsExpanded())}
          />
        </div>
        <div className="truncate font-medium">{info.getValue()}</div>
      </div>
    ),
    meta: {},
    minSize: 200,
  }),
  columnHelper.accessor("companyId", {
    header: "Default",
    cell: ({ row: { original } }) => (original.companyId ? "No" : "Yes"),
    meta: {
      alignment: "center",
    },
    maxSize: 100,
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ActionButton,
    meta: {
      alignment: "center",
    },
    maxSize: 100,
  }),
];

export function ManufacturerSettings() {
  const { data = [] } = useList<ManufacturersType>({
    model: "manufacturers",
    fields: ["id", "title", "companyId"],
    sort: { field: "companyId", type: "desc" },
  });
  const [meta, disptach] = useTable<ManufacturersType>();
  const { openDrawer } = useDrawer("create_manufacturer");
  return (
    <div className="flex flex-col gap-y-2">
      <div className="ml-auto w-fit">
        <Button icon={Icons.add} label="Create" onClick={() => openDrawer("Create manufacturer")} variant="info" />
      </div>
      <Table<ManufacturersType> columns={columns} data={data} dispatch={disptach} meta={meta} type="manufacturers" />
    </div>
  );
}
