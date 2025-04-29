import { ContactGroupType, ContactType } from "../types";

export function getSentenceCase(field: string) {
  const text = field?.replaceAll(/[_-]/g, " ")?.replace(/([A-Z])/g, " $1") || "";
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}

export function groupBy<T, K extends keyof T>(data: T[], key: K) {
  return data.reduce<Record<string, T[]>>(
    (prev, curr) => {
      const groupKey = String(curr[key]);
      if (!prev[groupKey]) {
        prev[groupKey] = [];
      }
      prev[groupKey].push(curr);
      return prev;
    },
    {} as Record<string, T[]>
  );
}

export function groupByContacts(data: ContactType[]) {
  return data.reduce<Record<ContactGroupType, ContactType[]>>(
    (prev, curr) => {
      let key: ContactGroupType = "other";
      if (curr.contactType.includes("address")) {
        key = "address";
      } else if (curr.contactType.includes("phone")) {
        key = "phone";
      } else if (curr.contactType.includes("email")) {
        key = "email";
      } else if (curr.contactType.includes("website")) {
        key = "website";
      }
      if (!prev?.[key]) {
        prev[key] = [curr];
      } else {
        prev[key].push(curr);
      }
      return prev;
    },
    { other: [], address: [], phone: [], email: [], website: [] } as Record<ContactGroupType, ContactType[]>
  );
}
