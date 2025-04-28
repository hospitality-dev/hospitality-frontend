import { Button, createColumnHelper, Icons, Table, useList, useTable } from "@hospitality/hospitality-ui/src";
import { ManufacturersType } from "@hospitality/hospitality-ui/src/types/manufacturerTypes";

const columnHelper = createColumnHelper<ManufacturersType>();

function ActionButton() {
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
  columnHelper.display({
    id: "actions",
    header: "actions",
    cell: ActionButton,
    meta: {
      alignment: "center",
    },
    maxSize: 100,
  }),
];

export function ManufacturerSettings() {
  const { data = [] } = useList<ManufacturersType>({ model: "manufacturers", fields: ["id", "title", "companyId"] });
  const [meta, disptach] = useTable<ManufacturersType>();
  return (
    <div className="flex flex-col gap-y-2">
      <div className="ml-auto w-fit">
        <Button icon={Icons.add} isDisabled label="Create" onClick={undefined} variant="info" />
      </div>
      <Table<ManufacturersType> columns={columns} data={data} dispatch={disptach} meta={meta} type="manufacturers" />
    </div>
  );
}
