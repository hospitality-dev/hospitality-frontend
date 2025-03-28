import { boolean, object, record, string } from "zod";

import { zodAvailableActions, zodAvailableEntities } from "../baseSchemas";
import { users } from "../models";

export const loginParamsSchema = object({
  username: string().nonempty("Username cannot be empty."),
  password: string().nonempty("Password cannot be empty."),
});

// * Permissions can be null since a user that is in multiple locations
// * must first choose a location in order to have a role
export const userPermissionsSchema = record(zodAvailableEntities, record(zodAvailableActions, boolean())).nullable().readonly();

export const loginResponseSchema = object({
  user: users.pick({ id: true, firstName: true, lastName: true, username: true, phone: true, email: true }).extend({
    locationId: string().uuid().nullable(),
    roleId: string().uuid().nullable(),
    role: string().nullable(),
    locationTitle: string().nullable(),
    companyId: string().uuid().nullable(),

    permissions: userPermissionsSchema,
  }),
  locations: object({
    locationId: string().uuid(),
    roleId: string().uuid(),
    role: string(),
    locationTitle: string(),
    companyId: string().uuid(),
  }).array(),
});
