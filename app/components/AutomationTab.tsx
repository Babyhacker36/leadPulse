"use client";

import { useEffect, useRef } from "react";
import { Channel, DAILY_CAPS, QueueItem } from "@/app/types";

interface AutomationTabProps {
  queue: QueueItem[];
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  logs: string[];
  sentToday: Record<Channel, number>;
}

const STATUS_CLASSES: Record<QueueItem["status"], string> = {
  Queued: "bg-neutral-800 text-neutral-300 border-neutral-700",
  Sending: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Sent: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Skipped: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function AutomationTab({
  queue,
  isRunning,
  onStart,
  onPause,
  logs,
  sentToday,
}: AutomationTabProps) {
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const queuedCount = queue.filter((item) => item.status === "Queued").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-orange-500 block mb-1">
            Safe Auto-Outreach Queue
          </span>
          <h1 className="text-3xl font-bold tracking-tight">
            Automation Command Center
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Human-like 45–120s delays and daily volume caps keep every account
            safe from platform bans.
          </p>
        </div>
        <button
          onClick={isRunning ? onPause : onStart}
          disabled={!isRunning && queuedCount === 0}
          className={`px-6 py-3 rounded-xl font-medium text-sm transition-all shadow-lg active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap ${
            isRunning
              ? "bg-red-600 hover:bg-red-500 text-white shadow-red-600/20"
              : "bg-orange-600 hover:bg-orange-500 text-white shadow-orange-600/20"
          }`}
        >
          {isRunning ? "⏸ Pause Automation" : "▶ Start Automation"}
        </button>
      </div>

      {/* Daily Volume Caps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(Object.keys(DAILY_CAPS) as Channel[]).map((channel) => {
          const sent = sentToday[channel];
          const cap = DAILY_CAPS[channel];
          const pct = Math.min(100, Math.round((sent / cap) * 100));
          return (
            <div
              key={channel}
              className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                  {channel} Daily Cap
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {sent}/{cap}
                </span>
              </div>
              <div className="h-2 rounded-full bg-neutral-800 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    pct >= 90 ? "bg-red-500" : "bg-orange-500"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Queue Monitor */}
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-5 py-3 border-b border-neutral-800 bg-neutral-950/80">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Queue Monitor ({queue.length})
            </span>
          </div>
          <div className="max-h-96 overflow-y-auto divide-y divide-neutral-800/60">
            {queue.length === 0 ? (
              <div className="p-8 text-center text-sm text-neutral-500">
                No items queued. Add leads to the queue from the Leads tab.
              </div>
            ) : (
              queue.map((item) => (
                <div
                  key={item.id}
                  className="px-5 py-3 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">
                      {item.business}
                    </div>
                    <div className="text-xs text-neutral-500">
                      {item.channel === "Email" ? "✉️" : "💬"} {item.channel}
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border whitespace-nowrap ${STATUS_CLASSES[item.status]}`}
                  >
                    {item.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Terminal Log */}
        <div className="bg-black border border-neutral-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
          <div className="px-5 py-3 border-b border-neutral-800 bg-neutral-950/80 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 ml-2">
              safety-throttle.log
            </span>
          </div>
          <div className="p-4 h-96 overflow-y-auto font-mono text-xs text-emerald-400 space-y-1">
            {logs.map((line, index) => (
              <div key={index} className="leading-relaxed">
                {line}
              </div>
            ))}
            <div ref={logEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
