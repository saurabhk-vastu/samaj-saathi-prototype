"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useProfile } from "@/lib/store";

export default function SubscriptionsPage() {
  const { profile } = useProfile();
  const router = useRouter();
  const active = profile.hasRecharged;

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="safe-top px-3 pt-3 pb-2 shrink-0 flex items-center gap-1 border-b border-[var(--ss-line)]">
        <button
          type="button"
          onClick={() => router.push("/me")}
          className="h-9 w-9 flex items-center justify-center"
          aria-label="Back"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-[17px] font-bold">My Subscriptions</h1>
      </header>

      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 pt-4 pb-4 space-y-3">
        {active ? (
          <div className="rounded-[14px] border border-[var(--ss-line)] px-4 py-3.5">
            <Row label="Plan" value="MONTHLY" bold />
            <Row label="Valid From" value="19 Aug 2026" />
            <Row label="Valid Till" value="19 Sep 2026" />
            <Row label="Status" value="ACTIVE" valueClass="text-[var(--ss-verify)] font-bold" />
            <div className="mt-2 flex justify-end">
              <Link href="/recharge" className="text-[13px] font-semibold text-[var(--ss-primary)]">
                View Subscription &gt;
              </Link>
            </div>
          </div>
        ) : null}

        <div className="rounded-[14px] border border-[var(--ss-line)] px-4 py-3.5">
          <Row label="Plan" value="MONTHLY" bold />
          <Row label="Valid From" value="4 Aug 2026" />
          <Row label="Valid Till" value="5 Aug 2026" />
          <Row label="Status" value="CANCELLED" valueClass="font-bold" />
          <div className="mt-2 flex justify-end">
            <Link href="/recharge" className="text-[13px] font-semibold text-[var(--ss-primary)]">
              View Subscription &gt;
            </Link>
          </div>
        </div>

        {!active ? (
          <Link
            href="/recharge"
            className="mt-2 flex h-11 items-center justify-center rounded-[14px] bg-[var(--ss-primary)] text-white text-[14px] font-semibold"
          >
            Recharge now
          </Link>
        ) : null}
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  valueClass = "",
}: {
  label: string;
  value: string;
  bold?: boolean;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5 text-[13px]">
      <span className="text-[var(--ss-muted)]">{label}</span>
      <span className={`${bold ? "font-bold" : "font-semibold"} ${valueClass}`}>{value}</span>
    </div>
  );
}
