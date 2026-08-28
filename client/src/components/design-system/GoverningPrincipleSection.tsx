import { Box, Grid, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { governingPrinciples, inkScale } from "../../styles/designSystemTokens";
import DesignSystemSection from "./DesignSystemSection";
import DesignSystemNote from "./DesignSystemNote";

const principleIcons = ["✓", "→", "◷", "!", "⇄", "★"] as const;

interface GoverningPrincipleSectionProps {
  first?: boolean;
}

export default function GoverningPrincipleSection({ first = false }: GoverningPrincipleSectionProps) {
  const { t } = useTranslation();

  return (
    <DesignSystemSection
      id="governing"
      first={first}
      eyebrow={`${t("designSystem.foundations")} — 01`}
      title={t("designSystem.governing.title")}
      description={t("designSystem.governing.description")}
    >
      <Grid container spacing={1}>
        {governingPrinciples.map((p, index) => (
          <Grid size={{ xs: 6, sm: 4, md: 2 }} key={p.name}>
            <Paper
              elevation={0}
              sx={{
                p: "16px 12px",
                textAlign: "center",
                borderRadius: "10px",
                border: "1px solid var(--color-border-subtle)",
                bgcolor: "var(--color-bg-surface)",
              }}
            >
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  bgcolor: p.bg,
                  color: p.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  mb: "10px",
                  fontSize: "16px",
                  fontFamily: "var(--font-family-mono)",
                  fontWeight: 500,
                }}
              >
                {principleIcons[index]}
              </Box>
              <Typography sx={{ fontSize: "13px", lineHeight: 1.3, fontWeight: 600, color: p.color, mb: "3px" }}>
                {p.name}
              </Typography>
              <Typography sx={{ fontSize: "11px", lineHeight: 1.45, color: "var(--color-text-muted)" }}>
                {p.rule}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <DesignSystemNote warn>
        <Box component="span" sx={{ color: inkScale[600] }}>
          {t("designSystem.governing.note")}
        </Box>
      </DesignSystemNote>
    </DesignSystemSection>
  );
}
