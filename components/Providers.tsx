"use client";

import { ProfileProvider } from "@/lib/store";
import { PhoneFrame } from "@/components/PhoneFrame";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProfileProvider>
      <PhoneFrame>{children}</PhoneFrame>
    </ProfileProvider>
  );
}
