import {
  Button,
  CellContext,
  createColumnHelper,
  Icons,
  Table,
  useCreate,
  useDelete,
  useDrawer,
  useList,
  useTable,
} from "@hospitality/hospitality-ui/src";
import { ManufacturersType } from "@hospitality/hospitality-ui/src/types/manufacturerTypes";

const columnHelper = createColumnHelper<ManufacturersType>();

function ActionButton(info: CellContext<ManufacturersType, unknown>) {
  const { openDrawer } = useDrawer("create_brand");
  return (
    <div>
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
            isHidden: !info.row.original.companyId,
          },
          {
            id: "add_brand",
            title: "Add brand",
            icon: Icons.addBrand,
            onClick: () => openDrawer("Create brand", { parentId: info.row.original.id }),
          },
        ]}
        onClick={undefined}
        size="xl"
      />
    </div>
  );
}
function EnabledButton(info: CellContext<ManufacturersType, unknown>) {
  const { mutate: create } = useCreate("locations_available_manufacturers", { invalidateModels: ["manufacturers"] });
  const { mutate: deleteMutation } = useDelete("locations_available_manufacturers", { invalidateModels: ["manufacturers"] });
  return (
    <Button
      label={info.row.original.availabilityId ? "Enabled" : "Disabled"}
      onClick={() =>
        info.row.original.availabilityId
          ? deleteMutation(info.row.original.availabilityId)
          : create({ value: { manufacturerId: info.row.original.id } })
      }
      variant={info.row.original.availabilityId ? "success" : "primary"}
    />
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
  columnHelper.accessor("availabilityId", {
    header: "Enabled",
    cell: EnabledButton,
    meta: {
      alignment: "center",
    },
    maxSize: 125,
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
    maxSize: 75,
    minSize: 75,
  }),
];

export function ManufacturerSettings() {
  const { data = [] } = useList<ManufacturersType>({
    model: "manufacturers",
    fields: ["id", "title", "companyId"],
    sort: { field: "title", type: "asc" },
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
