export function getSentenceCase(field: string) {
  const text = field?.replaceAll("_", " ")?.replace(/([A-Z])/g, " $1") || "";
  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}
