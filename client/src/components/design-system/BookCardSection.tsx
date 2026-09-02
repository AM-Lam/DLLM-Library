import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CategoryChip from "../shared/CategoryChip";
import ItemStatusChip from "../shared/ItemStatusChip";
import DesignSystemNote from "./DesignSystemNote";
import DesignSystemPanel from "./DesignSystemPanel";
import DesignSystemSection from "./DesignSystemSection";
import DesignSystemSubSection from "./DesignSystemSubSection";

const cardVariants = [
  {
    name: "Horizontal",
    width: 140,
    coverHeight: 194,
    status: "AVAILABLE",
    tags: ["六四", "禁書"],
    gradient: "linear-gradient(160deg, var(--color-text-muted) 0%, var(--color-bg-subtle) 100%)",
  },
  {
    name: "Grid",
    width: 112,
    coverHeight: 180,
    status: "EXCHANGEABLE",
    tags: ["雨傘"],
    gradient: "linear-gradient(150deg, var(--color-text-body) 0%, var(--color-border-subtle) 100%)",
  },
  {
    name: "Compact",
    width: 88,
    coverHeight: 150,
    status: "RESERVED",
    tags: ["國安法"],
    gradient: "linear-gradient(150deg, var(--color-brand-accent) 0%, var(--color-bg-subtle) 100%)",
  },
] as const;

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
            <DesignSystemPanel
              sx={{
                p: 2,
                border: "1px solid var(--color-border-subtle)",
                borderRadius: "10px",
                bgcolor: "var(--color-bg-subtle)",
              }}
            >
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "flex-end" }}>
                {cardVariants.map((variant) => (
                  <Box
                    key={variant.name}
                    sx={{
                      position: "relative",
                      width: variant.width,
                      bgcolor: "var(--color-bg-surface)",
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 1px 4px var(--color-border-default)",
                    }}
                  >
                    <Box sx={{ position: "relative", height: variant.coverHeight, background: variant.gradient }}>
                      <ItemStatusChip
                        status={variant.status}
                        sx={{
                          position: "absolute",
                          top: 7,
                          right: 7,
                        }}
                      />
                    </Box>
                    <Box sx={{ px: 1.5, py: 1.25 }}>
                      <Typography
                        sx={{
                          fontSize: variant.name === "Compact" ? "10px" : variant.name === "Grid" ? "11px" : "12px",
                          fontWeight: 700,
                          lineHeight: 1.35,
                          color: "var(--color-text-primary)",
                        }}
                      >
                        {variant.name === "Compact" ? "城市記憶" : "記憶與抗爭"}
                      </Typography>
                      <Box sx={{ mt: 1, display: "flex", gap: 0.75, flexWrap: "wrap" }}>
                        {variant.tags.map((tag) => <CategoryChip key={tag} label={tag} tone={tag === "六四" ? "memorial" : "default"} />)}
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </DesignSystemPanel>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <DesignSystemPanel
              sx={{
                p: 2,
                borderRadius: "8px",
                height: "100%",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "var(--font-family-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                }}
              >
                Anatomy
              </Typography>
              <Box sx={{ mt: 1.5, display: "grid", gap: 1 }}>
                <Typography sx={{ fontSize: "11px", color: "var(--color-text-body)" }}>Cover image</Typography>
                <Typography sx={{ fontSize: "11px", color: "var(--color-text-body)" }}>Status chip</Typography>
                <Typography sx={{ fontSize: "11px", color: "var(--color-text-body)" }}>Title + metadata</Typography>
                <Typography sx={{ fontSize: "11px", color: "var(--color-text-body)" }}>Category chips</Typography>
              </Box>
            </DesignSystemPanel>
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
