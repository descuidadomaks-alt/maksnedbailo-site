"use client";

import { useState, useEffect } from "react";

function getTimeLeft(targetMs: number) {
  const diff = Math.max(0, targetMs - Date.now());
  const totalSecs = Math.floor(diff / 1000);
  const days = Math.floor(totalSecs / 86400);
  const hours = Math.floor((totalSecs % 86400) / 3600);
  const mins = Math.floor((totalSecs % 3600) / 60);
  const secs = totalSecs % 60;
  return { days, hours, mins, secs, expired: diff === 0 };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function SlotCountdown({ targetMs }: { targetMs: number }) {
  const [tl, setTl] = useState(getTimeLeft(targetMs));

  useEffect(() => {
    const id = setInterval(() => setTl(getTimeLeft(targetMs)), 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  if (tl.expired) return null;

  return (
    <p
      className="font-sora text-fg/40 mt-3 tabular-nums"
      style={{ fontSize: "12px", fontVariantNumeric: "tabular-nums", letterSpacing: "0.04em" }}
    >
      {pad(tl.days)}d : {pad(tl.hours)}h : {pad(tl.mins)}m : {pad(tl.secs)}s
    </p>
  );
}
