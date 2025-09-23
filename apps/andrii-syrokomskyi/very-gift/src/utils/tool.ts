import { getCountryName, getLanguageName } from "./localization";

export function isHomePage(
  path?: string,
  countryOrCode?: string,
  languageOrCode?: string,
) {
  const country = getCountryName(countryOrCode);
  const language = getLanguageName(languageOrCode);
  const p = `/${country}/${language}`.toLowerCase();

  return path === p || path === `${p}/`;
}
