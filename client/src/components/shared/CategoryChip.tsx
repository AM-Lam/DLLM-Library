import { Chip } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { semanticTokens } from "../../styles/semanticTokens";

type CategoryChipProps = {
  label: string;
  tone?: "default" | "memorial";
  sx?: SxProps<Theme>;
};

export default function CategoryChip({ label, tone = "default", sx }: CategoryChipProps) {
  const isMemorial = tone === "memorial";

  return (
    <Chip
      label={label}
      size="small"
      sx={{
        height: 20,
        borderRadius: "var(--radius-badge)",
        bgcolor: isMemorial ? "var(--color-bg-canvas)" : "var(--color-border-subtle)",
        color: isMemorial ? "var(--color-brand-accent)" : "var(--color-text-body)",
        fontFamily: semanticTokens.typography.micro.fontFamily,
        fontSize: semanticTokens.typography.micro.fontSize,
        fontWeight: semanticTokens.typography.micro.fontWeight,
        lineHeight: semanticTokens.typography.micro.lineHeight,
        "& .MuiChip-label": { px: 0.75 },
        ...sx,
      }}
    />
  );
}