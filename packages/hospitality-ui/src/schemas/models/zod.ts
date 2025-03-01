import { z } from "zod";
export const companiesUsersId = z.string();
export const productsId = z.string();
export const usersId = z.string();
export const locationsUsersId = z.string();
export const companiesId = z.string();
export const companiesLocationsId = z.string();
export const locationsId = z.string();
export const rolesId = z.string();
export const imagesId = z.string();
export const productsLocationsId = z.string();
export const companiesUsers = z.object({
  id: companiesUsersId,
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  companyId: companiesId,
  userId: usersId,
  roleId: rolesId.nullable(),
});
export const companiesUsersInitializer = z.object({
  id: companiesUsersId.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  companyId: companiesId,
  userId: usersId,
  roleId: rolesId.optional().nullable(),
});
export const companiesUsersMutator = z.object({
  id: companiesUsersId.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  companyId: companiesId.optional(),
  userId: usersId.optional(),
  roleId: rolesId.optional().nullable(),
});
export const products = z.object({
  id: productsId,
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
  deletedAt: z.date().nullable(),
  title: z.string(),
  description: z.string().nullable(),
  weight: z.string().nullable(),
  volume: z.string().nullable(),
  barcode: z.string().nullable(),
  imageId: imagesId.nullable(),
});
export const productsInitializer = z.object({
  id: productsId.optional(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
  deletedAt: z.date().optional().nullable(),
  title: z.string(),
  description: z.string().optional().nullable(),
  weight: z.string().optional().nullable(),
  volume: z.string().optional().nullable(),
  barcode: z.string().optional().nullable(),
  imageId: imagesId.optional().nullable(),
});
export const productsMutator = z.object({
  id: productsId.optional(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
  deletedAt: z.date().optional().nullable(),
  title: z.string().optional(),
  description: z.string().optional().nullable(),
  weight: z.string().optional().nullable(),
  volume: z.string().optional().nullable(),
  barcode: z.string().optional().nullable(),
  imageId: imagesId.optional().nullable(),
});
export const users = z.object({
  id: usersId,
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  dateOfBirth: z.date().nullable(),
  dateOfEmployment: z.date().nullable(),
  dateOfTermination: z.date().nullable(),
  imageId: imagesId.nullable(),
  defaultCompanyId: companiesId.nullable(),
});
export const usersInitializer = z.object({
  id: usersId.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  dateOfBirth: z.date().optional().nullable(),
  dateOfEmployment: z.date().optional().nullable(),
  dateOfTermination: z.date().optional().nullable(),
  imageId: imagesId.optional().nullable(),
  defaultCompanyId: companiesId.optional().nullable(),
});
export const usersMutator = z.object({
  id: usersId.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  username: z.string().optional(),
  pwHsh: z.string().optional(),
  email: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  dateOfBirth: z.date().optional().nullable(),
  dateOfEmployment: z.date().optional().nullable(),
  dateOfTermination: z.date().optional().nullable(),
  imageId: imagesId.optional().nullable(),
  defaultCompanyId: companiesId.optional().nullable(),
});
export const locationsUsers = z.object({
  id: locationsUsersId,
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  locationId: z.string(),
  userId: z.string(),
  roleId: z.string(),
});
export const locationsUsersInitializer = z.object({
  id: locationsUsersId.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  locationId: z.string(),
  userId: z.string(),
  roleId: z.string(),
});
export const locationsUsersMutator = z.object({
  id: locationsUsersId.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  locationId: z.string().optional(),
  userId: z.string().optional(),
  roleId: z.string().optional(),
});
export const companies = z.object({
  id: companiesId,
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  title: z.string(),
  ownerId: usersId,
  address: z.string(),
  phone: z.string(),
  email: z.string(),
  dateOfFounding: z.date().nullable(),
  cin: z.string().nullable(),
  imageId: imagesId.nullable(),
});
export const companiesInitializer = z.object({
  id: companiesId.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  title: z.string(),
  ownerId: usersId,
  address: z.string(),
  phone: z.string(),
  email: z.string(),
  dateOfFounding: z.date().optional().nullable(),
  cin: z.string().optional().nullable(),
  imageId: imagesId.optional().nullable(),
});
export const companiesMutator = z.object({
  id: companiesId.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  title: z.string().optional(),
  ownerId: usersId.optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  dateOfFounding: z.date().optional().nullable(),
  cin: z.string().optional().nullable(),
  imageId: imagesId.optional().nullable(),
});
export const companiesLocations = z.object({
  id: companiesLocationsId,
  companyId: companiesId,
  locationId: locationsId,
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});
export const companiesLocationsInitializer = z.object({
  id: companiesLocationsId.optional(),
  companyId: companiesId,
  locationId: locationsId,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
});
export const companiesLocationsMutator = z.object({
  id: companiesLocationsId.optional(),
  companyId: companiesId.optional(),
  locationId: locationsId.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
});
export const locations = z.object({
  id: locationsId,
  title: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  latitude: z.string().nullable(),
  longitude: z.string().nullable(),
});
export const locationsInitializer = z.object({
  id: locationsId.optional(),
  title: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
});
export const locationsMutator = z.object({
  id: locationsId.optional(),
  title: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
});
export const roles = z.object({
  id: rolesId,
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  title: z.string(),
  isDefault: z.boolean(),
});
export const rolesInitializer = z.object({
  id: rolesId.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  title: z.string(),
  isDefault: z.boolean().optional(),
});
export const rolesMutator = z.object({
  id: rolesId.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  title: z.string().optional(),
  isDefault: z.boolean().optional(),
});
export const images = z.object({
  id: imagesId,
  title: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  ownerId: usersId,
});
export const imagesInitializer = z.object({
  id: imagesId.optional(),
  title: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  ownerId: usersId,
});
export const imagesMutator = z.object({
  id: imagesId.optional(),
  title: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  ownerId: usersId.optional(),
});
export const productsLocations = z.object({
  id: productsLocationsId,
  count: z.string(),
  productId: productsId.nullable(),
  locationId: locationsId.nullable(),
  companyId: companiesId.nullable(),
});
export const productsLocationsInitializer = z.object({
  id: productsLocationsId.optional(),
  count: z.string().optional(),
  productId: productsId.optional().nullable(),
  locationId: locationsId.optional().nullable(),
  companyId: companiesId.optional().nullable(),
});
export const productsLocationsMutator = z.object({
  id: productsLocationsId.optional(),
  count: z.string().optional(),
  productId: productsId.optional().nullable(),
  locationId: locationsId.optional().nullable(),
  companyId: companiesId.optional().nullable(),
});
