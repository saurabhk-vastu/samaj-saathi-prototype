"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Lock, MessageCircle, Phone } from "lucide-react";
import { MATCHES } from "@/lib/matches";
import type { MatchProfile } from "@/lib/types";
import { useProfile } from "@/lib/store";
import { BottomNav } from "@/components/BottomNav";

type LikesTab = "matches" | "views" | "contacts";

/** Prototype: these profiles have liked the current user */
const LIKED_ME_IDS = ["m2", "m3", "m5", "m7"];

/** Prototype: who viewed your profile */
const VIEWED_ME = [
  { id: "m1", seen: "Seen 20 hr ago" },
  { id: "m2", seen: "Seen 3 days ago" },
  { id: "m4", seen: "Seen 5 days ago" },
  { id: "m6", seen: "Seen 1 week ago" },
  { id: "m8", seen: "Seen 2 weeks ago" },
];

const MATCHED_AGO: Record<string, string> = {
  m1: "Matched 20 hr ago",
  m2: "Matched 3 days ago",
  m3: "Matched 5 days ago",
  m4: "Matched 1 week ago",
  m5: "Matched 2 days ago",
  m6: "Matched 13 days ago",
  m7: "Matched 4 days ago",
  m8: "Matched 6 days ago",
};

function maskName(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => {
      if (part.length <= 1) return part;
      return part[0] + "*".repeat(Math.min(part.length - 1, 5));
    })
    .join(" ");
}

function initials(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2);
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function Avatar({ match, showPhoto }: { match: MatchProfile; showPhoto?: boolean }) {
  if (showPhoto) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={match.photos[0]}
        alt=""
        className="h-12 w-12 rounded-full object-cover object-top bg-[#e8e4de] shrink-0"
      />
    );
  }
  return (
    <div className="h-12 w-12 rounded-full bg-[#e8e4de] text-[#5c564e] flex items-center justify-center text-[13px] font-semibold shrink-0">
      {initials(match.name)}
    </div>
  );
}

