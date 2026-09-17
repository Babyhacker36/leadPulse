"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Channel, DAILY_CAPS, QueueItem } from "@/app/types";

const MIN_DELAY_MS = 45_000;
const MAX_DELAY_MS = 120_000;
const MAX_LOG_LINES = 200;

function randomDelayMs(): number {
  return Math.floor(Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS + 1)) + MIN_DELAY_MS;
}

function timestamp(): string {
  return new Date().toLocaleTimeString([], { hour12: false });
}

export function useOutreachEngine(
  queue: QueueItem[],
  setQueue: React.Dispatch<React.SetStateAction<QueueItem[]>>
) {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    `[${timestamp()}] Outreach engine idle. Safety throttling ready (45-120s human-like delay, daily caps enforced).`,
  ]);
  const [sentToday, setSentToday] = useState<Record<Channel, number>>({
    Email: 0,
    DM: 0,
  });

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isRunningRef = useRef(isRunning);
  const queueRef = useRef(queue);
  const sentTodayRef = useRef(sentToday);
  const scheduleNextRef = useRef<() => void>(() => {});

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  useEffect(() => {
    queueRef.current = queue;
  }, [queue]);

  useEffect(() => {
    sentTodayRef.current = sentToday;
  }, [sentToday]);

  const appendLog = useCallback((line: string) => {
    setLogs((prev) => {
      const next = [...prev, `[${timestamp()}] ${line}`];
      return next.length > MAX_LOG_LINES ? next.slice(-MAX_LOG_LINES) : next;
    });
  }, []);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const scheduleNext = useCallback(() => {
    clearTimer();
    if (!isRunningRef.current) return;

    const nextItem = queueRef.current.find((item) => item.status === "Queued");
    if (!nextItem) {
      appendLog("Queue empty. Automation standing by...");
      return;
    }

    if (sentTodayRef.current[nextItem.channel] >= DAILY_CAPS[nextItem.channel]) {
      setQueue((prev) =>
        prev.map((item) =>
          item.id === nextItem.id ? { ...item, status: "Skipped" } : item
        )
      );
      appendLog(
        `Daily ${nextItem.channel} cap (${DAILY_CAPS[nextItem.channel]}) reached. Skipping "${nextItem.business}" to protect account health.`
      );
      timeoutRef.current = setTimeout(() => scheduleNextRef.current(), 250);
      return;
    }

    const delayMs = randomDelayMs();
    const delaySec = Math.round(delayMs / 1000);
    appendLog(
      `Waiting ${delaySec}s before dispatching next ${nextItem.channel} to "${nextItem.business}"... Account safe.`
    );

    timeoutRef.current = setTimeout(() => {
      if (!isRunningRef.current) return;

      setQueue((prev) =>
        prev.map((item) =>
          item.id === nextItem.id ? { ...item, status: "Sending" } : item
        )
      );
      appendLog(`Dispatching ${nextItem.channel} to "${nextItem.business}"...`);

      timeoutRef.current = setTimeout(() => {
        if (!isRunningRef.current) return;

        setQueue((prev) =>
          prev.map((item) =>
            item.id === nextItem.id
              ? { ...item, status: "Sent", sentAt: Date.now() }
              : item
          )
        );
        setSentToday((prev) => ({
          ...prev,
          [nextItem.channel]: prev[nextItem.channel] + 1,
        }));
        appendLog(`Sent ${nextItem.channel} to "${nextItem.business}". Account safe.`);

        scheduleNextRef.current();
      }, 1200);
    }, delayMs);
  }, [appendLog, clearTimer, setQueue]);

  useEffect(() => {
    scheduleNextRef.current = scheduleNext;
  }, [scheduleNext]);

  const start = useCallback(() => {
    if (isRunningRef.current) return;
    setIsRunning(true);
    isRunningRef.current = true;
    appendLog("Automation started. Human-like throttling engaged.");
    scheduleNextRef.current();
  }, [appendLog]);

  const pause = useCallback(() => {
    setIsRunning(false);
    isRunningRef.current = false;
    clearTimer();
    appendLog("Automation paused by user. Any in-flight dispatch will finish.");
  }, [appendLog, clearTimer]);

  useEffect(() => {
    if (isRunning && !timeoutRef.current) {
      const hasQueued = queue.some((item) => item.status === "Queued");
      if (hasQueued) scheduleNextRef.current();
    }
  }, [queue, isRunning]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  return {
    isRunning,
    start,
    pause,
    logs,
    sentToday,
    dailyCaps: DAILY_CAPS,
  };
}
