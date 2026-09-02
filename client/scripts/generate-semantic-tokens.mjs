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

const requiredTokenPaths = [
  "primitives.fontFamily.body",
  "primitives.fontFamily.display",
  "primitives.fontFamily.mono",
  "primitives.color",
  "primitives.shadow.1",
  "primitives.shadow.2",
  "primitives.shadow.3",
  "semantic.typography.body",
  "semantic.typography.caption",
  "semantic.elevation.card",
  "semantic.color.brand.primary",
  "semantic.color.brand.primaryHover",
  "semantic.color.brand.accent",
  "semantic.color.text.primary",
  "semantic.color.text.body",
  "semantic.color.text.secondary",
  "semantic.color.text.tertiary",
  "semantic.color.text.muted",
  "semantic.color.text.tagline",
  "semantic.color.text.inverse",
  "semantic.color.text.link",
  "semantic.color.text.accent",
  "semantic.color.bg.canvas",
  "semantic.color.bg.surface",
  "semantic.color.bg.subtle",
  "semantic.color.bg.elevated",
  "semantic.color.bg.curator",
  "semantic.color.border.default",
  "semantic.color.border.subtle",
  "semantic.color.border.soft",
  "semantic.color.border.strong",
  "semantic.color.state.success",
  "semantic.color.state.successBg",
  "semantic.color.state.warning",
  "semantic.color.state.warningBg",
  "semantic.color.state.error",
  "semantic.color.state.errorBg",
  "semantic.color.state.info",
  "semantic.color.state.infoBg",
  "semantic.color.state.special",
  "semantic.color.state.specialBg",
  "adapters.custom.appBar.shadow",
  "adapters.custom.badge.surface",
  "adapters.custom.chip.bg",
  "adapters.custom.navItem.selectedBg",
  "adapters.custom.navItem.selectedColor",
  "adapters.custom.dynamicCardPalette",
];

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