function LikesRow({
  match,
  status,
  showCall = true,
  showPhoto = false,
}: {
  match: MatchProfile;
  status: string;
  showCall?: boolean;
  showPhoto?: boolean;
}) {
  const { markContacted } = useProfile();

  function callMatch(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    markContacted(match.id);
    window.location.href = `tel:+91${match.phone}`;
  }

  function whatsappMatch(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    markContacted(match.id);
    const text = encodeURIComponent(
      `Namaste ${match.name.split(" ")[0]}, I found your profile on Samaj Saathi.`
    );
    window.open(`https://wa.me/91${match.phone}?text=${text}`, "_blank", "noopener,noreferrer");
  }

  return (
    <Link
      href={`/match/${match.id}?from=likes`}
      className="flex gap-3 px-4 py-3.5 border-b border-[var(--ss-line)]"
    >
      <Avatar match={match} showPhoto={showPhoto} />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <p className="text-[14px] font-bold text-[var(--ss-ink)] truncate">
              {maskName(match.name)}
            </p>
            {match.verified ? (
              <span className="h-3.5 w-3.5 rounded-full bg-[var(--ss-verify)] text-white flex items-center justify-center text-[8px] shrink-0">
                ✓
              </span>
            ) : null}
          </div>
          <Lock size={15} className="text-[#9a9288] shrink-0 mt-0.5" />
        </div>
        <p className="text-[12px] text-[var(--ss-muted)] mt-0.5">
          {match.age} years, {match.community}, {match.motherTongue}
        </p>
        <p className="text-[12px] text-[var(--ss-muted)]">
          {match.city}, {match.state}
        </p>
        <div className="mt-1.5 flex items-end justify-between gap-2">
          <p className="text-[11px] text-[var(--ss-muted)]">{status}</p>
          {showCall ? (
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={callMatch}
                className="h-7 w-7 rounded-full border border-[#c8e6c9] text-[#2e7d32] flex items-center justify-center"
                aria-label="Call"
              >
                <Phone size={13} />
              </button>
              <button
                type="button"
                onClick={whatsappMatch}
                className="h-7 w-7 rounded-full border border-[#c8e6c9] text-[#128C7E] flex items-center justify-center"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon size={14} />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

export default function LikesPage() {
  const { profile } = useProfile();
  const [tab, setTab] = useState<LikesTab>("matches");

  const matchesList = useMemo(() => {
    const ids = new Set([...profile.likedIds, ...LIKED_ME_IDS]);
    return MATCHES.filter((m) => ids.has(m.id));
  }, [profile.likedIds]);

  const viewsList = useMemo(() => {
    return VIEWED_ME.map((v) => {
      const match = MATCHES.find((m) => m.id === v.id);
      return match ? { match, seen: v.seen } : null;
    }).filter(Boolean) as { match: MatchProfile; seen: string }[];
  }, []);

  const contactsList = useMemo(
    () => MATCHES.filter((m) => profile.contactedIds.includes(m.id)),
    [profile.contactedIds]
  );

  const viewCount = 41;
  const topViewer = viewsList[0]?.match;

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="safe-top shrink-0 bg-white">
        <div className="flex items-end gap-6 px-4 pt-2 border-b border-[var(--ss-line)]">
          {(
            [
              ["matches", "Matches"],
              ["views", "Views"],
              ["contacts", "Contacts"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`pb-2.5 text-[15px] ${
                tab === id
                  ? "font-bold text-[var(--ss-ink)] border-b-2 border-[var(--ss-primary)] -mb-px"
                  : "font-medium text-[#9a9288]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "matches" ? (
          <div className="bg-[#f8e9e6] px-4 py-2 text-center text-[12px] text-[var(--ss-primary)]">
            Find your matches here
          </div>
        ) : null}
        {tab === "views" ? (
          <div className="bg-[#f8e9e6] px-4 py-2 text-center text-[12px] text-[var(--ss-primary)]">
            Find who viewed your profile here
          </div>
        ) : null}
        {tab === "contacts" ? (
          <div className="bg-[#f8e9e6] px-4 py-2 text-[12px] text-[var(--ss-muted)]">
            Profiles you contacted
          </div>
        ) : null}
      </header>

      <div className="flex-1 overflow-y-auto hide-scrollbar bg-white">
        {tab === "matches" ? (
          matchesList.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-[14px] text-[var(--ss-muted)]">
                Profiles you like, or who like you, will appear here.
              </p>
              <Link
                href="/home"
                className="mt-4 inline-flex h-10 items-center justify-center rounded-full border border-[var(--ss-line)] px-5 text-[13px] font-medium"
              >
                Find matches
              </Link>
            </div>
          ) : (
            matchesList.map((m) => (
              <LikesRow
                key={m.id}
                match={m}
                status={MATCHED_AGO[m.id] || "Matched recently"}
                showCall
              />
            ))
          )
        ) : null}

        {tab === "views" ? (
          <>
            <div className="mx-4 mt-3 mb-2 rounded-[14px] bg-[#f6e08a] px-3.5 py-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[14px] font-bold text-[var(--ss-ink)]">Profile views</p>
                    <p className="text-[16px] font-bold text-[var(--ss-verify)]">{viewCount}</p>
                  </div>
                  <p className="text-[12px] text-[var(--ss-ink)] mt-1 leading-snug">
                    {topViewer ? maskName(topViewer.name) : "Someone"} and {viewCount - 1} people
                    have viewed your profile
                  </p>
                </div>
                <div className="flex -space-x-2 shrink-0 pt-1">
                  {viewsList.slice(0, 3).map(({ match }) => (
                    <div
                      key={match.id}
                      className="h-8 w-8 rounded-full border-2 border-[#f6e08a] bg-[#dbeafe] text-[10px] font-semibold text-[#1e40af] flex items-center justify-center overflow-hidden"
                    >
                      {initials(match.name)}
                    </div>
                  ))}
                </div>
              </div>
              <Link
                href="/recharge"
                className="mt-3 flex h-10 items-center justify-center rounded-[10px] bg-[var(--ss-primary)] text-white text-[13px] font-semibold"
              >
                Know who viewed your profile!
              </Link>
            </div>
            {viewsList.map(({ match, seen }, i) => (
              <LikesRow
                key={match.id}
                match={match}
                status={seen}
                showCall={false}
                showPhoto={i === 0}
              />
            ))}
          </>
        ) : null}

        {tab === "contacts" ? (
          contactsList.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 pt-24 pb-10 text-center">
              <p className="text-[15px] text-[var(--ss-muted)]">
                Start connecting with people you like
              </p>
              <Link
                href="/home"
                className="mt-4 inline-flex h-10 items-center gap-2 rounded-full border border-[var(--ss-line)] bg-white px-5 text-[13px] font-medium text-[var(--ss-ink)]"
              >
                <MessageCircle size={15} />
                Find matches
              </Link>
            </div>
          ) : (
            contactsList.map((m) => (
              <LikesRow
                key={m.id}
                match={m}
                status="Contact shared"
                showCall
                showPhoto
              />
            ))
          )
        ) : null}
      </div>
      <BottomNav />
    </div>
  );
}
