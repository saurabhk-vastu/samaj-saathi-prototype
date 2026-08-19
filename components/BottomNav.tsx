"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Home, MessageCircle, UserRound } from "lucide-react";

const ITEMS = [
  { href: "/home", label: "Home", Icon: Home },
  { href: "/likes", label: "Likes", Icon: Heart },
  { href: "/messages", label: "Messages", Icon: MessageCircle },
  { href: "/me", label: "Profile", Icon: UserRound },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="shrink-0 border-t border-[var(--ss-line)] bg-[var(--ss-surface)] safe-bottom">
      <div className="grid grid-cols-4 h-[64px]">
        {ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 text-[11px] font-medium ${
                active ? "text-[var(--ss-primary)]" : "text-[var(--ss-muted)]"
              }`}
            >
              <item.Icon size={21} strokeWidth={active ? 2.25 : 1.7} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
