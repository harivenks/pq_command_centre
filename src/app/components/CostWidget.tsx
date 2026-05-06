import { ThemeColors } from './theme-config';
import { ArrowUpRight } from 'lucide-react';

const savings = [
  { category: 'Rigid plastics',  value: 1100, label: '$1.1M', pct: 100 },
  { category: 'Flex laminates',  value: 820,  label: '$820K', pct: 75 },
  { category: 'Corrugated',      value: 620,  label: '$620K', pct: 56 },
  { category: 'Glass',           value: 340,  label: '$340K', pct: 31 },
];

interface Props {
  c: ThemeColors;
  selected: boolean;
  onClick: () => void;
}

export function CostWidget({ c, selected, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: selected ? c.surfaceSelected : c.surface,
        border: `1px solid ${selected ? c.borderSelected : c.border}`,
        borderRadius: 6,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'border-color 0.15s, background-color 0.15s',
      }}
      onMouseEnter={e => {
        if (!selected) (e.currentTarget as HTMLElement).style.borderColor = c.borderStrong;
      }}
      onMouseLeave={e => {
        if (!selected) (e.currentTarget as HTMLElement).style.borderColor = c.border;
      }}
    >
      {/* Header */}
      <div style={{
        padding: '10px 14px',
        borderBottom: `1px solid ${c.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {selected && (
            <span style={{ width: 3, height: 14, borderRadius: 2, backgroundColor: c.teal, display: 'inline-block' }} />
          )}
          <span style={{ fontSize: 13, fontWeight: 600, color: c.text, letterSpacing: '0.1px' }}>
            Cost Performance & Savings
          </span>
          <span style={{
            fontSize: 9, fontWeight: 600, color: c.green,
            backgroundColor: c.greenBg, padding: '2px 6px', borderRadius: 2, letterSpacing: '0.4px',
          }}>LIVE</span>
          {selected && (
            <span style={{
              fontSize: 9, fontWeight: 600, color: c.teal,
              backgroundColor: c.tealBg, padding: '2px 6px', borderRadius: 2, letterSpacing: '0.4px',
            }}>ACTIVE</span>
          )}
        </div>
        <span style={{ fontSize: 11, color: c.textMuted }}>Q2 2025</span>
      </div>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: `1px solid ${c.border}` }}>
        <div style={{ padding: '14px 16px', borderRight: `1px solid ${c.border}` }}>
          <div style={{ fontSize: 11, color: c.textMuted, marginBottom: 4, letterSpacing: '0.2px' }}>
            Portfolio vs should-cost
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: c.red, lineHeight: 1, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.5px' }}>
            +9.4%
          </div>
          <div style={{ fontSize: 11, color: c.textMuted, marginTop: 4 }}>above benchmark</div>
        </div>
        <div style={{ padding: '14px 16px' }}>
          <div style={{ fontSize: 11, color: c.textMuted, marginBottom: 4, letterSpacing: '0.2px' }}>
            Savings identified
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: c.teal, lineHeight: 1, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.5px' }}>
            $2.9M
          </div>
          <div style={{ fontSize: 11, color: c.textMuted, marginTop: 4 }}>across 4 categories</div>
        </div>
      </div>

      {/* Savings Opportunities */}
      <div style={{ padding: '12px 14px' }}>
        <div style={{ fontSize: 11, color: c.textMuted, letterSpacing: '0.3px', marginBottom: 10 }}>
          TOP SAVINGS OPPORTUNITIES
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {savings.map(s => (
            <div key={s.category}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: c.text }}>{s.category}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: c.teal, fontVariantNumeric: 'tabular-nums' }}>{s.label}</span>
              </div>
              <div style={{ height: 4, borderRadius: 2, backgroundColor: c.border, overflow: 'hidden' }}>
                <div style={{
                  width: `${s.pct}%`, height: '100%',
                  backgroundColor: c.teal, borderRadius: 2,
                  opacity: 0.75,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: '8px 14px',
        borderTop: `1px solid ${c.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 11, color: c.textMuted }}>Model coverage</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: c.textSub, fontVariantNumeric: 'tabular-nums' }}>
            68% of portfolio spend
          </span>
          <span style={{ fontSize: 11, color: c.teal, display: 'flex', alignItems: 'center', gap: 2 }}>
            View analysis <ArrowUpRight size={11} />
          </span>
        </div>
      </div>
    </div>
  );
}
