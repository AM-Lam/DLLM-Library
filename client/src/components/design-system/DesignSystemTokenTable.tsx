import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

interface TokenRow {
  name: string;
  value: string;
  use: string;
}

interface DesignSystemTokenTableProps {
  rows: readonly TokenRow[];
  tokenLabel: string;
  valueLabel: string;
  useLabel: string;
  showColorChip?: boolean;
}

const headerCellSx = {
  py: 1,
  px: 1.75,
  fontFamily: "var(--font-family-mono)",
  fontSize: "12px",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--color-text-muted)",
  borderBottom: "1px solid var(--color-border-subtle)",
  bgcolor: "var(--color-bg-canvas)",
};

const bodyCellSx = {
  py: 1.25,
  px: 1.75,
  borderBottom: "1px solid var(--color-bg-subtle)",
  bgcolor: "var(--color-bg-surface)",
};

export default function DesignSystemTokenTable({
  rows,
  tokenLabel,
  valueLabel,
  useLabel,
  showColorChip = false,
}: DesignSystemTokenTableProps) {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        border: "1px solid var(--color-border-subtle)",
        borderRadius: 1.25,
        overflow: "hidden",
      }}
    >
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: "var(--color-bg-canvas)" }}>
            <TableCell sx={headerCellSx}>{tokenLabel}</TableCell>
            <TableCell sx={headerCellSx}>{valueLabel}</TableCell>
            <TableCell sx={headerCellSx}>{useLabel}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              hover
              sx={{
                "&:last-child td": { borderBottom: "none" },
                "&:hover td": { bgcolor: "var(--color-bg-canvas)" },
              }}
            >
              <TableCell sx={bodyCellSx}>
                <Typography variant="body2" sx={{ fontFamily: "var(--font-family-mono)", fontSize: "12px", color: "var(--color-text-link)" }}>
                  {row.name}
                </Typography>
              </TableCell>
              <TableCell sx={bodyCellSx}>
                {showColorChip ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ width: 14, height: 14, borderRadius: 0.75, bgcolor: row.value, border: "1px solid var(--color-border-subtle)" }} />
                    <Typography variant="body2" sx={{ fontFamily: "var(--font-family-mono)", fontSize: "12px", color: "var(--color-text-body)" }}>
                      {row.value}
                    </Typography>
                  </Box>
                ) : (
                  <Typography variant="body2" sx={{ fontFamily: "var(--font-family-mono)", fontSize: "12px", color: "var(--color-text-body)" }}>
                    {row.value}
                  </Typography>
                )}
              </TableCell>
              <TableCell sx={bodyCellSx}>
                <Typography variant="body2" sx={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
                  {row.use}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}