for (const tokenPath of requiredTokenPaths) {
  getPathValue(tokenDoc, tokenPath);
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

function toCssLength(value) {
  return typeof value === "number" ? `${value}px` : value;
}

const spacingTokens = {
  xs: toCssLength(resolved.semantic.space.xs),
  sm: toCssLength(resolved.semantic.space.sm),
  md: toCssLength(resolved.semantic.space.md),
  lg: toCssLength(resolved.semantic.space.lg),
  xl: toCssLength(resolved.semantic.space.xl),
  "2xl": toCssLength(resolved.semantic.space["2xl"]),
  "3xl": toCssLength(resolved.semantic.space["3xl"]),
  "4xl": toCssLength(resolved.semantic.space["4xl"]),
  sectionGap: toCssLength(resolved.semantic.space.sectionGap),
  contentGap: toCssLength(resolved.semantic.space.contentGap),
  elementGap: toCssLength(resolved.semantic.space.elementGap),
  elementGapSm: toCssLength(resolved.semantic.space.elementGapSm),
};

const typographyTokens = {
  display: toCssLength(resolved.semantic.typography.display.size),
  titleLg: toCssLength(resolved.semantic.typography.titleLg.size),
  title: toCssLength(resolved.semantic.typography.title.size),
  body: toCssLength(resolved.semantic.typography.body.size),
  bodySm: toCssLength(resolved.semantic.typography.bodySm.size),
  label: toCssLength(resolved.semantic.typography.label.size),
  caption: toCssLength(resolved.semantic.typography.caption.size),
  micro: toCssLength(resolved.semantic.typography.micro.size),
  microSystem: toCssLength(resolved.semantic.typography.microSystem.size),
  weightRegular: resolved.primitives.fontWeight.regular,
  weightMedium: resolved.primitives.fontWeight.medium,
  weightSemibold: resolved.primitives.fontWeight.semibold,
  weightBold: resolved.primitives.fontWeight.bold,
  lineHeightNone: resolved.primitives.lineHeight.none,
  lineHeightTight: resolved.primitives.lineHeight.tight,
  lineHeightSnug: resolved.primitives.lineHeight.snug,
  lineHeightNormal: resolved.primitives.lineHeight.normal,
  lineHeightRelaxed: resolved.primitives.lineHeight.relaxed,
  letterSpacingNormal: "0.04em",
  letterSpacingWide: "0.06em",
  letterSpacingWider: "0.12em",
  letterSpacingWidest: "0.18em",
};

const typographyRuntime = Object.fromEntries(
  Object.entries(resolved.semantic.typography).map(([name, role]) => [
    name,
    {
      fontFamily: normalizeFontFamily(role.family),
      fontSize: toCssLength(role.size),
      fontWeight: role.weight,
      lineHeight: role.lineHeight,
    },
  ]),
);

const semanticRuntime = {
  color: {
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
    gift: resolved.semantic.color.state.gift,
    giftBg: resolved.semantic.color.state.giftBg,
    chipBg: resolved.adapters.custom.chip.bg,
  },
  font: {
    body: normalizeFontFamily(resolved.primitives.fontFamily.body),
    display: normalizeFontFamily(resolved.primitives.fontFamily.display),
    mono: normalizeFontFamily(resolved.primitives.fontFamily.mono),
  },
  primitives: {
    color: resolved.primitives.color,
  },
  typography: typographyRuntime,
  radius: {
    control: toCssLength(resolved.semantic.radius.control),
    card: toCssLength(resolved.semantic.radius.card),
    badge: toCssLength(resolved.semantic.radius.badge),
    pill: toCssLength(resolved.semantic.radius.pill),
  },
  shadow: {
    appBar: resolved.adapters.custom.appBar.shadow,
    card: resolved.semantic.elevation.card,
    cardHover: resolved.primitives.shadow["3"],
    cardSoft: resolved.primitives.shadow["2"],
  },
  dynamicCardPalette: resolved.adapters.custom.dynamicCardPalette,
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
  --color-gift: ${semanticRuntime.color.gift};
  --color-gift-bg: ${semanticRuntime.color.giftBg};

  --font-family-body: ${semanticRuntime.font.body};
  --font-family-display: ${semanticRuntime.font.display};
  --font-family-mono: ${semanticRuntime.font.mono};

  --radius-control: ${semanticRuntime.radius.control};
  --radius-card: ${semanticRuntime.radius.card};
  --radius-badge: ${semanticRuntime.radius.badge};
  --radius-pill: ${semanticRuntime.radius.pill};

  --space-1: ${toCssLength(resolved.primitives.space["1"])};
  --space-2: ${toCssLength(resolved.primitives.space["2"])};
  --space-3: ${toCssLength(resolved.primitives.space["3"])};
  --space-4: ${toCssLength(resolved.primitives.space["4"])};
  --space-5: ${toCssLength(resolved.primitives.space["5"])};
  --space-6: ${toCssLength(resolved.primitives.space["6"])};
  --space-7: ${toCssLength(resolved.primitives.space["7"])};
  --space-8: ${toCssLength(resolved.primitives.space["8"])};

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

  --font-size-display: ${typographyTokens.display};
  --font-size-title-lg: ${typographyTokens.titleLg};
  --font-size-title: ${typographyTokens.title};
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

  --letter-spacing-normal: ${typographyTokens.letterSpacingNormal};
  --letter-spacing-wide: ${typographyTokens.letterSpacingWide};
  --letter-spacing-wider: ${typographyTokens.letterSpacingWider};
  --letter-spacing-widest: ${typographyTokens.letterSpacingWidest};
}
`;

const outputs = [
  [semanticTsPath, tsOutput],
  [semanticCssPath, cssOutput],
];

if (process.argv.includes("--check")) {
  const outOfDateFiles = outputs
    .filter(([outputPath, output]) => fs.readFileSync(outputPath, "utf8") !== output)
    .map(([outputPath]) => path.relative(clientRoot, outputPath));

  if (outOfDateFiles.length > 0) {
    throw new Error(`Generated token files are out of date: ${outOfDateFiles.join(", ")}`);
  }

  console.log("Generated token files are up to date");
} else {
  for (const [outputPath, output] of outputs) {
    fs.writeFileSync(outputPath, output, "utf8");
  }

  console.log("Generated semanticTokens.ts and semantic-tokens.css from design-tokens.json");
}
