"use client";

import { LANGUAGES } from "@/lib/constants";
import { useProfile } from "@/lib/store";

export function LanguageSheet({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { profile, patch } = useProfile();
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-black/35">
      <button type="button" className="flex-1" aria-label="Close" onClick={onClose} />
      <div className="rounded-t-[24px] bg-[var(--ss-surface)] px-5 pt-4 pb-6 safe-bottom shadow-[0_-12px_40px_rgba(0,0,0,0.12)]">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[var(--ss-line)]" />
        <p className="font-display text-[22px]">Choose language</p>
        <p className="text-[13px] text-[var(--ss-muted)] mt-1 mb-4">Select your language</p>
        <div className="grid grid-cols-2 gap-2.5 max-h-[52vh] overflow-y-auto hide-scrollbar">
          {LANGUAGES.map((l) => {
            const selected = profile.language === l.code;
            return (
              <button
                key={l.code}
                type="button"
                onClick={() => {
                  patch({ language: l.code });
                  onClose();
                }}
                className={`rounded-[16px] border px-3 py-3 text-left ${
                  selected
                    ? "border-[var(--ss-primary)] bg-[var(--ss-primary-soft)]"
                    : "border-[var(--ss-line)] bg-[var(--ss-bg)]"
                }`}
              >
                <p className="text-[16px] font-semibold">{l.label}</p>
                <p className="text-[11px] text-[var(--ss-muted)]">{l.sub}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
