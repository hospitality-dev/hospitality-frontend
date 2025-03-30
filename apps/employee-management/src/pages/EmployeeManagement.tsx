import { Button, createColumnHelper, Icons, Roles, Table, useList, User } from "@hospitality/hospitality-ui";

type EntityType = Pick<User, "id" | "firstName" | "lastName"> & { role: Pick<Roles, "id" | "title"> };
const columnHelper = createColumnHelper<EntityType>();

const columns = [
  columnHelper.accessor("firstName", {
    header: "First name",
    cell: (info) => <span className="font-semibold">{info.getValue()}</span>,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    cell: (info) => <span className="font-semibold">{info.getValue()}</span>,
    header: () => <span>Last name</span>,
  }),
  columnHelper.accessor((row) => row.role, {
    id: "role",
    cell: (info) => <span className="rounded-sm bg-blue-600 p-2 text-xs text-white">{info.getValue().title || ""}</span>,
    header: () => <span>Role</span>,
    meta: {
      isCentered: true,
    },
  }),
  columnHelper.display({
    id: "isActive",
    header: "Actions",
    meta: {
      isCentered: true,
    },
    cell: () => (
      <div className="flex h-full items-center justify-end">
        <div className="w-8">
          <Button hasNoBorder icon={Icons.menu} isOutline onClick={() => {}} size="xl" variant="primary" />
        </div>
      </div>
    ),
    maxSize: 125,
  }),
];
export function EmployeeManagement() {
  const { data = [] } = useList<EntityType>({ model: "users", fields: ["id", "firstName", "lastName"] });
  return (
    <div className="flex flex-col gap-y-2 overflow-hidden">
      <div className="self-end">
        <Button
          allowedPlacements={["bottom-end"]}
          icon={Icons.manage}
          items={[
            {
              id: "1",
              title: "Add new user",
              icon: Icons["add-user"],
            },
            {
              id: "2",
              title: "Add from other location",
              icon: Icons["location-user"],
            },
          ]}
          label="Manage"
          onClick={undefined}
          variant="info"
        />
      </div>
      <div className="max-h-full overflow-y-auto">
        <Table<EntityType> columns={columns} data={data} />
      </div>
    </div>
  );
}
