declare const domePreset: {
    theme: {
        extend: {
            colors: {
                "dome-bg": string;
                "dome-surface": string;
                "dome-elevated": string;
                "dome-bg-accent": string;
                "dome-bg-accent-hover": string;
                "dome-bg-inverse": string;
                "dome-text": string;
                "dome-muted": string;
                "dome-tertiary": string;
                "dome-text-accent": string;
                "dome-text-on-accent": string;
                "dome-text-on-inverse": string;
                "dome-border-subtle": string;
                "dome-border": string;
                "dome-border-strong": string;
                "dome-border-accent": string;
                "dome-accent": string;
                "dome-accent-hover": string;
                "dome-accent-active": string;
                "dome-accent-subtle": string;
                "dome-success": string;
                "dome-success-subtle": string;
                "dome-success-border": string;
                "dome-warning": string;
                "dome-warning-subtle": string;
                "dome-warning-border": string;
                "dome-error": string;
                "dome-error-subtle": string;
                "dome-error-border": string;
            };
            fontFamily: {
                sans: string[];
                mono: string[];
            };
            borderRadius: {
                dome: string;
                "dome-sm": string;
                "dome-lg": string;
                "dome-xl": string;
            };
            boxShadow: {
                "dome-sm": string;
                "dome-md": string;
                "dome-lg": string;
            };
        };
    };
};

export { domePreset as default };
