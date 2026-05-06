import { useState } from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { ThemeColors } from './theme-config';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';

/* ── shared tag style ─────────────────────────────────────────── */
const TAG = {
  display: 'inline-flex' as const,
  alignItems: 'center' as const,
  lineHeight: 1,
  fontWeight: 600,
  padding: '3px 8px',
  borderRadius: 3,
  letterSpacing: '0.3px',
  whiteSpace: 'nowrap' as const,
  flexShrink: 0,
};

/* ── data ─────────────────────────────────────────────────────── */
const PRICE_TREND = [
  { month: 'May', actual: 1.18, shouldCost: 1.09 },
  { month: 'Jun', actual: 1.18, shouldCost: 1.08 },
  { month: 'Jul', actual: 1.19, shouldCost: 1.07 },
  { month: 'Aug', actual: 1.20, shouldCost: 1.07 },
  { month: 'Sep', actual: 1.20, shouldCost: 1.08 },
  { month: 'Oct', actual: 1.21, shouldCost: 1.07 },
  { month: 'Nov', actual: 1.22, shouldCost: 1.07 },
  { month: 'Dec', actual: 1.22, shouldCost: 1.08 },
  { month: 'Jan', actual: 1.22, shouldCost: 1.08 },
  { month: 'Feb', actual: 1.23, shouldCost: 1.09 },
  { month: 'Mar', actual: 1.23, shouldCost: 1.10 },
  { month: 'Apr', actual: 1.23, shouldCost: 1.10 },
];

const SUPPLIERS = [
  { name: 'BASF',                spend: '$3.2M', variance: '+14.8%', opportunity: '$470K', expiry: 'Dec 2025', action: 'negotiate' },
  { name: 'Klöckner Pentaplast', spend: '$2.8M', variance: '+11.2%', opportunity: '$310K', expiry: 'Mar 2026', action: 'negotiate' },
  { name: 'Greiner Packaging',   spend: '$1.9M', variance: '+9.1%',  opportunity: '$170K', expiry: 'Jun 2026', action: 'monitor'   },
  { name: 'RPC Group',           spend: '$1.2M', variance: '+4.3%',  opportunity: '$50K',  expiry: 'Sep 2026', action: 'on-track'  },
];

const GRADE_GAPS = [
  { grade: 'HDPE (blow)',      gap: 12.1, shouldCost: 1.10, actual: 1.23 },
  { grade: 'PP (injection)',   gap: 16.2, shouldCost: 0.98, actual: 1.14 },
  { grade: 'PET (sheet)',      gap:  9.8, shouldCost: 1.42, actual: 1.56 },
  { grade: 'HDPE (injection)', gap: 11.5, shouldCost: 1.15, actual: 1.28 },
  { grade: 'PS (thermoform)',  gap:  7.3, shouldCost: 0.87, actual: 0.93 },
];

/* ── component ────────────────────────────────────────────────── */
interface Props {
  c: ThemeColors;
  onBackToCommandCentre: () => void;
  onBackToCost: () => void;
}

