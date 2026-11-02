import { useEffect, useId, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { LOCALES, LOCALE_NAMES, setLocale, type Locale } from "../locale";
import { useLocale } from "../useLocale";
import { UI_MESSAGES } from "../messages";
import { clsx } from "../clsx";

interface LanguageMenuProps {
  /** "bar": the button in the desktop tool bar with a menu below it. "panel": the list inside the phone menu. */
  variant?: "bar" | "panel";
  /** Called after a language is chosen (the phone menu closes itself with it). */
  onChoose?: () => void;
}

/**
 * The tools' language switch (row 6 canvas, signed off 2026-11-02). Every language is named in
 * itself and carries its own `lang`; the current one is marked with a tick and `aria-current`.
 * A choice is remembered for the site and every tool (`setLocale`), which the note under the list says.
 */
export function LanguageMenu({ variant = "bar", onChoose }: LanguageMenuProps) {
  const locale = useLocale();
  const t = UI_MESSAGES[locale];
  const [open, setOpen] = useState(false);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const choose = (next: Locale) => {
    if (next !== locale) setLocale(next);
    setOpen(false);
    onChoose?.();
  };

  const options = (
    <ul className="dome-lang-list" role="list">
      {LOCALES.map((code) => {
        const current = code === locale;
        return (
          <li key={code}>
            <button
              type="button"
              lang={code}
              className={clsx("dome-lang-option", current && "is-current")}
              aria-current={current ? "true" : undefined}
              onClick={() => choose(code)}
            >
              <span>{LOCALE_NAMES[code]}</span>
              {current ? <Check size={16} strokeWidth={2} aria-hidden="true" /> : null}
            </button>
          </li>
        );
      })}
    </ul>
  );

  if (variant === "panel") {
    return (
      <div className="dome-lang-panel" role="group" aria-labelledby={`${listId}-title`}>
        <p id={`${listId}-title`} className="dome-lang-title">
          {t.language}
        </p>
        {options}
        <p className="dome-lang-note">{t.languageNote}</p>
      </div>
    );
  }

  return (
    <div className="dome-lang">
      <button
        type="button"
        className="dome-lang-btn"
        aria-label={t.languageButton(LOCALE_NAMES[locale])}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => setOpen((v) => !v)}
      >
        {locale.toUpperCase()}
        <ChevronDown size={14} strokeWidth={2} aria-hidden="true" />
      </button>
      {open ? (
        <>
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            className="dome-menu-backdrop"
            onClick={() => setOpen(false)}
          />
          <div id={listId} className="dome-menu dome-lang-menu">
            <p className="dome-lang-title">{t.language}</p>
            {options}
            <p className="dome-lang-note">{t.languageNote}</p>
          </div>
        </>
      ) : null}
    </div>
  );
}
