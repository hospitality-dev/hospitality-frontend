import { z } from "zod";
export const zodProductsId = z.string();
export const zodUsersId = z.string();
export const zodLocationsUsersId = z.string();
export const zodLocationsProductsId = z.string();
export const zodCompaniesId = z.string();
export const zodLocationsId = z.string();
export const zodRolesId = z.string();
export const zodImagesId = z.string();
export const products = z.object({
  id: zodProductsId,
  created_at: z.date().nullable(),
  updated_at: z.date().nullable(),
  deleted_at: z.date().nullable(),
  title: z.string(),
  description: z.string().nullable(),
  weight: z.string().nullable(),
  volume: z.string().nullable(),
  barcode: z.string().nullable(),
  image_id: zodImagesId.nullable(),
});
export const productsInitializer = z.object({
  id: zodProductsId.optional(),
  created_at: z.date().optional().nullable(),
  updated_at: z.date().optional().nullable(),
  deleted_at: z.date().optional().nullable(),
  title: z.string(),
  description: z.string().optional().nullable(),
  weight: z.string().optional().nullable(),
  volume: z.string().optional().nullable(),
  barcode: z.string().optional().nullable(),
  image_id: zodImagesId.optional().nullable(),
});
export const productsMutator = z.object({
  id: zodProductsId.optional(),
  created_at: z.date().optional().nullable(),
  updated_at: z.date().optional().nullable(),
  deleted_at: z.date().optional().nullable(),
  title: z.string().optional(),
  description: z.string().optional().nullable(),
  weight: z.string().optional().nullable(),
  volume: z.string().optional().nullable(),
  barcode: z.string().optional().nullable(),
  image_id: zodImagesId.optional().nullable(),
});
export const users = z.object({
  id: zodUsersId,
  created_at: z.date(),
  updated_at: z.date(),
  deleted_at: z.date().nullable(),
  first_name: z.string(),
  last_name: z.string(),
  username: z.string(),
  pw_hsh: z.string(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  date_of_birth: z.date().nullable(),
  date_of_employment: z.date().nullable(),
  date_of_termination: z.date().nullable(),
  image_id: zodImagesId.nullable(),
});
export const usersInitializer = z.object({
  id: zodUsersId.optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  deleted_at: z.date().optional().nullable(),
  first_name: z.string(),
  last_name: z.string(),
  username: z.string(),
  pw_hsh: z.string(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  date_of_birth: z.date().optional().nullable(),
  date_of_employment: z.date().optional().nullable(),
  date_of_termination: z.date().optional().nullable(),
  image_id: zodImagesId.optional().nullable(),
});
export const usersMutator = z.object({
  id: zodUsersId.optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  deleted_at: z.date().optional().nullable(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  username: z.string().optional(),
  pw_hsh: z.string().optional(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  date_of_birth: z.date().optional().nullable(),
  date_of_employment: z.date().optional().nullable(),
  date_of_termination: z.date().optional().nullable(),
  image_id: zodImagesId.optional().nullable(),
});
export const locationsUsers = z.object({
  id: zodLocationsUsersId,
  created_at: z.date(),
  updated_at: z.date(),
  deleted_at: z.date().nullable(),
  location_id: zodLocationsId,
  user_id: zodUsersId,
  role_id: zodRolesId,
});
export const locationsUsersInitializer = z.object({
  id: zodLocationsUsersId.optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  deleted_at: z.date().optional().nullable(),
  location_id: zodLocationsId,
  user_id: zodUsersId,
  role_id: zodRolesId,
});
export const locationsUsersMutator = z.object({
  id: zodLocationsUsersId.optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  deleted_at: z.date().optional().nullable(),
  location_id: zodLocationsId.optional(),
  user_id: zodUsersId.optional(),
  role_id: zodRolesId.optional(),
});
export const locationsProducts = z.object({
  id: zodLocationsProductsId,
  count: z.string(),
  product_id: zodProductsId.nullable(),
  location_id: zodLocationsId.nullable(),
  company_id: zodCompaniesId.nullable(),
});
export const locationsProductsInitializer = z.object({
  id: zodLocationsProductsId.optional(),
  count: z.string().optional(),
  product_id: zodProductsId.optional().nullable(),
  location_id: zodLocationsId.optional().nullable(),
  company_id: zodCompaniesId.optional().nullable(),
});
export const locationsProductsMutator = z.object({
  id: zodLocationsProductsId.optional(),
  count: z.string().optional(),
  product_id: zodProductsId.optional().nullable(),
  location_id: zodLocationsId.optional().nullable(),
  company_id: zodCompaniesId.optional().nullable(),
});
export const companies = z.object({
  id: zodCompaniesId,
  created_at: z.date(),
  updated_at: z.date(),
  deleted_at: z.date().nullable(),
  title: z.string(),
  owner_id: zodUsersId,
  address: z.string(),
  phone: z.string(),
  email: z.string(),
  date_of_founding: z.date().nullable(),
  cin: z.string().nullable(),
  image_id: zodImagesId.nullable(),
});
export const companiesInitializer = z.object({
  id: zodCompaniesId.optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  deleted_at: z.date().optional().nullable(),
  title: z.string(),
  owner_id: zodUsersId,
  address: z.string(),
  phone: z.string(),
  email: z.string(),
  date_of_founding: z.date().optional().nullable(),
  cin: z.string().optional().nullable(),
  image_id: zodImagesId.optional().nullable(),
});
export const companiesMutator = z.object({
  id: zodCompaniesId.optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  deleted_at: z.date().optional().nullable(),
  title: z.string().optional(),
  owner_id: zodUsersId.optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  date_of_founding: z.date().optional().nullable(),
  cin: z.string().optional().nullable(),
  image_id: zodImagesId.optional().nullable(),
});
export const locations = z.object({
  id: zodLocationsId,
  created_at: z.date(),
  updated_at: z.date(),
  deleted_at: z.date().nullable(),
  title: z.string(),
  company_id: zodCompaniesId,
  latitude: z.string().nullable(),
  longitude: z.string().nullable(),
});
export const locationsInitializer = z.object({
  id: zodLocationsId.optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  deleted_at: z.date().optional().nullable(),
  title: z.string(),
  company_id: zodCompaniesId,
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
});
export const locationsMutator = z.object({
  id: zodLocationsId.optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  deleted_at: z.date().optional().nullable(),
  title: z.string().optional(),
  company_id: zodCompaniesId.optional(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
});
export const roles = z.object({
  id: zodRolesId,
  created_at: z.date(),
  updated_at: z.date(),
  deleted_at: z.date().nullable(),
  title: z.string(),
  is_default: z.boolean(),
});
export const rolesInitializer = z.object({
  id: zodRolesId.optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  deleted_at: z.date().optional().nullable(),
  title: z.string(),
  is_default: z.boolean().optional(),
});
export const rolesMutator = z.object({
  id: zodRolesId.optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  deleted_at: z.date().optional().nullable(),
  title: z.string().optional(),
  is_default: z.boolean().optional(),
});
export const images = z.object({
  id: zodImagesId,
  title: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  deleted_at: z.date().nullable(),
  owner_id: zodUsersId,
});
export const imagesInitializer = z.object({
  id: zodImagesId.optional(),
  title: z.string(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  deleted_at: z.date().optional().nullable(),
  owner_id: zodUsersId,
});
export const imagesMutator = z.object({
  id: zodImagesId.optional(),
  title: z.string().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  deleted_at: z.date().optional().nullable(),
  owner_id: zodUsersId.optional(),
});
