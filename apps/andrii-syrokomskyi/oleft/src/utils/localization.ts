import type { Client } from "@thebcms/client";
import type { EntryParsed } from "@thebcms/types";

export const DEFAULT_COUNTRY_CODE: keyof typeof COUNTRY_MAPPING = "de";
export const DEFAULT_LANGUAGE_CODE: keyof typeof LANGUAGE_MAPPING = "de";

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

// Reverse mappings for converting full names back to codes
export const COUNTRY_CODE_MAPPING = Object.fromEntries(
  Object.entries(COUNTRY_MAPPING).map(([code, name]) => [name, code]),
) as Record<string, keyof typeof COUNTRY_MAPPING>;

export const LANGUAGE_CODE_MAPPING = Object.fromEntries(
  Object.entries(LANGUAGE_MAPPING).map(([code, name]) => [name, code]),
) as Record<string, keyof typeof LANGUAGE_MAPPING>;

// Helper functions
export function getCountryName(code: string): string {
  return COUNTRY_MAPPING[code as keyof typeof COUNTRY_MAPPING] ?? code;
}

export function getLanguageName(code: string): string {
  return LANGUAGE_MAPPING[code as keyof typeof LANGUAGE_MAPPING] ?? code;
}

export function getCountryCode(name: string): string {
  return COUNTRY_CODE_MAPPING[name] ?? name;
}

export function getLanguageCode(name: string): string {
  return LANGUAGE_CODE_MAPPING[name] ?? name;
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
export function getSupportedCountryCodes(): string[] {
  return Object.keys(COUNTRY_MAPPING);
}

export function getSupportedLanguageCodes(): string[] {
  return Object.keys(LANGUAGE_MAPPING);
}

export async function getEntrySlugMeta<R>(
  client: Client,
  languageCode: string,
  template: string,
  slug?: string,
): Promise<R> {
  const entry = await client.entry.getBySlug(slug ?? template, template);
  return getEntryMeta(entry, languageCode);
}

export function getEntryMeta<R, E extends EntryParsed = EntryParsed>(
  e: E,
  languageOrCode: string,
): R {
  const languageCode = isLanguageCode(languageOrCode)
    ? languageOrCode
    : getLanguageCode(languageOrCode);
  // biome-ignore lint/suspicious/noExplicitAny: simplify code
  const meta = e.meta[languageCode as keyof typeof e.meta] as any;

  return (
    (meta?.title?.length ?? 0) > 0 ? meta : e.meta["en" as keyof typeof e.meta]
  ) as R;
}
