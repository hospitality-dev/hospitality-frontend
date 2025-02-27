import { z } from "zod";
export const idcompaniesUsers = z.string();
export const idproducts = z.string();
export const idusers = z.string();
export const idcompanies = z.string();
export const idcompaniesLocations = z.string();
export const idlocations = z.string();
export const idimages = z.string();
export const idproductsLocations = z.string();
export const companiesUsers = z.object({
  id: idcompaniesUsers,
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  companyId: idcompanies,
  userId: idusers,
});
export const companiesUsersInitializer = z.object({
  id: idcompaniesUsers.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  companyId: idcompanies,
  userId: idusers,
});
export const companiesUsersMutator = z.object({
  id: idcompaniesUsers.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  companyId: idcompanies.optional(),
  userId: idusers.optional(),
});
export const products = z.object({
  id: idproducts,
  createdAt: z.date().nullable(),
  updatedAt: z.date().nullable(),
  deletedAt: z.date().nullable(),
  title: z.string(),
  description: z.string().nullable(),
  weight: z.string().nullable(),
  volume: z.string().nullable(),
  barcode: z.string().nullable(),
  imageId: idimages.nullable(),
});
export const productsInitializer = z.object({
  id: idproducts.optional(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
  deletedAt: z.date().optional().nullable(),
  title: z.string(),
  description: z.string().optional().nullable(),
  weight: z.string().optional().nullable(),
  volume: z.string().optional().nullable(),
  barcode: z.string().optional().nullable(),
  imageId: idimages.optional().nullable(),
});
export const productsMutator = z.object({
  id: idproducts.optional(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
  deletedAt: z.date().optional().nullable(),
  title: z.string().optional(),
  description: z.string().optional().nullable(),
  weight: z.string().optional().nullable(),
  volume: z.string().optional().nullable(),
  barcode: z.string().optional().nullable(),
  imageId: idimages.optional().nullable(),
});
export const users = z.object({
  id: idusers,
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
  imageId: idimages.nullable(),
});
export const usersInitializer = z.object({
  id: idusers.optional(),
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
  imageId: idimages.optional().nullable(),
});
export const usersMutator = z.object({
  id: idusers.optional(),
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
  imageId: idimages.optional().nullable(),
});
export const companies = z.object({
  id: idcompanies,
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  title: z.string(),
  ownerId: idusers,
  address: z.string(),
  phone: z.string(),
  email: z.string(),
  dateOfFounding: z.date().nullable(),
  cin: z.string().nullable(),
  imageId: idimages.nullable(),
});
export const companiesInitializer = z.object({
  id: idcompanies.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  title: z.string(),
  ownerId: idusers,
  address: z.string(),
  phone: z.string(),
  email: z.string(),
  dateOfFounding: z.date().optional().nullable(),
  cin: z.string().optional().nullable(),
  imageId: idimages.optional().nullable(),
});
export const companiesMutator = z.object({
  id: idcompanies.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  title: z.string().optional(),
  ownerId: idusers.optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  dateOfFounding: z.date().optional().nullable(),
  cin: z.string().optional().nullable(),
  imageId: idimages.optional().nullable(),
});
export const companiesLocations = z.object({
  id: idcompaniesLocations,
  companyId: idcompanies,
  locationId: idlocations,
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});
export const companiesLocationsInitializer = z.object({
  id: idcompaniesLocations.optional(),
  companyId: idcompanies,
  locationId: idlocations,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
});
export const companiesLocationsMutator = z.object({
  id: idcompaniesLocations.optional(),
  companyId: idcompanies.optional(),
  locationId: idlocations.optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
});
export const locations = z.object({
  id: idlocations,
  title: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  latitude: z.string().nullable(),
  longitude: z.string().nullable(),
});
export const locationsInitializer = z.object({
  id: idlocations.optional(),
  title: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
});
export const locationsMutator = z.object({
  id: idlocations.optional(),
  title: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  latitude: z.string().optional().nullable(),
  longitude: z.string().optional().nullable(),
});
export const images = z.object({
  id: idimages,
  title: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  ownerId: idusers,
});
export const imagesInitializer = z.object({
  id: idimages.optional(),
  title: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  ownerId: idusers,
});
export const imagesMutator = z.object({
  id: idimages.optional(),
  title: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional().nullable(),
  ownerId: idusers.optional(),
});
export const productsLocations = z.object({
  id: idproductsLocations,
  count: z.string(),
  productId: idproducts.nullable(),
  locationId: idlocations.nullable(),
  companyId: idcompanies.nullable(),
});
export const productsLocationsInitializer = z.object({
  id: idproductsLocations.optional(),
  count: z.string().optional(),
  productId: idproducts.optional().nullable(),
  locationId: idlocations.optional().nullable(),
  companyId: idcompanies.optional().nullable(),
});
export const productsLocationsMutator = z.object({
  id: idproductsLocations.optional(),
  count: z.string().optional(),
  productId: idproducts.optional().nullable(),
  locationId: idlocations.optional().nullable(),
  companyId: idcompanies.optional().nullable(),
});
