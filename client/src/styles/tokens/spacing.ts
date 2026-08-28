// Spacing token system.
// The v2 design system uses an 8-step, 4px-based layout scale.
// Keep all layout spacing on this scale; sub-4px values are component anatomy only.

export const spacingTokens = {
  // Primitive v2 scale (4px base, 8 steps)
  step1: "4px",
  step2: "8px",
  step3: "12px",
  step4: "16px",
  step5: "20px",
  step6: "24px",
  step7: "32px",
  step8: "40px",

  // Backward-compatible aliases used in existing components
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
    --space-1: ${spacingTokens.step1};
    --space-2: ${spacingTokens.step2};
    --space-3: ${spacingTokens.step3};
    --space-4: ${spacingTokens.step4};
    --space-5: ${spacingTokens.step5};
    --space-6: ${spacingTokens.step6};
    --space-7: ${spacingTokens.step7};
    --space-8: ${spacingTokens.step8};

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
