"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { LANGUAGES } from "@/lib/constants";
import { useProfile } from "@/lib/store";

export default function LanguagePage() {
  const { profile, patch } = useProfile();
  const router = useRouter();

  return (
    <div className="flex flex-col h-full ss-screen">
      <header className="safe-top px-5 pt-4">
        <button type="button" onClick={() => router.push("/")} className="ss-icon-btn">
          <ChevronLeft size={20} />
        </button>
        <h1 className="font-display text-[32px] mt-6">Choose language</h1>
        <p className="text-[14px] text-[var(--ss-muted)] mt-1.5">Select your language</p>
      </header>
      <div className="flex-1 overflow-y-auto hide-scrollbar px-5 pt-5 pb-8">
        <div className="grid grid-cols-2 gap-3">
          {LANGUAGES.map((l) => {
            const selected = profile.language === l.code;
            return (
              <button
                key={l.code}
                type="button"
                onClick={() => {
                  patch({ language: l.code });
                  window.setTimeout(() => router.push("/onboarding/profile-for"), 140);
                }}
                className={`rounded-[18px] border px-3.5 py-4 text-left transition-all ${
                  selected
                    ? "border-[var(--ss-primary)] bg-[var(--ss-primary-soft)] shadow-[0_8px_18px_rgba(109,50,44,0.08)]"
                    : "border-[var(--ss-line)] bg-[var(--ss-surface)]"
                }`}
              >
                <p className="text-[18px] font-semibold leading-tight">{l.label}</p>
                <p className="text-[12px] text-[var(--ss-muted)] mt-1">{l.sub}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
