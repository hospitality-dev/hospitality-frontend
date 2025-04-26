import {
  Avatar,
  Badge,
  Button,
  createColumnHelper,
  DefaultRoleIds,
  getSentenceCase,
  getUserInfo,
  Icons,
  RolesType,
  Row,
  Table,
  useAuth,
  useDelete,
  useDrawer,
  useList,
  useNavigate,
  UsersType,
  useTable,
} from "@hospitality/hospitality-ui";

type EntityType = Pick<UsersType, "id" | "firstName" | "lastName" | "imageId"> & { role: Pick<RolesType, "id" | "title"> };
const columnHelper = createColumnHelper<EntityType>();

function ActionsButton({ row }: { row: Row<EntityType> }) {
  const auth = useAuth();
  const navigate = useNavigate();
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
              id: "edit_profile",
              title: "Profile",
              icon: Icons.user,
              isHidden: !(
                auth.user?.roleId === DefaultRoleIds.owner ||
                auth.user?.roleId === DefaultRoleIds.generalManager ||
                auth.user?.roleId === DefaultRoleIds.locationManager
              ),
              onClick: () => navigate({ to: "/employee-management/$userId", params: { userId: row.original.id } }),
            },
            {
              id: "remove_user_from_location",
              title: "Remove from location",
              icon: Icons.removeUser,
              isHidden: !auth.user?.permissions?.locations_users?.delete || row.original.role.title === "owner",
              onClick: () => mutate(row.original.id),
            },
          ]}
          onClick={undefined}
          size="xl"
          variant="primary"
        />
      </div>
    </div>
  );
}

const columns = [
  columnHelper.accessor("imageId", {
    header: "Image",
    cell: (info) => (
      <div>
        <Avatar imageId={info.getValue()} label={getUserInfo(info.row.original).title} size="sm" type="user_avatar" />
      </div>
    ),
    maxSize: 50,
    meta: {
      alignment: "center",
    },
  }),
  columnHelper.accessor("firstName", {
    header: "First name",
    cell: (info) => <span className="font-semibold">{info.getValue()}</span>,
    meta: {
      isStretch: true,
    },
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    cell: (info) => <span className="font-semibold">{info.getValue()}</span>,
    header: () => <span>Last name</span>,
    meta: {
      isStretch: true,
    },
  }),
  columnHelper.accessor((row) => row.role, {
    id: "role",
    cell: (info) => <Badge label={getSentenceCase(info.getValue().title)} variant="info" />,
    header: () => <span>Role</span>,
  }),
  columnHelper.display({
    id: "isActive",
    header: "Actions",
    meta: {
      alignment: "center",
    },
    cell: ActionsButton,
    maxSize: 125,
  }),
];
export function EmployeeManagement() {
  const auth = useAuth();
  const { openDrawer: openAddNewUserDrawer } = useDrawer("add_new_user");
  const { data = [] } = useList<EntityType>(
    { model: "users", fields: ["id", "firstName", "lastName", "imageId"] },
    { urlSuffix: `location/${auth.user?.locationId}`, enabled: !!auth.user?.locationId }
  );
  const { openDrawer: openAddUserFromLocation } = useDrawer("add_user_from_location");
  const [state, dispatch] = useTable<EntityType>();
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
