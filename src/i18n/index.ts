import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/domain/types";
import { esDictionary, type Dictionary } from "./dictionaries/es";
import { caDictionary } from "./dictionaries/ca";
import { enDictionary } from "./dictionaries/en";
import { ptDictionary } from "./dictionaries/pt";

const dictionaries: Record<Locale, Dictionary> = {
  es: esDictionary,
  ca: caDictionary,
  en: enDictionary,
  pt: ptDictionary,
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

export type { Dictionary };
export { DEFAULT_LOCALE };
