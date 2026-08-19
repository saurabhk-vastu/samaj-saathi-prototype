"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronLeft, MapPin, ShieldCheck, Users } from "lucide-react";
import { useProfile } from "@/lib/store";
import { PrimaryButton } from "@/components/ui";

export default function PhonePrivacyPage() {
  const { profile, patch } = useProfile();
  const router = useRouter();
  const [locationPrivacy, setLocationPrivacy] = useState(profile.locationPrivacy || "all-india");

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="safe-top px-3 pt-3 pb-2 shrink-0 flex items-center gap-1 border-b border-[var(--ss-line)]">
        <button
          type="button"
          onClick={() => router.push("/me")}
          className="h-9 w-9 flex items-center justify-center"
          aria-label="Back"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-[17px] font-bold">Phone number privacy</h1>
      </header>

      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 pt-4 pb-4">
        <p className="text-[13px] text-[var(--ss-muted)] leading-relaxed">
          We respect your privacy and your number is only accessible to few selected profiles who
          can be a good match for you.
        </p>

        <div className="mt-6 flex items-start gap-3">
          <Users size={20} className="text-[var(--ss-primary)] mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-[15px] font-bold">According to Caste</p>
            <div className="mt-2 rounded-[14px] border border-[var(--ss-verify)]/35 bg-[var(--ss-verify-soft)] px-3 py-3 flex items-start gap-2.5">
              <span className="h-5 w-5 rounded-full bg-[var(--ss-verify)] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Check size={12} strokeWidth={3} />
              </span>
              <p className="text-[13px] text-[var(--ss-ink)] leading-snug">
                Only people from your caste can see your profile and contact you.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-[var(--ss-line)] flex items-start gap-3">
          <MapPin size={20} className="text-[var(--ss-primary)] mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-[15px] font-bold">According to location</p>
            <p className="text-[12px] text-[var(--ss-muted)] mt-1.5 leading-relaxed">
              We only show your profile to nearby location people first. Only highly matching
              profile from other state can contact you.
            </p>
            <div className="mt-3 space-y-3">
              <button
                type="button"
                onClick={() => setLocationPrivacy("all-india")}
                className="w-full flex items-start gap-3 text-left"
              >
                <span
                  className={`mt-0.5 h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    locationPrivacy === "all-india"
                      ? "border-[var(--ss-primary)]"
                      : "border-[#cfc6bb]"
                  }`}
                >
                  {locationPrivacy === "all-india" ? (
                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--ss-primary)]" />
                  ) : null}
                </span>
                <span className="text-[13px] leading-snug">
                  I am open to matches from all over India but prefer nearby matches
                </span>
              </button>
              <button
                type="button"
                onClick={() => setLocationPrivacy("nearby")}
                className="w-full flex items-start gap-3 text-left"
              >
                <span
                  className={`mt-0.5 h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    locationPrivacy === "nearby" ? "border-[var(--ss-primary)]" : "border-[#cfc6bb]"
                  }`}
                >
                  {locationPrivacy === "nearby" ? (
                    <span className="h-2.5 w-2.5 rounded-full bg-[var(--ss-primary)]" />
                  ) : null}
                </span>
                <span className="text-[13px] leading-snug">With people near to my location only</span>
              </button>
            </div>
            <button type="button" className="mt-3 text-[13px] font-medium underline text-[var(--ss-ink)]">
              More Settings
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 pt-2 safe-bottom bg-white shrink-0">
        <p className="flex items-center justify-center gap-1.5 text-[12px] text-[var(--ss-verify)] mb-3">
          <ShieldCheck size={14} />
          Your data is 100% safe with us
        </p>
        <PrimaryButton
          onClick={() => {
            patch({ locationPrivacy });
            router.push("/me");
          }}
        >
          Update
        </PrimaryButton>
      </div>
    </div>
  );
}
