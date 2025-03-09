export type rolesId = string;
/** Represents the table public.roles */
export default interface Roles {
  id: rolesId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  title: string;
  isDefault: boolean;
}
/** Represents the initializer for the table public.roles */
export interface RolesInitializer {
  /** Default value: gen_random_uuid() */
  id?: rolesId;
  /** Default value: CURRENT_TIMESTAMP */
  createdAt?: Date;
  /** Default value: CURRENT_TIMESTAMP */
  updatedAt?: Date;
  deletedAt?: Date | null;
  title: string;
  /** Default value: false */
  isDefault?: boolean;
}
/** Represents the mutator for the table public.roles */
export interface RolesMutator {
  id?: rolesId;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  title?: string;
  isDefault?: boolean;
}
