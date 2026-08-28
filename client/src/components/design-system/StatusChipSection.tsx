import { Box, Grid, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import DesignSystemNote from "./DesignSystemNote";
import DesignSystemSection from "./DesignSystemSection";
import DesignSystemSubSection from "./DesignSystemSubSection";

const statusExamples = [
  { label: "Available", bilingual: "可借用", bg: "#E6F4EC", fg: "#1A5C30" },
  { label: "Exchangeable", bilingual: "可交換", bg: "#E0ECF7", fg: "#1A4A7A" },
  { label: "Gift", bilingual: "贈送物", bg: "#F0E8F5", fg: "#5A2A6B" },
  { label: "Reserved", bilingual: "已預留", bg: "#FEF3D8", fg: "#7A5000" },
  { label: "Transferred", bilingual: "已轉讓", bg: "#F2ECE5", fg: "#6B5C50" },
] as const;

export default function StatusChipSection() {
  const { t } = useTranslation();

  return (
    <DesignSystemSection
      id="status-chip"
      eyebrow={`${t("designSystem.components")} — 01`}
      title={t("designSystem.statusChip.title")}
      description={t("designSystem.statusChip.description")}
    >
      <DesignSystemSubSection label="Status states">
        <Grid container spacing={1.5}>
          {statusExamples.map((item) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.label}>
              <Paper
                elevation={0}
                sx={{
                  p: 1.75,
                  border: "1px solid var(--color-border-subtle)",
                  borderRadius: 1.5,
                  bgcolor: "var(--color-bg-surface)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5, flexWrap: "wrap" }}>
                  <Box
                    component="span"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      px: 1,
                      py: 0.5,
                      borderRadius: "4px",
                      bgcolor: item.bg,
                      color: item.fg,
                      fontSize: "11px",
                      fontWeight: 600,
                      lineHeight: 1.4,
                    }}
                  >
                    {item.label}
                  </Box>
                  <Box
                    component="span"
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      px: 1,
                      py: 0.5,
                      borderRadius: "4px",
                      bgcolor: item.bg,
                      color: item.fg,
                      fontSize: "11px",
                      fontWeight: 600,
                      lineHeight: 1.4,
                    }}
                  >
                    {item.bilingual}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DesignSystemSubSection>

      <DesignSystemNote>
        <>
          <strong>Rule:</strong> one status per card, top-right of the cover. UI text changes with app language, but the enum and meaning remain stable.
        </>
      </DesignSystemNote>
    </DesignSystemSection>
  );
}
