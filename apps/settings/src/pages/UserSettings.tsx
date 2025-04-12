import {
  AddressSearch,
  AvailableContactTypes,
  Avatar,
  Button,
  Card,
  Collapsible,
  ContactSchema,
  ContactType,
  emailValidation,
  Form,
  formatDisplayItem,
  formatErrorsForHelperText,
  formatForOptions,
  getBaseContact,
  getSentenceCase,
  getUserInfo,
  groupByContacts,
  Icons,
  Input,
  ReactFormExtendedApi,
  RolesQuery,
  Select,
  Title,
  urlValidation,
  useAuth,
  useDrawer,
  useForm,
  useList,
  useLoaderData,
  useQuery,
  useRead,
  UsersMutatorSchema,
  UsersMutatorType,
  UsersType,
  useScreenSize,
  useUpdate,
} from "@hospitality/hospitality-ui";

function ContactDisplay({
  contact,
  form,
  index,
  onDelete,
  isDisabled,
  type,
}: {
  contact: UsersMutatorType["contacts"][number];
  form: ReactFormExtendedApi<UsersMutatorType>;
  index: number;
  isDisabled?: boolean;
  type: "address" | "phone" | "email" | "websites" | "other";
  onDelete: () => void;
}) {
  return (
    <div className="mt-2 flex w-full flex-col items-end">
      <form.Field
        children={(subfield) => (
          <Title
            hasBorder
            icon={Icons[contact.contactType]}
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
      <div className="mt-2 flex w-full flex-col gap-2 lg:flex-row">
        <form.Field
          children={(subfield) => (
            <Input
              helperText="Customize the title of the address."
              label={getSentenceCase(`${type} display title`)}
              name={subfield.name}
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
                  helperText={
                    formatErrorsForHelperText(subfield.state.meta.errors) ||
                    "Enter the full address e.g. Jurija Gagarina 25 / Ugrinovacka 17 Zemun"
                  }
                  isAutofocused
                  isDisabled={isDisabled}
                  label="Address"
                  onChange={(value) => {
                    if (value) {
                      subfield.handleChange(formatDisplayItem(value));
                      form.setFieldValue(`contacts[${index}].placeId`, Number(value.additionalData?.placeId || 0));
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
                  variant={subfield.state.meta.errors.length ? "error" : "primary"}
                />
              );
            if (type === "phone")
              return (
                <form.Subscribe<ContactType["prefix"]> selector={(s) => s.values.contacts[index].prefix}>
                  {(prefix) => (
                    <form.Field
                      children={(subfield) => (
                        <Input
                          errors={subfield.state.meta.errors}
                          isDisabled={isDisabled}
                          label={getSentenceCase(contact.contactType)}
                          name={subfield.name}
                          onChange={(e) => subfield.handleChange(e.target.value)}
                          onSelectChange={(item) =>
                            form.setFieldValue(`contacts[${index}].prefix`, item?.value ? Number(item?.value) : null)
                          }
                          selectValue={(prefix || "")?.toString()}
                          type="tel"
                          value={subfield.state.value}
                          variant={subfield.state.meta.errors.length ? "error" : "primary"}
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

export function UserSettings() {
  const auth = useAuth();
  const { isSmallScreen } = useScreenSize();
  const { openDrawer } = useDrawer("upload");
  const { mutate: update } = useUpdate<UsersMutatorType>("users");
  const { roles } = useLoaderData({ from: "/settings/user" });
  const { data: rolesData } = useQuery({ ...RolesQuery, placeholderData: roles });
  const {
    data: userData,
    isLoading,
    isSuccess,
  } = useRead<UsersType>(
    {
      model: "users",
      id: auth.user?.id || "",
      fields: ["id", "firstName", "lastName", "imageId", "dateOfBirth", "dateOfEmployment", "roleId"],
    },
    { enabled: !!auth.user?.id }
  );

  const { data: userContacts, isLoading: isLoadingContacts } = useList<ContactType>(
    { model: "contacts", fields: ["id", "value", "title", "prefix", "contactType", "placeId"] },
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
    },
    onSubmit: update,
  });
  if (!isSuccess) return null;
  const formattedUser = getUserInfo(userData);
  const groupedContactsByType = groupByContacts(userContacts || []);
  return (
    <Form handleSubmit={form.handleSubmit}>
      <div className="flex h-full flex-col justify-between gap-y-2">
        <div className="flex flex-col gap-y-4">
          <div className="grid grid-cols-1 items-end gap-2 md:grid-cols-3">
            <form.Field
              children={(field) => (
                <div className="flex items-end gap-x-2">
                  <div>
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
                      size={isSmallScreen ? "xl" : "md"}
                      type="user_avatar"
                    />
                  </div>
                  <Input
                    errors={field.state.meta.errors}
                    isDisabled={isLoading}
                    label="First name"
                    name={field.name}
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
                  isDisabled
                  label="Role"
                  onChange={(e) => field.handleChange(e?.value)}
                  options={formatForOptions(rolesData)}
                  value={field.state.value || ""}
                />
              )}
              name="roleId"
            />
          </div>
          <div className="flex flex-col gap-y-4">
            {isLoadingContacts ? null : (
              <form.Field
                children={(field) => (
                  <>
                    <Title hasBorder label="Contacts" size="xl" variant="primary" />
                    <Card hasNoShadow isFullWidth variant="secondary">
                      <Collapsible
                        icon={Icons.office_address}
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
                              icon: Icons[addr],
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
                              icon: Icons[phone],
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
                              icon: Icons[email],
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
                              icon: Icons[other],
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
                                  type="websites"
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
                        isOpen={!!groupedContactsByType?.other?.length}
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
        </div>
        <div className="md:col-span-2">
          <form.Subscribe<[boolean]>
            children={(sub) => (
              <Button icon={Icons.save} isDisabled={sub[0]} label="Save" onClick={undefined} size="lg" variant="success" />
            )}
            selector={(state) => [state.isPristine && state.isFormValid]}></form.Subscribe>
        </div>
      </div>
    </Form>
  );
}
