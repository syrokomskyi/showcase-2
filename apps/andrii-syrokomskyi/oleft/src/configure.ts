import type { COUNTRY_MAPPING, LANGUAGE_MAPPING } from "./utils/localization";

// See `utils/localization.ts` for available options.
export const defaultCountry = "germany";
export const defaultCountryCode: keyof typeof COUNTRY_MAPPING = "de";

export const defaultLanguage = "german";
export const defaultLanguageCode: keyof typeof LANGUAGE_MAPPING = "de";

// We need it for getting a default entry meta from BCMS.
export const defaultLanguageCodeInBcms = "en";
