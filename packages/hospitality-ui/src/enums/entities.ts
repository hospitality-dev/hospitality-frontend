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
  "contacts",
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
  phone: {
    professional: ["work_phone", "mobile_phone", "whatsapp", "fax"] as const,
    personal: [
      "personal_phone",
      "mobile_phone",
      "home_phone",
      "sales_phone",
      "support_phone",
      "customer_service_phone",
      "general_inquiry_phone",
      "whatsapp",
    ] as const,
  },
  address: {
    professional: [
      "work_address",
      "billing_address",
      "shipping_address",
      "office_address",
      "headquarters_address",
      "warehouse_address",
    ] as const,
    personal: ["home_address"] as const,
  },
  website: { professional: ["company_website", "support_website", "website"] as const, personal: [] },
  other: {
    professional: ["linkedin", "twitter", "facebook", "instagram", "slack"] as const,
    personal: ["linkedin", "twitter", "facebook", "instagram"] as const,
  },
};
