import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import DesignSystemNote from "./DesignSystemNote";
import DesignSystemPanel from "./DesignSystemPanel";
import DesignSystemSection from "./DesignSystemSection";
import DesignSystemSubSection from "./DesignSystemSubSection";

const spacingScale = [
  { token: "--space-1", value: "4px", width: 4 },
  { token: "--space-2", value: "8px", width: 8 },
  { token: "--space-3", value: "12px", width: 12 },
  { token: "--space-4", value: "16px", width: 16 },
  { token: "--space-5", value: "20px", width: 20 },
  { token: "--space-6", value: "24px", width: 24 },
  { token: "--space-7", value: "32px", width: 32 },
  { token: "--space-8", value: "40px", width: 40 },
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
              <DesignSystemPanel
                sx={{
                  p: "11px 16px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        width: step.width,
                        height: 16,
                        bgcolor: "var(--color-brand-primary-hover)",
                        borderRadius: "2px",
                        opacity: 0.9,
                      }}
                    />
                  </Box>
                  <Box sx={{ minWidth: 0, flexShrink: 0 }}>
                    <Typography
                      sx={{
                        fontFamily: "var(--font-family-mono)",
                        fontSize: "11px",
                        color: "var(--color-text-primary)",
                        fontWeight: 500,
                      }}
                    >
                      {step.token}
                    </Typography>
                    <Typography sx={{ fontSize: "10px", color: "var(--color-text-muted)", mt: 0.25 }}>{step.value}</Typography>
                  </Box>
                </Box>
              </DesignSystemPanel>
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
