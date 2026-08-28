// Typography token system
// Use these tokens for consistent typography across the app

export const typographyTokens = {
  // Font families
  fontFamily: {
    display: '"Noto Serif TC", serif',
    body: '"IBM Plex Sans", "Noto Serif TC", "PingFang HK", "PingFang TC", "Microsoft JhengHei", sans-serif',
    mono: '"IBM Plex Mono", Menlo, Monaco, Consolas, monospace',
  },
  
  // Font size scale (primitives)
  fontSize: {
    display: "22px",
    titleLg: "18px",
    title: "16px",
    body: "14px",
    bodySm: "13px",
    label: "12px",
    caption: "11px",
    micro: "10px",
    microSystem: "9px",
  },
  
  // Font weights
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  // Line heights
  lineHeight: {
    none: 1,
    tight: 1.2,
    snug: 1.3,
    normal: 1.5,
    relaxed: 1.55,
    loose: 1.6,
  },
  
  // Letter spacing
  letterSpacing: {
    none: "0",
    normal: "0.04em",
    wide: "0.06em",
    wider: "0.12em",
    widest: "0.18em",
  },
} as const;

// Semantic type roles
export const typeRoles = {
  pageHeading: {
    fontFamily: typographyTokens.fontFamily.display,
    fontSize: typographyTokens.fontSize.display,
    fontWeight: typographyTokens.fontWeight.bold,
    lineHeight: typographyTokens.lineHeight.snug,
  },
  sectionHeading: {
    fontFamily: typographyTokens.fontFamily.display,
    fontSize: typographyTokens.fontSize.title,
    fontWeight: typographyTokens.fontWeight.bold,
    lineHeight: typographyTokens.lineHeight.tight,
  },
  cardTitle: {
    fontFamily: typographyTokens.fontFamily.display,
    fontSize: typographyTokens.fontSize.bodySm,
    fontWeight: typographyTokens.fontWeight.bold,
    lineHeight: typographyTokens.lineHeight.snug,
  },
  body: {
    fontFamily: typographyTokens.fontFamily.body,
    fontSize: typographyTokens.fontSize.body,
    fontWeight: typographyTokens.fontWeight.regular,
    lineHeight: typographyTokens.lineHeight.relaxed,
  },
  label: {
    fontFamily: typographyTokens.fontFamily.body,
    fontSize: typographyTokens.fontSize.label,
    fontWeight: typographyTokens.fontWeight.medium,
    lineHeight: typographyTokens.lineHeight.normal,
  },
  caption: {
    fontFamily: typographyTokens.fontFamily.body,
    fontSize: typographyTokens.fontSize.caption,
    fontWeight: typographyTokens.fontWeight.medium,
    lineHeight: typographyTokens.lineHeight.normal,
  },
} as const;

// Responsive roles follow v2 behaviour: only larger title roles scale.
export const responsiveTypeRoles = {
  pageHeading: { xs: "30px", sm: "38px" },
  sectionHeading: { xs: "20px", sm: "22px" },
  body: { xs: typographyTokens.fontSize.body, sm: typographyTokens.fontSize.body },
  label: { xs: typographyTokens.fontSize.label, sm: typographyTokens.fontSize.label },
  caption: { xs: typographyTokens.fontSize.caption, sm: typographyTokens.fontSize.caption },
} as const;

// Guardrails for mixed-script content in design-system documentation and component copy.
export const bilingualTypographyRules = {
  cjkMinimumReadablePx: 12,
  latinDecorativeMinimumPx: 9,
  mixedHeadingLatinWeight: 600,
  mixedHeadingCjkWeight: 700,
} as const;

// CSS custom property generator
export function generateTypographyCSSVars() {
  return `
    --font-family-display: ${typographyTokens.fontFamily.display};
    --font-family-body: ${typographyTokens.fontFamily.body};
    --font-family-mono: ${typographyTokens.fontFamily.mono};
    
    --font-size-display: ${typographyTokens.fontSize.display};
    --font-size-title-lg: ${typographyTokens.fontSize.titleLg};
    --font-size-title: ${typographyTokens.fontSize.title};
    --font-size-body: ${typographyTokens.fontSize.body};
    --font-size-body-sm: ${typographyTokens.fontSize.bodySm};
    --font-size-label: ${typographyTokens.fontSize.label};
    --font-size-caption: ${typographyTokens.fontSize.caption};
    --font-size-micro: ${typographyTokens.fontSize.micro};
    --font-size-micro-system: ${typographyTokens.fontSize.microSystem};

    --font-size-display-xs: ${responsiveTypeRoles.pageHeading.xs};
    --font-size-display-sm: ${responsiveTypeRoles.pageHeading.sm};
    --font-size-section-xs: ${responsiveTypeRoles.sectionHeading.xs};
    --font-size-section-sm: ${responsiveTypeRoles.sectionHeading.sm};
    
    --font-weight-regular: ${typographyTokens.fontWeight.regular};
    --font-weight-medium: ${typographyTokens.fontWeight.medium};
    --font-weight-semibold: ${typographyTokens.fontWeight.semibold};
    --font-weight-bold: ${typographyTokens.fontWeight.bold};
    
    --line-height-none: ${typographyTokens.lineHeight.none};
    --line-height-tight: ${typographyTokens.lineHeight.tight};
    --line-height-snug: ${typographyTokens.lineHeight.snug};
    --line-height-normal: ${typographyTokens.lineHeight.normal};
    --line-height-relaxed: ${typographyTokens.lineHeight.relaxed};
    --line-height-loose: ${typographyTokens.lineHeight.loose};
    
    --letter-spacing-normal: ${typographyTokens.letterSpacing.normal};
    --letter-spacing-wide: ${typographyTokens.letterSpacing.wide};
    --letter-spacing-wider: ${typographyTokens.letterSpacing.wider};
    --letter-spacing-widest: ${typographyTokens.letterSpacing.widest};

    --font-rule-cjk-min-readable-px: ${bilingualTypographyRules.cjkMinimumReadablePx}px;
    --font-rule-latin-min-decorative-px: ${bilingualTypographyRules.latinDecorativeMinimumPx}px;
  `;
}
