import {
  Avatar,
  Button,
  Contacts,
  ContactType,
  DefaultRoleIds,
  Form,
  formatForOptions,
  getUserInfo,
  Icons,
  Input,
  Select,
  useAuth,
  useDrawer,
  useForm,
  useList,
  useParams,
  useRead,
  useRole,
  UsersMutatorSchema,
  UsersMutatorType,
  UsersType,
  useUpdate,
} from "@hospitality/hospitality-ui";
import { useStore } from "@tanstack/react-form";

export function UserProfile() {
  const params = useParams({ from: "/employee-management/$userId", shouldThrow: false });
  const auth = useAuth();

  const { openDrawer } = useDrawer("upload");
  const { mutate: update } = useUpdate<UsersMutatorType>("users", { refetchModels: ["contacts"] });
  const { roles } = useRole();
  const {
    data: userData,
    isLoading,
    isSuccess,
  } = useRead<UsersType>(
    {
      model: "users",
      id: params?.userId || auth.user?.id || "",
      fields: ["id", "firstName", "lastName", "imageId", "dateOfBirth", "dateOfEmployment", "roleId"],
    },
    { enabled: !!(params?.userId || auth.user?.id) }
  );

  const { data: userContacts, isLoading: isLoadingContacts } = useList<ContactType>(
    {
      model: "contacts",
      fields: ["id", "value", "title", "prefix", "contactType", "placeId", "iso3", "isPrimary", "isPublic"],
    },
    { urlSuffix: `user/${userData?.id}`, enabled: isSuccess && !!userData?.id }
  );

  const form = useForm<UsersMutatorType>({
    defaultValues: {
      id: userData?.id || "",
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      roleId: userData?.roleId,
      contacts: userContacts || [],
    },
    validators: {
      onSubmit: UsersMutatorSchema,
      onChange: UsersMutatorSchema,
    },
    onSubmit: update,
  });
  const contacts = useStore(form.store, (state) => state.values.contacts);
  if (!isSuccess) return null;
  const formattedUser = getUserInfo(userData);
  return (
    <Form handleSubmit={form.handleSubmit}>
      <div className="flex h-full flex-col">
        <div className="border-primary grid min-h-20 grid-cols-1 items-start gap-2 border-b md:grid-cols-3">
          <form.Field
            children={(field) => (
              <div className="flex items-center gap-x-1.5">
                <div className="">
                  <Avatar
                    imageId={userData?.imageId}
                    label={formattedUser?.title || ""}
                    onClick={() =>
                      openDrawer("Change user avatar", {
                        id: userData?.id,
                        uploadType: "user_avatar",
                        types: ["jpg", "jpeg", "png", "webp", "gif", "svg"],
                        isMultiple: false,
                      })
                    }
                    size="xl"
                    type="user_avatar"
                  />
                </div>
                <Input
                  errors={field.state.meta.errors}
                  isDisabled={isLoading}
                  label="First name"
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  value={field.state.value || ""}
                />
              </div>
            )}
            name="firstName"
          />
          <form.Field
            children={(field) => (
              <Input
                errors={field.state.meta.errors}
                isDisabled={isLoading}
                label="Last name"
                name={field.name}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                value={field.state.value || ""}
              />
            )}
            name="lastName"
          />
          <form.Field
            children={(field) => (
              <Select
                errors={field.state.meta.errors}
                isDisabled={field.state.value === DefaultRoleIds.owner || !auth.user?.permissions?.users?.update}
                label="Role"
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e?.value)}
                options={formatForOptions(roles)}
                value={field.state.value || ""}
              />
            )}
            name="roleId"
          />
        </div>
        <div className="mt-2 flex flex-1 flex-col gap-y-4 overflow-y-auto">
          <div className="flex flex-col gap-y-4">
            {isLoadingContacts ? null : (
              // @ts-expect-error tanstack form limitation
              <Contacts contacts={contacts} form={form} isLoading={isLoadingContacts} type="personal" />
            )}
          </div>
        </div>
        <div className="sticky bottom-0 md:col-span-2">
          <form.Subscribe<{ isDisabled: boolean }>
            children={(sub) => (
              <Button
                icon={Icons.save}
                isDisabled={sub.isDisabled}
                label="Save"
                onClick={undefined}
                size="lg"
                variant="success"
              />
            )}
            selector={(state) => ({ isDisabled: !state.canSubmit })}
          />
        </div>
      </div>
    </Form>
  );
}
