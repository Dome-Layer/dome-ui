import { useSyncExternalStore } from "react";
import { DEFAULT_LOCALE, getLocale, onLocaleChange, type Catalogue, type Locale } from "./locale";

/**
 * The current language, re-rendering on setLocale. English while rendering on the server and during
 * hydration (a static export is prerendered in English), so the first client render matches the HTML.
 */
export function useLocale(): Locale {
  return useSyncExternalStore(onLocaleChange, getLocale, () => DEFAULT_LOCALE);
}

/** The current language's entry of a catalogue. */
export function useMessages<T>(catalogue: Catalogue<T>): T {
  return catalogue[useLocale()];
}
