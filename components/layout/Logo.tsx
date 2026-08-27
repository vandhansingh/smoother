type Props = { className?: string; compact?: boolean };

/* Wordmark + arc mark. The arc is the same gesture that runs through
   the storytelling section — signal entering, curving, resolving. */
export default function Logo({ className = '', compact = false }: Props) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden
        className="shrink-0 overflow-visible"
      >
        <path
          d="M2.5 20.5C2.5 10.5 9 3.5 17 3.5c3.4 0 6.5 1.3 6.5 1.3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="20.4" cy="18.6" r="3.4" className="fill-primary" />
      </svg>
      {!compact && (
        <span className="text-[1.0625rem] font-semibold tracking-[-0.03em]">Signalarc</span>
      )}
    </span>
  );
}
