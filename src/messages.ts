import type { Catalogue } from "./locale";

/**
 * The shared parts' own words: the tool bar, its menus and the theme switch. Worded as on
 * domelayer.com (its `nav` catalogue), so the site, the hub and the tools say the same thing.
 * English is the source type.
 */
const en = {
  home: "Home",
  hub: "All tools",
  signIn: "Sign in",
  signOut: "Sign out",
  account: "Account",
  accountOf: (email: string) => `Account: ${email}`,
  openMenu: "Open menu",
  closeMenu: "Close menu",
  switchToLight: "Switch to light mode",
  switchToDark: "Switch to dark mode",
  language: "Language",
  languageButton: (name: string) => `Language: ${name}`,
  languageNote: "Applies to every DOME tool and to domelayer.com.",
};

export type UiMessages = typeof en;

export const UI_MESSAGES: Catalogue<UiMessages> = {
  en,
  it: {
    home: "Home",
    hub: "Tutti gli strumenti",
    signIn: "Accedi",
    signOut: "Esci",
    account: "Account",
    accountOf: (email: string) => `Account: ${email}`,
    openMenu: "Apri il menu",
    closeMenu: "Chiudi il menu",
    switchToLight: "Passa al tema chiaro",
    switchToDark: "Passa al tema scuro",
    language: "Lingua",
    languageButton: (name: string) => `Lingua: ${name}`,
    languageNote: "Vale per tutti gli strumenti DOME e per domelayer.com.",
  },
  nl: {
    home: "Start",
    hub: "Alle tools",
    signIn: "Inloggen",
    signOut: "Uitloggen",
    account: "Account",
    accountOf: (email: string) => `Account: ${email}`,
    openMenu: "Menu openen",
    closeMenu: "Menu sluiten",
    switchToLight: "Overschakelen naar licht thema",
    switchToDark: "Overschakelen naar donker thema",
    language: "Taal",
    languageButton: (name: string) => `Taal: ${name}`,
    languageNote: "Geldt voor alle DOME-tools en voor domelayer.com.",
  },
  de: {
    home: "Start",
    hub: "Alle Tools",
    signIn: "Anmelden",
    signOut: "Abmelden",
    account: "Konto",
    accountOf: (email: string) => `Konto: ${email}`,
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    switchToLight: "Helles Design aktivieren",
    switchToDark: "Dunkles Design aktivieren",
    language: "Sprache",
    languageButton: (name: string) => `Sprache: ${name}`,
    languageNote: "Gilt für alle DOME-Tools und für domelayer.com.",
  },
};
