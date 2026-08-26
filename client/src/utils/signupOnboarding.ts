import { deleteCookie, getCookie, setCookie } from "./cookies";

export const SIGNUP_ONBOARDING_COOKIE = "dllm_signup_onboarding_pending";

export function markSignupOnboardingPending(): void {
  setCookie(SIGNUP_ONBOARDING_COOKIE, "true", {
    expires: 1,
    sameSite: "Lax",
  });
}

export function hasPendingSignupOnboarding(): boolean {
  return getCookie(SIGNUP_ONBOARDING_COOKIE) === "true";
}

export function clearPendingSignupOnboarding(): void {
  deleteCookie(SIGNUP_ONBOARDING_COOKIE);
}
