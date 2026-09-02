import { semanticTokens } from "./semanticTokens";

const { color: primitiveColor } = semanticTokens.primitives;

export const brandScale = {
  50: primitiveColor["brand-50"],
  100: primitiveColor["brand-100"],
  200: primitiveColor["brand-200"],
  300: primitiveColor["brand-300"],
  400: primitiveColor["brand-400"],
  500: primitiveColor["brand-500"],
  600: primitiveColor["brand-600"],
  700: primitiveColor["brand-700"],
  800: primitiveColor["brand-800"],
  900: primitiveColor["brand-900"],
} as const;

export const inkScale = {
  950: primitiveColor["ink-950"],
  900: primitiveColor["ink-900"],
  800: primitiveColor["ink-800"],
  700: primitiveColor["ink-700"],
  600: primitiveColor["ink-600"],
  500: primitiveColor["ink-500"],
  400: primitiveColor["ink-400"],
  300: primitiveColor["ink-300"],
  200: primitiveColor["ink-200"],
  100: primitiveColor["ink-100"],
} as const;

export const paperScale = {
  0: primitiveColor["paper-0"],
  50: primitiveColor["paper-50"],
  100: primitiveColor["paper-100"],
  150: primitiveColor["paper-150"],
  200: primitiveColor["paper-200"],
  300: primitiveColor["paper-300"],
  400: primitiveColor["paper-400"],
  500: primitiveColor["paper-500"],
  600: primitiveColor["paper-600"],
  700: primitiveColor["paper-700"],
  800: primitiveColor["paper-800"],
} as const;

export const statusTokens = {
  go: { bg: primitiveColor["status-go-bg"], fg: primitiveColor["status-go-fg"] },
  go2: { bg: primitiveColor["status-go2-bg"], fg: primitiveColor["status-go2-fg"] },
  act: { bg: primitiveColor["status-act-bg"], fg: primitiveColor["status-act-fg"], bd: primitiveColor["status-act-bd"] },
  wait: { bg: primitiveColor["status-wait-bg"], fg: primitiveColor["status-wait-fg"] },
  wait2: { bg: primitiveColor["status-wait2-bg"], fg: primitiveColor["status-wait2-fg"] },
  stop: { bg: primitiveColor["status-stop-bg"], fg: primitiveColor["status-stop-fg"] },
  spec: { bg: primitiveColor["status-spec-bg"], fg: primitiveColor["status-spec-fg"] },
  spec2: { bg: primitiveColor["status-spec2-bg"], fg: primitiveColor["status-spec2-fg"] },
  gift: { bg: primitiveColor["status-gift-bg"], fg: primitiveColor["status-gift-fg"] },
  hot: { bg: primitiveColor["status-hot-bg"], fg: primitiveColor["status-hot-fg"] },
  neu: { bg: primitiveColor["status-neu-bg"], fg: primitiveColor["status-neu-fg"] },
} as const;

export const semanticColorTokens = [
  { name: "--color-bg-canvas", value: semanticTokens.color.bgCanvas, use: "app background" },
  { name: "--color-bg-surface", value: semanticTokens.color.bgSurface, use: "card and header surface" },
  { name: "--color-bg-curator", value: semanticTokens.color.bgCurator, use: "curator wrap band" },
  { name: "--color-nav-selected-bg", value: semanticTokens.color.navSelectedBg, use: "active nav background" },
  { name: "--color-brand-primary", value: semanticTokens.color.brandPrimary, use: "primary actions" },
  { name: "--color-text-primary", value: semanticTokens.color.textPrimary, use: "headings and book titles" },
  { name: "--color-text-body", value: semanticTokens.color.textBody, use: "body text" },
  { name: "--color-text-secondary", value: semanticTokens.color.textSecondary, use: "secondary text" },
  { name: "--color-text-muted", value: semanticTokens.color.textMuted, use: "taglines and placeholders" },
  { name: "--color-text-link", value: semanticTokens.color.textLink, use: "interactive text" },
  { name: "--color-border-subtle", value: semanticTokens.color.borderSubtle, use: "hairlines" },
  { name: "--color-border-default", value: semanticTokens.color.borderDefault, use: "borders and dividers" },
] as const;

export const governingPrinciples = [
  { name: "Go", color: statusTokens.go.fg, bg: statusTokens.go.bg, rule: "Available / positive terminal" },
  { name: "Act", color: statusTokens.act.fg, bg: statusTokens.act.bg, rule: "Action required" },
  { name: "Wait", color: statusTokens.wait.fg, bg: statusTokens.wait.bg, rule: "Pending / amber" },
  { name: "Stop", color: statusTokens.stop.fg, bg: statusTokens.stop.bg, rule: "Blocked / red" },
  { name: "Spec", color: statusTokens.spec.fg, bg: statusTokens.spec.bg, rule: "Exchange / teal" },
  { name: "Gift", color: statusTokens.gift.fg, bg: statusTokens.gift.bg, rule: "Free / purple" },
] as const;
