import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientRoot = path.resolve(__dirname, "..");
const tokenJsonPath = path.join(clientRoot, "src", "design-tokens.json");
const semanticTsPath = path.join(clientRoot, "src", "styles", "semanticTokens.ts");
const semanticCssPath = path.join(clientRoot, "src", "styles", "semantic-tokens.css");

const raw = fs.readFileSync(tokenJsonPath, "utf8");
const tokenDoc = JSON.parse(raw);

function getPathValue(obj, tokenPath) {
  const segments = tokenPath.split(".");
  let current = obj;
  for (const segment of segments) {
    if (current == null || !(segment in current)) {
      throw new Error(`Unresolved token path: ${tokenPath}`);
    }
    current = current[segment];
  }
  return current;
}

function resolveTokenRefs(value, root, seen = new Set()) {
  if (typeof value === "string") {
    const match = value.match(/^\{(.+)\}$/);
    if (!match) {
      return value;
    }

    const tokenPath = match[1];
    if (seen.has(tokenPath)) {
      throw new Error(`Circular token reference: ${tokenPath}`);
    }

    const nextSeen = new Set(seen);
    nextSeen.add(tokenPath);
    return resolveTokenRefs(getPathValue(root, tokenPath), root, nextSeen);
  }

  if (Array.isArray(value)) {
    return value.map((item) => resolveTokenRefs(item, root, seen));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, resolveTokenRefs(item, root, seen)]),
    );
  }

  return value;
}

function normalizeFontFamily(family) {
  const generic = new Set(["serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui"]);
  return family
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      if (part.startsWith("\"") || part.startsWith("'")) {
        return part;
      }
      if (generic.has(part)) {
        return part;
      }
      if (part.includes(" ")) {
        return `\"${part}\"`;
      }
      return part;
    })
    .join(", ");
}

const resolved = resolveTokenRefs(tokenDoc, tokenDoc);

const spacingTokens = {
  step1: "4px",
  step2: "8px",
  step3: "12px",
  step4: "16px",
  step5: "20px",
  step6: "24px",
  step7: "32px",
  step8: "40px",
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
  "3xl": "64px",
  "4xl": "80px",
};

const typographyTokens = {
  display: "22px",
  displayXs: "30px",
  displaySm: "38px",
  titleLg: "18px",
  title: "16px",
  sectionXs: "20px",
  sectionSm: "22px",
  body: "14px",
  bodySm: "13px",
  label: "12px",
  caption: "11px",
  micro: "10px",
  microSystem: "9px",
  weightRegular: "400",
  weightMedium: "500",
  weightSemibold: "600",
  weightBold: "700",
  lineHeightNone: "1",
  lineHeightTight: "1.2",
  lineHeightSnug: "1.3",
  lineHeightNormal: "1.5",
  lineHeightRelaxed: "1.55",
  lineHeightLoose: "1.6",
  letterSpacingNormal: "0.04em",
  letterSpacingWide: "0.06em",
  letterSpacingWider: "0.12em",
  letterSpacingWidest: "0.18em",
};

const lightColorRuntime = {
  brandPrimary: resolved.semantic.color.brand.primary,
  brandPrimaryHover: resolved.semantic.color.brand.primaryHover,
  brandAccent: resolved.semantic.color.brand.accent,
  textPrimary: resolved.semantic.color.text.primary,
  textBody: resolved.semantic.color.text.body,
  textSecondary: resolved.semantic.color.text.secondary,
  textTertiary: resolved.semantic.color.text.tertiary,
  textMuted: resolved.semantic.color.text.muted,
  textTagline: resolved.semantic.color.text.tagline,
  textInverse: resolved.semantic.color.text.inverse,
  textLink: resolved.semantic.color.text.link,
  textAccent: resolved.semantic.color.text.accent,
  bgCanvas: resolved.semantic.color.bg.canvas,
  bgSurface: resolved.semantic.color.bg.surface,
  bgSubtle: resolved.semantic.color.bg.subtle,
  bgElevated: resolved.semantic.color.bg.elevated,
  bgCurator: resolved.semantic.color.bg.curator,
  borderDefault: resolved.semantic.color.border.default,
  borderSubtle: resolved.semantic.color.border.subtle,
  borderSoft: resolved.semantic.color.border.soft,
  borderStrong: resolved.semantic.color.border.strong,
  tagSurface: resolved.adapters.custom.badge.surface,
  navSelectedBg: resolved.adapters.custom.navItem.selectedBg,
  navSelectedColor: resolved.adapters.custom.navItem.selectedColor,
  success: resolved.semantic.color.state.success,
  successBg: resolved.semantic.color.state.successBg,
  warning: resolved.semantic.color.state.warning,
  warningBg: resolved.semantic.color.state.warningBg,
  error: resolved.semantic.color.state.error,
  errorBg: resolved.semantic.color.state.errorBg,
  info: resolved.semantic.color.state.info,
  infoBg: resolved.semantic.color.state.infoBg,
  special: resolved.semantic.color.state.special,
  specialBg: resolved.semantic.color.state.specialBg,
  chipBg: resolved.adapters.custom.chip.bg,
};

