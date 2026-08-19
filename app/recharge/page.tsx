"use client";

import { useRouter } from "next/navigation";
import { useProfile } from "@/lib/store";
import { OnboardingLayout, PrimaryButton } from "@/components/ui";

export default function RechargePage() {
  const { patch } = useProfile();
  const router = useRouter();
  const benefits = [
    "Direct communication",
    "Know who liked your profile",
    "Fresh matching biodatas",
  ];

  return (
    <OnboardingLayout
      title="Become a Premium member"
      subtitle="Recharge to keep looking for your life partner"
      step={1}
      showProgress={false}
      backHref="/home"
      footer={
        <PrimaryButton
          onClick={() => {
            patch({ isPremium: true, hasRecharged: true });
            router.push("/home");
          }}
        >
          START TRIAL
        </PrimaryButton>
      }
    >
      <div className="rounded-[22px] bg-[var(--ss-surface)] border border-[var(--ss-line)] overflow-hidden mb-3">
        <div className="px-5 pt-5 pb-4 text-center bg-[var(--ss-primary-soft)]">
          <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[var(--ss-primary)]">
            Special offer
          </p>
          <p className="font-display text-[56px] leading-none mt-2 text-[var(--ss-ink)]">₹1</p>
          <p className="text-[15px] font-semibold mt-2">For 1 day, then ₹299 / month</p>
        </div>
        <div className="px-5 py-4 space-y-3">
          {benefits.map((b) => (
            <div key={b} className="flex items-center gap-3">
              <span className="h-6 w-6 rounded-full bg-[var(--ss-verify-soft)] text-[var(--ss-verify)] flex items-center justify-center text-[12px] font-bold">
                ✓
              </span>
              <p className="text-[14px]">{b}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[16px] bg-[var(--ss-surface)] border border-[var(--ss-line)] px-4 py-3.5 flex items-center gap-3">
        <div className="h-11 w-11 rounded-[12px] bg-[#5f259f] text-white text-[11px] font-bold flex items-center justify-center">
          Pe
        </div>
        <div className="flex-1">
          <p className="text-[12px] text-[var(--ss-muted)]">Pay with</p>
          <p className="text-[15px] font-semibold">PhonePe</p>
        </div>
        <span className="text-[12px] font-semibold text-[#5f259f]">UPI</span>
      </div>
    </OnboardingLayout>
  );
}
