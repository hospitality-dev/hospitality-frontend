import { boolean, enum as enum_, infer as zodInfer, number, object, string } from "zod";

export const ContactTypesSchema = enum_([
  "work_email",
  "personal_email",
  "support_email",
  "billing_email",
  "work_phone",
  "personal_phone",
  "mobile_phone",
  "fax",
  "home_phone",
  "whatsapp",
  "slack",
  "work_address",
  "home_address",
  "billing_address",
  "shipping_address",
  "website",
  "linkedin",
  "twitter",
  "facebook",
  "instagram",

  // Business contact types
  "office_address",
  "headquarters_address",
  "warehouse_address",
  "sales_email",
  "marketing_email",
  "hr_email",
  "contact_email",
  "sales_phone",
  "support_phone",
  "customer_service_phone",
  "general_inquiry_phone",
  "company_website",
  "support_website",
]);

export const ContactSchema = object({
  id: string().uuid().nonempty(),
  title: string().nullable(),
  parentId: string().uuid().nonempty(),
  placeId: number().nullish(),
  prefix: string().max(4).nullish(),
  value: string().nonempty("Contact value cannot be empty."),
  latitude: number().nullish(),
  longitude: number().nullish(),
  boundingBox: number().array().nullish(),
  isPublic: boolean().default(false).nullable(),
  contactType: ContactTypesSchema,
});

export const ContactInitializerSchema = object({
  id: string().uuid().nonempty(),
  title: string().nullable(),
  parentId: string().uuid().nonempty(),
  prefix: string().max(4).nullish(),
  value: string().nonempty("Contact value cannot be empty."),
  isPublic: boolean().default(false).nullable(),
  placeId: number().nullish(),
  latitude: number().nullish(),
  longitude: number().nullish(),
  boundingBox: number().array().nullish(),
  contactType: ContactTypesSchema,
});

export const ContactMutatorSchema = object({
  id: string().uuid().nonempty(),
  title: string().nullable(),
  prefix: string().max(4).nullish(),
  value: string().nonempty("Contact value cannot be empty."),
  isPublic: boolean().default(false).nullable(),
  placeId: number().nullish(),
  latitude: number().nullish(),
  longitude: number().nullish(),
  boundingBox: number().array().nullish(),
  contactType: ContactTypesSchema,
});

export type ContactTypes = zodInfer<typeof ContactTypesSchema>;
export type ContactType = zodInfer<typeof ContactSchema>;
export type ContactInitializerType = zodInfer<typeof ContactInitializerSchema>;
export type ContactMutatorType = zodInfer<typeof ContactMutatorSchema>;
