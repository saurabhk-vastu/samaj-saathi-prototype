import { OnboardingFlow } from "@/components/OnboardingFlow";
import { ONBOARDING_STEPS, type OnboardingStep } from "@/lib/constants";
import { redirect } from "next/navigation";

export function generateStaticParams() {
  return ONBOARDING_STEPS.map((step) => ({ step }));
}

export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;
  if (step === "city-search") redirect("/onboarding/city");
  if (step === "prefs-2") redirect("/onboarding/prefs-1");
  const typed = step as OnboardingStep;
  if (!ONBOARDING_STEPS.includes(typed)) {
    return (
      <div className="p-6 text-sm text-[var(--ss-muted)]">This step was not found.</div>
    );
  }
  return <OnboardingFlow step={typed} />;
}
