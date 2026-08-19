"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { LANGUAGES } from "@/lib/constants";
import { useProfile } from "@/lib/store";
import { PrimaryButton } from "@/components/ui";

export default function ChangeLanguagePage() {
  const { profile, patch } = useProfile();
  const router = useRouter();
  const [selected, setSelected] = useState(profile.language || "en");

  return (
    <div className="flex flex-col h-full bg-[var(--ss-bg)]">
      <div className="flex-1 overflow-y-auto hide-scrollbar px-5 pt-10 safe-top pb-4">
        <div className="mx-auto h-14 w-14 rounded-full border-2 border-[var(--ss-primary)]/40 bg-[var(--ss-surface)] text-[var(--ss-primary)] flex items-center justify-center text-[18px] font-bold">
          अA
        </div>
        <h1 className="mt-4 text-center text-[20px] font-bold text-[var(--ss-ink)]">
          Choose your app language
        </h1>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {LANGUAGES.map((l) => {
            const on = selected === l.code;
            return (
              <button
                key={l.code}
                type="button"
                onClick={() => setSelected(l.code)}
                className={`rounded-[14px] border bg-[var(--ss-surface)] px-3 py-3.5 text-left ${
                  on ? "border-[var(--ss-primary)]" : "border-[var(--ss-line)]"
                }`}
              >
                <p className="text-[16px] font-semibold leading-tight">{l.label}</p>
                <p className="text-[12px] text-[var(--ss-muted)] mt-1">{l.sub}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-5 pt-2 safe-bottom bg-[var(--ss-bg)] shrink-0">
        <p className="flex items-center justify-center gap-1.5 text-[12px] text-[var(--ss-verify)] mb-3">
          <ShieldCheck size={14} />
          Your data is 100% safe with us
        </p>
        <PrimaryButton
          onClick={() => {
            patch({ language: selected });
            router.push("/me");
          }}
        >
          Update
        </PrimaryButton>
      </div>
    </div>
  );
}