const darkColorRuntime = {
  ...lightColorRuntime,
  textPrimary: resolved.primitives.color["ink-100"],
  textBody: resolved.primitives.color["ink-200"],
  textSecondary: resolved.primitives.color["ink-300"],
  textTertiary: resolved.primitives.color["ink-400"],
  textMuted: resolved.primitives.color["ink-500"],
  textTagline: resolved.primitives.color["ink-500"],
  textLink: resolved.primitives.color["brand-300"],
  textAccent: resolved.primitives.color["brand-300"],
  bgCanvas: resolved.primitives.color["ink-950"],
  bgSurface: resolved.primitives.color["ink-900"],
  bgSubtle: resolved.primitives.color["ink-800"],
  bgElevated: resolved.primitives.color["ink-900"],
  bgCurator: resolved.primitives.color["ink-800"],
  borderDefault: resolved.primitives.color["ink-700"],
  borderSubtle: resolved.primitives.color["ink-800"],
  borderSoft: resolved.primitives.color["ink-700"],
  borderStrong: resolved.primitives.color["ink-600"],
  tagSurface: resolved.primitives.color["ink-800"],
  navSelectedBg: resolved.primitives.color.white,
  navSelectedColor: resolved.primitives.color["ink-950"],
  chipBg: resolved.primitives.color["ink-800"],
};

const semanticRuntime = {
  color: {
    ...lightColorRuntime,
  },
  font: {
    body: normalizeFontFamily(resolved.primitives.fontFamily.body),
    display: normalizeFontFamily(resolved.primitives.fontFamily.display),
    mono: normalizeFontFamily(resolved.primitives.fontFamily.mono),
  },
  shadow: {
    appBar: resolved.adapters.custom.appBar.shadow,
    card: resolved.primitives.shadow["1"],
    cardHover: resolved.primitives.shadow["3"],
    cardSoft: resolved.primitives.shadow["2"],
  },
  dynamicCardPalette: resolved.adapters.custom.dynamicCardPalette,
  modes: {
    light: { color: lightColorRuntime },
    dark: { color: darkColorRuntime },
  },
};

const tsOutput = `/* eslint-disable */
// AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY.
// Source: src/design-tokens.json

export const semanticTokens = ${JSON.stringify(semanticRuntime, null, 2)} as const;
`;

