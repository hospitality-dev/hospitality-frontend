import {
  Badge,
  Button,
  createColumnHelper,
  getSentenceCase,
  Icons,
  RolesType,
  Row,
  Table,
  useAuth,
  useDelete,
  useDrawer,
  useList,
  UsersType,
  useTable,
} from "@hospitality/hospitality-ui";

type EntityType = Pick<UsersType, "id" | "firstName" | "lastName"> & { role: Pick<RolesType, "id" | "title"> };
const columnHelper = createColumnHelper<EntityType>();

function ActionsButton({ row }: { row: Row<EntityType> }) {
  const auth = useAuth();

  const { mutate } = useDelete("locations_users", { invalidateModels: ["users"] });
  return (
    <div className="flex h-full items-center justify-end">
      <div className="w-8">
        <Button
          allowedPlacements={["left", "left-start", "left-end"]}
          hasNoBorder
          icon={Icons.menu}
          isOutline
          items={[
            {
              id: "remove_user_from_location",
              title: "Remove from location",
              icon: Icons.removeUser,
              isHidden: !auth.user?.permissions?.locations_users?.delete || row.original.role.title === "owner",
              onClick: () => mutate(row.original.id),
            },
          ]}
          onClick={() => {}}
          size="xl"
          variant="primary"
        />
      </div>
    </div>
  );
}

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
    cell: (info) => <Badge label={getSentenceCase(info.getValue().title)} variant="info" />,
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
    cell: ActionsButton,
    maxSize: 125,
  }),
];
export function EmployeeManagement() {
  const auth = useAuth();
  const { openDrawer: openAddNewUserDrawer } = useDrawer("add_new_user");
  const { data = [] } = useList<EntityType>(
    { model: "users", fields: ["id", "firstName", "lastName"] },
    { urlSuffix: `location/${auth.user?.locationId}`, enabled: !!auth.user?.locationId }
  );
  const { openDrawer: openAddUserFromLocation } = useDrawer("add_user_from_location");
  const [state, dispatch] = useTable();
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
              icon: Icons.addUser,
              onClick: () => openAddNewUserDrawer("Add new user to location"),
            },
            {
              id: "2",
              title: "Add from other location",
              icon: Icons.locationUser,
              onClick: () => openAddUserFromLocation("Add user from other location"),
            },
          ]}
          label="Manage"
          onClick={undefined}
          variant="info"
        />
      </div>
      <div className="max-h-full overflow-y-auto">
        <Table<EntityType> columns={columns} data={data} dispatch={dispatch} meta={state} />
      </div>
    </div>
  );
}
