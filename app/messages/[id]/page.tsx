"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ChevronLeft, Send } from "lucide-react";
import { THREADS, getMatch } from "@/lib/matches";
import { ActiveDot, VerifiedBadge } from "@/components/MatchCard";

const STARTERS = [
  "What are you looking for in a life partner?",
  "Would you like to know more about my family?",
  "Would you like to continue this conversation?",
];

export default function ChatDetailPage() {
  const { id } = useParams<{ id: string }>();
  const match = getMatch(id);
  const existing = THREADS.find((t) => t.matchId === id);
  const router = useRouter();
  const initial = useMemo(
    () => existing?.messages ?? [],
    [existing]
  );
  const [messages, setMessages] = useState(initial);
  const [text, setText] = useState("");

  if (!match) return <div className="p-6">Chat not found.</div>;

  function send(body: string) {
    const trimmed = body.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { from: "me", text: trimmed, time: "Now" }]);
    setText("");
  }

  return (
    <div className="flex flex-col h-full bg-[#f7f1e8]">
      <header className="safe-top px-3 pt-2 pb-2 bg-[var(--ss-paper)] border-b border-[var(--ss-line)] flex items-center gap-2">
        <button
          type="button"
          onClick={() => router.push("/messages")}
          className="h-9 w-9 rounded-full flex items-center justify-center"
          aria-label="Back to messages"
        >
          <ChevronLeft size={22} />
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={match.photos[0]} alt="" className="h-10 w-10 rounded-full object-cover" />
        <button
          type="button"
          className="flex-1 text-left min-w-0"
          onClick={() => router.push(`/match/${match.id}?from=messages`)}
        >
          <p className="text-[15px] font-semibold truncate">{match.name}</p>
          <div className="flex items-center gap-2">
            {match.verified ? <VerifiedBadge compact /> : null}
            <ActiveDot label={match.activeLabel} />
          </div>
        </button>
      </header>

      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 py-3 space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-3.5 py-2.5 text-[14px] leading-relaxed ${msg.from === "me" ? "msg-me" : "msg-them"}`}>
              {msg.text}
              <p className="text-[10px] text-[var(--ss-muted)] mt-1">{msg.time}</p>
            </div>
          </div>
        ))}
        <div className="pt-2">
          <p className="text-[11px] text-[var(--ss-muted)] mb-2">Conversation starters</p>
          <div className="flex flex-col gap-1.5">
            {STARTERS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="text-left text-[12px] px-3 py-2 rounded-full border border-[var(--ss-line)] bg-[var(--ss-paper)]"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <form
        className="px-3 pt-2 safe-bottom bg-[var(--ss-paper)] border-t border-[var(--ss-line)] flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          send(text);
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a respectful message"
          className="flex-1 h-11 rounded-full border border-[var(--ss-line)] bg-[var(--ss-ivory)] px-4 text-[14px]"
        />
        <button
          type="submit"
          className="h-11 w-11 rounded-full bg-[var(--ss-primary)] text-white flex items-center justify-center"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
