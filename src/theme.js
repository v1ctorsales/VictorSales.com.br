// src/theme.js
import { createSystem, defaultConfig } from "@chakra-ui/react"

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        "dracula.bg":        { value: "#282A36" }, // page background
        "dracula.panel":     { value: "#1f2230" }, // darker than bg -> cards
        "dracula.selection": { value: "#44475A" }, // line/hover
        "dracula.line":      { value: "#6272A4" }, // muted text / borders
        "dracula.cyan":      { value: "#8BE9FD" }, // accents/links
        "dracula.fg":        { value: "#F8F8F2" }, // main text
        "dracula.pink":      { value: "#FF79C6"}
      },
      radii: { xl: { value: "14px" }, "2xl": { value: "20px" } },
      sizes: { container: { value: "1100px" } }
    },
  },
})
