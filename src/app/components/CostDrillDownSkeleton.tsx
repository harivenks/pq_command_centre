import { ThemeColors } from './theme-config';
import { Sk, SkCard } from './Skeleton';

interface Props { c: ThemeColors }

export function CostDrillDownSkeleton({ c }: Props) {
  return (
    <div>
      {/* ── Breadcrumb ─────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        marginBottom: 18, paddingBottom: 14,
        borderBottom: `1px solid ${c.border}`,
      }}>
        <Sk c={c} w={110} h={11} />
        <Sk c={c} w={10}  h={10} r={1} />
        <Sk c={c} w={180} h={11} />
        <div style={{ flex: 1 }} />
        <Sk c={c} w={36} h={16} r={2} />
      </div>

      {/* ── Two-column layout ──────────────────────────────── */}
      <div style={{ display: 'flex', gap: 16, alignItems: 'start' }}>

        {/* Left — category overview table */}
        <SkCard c={c} style={{ flex: '0 0 58%' }}>
          {/* Card header */}
          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${c.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <Sk c={c} w={180} h={11} />
              <Sk c={c} w={80} h={9} />
            </div>
            <Sk c={c} w={240} h={9} />
          </div>

          {/* Summary metric row */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            borderBottom: `1px solid ${c.border}`,
          }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ padding: '12px 16px', borderRight: i < 2 ? `1px solid ${c.border}` : 'none' }}>
                <Sk c={c} w={80} h={8} style={{ marginBottom: 7 }} />
                <Sk c={c} w={55} h={20} r={2} />
              </div>
            ))}
          </div>

          {/* Table column headers */}
          <div style={{
            display: 'grid', gridTemplateColumns: '160px 1fr 120px 60px auto',
            padding: '7px 16px', borderBottom: `1px solid ${c.border}`,
            backgroundColor: c.bg,
          }}>
            {[70, 100, 55, 30, 60].map((w, i) => (
              <Sk key={i} c={c} w={w} h={8} />
            ))}
          </div>

          {/* Table rows */}
          {[0, 1, 2, 3, 4, 5, 6].map((_, ri) => (
            <div key={ri} style={{
              display: 'grid',
              gridTemplateColumns: '160px 1fr 120px 60px auto',
              padding: '11px 16px',
              borderBottom: ri < 6 ? `1px solid ${c.border}` : 'none',
              alignItems: 'center',
            }}>
              <Sk c={c} w={ri % 3 === 0 ? 95 : ri % 3 === 1 ? 80 : 110} h={10} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Sk c={c} w={38} h={11} />
                <Sk c={c} w={70} h={9} />
              </div>
              <Sk c={c} w={50} h={11} />
              <Sk c={c} w={16} h={14} />
              <Sk c={c} w={60} h={18} r={3} />
            </div>
          ))}

          {/* Footer */}
          <div style={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between' }}>
            <Sk c={c} w={90} h={8} />
            <Sk c={c} w={120} h={8} />
          </div>
        </SkCard>

        {/* Right — savings pipeline */}
        <SkCard c={c} style={{ flex: 1 }}>
          {/* Header */}
          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${c.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <Sk c={c} w={140} h={11} />
              <Sk c={c} w={70} h={9} />
            </div>
            <Sk c={c} w={180} h={9} />
          </div>

          {/* Filter chips */}
          <div style={{ padding: '10px 16px', display: 'flex', gap: 6, borderBottom: `1px solid ${c.border}` }}>
            {[50, 70, 60, 55].map((w, i) => (
              <Sk key={i} c={c} w={w} h={22} r={3} />
            ))}
          </div>

          {/* Pipeline cards */}
          {[0, 1, 2, 3, 4].map((_, ci) => (
            <div key={ci} style={{ padding: '12px 16px', borderBottom: `1px solid ${c.border}` }}>
              {/* Title row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                <Sk c={c} w={ci % 2 === 0 ? 140 : 120} h={10} />
                <Sk c={c} w={55} h={11} />
              </div>
              {/* Supplier + chips row */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                <Sk c={c} w={90} h={9} />
                <Sk c={c} w={50} h={16} r={3} />
                <Sk c={c} w={60} h={16} r={3} />
              </div>
              {/* Progress bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sk c={c} h={3} r={2} style={{ flex: 1 }} />
                <Sk c={c} w={28} h={8} />
              </div>
            </div>
          ))}
        </SkCard>
      </div>
    </div>
  );
}
