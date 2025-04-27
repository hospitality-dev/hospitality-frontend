import {
  AddressSearch,
  Alert,
  AvailableContactTypes,
  Avatar,
  Button,
  camelCaseContactType,
  Card,
  Collapsible,
  ContactType,
  DefaultRoleIds,
  emailValidation,
  Form,
  formatDisplayItem,
  formatForOptions,
  getBaseContact,
  getSentenceCase,
  getUserInfo,
  groupByContacts,
  Icons,
  Input,
  ReactFormExtendedApi,
  Select,
  Title,
  urlValidation,
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

function onSetPrimary(index: number, form: ReactFormExtendedApi<UsersMutatorType>) {
  const contacts = form.state.values.contacts;
  const currentContact = contacts[index];
  let key = "";
  if (currentContact.contactType.includes("address")) {
    key = "address";
  } else if (currentContact.contactType.includes("phone")) {
    key = "phone";
  } else if (currentContact.contactType.includes("email")) {
    key = "email";
  } else if (currentContact.contactType.includes("website")) {
    key = "website";
  }

  const primaryIdx = contacts.findIndex((contact) => contact.contactType.includes(key) && contact.isPrimary);

  if (primaryIdx !== undefined && primaryIdx > -1) {
    if (index === primaryIdx) {
      form.setFieldValue(`contacts[${primaryIdx}].isPrimary`, false);
    } else {
      form.setFieldValue(`contacts[${primaryIdx}].isPrimary`, false);
      form.setFieldValue(`contacts[${index}].isPrimary`, true);
    }
  } else {
    form.setFieldValue(`contacts[${index}].isPrimary`, true);
  }
}

function UserContactDisplay({
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
    <form.Subscribe<{
      isPrimary: ContactType["isPrimary"];
      isPublic: ContactType["isPublic"];
    }>
      children={(contactState) => (
        <div className="mt-2 flex w-full flex-col items-end">
          <form.Field
            children={(subfield) => (
              <Title
                hasBorder
                icon={Icons[camelCaseContactType(contact.contactType)]}
                items={[
                  {
                    id: "primary",
                    icon: Icons.star,
                    variant: "primary",
                    iconColor: contactState.isPrimary ? "gold" : undefined,
                    onClick: () => onSetPrimary(index, form),
                    iconThickness: contactState.isPrimary ? "fill" : undefined,
                  },
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
                  errors={subfield.state.meta.errors}
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
            />
          </div>
        </div>
      )}
      selector={(state) => ({
        isPrimary: state.values.contacts[index].isPrimary,
        isPublic: state.values.contacts[index].isPublic,
      })}
    />
  );
}

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
  const groupedContactsByType = groupByContacts(contacts || []);
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
                            items: AvailableContactTypes.address.personal.map((addr) => ({
                              icon: Icons[camelCaseContactType(addr)],
                              allowedPlacements: ["left-start"] as const,
                              id: addr,
                              title: getSentenceCase(addr),
                              onClick: () => form.getFieldInfo("contacts").instance?.pushValue(getBaseContact(addr)),
                            })),
                          },
                        ]}
                        label="Addresses">
                        <div className="flex flex-col gap-y-2 pb-1">
                          {(field.state.value || []).map((contact, i) => {
                            if (contact.contactType.includes("address"))
                              return (
                                <UserContactDisplay
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
                          {!groupedContactsByType.address?.length ? (
                            <Alert content="Currently, there are no addresses." variant="info" />
                          ) : null}
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
                            items: AvailableContactTypes.phone.personal.map((phone) => ({
                              icon: Icons[camelCaseContactType(phone)],
                              allowedPlacements: ["left-start"],
                              id: phone,
                              title: getSentenceCase(phone),
                              onClick: () => form.getFieldInfo("contacts").instance?.pushValue(getBaseContact(phone)),
                            })),
                          },
                        ]}
                        label="Phones">
                        <div className="flex flex-col gap-y-2 pb-1">
                          {(field.state.value || []).map((contact, i) => {
                            if (contact.contactType.includes("phone") || contact.contactType === "fax")
                              return (
                                <UserContactDisplay
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
                          {!groupedContactsByType.phone?.length ? (
                            <Alert content="Currently, there are no phone numbers." variant="info" />
                          ) : null}
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
                            items: AvailableContactTypes.email.personal.map((email) => ({
                              icon: Icons[camelCaseContactType(email)],
                              allowedPlacements: ["left-start"],
                              id: email,
                              title: getSentenceCase(email),
                              onClick: () => form.getFieldInfo("contacts").instance?.pushValue(getBaseContact(email)),
                            })),
                          },
                        ]}
                        label="Emails">
                        <div className="flex flex-col gap-y-2 pb-1">
                          {(field.state.value || []).map((contact, i) => {
                            if (contact.contactType.includes("email"))
                              return (
                                <UserContactDisplay
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
                          {!groupedContactsByType.email?.length ? (
                            <Alert content="Currently, there are no emails." variant="info" />
                          ) : null}
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
                            items: AvailableContactTypes.website.personal.map((other) => ({
                              icon: Icons[camelCaseContactType(other)],
                              allowedPlacements: ["left-start"],
                              id: other,
                              title: getSentenceCase(other),
                              onClick: () => form.getFieldInfo("contacts").instance?.pushValue(getBaseContact(other)),
                            })),
                          },
                        ]}
                        label="Websites">
                        <div className="flex flex-col gap-y-2 pb-1">
                          {(field.state.value || []).map((contact, i) => {
                            if (contact.contactType.includes("website"))
                              return (
                                <UserContactDisplay
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
                          {!groupedContactsByType.website?.length ? (
                            <Alert content="Currently, there are no websites." variant="info" />
                          ) : null}
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
                            items: AvailableContactTypes.other.personal.map((other) => ({
                              icon: Icons[other],
                              allowedPlacements: ["left-start"],
                              id: other,
                              title: getSentenceCase(other),
                              onClick: () => form.getFieldInfo("contacts").instance?.pushValue(getBaseContact(other)),
                            })),
                          },
                        ]}
                        label="Other">
                        <div className="flex flex-col gap-y-2 pb-1">
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
                                <UserContactDisplay
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
                          {!groupedContactsByType.other?.length ? (
                            <Alert content="Currently, there are no other contacts." variant="info" />
                          ) : null}
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
