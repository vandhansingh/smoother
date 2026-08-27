type Props = {
  title?: string;
  meta?: string;
  tabs?: string[];
  activeTab?: number;
  onTabChange?: (i: number) => void;
  children: React.ReactNode;
  className?: string;
  tone?: 'light' | 'dark';
};

/* Shared product chrome. Deliberately quiet: a hairline frame, a
   single row of context, and no traffic-light window decoration —
   this is a product surface, not a screenshot of a browser. */
export default function Panel({
  title,
  meta,
  tabs,
  activeTab = 0,
  onTabChange,
  children,
  className = '',
  tone = 'light',
}: Props) {
  const dark = tone === 'dark';

  return (
    <div
      className={[
        'relative overflow-hidden rounded-lg border backdrop-blur-sm',
        dark
          ? 'border-white/10 bg-[#1d1916] text-bg'
          : 'border-line bg-surface text-ink shadow-panel',
        className,
      ].join(' ')}
    >
      {(title || tabs) && (
        <div
          className={[
            'flex items-center justify-between gap-4 border-b px-4 py-3 sm:px-5',
            dark ? 'border-white/10' : 'border-line',
          ].join(' ')}
        >
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-pill bg-primary" />
            {title && (
              <span className="truncate text-[0.8125rem] font-medium tracking-[-0.01em]">
                {title}
              </span>
            )}
            {meta && (
              <span
                className={[
                  'hidden truncate text-[0.75rem] sm:inline',
                  dark ? 'text-bg/45' : 'text-muted',
                ].join(' ')}
              >
                {meta}
              </span>
            )}
          </div>

          {tabs && (
            <div className="flex shrink-0 items-center gap-1" role="tablist">
              {tabs.map((tab, i) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={i === activeTab}
                  onClick={() => onTabChange?.(i)}
                  className={[
                    'relative rounded-xs px-2.5 py-1 text-[0.75rem] transition-colors duration-fast',
                    i === activeTab
                      ? dark
                        ? 'bg-white/10 text-bg'
                        : 'bg-bg-secondary text-ink'
                      : dark
                        ? 'text-bg/45 hover:text-bg/80'
                        : 'text-muted hover:text-ink',
                  ].join(' ')}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
