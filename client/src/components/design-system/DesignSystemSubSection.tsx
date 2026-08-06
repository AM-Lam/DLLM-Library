import type { ReactNode } from "react";
import { Box, Typography } from "@mui/material";

interface DesignSystemSubSectionProps {
  label: ReactNode;
  children: ReactNode;
  sx?: object;
}

export default function DesignSystemSubSection({ label, children, sx }: DesignSystemSubSectionProps) {
  return (
    <Box sx={{ mb: 4.5, ...sx }}>
      <Typography
        sx={{
          mb: "14px",
          fontFamily: "var(--font-family-mono)",
          fontSize: "9px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--color-text-muted)",
        }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  );
}
