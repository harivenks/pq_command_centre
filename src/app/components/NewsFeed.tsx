import { ThemeColors } from './theme-config';

const NEWS_ITEMS = [
  { tag: 'SUPPLY',        tagColor: 'red'   as const, text: 'Huhtamaki EU declares force majeure on corrugated — 40% supply disruption, alternative sourcing in progress' },
  { tag: 'PRICING',       tagColor: 'amber' as const, text: 'HDPE resin index +7.2% MoM — polyolefin markets tightening ahead of Q3 contract renewals' },
  { tag: 'REGULATORY',    tagColor: 'blue'  as const, text: 'EU PPWR PCR mandate: 30% recycled content for rigid plastic packaging required from Jan 2026' },
  { tag: 'MARKET',        tagColor: 'amber' as const, text: 'Glass packaging demand softening in EU — overcapacity emerging as brands shift to lightweight flex formats' },
  { tag: 'COMPLIANCE',    tagColor: 'blue'  as const, text: 'India EPR plastic credit prices rising — early procurement recommended for FY26 obligations' },
  { tag: 'SUPPLY',        tagColor: 'red'   as const, text: 'Amcor net debt/EBITDA crosses 4.0x — credit covenant watch status, supplier risk tier elevated to High' },
  { tag: 'LOGISTICS',     tagColor: 'amber' as const, text: 'European corrugated board lead times extending to 8–10 weeks following Huhtamaki capacity withdrawal' },
  { tag: 'SUSTAINABILITY',tagColor: 'green' as const, text: 'Science-Based Target initiative: Q3 2025 submission deadline for packaging sector commitments' },
];

interface Props { c: ThemeColors }

export function NewsFeed({ c }: Props) {
  const items = [...NEWS_ITEMS, ...NEWS_ITEMS];

  return (
    <>
      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker 60s linear infinite;
        }
        .ticker-track:hover { animation-play-state: paused; }
      `}</style>
      <div style={{
        backgroundColor: c.surface,
        borderBottom: `1px solid ${c.border}`,
        height: 32,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}>
        {/* Label pill */}
        <div style={{
          flexShrink: 0, padding: '0 12px', height: '100%',
          display: 'flex', alignItems: 'center', gap: 8,
          borderRight: `1px solid ${c.border}`, backgroundColor: c.bg,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            backgroundColor: c.amber, display: 'inline-block',
          }} />
          <span style={{ fontSize: 10, fontWeight: 600, color: c.amber, letterSpacing: '0.8px', whiteSpace: 'nowrap' }}>
            MARKET FEED
          </span>
        </div>

        {/* Scrolling track */}
        <div style={{ overflow: 'hidden', flex: 1 }}>
          <div className="ticker-track">
            {items.map((item, i) => {
              const color = c[item.tagColor];
              const bg    = c[`${item.tagColor}Bg` as keyof ThemeColors] as string;
              const bd    = c[`${item.tagColor}Bd` as keyof ThemeColors] as string;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 28 }}>
                  <span style={{
                    fontSize: 9, fontWeight: 700,
                    color,
                    backgroundColor: bg,
                    border: `1px solid ${bd}`,
                    padding: '1px 6px',
                    borderRadius: 3,
                    letterSpacing: '0.5px',
                    whiteSpace: 'nowrap',
                  }}>
                    {item.tag}
                  </span>
                  <span style={{ fontSize: 11, color: c.textSub, whiteSpace: 'nowrap' }}>
                    {item.text}
                  </span>
                  <span style={{ color: c.border, marginLeft: 8, fontSize: 10 }}>●</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}