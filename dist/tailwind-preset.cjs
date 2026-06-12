"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/tailwind-preset.ts
var tailwind_preset_exports = {};
__export(tailwind_preset_exports, {
  default: () => tailwind_preset_default
});
module.exports = __toCommonJS(tailwind_preset_exports);
var domePreset = {
  theme: {
    extend: {
      colors: {
        "dome-bg": "var(--color-bg-base)",
        "dome-surface": "var(--color-bg-subtle)",
        "dome-elevated": "var(--color-bg-muted)",
        "dome-bg-accent": "var(--color-bg-accent)",
        "dome-bg-accent-hover": "var(--color-bg-accent-hover)",
        "dome-bg-inverse": "var(--color-bg-inverse)",
        "dome-text": "var(--color-text-primary)",
        "dome-muted": "var(--color-text-secondary)",
        "dome-tertiary": "var(--color-text-tertiary)",
        "dome-text-accent": "var(--color-text-accent)",
        "dome-text-on-accent": "var(--color-text-on-accent)",
        "dome-text-on-inverse": "var(--color-text-on-inverse)",
        "dome-border-subtle": "var(--color-border-subtle)",
        "dome-border": "var(--color-border-default)",
        "dome-border-strong": "var(--color-border-strong)",
        "dome-border-accent": "var(--color-border-accent)",
        "dome-accent": "var(--color-accent)",
        "dome-accent-hover": "var(--color-accent-hover)",
        "dome-accent-active": "var(--color-accent-active)",
        "dome-accent-subtle": "var(--color-accent-subtle)",
        "dome-success": "var(--color-success)",
        "dome-success-subtle": "var(--color-success-subtle)",
        "dome-success-border": "var(--color-success-border)",
        "dome-warning": "var(--color-warning)",
        "dome-warning-subtle": "var(--color-warning-subtle)",
        "dome-warning-border": "var(--color-warning-border)",
        "dome-error": "var(--color-error)",
        "dome-error-subtle": "var(--color-error-subtle)",
        "dome-error-border": "var(--color-error-border)"
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace"
        ]
      },
      borderRadius: {
        dome: "var(--radius-md)",
        "dome-sm": "var(--radius-sm)",
        "dome-lg": "var(--radius-lg)",
        "dome-xl": "var(--radius-xl)"
      },
      boxShadow: {
        "dome-sm": "var(--shadow-sm)",
        "dome-md": "var(--shadow-md)",
        "dome-lg": "var(--shadow-lg)"
      }
    }
  }
};
var tailwind_preset_default = domePreset;
