import {
  AddressSearch,
  AvailableContactTypes,
  Avatar,
  Button,
  camelCaseContactType,
  Card,
  Collapsible,
  ContactGroupType,
  ContactSchema,
  ContactType,
  emailValidation,
  Form,
  formatDisplayItem,
  getBaseContact,
  getSentenceCase,
  groupByContacts,
  Icons,
  Input,
  LocationsMutatorSchema,
  LocationsMutatorType,
  LocationsType,
  ReactFormExtendedApi,
  Title,
  urlValidation,
  useAuth,
  useDrawer,
  useForm,
  useList,
  useRead,
  useScreenSize,
  useUpdate,
} from "@hospitality/hospitality-ui";

type EntityType = Pick<LocationsType, "id" | "title" | "imageId">;

function ContactDisplay({
  contact,
  form,
  index,
  onDelete,
  isDisabled,
  type,
}: {
  contact: LocationsMutatorType["contacts"][number];
  form: ReactFormExtendedApi<LocationsMutatorType>;
  index: number;
  isDisabled?: boolean;
  type: ContactGroupType;
  onDelete: () => void;
}) {
  return (
    <div className="flex w-full flex-col items-end px-1.5 pt-1.5">
      <form.Field
        children={(subfield) => (
          <Title
            hasBorder
            icon={Icons[camelCaseContactType(contact.contactType)]}
            items={[
              {
                id: "delete",
                icon: Icons.delete,
                variant: "error",
                onClick: onDelete,
              },
            ]}
            label={subfield.state.value || getSentenceCase(contact.contactType)}
            size="sm"
            variant="secondary"
          />
        )}
        name={`contacts[${index}].title`}
      />
      <div className="flex w-full flex-col pt-2 lg:flex-row lg:gap-2">
        <form.Field
          children={(subfield) => (
            <Input
              helperText="Customize the title of the address."
              label={getSentenceCase(`${type} display title`)}
              name={subfield.name}
              onBlur={subfield.handleBlur}
              onChange={(e) => subfield.handleChange(e.target.value)}
              value={subfield.state.value || ""}
            />
          )}
          name={`contacts[${index}].title`}
        />
        <form.Field
          children={(subfield) => {
            if (type === "address")
              return (
                <AddressSearch
                  errors={subfield.state.meta.errors}
                  helperText="Enter the full address e.g. Jurija Gagarina 25 / Ugrinovacka 17 Zemun"
                  isAutofocused
                  isDisabled={isDisabled}
                  label="Address"
                  onBlur={subfield.handleBlur}
                  onChange={(value) => {
                    if (value) {
                      subfield.handleChange(formatDisplayItem(value));
                      form.setFieldValue(`contacts[${index}].placeId`, Number(value.additionalData?.placeId || 0));
                      if (value.additionalData?.longitude)
                        form.setFieldValue(`contacts[${index}].longitude`, Number(value.additionalData?.longitude || 0));
                      if (value.additionalData?.latitude)
                        form.setFieldValue(`contacts[${index}].latitude`, Number(value.additionalData?.latitude || 0));
                      if (Array.isArray(value.additionalData?.boundingBox))
                        form.setFieldValue(`contacts[${index}].boundingBox`, value.additionalData?.boundingBox as number[]);
                    } else {
                      subfield.handleChange("");
                      form.setFieldValue(`contacts[${index}].placeId`, null);
                      form.setFieldValue(`contacts[${index}].longitude`, null);
                      form.setFieldValue(`contacts[${index}].latitude`, null);
                      form.setFieldValue(`contacts[${index}].boundingBox`, null);
                    }
                  }}
                  value={subfield.state.value}
                  variant={subfield.state.meta.errors.length ? "error" : "primary"}
                />
              );
            if (type === "phone")
              return (
                <form.Subscribe<{
                  prefix: ContactType["prefix"];
                  iso3: ContactType["iso3"];
                }>
                  selector={(s) => ({
                    prefix: s.values.contacts[index].prefix,
                    iso3: s.values.contacts[index].iso3,
                  })}>
                  {(prefixState) => (
                    <>
                      <form.Field
                        children={(subfield) => (
                          <Input
                            errors={subfield.state.meta.errors}
                            isDisabled={isDisabled}
                            label={getSentenceCase(contact.contactType)}
                            name={subfield.name}
                            onBlur={subfield.handleBlur}
                            onChange={(e) => subfield.handleChange(e.target.value)}
                            onSelectChange={(item) => {
                              if (typeof item?.additionalData?.phonecode === "string") {
                                form.setFieldValue(`contacts[${index}].prefix`, item?.additionalData?.phonecode);
                              }
                              form.setFieldValue(`contacts[${index}].iso3`, item?.value || null);
                            }}
                            selectValue={(prefixState.iso3 || "")?.toString()}
                            type="tel"
                            value={subfield.state.value}
                          />
                        )}
                        name={`contacts[${index}].value`}
                      />
                    </>
                  )}
                </form.Subscribe>
              );
            if (type === "email")
              return (
                <form.Field
                  children={(subfield) => (
                    <Input
                      errors={subfield.state.meta.errors}
                      isDisabled={isDisabled}
                      label={getSentenceCase(contact.contactType)}
                      name={subfield.name}
                      onBlur={subfield.handleBlur}
                      onChange={(e) => subfield.handleChange(e.target.value)}
                      type="text"
                      value={subfield.state.value}
                      variant={subfield.state.meta.errors.length ? "error" : "primary"}
                    />
                  )}
                  name={`contacts[${index}].value`}
                  validators={{
                    onBlur: emailValidation,
                  }}
                />
              );

            return (
              <form.Field
                children={(subfield) => (
                  <Input
                    errors={subfield.state.meta.errors}
                    isDisabled={isDisabled}
                    label={getSentenceCase(contact.contactType)}
                    name={subfield.name}
                    onBlur={subfield.handleBlur}
                    onChange={(e) => subfield.handleChange(e.target.value)}
                    type="url"
                    value={subfield.state.value}
                    variant={subfield.state.meta.errors.length ? "error" : "primary"}
                  />
                )}
                name={`contacts[${index}].value`}
                validators={{
                  onBlur: urlValidation,
                }}
              />
            );
          }}
          name={`contacts[${index}].value`}
          validators={{
            onSubmit: () => {
              const res = ContactSchema.safeParse(contact);
              if (res.success) return null;
              return res.error.errors.map((e) => e.message).join("\n");
            },
          }}
        />
      </div>
    </div>
  );
}

