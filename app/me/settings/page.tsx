"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Legacy URL — Account Settings opens as a sheet on Profile. */
export default function AccountSettingsRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/me");
  }, [router]);
  return <div className="p-6 text-sm text-[var(--ss-muted)]">Opening Account Settings…</div>;
}
