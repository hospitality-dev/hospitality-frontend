import { enum as enum_, infer as zodInfer, object, string } from "zod";

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

export const FilesCategoriesEnum = enum_(["report", "qr_codes", "unknown"]);

export const FilesSchema = object({
  id: string().uuid().nonempty(),
  title: string().nonempty(),
  ownerId: string().uuid().nonempty(),
  locationId: string().uuid().nullish(),
  companyId: string().uuid().nonempty(),
  type: string(),
  category: string(),
});
export type FilesType = zodInfer<typeof FilesSchema>;
export type FileTypes = zodInfer<typeof FileTypesEnum>;
export type FilesCategories = zodInfer<typeof FilesCategoriesEnum>;
