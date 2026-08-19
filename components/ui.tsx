"use client";

import { useState, type ReactNode } from "react";
import { ChevronLeft, Languages, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LanguageSheet } from "@/components/LanguageSheet";

export function PrimaryButton({
  children,
  onClick,
  href,
  disabled,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}) {
  const className =
    "w-full h-[52px] rounded-[16px] bg-[var(--ss-primary)] text-white text-[15px] font-semibold tracking-[0.01em] shadow-btn disabled:bg-[var(--ss-disabled)] disabled:shadow-none disabled:text-white/80 active:scale-[0.99] transition";
  if (href && !disabled) {
    return (
      <Link href={href} className={`${className} flex items-center justify-center`}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  onClick,
  href,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}) {
  const className =
    "w-full h-[52px] rounded-[16px] border border-[var(--ss-line)] bg-[var(--ss-surface)] text-[var(--ss-ink)] text-[15px] font-semibold active:scale-[0.99]";
  if (href) {
    return (
      <Link href={href} className={`${className} flex items-center justify-center`}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export function OptionCard({
  selected,
  title,
  hint,
  icon,
  onClick,
}: {
  selected: boolean;
  title: string;
  hint?: string;
  icon?: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-[16px] px-3.5 py-3 border transition-all ${
        selected
          ? "border-[var(--ss-primary)] bg-[var(--ss-primary-soft)]"
          : "border-[var(--ss-line)] bg-[var(--ss-surface)]"
      }`}
    >
      <div className="flex items-center gap-3">
        {icon ? (
          <span
            className={`h-11 w-11 rounded-full flex items-center justify-center shrink-0 ${
              selected ? "bg-white text-[var(--ss-primary)]" : "bg-[var(--ss-primary-soft)] text-[var(--ss-primary)]"
            }`}
          >
            {icon}
          </span>
        ) : null}
        <div className="flex-1 min-w-0">
          <p className="text-[15px] font-semibold text-[var(--ss-ink)]">{title}</p>
          {hint ? <p className="text-[12px] text-[var(--ss-muted)] mt-0.5">{hint}</p> : null}
        </div>
        <span
          className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 ${
            selected
              ? "border-[var(--ss-primary)] bg-[var(--ss-primary)]"
              : "border-[var(--ss-line)] bg-white"
          }`}
        >
          {selected ? <span className="text-white text-[11px] leading-none">✓</span> : null}
        </span>
      </div>
    </button>
  );
}

export function IconTile({
  selected,
  title,
  icon,
  onClick,
}: {
  selected: boolean;
  title: string;
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[18px] border px-3 py-4 flex flex-col items-center text-center gap-2.5 min-h-[118px] ${
        selected
          ? "border-[var(--ss-primary)] bg-[var(--ss-primary-soft)]"
          : "border-[var(--ss-line)] bg-[var(--ss-surface)]"
      }`}
    >
      <span
        className={`h-12 w-12 rounded-full flex items-center justify-center ${
          selected ? "bg-white text-[var(--ss-primary)]" : "bg-[var(--ss-primary-soft)] text-[var(--ss-primary)]"
        }`}
      >
        {icon}
      </span>
      <p className="text-[13px] font-semibold leading-tight">{title}</p>
    </button>
  );
}

export function SalaryRow({
  selected,
  title,
  onClick,
}: {
  selected: boolean;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-between gap-3 py-3.5 border-b border-[var(--ss-line)] last:border-b-0 text-left"
    >
      <p className={`text-[15px] ${selected ? "font-semibold text-[var(--ss-primary)]" : "text-[var(--ss-ink)]"}`}>
        {title}
      </p>
      <span
        className={`h-[22px] w-[22px] rounded-full border-2 flex items-center justify-center shrink-0 ${
          selected ? "border-[var(--ss-primary)]" : "border-[#cfc6bb]"
        }`}
      >
        {selected ? <span className="h-2.5 w-2.5 rounded-full bg-[var(--ss-primary)]" /> : null}
      </span>
    </button>
  );
}

export function SelectionChip({
  selected,
  children,
  onClick,
}: {
  selected: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3.5 py-2 rounded-full text-[13px] font-medium border ${
        selected
          ? "bg-[var(--ss-primary)] text-white border-[var(--ss-primary)]"
          : "bg-[var(--ss-surface)] text-[var(--ss-ink)] border-[var(--ss-line)]"
      }`}
    >
      {children}
    </button>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  maxLength,
  inputMode,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type={type}
      maxLength={maxLength}
      inputMode={inputMode}
      className="w-full h-[52px] rounded-[16px] border border-[var(--ss-line)] bg-[var(--ss-surface)] px-4 text-[16px] text-[var(--ss-ink)] placeholder:text-[var(--ss-disabled)] focus:border-[var(--ss-primary)]"
    />
  );
}

export function SearchField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--ss-muted)]"
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-[52px] rounded-[16px] border border-[var(--ss-line)] bg-[var(--ss-surface)] pl-11 pr-4 text-[15px] text-[var(--ss-ink)] placeholder:text-[var(--ss-disabled)] focus:border-[var(--ss-primary)]"
      />
    </div>
  );
}

