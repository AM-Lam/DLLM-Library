import type { ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

interface DesignSystemNoteProps {
  children: ReactNode;
  warn?: boolean;
  sx?: SxProps<Theme>;
}

export default function DesignSystemNote({ children, warn = false, sx }: DesignSystemNoteProps) {
  return (
    <Box
      sx={{
        mt: 1.25,
        px: 1.75,
        py: 1.25,
        background: "var(--color-bg-canvas)",
        border: "1px solid var(--color-border-subtle)",
        borderLeft: `2px solid ${warn ? "var(--color-brand-primary-hover)" : "var(--color-border-default)"}`,
        borderRadius: "0 8px 8px 0",
        ...sx,
      }}
    >
      <Typography sx={{ fontSize: "12px", lineHeight: 1.7, color: "var(--color-text-muted)" }}>{children}</Typography>
    </Box>
  );
}
