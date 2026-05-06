import { useState } from 'react';
import { ChevronRight, TrendingUp, TrendingDown, Minus, ArrowUpRight } from 'lucide-react';
import { ThemeColors } from './theme-config';

const CATEGORIES = [
  {
    id: 'rigid-plastics',
    name: 'Rigid plastics',
    variance: '+12.3%',
    varDir: 'above',
    opportunity: '$1.1M',
    trend: 'up',
    status: 'act-now',
  },
  {
    id: 'flex-laminates',
    name: 'Flex laminates',
    variance: '+8.7%',
    varDir: 'above',
    opportunity: '$820K',
    trend: 'up',
    status: 'act-now',
  },
  {
    id: 'corrugated',
    name: 'Corrugated',
    variance: '+6.2%',
    varDir: 'above',
    opportunity: '$620K',
    trend: 'flat',
    status: 'monitor',
  },
  {
    id: 'glass',
    name: 'Glass',
    variance: '+4.1%',
    varDir: 'above',
    opportunity: '$340K',
    trend: 'down',
    status: 'monitor',
  },
  {
    id: 'aluminium-foil',
    name: 'Aluminium foil',
    variance: '+2.8%',
    varDir: 'above',
    opportunity: '$210K',
    trend: 'down',
    status: 'monitor',
  },
  {
    id: 'metal-closures',
    name: 'Metal closures',
    variance: '−0.3%',
    varDir: 'below',
    opportunity: '—',
    trend: 'down',
    status: 'on-track',
  },
];

const PIPELINE = [
  {
    id: 'hdpe-gap',
    title: 'HDPE resin — should-cost gap closure',
    category: 'Rigid plastics',
    supplier: 'BASF',
    type: 'should-cost gap',
    progress: 68,
    value: '$680K',
    status: 'active',
  },
  {
    id: 'flex-renegotiation',
    title: 'Flex laminates contract renegotiation',
    category: 'Flex laminates',
    supplier: 'Amcor',
    type: 'contract renegotiation',
    progress: 45,
    value: '$370K',
    status: 'in-progress',
  },
  {
    id: 'pp-bottle',
    title: 'PP bottle specification optimisation',
    category: 'Rigid plastics',
    supplier: 'Berry Global',
    type: 'specification change',
    progress: 31,
    value: '$290K',
    status: 'active',
  },
  {
    id: 'corrugated-alt',
    title: 'Corrugated alternate sourcing',
    category: 'Corrugated',
    supplier: 'DS Smith',
    type: 'alternate sourcing',
    progress: 58,
    value: '$420K',
    status: 'scoping',
  },
  {
    id: 'pet-sheet',
    title: 'PET sheet contract conversion',
    category: 'Rigid plastics',
    supplier: 'Klöckner Pentaplast',
    type: 'contract renegotiation',
    progress: 22,
    value: '$180K',
    status: 'active',
  },
];

const FILTER_CHIPS = [
  { id: 'all',              label: 'All' },
  { id: 'should-cost gap',  label: 'Should-cost gap' },
  { id: 'contract renegotiation', label: 'Contract renegotiation' },
  { id: 'specification change', label: 'Specification change' },
  { id: 'alternate sourcing', label: 'Alternate sourcing' },
];

function getStatusStyle(status: string, c: ThemeColors) {
  if (status === 'act-now')    return { color: c.red,   bg: c.redBg,   bd: c.redBd,   label: 'Act now' };
  if (status === 'monitor')    return { color: c.amber, bg: c.amberBg, bd: c.amberBd, label: 'Monitor' };
  if (status === 'on-track')   return { color: c.green, bg: c.greenBg, bd: c.greenBd, label: 'On track' };
  return { color: c.textMuted, bg: c.border, bd: c.border, label: status };
}

function getPipelineStatusStyle(status: string, c: ThemeColors) {
  if (status === 'active')      return { color: c.teal,  bg: c.tealBg,  bd: c.tealBd,  label: 'Active' };
  if (status === 'in-progress') return { color: c.amber, bg: c.amberBg, bd: c.amberBd, label: 'In progress' };
  if (status === 'scoping')     return { color: c.blue,  bg: c.blueBg,  bd: c.blueBd,  label: 'Scoping' };
  return { color: c.textMuted,  bg: c.border, bd: c.border, label: status };
}