export function ProgressBar({ step, total }: { step: number; total: number }) {
  const pct = Math.min(100, Math.round((step / total) * 100));
  return (
    <div className="h-[3px] w-full rounded-full bg-[var(--ss-line)] overflow-hidden">
      <div
        className="h-full bg-[var(--ss-primary)] transition-all duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function OnboardingLayout({
  title,
  subtitle,
  children,
  footer,
  backHref,
  step,
  total = 23,
  showProgress = true,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  backHref?: string;
  step: number;
  total?: number;
  showProgress?: boolean;
}) {
  const router = useRouter();
  const [langOpen, setLangOpen] = useState(false);
  return (
    <div className="relative flex flex-col h-full ss-screen">
      <header className="safe-top px-5 pt-3 pb-3 shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <button
            type="button"
            onClick={() => (backHref ? router.push(backHref) : router.back())}
            className="ss-icon-btn"
            aria-label="Back"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex-1">
            {showProgress ? <ProgressBar step={step} total={total} /> : null}
          </div>
          <button
            type="button"
            onClick={() => setLangOpen(true)}
            className="ss-icon-btn"
            aria-label="Change language"
          >
            <Languages size={18} />
          </button>
        </div>
        <h1 className="font-display text-[28px] leading-[1.12] text-[var(--ss-ink)]">{title}</h1>
        {subtitle ? (
          <p className="text-[13px] text-[var(--ss-muted)] mt-1.5 leading-snug">{subtitle}</p>
        ) : null}
      </header>
      <div className={`flex-1 overflow-y-auto hide-scrollbar px-5 ${footer ? "pb-4" : "pb-8"}`}>
        {children}
      </div>
      {footer ? (
        <div className="px-5 pt-2 pb-1 safe-bottom bg-[var(--ss-bg)] shrink-0">{footer}</div>
      ) : null}
      <LanguageSheet open={langOpen} onClose={() => setLangOpen(false)} />
    </div>
  );
}

export function AgeRange({
  min,
  max,
  low,
  high,
  onChange,
}: {
  min: number;
  max: number;
  low: number;
  high: number;
  onChange: (low: number, high: number) => void;
}) {
  const span = max - min;
  const left = ((low - min) / span) * 100;
  const right = ((high - min) / span) * 100;
  return (
    <div>
      <div className="flex justify-between text-[13px] font-semibold mb-1">
        <span>{low} yrs</span>
        <span>{high} yrs</span>
      </div>
      <div className="age-range">
        <div className="age-track" />
        <div className="age-fill" style={{ left: `${left}%`, width: `${right - left}%` }} />
        <input
          type="range"
          min={min}
          max={max}
          value={low}
          onChange={(e) => {
            const v = Math.min(Number(e.target.value), high - 1);
            onChange(v, high);
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={high}
          onChange={(e) => {
            const v = Math.max(Number(e.target.value), low + 1);
            onChange(low, v);
          }}
        />
      </div>
    </div>
  );
}

export function PrivacyMessage({ children }: { children: React.ReactNode }) {
  return <p className="text-[12px] text-[var(--ss-muted)] leading-snug mt-3">{children}</p>;
}
