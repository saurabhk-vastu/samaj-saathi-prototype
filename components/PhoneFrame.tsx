"use client";

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-stage">
      <div className="phone-frame">
        <div className="phone-notch hidden md:block" />
        <div className="phone-screen relative">
          <div className="flex-1 min-h-0 flex flex-col">{children}</div>
        </div>
      </div>
    </div>
  );
}
