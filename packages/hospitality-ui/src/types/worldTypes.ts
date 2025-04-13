import { infer as zodInfer, number, object, string } from "zod";

export const CountriesSchema = object({
  id: string().uuid(),
  title: string(),
  iso2: string(),
  iso3: string(),
  numbericCode: string(),
  phonecode: string(),
  capital: string(),
  currency: string(),
  currencyName: string(),
  currencySymbol: string(),
  tld: string(),
  nationality: string(),
  timezones: string(),
  latitude: number(),
  longitude: number(),
  wikiDataId: number(),
  regionId: string().uuid(),
  subregionId: string().uuid(),
});

export type CountriesType = zodInfer<typeof CountriesSchema>;
