import type { Client } from "@thebcms/client";
import type { EntryParsed } from "@thebcms/types";
import {
  defaultCountry,
  defaultCountryCode,
  defaultLanguage,
  defaultLanguageCode,
  defaultLanguageCodeInBcms,
} from "../configure";

// Country code to full name mapping
export const COUNTRY_MAPPING = {
  // TODO 'us': 'united-states',
  // TODO 'uk': 'united-kingdom',
  de: "germany",
  // TODO 'fr': 'france',
  // TODO 'es': 'spain',
  // TODO 'it': 'italy',
  // TODO 'nl': 'netherlands',
  // TODO 'pl': 'poland',
  // TODO 'cz': 'czech-republic',
  // TODO 'sk': 'slovakia'
} as const;

// Language code to full name mapping
export const LANGUAGE_MAPPING = {
  de: "german",
  en: "english",
  // TODO 'fr': 'french',
  // TODO 'es': 'spanish',
  // TODO 'it': 'italian',
  // TODO 'nl': 'dutch',
  // TODO 'pl': 'polish',
  // TODO 'cs': 'czech',
  // TODO 'sk': 'slovak'
} as const;

// Reverse mappings for converting full names back to codes.
export const COUNTRY_CODE_MAPPING = Object.fromEntries(
  Object.entries(COUNTRY_MAPPING).map(([code, name]) => [name, code]),
) as Record<string, keyof typeof COUNTRY_MAPPING>;

export const LANGUAGE_CODE_MAPPING = Object.fromEntries(
  Object.entries(LANGUAGE_MAPPING).map(([code, name]) => [name, code]),
) as Record<string, keyof typeof LANGUAGE_MAPPING>;

export function getCountryName(
  code: keyof typeof COUNTRY_MAPPING | string,
): string {
  return (
    COUNTRY_MAPPING[code as keyof typeof COUNTRY_MAPPING] ?? defaultCountry
  );
}

export function getLanguageName(
  code: keyof typeof LANGUAGE_MAPPING | string,
): string {
  return (
    LANGUAGE_MAPPING[code as keyof typeof LANGUAGE_MAPPING] ?? defaultLanguage
  );
}

export function getCountryCode(name: string): keyof typeof COUNTRY_MAPPING {
  return COUNTRY_CODE_MAPPING[name.toLowerCase()] ?? defaultCountryCode;
}

export function getLanguageCode(name: string): keyof typeof LANGUAGE_MAPPING {
  return LANGUAGE_CODE_MAPPING[name.toLowerCase()] ?? defaultLanguageCode;
}

export function isLanguageCode(name: string): boolean {
  return name.length === 2;
}

export function isCountryCode(name: string): boolean {
  return name.length === 2;
}

// Get all supported countries and languages as full names
export function getSupportedCountries(): string[] {
  return Object.values(COUNTRY_MAPPING);
}

export function getSupportedLanguages(): string[] {
  return Object.values(LANGUAGE_MAPPING);
}

// Get all supported countries and languages as codes
export function getSupportedCountryCodes(): keyof (typeof COUNTRY_MAPPING)[] {
  return Object.keys(
    COUNTRY_MAPPING,
  ) as unknown as keyof (typeof COUNTRY_MAPPING)[];
}

export function getSupportedLanguageCodes(): keyof (typeof LANGUAGE_MAPPING)[] {
  return Object.keys(
    LANGUAGE_MAPPING,
  ) as unknown as keyof (typeof LANGUAGE_MAPPING)[];
}

export async function getEntrySlugMeta<R>(
  client: Client,
  languageOrCode: string,
  template: string,
  slug?: string,
): Promise<R> {
  const languageCode = getLanguageCode(languageOrCode);
  const entry = await client.entry.getBySlug(slug ?? template, template);

  return getEntryMeta(entry, languageCode);
}

export function getEntryMeta<R, E extends EntryParsed = EntryParsed>(
  e: E,
  languageOrCode: string,
): R {
  const languageCode = getLanguageCode(languageOrCode);
  // biome-ignore lint/suspicious/noExplicitAny: simplify code
  const meta = e.meta[languageCode as keyof typeof e.meta] as any;

  return (
    (meta?.title?.length ?? 0) > 0
      ? meta
      : e.meta[defaultLanguageCodeInBcms as keyof typeof e.meta]
  ) as R;
}
