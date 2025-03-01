import { literal, object, string } from "zod";

import { users } from "../models";

export const loginParamsSchema = object({
  username: string().nonempty("Username cannot be empty."),
  password: string().nonempty("Password cannot be empty."),
});

export const loginResponseSchema = object({
  message: literal("Success."),
  ok: literal(true),
  data: users.pick({ id: true, firstName: true, lastName: true, username: true, phone: true, email: true }),
});
