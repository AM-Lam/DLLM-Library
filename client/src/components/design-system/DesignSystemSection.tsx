import type { ReactNode } from "react";
import { Box, Typography } from "@mui/material";

interface DesignSystemSectionProps {
  id: string;
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  first?: boolean;
  sx?: object;
}

export default function DesignSystemSection({
  id,
  eyebrow,
  title,
  description,
  children,
  first = false,
  sx,
}: DesignSystemSectionProps) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        scrollMarginTop: 3,
        pt: first ? 6 : 7,
        mt: first ? 0 : 7,
        borderTop: first ? "none" : "1px solid var(--color-border-subtle)",
        ...sx,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 0.75 }}>
        <Box sx={{ width: 14, height: 1.5, bgcolor: "var(--color-brand-primary-hover)", borderRadius: 999 }} />
        <Typography
          variant="overline"
          sx={{
            fontFamily: "var(--font-family-mono)",
            color: "var(--color-text-muted)",
            fontSize: "9px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            lineHeight: 1.5,
          }}
        >
          {eyebrow}
        </Typography>
        <Box sx={{ flex: 1, height: 1, bgcolor: "var(--color-border-subtle)" }} />
      </Box>

      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontFamily: "var(--font-family-display)",
          fontSize: "22px",
          fontWeight: 700,
          letterSpacing: "-0.01em",
          mb: 1,
          color: "var(--color-text-primary)",
        }}
      >
        {title}
      </Typography>

      {description ? (
        <Typography
          variant="body2"
          sx={{
            maxWidth: 640,
            mb: 3.5,
            fontSize: "13px",
            color: "var(--color-text-muted)",
            lineHeight: 1.75,
          }}
        >
          {description}
        </Typography>
      ) : null}

      <Box sx={{ mt: 3 }}>{children}</Box>
    </Box>
  );
}