const TAG = {
  display: 'inline-flex' as const,
  alignItems: 'center' as const,
  lineHeight: 1,
  fontSize: 10,
  fontWeight: 600,
  padding: '3px 8px',
  borderRadius: 3,
  letterSpacing: '0.3px',
  whiteSpace: 'nowrap' as const,
  flexShrink: 0,
};

interface Props {
  c: ThemeColors;
  onBack: () => void;
  onDrillDown?: (category: string) => void;
}

export function CostDrillDownScreen({ c, onBack, onDrillDown }: Props) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const filteredPipeline = activeFilter === 'all'
    ? PIPELINE
    : PIPELINE.filter(p => p.type === activeFilter);

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        marginBottom: 18,
        paddingBottom: 14,
        borderBottom: `1px solid ${c.border}`,
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer', fontSize: 12, color: c.textSub,
            display: 'flex', alignItems: 'center', gap: 4,
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          ← Command Centre
        </button>
        <ChevronRight size={12} color={c.textMuted} />
        <span style={{ fontSize: 12, fontWeight: 600, color: c.teal }}>
          Cost Performance &amp; Savings
        </span>
        <div style={{ flex: 1 }} />
        <span style={{
          fontSize: 9, color: c.green, backgroundColor: c.greenBg,
          padding: '2px 7px', borderRadius: 2, fontWeight: 600, letterSpacing: '0.4px',
        }}>LIVE</span>
        <span style={{ fontSize: 10, color: c.textMuted }}>Q2 2025 · Last updated 4 min ago</span>
      </div>

      {/* Two-column layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 390px',
        gap: 16,
        alignItems: 'start',
      }}>

        {/* ── LEFT: Category overview table ── */}
        <div style={{
          backgroundColor: c.surface,
          border: `1px solid ${c.border}`,
          borderRadius: 6,
          overflow: 'hidden',
        }}>
          {/* Panel header */}
          <div style={{
            padding: '10px 16px',
            borderBottom: `1px solid ${c.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 2 }}>
                Category overview — all materials
              </div>
              <div style={{ fontSize: 10, color: c.textMuted }}>
                Click any row to drill down into category-level insights
              </div>
            </div>
            <span style={{ fontSize: 10, color: c.textMuted }}>6 categories</span>
          </div>

          {/* Table header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '160px 1fr 120px 60px 110px',
            gap: 0,
            padding: '7px 16px',
            borderBottom: `1px solid ${c.border}`,
            backgroundColor: c.bg,
          }}>
            {['Category', 'Actual vs should-cost', 'Opportunity', 'Trend', 'Status'].map(h => (
              <span key={h} style={{ fontSize: 9, fontWeight: 700, color: c.text, letterSpacing: '0.4px' }}>
                {h.toUpperCase()}
              </span>
            ))}
          </div>

          {/* Table rows */}
          {CATEGORIES.map(row => {
            const st = getStatusStyle(row.status, c);
            const isHovered = hoveredRow === row.id;

            return (
              <div
                key={row.id}
                onMouseEnter={() => setHoveredRow(row.id)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => onDrillDown?.(row.id)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '160px 1fr 120px 60px 110px',
                  gap: 0,
                  padding: '11px 16px',
                  borderBottom: `1px solid ${c.border}`,
                  backgroundColor: isHovered ? c.surfaceHover : 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.1s',
                  alignItems: 'center',
                }}
              >
                {/* Category */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 500, color: c.text }}>{row.name}</span>
                  {isHovered && <ArrowUpRight size={11} color={c.teal} />}
                </div>

                {/* Variance */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{
                    fontSize: 12, fontWeight: 600,
                    color: row.varDir === 'above' ? c.red : c.green,
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    {row.variance}
                  </span>
                  <span style={{ fontSize: 10, color: c.textMuted }}>vs should-cost</span>
                </div>

                {/* Opportunity */}
                <span style={{
                  fontSize: 11, fontWeight: 600, color: c.teal,
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {row.opportunity}
                </span>

                {/* Trend */}
                <div>
                  {row.trend === 'up'   && <TrendingUp   size={14} color={c.red}      />}
                  {row.trend === 'down' && <TrendingDown size={14} color={c.green}    />}
                  {row.trend === 'flat' && <Minus        size={14} color={c.textMuted} />}
                </div>

                {/* Status */}
                <span style={{ ...TAG, color: st.color, backgroundColor: st.bg, border: `1px solid ${st.bd}`, justifySelf: 'start' }}>
                  {st.label}
                </span>
              </div>
            );
          })}

          {/* Footer */}
          <div style={{
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: 10, color: c.textMuted }}>Model coverage</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: c.textSub, fontVariantNumeric: 'tabular-nums' }}>
              68% of portfolio spend
            </span>
          </div>
        </div>

        {/* ── RIGHT: Savings pipeline ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* Panel header + filters */}
          <div style={{
            backgroundColor: c.surface,
            border: `1px solid ${c.border}`,
            borderRadius: 6,
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '10px 14px',
              borderBottom: `1px solid ${c.border}`,
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 10 }}>
                Savings pipeline — by initiative type
              </div>
              {/* Filter chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'flex-start' }}>
                {FILTER_CHIPS.map(chip => {
                  const isActive = activeFilter === chip.id;
                  return (
                    <button
                      key={chip.id}
                      onClick={() => setActiveFilter(chip.id)}
                      style={{
                        fontSize: 10,
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? c.teal : c.textSub,
                        backgroundColor: isActive ? c.tealBg : 'transparent',
                        border: `1px solid ${isActive ? c.teal : c.border}`,
                        borderRadius: 3,
                        padding: '3px 9px',
                        cursor: 'pointer',
                        transition: 'all 0.12s',
                        letterSpacing: '0.2px',
                        width: 'fit-content',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {chip.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Summary line */}
            <div style={{ padding: '7px 14px', borderBottom: `1px solid ${c.border}` }}>
              <span style={{ fontSize: 10, color: c.textMuted }}>
                {filteredPipeline.length} initiative{filteredPipeline.length !== 1 ? 's' : ''} ·{' '}
              </span>
              <span style={{ fontSize: 10, fontWeight: 600, color: c.teal }}>
                {activeFilter === 'all' ? '$1.94M total' : `${filteredPipeline.length} matched`}
              </span>
            </div>

            {/* Pipeline cards */}
            <div>
              {filteredPipeline.map((item, idx) => {
                const pst = getPipelineStatusStyle(item.status, c);
                return (
                  <div
                    key={item.id}
                    style={{
                      padding: '12px 14px',
                      borderBottom: idx < filteredPipeline.length - 1 ? `1px solid ${c.border}` : 'none',
                      transition: 'background-color 0.1s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = c.surfaceHover)}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {/* Title row */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: c.text, lineHeight: 1.4 }}>
                        {item.title}
                      </span>
                      <span style={{
                        fontSize: 13, fontWeight: 700, color: c.teal,
                        fontVariantNumeric: 'tabular-nums', flexShrink: 0, letterSpacing: '-0.3px',
                      }}>
                        {item.value}
                      </span>
                    </div>

                    {/* Meta */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 10, color: c.textMuted }}>
                        {item.category} · Supplier: {item.supplier}
                      </span>
                      <span style={{ ...TAG, color: pst.color, backgroundColor: pst.bg, border: `1px solid ${pst.bd}` }}>
                        {pst.label}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontSize: 9, color: c.textMuted, letterSpacing: '0.2px' }}>GAP TO CLOSE</span>
                        <span style={{ fontSize: 9, fontWeight: 600, color: c.textSub, fontVariantNumeric: 'tabular-nums' }}>
                          {item.progress}%
                        </span>
                      </div>
                      <div style={{ height: 3, borderRadius: 2, backgroundColor: c.border, overflow: 'hidden' }}>
                        <div style={{
                          width: `${item.progress}%`, height: '100%',
                          backgroundColor: c.teal, borderRadius: 2, opacity: 0.8,
                        }} />
                      </div>
                    </div>
                  </div>
                );
              })}

              {filteredPipeline.length === 0 && (
                <div style={{ padding: '24px 14px', textAlign: 'center' }}>
                  <span style={{ fontSize: 11, color: c.textMuted }}>No initiatives match this filter</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}