const cssOutput = `/* AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY. */
/* Source: src/design-tokens.json */
:root {
  --color-brand-primary: ${semanticRuntime.color.brandPrimary};
  --color-brand-primary-hover: ${semanticRuntime.color.brandPrimaryHover};
  --color-brand-accent: ${semanticRuntime.color.brandAccent};
  --color-text-primary: ${semanticRuntime.color.textPrimary};
  --color-text-body: ${semanticRuntime.color.textBody};
  --color-text-secondary: ${semanticRuntime.color.textSecondary};
  --color-text-tertiary: ${semanticRuntime.color.textTertiary};
  --color-text-muted: ${semanticRuntime.color.textMuted};
  --color-text-tagline: ${semanticRuntime.color.textTagline};
  --color-text-inverse: ${semanticRuntime.color.textInverse};
  --color-text-link: ${semanticRuntime.color.textLink};
  --color-text-accent: ${semanticRuntime.color.textAccent};
  --color-bg-canvas: ${semanticRuntime.color.bgCanvas};
  --color-bg-surface: ${semanticRuntime.color.bgSurface};
  --color-bg-subtle: ${semanticRuntime.color.bgSubtle};
  --color-bg-elevated: ${semanticRuntime.color.bgElevated};
  --color-bg-curator: ${semanticRuntime.color.bgCurator};
  --color-border-default: ${semanticRuntime.color.borderDefault};
  --color-border-subtle: ${semanticRuntime.color.borderSubtle};
  --color-border-soft: ${semanticRuntime.color.borderSoft};
  --color-border-strong: ${semanticRuntime.color.borderStrong};
  --color-chip-bg: ${semanticRuntime.color.chipBg};
  --color-tag-surface: ${semanticRuntime.color.tagSurface};
  --color-nav-selected-bg: ${semanticRuntime.color.navSelectedBg};
  --color-nav-selected-color: ${semanticRuntime.color.navSelectedColor};
  --color-success: ${semanticRuntime.color.success};
  --color-success-bg: ${semanticRuntime.color.successBg};
  --color-warning: ${semanticRuntime.color.warning};
  --color-warning-bg: ${semanticRuntime.color.warningBg};
  --color-error: ${semanticRuntime.color.error};
  --color-error-bg: ${semanticRuntime.color.errorBg};
  --color-info: ${semanticRuntime.color.info};
  --color-info-bg: ${semanticRuntime.color.infoBg};
  --color-special: ${semanticRuntime.color.special};
  --color-special-bg: ${semanticRuntime.color.specialBg};

  --font-family-body: ${semanticRuntime.font.body};
  --font-family-display: ${semanticRuntime.font.display};
  --font-family-mono: ${semanticRuntime.font.mono};

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
  --space-section-gap: 48px;
  --space-content-gap: 24px;
  --space-element-gap: 16px;
  --space-element-gap-sm: 8px;

  --font-size-display: ${typographyTokens.display};
  --font-size-display-xs: ${typographyTokens.displayXs};
  --font-size-display-sm: ${typographyTokens.displaySm};
  --font-size-title-lg: ${typographyTokens.titleLg};
  --font-size-title: ${typographyTokens.title};
  --font-size-section-xs: ${typographyTokens.sectionXs};
  --font-size-section-sm: ${typographyTokens.sectionSm};
  --font-size-body: ${typographyTokens.body};
  --font-size-body-sm: ${typographyTokens.bodySm};
  --font-size-label: ${typographyTokens.label};
  --font-size-caption: ${typographyTokens.caption};
  --font-size-micro: ${typographyTokens.micro};
  --font-size-micro-system: ${typographyTokens.microSystem};

  --font-weight-regular: ${typographyTokens.weightRegular};
  --font-weight-medium: ${typographyTokens.weightMedium};
  --font-weight-semibold: ${typographyTokens.weightSemibold};
  --font-weight-bold: ${typographyTokens.weightBold};

  --line-height-none: ${typographyTokens.lineHeightNone};
  --line-height-tight: ${typographyTokens.lineHeightTight};
  --line-height-snug: ${typographyTokens.lineHeightSnug};
  --line-height-normal: ${typographyTokens.lineHeightNormal};
  --line-height-relaxed: ${typographyTokens.lineHeightRelaxed};
  --line-height-loose: ${typographyTokens.lineHeightLoose};

  --letter-spacing-normal: ${typographyTokens.letterSpacingNormal};
  --letter-spacing-wide: ${typographyTokens.letterSpacingWide};
  --letter-spacing-wider: ${typographyTokens.letterSpacingWider};
  --letter-spacing-widest: ${typographyTokens.letterSpacingWidest};
}

[data-color-scheme="dark"] {
  --color-text-primary: ${darkColorRuntime.textPrimary};
  --color-text-body: ${darkColorRuntime.textBody};
  --color-text-secondary: ${darkColorRuntime.textSecondary};
  --color-text-tertiary: ${darkColorRuntime.textTertiary};
  --color-text-muted: ${darkColorRuntime.textMuted};
  --color-text-tagline: ${darkColorRuntime.textTagline};
  --color-text-link: ${darkColorRuntime.textLink};
  --color-text-accent: ${darkColorRuntime.textAccent};
  --color-bg-canvas: ${darkColorRuntime.bgCanvas};
  --color-bg-surface: ${darkColorRuntime.bgSurface};
  --color-bg-subtle: ${darkColorRuntime.bgSubtle};
  --color-bg-elevated: ${darkColorRuntime.bgElevated};
  --color-bg-curator: ${darkColorRuntime.bgCurator};
  --color-border-default: ${darkColorRuntime.borderDefault};
  --color-border-subtle: ${darkColorRuntime.borderSubtle};
  --color-border-soft: ${darkColorRuntime.borderSoft};
  --color-border-strong: ${darkColorRuntime.borderStrong};
  --color-chip-bg: ${darkColorRuntime.chipBg};
  --color-tag-surface: ${darkColorRuntime.tagSurface};
  --color-nav-selected-bg: ${darkColorRuntime.navSelectedBg};
  --color-nav-selected-color: ${darkColorRuntime.navSelectedColor};
}
`;

fs.writeFileSync(semanticTsPath, tsOutput, "utf8");
fs.writeFileSync(semanticCssPath, cssOutput, "utf8");

console.log("Generated semanticTokens.ts and semantic-tokens.css from design-tokens.json");
