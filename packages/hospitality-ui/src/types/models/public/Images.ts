import type { UsersId } from "./Users";
/** Identifier type for public.images */
export type ImagesId = string & { __brand: "ImagesId" };
/** Represents the table public.images */
export default interface Images {
  id: ImagesId;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  ownerId: UsersId;
}
/** Represents the initializer for the table public.images */
export interface ImagesInitializer {
  /** Default value: gen_random_uuid() */
  id?: ImagesId;
  title: string;
  /** Default value: CURRENT_TIMESTAMP */
  createdAt?: Date;
  /** Default value: CURRENT_TIMESTAMP */
  updatedAt?: Date;
  deletedAt?: Date | null;
  ownerId: UsersId;
}
/** Represents the mutator for the table public.images */
export interface ImagesMutator {
  id?: ImagesId;
  title?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  ownerId?: UsersId;
}
