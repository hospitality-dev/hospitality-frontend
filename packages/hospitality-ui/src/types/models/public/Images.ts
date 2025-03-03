import type { usersId } from "./Users";
export type imagesId = string;
/** Represents the table public.images */
export default interface Images {
  id: imagesId;
  title: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  owner_id: usersId;
}
/** Represents the initializer for the table public.images */
export interface ImagesInitializer {
  /** Default value: gen_random_uuid() */
  id?: imagesId;
  title: string;
  /** Default value: CURRENT_TIMESTAMP */
  created_at?: Date;
  /** Default value: CURRENT_TIMESTAMP */
  updated_at?: Date;
  deleted_at?: Date | null;
  owner_id: usersId;
}
/** Represents the mutator for the table public.images */
export interface ImagesMutator {
  id?: imagesId;
  title?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
  owner_id?: usersId;
}
