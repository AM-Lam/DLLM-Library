import { Box, Grid, Paper, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { brandScale, inkScale, paperScale, statusTokens } from "../../styles/designSystemTokens";
import DesignSystemSection from "./DesignSystemSection";
import DesignSystemSubSection from "./DesignSystemSubSection";
import DesignSystemNote from "./DesignSystemNote";

function SwatchRow({
  title,
  scale,
  starred,
}: {
  title: string;
  scale: Record<string, string>;
  starred?: string[];
}) {
  const scaleSize = Object.keys(scale).length;

  return (
    <Box>
      <Grid container spacing={0.5} columns={scaleSize}>
        {Object.entries(scale).map(([key, value]) => {
          const isStar = starred?.includes(key);
          return (
            <Grid size={1} key={key}>
              <Tooltip title={`${title}-${key}: ${value}`} arrow>
                <Paper
                  elevation={0}
                  sx={{
                    aspectRatio: "1",
                    bgcolor: value,
                    border: "1px solid var(--color-border-subtle)",
                    borderRadius: "8px",
                    outline: isStar ? "2px solid var(--color-text-primary)" : "none",
                    outlineOffset: isStar ? 2 : 0,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    pb: "5px",
                    transition: "transform 120ms",
                    "&:hover": {
                      transform: "scale(1.08)",
                      zIndex: 2,
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "var(--font-family-mono)",
                      fontSize: "8px",
                      fontWeight: 500,
                      lineHeight: 1,
                      color: isLight(value) ? "var(--color-text-primary)" : "var(--color-text-inverse)",
                    }}
                  >
                    {key}
                  </Typography>
                </Paper>
              </Tooltip>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

function isLight(hex: string) {
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luma > 128;
}

export default function ColourScalesSection() {
  const { t } = useTranslation();

  return (
    <DesignSystemSection
      id="colours"
      eyebrow={`${t("designSystem.foundations")} — 02`}
      title={t("designSystem.colours.title")}
      description={t("designSystem.colours.description")}
    >
      <DesignSystemSubSection label="Brand Primary - Resistance Magenta - 10 stops">
        <SwatchRow title="Brand Magenta" scale={brandScale} starred={["500", "600", "700"]} />
        <DesignSystemNote>
          <>
            Three active stops: brand-500 for notification pips, brand-600 for FAB background, and brand-700 for active nav/city label/interactive text.
          </>
        </DesignSystemNote>
      </DesignSystemSubSection>

      <DesignSystemSubSection label="Warm Paper Neutrals - Legacy --paper-* (retiring) - 11 stops">
        <SwatchRow title="Warm Paper (legacy)" scale={paperScale} />
        <DesignSystemNote>
          <>
            Warm paper is intentionally not neutral grey; it leans toward aged paper/card-stock for archive tone.
          </>
        </DesignSystemNote>
      </DesignSystemSubSection>

      <DesignSystemSubSection label="Revamp - Rosy Ink Scale - anchored on #190609 - 10 stops">
        <SwatchRow title="Rosy Ink" scale={inkScale} starred={["950", "800", "600", "100"]} />
        <DesignSystemNote>
          <>
            Rosy Ink aligns neutrals with brand hue family and defines text safety: use ink-600 as the lightest practical text tone, while ink-500 and lighter are primarily structural.
          </>
        </DesignSystemNote>
      </DesignSystemSubSection>

      <DesignSystemSubSection label={t("designSystem.colours.status")} sx={{ mb: 0 }}>
        <Grid container spacing={1}>
          {Object.entries(statusTokens).map(([key, token]) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={key}>
              <Paper
                elevation={0}
                sx={{
                  p: 1.5,
                  bgcolor: token.bg,
                  color: token.fg,
                  border: "1px solid var(--color-border-subtle)",
                  borderRadius: "8px",
                }}
              >
                <Typography sx={{ fontSize: "12px", fontWeight: 600, textTransform: "uppercase", lineHeight: 1.3 }}>
                  {key}
                </Typography>
                <Typography sx={{ display: "block", fontSize: "11px", lineHeight: 1.45 }}>
                  {token.fg}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DesignSystemSubSection>
    </DesignSystemSection>
  );
}
