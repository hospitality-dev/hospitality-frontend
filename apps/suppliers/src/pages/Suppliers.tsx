import {
  Button,
  CellContext,
  ContactType,
  createColumnHelper,
  groupByContacts,
  Icons,
  SuppliersType,
  Table,
  useList,
  useTable,
} from "@hospitality/hospitality-ui";
import { useState } from "react";

type Entity = Pick<SuppliersType, "id" | "title" | "companyId">;
const columnHelper = createColumnHelper<Entity>();

function ActionButton(info: CellContext<Entity, unknown>) {
  const [isActive, setIsActive] = useState(false);
  const { data: contacts = [] } = useList<ContactType>(
    { model: "suppliers", fields: ["id", "title", "value", "contactType"] },
    { urlSuffix: `supplier/${info.row.original.id}`, enabled: isActive }
  );
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
                subItems: groupedContacts.phone.map((c) => ({ id: c.id, title: `${c.prefix}${c.value}` })),
              },
              {
                id: "phone",
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
          { id: "edit", title: "Edit supplier", icon: Icons.edit, isHidden: !info.row.original.companyId },
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
  return (
    <div className="flex flex-col gap-y-2">
      <div className="ml-auto w-fit">
        <Button icon={Icons.add} label="Create" onClick={undefined} variant="info" />
      </div>
      <Table<Entity> columns={columns} data={suppliers} dispatch={dispatch} meta={meta} type="suppliers" />
    </div>
  );
}