export function LocationSettings() {
  const auth = useAuth();
  const { isSmallScreen } = useScreenSize();
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
    { model: "contacts", fields: ["id", "value", "title", "prefix", "contactType", "placeId"] },
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
      onSubmit: LocationsMutatorSchema,
    },
    onSubmit: update,
  });
  if (!isSuccess) return null;

  const groupedContactsByType = groupByContacts(locationContacts || []);

  return (
    <Form handleSubmit={form.handleSubmit}>
      <div className="flex h-full flex-col justify-between gap-y-2">
        <div className="flex flex-col gap-y-4">
          <div className="flex items-end gap-x-2">
            <div>
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
                size={isSmallScreen ? "xl" : "md"}
                type="location_logo"
              />
            </div>
            <form.Field
              children={(field) => (
                <Input
                  isDisabled={isLoading}
                  label="Title"
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  value={field.state.value || ""}
                />
              )}
              name="title"
            />
          </div>
          {isLoadingContacts ? null : (
            <form.Field
              children={(field) => (
                <>
                  <Title hasBorder label="Contacts" size="xl" variant="primary" />
                  <Card hasNoShadow isFullWidth variant="secondary">
                    <Collapsible
                      icon={Icons.officeAddress}
                      isOpen={!!groupedContactsByType?.address?.length}
                      items={[
                        {
                          id: "1",
                          label: "Add",
                          icon: Icons.add,
                          variant: "info",
                          allowedPlacements: ["left-start"] as const,
                          onClick: () => {},
                          items: AvailableContactTypes.address.professional.map((addr) => ({
                            icon: Icons[camelCaseContactType(addr)],
                            allowedPlacements: ["left-start"] as const,
                            id: addr,
                            title: getSentenceCase(addr),
                            onClick: () => form.getFieldInfo("contacts").instance?.pushValue(getBaseContact(addr)),
                          })),
                        },
                      ]}
                      label="Addresses">
                      <div className="flex flex-col gap-y-2">
                        {(field.state.value || []).map((contact, i) => {
                          if (contact.contactType.includes("address"))
                            return (
                              <ContactDisplay
                                key={i}
                                contact={contact}
                                form={form}
                                index={i}
                                isDisabled={isLoading}
                                onDelete={() => field.removeValue(i)}
                                type="address"
                              />
                            );
                          return null;
                        })}
                      </div>
                    </Collapsible>
                  </Card>
                  <Card hasNoShadow isFullWidth variant="secondary">
                    <Collapsible
                      icon={Icons.phone}
                      isOpen={!!groupedContactsByType?.phone?.length}
                      items={[
                        {
                          id: "1",
                          label: "Add",
                          icon: Icons.add,
                          variant: "info",
                          allowedPlacements: ["left-start"] as const,
                          onClick: () => {},
                          items: AvailableContactTypes.phone.professional.map((phone) => ({
                            icon: Icons[camelCaseContactType(phone)],
                            allowedPlacements: ["left-start"],
                            id: phone,
                            title: getSentenceCase(phone),
                            onClick: () => form.getFieldInfo("contacts").instance?.pushValue(getBaseContact(phone)),
                          })),
                        },
                      ]}
                      label="Phones">
                      <div className="flex flex-col gap-y-2">
                        {(field.state.value || []).map((contact, i) => {
                          if (contact.contactType.includes("phone") || contact.contactType === "fax")
                            return (
                              <ContactDisplay
                                key={i}
                                contact={contact}
                                form={form}
                                index={i}
                                isDisabled={isLoading}
                                onDelete={() => field.removeValue(i)}
                                type="phone"
                              />
                            );
                          return null;
                        })}
                      </div>
                    </Collapsible>
                  </Card>
                  <Card hasNoShadow isFullWidth variant="secondary">
                    <Collapsible
                      icon={Icons.email}
                      isOpen={!!groupedContactsByType?.email?.length}
                      items={[
                        {
                          id: "1",
                          label: "Add",
                          icon: Icons.add,
                          variant: "info",
                          allowedPlacements: ["left-start"] as const,
                          onClick: () => {},
                          items: AvailableContactTypes.email.professional.map((email) => ({
                            icon: Icons[camelCaseContactType(email)],
                            allowedPlacements: ["left-start"],
                            id: email,
                            title: getSentenceCase(email),
                            onClick: () => form.getFieldInfo("contacts").instance?.pushValue(getBaseContact(email)),
                          })),
                        },
                      ]}
                      label="Emails">
                      <div className="flex flex-col gap-y-2">
                        {(field.state.value || []).map((contact, i) => {
                          if (contact.contactType.includes("email"))
                            return (
                              <ContactDisplay
                                key={i}
                                contact={contact}
                                form={form}
                                index={i}
                                isDisabled={isLoading}
                                onDelete={() => field.removeValue(i)}
                                type="email"
                              />
                            );
                          return null;
                        })}
                      </div>
                    </Collapsible>
                  </Card>
                  <Card hasNoShadow isFullWidth variant="secondary">
                    <Collapsible
                      icon={Icons.website}
                      isOpen={!!groupedContactsByType?.website?.length}
                      items={[
                        {
                          id: "1",
                          label: "Add",
                          icon: Icons.add,
                          variant: "info",
                          allowedPlacements: ["left-start"] as const,
                          onClick: () => {},
                          items: AvailableContactTypes.website.professional.map((other) => ({
                            icon: Icons[camelCaseContactType(other)],
                            allowedPlacements: ["left-start"],
                            id: other,
                            title: getSentenceCase(other),
                            onClick: () => form.getFieldInfo("contacts").instance?.pushValue(getBaseContact(other)),
                          })),
                        },
                      ]}
                      label="Websites">
                      <div className="flex flex-col gap-y-2">
                        {(field.state.value || []).map((contact, i) => {
                          if (contact.contactType.includes("website"))
                            return (
                              <ContactDisplay
                                key={i}
                                contact={contact}
                                form={form}
                                index={i}
                                isDisabled={isLoading}
                                onDelete={() => field.removeValue(i)}
                                type="website"
                              />
                            );
                          return null;
                        })}
                      </div>
                    </Collapsible>
                  </Card>
                  <Card hasNoShadow isFullWidth variant="secondary">
                    <Collapsible
                      icon={Icons.info}
                      isOpen={!!field.state.value?.length}
                      items={[
                        {
                          id: "1",
                          label: "Add",
                          icon: Icons.add,
                          variant: "info",
                          allowedPlacements: ["left-start"] as const,
                          onClick: () => {},
                          items: AvailableContactTypes.other.professional.map((other) => ({
                            icon: Icons[other],
                            allowedPlacements: ["left-start"],
                            id: other,
                            title: getSentenceCase(other),
                            onClick: () => form.getFieldInfo("contacts").instance?.pushValue(getBaseContact(other)),
                          })),
                        },
                      ]}
                      label="Other">
                      <div className="flex flex-col gap-y-2">
                        {(field.state.value || []).map((contact, i) => {
                          if (
                            contact.contactType === "whatsapp" ||
                            contact.contactType === "linkedin" ||
                            contact.contactType === "twitter" ||
                            contact.contactType === "facebook" ||
                            contact.contactType === "instagram" ||
                            contact.contactType === "slack"
                          )
                            return (
                              <ContactDisplay
                                key={i}
                                contact={contact}
                                form={form}
                                index={i}
                                isDisabled={isLoading}
                                onDelete={() => field.removeValue(i)}
                                type="other"
                              />
                            );
                          return null;
                        })}
                      </div>
                    </Collapsible>
                  </Card>
                </>
              )}
              mode="array"
              name="contacts"
            />
          )}
        </div>
        <div className="md:col-span-2">
          <Button icon={Icons.save} label="Save" onClick={undefined} size="lg" variant="success" />
        </div>
      </div>
    </Form>
  );
}
