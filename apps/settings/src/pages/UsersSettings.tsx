import { createColumnHelper, FormattedEntity, Table, useList, User } from "@hospitality/hospitality-ui";

type EntityType = Pick<FormattedEntity<User>, "id" | "firstName" | "lastName" | "role">;
const columnHelper = createColumnHelper<EntityType>();

const columns = [
  columnHelper.accessor("firstName", {
    header: "First name",
    cell: (info) => <span className="font-semibold">{info.getValue()}</span>,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    cell: (info) => <i>{info.getValue() || ""}</i>,
    header: () => <span>Last name</span>,
  }),
  columnHelper.accessor((row) => row.role, {
    id: "role",
    cell: (info) => <span className="rounded-sm bg-blue-600 p-2 text-xs text-white">{info.getValue().title || ""}</span>,
    header: () => <span>Role</span>,
  }),
];
export function UsersSettings() {
  const { data = [] } = useList<User>({ model: "users", fields: ["id", "firstName", "lastName"], relations: ["role"] });
  return (
    <div>
      <Table<EntityType> columns={columns} data={data} />
    </div>
  );
}
