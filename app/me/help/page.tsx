"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronDown, ChevronLeft, ChevronUp } from "lucide-react";
import { PrimaryButton } from "@/components/ui";

const HELP_SECTIONS = [
  {
    id: "my-profile",
    title: "Related to my profile",
    questions: [
      "How do I start the profile creation process?",
      "Is there any verification process for my profile?",
      "Who sees my profile?",
      "Who can I see?",
    ],
  },
  {
    id: "others",
    title: "Related to others profiles/biodata",
    questions: [
      "Can I create profiles for others too?",
      "Does Samaj Sathi send/accept my biodata separately?",
      "Will Samaj Sathi App send me profile/biodata on WhatsApp?",
      "Why can't I see new people?",
      "Some profile/number is demanding money from me in the name of a social partner, what should I do?",
    ],
  },
  {
    id: "payment",
    title: "Payment related",
    questions: [
      "How do I recharge my account?",
      "What is included in the ₹1 trial?",
      "How do I cancel my subscription?",
      "My payment failed. What should I do?",
    ],
  },
  {
    id: "app",
    title: "Related to the functioning of the Samaj Saathi app",
    questions: [
      "App is not loading matches. What should I do?",
      "How do I change my language?",
      "How do I update my photos?",
      "How do I contact support?",
    ],
  },
];

const ANSWERS: Record<string, string> = {
  "How do I start the profile creation process?":
    "Open Samaj Saathi, enter your mobile number, verify OTP, choose language, and complete the biodata steps.",
  "Is there any verification process for my profile?":
    "Yes. You can verify with Government ID from Home. Verified profiles get a green tick.",
  "Who sees my profile?":
    "Profiles that match your preferences and privacy settings can see your biodata.",
  "Who can I see?":
    "You see matches based on your filter preferences (age, state, diet, and more).",
  "Can I create profiles for others too?":
    "Yes. During onboarding you can create a biodata for yourself, son, daughter, sibling, friend, or relative.",
  "Does Samaj Sathi send/accept my biodata separately?":
    "Samaj Saathi helps families exchange biodata through the app and WhatsApp, based on your consent.",
  "Will Samaj Sathi App send me profile/biodata on WhatsApp?":
    "If you opt in for WhatsApp updates, matching biodatas can be shared on WhatsApp.",
  "Why can't I see new people?":
    "Try updating filters, recharge if your trial ended, or check back later for fresh biodatas.",
  "Some profile/number is demanding money from me in the name of a social partner, what should I do?":
    "Do not pay. Report the profile from View profile → ⋮ → Report, and contact Samaj Saathi support.",
  "How do I recharge my account?":
    "Go to Home → Recharge now, or Profile → Account Settings → My Subscription.",
  "What is included in the ₹1 trial?":
    "Direct communication, who liked you, and fresh matching biodatas for 1 day, then ₹299/month.",
  "How do I cancel my subscription?":
    "Open My Subscription and manage your plan before the next billing date.",
  "My payment failed. What should I do?":
    "Retry with PhonePe / UPI. If money was deducted, contact support with the transaction ID.",
  "App is not loading matches. What should I do?":
    "Check internet, pull to refresh Home, or clear and reopen the app.",
  "How do I change my language?":
    "Profile → Change language → select a language → Update.",
  "How do I update my photos?":
    "Profile → Update Profile → Photos → Update.",
  "How do I contact support?":
    "Use Get help → Other, or WhatsApp support from Report / Get help on a profile.",
};

export default function HelpPage() {
  const router = useRouter();
  const [openSection, setOpenSection] = useState<string | null>("my-profile");
  const [openQ, setOpenQ] = useState<string | null>(null);
  const [otherChecked, setOtherChecked] = useState(true);
  const [otherText, setOtherText] = useState("");
  const [sent, setSent] = useState(false);

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
        <h1 className="text-[17px] font-bold">How can we help you?</h1>
      </header>

      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 pt-2 pb-4">
        {HELP_SECTIONS.map((section) => {
          const open = openSection === section.id;
          return (
            <div key={section.id} className="border-b border-[var(--ss-line)]">
              <button
                type="button"
                onClick={() => setOpenSection(open ? null : section.id)}
                className="w-full flex items-center justify-between gap-3 py-3.5 text-left"
              >
                <span
                  className={`text-[14px] font-semibold ${
                    open ? "underline text-[var(--ss-ink)]" : "text-[var(--ss-ink)]"
                  }`}
                >
                  {section.title}
                </span>
                {open ? (
                  <ChevronUp size={18} className="text-[var(--ss-muted)] shrink-0" />
                ) : (
                  <ChevronDown size={18} className="text-[var(--ss-muted)] shrink-0" />
                )}
              </button>
              {open ? (
                <div className="pb-2 pl-1">
                  {section.questions.map((q) => {
                    const qOpen = openQ === q;
                    return (
                      <div key={q} className="border-b border-[var(--ss-line)]/70 last:border-b-0">
                        <button
                          type="button"
                          onClick={() => setOpenQ(qOpen ? null : q)}
                          className="w-full flex items-start justify-between gap-3 py-3 text-left"
                        >
                          <span className="text-[13px] text-[var(--ss-ink)] leading-snug">{q}</span>
                          <ChevronDown
                            size={16}
                            className={`text-[var(--ss-muted)] shrink-0 mt-0.5 transition ${
                              qOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {qOpen ? (
                          <p className="text-[12px] text-[var(--ss-muted)] leading-relaxed pb-3 pr-2">
                            {ANSWERS[q] || "Our support team can help you with this."}
                          </p>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}

        <div className="mt-5">
          <button
            type="button"
            onClick={() => setOtherChecked((v) => !v)}
            className="w-full flex items-center justify-between gap-3"
          >
            <span className="text-[15px] font-bold">Other</span>
            <span
              className={`h-5 w-5 rounded-[4px] border flex items-center justify-center ${
                otherChecked
                  ? "bg-[var(--ss-primary)] border-[var(--ss-primary)] text-white"
                  : "border-[var(--ss-line)] bg-white"
              }`}
            >
              {otherChecked ? <Check size={13} strokeWidth={3} /> : null}
            </span>
          </button>
          {otherChecked ? (
            <textarea
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              rows={4}
              placeholder="Please tell us more about your problem"
              className="mt-3 w-full rounded-[14px] border border-[var(--ss-line)] bg-white px-3.5 py-3 text-[14px] placeholder:text-[var(--ss-disabled)]"
            />
          ) : null}
        </div>

        {sent ? (
          <p className="mt-4 text-center text-[13px] font-medium text-[var(--ss-verify)]">
            Thanks. Your message has been sent (prototype).
          </p>
        ) : null}
      </div>

      <div className="px-4 pt-2 safe-bottom bg-white border-t border-[var(--ss-line)] shrink-0">
        <PrimaryButton
          onClick={() => {
            setSent(true);
            window.setTimeout(() => router.push("/me"), 900);
          }}
        >
          Send
        </PrimaryButton>
      </div>
    </div>
  );
}
