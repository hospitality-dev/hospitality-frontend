import {
  Button,
  CellContext,
  ContactType,
  createColumnHelper,
  groupByContacts,
  Icons,
  SuppliersType,
  Table,
  useDeviceType,
  useDrawer,
  useGenerateFile,
  useList,
  useTable,
} from "@hospitality/hospitality-ui";
import { useState } from "react";

type Entity = Pick<SuppliersType, "id" | "title" | "companyId">;
const columnHelper = createColumnHelper<Entity>();

function ActionButton(info: CellContext<Entity, unknown>) {
  const { openDrawer } = useDrawer("update_supplier");
  const [isActive, setIsActive] = useState(false);
  const { data: contacts = [] } = useList<ContactType>(
    { model: "contacts", fields: ["id", "title", "value", "contactType", "prefix", "iso3"] },
    { urlSuffix: `supplier/${info.row.original.id}`, enabled: isActive }
  );
  const { mutate: generate } = useGenerateFile({ type: "qr_codes", prefix: "contact/suppliers" });
  const deviceType = useDeviceType();
  const groupedContacts = groupByContacts(contacts);
  return (
    <div
      onMouseOver={() => {
        if (!isActive) setIsActive(true);
      }}>
      <Button
        allowedPlacements={["left", "left-start", "left-end"]}
        hasNoBorder
        icon={Icons.menu}
        isOutline
        items={[
          {
            id: "contact",
            title: "Contact supplier",
            icon: Icons.phone,
            allowedPlacements: ["left-start"],
            subItems: [
              {
                id: "phone",
                title: "Phone numbers",
                icon: Icons.phone,
                subItems: groupedContacts.phone.map((c) => ({
                  id: c.id,
                  title: `${c.prefix ? `+${c.prefix}` : ""}${c.value}`,
                  image: c.prefix && c.iso3 ? `/flags/${c.iso3}.svg` : undefined,
                  onClick: () => {
                    if (deviceType === "phone") {
                      const el = document.createElement("a");
                      el.href = `tel:+${c.prefix}${c.value}`;
                      el.click();
                      el.remove();
                    } else {
                      generate(c.id);
                    }
                  },
                })),
              },
              {
                id: "email",
                title: "Email",
                icon: Icons.email,
                subItems: groupedContacts.email.map((c) => ({ id: c.id, title: c.value })),
              },
              {
                id: "websites",
                title: "Websites",
                icon: Icons.website,
                subItems: groupedContacts.website.map((c) => ({ id: c.id, title: c.value })),
              },
              {
                id: "other",
                title: "Other",
                icon: Icons.info,
                subItems: groupedContacts.other.map((c) => ({ id: c.id, title: c.value })),
              },
            ],
          },
          {
            id: "edit",
            title: "Edit supplier",
            onClick: () => openDrawer("Edit supplier", { id: info.row.original.id }),
            icon: Icons.edit,
            isHidden: !info.row.original.companyId,
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
    meta: {},
  }),

  columnHelper.display({
    id: "isActive",
    header: "Actions",
    cell: ActionButton,
    minSize: 100,
    maxSize: 120,
    size: 120,
    meta: {
      alignment: "center",
    },
  }),
];

export function Suppliers() {
  const { data: suppliers = [] } = useList<SuppliersType>({ model: "suppliers", fields: ["id", "title", "companyId"] });
  const [meta, dispatch] = useTable<Entity>();
  const { openDrawer } = useDrawer("create_supplier");
  return (
    <div className="flex flex-col gap-y-2">
      <div className="ml-auto w-fit">
        <Button icon={Icons.add} label="Create" onClick={() => openDrawer("Create supplier")} variant="info" />
      </div>
      <Table<Entity> columns={columns} data={suppliers} dispatch={dispatch} meta={meta} type="suppliers" />
    </div>
  );
}
