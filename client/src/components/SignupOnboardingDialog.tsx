import React, { useState } from "react";
import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";
import { clearPendingSignupOnboarding } from "../utils/signupOnboarding";
import { semanticTokens } from "../styles/semanticTokens";

interface SignupOnboardingDialogProps {
  open: boolean;
  onClose: () => void;
  onAddAddress: () => void;
}

const SignupOnboardingDialog: React.FC<SignupOnboardingDialogProps> = ({
  open,
  onClose,
  onAddAddress,
}) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const isComplete = step === 3;

  const handleClose = () => {
    setStep(0);
    onClose();
  };

  const handlePrimaryAction = () => {
    if (step === 2) {
      handleClose();
      onAddAddress();
      return;
    }

    if (isComplete) {
      clearPendingSignupOnboarding();
      handleClose();
      return;
    }

    setStep((currentStep) => currentStep + 1);
  };

  const stepCopy = [
    {
      title: t("onboarding.signup.step1.title"),
      body: t("onboarding.signup.step1.body"),
      action: t("onboarding.signup.continue"),
    },
    {
      title: t("onboarding.signup.step2.title"),
      body: t("onboarding.signup.step2.body"),
      action: t("onboarding.signup.continue"),
    },
    {
      title: t("onboarding.signup.step3.title"),
      body: t("onboarding.signup.step3.body"),
      action: t("onboarding.signup.addAddress"),
    },
    {
      title: t("onboarding.signup.complete.title"),
      body: t("onboarding.signup.complete.body"),
      action: t("onboarding.signup.browseBooks"),
    },
  ][step];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          bgcolor: semanticTokens.color.bgSurface,
          color: semanticTokens.color.textPrimary,
        },
      }}
    >
      <DialogContent sx={{ p: { xs: 3, sm: 4 } }}>
        {isComplete ? (
          <Box
            sx={{
              width: 44,
              height: 44,
              mb: 2,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#FCE0ED",
              color: semanticTokens.color.brandPrimary,
            }}
          >
            <CheckIcon />
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: 0.75, mb: 2.5 }}>
            {[0, 1, 2].map((progressStep) => (
              <Box
                key={progressStep}
                sx={{
                  flex: 1,
                  height: 4,
                  borderRadius: 2,
                  bgcolor:
                    progressStep <= step
                      ? semanticTokens.color.brandPrimary
                      : semanticTokens.color.borderSubtle,
                }}
              />
            ))}
          </Box>
        )}

        {!isComplete && (
          <Typography
            variant="overline"
            sx={{
              display: "block",
              mb: 1.5,
              color: semanticTokens.color.brandPrimary,
              fontWeight: 600,
            }}
          >
            {t("onboarding.signup.stepLabel", { step: step + 1 })}
          </Typography>
        )}
        <Typography
          variant="h6"
          sx={{
            mb: 1.25,
            color: semanticTokens.color.textPrimary,
            fontFamily: '"Noto Serif TC", serif',
            fontWeight: 700,
          }}
        >
          {stepCopy.title}
        </Typography>
        <Typography
          sx={{
            minHeight: { xs: 120, sm: 140 },
            color: semanticTokens.color.textSecondary,
            lineHeight: 1.7,
            whiteSpace: "pre-line",
          }}
        >
          {stepCopy.body}
        </Typography>
        <Button
          fullWidth
          variant="contained"
          onClick={handlePrimaryAction}
          sx={{ mt: 2.5 }}
        >
          {stepCopy.action}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SignupOnboardingDialog;
