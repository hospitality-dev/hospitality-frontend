import { object, string } from "zod";

import { users } from "../models";

export const loginParamsSchema = object({
  username: string().nonempty("Username cannot be empty."),
  password: string().nonempty("Password cannot be empty."),
});

export const loginResponseSchema = object({
  user: users.pick({ id: true, firstName: true, lastName: true, username: true, phone: true, email: true }).extend({
    locationId: string().uuid().nullable(),
    roleId: string().uuid().nullable(),
    role: string().nullable(),
    locationTitle: string().nullable(),
  }),
  locations: object({
    locationId: string().uuid(),
    roleId: string().uuid(),
    role: string(),
    locationTitle: string(),
  }).array(),
});
