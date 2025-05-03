import { array, boolean, date, infer as zodInfer, minLength, nullable, object, optional, string, uuidv4 } from "@zod/mini";

import { ContactSchema } from "./contactTypes";

export const RolesSchema = object({
  id: uuidv4(),
  title: string(),
  isDefault: boolean(),
  companyId: nullable(uuidv4()),
  imageId: optional(nullable(uuidv4())),
});

export const UsersSchema = object({
  id: uuidv4(),
  firstName: string(),
  lastName: string(),
  username: string().check(minLength(6)),
  email: optional(nullable(string())),
  phone: optional(nullable(string())),
  dateOfBirth: optional(nullable(date())),
  dateOfEmployment: optional(nullable(date())),
  dateOfTermination: optional(nullable(date())),
  isVerified: optional(nullable(boolean())),
  imageId: optional(nullable(uuidv4())),
  roleId: uuidv4(),
});
export const UsersInitializerSchema = object({
  firstName: string("First name cannot be empty."),
  lastName: string("Last name cannot be empty."),
  username: string("Username cannot be empty").check(minLength(6, "Username must have at least 6 characters")),
  password1: string("Password cannot be empty.").check(minLength(8, "Must be at least 8 characters long.")),
  password2: string("Password confirm cannot be empty.").check(
    minLength(8, "Must be at least 8 characters long and match the password.")
  ),
  dateOfBirth: optional(nullable(date())),
  dateOfEmployment: optional(nullable(date())),
  roleId: uuidv4("User must have a role selected"),
  imageId: optional(nullable(uuidv4())),
  contacts: array(ContactSchema),
});

export const UsersMutatorSchema = object({
  id: uuidv4(),
  firstName: optional(string("First name cannot be empty.")),
  lastName: optional(string("Last name cannot be empty.")),
  username: optional(string("Username cannot be empty").check(minLength(6, "Username must have at least 6 characters"))),
  password1: optional(string().check(minLength(8, "Must be at least 8 characters long."))),
  password2: optional(string().check(minLength(8, "Must be at least 8 characters long and match the password."))),
  roleId: optional(uuidv4()),
  dateOfBirth: optional(nullable(date())),
  dateOfEmployment: optional(nullable(date())),
  imageId: optional(nullable(uuidv4())),
  contacts: array(ContactSchema),
});

export type RolesType = zodInfer<typeof RolesSchema>;

export type UsersType = zodInfer<typeof UsersSchema> & {
  role: RolesType;
};
export type UsersInitializerType = zodInfer<typeof UsersInitializerSchema>;
export type UsersMutatorType = zodInfer<typeof UsersMutatorSchema>;
