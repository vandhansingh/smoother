type Variant = 0 | 1 | 2 | 3 | 4 | 5;

const palettes: Array<{ bg: string; mark: string; bar: string }> = [
  { bg: 'bg-primary', mark: 'bg-bg/85', bar: 'bg-bg/35' },
  { bg: 'bg-secondary', mark: 'bg-accent', bar: 'bg-bg/30' },
  { bg: 'bg-accent', mark: 'bg-ink/80', bar: 'bg-ink/25' },
  { bg: 'bg-bg-secondary', mark: 'bg-primary', bar: 'bg-ink/15' },
  { bg: 'bg-ink', mark: 'bg-accent', bar: 'bg-bg/25' },
  { bg: 'bg-primary-dark', mark: 'bg-bg/80', bar: 'bg-bg/30' },
];

/* An abstract stand-in for a creative asset: a ground, a mark and two
   type rules. Original geometry rather than stock imagery, and it
   scales from a 28px chip to a full hero tile without redrawing. */
export default function AssetTile({
  variant = 0,
  shape = 'circle',
  className = '',
  ratio = 'square',
  label,
}: {
  variant?: Variant;
  shape?: 'circle' | 'arc' | 'square' | 'bar';
  className?: string;
  ratio?: 'square' | 'portrait' | 'landscape' | 'story';
  label?: string;
}) {
  const p = palettes[variant % palettes.length];
  const aspect = {
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
    landscape: 'aspect-[16/9]',
    story: 'aspect-[9/16]',
  }[ratio];

  return (
    <div
      className={`relative isolate flex flex-col justify-end overflow-hidden rounded-sm ${p.bg} ${aspect} ${className}`}
    >
      <span
        aria-hidden
        className={[
          'absolute right-[12%] top-[12%] h-[34%] w-[34%]',
          p.mark,
          shape === 'circle' ? 'rounded-pill' : '',
          shape === 'arc' ? 'rounded-tl-pill rounded-br-pill' : '',
          shape === 'square' ? 'rounded-[2px]' : '',
          shape === 'bar' ? 'h-[10%] w-[52%] rounded-pill' : '',
        ].join(' ')}
      />
      <span aria-hidden className={`mx-[12%] mb-[9%] h-[6%] w-[62%] rounded-pill ${p.bar}`} />
      <span aria-hidden className={`mx-[12%] mb-[12%] h-[6%] w-[38%] rounded-pill ${p.bar}`} />
      {label && (
        <span className="absolute left-[12%] top-[12%] text-[0.5625rem] font-medium uppercase tracking-[0.12em] text-bg/70">
          {label}
        </span>
      )}
    </div>
  );
}
