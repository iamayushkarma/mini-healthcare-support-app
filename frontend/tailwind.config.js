export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },

      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          light: "var(--color-primary-light)",
          lighter: "var(--color-primary-lighter)",
          dark: "var(--color-primary-dark)",
          darker: "var(--color-primary-darker)",
        },

        secondary: "var(--color-secondary)",

        accent: {
          DEFAULT: "var(--color-accent)",
          alt: "var(--color-accent-alt)",
        },

        background: "var(--color-background)",

        surface: {
          DEFAULT: "var(--color-surface)",
          light: "var(--color-surface-light)",
        },

        border: "var(--color-border)",
        divider: "var(--color-divider)",

        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          tertiary: "var(--color-text-tertiary)",
          disabled: "var(--color-text-disabled)",
          onPrimary: "var(--color-text-on-primary)",
        },

        success: "var(--color-success)",
        warning: "var(--color-warning)",
        error: "var(--color-error)",
        info: "var(--color-info)",

        hover: "var(--color-hover)",
        active: "var(--color-active)",
        focus: "var(--color-focus)",
        disabled: "var(--color-disabled)",
      },

      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },
    },
  },
};
