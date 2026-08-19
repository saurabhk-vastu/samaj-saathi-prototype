"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { THREADS, getMatch } from "@/lib/matches";
import { BottomNav } from "@/components/BottomNav";

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

export default function MessagesPage() {
  const pathname = usePathname();
  const [tab, setTab] = useState<"primary" | "sent">("primary");
  const [showBanner, setShowBanner] = useState(true);

  // Every time user lands on Messages tab, show the banner again
  useEffect(() => {
    if (pathname === "/messages") {
      setShowBanner(true);
    }
  }, [pathname]);

  const list = useMemo(
    () => THREADS.filter((t) => t.folder === tab),
    [tab]
  );

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="safe-top shrink-0 bg-white">
        {showBanner ? (
          <div className="px-4 pt-3">
            <div className="rounded-[14px] bg-[#f6e08a] px-4 py-3.5 text-center">
              <p className="text-[16px] font-bold text-[var(--ss-ink)]">Your messages</p>
              <p className="text-[12px] text-[var(--ss-ink)] mt-0.5">
                Contact your matches and find your life partner
              </p>
              <button
                type="button"
                onClick={() => setShowBanner(false)}
                className="mt-3 inline-flex h-10 items-center justify-center rounded-[10px] bg-[var(--ss-primary)] px-6 text-[13px] font-semibold text-white"
              >
                Send messages
              </button>
            </div>
          </div>
        ) : null}

        <div
          className={`flex items-end gap-8 px-4 border-b border-[var(--ss-line)] ${
            showBanner ? "mt-3" : "mt-1"
          }`}
        >
          <button
            type="button"
            onClick={() => setTab("primary")}
            className={`pb-2.5 text-[15px] ${
              tab === "primary"
                ? "font-bold text-[var(--ss-ink)] border-b-2 border-[var(--ss-ink)] -mb-px"
                : "font-medium text-[#9a9288]"
            }`}
          >
            Primary
          </button>
          <button
            type="button"
            onClick={() => setTab("sent")}
            className={`pb-2.5 text-[15px] ${
              tab === "sent"
                ? "font-bold text-[var(--ss-ink)] border-b-2 border-[var(--ss-ink)] -mb-px"
                : "font-medium text-[#9a9288]"
            }`}
          >
            Sent
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto hide-scrollbar bg-white">
        {list.length === 0 ? (
          <p className="px-5 py-10 text-center text-[13px] text-[var(--ss-muted)]">
            {tab === "primary"
              ? "Conversations where both of you have messaged will appear here."
              : "Message requests you sent will appear here until they reply."}
          </p>
        ) : (
          list.map((t) => {
            const m = getMatch(t.matchId);
            if (!m) return null;
            return (
              <Link
                key={t.id}
                href={`/messages/${m.id}`}
                className="flex gap-3 px-4 py-3.5 border-b border-[var(--ss-line)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={m.photos[0]}
                  alt=""
                  className="h-12 w-12 rounded-full object-cover object-top shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-[14px] font-bold text-[var(--ss-ink)] truncate">
                      {maskName(m.name)}
                    </p>
                    <span className="text-[12px] text-[var(--ss-verify)] shrink-0">{t.time}</span>
                  </div>
                  <div className="mt-0.5 flex items-start justify-between gap-2">
                    <p className="text-[12px] text-[var(--ss-muted)] truncate flex-1">
                      {t.lastMessage}
                    </p>
                    {t.status === "rejected" ? (
                      <span className="text-[12px] font-semibold text-[var(--ss-error)] shrink-0">
                        Rejected
                      </span>
                    ) : null}
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
      <BottomNav />
    </div>
  );
}
