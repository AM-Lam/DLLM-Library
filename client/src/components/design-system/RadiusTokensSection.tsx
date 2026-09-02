import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import DesignSystemNote from "./DesignSystemNote";
import DesignSystemPanel from "./DesignSystemPanel";
import DesignSystemSection from "./DesignSystemSection";
import DesignSystemSubSection from "./DesignSystemSubSection";

const radiusScale = [
  {
    token: "--radius-badge",
    value: "4px",
    description: "All small labels — category chips, status badges, structural indicators",
    radius: "4px",
    sampleWidth: 52,
    sampleHeight: 34,
    sampleVariant: "simple",
  },
  {
    token: "--radius-control",
    value: "8px",
    description: "Small containers, compact cards, form inputs",
    radius: "8px",
    sampleWidth: 48,
    sampleHeight: 34,
    sampleVariant: "soft",
  },
  {
    token: "--radius-card",
    value: "12px",
    description: "Cards and large content containers",
    radius: "12px",
    sampleWidth: 52,
    sampleHeight: 34,
    sampleVariant: "panel",
  },
  {
    token: "--radius-pill",
    value: "999px",
    description: "Pills, FAB, signal dots, and truly circular affordances",
    radius: "999px",
    sampleWidth: 34,
    sampleHeight: 34,
    sampleVariant: "circle",
  },
] as const;

export default function RadiusTokensSection() {
  const { t } = useTranslation();

  return (
    <DesignSystemSection
      id="radius-tokens"
      eyebrow={`${t("designSystem.foundations")} — 06`}
      title={t("designSystem.radiusTokens.title")}
      description={t("designSystem.radiusTokens.description")}
    >
      <DesignSystemSubSection label="Radius scale">
        <Grid container spacing={1.5}>
          {radiusScale.map((item) => (
            <Grid size={{ xs: 12, md: 6 }} key={item.token}>
              <DesignSystemPanel
                sx={{
                  p: "14px 16px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      width: item.sampleWidth,
                      height: item.sampleHeight,
                      bgcolor: "var(--color-text-primary)",
                      borderRadius: item.radius,
                      flexShrink: 0,
                      opacity: item.sampleVariant === "soft" ? 0.7 : 1,
                    }}
                  />
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                      sx={{
                        fontFamily: "var(--font-family-mono)",
                        fontSize: "12px",
                        color: "var(--color-text-primary)",
                        fontWeight: 500,
                      }}
                    >
                      {item.token}
                    </Typography>
                    <Typography
                      sx={{
                        mt: 0.5,
                        fontFamily: "var(--font-family-mono)",
                        fontSize: "10px",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {item.value}
                    </Typography>
                    <Typography
                      sx={{
                        mt: 0.5,
                        fontSize: "12px",
                        color: "var(--color-text-muted)",
                        lineHeight: 1.5,
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              </DesignSystemPanel>
            </Grid>
          ))}
        </Grid>
      </DesignSystemSubSection>

      <DesignSystemNote>
        <>
          <strong>Rule:</strong> only the container radius scales with layout. small labels, chips, buttons, and signal dots keep fixed radius so shape remains readable and unmistakable.
        </>
      </DesignSystemNote>
    </DesignSystemSection>
  );
}
