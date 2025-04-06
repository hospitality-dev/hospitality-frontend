export const AvailableActionsEnum = ["create", "view", "list", "update", "archive", "delete"] as const;

export const AvailableEntitiesEnum = [
  "users",
  "companies",
  "locations",
  "roles",
  "products",
  "products_categories",
  "locations_available_products",
  "locations_products",
  "locations_users",
  "unknown",
] as const;

export const AvailableSearchableEntitiesEnum = [
  "addresses",
  "locations",
  "roles",
  "products",
  // "products_categories",
  // "locations_available_products",
  "locations_products",
  "locations_users",
  "users",
] as const;

export const AvailableContactTypes = {
  email: [
    "work_email",
    "personal_email",
    "support_email",
    "billing_email",
    "sales_email",
    "marketing_email",
    "hr_email",
    "contact_email",
  ] as const,
  phone: [
    "work_phone",
    "personal_phone",
    "mobile_phone",
    "home_phone",
    "sales_phone",
    "support_phone",
    "customer_service_phone",
    "general_inquiry_phone",
    "whatsapp",
    "fax",
  ] as const,
  address: [
    "work_address",
    "home_address",
    "billing_address",
    "shipping_address",
    "office_address",
    "headquarters_address",
    "warehouse_address",
    "company_website",
    "support_website",
    "website",
  ] as const,
  other: ["linkedin", "twitter", "facebook", "instagram", "slack"] as const,
};
