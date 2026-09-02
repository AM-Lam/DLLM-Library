import type { ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import { Info as InfoIcon, Warning as WarningIcon, CheckCircle as SuccessIcon } from "@mui/icons-material";
import { semanticTokens } from "../../styles/semanticTokens";

interface CalloutProps {
  variant?: "info" | "warning" | "success" | "neutral";
  children: ReactNode;
  icon?: boolean;
  sx?: object;
}

const variantStyles = {
  info: {
    borderColor: "var(--color-brand-primary)",
    bgcolor: "var(--color-bg-canvas)",
    iconColor: "var(--color-brand-primary)",
    Icon: InfoIcon,
  },
  warning: {
    borderColor: "var(--color-brand-primary-hover)",
    bgcolor: "var(--color-bg-canvas)",
    iconColor: "var(--color-brand-primary-hover)",
    Icon: WarningIcon,
  },
  success: {
    borderColor: semanticTokens.color.special,
    bgcolor: "var(--color-bg-canvas)",
    iconColor: semanticTokens.color.special,
    Icon: SuccessIcon,
  },
  neutral: {
    borderColor: "var(--color-border-default)",
    bgcolor: "var(--color-bg-canvas)",
    iconColor: "var(--color-text-muted)",
    Icon: InfoIcon,
  },
};

export default function Callout({ variant = "neutral", children, icon = false, sx }: CalloutProps) {
  const styles = variantStyles[variant];
  const IconComponent = styles.Icon;

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1.5,
        px: 2,
        py: 1.5,
        bgcolor: styles.bgcolor,
        border: "1px solid var(--color-border-subtle)",
        borderLeft: `2px solid ${styles.borderColor}`,
        borderRadius: "0 8px 8px 0",
        ...sx,
      }}
    >
      {icon && (
        <Box sx={{ flexShrink: 0, pt: 0.25 }}>
          <IconComponent sx={{ fontSize: 18, color: styles.iconColor }} />
        </Box>
      )}
      <Typography
        sx={{
          flex: 1,
          fontSize: "var(--font-size-caption)",
          lineHeight: "var(--line-height-relaxed)",
          color: "var(--color-text-muted)",
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}
