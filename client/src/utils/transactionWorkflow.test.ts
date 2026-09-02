import { describe, it, expect } from "vitest";
import { buildTransactionWorkflowState } from "./transactionWorkflow";
import { TransactionStatus } from "../generated/graphql";

describe("buildTransactionWorkflowState", () => {
  it("returns an owner-focused next step for pending requests", () => {
    const plan = buildTransactionWorkflowState({
      status: TransactionStatus.Pending,
      isOwner: true,
      isHolder: false,
      isRequestor: false,
      isReceiver: false,
      isQuickExchange: false,
      translate: (_key, fallback) => fallback,
    });

    expect(plan.role).toBe("owner");
    expect(plan.primaryAction).toBe("approve");
    expect(plan.heading).toContain("Review");
  });

  it("returns a requestor-focused next step for transferred items", () => {
    const plan = buildTransactionWorkflowState({
      status: TransactionStatus.Transfered,
      isOwner: false,
      isHolder: false,
      isRequestor: true,
      isReceiver: false,
      isQuickExchange: false,
      translate: (_key, fallback) => fallback,
    });

    expect(plan.role).toBe("requestor");
    expect(plan.primaryAction).toBe("receive");
    expect(plan.heading).toContain("Confirm");
  });

  it("returns handoff guidance for owner on approved transaction", () => {
    const plan = buildTransactionWorkflowState({
      status: TransactionStatus.Approved,
      isOwner: true,
      isHolder: false,
      isRequestor: false,
      isReceiver: false,
      isQuickExchange: false,
      translate: (_key, fallback) => fallback,
    });

    expect(plan.role).toBe("owner");
    expect(plan.primaryAction).toBe("handoff");
    expect(plan.severity).toBe("info");
  });

  it("returns no action for requestor on completed transaction", () => {
    const plan = buildTransactionWorkflowState({
      status: TransactionStatus.Completed,
      isOwner: false,
      isHolder: false,
      isRequestor: true,
      isReceiver: false,
      isQuickExchange: false,
      translate: (_key, fallback) => fallback,
    });

    expect(plan.role).toBe("requestor");
    expect(plan.primaryAction).toBe("none");
  });

  it("hides sensitive details for uninvolved viewer", () => {
    const plan = buildTransactionWorkflowState({
      status: TransactionStatus.Pending,
      isOwner: false,
      isHolder: false,
      isRequestor: false,
      isReceiver: false,
      isQuickExchange: false,
      translate: (_key, fallback) => fallback,
    });

    expect(plan.role).toBe("viewer");
    expect(plan.showSensitiveDetails).toBe(false);
    expect(plan.severity).toBe("info");
  });

  it("shows sensitive details for admin viewer", () => {
    const plan = buildTransactionWorkflowState({
      status: TransactionStatus.Pending,
      isOwner: false,
      isHolder: false,
      isRequestor: false,
      isReceiver: false,
      isQuickExchange: false,
      isAdmin: true,
      translate: (_key, fallback) => fallback,
    });

    expect(plan.role).toBe("viewer");
    expect(plan.showSensitiveDetails).toBe(true);
  });
});
