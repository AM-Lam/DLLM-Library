import { Paper } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";

type DesignSystemPanelProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

export default function DesignSystemPanel({ children, sx }: DesignSystemPanelProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid var(--color-border-subtle)",
        borderRadius: "var(--radius-control)",
        bgcolor: "var(--color-bg-surface)",
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
}