export function RigidPlasticsDrillDown({ c, onBackToCommandCentre, onBackToCost }: Props) {
  const [hoveredSupplier, setHoveredSupplier] = useState<string | null>(null);

  /* helpers */
  function actionStyle(action: string) {
    if (action === 'negotiate') return { color: c.red,   bg: c.redBg,   bd: c.redBd,   label: 'Negotiate now' };
    if (action === 'monitor')   return { color: c.amber, bg: c.amberBg, bd: c.amberBd, label: 'Monitor' };
    return                             { color: c.green, bg: c.greenBg, bd: c.greenBd, label: 'On track' };
  }

  const maxGap = Math.max(...GRADE_GAPS.map(g => g.gap));

  /* cost components relative to actual $1.23 */
  const COST_PARTS = [
    { label: 'Feedstock',       value: 0.61, color: c.blue  },
    { label: 'Conversion',      value: 0.33, color: c.teal  },
    { label: 'Supplier margin', value: 0.16, color: c.amber },
    { label: 'Gap (+12.1%)',    value: 0.13, color: c.red   },
  ];

  /* recharts tooltip */
  function ChartTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    return (
      <div style={{
        backgroundColor: c.surface, border: `1px solid ${c.border}`,
        borderRadius: 4, padding: '6px 10px',
      }}>
        <div style={{ fontSize: 9, color: c.textMuted, marginBottom: 4 }}>{label}</div>
        {payload.map((p: any) => (
          <div key={p.dataKey} style={{ fontSize: 11, color: p.color, fontVariantNumeric: 'tabular-nums' }}>
            {p.name}: ${p.value.toFixed(2)}/kg
          </div>
        ))}
      </div>
    );
  }

  /* card wrapper */
  const card: React.CSSProperties = {
    backgroundColor: c.surface,
    border: `1px solid ${c.border}`,
    borderRadius: 6,
    overflow: 'hidden',
  };

  const cardHead: React.CSSProperties = {
    padding: '12px 16px',
    borderBottom: `1px solid ${c.border}`,
  };

  const insightStrip = (bgColor: string): React.CSSProperties => ({
    padding: '9px 16px',
    borderTop: `1px solid ${c.border}`,
    backgroundColor: bgColor,
  });

  /* ── render ─────────────────────────────────────────────────── */
  return (
    <div>

      {/* ── Breadcrumb ─────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        marginBottom: 18, paddingBottom: 14,
        borderBottom: `1px solid ${c.border}`,
      }}>
        {[
          { label: 'Command Centre',            onClick: onBackToCommandCentre },
          { label: 'Cost Performance & Savings', onClick: onBackToCost },
        ].map((crumb, i) => (
          <span key={crumb.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {i > 0 && <ChevronRight size={11} color={c.textMuted} />}
            <button
              onClick={crumb.onClick}
              style={{
                background: 'none', border: 'none', padding: 0,
                cursor: 'pointer', fontSize: 12, color: c.textSub,
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {crumb.label}
            </button>
          </span>
        ))}
        <ChevronRight size={11} color={c.textMuted} />
        <span style={{ fontSize: 12, fontWeight: 700, color: c.teal }}>Rigid Plastics</span>
      </div>

      {/* ── Summary strip ──────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr) auto',
        backgroundColor: c.surface,
        border: `1px solid ${c.border}`,
        borderRadius: 6,
        overflow: 'hidden',
        marginBottom: 16,
      }}>
        {[
          { label: 'Category spend (annual)', value: '$9.1M',  color: c.text },
          { label: 'Actual vs should-cost',   value: '+12.1%', color: c.red  },
          { label: 'Savings opportunity',     value: '$1.1M',  color: c.teal },
          { label: 'SKUs in scope',           value: '47',     color: c.text },
        ].map((m, i, arr) => (
          <div key={m.label} style={{
            padding: '14px 18px',
            borderRight: `1px solid ${c.border}`,
          }}>
            <div style={{ fontSize: 9, color: c.textMuted, letterSpacing: '0.4px', marginBottom: 6 }}>
              {m.label.toUpperCase()}
            </div>
            <div style={{
              fontSize: 22, fontWeight: 700, color: m.color,
              fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.5px', lineHeight: 1,
            }}>
              {m.value}
            </div>
          </div>
        ))}
        {/* CTA */}
        <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center' }}>
          <button
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              backgroundColor: c.teal, color: '#fff',
              border: 'none', borderRadius: 4,
              padding: '8px 14px', cursor: 'pointer',
              fontSize: 12, fontWeight: 600,
              whiteSpace: 'nowrap', letterSpacing: '0.1px',
              transition: 'opacity 0.12s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.82')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Start negotiation prep <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* ── 2 × 2 grid ─────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>

        {/* ── Card 1 — Should-cost breakdown ─────────────── */}
        <div style={card}>
          <div style={cardHead}>
            <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 2 }}>
              Should-cost breakdown — HDPE (benchmark grade)
            </div>
            <div style={{ fontSize: 10, color: c.textMuted }}>Cost component analysis vs actual price</div>
          </div>

          <div style={{ padding: '16px' }}>
            {/* Stacked bar */}
            <div style={{ display: 'flex', height: 24, borderRadius: 3, overflow: 'hidden', marginBottom: 14 }}>
              {COST_PARTS.map(p => (
                <div
                  key={p.label}
                  style={{
                    width: `${(p.value / 1.23) * 100}%`,
                    backgroundColor: p.color,
                    opacity: p.label.startsWith('Gap') ? 0.95 : 0.75,
                  }}
                />
              ))}
            </div>

            {/* Legend rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {COST_PARTS.map(p => {
                const isGap = p.label.startsWith('Gap');
                return (
                  <div key={p.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: 1, backgroundColor: p.color, flexShrink: 0, opacity: isGap ? 1 : 0.75 }} />
                      <span style={{ fontSize: 11, color: isGap ? p.color : c.textSub }}>{p.label}</span>
                    </div>
                    <span style={{
                      fontSize: 12, fontWeight: 600,
                      color: isGap ? p.color : c.text,
                      fontVariantNumeric: 'tabular-nums',
                    }}>
                      ${p.value.toFixed(2)}/kg
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Divider + summary */}
            <div style={{ borderTop: `1px solid ${c.border}`, margin: '14px 0 12px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ fontSize: 9, color: c.textMuted, letterSpacing: '0.4px', marginBottom: 5 }}>SHOULD-COST</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: c.teal, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.5px', lineHeight: 1 }}>
                  $1.10<span style={{ fontSize: 11, fontWeight: 400, color: c.textMuted }}> /kg</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 9, color: c.textMuted, letterSpacing: '0.4px', marginBottom: 5 }}>ACTUAL PRICE</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: c.red, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.5px', lineHeight: 1 }}>
                  $1.23<span style={{ fontSize: 11, fontWeight: 400, color: c.textMuted }}> /kg</span>
                </div>
              </div>
            </div>
          </div>

          <div style={insightStrip(c.redBg)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: c.red }}>Gap: +$0.13/kg (+12.1%)</span>
              <span style={{ width: 1, height: 11, backgroundColor: c.borderStrong, flexShrink: 0 }} />
              <span style={{ fontSize: 10, color: c.textSub }}>Primary driver: supplier margin 62% above benchmark</span>
            </div>
          </div>
        </div>

        {/* ── Card 2 — Price trend ───────────────────────── */}
        <div style={card}>
          <div style={cardHead}>
            <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 8 }}>
              12-month price trend — Rigid plastics
            </div>
            {/* Legend */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <svg width="24" height="10" style={{ flexShrink: 0 }}>
                  <line x1="0" y1="5" x2="24" y2="5" stroke={c.red} strokeWidth="2.5" />
                </svg>
                <span style={{ fontSize: 10, color: c.textMuted }}>Actual price</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <svg width="24" height="10" style={{ flexShrink: 0 }}>
                  <line x1="0" y1="5" x2="24" y2="5" stroke={c.teal} strokeWidth="2" strokeDasharray="6 3" />
                </svg>
                <span style={{ fontSize: 10, color: c.textMuted }}>Should-cost</span>
              </div>
            </div>
          </div>

          <div style={{ padding: '14px 12px 10px' }}>
            <ResponsiveContainer width="100%" height={210}>
              <LineChart data={PRICE_TREND} margin={{ top: 4, right: 10, bottom: 0, left: -10 }}>
                <CartesianGrid stroke={c.chartGrid} strokeDasharray="0" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 9, fill: c.textMuted }}
                  axisLine={false} tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 9, fill: c.textMuted }}
                  axisLine={false} tickLine={false}
                  tickFormatter={v => `$${v.toFixed(2)}`}
                  ticks={[1.02, 1.08, 1.15, 1.22, 1.28]}
                  domain={[1.00, 1.30]}
                />
                <Tooltip content={<ChartTooltip />} />
                <Line
                  type="monotone"
                  dataKey="shouldCost"
                  name="Should-cost"
                  stroke={c.teal}
                  strokeWidth={2}
                  strokeDasharray="6 3"
                  dot={false}
                  activeDot={{ r: 3, fill: c.teal }}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  name="Actual"
                  stroke={c.red}
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 3, fill: c.red }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={insightStrip('transparent')}>
            <div style={{ fontSize: 10, fontWeight: 700, color: c.amber, marginBottom: 3 }}>
              Gap widening → +1.8pts over 12 months
            </div>
            <div style={{ fontSize: 10, color: c.textMuted }}>
              Feedstock declined 8.4% but supplier prices held flat → margin capture in progress
            </div>
          </div>
        </div>

        {/* ── Card 3 — Supplier comparison ──────────────── */}
        <div style={card}>
          <div style={cardHead}>
            <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 2 }}>
              Supplier comparison — Rigid plastics
            </div>
            <div style={{ fontSize: 10, color: c.textMuted }}>4 active suppliers · Click row to drill down</div>
          </div>

          {/* Table header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 70px 108px 98px 78px 110px',
            padding: '6px 16px',
            borderBottom: `1px solid ${c.border}`,
            backgroundColor: c.bg,
          }}>
            {['Supplier', 'Spend', 'vs Should-cost', 'Opportunity', 'Expiry', 'Action'].map(h => (
              <span key={h} style={{ fontSize: 9, fontWeight: 700, color: c.text, letterSpacing: '0.4px' }}>
                {h.toUpperCase()}
              </span>
            ))}
          </div>

          {SUPPLIERS.map((s, idx) => {
            const act = actionStyle(s.action);
            const isHovered = hoveredSupplier === s.name;
            return (
              <div
                key={s.name}
                onMouseEnter={() => setHoveredSupplier(s.name)}
                onMouseLeave={() => setHoveredSupplier(null)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 70px 108px 98px 78px 110px',
                  padding: '10px 16px',
                  borderBottom: idx < SUPPLIERS.length - 1 ? `1px solid ${c.border}` : 'none',
                  backgroundColor: isHovered ? c.surfaceHover : 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.1s',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 500, color: c.text }}>{s.name}</span>
                <span style={{ fontSize: 11, color: c.textSub, fontVariantNumeric: 'tabular-nums' }}>{s.spend}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: c.red,  fontVariantNumeric: 'tabular-nums' }}>{s.variance}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: c.teal, fontVariantNumeric: 'tabular-nums' }}>{s.opportunity}</span>
                <span style={{ fontSize: 10, color: c.textMuted }}>{s.expiry}</span>
                <span style={{ ...TAG, fontSize: 10, color: act.color, backgroundColor: act.bg, border: `1px solid ${act.bd}`, justifySelf: 'start' }}>
                  {act.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* ── Card 4 — Price gap by grade ───────────────── */}
        <div style={card}>
          <div style={cardHead}>
            <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 2 }}>
              Price gap by material grade
            </div>
            <div style={{ fontSize: 10, color: c.textMuted }}>Should-cost vs actual — split bar per grade</div>
          </div>

          <div style={{ padding: '14px 16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
              {GRADE_GAPS.map(g => {
                const isPriority = g.gap === maxGap;
                const barColor = isPriority ? c.red : g.gap > 10 ? c.amber : c.teal;
                const scPct = (g.shouldCost / g.actual) * 100;
                return (
                  <div key={g.grade}>
                    {/* Label row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <span style={{ fontSize: 11, color: c.text }}>{g.grade}</span>
                        {isPriority && (
                          <span style={{ ...TAG, fontSize: 9, color: c.red, backgroundColor: c.redBg, border: `1px solid ${c.redBd}` }}>
                            Priority
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 10, color: c.textMuted, fontVariantNumeric: 'tabular-nums' }}>
                          ${g.shouldCost.toFixed(2)} → ${g.actual.toFixed(2)}/kg
                        </span>
                        <span style={{
                          fontSize: 12, fontWeight: 700, color: barColor,
                          fontVariantNumeric: 'tabular-nums', minWidth: 42, textAlign: 'right',
                        }}>
                          +{g.gap}%
                        </span>
                      </div>
                    </div>
                    {/* Split bar */}
                    <div style={{ height: 5, borderRadius: 3, backgroundColor: c.border, overflow: 'hidden', display: 'flex' }}>
                      <div style={{ width: `${scPct}%`, backgroundColor: c.teal, opacity: 0.7 }} />
                      <div style={{ flex: 1, backgroundColor: barColor, opacity: 0.9 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={insightStrip('transparent')}>
            <div style={{ fontSize: 10, fontWeight: 700, color: c.red, marginBottom: 3 }}>
              PP injection shows largest gap (+16.2%)
            </div>
            <div style={{ fontSize: 10, color: c.textMuted }}>
              Recommend prioritising in next negotiation round
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}