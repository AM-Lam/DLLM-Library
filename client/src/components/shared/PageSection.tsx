import type { ReactNode } from "react";
import { Box, Typography } from "@mui/material";

interface PageSectionProps {
  id?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  spacing?: "compact" | "default" | "spacious";
  sx?: object;
}

const spacingMap = {
  compact: { pt: 3, mt: 3 },
  default: { pt: 4, mt: 4 },
  spacious: { pt: 6, mt: 6 },
};

export default function PageSection({
  id,
  eyebrow,
  title,
  description,
  action,
  children,
  spacing = "default",
  sx,
}: PageSectionProps) {
  const spacingStyles = spacingMap[spacing];

  return (
    <Box
      component="section"
      id={id}
      sx={{
        ...spacingStyles,
        borderTop: spacingStyles.mt > 0 ? "1px solid var(--color-border-subtle)" : "none",
        ...sx,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 2, mb: 2 }}>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {eyebrow && (
            <Typography
              variant="overline"
              sx={{
                display: "block",
                mb: 0.5,
                fontFamily: "var(--font-family-mono)",
                fontSize: "var(--font-size-micro)",
                color: "var(--color-text-muted)",
                letterSpacing: "var(--letter-spacing-wider)",
                textTransform: "uppercase",
              }}
            >
              {eyebrow}
            </Typography>
          )}
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontFamily: "var(--font-family-display)",
              fontSize: "var(--font-size-title-lg)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--color-text-primary)",
              mb: description ? 1 : 0,
            }}
          >
            {title}
          </Typography>
          {description && (
            <Typography
              variant="body2"
              sx={{
                fontSize: "var(--font-size-body-sm)",
                color: "var(--color-text-muted)",
                lineHeight: "var(--line-height-relaxed)",
                maxWidth: 640,
              }}
            >
              {description}
            </Typography>
          )}
        </Box>
        {action && <Box sx={{ flexShrink: 0 }}>{action}</Box>}
      </Box>
      <Box sx={{ mt: 3 }}>{children}</Box>
    </Box>
  );
}
