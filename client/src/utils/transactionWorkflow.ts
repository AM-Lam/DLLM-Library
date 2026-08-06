import { TransactionStatus } from "../generated/graphql";

export type TransactionWorkflowRole = "owner" | "holder" | "requestor" | "receiver" | "viewer";
export type TransactionWorkflowAction = "approve" | "handoff" | "receive" | "wait" | "cancel" | "none";

export interface TransactionWorkflowContext {
  status: TransactionStatus;
  isOwner: boolean;
  isHolder: boolean;
  isRequestor: boolean;
  isReceiver: boolean;
  isQuickExchange: boolean;
  isAdmin?: boolean;
  translate: (key: string, fallback: string) => string;
}

export interface TransactionWorkflowState {
  role: TransactionWorkflowRole;
  heading: string;
  description: string;
  severity: "info" | "warning" | "success";
  primaryAction: TransactionWorkflowAction;
  showSensitiveDetails: boolean;
}

export function buildTransactionWorkflowState(
  ctx: TransactionWorkflowContext,
): TransactionWorkflowState {
  const role: TransactionWorkflowRole = ctx.isOwner
    ? "owner"
    : ctx.isHolder
      ? "holder"
      : ctx.isRequestor
        ? "requestor"
        : ctx.isReceiver
          ? "receiver"
          : "viewer";

  const showSensitiveDetails = role !== "viewer" || Boolean(ctx.isAdmin);

  switch (role) {
    case "owner":
      if (ctx.status === TransactionStatus.Pending) {
        return {
          role,
          heading: ctx.translate("transactions.workflow.ownerPendingHeading", "Review the request"),
          description: ctx.translate(
            "transactions.workflow.ownerPendingDescription",
            "Please review the request and decide whether to proceed with the exchange.",
          ),
          severity: "warning",
          primaryAction: "approve",
          showSensitiveDetails,
        };
      }

      if (ctx.status === TransactionStatus.Approved) {
        return {
          role,
          heading: ctx.translate("transactions.workflow.ownerApprovedHeading", "Prepare for handoff"),
          description: ctx.translate(
            "transactions.workflow.ownerApprovedDescription",
            "Arrange the exchange and mark the item as transferred once it has been handed over.",
          ),
          severity: "info",
          primaryAction: "handoff",
          showSensitiveDetails,
        };
      }

      if (ctx.status === TransactionStatus.Transfered) {
        return {
          role,
          heading: ctx.translate("transactions.workflow.ownerTransferredHeading", "Waiting for receipt confirmation"),
          description: ctx.translate(
            "transactions.workflow.ownerTransferredDescription",
            "The handoff has been recorded. You are waiting for the receiver to confirm receipt.",
          ),
          severity: "info",
          primaryAction: "wait",
          showSensitiveDetails,
        };
      }

      return {
        role,
        heading: ctx.translate("transactions.workflow.ownerDefaultHeading", "Manage this transaction"),
        description: ctx.translate("transactions.workflow.ownerDefaultDescription", "You are currently managing this exchange."),
        severity: "success",
        primaryAction: "none",
        showSensitiveDetails,
      };

    case "requestor":
      if (ctx.status === TransactionStatus.Pending) {
        return {
          role,
          heading: ctx.translate("transactions.workflow.requestorPendingHeading", "Waiting for approval"),
          description: ctx.translate(
            "transactions.workflow.requestorPendingDescription",
            "Your request is under review. You can wait for the owner or cancel the request if needed.",
          ),
          severity: "warning",
          primaryAction: "wait",
          showSensitiveDetails,
        };
      }

      if (ctx.status === TransactionStatus.Transfered) {
        return {
          role,
          heading: ctx.translate("transactions.workflow.requestorTransferredHeading", "Confirm the handoff"),
          description: ctx.translate(
            "transactions.workflow.requestorTransferredDescription",
            "The item was marked as transferred. Confirm receipt to complete the exchange.",
          ),
          severity: "info",
          primaryAction: "receive",
          showSensitiveDetails,
        };
      }

      return {
        role,
        heading: ctx.translate("transactions.workflow.requestorDefaultHeading", "Track the exchange"),
        description: ctx.translate("transactions.workflow.requestorDefaultDescription", "You can follow the progress of this transaction here."),
        severity: "info",
        primaryAction: "none",
        showSensitiveDetails,
      };

    case "receiver":
      if (ctx.status === TransactionStatus.Transfered) {
        return {
          role,
          heading: ctx.translate("transactions.workflow.receiverTransferredHeading", "Complete receipt confirmation"),
          description: ctx.translate(
            "transactions.workflow.receiverTransferredDescription",
            "Please review the item and confirm receipt to complete the transaction.",
          ),
          severity: "warning",
          primaryAction: "receive",
          showSensitiveDetails,
        };
      }

      return {
        role,
        heading: ctx.translate("transactions.workflow.receiverDefaultHeading", "Follow the exchange"),
        description: ctx.translate("transactions.workflow.receiverDefaultDescription", "You are part of this transaction flow."),
        severity: "info",
        primaryAction: "none",
        showSensitiveDetails,
      };

    case "holder":
      return {
        role,
        heading: ctx.translate("transactions.workflow.holderHeading", "You are currently holding the item"),
        description: ctx.translate(
          "transactions.workflow.holderDescription",
          "You are currently responsible for the item until the exchange progresses.",
        ),
        severity: "info",
        primaryAction: "none",
        showSensitiveDetails,
      };

    default:
      return {
        role,
        heading: ctx.translate("transactions.workflow.viewerHeading", "View only"),
        description: ctx.translate(
          "transactions.workflow.viewerDescription",
          "This is a read-only view for users who are not directly involved in the transaction.",
        ),
        severity: "info",
        primaryAction: "none",
        showSensitiveDetails,
      };
  }
}
