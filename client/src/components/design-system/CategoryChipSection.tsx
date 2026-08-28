import { Box, Grid, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import DesignSystemNote from "./DesignSystemNote";
import DesignSystemSection from "./DesignSystemSection";
import DesignSystemSubSection from "./DesignSystemSubSection";

const chips = [
  "禁書",
  "政治",
  "紀實",
  "海外",
  "六四",
  "雨傘",
  "國安法",
  "Hong Kong",
] as const;

export default function CategoryChipSection() {
  const { t } = useTranslation();

  return (
    <DesignSystemSection
      id="category-chip"
      eyebrow={`${t("designSystem.components")} — 02`}
      title={t("designSystem.categoryChip.title")}
      description={t("designSystem.categoryChip.description")}
    >
      <DesignSystemSubSection label="Tag set">
        <Paper
          elevation={0}
          sx={{
            p: 2,
            border: "1px solid var(--color-border-subtle)",
            borderRadius: 1.5,
            bgcolor: "var(--color-bg-surface)",
          }}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {chips.map((chip) => (
              <Box
                key={chip}
                component="span"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  px: 1,
                  py: 0.4,
                  borderRadius: "4px",
                  bgcolor: "#E4D8DA",
                  color: "#502B30",
                  fontSize: "10px",
                  fontWeight: 600,
                  lineHeight: 1.4,
                }}
              >
                {chip}
              </Box>
            ))}
          </Box>
        </Paper>
      </DesignSystemSubSection>

      <DesignSystemNote>
        <>
          <strong>Content rule:</strong> tags are metadata, not UI copy. they keep their original form across languages, while the surrounding status and controls translate.
        </>
      </DesignSystemNote>
    </DesignSystemSection>
  );
}
