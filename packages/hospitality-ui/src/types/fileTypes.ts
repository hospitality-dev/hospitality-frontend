import { date, enum as enum_, infer as zodInfer, nullable, object, optional, string, uuidv4 } from "@zod/mini";

export const FileTypesEnum = enum_([
  "png",
  "jpg",
  "jpeg",
  "webp",
  "gif",
  "svg",
  "pdf",
  "doc",
  "docx",
  "txt",
  "xls",
  "xlsx",
  "mp3",
  "wav",
  "ogg",
  "mp4",
  "mov",
  "avi",
  "webm",
  "zip",
  "rar",
  "json",
  "csv",
  "unknown",
]);

export const FilesCategoriesEnum = enum_(["reports", "images", "qr_codes", "unknown"]);

export const FilesSchema = object({
  id: uuidv4(),
  createdAt: date(),
  title: string(),
  ownerId: uuidv4(),
  locationId: nullable(optional(uuidv4())),
  companyId: uuidv4(),
  type: FileTypesEnum,
  category: FilesCategoriesEnum,
});
export type FilesType = zodInfer<typeof FilesSchema>;
export type FileTypes = zodInfer<typeof FileTypesEnum>;
export type FilesCategories = zodInfer<typeof FilesCategoriesEnum>;
