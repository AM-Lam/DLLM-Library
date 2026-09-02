import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import DesignSystemSection from "./DesignSystemSection";
import DesignSystemSubSection from "./DesignSystemSubSection";
import DesignSystemNote from "./DesignSystemNote";

const familyRows = [
  ["--font-family-display", "Noto Serif TC", "Noto Serif TC, Playfair Display, serif"],
  ["--font-family-body", "IBM Plex Sans", "IBM Plex Sans, Noto Serif TC, PingFang HK, PingFang TC, Microsoft JhengHei, sans-serif"],
  ["--font-family-mono", "IBM Plex Mono", "IBM Plex Mono, Menlo, Monaco, Consolas, monospace"],
] as const;

const sizeRows = [
  ["--font-size-display", "歡迎返嚟 Welcome", "22px", "serif", 700],
  ["--font-size-title-lg", "館長推介 BookGuide", "18px", "serif", 700],
  ["--font-size-title", "新番入庫", "16px", "serif", 700],
  ["--font-size-body", "實體書改唔到，刪唔到。", "14px", "body", 400],
  ["--font-size-body-sm", "本月推薦：記憶與抗爭", "13px", "serif", 400],
  ["--font-size-label", "5月35日－創作・記憶 查看全部 →", "12px", "serif", 700],
  ["--font-size-caption", "首頁 可借閱", "11px", "body", 600],
  ["--font-size-micro", "禁書 六四", "10px · chips", "body", 500],
  ["--font-size-micro-system", "Hong Kong books. Keep them moving.", "9px · Latin only", "mono", 400],
] as const;

const weightRows = [
  ["--font-weight-regular", "400"],
  ["--font-weight-medium", "500"],
  ["--font-weight-semibold", "600"],
  ["--font-weight-bold", "700"],
] as const;

const lineHeightRows = [
  ["--line-height-none", "1"],
  ["--line-height-tight", "1.2"],
  ["--line-height-snug", "1.3"],
  ["--line-height-normal", "1.5"],
  ["--line-height-relaxed", "1.55"],
] as const;

const spacingRows = [
  ["--letter-spacing-normal", ".04em"],
  ["--letter-spacing-wide", ".06em"],
  ["--letter-spacing-wider", ".12em"],
] as const;

const semanticRoleRows = [
  ["semanticTokens.typography.display", "serif", "22px", "bold", "snug", "CJK", "Welcome greeting"],
  ["semanticTokens.typography.titleLg", "serif", "18px", "bold", "tight", "CJK", "Wordmark, curator title"],
  ["semanticTokens.typography.title", "serif", "16px", "bold", "tight", "CJK", "Section tab headers"],
  ["semanticTokens.typography.body", "sans", "14px", "regular", "relaxed", "Both", "Welcome body, descriptions"],
  ["semanticTokens.typography.bodySm", "serif", "13px", "regular", "normal", "CJK", "Curator note, editorial copy"],
  ["semanticTokens.typography.label", "sans", "12px", "medium", "snug", "Both", "Card titles, links, view-all"],
  ["semanticTokens.typography.caption", "sans", "11px", "medium", "normal", "Both", "Badges, nav labels, buttons"],
  ["semanticTokens.typography.micro", "sans", "10px", "medium", "normal", "Latin*", "Chips"],
] as const;

const scriptRuleRows = [
  ["Typeface", "--font-serif (Noto Serif TC)", "--font-sans / --font-mono"],
  ["Voice", "Cultural - titles, greetings, nav, book names", "Functional - UI, body, metadata, badges"],
  ["Min size (must-read)", "--fs-12 (12px)", "--fs-11 (11px)"],
  ["Min size (decorative)", "--fs-10 (10px, 1-2 char only)", "--fs-9 (9px)"],
  ["Body line-height", "--lh-normal (1.5) to --lh-relaxed (1.55)", "--lh-relaxed (1.55)"],
  ["Heading line-height", "--lh-snug (1.3)", "--lh-tight (1.2)"],
  ["Bold weight", "--fw-bold (700)", "--fw-semibold (600) in mixed headings"],
] as const;

const headCellSx = {
  py: 1,
  px: 1.75,
  fontFamily: "var(--font-family-mono)",
  fontSize: "9px",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--color-text-muted)",
  borderBottom: "1px solid var(--color-border-subtle)",
  bgcolor: "var(--color-bg-canvas)",
};

const nameCellSx = {
  py: 1.25,
  px: 1.75,
  borderBottom: "1px solid var(--color-bg-subtle)",
  bgcolor: "var(--color-bg-surface)",
  fontFamily: "var(--font-family-mono)",
  fontSize: "11px",
  color: "var(--color-text-link)",
};

const valCellSx = {
  py: 1.25,
  px: 1.75,
  borderBottom: "1px solid var(--color-bg-subtle)",
  bgcolor: "var(--color-bg-surface)",
  fontSize: "11px",
  color: "var(--color-text-body)",
};

function TokenTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: ReadonlyArray<ReadonlyArray<string>>;
}) {
  return (
    <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid var(--color-border-subtle)", borderRadius: "10px", overflow: "hidden" }}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: "var(--color-bg-canvas)" }}>
            {headers.map((head) => (
              <TableCell key={head} sx={headCellSx}>
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={`row-${rowIndex}`} hover sx={{ "&:last-child td": { borderBottom: "none" }, "&:hover td": { bgcolor: "var(--color-bg-canvas)" } }}>
              {row.map((cell, cellIndex) => (
                <TableCell key={`${rowIndex}-${cellIndex}`} sx={cellIndex === 0 ? nameCellSx : valCellSx}>
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function TypeTokensSection() {
  const { t } = useTranslation();

  return (
    <DesignSystemSection
      id="type-tokens"
      eyebrow={`${t("designSystem.foundations")} — 05`}
      title={t("designSystem.typeTokens.title")}
      description={
        "Primitive tokens are raw values (sizes, weights, families). Semantic tokens are named roles engineers apply in components. This section is the source of truth for responsive type across CJK and Latin scripts."
      }
    >
      <DesignSystemSubSection label="1 · Primitives — Font Families">
        <TokenTable headers={["Token", "Value", "Stack"]} rows={familyRows} />
      </DesignSystemSubSection>

      <DesignSystemSubSection label="1 · Primitives — Font Size Scale">
        <Paper elevation={0} sx={{ border: "1px solid var(--color-border-subtle)", borderRadius: "10px", overflow: "hidden" }}>
          {sizeRows.map(([token, sample, size, family, weight], index) => (
            <Box key={token} sx={{ display: "flex", alignItems: "baseline", gap: 1.5, px: 2, py: 1.25, borderBottom: index < sizeRows.length - 1 ? "1px solid var(--color-bg-subtle)" : "none" }}>
              <Typography sx={{ fontFamily: "var(--font-family-mono)", fontSize: "10px", color: "var(--color-text-muted)", width: 56, flexShrink: 0 }}>{token}</Typography>
              <Typography
                sx={{
                  fontFamily: family === "serif" ? "var(--font-family-display)" : family === "mono" ? "var(--font-family-mono)" : "var(--font-family-body)",
                  fontWeight: weight,
                  fontSize: size.startsWith("9") ? "9px" : size.startsWith("10") ? "10px" : size.startsWith("11") ? "11px" : size.startsWith("12") ? "12px" : size.startsWith("13") ? "13px" : size.startsWith("14") ? "14px" : size.startsWith("16") ? "16px" : size.startsWith("18") ? "18px" : "22px",
                  color: "var(--color-text-primary)",
                }}
              >
                {sample}
              </Typography>
              <Typography sx={{ ml: "auto", fontFamily: "var(--font-family-mono)", fontSize: "9px", color: "var(--color-text-tertiary)" }}>{size}</Typography>
            </Box>
          ))}
        </Paper>
      </DesignSystemSubSection>

      <DesignSystemSubSection label="1 · Primitives — Weights, Line-heights, Letter-spacing">
        <Grid container spacing={1.25}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TokenTable headers={["Weight token", "Value"]} rows={weightRows} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TokenTable headers={["Line-height token", "Value"]} rows={lineHeightRows} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TokenTable headers={["Spacing token", "Value"]} rows={spacingRows} />
          </Grid>
        </Grid>
      </DesignSystemSubSection>

      <DesignSystemSubSection label="2 · Semantic Roles — 8 named type tokens" sx={{ mb: 5 }}>
        <Typography sx={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.75, mb: 2 }}>
          Each role maps to a fixed combination of family, size, weight, line-height, and script. Engineers use the semantic name while primitives remain implementation details.
        </Typography>
        <TokenTable
          headers={["Role", "Family", "Size", "Weight", "Line-h", "Script", "Used for"]}
          rows={semanticRoleRows}
        />
        <DesignSystemNote>
          <><strong>Micro rule:</strong> CJK at 10px is only valid for very short chip labels (六四, 禁書). Stroke-dense characters should stay at 12px or above. 9px remains Latin-only for decorative/system text.</>
        </DesignSystemNote>
      </DesignSystemSubSection>

      <DesignSystemSubSection label="3 · CJK / Latin Script Rules" sx={{ mb: 0 }}>
        <Typography sx={{ fontSize: "13px", color: "var(--color-text-muted)", lineHeight: 1.75, mb: 2 }}>
          Engineers should pick a semantic type token first, then validate script safety using these rules.
        </Typography>
        <TokenTable headers={["Rule", "正體中文 (CJK)", "English (Latin)"]} rows={scriptRuleRows} />

        <DesignSystemNote>
          <><strong>Mixed-script resolution:</strong> When CJK and Latin share a line, CJK serif governs. Exception: Latin-primary system strings (tagline, version label) always use mono.</>
        </DesignSystemNote>
        <DesignSystemNote sx={{ mt: 1 }}>
          <><strong>Weight parity:</strong> CJK 700 appears heavier than Latin 700. In mixed headings, pair CJK 700 with Latin 600 for visual equilibrium.</>
        </DesignSystemNote>
        <DesignSystemNote sx={{ mt: 1 }}>
          <><strong>CJK floor enforcement:</strong> Dense characters (鎮 館 灣 歷 讀 職 議 鐵) should never drop below 12px. Micro is only for simple, short CJK labels.</>
        </DesignSystemNote>
        <DesignSystemNote warn sx={{ mt: 1 }}>
          <><strong>Accessibility gate:</strong> ink-600 is the lightest text-safe color and should not be used for 11px/10px text on non-white surfaces. Keep caption and micro text on stronger contrast tokens.</>
        </DesignSystemNote>
      </DesignSystemSubSection>
    </DesignSystemSection>
  );
}
