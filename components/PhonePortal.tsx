"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/** Renders children inside `.phone-screen` so overlays sit above BottomNav and are not clipped. */
export function PhonePortal({ children }: { children: React.ReactNode }) {
  const [mount, setMount] = useState<Element | null>(null);

  useEffect(() => {
    setMount(document.querySelector(".phone-screen"));
  }, []);

  if (!mount) return null;
  return createPortal(children, mount);
}
