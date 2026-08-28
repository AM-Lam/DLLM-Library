import { Box, Grid, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import DesignSystemNote from "./DesignSystemNote";
import DesignSystemSection from "./DesignSystemSection";
import DesignSystemSubSection from "./DesignSystemSubSection";

const radiusScale = [
  { token: "--radius-sm", value: "4px", description: "Labels, chips, status pills", radius: "4px" },
  { token: "--radius-md", value: "8px", description: "Small containers, inputs", radius: "8px" },
  { token: "--radius-lg", value: "12px", description: "Cards, panels, overlays", radius: "12px" },
  { token: "--radius-full", value: "999px", description: "Pills, FAB, signal dots", radius: "999px" },
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
              <Paper
                elevation={0}
                sx={{
                  p: 1.75,
                  border: "1px solid var(--color-border-subtle)",
                  borderRadius: 1.5,
                  bgcolor: "var(--color-bg-surface)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    sx={{
                      width: 72,
                      height: 42,
                      bgcolor: "#190609",
                      borderRadius: item.radius,
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography sx={{ fontFamily: "var(--font-family-mono)", fontSize: "11px", color: "var(--color-text-link)" }}>
                      {item.token}
                    </Typography>
                    <Typography sx={{ mt: 0.5, fontFamily: "var(--font-family-mono)", fontSize: "10px", color: "var(--color-text-muted)" }}>
                      {item.value}
                    </Typography>
                    <Typography sx={{ mt: 0.25, fontSize: "11px", color: "var(--color-text-muted)", lineHeight: 1.5 }}>
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
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
