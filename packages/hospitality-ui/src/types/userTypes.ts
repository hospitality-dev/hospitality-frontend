import { boolean, date, infer as zodInfer, object, string } from "zod";

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
});
export const UsersInitializerSchema = object({
  firstName: string().nonempty("First name cannot be empty."),
  lastName: string().nonempty("Last name cannot be empty."),
  username: string().nonempty("Username cannot be empty").min(6, "Username must have at least 6 characters"),
  email: string().email("This email is not valid.").nullish(),
  phone: string().nullish(),
  dateOfBirth: date().nullish(),
  dateOfEmployment: date().nullish(),
});

export const UsersMutatorSchema = object({
  firstName: string().nonempty("First name cannot be empty.").optional(),
  lastName: string().nonempty("Last name cannot be empty.").optional(),
  username: string().nonempty("Username cannot be empty").min(6, "Username must have at least 6 characters").optional(),
  email: string().email("This email is not valid.").nullish(),
  phone: string().nullish(),
  dateOfBirth: date().nullish(),
  dateOfEmployment: date().nullish(),
});

export const RolesSchema = object({
  id: string().uuid().nonempty(),
  title: string().nonempty(),
  isDefault: boolean(),
});

export type RolesType = zodInfer<typeof RolesSchema>;

export type UsersType = zodInfer<typeof UsersSchema> & {
  role: RolesType;
};
export type UsersInitializerType = zodInfer<typeof UsersInitializerSchema>;
export type UsersMutatorType = zodInfer<typeof UsersMutatorSchema>;
