// Central token export
// Import all token systems and re-export for convenience

export { spacingTokens, generateSpacingCSSVars } from "./spacing";
export {
  typographyTokens,
  typeRoles,
  responsiveTypeRoles,
  bilingualTypographyRules,
  generateTypographyCSSVars,
} from "./typography";

// Generate all CSS custom properties
export function generateAllTokenCSSVars() {
  const { generateSpacingCSSVars } = require("./spacing");
  const { generateTypographyCSSVars } = require("./typography");
  
  return `
    /* Auto-generated token CSS variables */
    :root {
      ${generateSpacingCSSVars()}
      ${generateTypographyCSSVars()}
    }
  `;
}
