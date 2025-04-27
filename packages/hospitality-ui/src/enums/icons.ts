export const Icons = {
  add: "ph:plus" as const,
  addItem: "mdi:basket-plus-outline" as const,
  addUser: "ph:user-plus" as const,
  arrowDown: "ph:caret-down" as const,
  arrowLeft: "ph:caret-left" as const,
  arrowRight: "ph:caret-right" as const,
  arrowUp: "ph:caret-up" as const,
  arrowsUpAndDown: "solar:sort-vertical-outline" as const,
  avi: "bi:file-earmark-slides",
  barcode: "ph:barcode" as const,
  bardcodeRemove: "iconoir:scan-barcode" as const,
  booking: "hugeicons:restaurant-01" as const,
  beer: "ph:beer-bottle-light" as const,
  billingAddress: "fluent:receipt-money-20-regular" as const,
  billingEmail: "icon-park-twotone:mail-review" as const,
  businessEmail: "fluent:mail-briefcase-24-filled" as const,
  check: "ph:check" as const,
  checkCircle: "ph:check-circle" as const,
  chicken: "healthicons:animal-chicken-outline" as const,
  close: "ph:x" as const,
  companyWebsite: "hugeicons:job-link" as const,
  contactEmail: "fluent:person-mail-48-filled" as const,
  createReport: "bi:clipboard2-plus" as const,
  csv: "bi:filetype-csv" as const,
  customerServicePhone: "hugeicons:customer-service" as const,
  delete: "ph:trash" as const,
  doc: "bi:filetype-doc" as const,
  docx: "bi:filetype-docx" as const,
  download: "ph:download" as const,
  employee: "mdi:user-badge-outline" as const,
  email: "entypo:email" as const,
  expiry: "fluent:clipboard-clock-24-regular" as const,
  eye: "ph:eye-light" as const,
  eyeSlash: "ph:eye-slash-light" as const,
  fax: "icons8:fax" as const,
  facebook: "ph:facebook-logo" as const,
  file: "bi:file-earmark",
  folder: "ph:folder" as const,
  generalInquiryPhone: "material-symbols:perm-phone-msg-outline" as const,
  generateReport: "mdi:graph-box-plus-outline" as const,
  gif: "bi:filetype-gif",
  homeAddress: "bi:house" as const,
  homePhone: "tabler:device-landline-phone" as const,
  headquartersAddress: "fluent:building-home-20-regular" as const,
  hrEmail: "fluent:mail-shield-20-regular" as const,
  info: "ph:info-light" as const,
  input: "streamline:input-box" as const,
  images: "ph:image" as const,
  inventory: "system-uicons:boxes" as const,
  instagram: "ph:instagram-logo" as const,
  jpg: "bi:filetype-jpg" as const,
  jpeg: "bi:filetype-jpg" as const,
  json: "bi:filetype-json" as const,
  link: "ph:link" as const,
  linkedin: "ph:linkedin-logo" as const,
  loading: "ph:circle-notch" as const,
  location: "gis:poi-map" as const,
  locationChange: "fluent:building-swap-24-regular" as const,
  locationUser: "fluent:building-people-24-regular" as const,
  manage: "fluent:clipboard-text-edit-24-regular" as const,
  marketingEmail: "fluent:mail-alert-32-regular" as const,
  menu: "ph:dots-three-circle-thin" as const,
  mobilePhone: "ph:device-mobile-camera" as const,
  modules: "oui:index-mapping" as const,
  mov: "bi:file-earmark-slides" as const,
  mp3: "bi:filetype-mp3" as const,
  mp4: "bi:filetype-mp4" as const,
  officeAddress: "fluent:building-20-regular" as const,
  ogg: "bi:file-earmark-music",
  pdf: "bi:filetype-pdf",
  personalEmail: "ph:envelope" as const,
  personalPhone: "fluent:phone-person-24-regular" as const,
  phone: "ph:phone" as const,
  png: "bi:filetype-png" as const,
  purchases: "fluent:receipt-bag-24-regular" as const,
  qrCodes: "clarity:qr-code-line" as const,
  rar: "bi:file-earmark-file-zip",
  removeItem: "mdi:basket-minus-outline" as const,
  removeUser: "ph:user-minus" as const,
  reports: "ph:chart-line" as const,
  salesEmail: "tabler:mail-dollar" as const,
  salesPhone: "ph:phone-incoming" as const,
  save: "ph:floppy-disk" as const,
  settings: "ph:gear" as const,
  shippingAddress: "material-symbols-light:local-shipping-outline-rounded" as const,
  slack: "ph:slack-logo" as const,
  star: "ph:star" as const,
  supplier: "ph:truck" as const,
  supportPhone: "ph:headset" as const,
  supportEmail: "fluent:chat-mail-20-regular" as const,
  supportWebsite: "carbon:create-link" as const,
  svg: "bi:filetype-svg" as const,
  twitter: "ph:twitter-logo" as const,
  txt: "bi:filetype-txt" as const,
  unknown: "lineicons:file-question" as const,
  upload: "ph:upload" as const,
  user: "ph:user" as const,
  userDetails: "ph:identification-card" as const,
  warehouseAddress: "material-symbols:warehouse-outline-rounded" as const,
  warning: "ph:warning-circle",
  wav: "bi:filetype-wav" as const,
  webm: "bi:file-earmark-slides",
  webp: "bi:file-earmark-image",
  website: "ph:globe" as const,
  whatsapp: "ph:whatsapp-logo" as const,
  workAddress: "ph:briefcase" as const,
  workEmail: "fluent:mail-briefcase-48-regular" as const,
  workPhone: "carbon:phone-ip" as const,
  xls: "bi:filetype-xls" as const,
  xlsx: "bi:filetype-xlsx" as const,
  zip: "bi:file-earmark-file-zip",
};

export type ContactTypeIcons = Pick<
  typeof Icons,
  | "workEmail"
  | "personalEmail"
  | "supportEmail"
  | "billingEmail"
  | "workPhone"
  | "personalPhone"
  | "mobilePhone"
  | "fax"
  | "homePhone"
  | "whatsapp"
  | "slack"
  | "workAddress"
  | "homeAddress"
  | "billingAddress"
  | "shippingAddress"
  | "website"
  | "linkedin"
  | "twitter"
  | "facebook"
  | "instagram"
  | "salesEmail"
  | "marketingEmail"
  | "hrEmail"
  | "contactEmail"
  | "salesPhone"
  | "supportPhone"
  | "customerServicePhone"
  | "generalInquiryPhone"
  | "officeAddress"
  | "headquartersAddress"
  | "warehouseAddress"
  | "companyWebsite"
  | "supportWebsite"
>;
