// Spacing token system
// Use these tokens for consistent spacing across the app

export const spacingTokens = {
  // Primitive scale
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
  "3xl": "64px",
  "4xl": "80px",
  
  // Semantic spacing roles
  cardPadding: { xs: "16px", sm: "24px" },
  cardPaddingCompact: { xs: "12px", sm: "16px" },
  sectionGap: "48px",
  contentGap: "24px",
  elementGap: "16px",
  elementGapSm: "8px",
} as const;

// CSS custom property generator
export function generateSpacingCSSVars() {
  return `
    --space-xs: ${spacingTokens.xs};
    --space-sm: ${spacingTokens.sm};
    --space-md: ${spacingTokens.md};
    --space-lg: ${spacingTokens.lg};
    --space-xl: ${spacingTokens.xl};
    --space-2xl: ${spacingTokens["2xl"]};
    --space-3xl: ${spacingTokens["3xl"]};
    --space-4xl: ${spacingTokens["4xl"]};
    
    --space-section-gap: ${spacingTokens.sectionGap};
    --space-content-gap: ${spacingTokens.contentGap};
    --space-element-gap: ${spacingTokens.elementGap};
    --space-element-gap-sm: ${spacingTokens.elementGapSm};
  `;
}
