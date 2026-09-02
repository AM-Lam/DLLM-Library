import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import DesignSystemSection from "./DesignSystemSection";
import DesignSystemSubSection from "./DesignSystemSubSection";
import DesignSystemNote from "./DesignSystemNote";

const tableHeadCellSx = {
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

const tableNameCellSx = {
  py: 1.25,
  px: 1.75,
  borderBottom: "1px solid var(--color-bg-subtle)",
  bgcolor: "var(--color-bg-surface)",
  fontFamily: "var(--font-family-mono)",
  fontSize: "11px",
  color: "var(--color-text-link)",
};

const tableValueCellSx = {
  py: 1.25,
  px: 1.75,
  borderBottom: "1px solid var(--color-bg-subtle)",
  bgcolor: "var(--color-bg-surface)",
  fontSize: "11px",
  color: "var(--color-text-body)",
};

type TypeSpecimen = {
  role: string;
  spec: string;
  preview: React.ReactNode;
  right: React.ReactNode;
};

const typeSpecimens: TypeSpecimen[] = [
  {
    role: "Display",
    spec: "Noto Serif TC\n700 · 22px · memorial colour",
    preview: (
      <Box sx={{ fontFamily: "var(--font-family-display)", fontSize: "22px", fontWeight: 700, color: "var(--color-brand-accent)", px: 2, py: 1.25, bgcolor: "var(--color-bg-canvas)", borderRadius: "6px", lineHeight: 1.3 }}>
        歡迎返嚟，米牙珠珠子
      </Box>
    ),
    right: "22px / 700\nline-height: 1.3\ncolor: seasonal memorial HEX",
  },
  {
    role: "Title LG",
    spec: "Noto Serif TC\n700 · 18px · ink-950",
    preview: (
      <Box sx={{ fontFamily: "var(--font-family-display)", fontSize: "18px", fontWeight: 700, color: "var(--color-text-primary)", px: 2, py: 1.25, bgcolor: "var(--color-bg-surface)", borderRadius: "6px", lineHeight: 1, display: "flex", alignItems: "baseline", gap: "7px" }}>
        BookGuide <Box component="span" sx={{ fontWeight: 600, color: "var(--color-brand-primary)" }}>Sydney</Box>
      </Box>
    ),
    right: "18px / 700\ncity: 18px / 600\ncolor: ink-950 / brand-500",
  },
  {
    role: "Title",
    spec: "Noto Serif TC\n700 · 16px · ink-950",
    preview: (
      <Box sx={{ fontFamily: "var(--font-family-display)", fontSize: "16px", fontWeight: 700, color: "var(--color-text-primary)", px: 2, py: 1.25, bgcolor: "var(--color-bg-canvas)", borderRadius: "6px" }}>
        新番入庫
      </Box>
    ),
    right: "16px / 700\ncolor: ink-950",
  },
  {
    role: "Body",
    spec: "IBM Plex Sans\n400 · 14px · ink-700",
    preview: (
      <Box sx={{ fontFamily: "var(--font-family-body)", fontSize: "14px", color: "var(--color-text-secondary)", px: 2, py: 1.25, bgcolor: "var(--color-bg-canvas)", borderRadius: "6px", maxWidth: 320, lineHeight: 1.55 }}>
        實體書改唔到，刪唔到。記憶值得留低。
      </Box>
    ),
    right: "14px / 400\nline-height: 1.55\ncolor: ink-700",
  },
  {
    role: "Body SM",
    spec: "Noto Serif TC\n400 · 13px · ink-700",
    preview: (
      <Box sx={{ fontFamily: "var(--font-family-display)", fontSize: "13px", color: "var(--color-text-secondary)", px: 2, py: 1.25, bgcolor: "var(--color-bg-subtle)", borderRadius: "6px", maxWidth: 360, lineHeight: 1.5 }}>
        本月推薦：記憶與抗爭 — 六月，不能忘記的日子。
      </Box>
    ),
    right: "13px / 400\nline-height: 1.5\ncurator note voice",
  },
  {
    role: "Label",
    spec: "Noto Serif TC / Plex Sans\n500-700 · 12px",
    preview: (
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", px: 2, py: 1.25, bgcolor: "var(--color-bg-surface)", border: "1px solid var(--color-border-subtle)", borderRadius: "6px" }}>
        <Box component="span" sx={{ fontFamily: "var(--font-family-display)", fontWeight: 700, fontSize: "12px", color: "var(--color-text-primary)" }}>5月35日－創作・記憶</Box>
        <Box component="span" sx={{ fontSize: "12px", color: "var(--color-text-link)", fontWeight: 500 }}>查看全部 →</Box>
      </Box>
    ),
    right: "12px / 500-700\ncard titles, links\nCJK floor for must-read text",
  },
  {
    role: "Caption",
    spec: "IBM Plex Sans\n500-600 · 11px",
    preview: (
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", px: 2, py: 1.25, bgcolor: "var(--color-bg-surface)", border: "1px solid var(--color-border-subtle)", borderRadius: "6px" }}>
        <Box component="span" sx={{ fontSize: "11px", fontWeight: 500, color: "var(--color-special)", bgcolor: "var(--color-special-bg)", px: 0.875, py: 0.25, borderRadius: "5px" }}>可借閱</Box>
        <Box component="span" sx={{ fontSize: "11px", color: "var(--color-text-primary)", fontWeight: 600 }}>首頁</Box>
        <Box component="span" sx={{ fontSize: "11px", color: "var(--color-text-secondary)", px: 1.125, py: 0.5, border: "1px solid var(--color-border-subtle)", borderRadius: "14px" }}>正體中文 ▾</Box>
      </Box>
    ),
    right: "11px / 500-600\nbadges, nav labels, buttons",
  },
  {
    role: "Micro",
    spec: "Plex Sans 10px · chips\nPlex Mono 9px · system",
    preview: (
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", px: 2, py: 1.25, bgcolor: "var(--color-bg-surface)", border: "1px solid var(--color-border-subtle)", borderRadius: "6px" }}>
        <Box component="span" sx={{ fontSize: "10px", fontWeight: 500, color: "var(--color-text-body)", bgcolor: "var(--color-border-subtle)", px: 0.75, py: 0.125, borderRadius: "4px" }}>禁書</Box>
        <Box component="span" sx={{ fontSize: "10px", fontWeight: 500, color: "var(--color-brand-accent)", bgcolor: "var(--color-bg-canvas)", px: 0.75, py: 0.125, borderRadius: "4px" }}>六四</Box>
        <Box component="span" sx={{ fontFamily: "var(--font-family-mono)", fontSize: "9px", color: "var(--color-text-muted)", letterSpacing: ".04em" }}>Hong Kong books.</Box>
      </Box>
    ),
    right: "10px chips, 9px system\nCJK: 1-2 char labels only\n9px: Latin decorative only",
  },
];

const bilingualRules = [
  ["Typeface", "Noto Serif TC", "IBM Plex Sans / Mono"],
  ["Role", "Cultural voice — titles, greetings, nav, book names", "Functional voice — UI, body, metadata, badges"],
  ["Min readable size", "12px (stroke-dense glyphs)", "9px (decorative only)"],
  ["Body line-height", "1.4-1.6 (extra leading for density)", "1.5-1.6"],
  ["Heading line-height", "1.3 (tight)", "1.2"],
  ["Bold weight", "700", "600 (to match CJK 700 visually)"],
] as const;

const weightMap = [
  ["400", "Regular — body, editorial notes, inactive labels"],
  ["500", "Medium — badges, chips, links, metadata emphasis"],
  ["600", "Semibold — city name, nav active label, Latin in mixed headings"],
  ["700", "Bold — CJK headings, titles, greeting, tab labels"],
] as const;

export default function TypographySection() {
  const { t } = useTranslation();

  return (
    <DesignSystemSection
      id="typography"
      eyebrow={`${t("designSystem.foundations")} — 04`}
      title={t("designSystem.typography.title")}
      description={
        "Two typefaces. Noto Serif TC for cultural weight - brand name, book titles, section headers, Cantonese nav labels. IBM Plex Sans / Mono for functional UI - body text, metadata, badges, tagline. Eight named steps from display to micro. Bilingual rules govern minimum sizes, line-heights, and weight parity for mixed CJK/Latin text."
      }
    >
      <DesignSystemSubSection label="Type Scale — 8 named steps">
        <Paper elevation={0} sx={{ border: "1px solid var(--color-border-subtle)", borderRadius: "10px", overflow: "hidden" }}>
          {typeSpecimens.map((type, index) => (
            <Box
              key={type.role}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "180px 1fr 160px" },
                gap: "24px",
                alignItems: "center",
                px: "20px",
                py: "16px",
                borderBottom: index < typeSpecimens.length - 1 ? "1px solid var(--color-bg-subtle)" : "none",
              }}
            >
              <Box>
                <Typography sx={{ fontFamily: "var(--font-family-mono)", fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-brand-primary-hover)", mb: "4px", lineHeight: 1.3 }}>
                  {type.role}
                </Typography>
                <Typography sx={{ whiteSpace: "pre-line", display: "block", fontSize: "10px", lineHeight: 1.5, color: "var(--color-text-muted)" }}>
                  {type.spec}
                </Typography>
              </Box>
              {type.preview}
              <Typography sx={{ fontFamily: "var(--font-family-mono)", fontSize: "9px", lineHeight: 1.7, color: "var(--color-text-tertiary)", textAlign: { sm: "right" }, whiteSpace: "pre-line" }}>
                {type.right}
              </Typography>
            </Box>
          ))}
        </Paper>
      </DesignSystemSubSection>

      <DesignSystemSubSection label="Bilingual Rules — 正體中文 + English">
        <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid var(--color-border-subtle)", borderRadius: "10px", overflow: "hidden", mb: 2.5 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: "var(--color-bg-canvas)" }}>
                <TableCell sx={tableHeadCellSx}>Rule</TableCell>
                <TableCell sx={tableHeadCellSx}>正體中文 (CJK)</TableCell>
                <TableCell sx={tableHeadCellSx}>English (Latin)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bilingualRules.map(([rule, cjk, latin]) => (
                <TableRow key={rule} hover sx={{ "&:last-child td": { borderBottom: "none" }, "&:hover td": { bgcolor: "var(--color-bg-canvas)" } }}>
                  <TableCell sx={tableNameCellSx}>{rule}</TableCell>
                  <TableCell sx={tableValueCellSx}>{cjk}</TableCell>
                  <TableCell sx={tableValueCellSx}>{latin}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <DesignSystemNote>
          <><strong>Mixed script rule:</strong> When CJK and Latin share a line, the CJK typeface governs. "5月35日" should render in Noto Serif TC, not Plex. Exception: system text like "Hong Kong books. Keep them moving." remains Latin-primary and uses Plex Mono.</>
        </DesignSystemNote>
        <DesignSystemNote sx={{ mt: 1 }}>
          <><strong>Weight parity:</strong> CJK bold (700) reads heavier than Latin bold at the same numeric weight. In mixed headings, pair CJK 700 with Latin 600 for visual parity.</>
        </DesignSystemNote>
        <DesignSystemNote sx={{ mt: 1 }}>
          <><strong>CJK floor:</strong> Stroke-dense characters lose legibility below 12px on mobile. Reserve 10px for short chips (1-2 characters) and avoid dense glyphs at micro sizes.</>
        </DesignSystemNote>
      </DesignSystemSubSection>

      <DesignSystemSubSection label="Weight Map">
        <TableContainer component={Paper} elevation={0} sx={{ maxWidth: 560, border: "1px solid var(--color-border-subtle)", borderRadius: "10px", overflow: "hidden" }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: "var(--color-bg-canvas)" }}>
                <TableCell sx={tableHeadCellSx}>Weight</TableCell>
                <TableCell sx={tableHeadCellSx}>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {weightMap.map(([weight, role]) => (
                <TableRow key={weight} hover sx={{ "&:last-child td": { borderBottom: "none" }, "&:hover td": { bgcolor: "var(--color-bg-canvas)" } }}>
                  <TableCell sx={tableNameCellSx}>{weight}</TableCell>
                  <TableCell sx={{ ...tableValueCellSx, color: "var(--color-text-muted)" }}>{role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DesignSystemSubSection>

      <DesignSystemSubSection label="Accessibility — Contrast & Readability" sx={{ mb: 0 }}>
        <DesignSystemNote warn>
          <><strong>All 23 text/background combinations pass WCAG AA.</strong> The guardrail is ink-600 (#956a70): safe on white at normal sizes, only safe on ink-100 for large text, and not safe on ink-200 or darker for small body or caption text.</>
        </DesignSystemNote>
      </DesignSystemSubSection>
    </DesignSystemSection>
  );
}
