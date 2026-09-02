import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CategoryChip from "../shared/CategoryChip";
import DesignSystemNote from "./DesignSystemNote";
import DesignSystemPanel from "./DesignSystemPanel";
import DesignSystemSection from "./DesignSystemSection";
import DesignSystemSubSection from "./DesignSystemSubSection";

const groups = [
  {
    labelKey: "designSystem.categoryChip.neutral",
    tone: "default" as const,
    chips: ["禁書", "政治", "紀實", "海外", "Hong Kong"],
  },
  {
    labelKey: "designSystem.categoryChip.memorial",
    tone: "memorial" as const,
    chips: ["六四", "雨傘", "國安法"],
  },
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
      <DesignSystemSubSection label={t("designSystem.categoryChip.tagSet")}>
        <DesignSystemPanel
          sx={{
            p: 2,
          }}
        >
          <Box sx={{ display: "grid", gap: 1.5 }}>
            {groups.map((group) => (
              <Box key={group.labelKey} sx={{ display: "grid", gap: 1 }}>
                <Typography
                  sx={{
                    fontFamily: "var(--font-family-mono)",
                    fontSize: "12px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-text-muted)",
                  }}
                >
                  {t(group.labelKey)}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {group.chips.map((label) => <CategoryChip key={label} label={label} tone={group.tone} />)}
                </Box>
              </Box>
            ))}
          </Box>
        </DesignSystemPanel>
      </DesignSystemSubSection>

      <DesignSystemNote>
        <>
          <strong>Content rule:</strong> tags are metadata, not UI copy. they keep their original form across languages, while the surrounding status and controls translate.
        </>
      </DesignSystemNote>
    </DesignSystemSection>
  );
}
