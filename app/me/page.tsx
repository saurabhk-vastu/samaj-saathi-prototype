"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ChevronRight,
  Crown,
  FileText,
  IndianRupee,
  LogOut,
  MessageCircle,
  Phone,
  Settings,
  Trash2,
  X,
} from "lucide-react";
import { useProfile } from "@/lib/store";
import { BottomNav } from "@/components/BottomNav";
import { PhonePortal } from "@/components/PhonePortal";

function ageFromDob(dob: string) {
  if (!dob) return null;
  const d = new Date(dob);
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age -= 1;
  return age;
}

function LanguageGlyph() {
  return <span className="text-[13px] font-bold leading-none tracking-tight">अA</span>;
}

export default function MePage() {
  const { profile, reset } = useProfile();
  const router = useRouter();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const photo = profile.profilePhotos?.find(Boolean) || profile.profilePhoto;
  const age = ageFromDob(profile.dateOfBirth);
  const detailLine = [
    age != null ? `${age} years` : null,
    profile.caste || null,
    profile.motherTongue || null,
  ]
    .filter(Boolean)
    .join(", ");

  function logout() {
    setSettingsOpen(false);
    setDeleteOpen(false);
    reset();
    router.push("/");
  }

  function openSettings() {
    setDeleteOpen(false);
    setSettingsOpen(true);
  }

  return (
    <div className="relative flex flex-col h-full min-h-0 bg-[var(--ss-bg)]">
      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 pt-4 safe-top pb-4">
        <div className="flex gap-4 items-center">
          <div className="h-[96px] w-[96px] rounded-full overflow-hidden bg-[var(--ss-primary-soft)] border border-[var(--ss-line)] shrink-0 flex items-center justify-center text-[32px] font-semibold text-[var(--ss-primary)] shadow-sm">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photo} alt="" className="h-full w-full object-cover object-top" />
            ) : (
              (profile.name || "S").slice(0, 1).toUpperCase()
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-[17px] font-bold uppercase tracking-[0.02em] text-[var(--ss-ink)] truncate leading-tight">
                {profile.name || "Your name"}
              </p>
              {profile.idVerified ? (
                <span className="h-4 w-4 rounded-full bg-[var(--ss-verify)] text-white flex items-center justify-center text-[10px] shrink-0">
                  ✓
                </span>
              ) : null}
            </div>
            <p className="text-[13px] text-[var(--ss-ink)] mt-1 leading-snug">{profile.mobile || "—"}</p>
            {detailLine ? (
              <p className="text-[12px] text-[var(--ss-muted)] mt-1 leading-snug">{detailLine}</p>
            ) : null}
            {profile.city ? (
              <p className="text-[12px] text-[var(--ss-muted)] mt-0.5 leading-snug">{profile.city}</p>
            ) : null}
          </div>
        </div>

        <Link
          href="/me/edit"
          className="mt-4 flex h-11 items-center justify-center rounded-full border border-[var(--ss-line)] bg-[var(--ss-surface)] text-[14px] font-medium text-[var(--ss-ink)]"
        >
          Update Profile
        </Link>

        <Link
          href="/recharge"
          className="mt-3 flex items-center gap-3 rounded-[14px] border border-[var(--ss-primary)]/35 bg-[var(--ss-primary-soft)] px-3.5 py-3"
        >
          <span className="h-9 w-9 rounded-[10px] bg-white text-[var(--ss-primary)] flex items-center justify-center border border-[var(--ss-line)]">
            <FileText size={18} />
          </span>
          <span className="flex-1 text-[14px] font-semibold text-[var(--ss-ink)]">
            Download Premium Biodata
          </span>
          <span className="text-[11px] font-bold text-[var(--ss-primary)] border border-[var(--ss-primary)] rounded px-1.5 py-0.5">
            FREE
          </span>
        </Link>

        <div className="mt-4 rounded-[16px] border border-[var(--ss-line)] bg-[var(--ss-surface)]">
          <button
            type="button"
            onClick={() => router.push("/me/help")}
            className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-[var(--ss-line)] text-left"
          >
            <span className="h-9 w-9 rounded-full bg-[#e8f5e9] text-[#128C7E] flex items-center justify-center">
              <MessageCircle size={17} />
            </span>
            <span className="flex-1 text-[14px] font-medium">Get help</span>
            <ChevronRight size={16} className="text-[var(--ss-muted)]" />
          </button>
          <button
            type="button"
            onClick={() => router.push("/me/language")}
            className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-[var(--ss-line)] text-left"
          >
            <span className="h-9 w-9 rounded-full bg-[var(--ss-primary-soft)] text-[var(--ss-primary)] flex items-center justify-center">
              <LanguageGlyph />
            </span>
            <span className="flex-1 text-[14px] font-medium">Change language</span>
            <ChevronRight size={16} className="text-[var(--ss-muted)]" />
          </button>
          <button
            type="button"
            onClick={openSettings}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
          >
            <span className="h-9 w-9 rounded-full bg-[var(--ss-primary-soft)] text-[var(--ss-primary)] flex items-center justify-center">
              <Settings size={17} />
            </span>
            <span className="flex-1 text-[14px] font-medium">Account Settings</span>
            <ChevronRight size={16} className="text-[var(--ss-muted)]" />
          </button>
        </div>

        <Link
          href="/recharge"
          className="mt-4 block rounded-[16px] px-4 pt-3.5 pb-3"
          style={{
            background: "linear-gradient(180deg, #f7e08c 0%, #f0c45a 55%, #e8b045 100%)",
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[15px] font-bold text-[var(--ss-ink)]">Premium member</p>
              <p className="text-[13px] font-medium text-[#9a4a28] mt-0.5">Contact balance: 0</p>
            </div>
            <Crown size={28} className="text-[var(--ss-primary)] shrink-0 mt-0.5" strokeWidth={1.75} />
          </div>
          <span className="mt-3 flex h-11 w-full items-center justify-center rounded-[12px] bg-[var(--ss-primary)] text-[15px] font-semibold text-white shadow-btn">
            Recharge now
          </span>
          <p className="mt-2 text-center text-[12px] font-medium text-[var(--ss-ink)]">
            Valid till Sep 19, 2026
          </p>
        </Link>
      </div>
      <BottomNav />

      {settingsOpen ? (
        <PhonePortal>
          <div className="absolute inset-0 z-[120] flex flex-col justify-end">
            <button
              type="button"
              className="absolute inset-0 bg-black/45"
              aria-label="Close"
              onClick={() => setSettingsOpen(false)}
            />
            <div
              role="dialog"
              aria-label="Account Settings"
              className="relative z-10 rounded-t-[22px] bg-white px-2 pt-3 safe-bottom shadow-[0_-8px_30px_rgba(0,0,0,0.18)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto mb-1 h-1 w-10 rounded-full bg-[#d9d2c8]" />
              <p className="text-center text-[16px] font-bold py-2">Account Settings</p>
              <button
                type="button"
                onClick={() => {
                  setSettingsOpen(false);
                  router.push("/me/privacy");
                }}
                className="w-full flex items-center gap-3 px-4 py-4 text-left active:bg-[var(--ss-bg)]"
              >
                <Phone size={18} className="text-[var(--ss-ink)]" />
                <span className="text-[15px]">Phone number privacy</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSettingsOpen(false);
                  router.push("/me/subscriptions");
                }}
                className="w-full flex items-center gap-3 px-4 py-4 text-left active:bg-[var(--ss-bg)]"
              >
                <IndianRupee size={18} className="text-[var(--ss-ink)]" />
                <span className="text-[15px]">My Subscription</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSettingsOpen(false);
                  setDeleteOpen(true);
                }}
                className="w-full flex items-center gap-3 px-4 py-4 text-left active:bg-[var(--ss-bg)]"
              >
                <Trash2 size={18} className="text-[var(--ss-ink)]" />
                <span className="text-[15px]">Delete profile</span>
              </button>
              <button
                type="button"
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-4 text-left pb-6 active:bg-[var(--ss-bg)]"
              >
                <LogOut size={18} className="text-[var(--ss-ink)]" />
                <span className="text-[15px]">Logout</span>
              </button>
            </div>
          </div>
        </PhonePortal>
      ) : null}

      {deleteOpen ? (
        <PhonePortal>
          <div className="absolute inset-0 z-[130] flex items-center justify-center px-5">
            <button
              type="button"
              className="absolute inset-0 bg-black/45"
              aria-label="Close"
              onClick={() => setDeleteOpen(false)}
            />
            <div
              role="dialog"
              aria-label="Delete your profile"
              className="relative z-10 w-full max-w-sm rounded-[18px] bg-white p-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setDeleteOpen(false)}
                className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center text-[var(--ss-muted)]"
                aria-label="Close"
              >
                <X size={18} />
              </button>
              <h2 className="text-[17px] font-bold text-center pr-6">Delete your profile?</h2>
              <p className="mt-3 text-[13px] text-[var(--ss-ink)] leading-relaxed">
                Make your phone number private and continue searching for life partner instead?
              </p>
              <div className="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDeleteOpen(false)}
                  className="h-10 px-5 rounded-full border border-[var(--ss-line)] text-[13px] font-semibold"
                >
                  No
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="h-10 px-5 rounded-full bg-[var(--ss-primary)] text-white text-[13px] font-semibold"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </PhonePortal>
      ) : null}
    </div>
  );
}
