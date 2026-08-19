"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import {
  AlertTriangle,
  Briefcase,
  Calendar,
  ChevronLeft,
  Heart,
  MapPin,
  MessageCircle,
  MoonStar,
  MoreVertical,
  Phone,
  Lock,
} from "lucide-react";
import { getMatch } from "@/lib/matches";
import { useProfile } from "@/lib/store";

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function Tile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[14px] border border-[var(--ss-line)] bg-white px-3 py-2.5">
      <p className="text-[11px] text-[var(--ss-muted)]">{label}</p>
      <p className="text-[13px] font-semibold text-[var(--ss-primary)] mt-0.5">{value}</p>
    </div>
  );
}

function PrefRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-2 border-b border-[var(--ss-line)] last:border-b-0">
      <p className="text-[12px] text-[var(--ss-muted)]">{label}</p>
      <p className="text-[14px] font-semibold text-[var(--ss-primary)] mt-0.5">{value}</p>
    </div>
  );
}

function MatchBody() {
  const { id } = useParams<{ id: string }>();
  const from = useSearchParams().get("from") || "home";
  const match = getMatch(id);
  const router = useRouter();
  const { profile, toggleLike, markContacted } = useProfile();
  const [astroUnlocked, setAstroUnlocked] = useState(profile.hasRecharged);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reportNote, setReportNote] = useState("");

  if (!match) {
    return <div className="p-6">Profile not found.</div>;
  }

  const liked = profile.likedIds.includes(match.id);
  const backHref =
    from === "likes" ? "/likes" : from === "messages" ? "/messages" : "/home";
  const pref = match.preferences;

  function callMatch() {
    markContacted(match!.id);
    window.location.href = `tel:+91${match!.phone}`;
  }

  function whatsappMatch() {
    markContacted(match!.id);
    const text = encodeURIComponent(
      `Namaste ${match!.name.split(" ")[0]}, I found your profile on Samaj Saathi.`
    );
    window.open(`https://wa.me/91${match!.phone}?text=${text}`, "_blank", "noopener,noreferrer");
  }

  function reportProfile() {
    setReportNote("Thanks. This profile has been reported (prototype).");
    setTimeout(() => {
      setReportNote("");
      setMenuOpen(false);
    }, 1200);
  }

  return (
    <div className="relative flex flex-col h-full bg-white">
      <div className="flex-1 overflow-y-auto hide-scrollbar pb-28">
        <div className="relative h-[300px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={match.photos[0]}
            alt=""
            className="w-full h-full object-cover object-top"
          />
          <button
            type="button"
            onClick={() => router.push(backHref)}
            className="absolute top-4 left-4 h-9 w-9 rounded-full bg-white text-[var(--ss-ink)] flex items-center justify-center shadow"
            aria-label="Back"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleLike(match.id)}
              className="h-9 w-9 rounded-full bg-white text-[var(--ss-ink)] flex items-center justify-center shadow"
              aria-label="Like"
            >
              <Heart
                size={17}
                className={liked ? "text-[var(--ss-primary)]" : ""}
                fill={liked ? "currentColor" : "none"}
              />
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="h-9 w-9 rounded-full bg-white text-[var(--ss-ink)] flex items-center justify-center shadow"
              aria-label="More options"
            >
              <MoreVertical size={17} />
            </button>
          </div>
        </div>

        <div className="px-4 pt-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <h1 className="text-[22px] font-bold text-[var(--ss-ink)] truncate">{match.name}</h1>
              {match.verified ? (
                <span className="h-4 w-4 rounded-full bg-[var(--ss-verify)] text-white flex items-center justify-center text-[10px] shrink-0">
                  ✓
                </span>
              ) : null}
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] text-[var(--ss-verify)] shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--ss-verify)]" />
              {match.activeLabel}
            </span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-[var(--ss-muted)]">
            <span className="inline-flex items-center gap-1">
              <MapPin size={13} /> {match.city}, {match.state}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar size={13} /> {match.age} years
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Tile label="Caste" value={match.community} />
            <Tile label="Mother tongue" value={match.motherTongue} />
            <Tile label="Diet" value={match.diet} />
            <Tile label="Height" value={match.height} />
            <Tile label="Profile for?" value={match.profileFor} />
            <Tile label="Marital status" value={match.maritalStatus} />
          </div>

          <section className="mt-5">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase size={16} className="text-[var(--ss-primary)]" />
              <h2 className="text-[15px] font-bold">Occupation</h2>
            </div>
            <div className="rounded-[14px] border border-[var(--ss-line)] bg-white px-4 py-3 space-y-2.5">
              <PrefRow label="Occupation" value={match.occupation} />
              <PrefRow label="Education level" value={match.education} />
              <PrefRow label="Monthly salary" value={match.salary} />
              <PrefRow label="Company location" value={match.companyLocation} />
              {match.companyName ? <PrefRow label="Company name" value={match.companyName} /> : null}
            </div>
          </section>

          <section className="mt-5">
            <div className="flex items-center gap-2 mb-2">
              <MoonStar size={16} className="text-[var(--ss-primary)]" />
              <h2 className="flex-1 text-[15px] font-bold">Astrology</h2>
              {!astroUnlocked ? (
                <button
                  type="button"
                  onClick={() => {
                    if (profile.hasRecharged) setAstroUnlocked(true);
                    else router.push("/recharge");
                  }}
                  className="text-[13px] text-[var(--ss-muted)] font-medium"
                >
                  Unlock &gt;
                </button>
              ) : null}
            </div>
            <div
              className={`rounded-[14px] border px-4 py-3 space-y-2.5 ${
                astroUnlocked
                  ? "border-[var(--ss-line)] bg-white"
                  : "border-[var(--ss-primary)]/25 bg-[var(--ss-primary-soft)]"
              }`}
            >
              {astroUnlocked ? (
                <>
                  <PrefRow label="Mangal Dosh" value={match.mangalDosh} />
                  <PrefRow label="Date of Birth" value="Shared after interest" />
                  <PrefRow label="Kundli" value={match.kundli} />
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between py-1">
                    <p className="text-[12px] text-[var(--ss-muted)]">Mangal Dosh</p>
                    <Lock size={14} />
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <p className="text-[12px] text-[var(--ss-muted)]">Date of Birth</p>
                    <Lock size={14} />
                  </div>
                </>
              )}
            </div>
          </section>

          <section className="mt-5 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Heart size={16} className="text-[var(--ss-primary)]" />
              <h2 className="text-[15px] font-bold">Preference</h2>
            </div>
            <div className="rounded-[14px] border border-[var(--ss-line)] bg-white px-4 py-2">
              <PrefRow label="Age limit" value={`${pref.ageMin} - ${pref.ageMax}`} />
              <PrefRow label="Location" value={pref.location} />
              <PrefRow label="Height" value={pref.height} />
              <PrefRow label="Diet" value={pref.diet} />
              <PrefRow label="Marital status" value={pref.maritalStatus} />
              <PrefRow label="Mother tongue" value={pref.motherTongue} />
              <PrefRow label="Mangal Dosh" value={pref.mangalDosh} />
              <PrefRow label="Occupation" value={pref.occupation} />
              <PrefRow label="Monthly salary" value={pref.monthlySalary} />
              <PrefRow label="Education level" value={pref.education} />
            </div>
          </section>

          {match.about ? (
            <section className="mb-4">
              <h2 className="text-[15px] font-bold mb-1.5">About</h2>
              <p className="text-[13px] text-[var(--ss-muted)] leading-relaxed">{match.about}</p>
            </section>
          ) : null}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-4 pt-2 pb-2 safe-bottom bg-white border-t border-[var(--ss-line)]">
        <p className="text-[12px] text-[var(--ss-muted)] mb-2">
          Like this Profile? <span className="font-semibold text-[var(--ss-ink)]">Contact Now</span>
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={callMatch}
            className="h-12 w-12 rounded-[12px] border border-[var(--ss-line)] bg-white text-[var(--ss-primary)] flex items-center justify-center"
            aria-label="Call"
          >
            <Phone size={18} />
          </button>
          <button
            type="button"
            onClick={() => router.push(`/messages/${match.id}`)}
            className="h-12 w-12 rounded-[12px] border border-[var(--ss-line)] bg-white text-[var(--ss-ink)] flex items-center justify-center"
            aria-label="Message"
          >
            <MessageCircle size={18} />
          </button>
          <button
            type="button"
            onClick={whatsappMatch}
            className="flex-1 h-12 rounded-[12px] bg-[var(--ss-primary)] text-white text-[14px] font-semibold flex items-center justify-center gap-2 shadow-btn"
          >
            <WhatsAppIcon size={18} />
            WhatsApp
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="absolute inset-0 z-40 flex flex-col justify-end">
          <button
            type="button"
            className="absolute inset-0 bg-black/45"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <div className="relative z-10 rounded-t-[22px] bg-white px-2 pt-3 safe-bottom shadow-[0_-8px_30px_rgba(0,0,0,0.18)]">
            <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-[#d9d2c8]" />
            {reportNote ? (
              <p className="px-4 py-6 text-center text-[14px] font-medium text-[var(--ss-verify)]">
                {reportNote}
              </p>
            ) : (
              <>
                <button
                  type="button"
                  onClick={reportProfile}
                  className="w-full flex items-center gap-3 px-4 py-4 text-left active:bg-[var(--ss-bg)]"
                >
                  <span className="h-10 w-10 rounded-full bg-[var(--ss-error-soft)] text-[var(--ss-error)] flex items-center justify-center">
                    <AlertTriangle size={18} />
                  </span>
                  <span className="text-[15px] font-semibold text-[var(--ss-ink)]">Report</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    router.push("/me/help");
                  }}
                  className="w-full flex items-center gap-3 px-4 py-4 text-left active:bg-[var(--ss-bg)]"
                >
                  <span className="h-10 w-10 rounded-full bg-[#e8f5e9] text-[#128C7E] flex items-center justify-center">
                    <WhatsAppIcon size={18} />
                  </span>
                  <span className="text-[15px] font-semibold text-[var(--ss-ink)]">Get help</span>
                </button>
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function MatchPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm">Loading profile…</div>}>
      <MatchBody />
    </Suspense>
  );
}
