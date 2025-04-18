import {
  Button,
  CellContext,
  createColumnHelper,
  downloadFunction,
  FilesType,
  formatFromUTC,
  Icon,
  Icons,
  Table,
  urlFunction,
  useGenerateReport,
  useList,
} from "@hospitality/hospitality-ui";

const columnHelper = createColumnHelper<FilesType>();

function ActionButton(info: CellContext<FilesType, unknown>) {
  return (
    <div className="w-8">
      <Button
        allowedPlacements={["left", "left-start", "left-end"]}
        hasNoBorder
        icon={Icons.menu}
        isOutline
        items={[
          {
            id: "view_report",
            onClick: async () => {
              const url = await urlFunction({ id: info.row.original.id, urlPrefix: "reports", userReset: () => {} });
              if (url) window.open(url);
            },
            title: "View",
            icon: Icons.eye,
          },
          {
            id: "download_report",
            onClick: () => downloadFunction({ id: info.row.original.id, userReset: () => {} }),
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
  columnHelper.accessor("createdAt", {
    header: "Date of creation",
    cell: (info) => (
      <span className="flex items-center gap-x-1">
        <span>{formatFromUTC(info.getValue())}</span>
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
  const { mutate: generateReport } = useGenerateReport();
  const { data: reports = [], isPending } = useList<FilesType>(
    { model: "files", fields: ["id", "title", "type", "createdAt"] },
    { urlSuffix: "reports" }
  );
  return (
    <div className="flex flex-col gap-y-2 pt-2">
      <div className="self-end">
        <Button
          allowedPlacements={["bottom-end"]}
          icon={Icons.createReport}
          items={[
            {
              id: "generate",
              title: "Generate",
              icon: Icons.generateReport,
              allowedPlacements: ["left"],
              subItems: [{ id: "inventory_report", title: "Inventory report", icon: Icons.inventory, onClick: generateReport }],
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
