import { ReactFormExtendedApi, useForm, useStore } from "@tanstack/react-form";

import { AddressSearch, Alert, Button, Card, Collapsible, Form, Input, Select, Title } from "../../components";
import { AvailableContactTypesEnum, Icons } from "../../enums";
import { useAuth, useCloseDrawer, useCreate, useList, useRole } from "../../hooks";
import {
  ContactType,
  LocationsUsersInitalizerType,
  LocationsUsersInitializerSchema,
  LocationsUsersType,
  RolesType,
  UsersInitializerSchema,
  UsersInitializerType,
  UsersType,
} from "../../types";
import {
  camelCaseContactType,
  emailValidation,
  formatDisplayItem,
  formatForOptions,
  getBaseContact,
  getSentenceCase,
  getUserInfo,
  groupByContacts,
  urlValidation,
} from "../../utils";

function onSetPrimary(index: number, form: ReactFormExtendedApi<UsersInitializerType>) {
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

export function UserContactDisplay({
  contact,
  form,
  index,
  onDelete,
  isDisabled,
  type,
}: {
  contact: UsersInitializerType["contacts"][number];
  form: ReactFormExtendedApi<UsersInitializerType>;
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

export function AddNewUser() {
  const { roles } = useRole({ isOwnerHidden: true });
  const closeDrawer = useCloseDrawer();
  const { mutate: create } = useCreate<UsersInitializerType>("users", {
    onSuccess: closeDrawer,
    invalidateModels: ["locations_users"],
  });

  const form = useForm<UsersInitializerType>({
    defaultValues: {
      firstName: "",
      lastName: "",
      password1: "",
      password2: "",
      contacts: [],
      username: "",
      roleId: "",
    },
    validators: {
      onSubmit: UsersInitializerSchema,
    },
    onSubmit: create,
  });
  const contacts = useStore(form.store, (state) => state.values.contacts);
  const groupedContactsByType = groupByContacts(contacts || []);
  return (
    <Form handleSubmit={form.handleSubmit}>
      <div className="grid h-full grid-cols-1 content-start gap-2 md:grid-cols-2">
        <form.Field
          children={(field) => (
            <Input
              errors={field.state.meta.errors}
              label="First name"
              onChange={(e) => field.handleChange(e.target.value)}
              value={field.state.value}
            />
          )}
          name="firstName"
        />
        <form.Field
          children={(field) => (
            <Input
              errors={field.state.meta.errors}
              label="Last name"
              onChange={(e) => field.handleChange(e.target.value)}
              value={field.state.value}
            />
          )}
          name="lastName"
        />
        <div className="md:col-span-2">
          <form.Field
            children={(field) => (
              <Input
                errors={field.state.meta.errors}
                helperText={"Must be at least 6 characters long"}
                label="Username"
                onChange={(e) => field.handleChange(e.target.value)}
                value={field.state.value}
              />
            )}
            name="username"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <form.Field
            children={(field) => (
              <Input
                errors={field.state.meta.errors}
                helperText={"Must be at least 8 characters long."}
                label="Password"
                onChange={(e) => field.handleChange(e.target.value)}
                type="password"
                value={field.state.value}
              />
            )}
            name="password1"
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <form.Field
            children={(field) => (
              <Input
                errors={field.state.meta.errors}
                helperText={"Must be at least 8 characters long."}
                label="Password confirm"
                onChange={(e) => field.handleChange(e.target.value)}
                type="password"
                value={field.state.value}
              />
            )}
            name="password2"
          />
        </div>
        <div className="md:col-span-2">
          <form.Field
            children={(field) => (
              <Select
                errors={field.state.meta.errors}
                label="Role"
                onChange={(e) => {
                  if (e) field.handleChange(e.value);
                }}
                options={formatForOptions(roles)}
                value={field.state.value}
              />
            )}
            name="roleId"
          />
        </div>
        <div className="col-span-full mt-2 flex flex-col gap-y-4 overflow-y-auto">
          <div className="flex flex-col gap-y-4">
            <form.Field
              children={(field) => (
                <>
                  <Title hasBorder label="Contacts" size="xl" variant="primary" />
                  <Card hasNoShadow isFullWidth variant="secondary">
                    <Collapsible
                      icon={Icons.officeAddress}
                      isInitialOpen={!!groupedContactsByType?.address?.length}
                      items={[
                        {
                          id: "1",
                          label: "Add",
                          icon: Icons.add,
                          variant: "info",
                          allowedPlacements: ["left-start"] as const,
                          onClick: () => {},
                          items: AvailableContactTypesEnum.address.personal.map((addr) => ({
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
                              <UserContactDisplay
                                key={i}
                                contact={contact}
                                form={form}
                                index={i}
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
                      isInitialOpen={!!groupedContactsByType?.phone?.length}
                      items={[
                        {
                          id: "1",
                          label: "Add",
                          icon: Icons.add,
                          variant: "info",
                          allowedPlacements: ["left-start"] as const,
                          onClick: () => {},
                          items: AvailableContactTypesEnum.phone.personal.map((phone) => ({
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
                              <UserContactDisplay
                                key={i}
                                contact={contact}
                                form={form}
                                index={i}
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
                      isInitialOpen={!!groupedContactsByType?.email?.length}
                      items={[
                        {
                          id: "1",
                          label: "Add",
                          icon: Icons.add,
                          variant: "info",
                          allowedPlacements: ["left-start"] as const,
                          onClick: () => {},
                          items: AvailableContactTypesEnum.email.personal.map((email) => ({
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
                              <UserContactDisplay
                                key={i}
                                contact={contact}
                                form={form}
                                index={i}
                                onDelete={() => field.removeValue(i)}
                                type="email"
                              />
                            );
                          return null;
                        })}
                      </div>
                      {!groupedContactsByType.email?.length ? (
                        <Alert content="Currently, there are no emails." variant="info" />
                      ) : null}
                    </Collapsible>
                  </Card>
                  <Card hasNoShadow isFullWidth variant="secondary">
                    <Collapsible
                      icon={Icons.website}
                      isInitialOpen={!!groupedContactsByType?.website?.length}
                      items={[
                        {
                          id: "1",
                          label: "Add",
                          icon: Icons.add,
                          variant: "info",
                          allowedPlacements: ["left-start"] as const,
                          onClick: () => {},
                          items: AvailableContactTypesEnum.website.personal.map((other) => ({
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
                              <UserContactDisplay
                                key={i}
                                contact={contact}
                                form={form}
                                index={i}
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
                      isInitialOpen={!!groupedContactsByType?.other?.length}
                      items={[
                        {
                          id: "1",
                          label: "Add",
                          icon: Icons.add,
                          variant: "info",
                          allowedPlacements: ["left-start"] as const,
                          onClick: () => {},
                          items: AvailableContactTypesEnum.other.personal.map((other) => ({
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
                              <UserContactDisplay
                                key={i}
                                contact={contact}
                                form={form}
                                index={i}
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
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <form.Subscribe<[boolean, boolean]>
          children={(p) => {
            return <Button isDisabled={!p[0]} label="Create" onClick={undefined} variant="success" />;
          }}
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        />
      </div>
    </Form>
  );
}

export function AddUserFromLocation() {
  const auth = useAuth();
  const { data: locationsUsers } = useList<LocationsUsersType>(
    {
      model: "locations_users",
      fields: ["locationId", "userId", "roleId"],
      filters: { and: [{ field: "locationId", operator: "neq", value: auth.user?.locationId || "" }] },
    },
    {
      enabled: !!auth.user?.locationId,
    }
  );
  const { data: roles } = useList<RolesType>(
    { model: "roles", fields: ["id", "title", "isDefault", "companyId"] },
    {
      enabled: !!locationsUsers,
    }
  );
  const { data: users } = useList<UsersType>(
    {
      model: "users",
      fields: ["id", "firstName", "lastName", "username"],
      filters: { and: [{ field: "id", operator: "in", value: locationsUsers?.map((locUser) => locUser.userId) || [] }] },
    },
    {
      enabled: !!locationsUsers?.length,
      urlSuffix: `company/${auth.user?.companyId}`,
    }
  );
  const closeDrawer = useCloseDrawer();
  const { mutate: create } = useCreate<LocationsUsersInitalizerType>("locations_users", {
    onSuccess: closeDrawer,
    invalidateModels: ["users"],
  });

  const form = useForm<LocationsUsersInitalizerType>({
    validators: {
      onSubmit: LocationsUsersInitializerSchema,
    },
    onSubmit: create,
  });

  return (
    <Form handleSubmit={form.handleSubmit}>
      <div className="grid h-full grid-cols-1 content-start gap-2 md:grid-cols-2">
        <div className="md:col-span-2">
          <form.Field
            children={(field) => (
              <Select
                errors={field.state.meta.errors}
                label="User"
                onChange={(e) => {
                  if (e) field.handleChange(e.value);
                }}
                options={formatForOptions((users || []).map((user) => getUserInfo(user)))}
                value={field.state.value}
              />
            )}
            name="userId"
          />
        </div>
        <div className="md:col-span-2">
          <form.Field
            children={(field) => (
              <Select
                errors={field.state.meta.errors}
                label="Role"
                onChange={(e) => {
                  if (e) field.handleChange(e.value);
                }}
                options={formatForOptions(roles)}
                value={field.state.value}
              />
            )}
            name="roleId"
          />
        </div>
      </div>
      <div className="mt-auto">
        <form.Subscribe<[boolean, boolean]>
          children={(p) => {
            return <Button isDisabled={!p[0]} label="Create" onClick={undefined} variant="success" />;
          }}
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        />
      </div>
    </Form>
  );
}
