import * as React from "react";
import {
  CheckCircleOutline,
  SwapHoriz,
  CardGiftcard,
  WatchLater,
  History,
} from "@mui/icons-material";
import { TransactionStatus } from "../generated/graphql";
import { semanticTokens } from "../styles/semanticTokens";

export type ItemStatusChipProps = {
  bgColor: string;
  color: string;
  borderColor: string;
};

export const getItemStatusChipIcon = (status: string): React.ReactElement | undefined => {
  switch (status) {
    case "AVAILABLE":
      return React.createElement(CheckCircleOutline, { fontSize: "small" });
    case "EXCHANGEABLE":
      return React.createElement(SwapHoriz, { fontSize: "small" });
    case "GIFT":
      return React.createElement(CardGiftcard, { fontSize: "small" });
    case "RESERVED":
      return React.createElement(WatchLater, { fontSize: "small" });
    case "TRANSFERRED":
      return React.createElement(History, { fontSize: "small" });
    default:
      return undefined;
  }
};

export const getItemStatusChipProps = (status: string): ItemStatusChipProps => {
  switch (status) {
    case "AVAILABLE":
      return {
        bgColor: semanticTokens.color.successBg,
        color: semanticTokens.color.success,
        borderColor: semanticTokens.color.success,
      };
    case "EXCHANGEABLE":
      return {
        bgColor: semanticTokens.color.infoBg,
        color: semanticTokens.color.info,
        borderColor: semanticTokens.color.info,
      };
    case "GIFT":
      return {
        bgColor: semanticTokens.color.giftBg,
        color: semanticTokens.color.gift,
        borderColor: semanticTokens.color.gift,
      };
    case "RESERVED":
      return {
        bgColor: semanticTokens.color.warningBg,
        color: semanticTokens.color.warning,
        borderColor: semanticTokens.color.warning,
      };
    case "TRANSFERRED":
      return {
        bgColor: semanticTokens.color.bgSubtle,
        color: semanticTokens.color.textSecondary,
        borderColor: semanticTokens.color.textSecondary,
      };
    default:
      return {
        bgColor: semanticTokens.color.bgSubtle,
        color: semanticTokens.color.textSecondary,
        borderColor: semanticTokens.color.borderSubtle,
      };
  }
};

export const getTransactionStatusChipProps = (
  status: TransactionStatus,
): ItemStatusChipProps => {
  switch (status) {
    case TransactionStatus.Pending:
      return {
        bgColor: semanticTokens.color.warningBg,
        color: semanticTokens.color.warning,
        borderColor: semanticTokens.color.warning,
      };
    case TransactionStatus.Approved:
      return {
        bgColor: semanticTokens.color.infoBg,
        color: semanticTokens.color.info,
        borderColor: semanticTokens.color.info,
      };
    case TransactionStatus.Transfered:
      return {
        bgColor: semanticTokens.color.infoBg,
        color: semanticTokens.color.info,
        borderColor: semanticTokens.color.info,
      };
    case TransactionStatus.Completed:
      return {
        bgColor: semanticTokens.color.successBg,
        color: semanticTokens.color.success,
        borderColor: semanticTokens.color.success,
      };
    case TransactionStatus.Cancelled:
      return {
        bgColor: semanticTokens.color.errorBg,
        color: semanticTokens.color.error,
        borderColor: semanticTokens.color.error,
      };
    default:
      return {
        bgColor: semanticTokens.color.bgSubtle,
        color: semanticTokens.color.textSecondary,
        borderColor: semanticTokens.color.borderSubtle,
      };
  }
};
