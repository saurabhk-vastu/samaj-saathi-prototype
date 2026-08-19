"use client";

import Link from "next/link";
import { Heart, Phone, ShieldCheck } from "lucide-react";
import type { MatchProfile } from "@/lib/types";
import { useProfile } from "@/lib/store";

export function VerifiedBadge({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[var(--ss-verify-soft)] text-[var(--ss-verify)] px-2 py-0.5 text-[11px] font-semibold">
      <ShieldCheck size={12} />
      {compact ? "ID Verified" : "✓ ID Verified"}
    </span>
  );
}

export function ActiveDot({ label }: { label: string }) {
  const hot = label.includes("today") || label.includes("2h");
  return (
    <span className="inline-flex items-center gap-1 text-[11px] text-[var(--ss-muted)]">
      <span className={`h-1.5 w-1.5 rounded-full ${hot ? "bg-[var(--ss-active)]" : "bg-[#c4b8a8]"}`} />
      {label}
    </span>
  );
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function MatchCard({
  match,
  from = "home",
}: {
  match: MatchProfile;
  from?: string;
}) {
  const { profile, toggleLike, markContacted } = useProfile();
  const liked = profile.likedIds.includes(match.id);

  function callMatch() {
    markContacted(match.id);
    window.location.href = `tel:+91${match.phone}`;
  }

  function whatsappMatch() {
    markContacted(match.id);
    const text = encodeURIComponent(
      `Namaste ${match.name.split(" ")[0]}, I found your profile on Samaj Saathi.`
    );
    window.open(`https://wa.me/91${match.phone}?text=${text}`, "_blank", "noopener,noreferrer");
  }

  return (
    <article className="rounded-[18px] overflow-hidden bg-[var(--ss-surface)] border border-[var(--ss-line)] shadow-card">
      <div className="relative h-[220px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={match.photos[0]} alt={match.name} className="h-full w-full object-cover object-top" />
        <button
          type="button"
          onClick={() => toggleLike(match.id)}
          className="absolute top-3 right-3 h-10 w-10 rounded-full bg-black/30 text-white flex items-center justify-center backdrop-blur-[2px]"
          aria-label="Like"
        >
          <Heart size={17} fill={liked ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[16px] font-semibold leading-tight">
              {match.name}, {match.age}
            </p>
            <p className="text-[12px] text-[var(--ss-muted)] mt-0.5">
              {match.city} · {match.occupation}
            </p>
          </div>
          {match.verified ? <VerifiedBadge compact /> : null}
        </div>
        <p className="text-[12px] text-[var(--ss-muted)] mt-1.5 leading-snug">
          {match.education} · {match.community}
        </p>
        <div className="mt-1.5">
          <ActiveDot label={match.activeLabel} />
        </div>
        <div className="mt-2.5 flex items-center gap-2">
          <button
            type="button"
            onClick={callMatch}
            className="h-10 w-10 rounded-[12px] border border-[var(--ss-line)] bg-[var(--ss-paper)] text-[var(--ss-primary)] flex items-center justify-center"
            aria-label={`Call ${match.name}`}
          >
            <Phone size={16} />
          </button>
          <button
            type="button"
            onClick={whatsappMatch}
            className="h-10 w-10 rounded-[12px] border border-[#c8e6c9] bg-[#e8f5e9] text-[#128C7E] flex items-center justify-center"
            aria-label={`WhatsApp ${match.name}`}
          >
            <WhatsAppIcon size={16} />
          </button>
          <Link
            href={`/match/${match.id}?from=${from}`}
            className="flex-1 flex h-10 items-center justify-center rounded-[12px] bg-[var(--ss-primary)] text-white text-[13px] font-semibold shadow-btn"
          >
            View profile
          </Link>
        </div>
      </div>
    </article>
  );
}

export function VerificationBanner({
  verified,
  onVerify,
}: {
  verified: boolean;
  onVerify: () => void;
}) {
  if (verified) {
    return (
      <div className="rounded-[16px] bg-[var(--ss-verify-soft)] px-4 py-3 flex items-start gap-3">
        <ShieldCheck size={18} className="mt-0.5 text-[var(--ss-verify)]" />
        <div>
          <p className="text-[13px] font-semibold text-[var(--ss-verify)]">✓ ID Verified</p>
          <p className="text-[12px] text-[var(--ss-muted)] mt-0.5">Government ID verified</p>
        </div>
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={onVerify}
      className="w-full text-left rounded-[16px] bg-[var(--ss-surface)] border border-[var(--ss-line)] px-4 py-3"
    >
      <p className="text-[13px] font-semibold">Verify with Government ID</p>
      <p className="text-[12px] text-[var(--ss-muted)] mt-0.5">Make your profile more trusted.</p>
    </button>
  );
}
