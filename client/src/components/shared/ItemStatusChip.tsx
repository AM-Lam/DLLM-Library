import { Chip } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { semanticTokens } from "../../styles/semanticTokens";
import { getItemStatusChipIcon, getItemStatusChipProps } from "../../utils/itemStatusChip";

type ItemStatusChipProps = {
  status: string;
  label?: string;
  size?: "small" | "medium";
  sx?: SxProps<Theme>;
};

export default function ItemStatusChip({ status, label, size = "small", sx }: ItemStatusChipProps) {
  const { t } = useTranslation();
  const palette = getItemStatusChipProps(status);

  return (
    <Chip
      icon={getItemStatusChipIcon(status)}
      label={label ?? t(`shortStatus.${status}`, status)}
      size={size}
      sx={{
        height: size === "small" ? 24 : 32,
        border: `1px solid ${palette.borderColor}`,
        borderRadius: "var(--radius-badge)",
        bgcolor: palette.bgColor,
        color: palette.color,
        fontFamily: semanticTokens.typography.caption.fontFamily,
        fontSize: semanticTokens.typography.caption.fontSize,
        fontWeight: semanticTokens.typography.caption.fontWeight,
        lineHeight: semanticTokens.typography.caption.lineHeight,
        "& .MuiChip-icon": {
          color: "inherit",
          fontSize: "14px",
          ml: 0.75,
        },
        "& .MuiChip-label": { px: 0.75 },
        ...sx,
      }}
    />
  );
}