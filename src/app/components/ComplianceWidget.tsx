import { ThemeColors } from './theme-config';

const regulations = [
  {
    name: 'EU PPWR',
    subtitle: '30% PCR rigid plastic',
    detail: '14 SKUs non-compliant',
    cta: 'Act',
    ctaColor: 'red' as const,
    days: null,
  },
  {
    name: 'India EPR',
    subtitle: 'Plastic credits obligation',
    detail: 'Credit purchase required',
    cta: '60 days',
    ctaColor: 'amber' as const,
    days: 60,
  },
  {
    name: 'US FDA',
    subtitle: 'Recycled content labelling',
    detail: 'Label update required across 38 SKUs',
    cta: '120 days',
    ctaColor: 'blue' as const,
    days: 120,
  },
];

interface Props {
  c: ThemeColors;
  selected: boolean;
  onClick: () => void;
}

export function ComplianceWidget({ c, selected, onClick }: Props) {
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
        backgroundColor: c.blueBg,
        borderBottom: `1px solid ${c.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {selected && <span style={{ width: 3, height: 14, borderRadius: 2, backgroundColor: c.teal, display: 'inline-block' }} />}
          <span style={{ fontSize: 13, fontWeight: 600, color: c.text }}>Regulatory Compliance</span>
          <span style={{
            fontSize: 9, fontWeight: 600, color: c.red,
            backgroundColor: c.redBg, padding: '2px 6px', borderRadius: 2, letterSpacing: '0.4px',
          }}>3 ACTIONS</span>
          {selected && (
            <span style={{
              fontSize: 9, fontWeight: 600, color: c.teal,
              backgroundColor: c.tealBg, padding: '2px 6px', borderRadius: 2, letterSpacing: '0.4px',
            }}>ACTIVE</span>
          )}
        </div>
        <span style={{ fontSize: 11, color: c.textMuted }}>3 frameworks</span>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: `1px solid ${c.border}` }}>
        <div style={{ padding: '12px 14px', borderRight: `1px solid ${c.border}` }}>
          <div style={{ fontSize: 11, color: c.textMuted, marginBottom: 3 }}>Specs compliant</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: c.green, lineHeight: 1.1, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.5px' }}>
            421<span style={{ fontSize: 13, fontWeight: 400, color: c.textMuted }}>/492</span>
          </div>
          <div style={{ marginTop: 5, height: 3, borderRadius: 2, backgroundColor: c.border, overflow: 'hidden' }}>
            <div style={{ width: `${(421/492)*100}%`, height: '100%', backgroundColor: c.green, borderRadius: 2 }} />
          </div>
        </div>
        <div style={{ padding: '12px 14px' }}>
          <div style={{ fontSize: 11, color: c.textMuted, marginBottom: 3 }}>Action required</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: c.red, lineHeight: 1.1, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.5px' }}>
            13
          </div>
          <div style={{ fontSize: 11, color: c.textMuted, marginTop: 2 }}>specifications</div>
        </div>
      </div>

      {/* Regulation List */}
      <div>
        <div style={{ padding: '8px 14px 4px', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 11, color: c.textMuted, letterSpacing: '0.3px' }}>ACTIVE OBLIGATIONS</span>
        </div>
        {regulations.map(reg => {
          const ctaColor = c[reg.ctaColor];
          const ctaBg = c[`${reg.ctaColor}Bg` as keyof ThemeColors] as string;
          return (
            <div
              key={reg.name}
              style={{
                padding: '9px 14px',
                borderTop: `1px solid ${c.border}`,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                transition: 'background-color 0.1s',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = c.surfaceHover)}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: c.text }}>{reg.name}</span>
                  <span style={{ fontSize: 11, color: c.textMuted }}>— {reg.subtitle}</span>
                </div>
                <div style={{ fontSize: 11, color: c.textSub }}>{reg.detail}</div>
              </div>
              <span style={{
                display: 'inline-flex', alignItems: 'center', lineHeight: 1,
                fontSize: 10, fontWeight: 700, color: ctaColor,
                backgroundColor: ctaBg, padding: '3px 8px', borderRadius: 3,
                letterSpacing: '0.3px', flexShrink: 0, whiteSpace: 'nowrap',
              }}>
                {reg.cta}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
