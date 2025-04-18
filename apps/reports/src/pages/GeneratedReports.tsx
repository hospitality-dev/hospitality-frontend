import {
  Button,
  createColumnHelper,
  FilesType,
  Icon,
  Icons,
  Table,
  urlFunction,
  useList,
  useLogout,
} from "@hospitality/hospitality-ui";

const columnHelper = createColumnHelper<FilesType>();

function ActionButton() {
  return (
    <div className="w-8">
      <Button
        allowedPlacements={["left", "left-start", "left-end"]}
        hasNoBorder
        icon={Icons.menu}
        isOutline
        items={[
          {
            id: "add_amount",
            onClick: () => {},
            title: "Download",
            icon: Icons.download,
          },
        ]}
        onClick={undefined}
        size="xl"
        variant="primary"
      />
    </div>
  );
}

const columns = [
  columnHelper.accessor("title", {
    header: "Title",
    cell: (info) => (
      <span className="flex items-center gap-x-1 font-semibold">
        <Icon fontSize={24} icon={Icons[info.row.original.type]} />
        <span>{info.getValue()}</span>
      </span>
    ),
  }),

  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ActionButton,
    meta: {
      isCentered: true,
    },
    minSize: 100,
    size: 100,
    maxSize: 100,
  }),
];

export function GeneratedReports() {
  const logout = useLogout();
  const { data: reports = [], isPending } = useList<FilesType>(
    { model: "files", fields: ["id", "title", "type"] },
    { urlSuffix: "report" }
  );
  return (
    <div className="flex flex-col gap-y-2 pt-2">
      <div className="self-end">
        <Button
          allowedPlacements={["bottom-end"]}
          icon={Icons.createReport}
          items={[
            {
              id: "1",
              title: "Inventory report",
              icon: Icons.inventory,
              onClick: () => urlFunction({ userReset: logout, urlSuffix: "inventory-report", method: "GET" }),
            },
          ]}
          label="Manage"
          onClick={undefined}
          variant="info"
        />
      </div>
      <Table columns={columns} data={reports || []} isLoading={isPending} />
    </div>
  );
}
