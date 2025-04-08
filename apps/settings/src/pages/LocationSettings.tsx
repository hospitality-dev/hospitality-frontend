import {
  AddressSearch,
  AvailableContactTypes,
  Avatar,
  Button,
  Card,
  Collapsible,
  ContactType,
  ContactTypes,
  emailValidation,
  Form,
  formatErrorsForHelperText,
  getSentenceCase,
  Icons,
  Input,
  LocationsMutatorType,
  LocationsType,
  ReactFormExtendedApi,
  Title,
  urlValidation,
  useAuth,
  useForm,
  useRead,
  useScreenSize,
} from "@hospitality/hospitality-ui";

type EntityType = Pick<LocationsType, "id" | "title" | "contacts">;
function getBaseContact(contactType: ContactTypes, parentId: string): ContactType {
  return {
    id: crypto.randomUUID(),
    title: getSentenceCase(contactType),
    parentId,
    prefix: "",
    value: "",
    contactType,
    isPublic: false,
  };
}

function ContactDisplay({
  contact,
  form,
  index,
  isDisabled,
  type,
}: {
  contact: LocationsMutatorType["contacts"][number];
  form: ReactFormExtendedApi<LocationsMutatorType>;
  index: number;
  isDisabled?: boolean;
  type: "address" | "phone" | "email" | "websites" | "other";
}) {
  return (
    <Card isFullWidth>
      <div className="flex w-full flex-col p-2 lg:flex-row">
        <form.Field
          children={(subfield) => (
            <div className="flex flex-col">
              <Title
                hasBorder
                icon={Icons[contact.contactType]}
                label={subfield.state.value || getSentenceCase(contact.contactType)}
                size="sm"
                variant="secondary"
              />
              <Input
                helperText="Customize the title of the address."
                label="Address display title"
                name={subfield.name}
                onChange={(e) => subfield.handleChange(e.target.value)}
                value={subfield.state.value || ""}
              />
            </div>
          )}
          name={`contacts[${index}].title`}
        />
        <form.Field
          children={(subfield) => {
            if (type === "address")
              return (
                <AddressSearch
                  isAutofocused
                  isDisabled={isDisabled}
                  label="Address"
                  onChange={(value) => {
                    if (value) {
                      subfield.handleChange(value.value);
                      form.setFieldValue(`contacts[${index}].placeId`, Number(value.value || 0));
                      if (value.additionalData?.longitude)
                        form.setFieldValue(`contacts[${index}].longitude`, Number(value.additionalData?.longitude || 0));
                      if (value.additionalData?.latitude)
                        form.setFieldValue(`contacts[${index}].latitude`, Number(value.additionalData?.latitude || 0));
                      if (value.additionalData?.boundingBox)
                        form.setFieldValue(`contacts[${index}].boundingBox`, value.additionalData?.boundingBox);
                    } else {
                      subfield.handleChange("");
                      form.setFieldValue(`contacts[${index}].placeId`, null);
                      form.setFieldValue(`contacts[${index}].longitude`, null);
                      form.setFieldValue(`contacts[${index}].latitude`, null);
                      form.setFieldValue(`contacts[${index}].boundingBox`, null);
                    }
                  }}
                  value={subfield.state.value}
                />
              );
            if (type === "phone")
              return (
                <form.Subscribe<ContactType["prefix"]> selector={(s) => s.values.contacts[index].prefix}>
                  {(prefix) => (
                    <form.Field
                      children={(subfield) => (
                        <Input
                          isDisabled={isDisabled}
                          label={getSentenceCase(contact.contactType)}
                          name={subfield.name}
                          onChange={(e) => subfield.handleChange(e.target.value)}
                          onSelectChange={(item) => form.setFieldValue(`contacts[${index}].prefix`, item?.value)}
                          selectValue={prefix}
                          type="tel"
                          value={subfield.state.value}
                        />
                      )}
                      name={`contacts[${index}].value`}
                    />
                  )}
                </form.Subscribe>
              );
            if (type === "email")
              return (
                <form.Field
                  children={(subfield) => (
                    <Input
                      helperText={formatErrorsForHelperText(subfield.state.meta.errors)}
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
            if (type === "websites")
              return (
                <form.Field
                  children={(subfield) => (
                    <Input
                      helperText={formatErrorsForHelperText(subfield.state.meta.errors)}
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
            return null;
          }}
          name={`contacts[${index}].value`}
        />
      </div>
    </Card>
  );
}

export function LocationSettings() {
  const auth = useAuth();
  const { isSmallScreen } = useScreenSize();
  const { data, isLoading, isSuccess } = useRead<EntityType>(
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
  if (!isSuccess) return null;
  return (
    <Form handleSubmit={form.handleSubmit}>
      <div className="flex h-full flex-col justify-between gap-y-2">
        <div className="flex flex-col gap-y-2">
          <div className="flex items-end gap-x-2">
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
          <Title hasBorder label="Contacts" size="xl" variant="primary" />

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
                  onClick: () => form.getFieldInfo("contacts").instance?.pushValue(getBaseContact(addr, data?.id)),
                })),
              },
            ]}
            label="Addresses">
            <div className="flex flex-col gap-y-4 py-1">
              <form.Field
                children={(field) =>
                  field.state.value.length
                    ? field.state.value.map((contact, i) => {
                        if (contact.contactType.includes("address"))
                          return (
                            <ContactDisplay
                              key={contact.id}
                              contact={contact}
                              form={form}
                              index={i}
                              isDisabled={isLoading}
                              type="address"
                            />
                          );
                        return null;
                      })
                    : null
                }
                mode="array"
                name="contacts"
              />
            </div>
          </Collapsible>
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
                  allowedPlacements: ["left-start"],
                  id: phone,
                  title: getSentenceCase(phone),
                  onClick: () => form.getFieldInfo("contacts").instance?.pushValue(getBaseContact(phone, data?.id)),
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
                            <ContactDisplay
                              key={contact.id}
                              contact={contact}
                              form={form}
                              index={i}
                              isDisabled={isLoading}
                              type="phone"
                            />
                          );
                        return null;
                      })
                    : null
                }
                mode="array"
                name="contacts"
              />
            </div>
          </Collapsible>
          <Collapsible
            icon={Icons.email}
            isOpen
            items={[
              {
                id: "1",
                label: "Add",
                icon: Icons.add,
                variant: "info",
                allowedPlacements: ["left-start"] as const,
                onClick: () => {},
                items: AvailableContactTypes.email.professional.map((email) => ({
                  icon: Icons[email],
                  allowedPlacements: ["left-start"],
                  id: email,
                  title: getSentenceCase(email),
                  onClick: () => form.getFieldInfo("contacts").instance?.pushValue(getBaseContact(email, data?.id)),
                })),
              },
            ]}
            label="Emails">
            <div className="flex flex-col gap-y-2 py-1">
              <form.Field
                children={(field) =>
                  field.state.value.length
                    ? field.state.value.map((contact, i) => {
                        if (contact.contactType.includes("email"))
                          return (
                            <ContactDisplay
                              key={contact.id}
                              contact={contact}
                              form={form}
                              index={i}
                              isDisabled={isLoading}
                              type="email"
                            />
                          );
                        return null;
                      })
                    : null
                }
                mode="array"
                name="contacts"
              />
            </div>
          </Collapsible>
          <Collapsible
            icon={Icons.website}
            isOpen
            items={[
              {
                id: "1",
                label: "Add",
                icon: Icons.add,
                variant: "info",
                allowedPlacements: ["left-start"] as const,
                onClick: () => {},
                items: AvailableContactTypes.website.professional.map((other) => ({
                  icon: Icons[other],
                  allowedPlacements: ["left-start"],
                  id: other,
                  title: getSentenceCase(other),
                  onClick: () => form.getFieldInfo("contacts").instance?.pushValue(getBaseContact(other, data?.id)),
                })),
              },
            ]}
            label="Websites">
            <div className="flex flex-col gap-y-2 py-1">
              <form.Field
                children={(field) =>
                  field.state.value.length
                    ? field.state.value.map((contact, i) => {
                        if (contact.contactType.includes("website"))
                          return (
                            <ContactDisplay
                              key={contact.id}
                              contact={contact}
                              form={form}
                              index={i}
                              isDisabled={isLoading}
                              type="websites"
                            />
                          );
                        return null;
                      })
                    : null
                }
                mode="array"
                name="contacts"
              />
            </div>
          </Collapsible>
          <Collapsible
            icon={Icons.info}
            isOpen
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
                  onClick: () => form.getFieldInfo("contacts").instance?.pushValue(getBaseContact(other, data?.id)),
                })),
              },
            ]}
            label="Other">
            <div className="flex flex-col gap-y-2 py-1">
              <form.Field
                children={(field) =>
                  field.state.value.length
                    ? field.state.value.map((contact, i) => {
                        if (contact.contactType.includes("email"))
                          return (
                            <ContactDisplay
                              key={contact.id}
                              contact={contact}
                              form={form}
                              index={i}
                              isDisabled={isLoading}
                              type="other"
                            />
                          );
                        return null;
                      })
                    : null
                }
                mode="array"
                name="contacts"
              />
            </div>
          </Collapsible>
        </div>
        <div className="md:col-span-2">
          <Button icon={Icons.save} label="Save" onClick={undefined} size="lg" variant="success" />
        </div>
      </div>
    </Form>
  );
}
