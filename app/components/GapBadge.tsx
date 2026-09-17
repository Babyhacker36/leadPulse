interface GapBadgeProps {
  label: string;
  tone: "critical" | "warning" | "good";
}

const TONE_CLASSES: Record<GapBadgeProps["tone"], string> = {
  critical: "bg-red-500/10 text-red-400 border-red-500/20",
  warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  good: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

export default function GapBadge({ label, tone }: GapBadgeProps) {
  return (
    <span
      className={`inline-flex items-center text-[10px] font-mono px-2 py-0.5 rounded border whitespace-nowrap ${TONE_CLASSES[tone]}`}
    >
      {label}
    </span>
  );
}
