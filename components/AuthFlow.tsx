"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Languages } from "lucide-react";
import { useProfile } from "@/lib/store";
import { PrimaryButton } from "@/components/ui";
import { LanguageSheet } from "@/components/LanguageSheet";

export function AuthFlow({ start = "phone" }: { start?: "phone" | "otp" }) {
  const { profile, patch } = useProfile();
  const [phase, setPhase] = useState<"phone" | "otp">(start);
  const [phone, setPhone] = useState(profile.mobile || "");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [resendNote, setResendNote] = useState("");
  const [langOpen, setLangOpen] = useState(false);
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const router = useRouter();
  const validPhone = /^[6-9]\d{9}$/.test(phone);

  useEffect(() => {
    if (start === "otp") setPhase("otp");
  }, [start]);

  function goOtp() {
    if (!validPhone) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    setError("");
    patch({ mobile: phone });
    setPhase("otp");
    setOtp(["", "", "", ""]);
    window.setTimeout(() => refs[0].current?.focus(), 50);
  }

  function onOtpChange(i: number, v: string) {
    const digit = v.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[i] = digit;
    setOtp(next);
    setError("");
    if (digit && i < 3) refs[i + 1].current?.focus();
    if (digit && i === 3) {
      const code = next.join("");
      if (code === "1234") {
        patch({ mobile: phone || profile.mobile });
        router.push("/language");
      } else if (code.length === 4) {
        setError("Wrong OTP. Use 1234 for this prototype.");
      }
    }
  }

  function verify() {
    if (otp.join("") === "1234") {
      patch({ mobile: phone || profile.mobile });
      router.push("/language");
    } else {
      setError("Wrong OTP. Use 1234 for this prototype.");
    }
  }

  if (phase === "phone") {
    return (
      <div className="relative flex flex-col h-full ss-screen">
        <button
          type="button"
          onClick={() => setLangOpen(true)}
          className="ss-icon-btn absolute right-5 top-4 z-10 safe-top"
          aria-label="Change language"
        >
          <Languages size={18} />
        </button>
        <div className="flex-1 px-6 pt-14 safe-top">
          <div className="ss-mark" aria-hidden>
            <span>स</span>
          </div>
          <p className="mt-8 text-[11px] tracking-[0.22em] uppercase text-[var(--ss-muted)] font-semibold">
            Samaj Saathi
          </p>
          <h1 className="font-display text-[34px] leading-[1.12] mt-2 text-[var(--ss-ink)]">
            Enter your
            <br />
            phone number
          </h1>
          <form
            className="mt-9"
            onSubmit={(e) => {
              e.preventDefault();
              goOtp();
            }}
          >
            <label className="text-[12px] font-semibold text-[var(--ss-muted)]">
              Mobile number
            </label>
            <div className="mt-2 ss-phone">
              <span>+91</span>
              <input
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                  setError("");
                }}
                inputMode="numeric"
                autoComplete="tel"
                placeholder="98765 43210"
              />
            </div>
            {error ? <p className="mt-3 text-[13px] text-[var(--ss-error)]">{error}</p> : null}
          </form>
        </div>
        <div className="px-6 pb-2 safe-bottom">
          <PrimaryButton disabled={!validPhone} onClick={goOtp}>
            Continue
          </PrimaryButton>
        </div>
        <LanguageSheet open={langOpen} onClose={() => setLangOpen(false)} />
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-full ss-screen">
      <header className="safe-top px-5 pt-4 flex items-start justify-between">
        <button
          type="button"
          onClick={() => {
            setPhase("phone");
            setError("");
          }}
          className="ss-icon-btn"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => setLangOpen(true)}
          className="ss-icon-btn"
          aria-label="Change language"
        >
          <Languages size={18} />
        </button>
      </header>
      <div className="px-5">
        <h1 className="font-display text-[32px] mt-4">Verify OTP</h1>
        <p className="text-[14px] text-[var(--ss-muted)] mt-2 leading-relaxed">
          Sent to +91 {phone || profile.mobile}. Demo OTP <strong className="text-[var(--ss-ink)]">1234</strong>
        </p>
      </div>
      <div className="flex-1 px-5 pt-8">
        <div className="flex justify-between gap-2.5">
          {otp.map((d, i) => (
            <input
              key={i}
              ref={refs[i]}
              className="otp-box"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => onOtpChange(i, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !otp[i] && i > 0) {
                  refs[i - 1].current?.focus();
                }
              }}
            />
          ))}
        </div>
        {error ? (
          <p className="mt-4 text-[13px] text-[var(--ss-error)] bg-[var(--ss-error-soft)] rounded-[12px] px-3 py-2">
            {error}
          </p>
        ) : null}
        <button
          type="button"
          className="mt-6 text-[13px] font-semibold text-[var(--ss-primary)]"
          onClick={() => setResendNote("OTP resent. Use 1234.")}
        >
          Resend OTP
        </button>
        {resendNote ? <p className="text-[12px] text-[var(--ss-muted)] mt-1">{resendNote}</p> : null}
      </div>
      <div className="px-5 pb-2 safe-bottom">
        <PrimaryButton disabled={otp.join("").length < 4} onClick={verify}>
          Verify
        </PrimaryButton>
      </div>
      <LanguageSheet open={langOpen} onClose={() => setLangOpen(false)} />
    </div>
  );
}
