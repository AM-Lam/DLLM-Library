import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Alert,
  Typography,
} from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { useTranslation } from "react-i18next";

interface ResetPasswordDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const ResetPasswordDialog: React.FC<ResetPasswordDialogProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent");
      setSuccess(true);
      setTimeout(() => {
        setEmail("");
        setSuccess(false);
        onClose();
        if (onSuccess) onSuccess();
      }, 3000);
    } catch (error: any) {
      console.error("Reset password error:", error);
      setError(
        error.message ||
          t("auth.resetPasswordError", "Failed to send reset email")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setEmail("");
      setError(null);
      setSuccess(false);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        {t("auth.resetPassword")}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {t(
                "auth.resetEmailSent",
                "Password reset email sent! Check your inbox."
              )}
            </Alert>
          )}

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {t(
              "auth.resetPasswordInstructions",
              "Enter your email address and we'll send you a link to reset your password."
            )}
          </Typography>

          <TextField
            label={t("auth.email")}
            type="email"
            fullWidth
            margin="normal"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading || success}
            autoComplete="email"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            disabled={loading || success}
          >
            {loading
              ? t("common.loading", "Loading...")
              : t("auth.sendResetEmail")}
          </Button>

          <Button
            fullWidth
            variant="text"
            sx={{ mt: 1 }}
            onClick={handleClose}
            disabled={loading}
          >
            {t("common.cancel", "Cancel")}
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default ResetPasswordDialog;
