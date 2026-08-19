"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import { MATCHES } from "@/lib/matches";
import { useProfile } from "@/lib/store";
import type { MatchPreferences } from "@/lib/types";
import { BottomNav } from "@/components/BottomNav";
import { MatchCard, VerificationBanner } from "@/components/MatchCard";

function matchesPrefs(match: (typeof MATCHES)[number], prefs: MatchPreferences) {
  if (match.age < prefs.ageMin || match.age > prefs.ageMax) return false;
  if (prefs.states?.length) {
    const selected = prefs.states.map((s) => s.toLowerCase());
    if (!selected.includes(match.state.toLowerCase())) return false;
  }
  if (
    prefs.maritalStatus &&
    prefs.maritalStatus !== "All Ok" &&
    match.maritalStatus !== prefs.maritalStatus
  ) {
    return false;
  }
  if (
    prefs.motherTongues?.length &&
    !prefs.motherTongues.includes("All Ok") &&
    !prefs.motherTongues.includes(match.motherTongue)
  ) {
    return false;
  }
  if (prefs.diet && prefs.diet !== "All Ok" && match.diet !== prefs.diet) return false;
  if (
    prefs.occupation &&
    prefs.occupation !== "All Ok" &&
    match.occupation !== prefs.occupation
  ) {
    return false;
  }
  if (
    prefs.education &&
    prefs.education !== "All Ok" &&
    match.education !== prefs.education &&
    !(prefs.educations || []).includes(match.education)
  ) {
    return false;
  }
  if (
    prefs.mangalDosh &&
    prefs.mangalDosh !== "All Ok" &&
    match.mangalDosh !== prefs.mangalDosh
  ) {
    return false;
  }
  return true;
}

function RechargeBanner() {
  return (
    <div
      className="rounded-[12px] px-3 py-2.5 flex items-center gap-2.5"
      style={{
        background: "linear-gradient(90deg, #f6e08a 0%, #f0b35a 55%, #e89a3c 100%)",
      }}
    >
      <p className="flex-1 text-[11px] font-semibold text-[#2b2118] leading-snug">
        Your recharge is over, recharge now to keep looking for life partner!
      </p>
      <Link
        href="/recharge"
        className="shrink-0 inline-flex h-8 items-center justify-center rounded-full bg-[var(--ss-primary)] px-3.5 text-[11px] font-semibold text-white"
      >
        Recharge now
      </Link>
    </div>
  );
}

export default function HomePage() {
  const { profile, patch } = useProfile();
  const [tab, setTab] = useState<"all" | "shortlisted">("all");
  const needsRecharge = !profile.hasRecharged;
  const list = useMemo(() => {
    if (tab === "shortlisted") {
      return MATCHES.filter((m) => profile.likedIds.includes(m.id));
    }
    return MATCHES.filter((m) => matchesPrefs(m, profile.matchPreferences));
  }, [tab, profile.likedIds, profile.matchPreferences]);

  return (
    <div className="flex flex-col h-full bg-[var(--ss-bg)]">
      <header className="safe-top px-4 pt-2 pb-2 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex flex-1 items-end gap-5 border-b border-[var(--ss-line)]">
            <button
              type="button"
              onClick={() => setTab("all")}
              className={`pb-2 text-[15px] font-semibold ${
                tab === "all"
                  ? "text-[var(--ss-primary)] border-b-2 border-[var(--ss-primary)] -mb-px"
                  : "text-[var(--ss-muted)]"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setTab("shortlisted")}
              className={`pb-2 text-[15px] font-semibold ${
                tab === "shortlisted"
                  ? "text-[var(--ss-primary)] border-b-2 border-[var(--ss-primary)] -mb-px"
                  : "text-[var(--ss-muted)]"
              }`}
            >
              Shortlist
            </button>
          </div>
          <Link
            href="/filters"
            className="h-9 w-9 rounded-full border border-[var(--ss-line)] bg-[var(--ss-surface)] flex items-center justify-center shrink-0"
            aria-label="Filter matches"
          >
            <SlidersHorizontal size={16} />
          </Link>
        </div>

        {needsRecharge ? (
          <div className="mt-2.5">
            <RechargeBanner />
          </div>
        ) : null}

        <p className="mt-2.5 text-[15px] font-semibold text-[var(--ss-ink)]">Your matches</p>
      </header>

      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 pb-3 space-y-3">
        {tab === "all" && !needsRecharge ? (
          <VerificationBanner
            verified={profile.idVerified}
            onVerify={() => patch({ idVerified: true })}
          />
        ) : null}
        {list.length === 0 ? (
          <p className="text-[13px] text-[var(--ss-muted)] rounded-[16px] border border-[var(--ss-line)] bg-[var(--ss-surface)] p-4">
            {tab === "shortlisted"
              ? "Profiles you like will appear here."
              : "No matches for these preferences. Try changing the filter."}
          </p>
        ) : (
          list.map((m) => <MatchCard key={m.id} match={m} from="home" />)
        )}
      </div>
      <BottomNav />
    </div>
  );
}
