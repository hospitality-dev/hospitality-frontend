/** Identifier type for public.roles */
export type RolesId = string & { __brand: "RolesId" };
/** Represents the table public.roles */
export default interface Roles {
  id: RolesId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  title: string;
  isDefault: boolean;
}
/** Represents the initializer for the table public.roles */
export interface RolesInitializer {
  /** Default value: gen_random_uuid() */
  id?: RolesId;
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
  id?: RolesId;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  title?: string;
  isDefault?: boolean;
}
