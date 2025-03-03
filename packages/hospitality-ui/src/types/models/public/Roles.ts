export type rolesId = string;
/** Represents the table public.roles */
export default interface Roles {
  id: rolesId;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  title: string;
  is_default: boolean;
}
/** Represents the initializer for the table public.roles */
export interface RolesInitializer {
  /** Default value: gen_random_uuid() */
  id?: rolesId;
  /** Default value: CURRENT_TIMESTAMP */
  created_at?: Date;
  /** Default value: CURRENT_TIMESTAMP */
  updated_at?: Date;
  deleted_at?: Date | null;
  title: string;
  /** Default value: false */
  is_default?: boolean;
}
/** Represents the mutator for the table public.roles */
export interface RolesMutator {
  id?: rolesId;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
  title?: string;
  is_default?: boolean;
}
