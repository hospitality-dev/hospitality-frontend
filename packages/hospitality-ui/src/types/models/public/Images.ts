import type { usersId } from "./Users";
export type imagesId = string;
/** Represents the table public.images */
export default interface Images {
  id: imagesId;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  ownerId: usersId;
}
/** Represents the initializer for the table public.images */
export interface ImagesInitializer {
  /** Default value: gen_random_uuid() */
  id?: imagesId;
  title: string;
  /** Default value: CURRENT_TIMESTAMP */
  createdAt?: Date;
  /** Default value: CURRENT_TIMESTAMP */
  updatedAt?: Date;
  deletedAt?: Date | null;
  ownerId: usersId;
}
/** Represents the mutator for the table public.images */
export interface ImagesMutator {
  id?: imagesId;
  title?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  ownerId?: usersId;
}
