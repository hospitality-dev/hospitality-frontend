import type { companiesId } from "./Companies";
import type { usersId } from "./Users";
export type locationsId = string;
/** Represents the table public.locations */
export default interface Locations {
  id: locationsId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  title: string;
  ownerId: usersId;
  companyId: companiesId;
  address: string | null;
  phone: string | null;
  email: string | null;
  latitude: string | null;
  longitude: string | null;
}
/** Represents the initializer for the table public.locations */
export interface LocationsInitializer {
  /** Default value: gen_random_uuid() */
  id?: locationsId;
  /** Default value: CURRENT_TIMESTAMP */
  createdAt?: Date;
  /** Default value: CURRENT_TIMESTAMP */
  updatedAt?: Date;
  deletedAt?: Date | null;
  title: string;
  ownerId: usersId;
  companyId: companiesId;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  latitude?: string | null;
  longitude?: string | null;
}
/** Represents the mutator for the table public.locations */
export interface LocationsMutator {
  id?: locationsId;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  title?: string;
  ownerId?: usersId;
  companyId?: companiesId;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  latitude?: string | null;
  longitude?: string | null;
}
