import {
  AddressSearch,
  AvailableContactTypes,
  Avatar,
  Button,
  Collapsible,
  ContactType,
  ContactTypes,
  Form,
  getSentenceCase,
  Icons,
  Input,
  LocationsMutatorType,
  LocationsType,
  Title,
  useAuth,
  useForm,
  useRead,
  useScreenSize,
} from "@hospitality/hospitality-ui";

type EntityType = Pick<LocationsType, "id" | "title" | "contacts">;
function getBaseContact(contactType: ContactTypes): ContactType {
  return {
    id: crypto.randomUUID(),
    title: getSentenceCase(contactType),
    parentId: "",
    prefix: "",
    value: "",
    contactType,
    isPublic: false,
  };
}
export function LocationSettings() {
  const auth = useAuth();
  const { isSmallScreen } = useScreenSize();
  const { data, isLoading } = useRead<EntityType>(
    {
      model: "locations",
      id: auth.user?.locationId || "",
      fields: ["id", "title"],
    },
    { enabled: !!auth.user?.locationId }
  );

  const form = useForm<LocationsMutatorType>({
    defaultValues: {
      title: data?.title,
      contacts: data?.contacts || [],
    },
  });

  return (
    <Form handleSubmit={form.handleSubmit}>
      <div className="flex h-full flex-col justify-between gap-y-2">
        <div className="grid grid-cols-1 content-start gap-2 md:grid-cols-2">
          <div className="flex items-end gap-x-2 md:col-span-2">
            <div>
              <Avatar label={data?.title || ""} size={isSmallScreen ? "xl" : "md"} />
            </div>
            <form.Field
              children={(field) => (
                <Input
                  isDisabled={isLoading}
                  label="Title"
                  name={field.name}
                  onChange={(e) => field.handleChange(e.target.value)}
                  value={field.state.value}
                />
              )}
              name="title"
            />
          </div>
          <div className="md:col-span-2">
            <Title hasBorder label="Contacts" size="lg" variant="primary" />
          </div>

          <div className="md:col-span-2">
            <Collapsible
              icon={Icons.office_address}
              isOpen
              items={[
                {
                  id: "1",
                  label: "Add",
                  icon: Icons.add,
                  variant: "info",
                  allowedPlacements: ["left-start"] as const,
                  onClick: () => {},
                  items: AvailableContactTypes.address.professional.map((addr) => ({
                    icon: Icons[addr],
                    allowedPlacements: ["left-start"] as const,
                    id: addr,
                    title: getSentenceCase(addr),
                    onClick: () => form.getFieldInfo("contacts").instance?.pushValue(getBaseContact(addr)),
                  })),
                },
              ]}
              label="Addresses">
              <div className="flex flex-col gap-y-2 py-1">
                <form.Field
                  children={(field) =>
                    field.state.value.length
                      ? field.state.value.map((contact, i) => {
                          if (contact.contactType.includes("address"))
                            return (
                              <div key={contact.id} className="flex w-full flex-row gap-x-2 md:col-span-2">
                                <form.Field
                                  children={(subfield) => (
                                    <Input
                                      helperText="Customize the title that will appear for others."
                                      label="Address display title"
                                      name={subfield.name}
                                      onChange={(e) => subfield.handleChange(e.target.value)}
                                      value={subfield.state.value || ""}
                                    />
                                  )}
                                  name={`contacts[${i}].title`}
                                />
                                <form.Subscribe<[string | null, string]>
                                  children={(title) => (
                                    <form.Field
                                      children={(subfield) => (
                                        <AddressSearch
                                          isDisabled={isLoading}
                                          label={title[0] || getSentenceCase(contact.contactType)}
                                          onChange={(value) => {
                                            if (value) {
                                              subfield.handleChange(value.value);
                                              form.setFieldValue(`contacts[${i}].placeId`, Number(value.value || 0));
                                              if (value.additionalData?.longitude)
                                                form.setFieldValue(
                                                  `contacts[${i}].longitude`,
                                                  Number(value.additionalData?.longitude || 0)
                                                );
                                              if (value.additionalData?.latitude)
                                                form.setFieldValue(
                                                  `contacts[${i}].latitude`,
                                                  Number(value.additionalData?.latitude || 0)
                                                );
                                              if (value.additionalData?.boundingBox)
                                                form.setFieldValue(
                                                  `contacts[${i}].boundingBox`,
                                                  value.additionalData?.boundingBox
                                                );
                                            } else {
                                              subfield.handleChange("");
                                              form.setFieldValue(`contacts[${i}].placeId`, null);
                                              form.setFieldValue(`contacts[${i}].longitude`, null);
                                              form.setFieldValue(`contacts[${i}].latitude`, null);
                                              form.setFieldValue(`contacts[${i}].boundingBox`, null);
                                            }
                                          }}
                                          value={subfield.state.value}
                                        />
                                      )}
                                      name={`contacts[${i}].value`}
                                    />
                                  )}
                                  selector={(state) => [state.values.contacts[i].title, state.values.contacts[i].value]}
                                />
                              </div>
                            );
                          return null;
                        })
                      : "ALERT HERE"
                  }
                  mode="array"
                  name="contacts"
                />
              </div>
            </Collapsible>
          </div>
          <div className="md:col-span-2">
            <Collapsible
              icon={Icons.phone}
              isOpen
              items={[
                {
                  id: "1",
                  label: "Add",
                  icon: Icons.add,
                  variant: "info",
                  allowedPlacements: ["left-start"] as const,
                  onClick: () => {},
                  items: AvailableContactTypes.phone.professional.map((phone) => ({
                    icon: Icons[phone],
                    allowedPlacements: ["left-start"] as const,
                    id: phone,
                    title: getSentenceCase(phone),
                    onClick: () => form.getFieldInfo("contacts").instance?.pushValue(getBaseContact(phone)),
                  })),
                },
              ]}
              label="Phones">
              <div className="flex flex-col gap-y-2 py-1">
                <form.Field
                  children={(field) =>
                    field.state.value.length
                      ? field.state.value.map((contact, i) => {
                          if (contact.contactType.includes("phone") || contact.contactType === "fax")
                            return (
                              <div key={contact.id} className="flex w-full flex-row gap-x-2 md:col-span-2">
                                <form.Field
                                  children={(subfield) => (
                                    <Input
                                      helperText="Customize the title that will appear for others."
                                      label="Address display title"
                                      name={subfield.name}
                                      onChange={(e) => subfield.handleChange(e.target.value)}
                                      value={subfield.state.value || ""}
                                    />
                                  )}
                                  name={`contacts[${i}].title`}
                                />
                                <form.Subscribe<[string | null, string]>
                                  children={(watched) => (
                                    <form.Field
                                      children={(subfield) => (
                                        <Input
                                          isDisabled={isLoading}
                                          label={watched[0] || getSentenceCase(contact.contactType)}
                                          name={subfield.name}
                                          onChange={(e) => subfield.handleChange(e.target.value)}
                                          type="tel"
                                          value={subfield.state.value}
                                        />
                                      )}
                                      name={`contacts[${i}].value`}
                                    />
                                  )}
                                  selector={(state) => [state.values.contacts[i].title, state.values.contacts[i].value]}
                                />
                              </div>
                            );
                          return null;
                        })
                      : "ALERT HERE"
                  }
                  mode="array"
                  name="contacts"
                />
              </div>
            </Collapsible>
          </div>
        </div>
        <div className="md:col-span-2">
          <Button icon={Icons.save} label="Save" onClick={undefined} size="lg" variant="success" />
        </div>
      </div>
    </Form>
  );
}
