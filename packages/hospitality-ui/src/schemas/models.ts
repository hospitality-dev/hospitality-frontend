import { z } from "zod";
export const zodProductsId = z.string();
export const zodUsersId = z.string();
export const zodLocationsUsersId = z.string();
export const zodLocationsProductsId = z.string();
export const zodLocationsAvailableProductsId = z.string();
export const zodLocationsId = z.string();
export const zodRolesId = z.string();
export const zodImagesId = z.string();
export const zodProductsCategoriesId = z.string();
export const products = z.object({
  id: zodProductsId,
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
  deletedAt: z.date().nullable(),
  title: z.string(),
  description: z.string().nullable(),
  weight: z.string().nullable(),
  volume: z.string().nullable(),
  barcode: z.string().nullable(),
  categoryId: zodProductsCategoriesId,
  subcategoryId: zodProductsCategoriesId.nullable(),
  imageId: zodImagesId.nullable(),
});
export const productsInitializer = z.object({
  id: zodProductsId.optional(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
  deletedAt: z.date().optional().nullable(),
  title: z.string(),
  description: z.string().optional().nullable(),
  weight: z.string().optional().nullable(),
  volume: z.string().optional().nullable(),
  barcode: z.string().optional().nullable(),
  categoryId: zodProductsCategoriesId,
  subcategoryId: zodProductsCategoriesId.optional().nullable(),
  imageId: zodImagesId.optional().nullable(),
});
export const productsMutator = z.object({
  id: zodProductsId.optional(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
  deletedAt: z.date().optional().nullable(),
  title: z.string().optional(),
  description: z.string().optional().nullable(),
  weight: z.string().optional().nullable(),
  volume: z.string().optional().nullable(),
  barcode: z.string().optional().nullable(),
  categoryId: zodProductsCategoriesId.optional(),
  subcategoryId: zodProductsCategoriesId.optional().nullable(),
  imageId: zodImagesId.optional().nullable(),
});
export const users = z.object({
  id: zodUsersId,
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
  imageId: zodImagesId.nullable(),
});
export const usersInitializer = z.object({
  id: zodUsersId.optional(),
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
  imageId: zodImagesId.optional().nullable(),
});
export const usersMutator = z.object({
  id: zodUsersId.optional(),
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
  imageId: zodImagesId.optional().nullable(),
});
export const locationsUsers = z.object({
  id: zodLocationsUsersId,
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  locationId: zodLocationsId,
  userId: zodUsersId,
  roleId: zodRolesId,
});
export const locationsUsersInitializer = z.object({
  id: zodLocationsUsersId.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  locationId: zodLocationsId,
  userId: zodUsersId,
  roleId: zodRolesId,
});
export const locationsUsersMutator = z.object({
  id: zodLocationsUsersId.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  locationId: zodLocationsId.optional(),
  userId: zodUsersId.optional(),
  roleId: zodRolesId.optional(),
});
export const locationsProducts = z.object({
  id: zodLocationsProductsId,
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  availableProductId: zodLocationsAvailableProductsId.nullable(),
  locationId: zodLocationsId,
});
export const locationsProductsInitializer = z.object({
  id: zodLocationsProductsId.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  availableProductId: zodLocationsAvailableProductsId.optional().nullable(),
  locationId: zodLocationsId,
});
export const locationsProductsMutator = z.object({
  id: zodLocationsProductsId.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  availableProductId: zodLocationsAvailableProductsId.optional().nullable(),
  locationId: zodLocationsId.optional(),
});
export const locationsAvailableProducts = z.object({
  id: zodLocationsAvailableProductsId,
  productId: zodProductsId,
  locationId: zodLocationsId,
});
export const locationsAvailableProductsInitializer = z.object({
  id: zodLocationsAvailableProductsId.optional(),
  productId: zodProductsId,
  locationId: zodLocationsId,
});
export const locationsAvailableProductsMutator = z.object({
  id: zodLocationsAvailableProductsId.optional(),
  productId: zodProductsId.optional(),
  locationId: zodLocationsId.optional(),
});
export const locations = z.object({
  id: zodLocationsId,
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  title: z.string(),
  ownerId: zodUsersId,
  latitude: z.string().nullable(),
  longitude: z.string().nullable(),
});
export const locationsInitializer = z.object({
  id: zodLocationsId.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  title: z.string(),
  ownerId: zodUsersId,
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
});
export const locationsMutator = z.object({
  id: zodLocationsId.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  title: z.string().optional(),
  ownerId: zodUsersId.optional(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
});
export const roles = z.object({
  id: zodRolesId,
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  title: z.string(),
  isDefault: z.boolean(),
});
export const rolesInitializer = z.object({
  id: zodRolesId.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  title: z.string(),
  isDefault: z.boolean().optional(),
});
export const rolesMutator = z.object({
  id: zodRolesId.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  title: z.string().optional(),
  isDefault: z.boolean().optional(),
});
export const images = z.object({
  id: zodImagesId,
  title: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  ownerId: zodUsersId,
});
export const imagesInitializer = z.object({
  id: zodImagesId.optional(),
  title: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  ownerId: zodUsersId,
});
export const imagesMutator = z.object({
  id: zodImagesId.optional(),
  title: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  ownerId: zodUsersId.optional(),
});
export const productsCategories = z.object({
  id: zodProductsCategoriesId,
  title: z.string(),
  parentId: zodProductsCategoriesId.nullable(),
});
export const productsCategoriesInitializer = z.object({
  id: zodProductsCategoriesId.optional(),
  title: z.string(),
  parentId: zodProductsCategoriesId.optional().nullable(),
});
export const productsCategoriesMutator = z.object({
  id: zodProductsCategoriesId.optional(),
  title: z.string().optional(),
  parentId: zodProductsCategoriesId.optional().nullable(),
});
