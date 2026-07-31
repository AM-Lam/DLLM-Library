import React from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Modal,
  Backdrop,
  Fade,
} from "@mui/material";
import { SwapHoriz, WarningAmber as WarningIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface TransferOwnershipConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  itemName: string;
}

const TransferOwnershipConfirmDialog: React.FC<
  TransferOwnershipConfirmDialogProps
> = ({ open, onClose, onConfirm, loading, itemName }) => {
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 500 },
            maxHeight: "90vh",
            overflow: "auto",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <SwapHoriz color="primary" sx={{ mr: 2, fontSize: 32 }} />
            <Typography variant="h5" component="h2">
              {t("item.transferOwnership.title", "Transfer Ownership")}
            </Typography>
          </Box>

          <Box sx={{ mb: 3, p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
            <Typography variant="body1" fontWeight="medium">
              {t("item.itemName", "Item")}: {itemName}
            </Typography>
          </Box>

          <Alert severity="warning" icon={<WarningIcon />} sx={{ mb: 3 }}>
            <Typography variant="body2" fontWeight="bold" gutterBottom>
              {t(
                "item.transferOwnership.warningTitle",
                "This action changes the permanent owner of this item",
              )}
            </Typography>
            <Typography variant="body2">
              {t(
                "item.transferOwnership.warningBody",
                "Use this only after the item has been handed over. The current holder will become the new owner.",
              )}
            </Typography>
          </Alert>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button variant="outlined" onClick={onClose} disabled={loading}>
              {t("common.cancel", "Cancel")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={onConfirm}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <SwapHoriz />}
            >
              {loading
                ? t("common.loading", "Loading...")
                : t("item.transferOwnership.confirmTransfer", "Confirm Ownership Transfer")}
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default TransferOwnershipConfirmDialog;