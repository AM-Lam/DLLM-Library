import { Box, Grid, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import DesignSystemNote from "./DesignSystemNote";
import DesignSystemSection from "./DesignSystemSection";
import DesignSystemSubSection from "./DesignSystemSubSection";

const spacingScale = [
  { token: "--space-1", value: "4px", width: 18 },
  { token: "--space-2", value: "8px", width: 28 },
  { token: "--space-3", value: "12px", width: 42 },
  { token: "--space-4", value: "16px", width: 56 },
  { token: "--space-5", value: "20px", width: 70 },
  { token: "--space-6", value: "24px", width: 84 },
  { token: "--space-7", value: "32px", width: 112 },
  { token: "--space-8", value: "40px", width: 136 },
] as const;

export default function SpacingTokensSection() {
  const { t } = useTranslation();

  return (
    <DesignSystemSection
      id="spacing-tokens"
      eyebrow={`${t("designSystem.foundations")} — 07`}
      title={t("designSystem.spacingTokens.title")}
      description={t("designSystem.spacingTokens.description")}
    >
      <DesignSystemSubSection label="8-step spacing scale">
        <Grid container spacing={1.5}>
          {spacingScale.map((step) => (
            <Grid size={{ xs: 12, md: 6 }} key={step.token}>
              <Paper
                elevation={0}
                sx={{
                  p: 1.5,
                  border: "1px solid var(--color-border-subtle)",
                  borderRadius: 1.5,
                  bgcolor: "var(--color-bg-surface)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Box
                    sx={{
                      width: step.width,
                      height: 18,
                      bgcolor: "var(--color-brand-primary-hover)",
                      borderRadius: 0.75,
                      opacity: 0.9,
                    }}
                  />
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography sx={{ fontFamily: "var(--font-family-mono)", fontSize: "11px", color: "var(--color-text-link)" }}>
                      {step.token}
                    </Typography>
                    <Typography sx={{ fontSize: "10px", color: "var(--color-text-muted)" }}>{step.value}</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DesignSystemSubSection>

      <DesignSystemNote>
        <>
          <strong>Layout rule:</strong> global spacing drives gaps between sections, cards, and screens. internal chip padding stays local, not global, because it belongs to component anatomy, not layout rhythm.
        </>
      </DesignSystemNote>
    </DesignSystemSection>
  );
}
