import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { semanticTokens } from "../styles/semanticTokens";

interface LoadingStateProps {
  message?: string;
  size?: number;
  minHeight?: number | string;
  inline?: boolean;
}

export const PageLoader: React.FC<LoadingStateProps> = ({
  message,
  size = 48,
  minHeight = "50vh",
}) => (
  <Box
    sx={{
      minHeight,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 1.5,
      py: 4,
    }}
  >
    <CircularProgress
      size={size}
      thickness={4}
      sx={{ color: semanticTokens.color.brandPrimary }}
    />
    {message && (
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    )}
  </Box>
);

export const InlineLoader: React.FC<LoadingStateProps> = ({
  message,
  size = 24,
}) => (
  <Box
    sx={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 1,
    }}
  >
    <CircularProgress
      size={size}
      thickness={4}
      sx={{ color: semanticTokens.color.brandPrimary }}
    />
    {message && (
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    )}
  </Box>
);

export default PageLoader;
