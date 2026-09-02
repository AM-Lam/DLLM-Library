import { Box, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import ItemStatusChip from "../shared/ItemStatusChip";
import DesignSystemNote from "./DesignSystemNote";
import DesignSystemPanel from "./DesignSystemPanel";
import DesignSystemSection from "./DesignSystemSection";
import DesignSystemSubSection from "./DesignSystemSubSection";

const statusExamples = [
  "AVAILABLE",
  "EXCHANGEABLE",
  "GIFT",
  "RESERVED",
  "TRANSFERRED",
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
      <DesignSystemSubSection label={t("designSystem.statusChip.states")}>
        <Grid container spacing={1.5}>
          {statusExamples.map((status) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={status}>
              <DesignSystemPanel
                sx={{
                  p: "12px 16px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ItemStatusChip status={status} />
                </Box>
              </DesignSystemPanel>
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
