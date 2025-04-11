import { ContactType, ContactTypes } from "../types";
import { getSentenceCase } from "./transform";

export function getBaseContact(contactType: ContactTypes): ContactType {
  return {
    id: crypto.randomUUID(),
    title: getSentenceCase(contactType),
    prefix: null,
    value: "",
    contactType,
    isPublic: false,
  };
}
