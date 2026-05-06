import { ThemeColors } from './theme-config';

const metrics = [
  { label: 'Recyclability',       value: 72,  display: '72%',  color: 'teal'  as const, positive: true  },
  { label: 'Recycled content',    value: 41,  display: '41%',  color: 'amber' as const, positive: false },
  { label: 'Carbon vs baseline',  value: 58,  display: '−58%', color: 'green' as const, positive: true  },
];

interface Props {
  c: ThemeColors;
  selected: boolean;
  onClick: () => void;
}

export function SustainabilityWidget({ c, selected, onClick }: Props) {
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
          {selected && <span style={{ width: 3, height: 14, borderRadius: 2, backgroundColor: c.teal, display: 'inline-block' }} />}
          <span style={{ fontSize: 13, fontWeight: 600, color: c.text }}>Sustainability Intelligence</span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', lineHeight: 1,
            fontSize: 9, fontWeight: 600, color: c.amber,
            backgroundColor: c.amberBg,
            border: `1px solid ${c.amberBd}`,
            padding: '2px 7px', borderRadius: 3, letterSpacing: '0.4px',
          }}>2 BEHIND TARGET</span>
          {selected && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', lineHeight: 1,
              fontSize: 9, fontWeight: 600, color: c.teal,
              backgroundColor: c.tealBg, padding: '3px 8px', borderRadius: 3, letterSpacing: '0.4px',
            }}>ACTIVE</span>
          )}
        </div>
        <span style={{ fontSize: 11, color: c.textMuted }}>FY 2025</span>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: `1px solid ${c.border}` }}>
        <div style={{ padding: '12px 14px', borderRight: `1px solid ${c.border}` }}>
          <div style={{ fontSize: 11, color: c.textMuted, marginBottom: 3 }}>Recyclability vs target</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: c.amber, lineHeight: 1.1, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.5px' }}>
            72%
          </div>
          <div style={{ fontSize: 11, color: c.textMuted, marginTop: 2 }}>target 85%</div>
        </div>
        <div style={{ padding: '12px 14px' }}>
          <div style={{ fontSize: 11, color: c.textMuted, marginBottom: 3 }}>Carbon vs baseline</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: c.green, lineHeight: 1.1, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.5px' }}>
            −58%
          </div>
          <div style={{ fontSize: 11, color: c.textMuted, marginTop: 2 }}>on track</div>
        </div>
      </div>

      {/* Metrics bars */}
      <div style={{ padding: '12px 14px' }}>
        <div style={{ fontSize: 11, color: c.textMuted, letterSpacing: '0.3px', marginBottom: 10 }}>
          SUSTAINABILITY METRICS
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {metrics.map(m => {
            const barColor = c[m.color];
            return (
              <div key={m.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: c.text }}>{m.label}</span>
                  <span style={{
                    fontSize: 12, fontWeight: 600,
                    color: barColor,
                    fontVariantNumeric: 'tabular-nums',
                  }}>{m.display}</span>
                </div>
                <div style={{ height: 4, borderRadius: 2, backgroundColor: c.border, overflow: 'hidden' }}>
                  <div style={{
                    width: `${m.value}%`, height: '100%',
                    backgroundColor: barColor, borderRadius: 2,
                    opacity: 0.8,
                  }} />
                </div>
              </div>
            );
          })}
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
        <span style={{ fontSize: 11, color: c.textMuted }}>Next milestone</span>
        <span style={{ fontSize: 11, fontWeight: 500, color: c.textSub }}>
          Science-Based Target — Q3 2025
        </span>
      </div>
    </div>
  );
}
