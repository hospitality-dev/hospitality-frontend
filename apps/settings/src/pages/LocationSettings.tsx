import {
  Avatar,
  Button,
  Contacts,
  ContactType,
  Form,
  Icons,
  Input,
  LocationsMutatorSchema,
  LocationsMutatorType,
  LocationsType,
  useAuth,
  useDrawer,
  useForm,
  useList,
  useRead,
  useUpdate,
} from "@hospitality/hospitality-ui";
import { useStore } from "@tanstack/react-store";

type EntityType = Pick<LocationsType, "id" | "title" | "imageId">;

export function LocationSettings() {
  const auth = useAuth();
  const { openDrawer } = useDrawer("upload");
  const {
    data: locationData,
    isLoading,
    isSuccess,
  } = useRead<EntityType>(
    {
      model: "locations",
      id: auth.user?.locationId || "",
      fields: ["id", "title", "imageId"],
    },
    { enabled: !!auth.user?.locationId }
  );
  const { data: locationContacts, isLoading: isLoadingContacts } = useList<ContactType>(
    {
      model: "contacts",
      fields: ["id", "value", "title", "iso3", "prefix", "contactType", "placeId", "isPrimary", "isPublic"],
    },
    { urlSuffix: `location/${auth?.user?.locationId}`, enabled: isSuccess && !!auth?.user?.locationId }
  );

  const { mutate: update } = useUpdate<LocationsMutatorType>("locations", { refetchModels: ["locations"] });

  const form = useForm<LocationsMutatorType>({
    defaultValues: {
      id: locationData?.id || crypto.randomUUID(),
      title: locationData?.title,
      contacts: locationContacts || [],
    },
    validators: {
      onChange: LocationsMutatorSchema,
      onSubmit: LocationsMutatorSchema,
    },
    onSubmit: update,
  });
  const contacts = useStore(form.store, (state) => state.values.contacts);
  if (!isSuccess) return null;

  return (
    <Form handleSubmit={form.handleSubmit}>
      <div className="flex h-full flex-col gap-y-2">
        <div className="border-primary flex min-h-20 items-start gap-2 border-b">
          <div className="mt-1">
            <Avatar
              imageId={locationData?.imageId}
              label={locationData?.title || ""}
              onClick={() =>
                openDrawer("Upload location logo", {
                  id: locationData?.id,
                  uploadType: "location_logo",
                  types: ["jpg", "jpeg", "png", "webp", "gif", "svg"],
                  isMultiple: false,
                })
              }
              size="xl"
              type="location_logo"
            />
          </div>
          <form.Field
            children={(field) => (
              <Input
                errors={field.state.meta.errors}
                isDisabled={isLoading}
                label="Title"
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                value={field.state.value || ""}
              />
            )}
            name="title"
          />
        </div>
        <div className="mt-2 flex flex-col gap-y-4 overflow-y-auto">
          <div className="flex flex-col gap-y-4">
            {isLoadingContacts ? null : (
              // @ts-expect-error tanstack form limitation
              <Contacts contacts={contacts} form={form} isLoading={isLoadingContacts} type="professional" />
            )}
          </div>
        </div>
        <div className="sticky bottom-0 mt-auto md:col-span-2">
          <form.Subscribe<{ isDisabled: boolean }>
            children={(state) => (
              <Button
                icon={Icons.save}
                isDisabled={state.isDisabled}
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
