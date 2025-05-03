import { boolean, extend, nullable, object, pick, readonly, record, string, uuidv4 } from "@zod/mini";

import { UsersSchema } from ".";

export const loginParamsSchema = object({
  username: string("Username cannot be empty."),
  password: string("Password cannot be empty."),
});

// * Permissions can be null since a user that is in multiple locations
// * must first choose a location in order to have a role
export const userPermissionsSchema = readonly(nullable(record(string(), record(string(), boolean()))));

export const loginResponseSchema = object({
  user: extend(pick(UsersSchema, { id: true, firstName: true, lastName: true, username: true, phone: true, email: true }), {
    locationId: uuidv4(),
    roleId: uuidv4(),
    role: string(),
    locationTitle: string(),
    companyId: uuidv4(),
    permissions: userPermissionsSchema,
  }),
});
