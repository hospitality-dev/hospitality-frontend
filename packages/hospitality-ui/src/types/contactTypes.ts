import { enum as enum_, infer as zodInfer, object, string } from "zod";

export const contactTypeSchema = enum_([
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
]);

export const ContactSchema = object({
  id: string().uuid().nonempty(),
  parentId: string().uuid().nonempty(),
  prefix: string().max(4).nullish(),
  value: string().nonempty("Contact value cannot be empty."),
  contactType: contactTypeSchema,
});

export const ContactInitializerSchema = object({
  parentId: string().uuid().nonempty(),
  prefix: string().max(4).nullish(),
  value: string().nonempty("Contact value cannot be empty."),
  contactType: contactTypeSchema,
});

export const ContactMutatorSchema = object({
  prefix: string().max(4).nullish(),
  value: string().nonempty("Contact value cannot be empty."),
});

export type ContactType = zodInfer<typeof ContactSchema>;
export type ContactInitializerType = zodInfer<typeof ContactInitializerSchema>;
export type ContactMutatorType = zodInfer<typeof ContactMutatorSchema>;
