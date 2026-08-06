import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

interface DataTableColumn {
  key: string;
  label: string;
  align?: "left" | "right" | "center";
  width?: string | number;
}

interface DataTableProps {
  columns: DataTableColumn[];
  rows: Record<string, React.ReactNode>[];
  dense?: boolean;
  striped?: boolean;
  sx?: object;
}

const headerCellSx = {
  py: 1,
  px: 1.75,
  fontFamily: "var(--font-family-mono)",
  fontSize: "var(--font-size-micro)",
  letterSpacing: "var(--letter-spacing-wider)",
  textTransform: "uppercase",
  color: "var(--color-text-muted)",
  borderBottom: "1px solid var(--color-border-subtle)",
  bgcolor: "var(--color-bg-canvas)",
};

const bodyCellSx = {
  py: 1.25,
  px: 1.75,
  fontSize: "var(--font-size-caption)",
  color: "var(--color-text-body)",
  borderBottom: "1px solid var(--color-bg-subtle)",
  bgcolor: "var(--color-bg-surface)",
};

export default function DataTable({ columns, rows, dense = false, striped = false, sx }: DataTableProps) {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        border: "1px solid var(--color-border-subtle)",
        borderRadius: "10px",
        overflow: "hidden",
        ...sx,
      }}
    >
      <Table size={dense ? "small" : "medium"}>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                align={col.align}
                sx={{ ...headerCellSx, ...(col.width ? { width: col.width } : {}) }}
              >
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              hover
              sx={{
                "&:last-child td": { borderBottom: "none" },
                "&:hover td": { bgcolor: "var(--color-bg-canvas)" },
                ...(striped && index % 2 === 1 ? { "& td": { bgcolor: "var(--color-bg-subtle)" } } : {}),
              }}
            >
              {columns.map((col) => (
                <TableCell key={col.key} align={col.align} sx={bodyCellSx}>
                  {row[col.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
