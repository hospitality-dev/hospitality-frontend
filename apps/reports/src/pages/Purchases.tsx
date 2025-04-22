import {
  Button,
  createColumnHelper,
  formatFromUTC,
  Icons,
  PurchasesType,
  Table,
  useList,
  useTable,
} from "@hospitality/hospitality-ui/src";

const columnHelper = createColumnHelper<PurchasesType>();

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
            id: "view_purchase",
            onClick: async () => {
              //   const url = await urlFunction({ id: info.row.original.id, urlPrefix: "reports", userReset: () => {} });
              //   if (url) window.open(url);
            },
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
      <span className="flex items-center gap-x-1 font-semibold">
        <span>{(info.getValue() || "").replaceAll(/\d*[-]\d*/g, "")}</span>
      </span>
    ),
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

export function Purchases() {
  const [meta, dispatch] = useTable<PurchasesType>();
  const { data: reports = [], isPending } = useList<PurchasesType>({
    model: "purchases",
    sort: meta.sort,
    fields: ["id", "createdAt", "purchasedAt", "businessTitle", "businessLocationTitle"],
  });
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
      <Table columns={columns} data={reports || []} dispatch={dispatch} isLoading={isPending} meta={meta} />
    </div>
  );
}
