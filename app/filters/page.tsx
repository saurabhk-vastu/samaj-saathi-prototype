"use client";

import { useRouter } from "next/navigation";
import { MatchPreferencesForm } from "@/components/MatchPreferencesForm";
import { OnboardingLayout, PrimaryButton } from "@/components/ui";

export default function FiltersPage() {
  const router = useRouter();
  return (
    <OnboardingLayout
      title="What kind of matches are you looking for?"
      subtitle="Change your preferences. Your Home list will update when you save."
      step={1}
      showProgress={false}
      backHref="/home"
      footer={
        <PrimaryButton onClick={() => router.push("/home")}>Save preferences</PrimaryButton>
      }
    >
      <MatchPreferencesForm />
    </OnboardingLayout>
  );
}
