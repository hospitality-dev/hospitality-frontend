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
  email: {
    professional: [
      "work_email",
      "billing_email",
      "hr_email",
      "sales_email",
      "marketing_email",
      "contact_email",
      "support_email",
    ] as const,
    personal: ["personal_email", "work_email"],
  },
  phone: {
    professional: [
      "work_phone",
      "mobile_phone",
      "sales_phone",
      "support_phone",
      "customer_service_phone",
      "general_inquiry_phone",
      "fax",
    ] as const,
    personal: ["personal_phone", "mobile_phone", "home_phone"] as const,
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
    professional: ["whatsapp", "linkedin", "twitter", "facebook", "instagram", "slack"] as const,
    personal: ["whatsapp", "linkedin", "twitter", "facebook", "instagram"] as const,
  },
};

export const AvailableDomains = [
  "com",
  "net",
  "app",
  "org",
  "co",
  "io",
  "xyz",
  "co.uk",
  "co.ca",
  "co.us",
  "rs",
  "срб",
] as const;
