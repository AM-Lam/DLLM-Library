import { Box, Grid, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import DesignSystemNote from "./DesignSystemNote";
import DesignSystemSection from "./DesignSystemSection";
import DesignSystemSubSection from "./DesignSystemSubSection";

export default function BookCardSection() {
  const { t } = useTranslation();

  return (
    <DesignSystemSection
      id="book-card"
      eyebrow={`${t("designSystem.components")} — 03`}
      title={t("designSystem.bookCard.title")}
      description={t("designSystem.bookCard.description")}
    >
      <DesignSystemSubSection label="Browse card anatomy">
        <Grid container spacing={2} alignItems="stretch">
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                border: "1px solid var(--color-border-subtle)",
                borderRadius: 2,
                bgcolor: "var(--color-bg-subtle)",
              }}
            >
              <Box sx={{ position: "relative", width: 180, bgcolor: "#FFFFFF", borderRadius: "12px", overflow: "hidden", boxShadow: "0 1px 4px rgba(25,6,9,0.06)" }}>
                <Box
                  sx={{
                    position: "relative",
                    height: 196,
                    background: "linear-gradient(160deg, #2A3B40 0%, #F1E9EA 100%)",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      position: "absolute",
                      top: 1,
                      right: 1,
                      display: "inline-flex",
                      alignItems: "center",
                      px: 1,
                      py: 0.5,
                      borderRadius: "4px",
                      bgcolor: "rgba(224,244,240,0.94)",
                      color: "#1A5C30",
                      fontSize: "10px",
                      fontWeight: 600,
                    }}
                  >
                    可借用
                  </Box>
                </Box>
                <Box sx={{ px: 1.5, py: 1.25 }}>
                  <Typography sx={{ fontSize: "12px", fontWeight: 700, lineHeight: 1.35, color: "var(--color-text-primary)" }}>
                    記憶與抗爭
                  </Typography>
                  <Box sx={{ mt: 1, display: "flex", gap: 0.75, flexWrap: "wrap" }}>
                    <Box component="span" sx={{ display: "inline-flex", px: 0.75, py: 0.2, borderRadius: "4px", bgcolor: "#E4D8DA", color: "#502B30", fontSize: "9px", fontWeight: 600 }}>
                      六四
                    </Box>
                    <Box component="span" sx={{ display: "inline-flex", px: 0.75, py: 0.2, borderRadius: "4px", bgcolor: "#E4D8DA", color: "#502B30", fontSize: "9px", fontWeight: 600 }}>
                      禁書
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                border: "1px solid var(--color-border-subtle)",
                borderRadius: 1.5,
                bgcolor: "var(--color-bg-surface)",
                height: "100%",
              }}
            >
              <Typography sx={{ fontFamily: "var(--font-family-mono)", fontSize: "9px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
                Anatomy
              </Typography>
              <Box sx={{ mt: 1.5, display: "grid", gap: 1 }}>
                <Typography sx={{ fontSize: "11px", color: "var(--color-text-body)" }}>Cover image</Typography>
                <Typography sx={{ fontSize: "11px", color: "var(--color-text-body)" }}>Status chip</Typography>
                <Typography sx={{ fontSize: "11px", color: "var(--color-text-body)" }}>Title + metadata</Typography>
                <Typography sx={{ fontSize: "11px", color: "var(--color-text-body)" }}>Category chips</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </DesignSystemSubSection>

      <DesignSystemNote>
        <>
          <strong>Pattern:</strong> one status chip, one card frame, a short title, and up to two tags. keep the hierarchy stable while the content and language vary.
        </>
      </DesignSystemNote>
    </DesignSystemSection>
  );
}
