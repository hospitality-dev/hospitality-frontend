import { boolean, date, infer as zodInfer, object, string } from "zod";

export const RolesSchema = object({
  id: string().uuid().nonempty(),
  title: string().nonempty(),
  isDefault: boolean(),
  companyId: string().uuid().nullable(),
  imageId: string().uuid().nullish(),
});

export const UsersSchema = object({
  id: string().uuid().nonempty(),
  firstName: string().nonempty(),
  lastName: string().nonempty(),
  username: string().nonempty().min(6),
  email: string().nullish(),
  phone: string().nullish(),
  dateOfBirth: date().nullish(),
  dateOfEmployment: date().nullish(),
  dateOfTermination: date().nullish(),
  isVerified: boolean().nullish(),
  imageId: string().uuid().nullish(),
  roleId: string().uuid(),
});
export const UsersInitializerSchema = object({
  firstName: string().nonempty("First name cannot be empty."),
  lastName: string().nonempty("Last name cannot be empty."),
  username: string().nonempty("Username cannot be empty").min(6, "Username must have at least 6 characters"),
  password1: string().min(8, "Must be at least 8 characters long.").nonempty("Password cannot be empty."),
  password2: string()
    .min(8, "Must be at least 8 characters long and match the password.")
    .nonempty("Password confirm cannot be empty."),
  dateOfBirth: date().nullish(),
  dateOfEmployment: date().nullish(),
  roleId: string().uuid("User must have a role selected"),
  imageId: string().uuid().nullish(),
});

export const UsersMutatorSchema = object({
  id: string().uuid(),
  firstName: string().nonempty("First name cannot be empty.").optional(),
  lastName: string().nonempty("Last name cannot be empty.").optional(),
  username: string().nonempty("Username cannot be empty").min(6, "Username must have at least 6 characters").optional(),
  roleId: string().uuid().optional(),
  dateOfBirth: date().nullish(),
  dateOfEmployment: date().nullish(),
  imageId: string().uuid().nullish(),
});

export type RolesType = zodInfer<typeof RolesSchema>;

export type UsersType = zodInfer<typeof UsersSchema> & {
  role: RolesType;
};
export type UsersInitializerType = zodInfer<typeof UsersInitializerSchema>;
export type UsersMutatorType = zodInfer<typeof UsersMutatorSchema>;
