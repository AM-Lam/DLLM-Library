// DetailSectionCard.tsx
import React from "react";
import { Box, Typography, Paper } from "@mui/material";

interface DetailSectionCardProps {
  title?: React.ReactNode;
  titleSx?: object;
  children: React.ReactNode;
  eyebrow?: React.ReactNode;
  action?: React.ReactNode;
  disablePadding?: boolean;
  sx?: object;
}

const cardSx = {
  p: { xs: "var(--space-md)", sm: "var(--space-lg)" },
  borderRadius: "12px",
  backgroundColor: "var(--color-bg-surface)",
  border: "1px solid var(--color-border-subtle)",
};

const headerSx = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "var(--space-md)",
  mb: "var(--space-content-gap)",
};

const titleWrapSx = { flex: 1, minWidth: 0 };

const DetailSectionCard: React.FC<DetailSectionCardProps> = ({
  title,
  titleSx,
  children,
  eyebrow,
  action,
  disablePadding = false,
  sx,
}) => {
  return (
    <Paper elevation={0} sx={{ ...cardSx, ...sx }}>
      {(title || eyebrow || action) && (
        <Box sx={headerSx}>
          <Box sx={titleWrapSx}>
            {eyebrow ? (
              <Typography
                variant="overline"
                sx={{
                  display: "block",
                  color: "var(--color-text-muted)",
                  letterSpacing: "var(--letter-spacing-wider)",
                  fontSize: "var(--font-size-micro)",
                  mb: "var(--space-xs)",
                }}
              >
                {eyebrow}
              </Typography>
            ) : null}
            {title ? (
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "var(--font-weight-bold)",
                  color: "var(--color-text-primary)",
                  fontSize: "var(--font-size-title)",
                  ...titleSx,
                }}
              >
                {title}
              </Typography>
            ) : null}
          </Box>
          {action ? <Box>{action}</Box> : null}
        </Box>
      )}
      <Box sx={disablePadding ? undefined : { pt: "var(--space-xs)" }}>{children}</Box>
    </Paper>
  );
};

export default DetailSectionCard;