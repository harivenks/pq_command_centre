import { ThemeColors } from './theme-config';

const suppliers = [
  {
    name: 'Huhtamaki EU',
    category: 'Corrugated',
    status: 'critical',
    body: 'Force majeure declared. 40% of supply at risk. Alt sourcing identified within 6 weeks.',
  },
  {
    name: 'Amcor',
    category: 'Flex laminates',
    status: 'critical',
    body: 'Net debt/EBITDA crossed 4.0x threshold. Covenant breach risk flagged by credit team.',
  },
  {
    name: 'Gerresheimer',
    category: 'Glass',
    status: 'watch',
    body: 'EBITDA margin below 5% for second consecutive quarter. Capacity investment paused.',
  },
  {
    name: 'Sealed Air',
    category: 'Protective',
    status: 'opportunity',
    body: 'New capacity entering Q4. Competitive pricing expected — leverage at next renewal.',
  },
];

function getStatusStyle(status: string, c: ThemeColors) {
  if (status === 'critical')    return { color: c.red,     bg: c.redBg,    label: 'CRITICAL' };
  if (status === 'watch')       return { color: c.amber,   bg: c.amberBg,  label: 'WATCH' };
  if (status === 'opportunity') return { color: c.green,   bg: c.greenBg,  label: 'OPPORTUNITY' };
  return { color: c.textMuted, bg: c.border, label: status.toUpperCase() };
}

interface Props {
  c: ThemeColors;
  selected: boolean;
  onClick: () => void;
}

export function SupplierRiskWidget({ c, selected, onClick }: Props) {
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
        backgroundColor: c.redBg,
        borderBottom: `1px solid ${c.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {selected && (
            <span style={{ width: 3, height: 14, borderRadius: 2, backgroundColor: c.teal, display: 'inline-block' }} />
          )}
          <span style={{ fontSize: 13, fontWeight: 600, color: c.text }}>
            Supply Chain Risk & Resilience
          </span>
          <span style={{
            fontSize: 9, fontWeight: 600, color: c.red,
            backgroundColor: c.redBg, padding: '2px 6px', borderRadius: 2, letterSpacing: '0.4px',
          }}>2 CRITICAL</span>
          {selected && (
            <span style={{
              fontSize: 9, fontWeight: 600, color: c.teal,
              backgroundColor: c.tealBg, padding: '2px 6px', borderRadius: 2, letterSpacing: '0.4px',
            }}>ACTIVE</span>
          )}
        </div>
        <span style={{ fontSize: 11, color: c.textMuted }}>Live</span>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: `1px solid ${c.border}` }}>
        <div style={{ padding: '14px 16px', borderRight: `1px solid ${c.border}` }}>
          <div style={{ fontSize: 11, color: c.textMuted, marginBottom: 4 }}>Suppliers monitored</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: c.text, lineHeight: 1, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.5px' }}>
            48
          </div>
          <div style={{ fontSize: 11, color: c.textMuted, marginTop: 4 }}>active relationships</div>
        </div>
        <div style={{ padding: '14px 16px' }}>
          <div style={{ fontSize: 11, color: c.textMuted, marginBottom: 4 }}>Concentration risk</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: c.red, lineHeight: 1, letterSpacing: '-0.5px' }}>
            High
          </div>
          <div style={{ fontSize: 11, color: c.textMuted, marginTop: 4 }}>top 3 suppliers = 61%</div>
        </div>
      </div>

      {/* Supplier List */}
      <div>
        <div style={{ padding: '8px 14px 4px', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, color: c.textMuted, letterSpacing: '0.3px' }}>SUPPLIER RISK REGISTER</span>
          <span style={{ fontSize: 11, color: c.teal, cursor: 'pointer' }}>Full matrix →</span>
        </div>
        {suppliers.map(s => {
          const st = getStatusStyle(s.status, c);
          return (
            <div
              key={s.name}
              style={{
                padding: '10px 14px',
                borderTop: `1px solid ${c.border}`,
                transition: 'background-color 0.1s',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = c.surfaceHover)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: c.text }}>{s.name}</span>
                  <span style={{ fontSize: 11, color: c.textMuted }}>— {s.category}</span>
                </div>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', lineHeight: 1,
                  fontSize: 10, fontWeight: 600, color: st.color,
                  backgroundColor: st.bg, padding: '3px 8px', borderRadius: 3,
                  letterSpacing: '0.3px', flexShrink: 0, whiteSpace: 'nowrap',
                }}>{st.label}</span>
              </div>
              <p style={{ fontSize: 12, color: c.textSub, margin: 0, lineHeight: 1.45 }}>{s.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
