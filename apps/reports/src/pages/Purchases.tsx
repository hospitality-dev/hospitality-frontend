import {
  Button,
  CellContext,
  createColumnHelper,
  formatCurrency,
  formatFromUTC,
  Icons,
  PurchasesType,
  Table,
  useDrawer,
  useGenerateFile,
  useList,
  useTable,
} from "@hospitality/hospitality-ui/src";

type Entity = PurchasesType & { businessLocationTitle: string; businessTitle: string };

const columnHelper = createColumnHelper<Entity>();

function ActionButton(info: CellContext<Entity, unknown>) {
  const { mutate } = useGenerateFile({ type: "reports", prefix: "purchases/bill", id: info.row.original.id });
  return (
    <div className="w-8">
      <Button
        allowedPlacements={["left", "left-start", "left-end"]}
        hasNoBorder
        icon={Icons.menu}
        isOutline
        items={[
          {
            id: "view_purchase",
            onClick: mutate,
            title: "View",
            icon: Icons.eye,
          },
          {
            id: "download_purchase",
            // onClick: () => downloadFunction({ id: info.row.original.id, userReset: () => {} }),
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
  columnHelper.accessor("businessLocationTitle", {
    header: "Store",
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
        <div className="truncate">{(info.getValue() || "").replaceAll(/\d*[-]\d*/g, "")}</div>
      </span>
    ),
    meta: {
      isSortable: true,
    },
  }),
  columnHelper.accessor("businessTitle", {
    header: "Company",
    cell: (info) => <div className="max-w-full truncate">{info.getValue() || ""}</div>,
    meta: {
      isSortable: true,
    },
  }),
  columnHelper.accessor("purchasedAt", {
    header: "Purchase date",
    cell: (info) => (
      <span className="flex items-center gap-x-1">
        <span>{formatFromUTC(info.getValue(), "dd.MM.yyyy HH:MM")}</span>
      </span>
    ),
    meta: {
      isSortable: true,
    },
  }),
  columnHelper.accessor("total", {
    header: "Total",
    cell: (info) => <span className="font-semibold">{formatCurrency(info.getValue())}</span>,
    meta: {
      isSortable: true,
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: ActionButton,
    meta: {
      alignment: "center",
    },
    minSize: 100,
    size: 100,
    maxSize: 100,
  }),
];

export function Purchases() {
  const [meta, dispatch] = useTable<Entity>();
  const { data: reports = [], isPending } = useList<Entity>({
    model: "purchases",
    sort: meta.sort,
    fields: ["id", "createdAt", "purchasedAt", "businessTitle", "businessLocationTitle", "total", "currencyTitle"],
  });
  const { openDrawer } = useDrawer("create_purchases");

  return (
    <div className="flex flex-col gap-y-2 pt-2">
      <div className="self-end">
        <Button
          allowedPlacements={["bottom-end"]}
          icon={Icons.manage}
          items={[
            {
              id: "add_purchase_qr_code",
              title: "Add (QR Code)",
              icon: Icons.qrCodes,
              onClick: () => openDrawer("Add purchase"),
            },
            {
              id: "add_purchase_url",
              title: "Add (Link)",
              icon: Icons.link,
            },
          ]}
          label="Manage"
          onClick={undefined}
          variant="info"
        />
      </div>
      <Table columns={columns} data={reports || []} dispatch={dispatch} isLoading={isPending} meta={meta} type="purchases" />
    </div>
  );
}
