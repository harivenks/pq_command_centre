import { ThemeColors } from './theme-config';
import { Sk, SkCard, SkCardHead } from './Skeleton';

interface Props { c: ThemeColors }

export function RigidPlasticsSkeleton({ c }: Props) {
  const insightStrip = {
    padding: '9px 16px',
    borderTop: `1px solid ${c.border}`,
    display: 'flex', flexDirection: 'column' as const, gap: 5,
  };

  return (
    <div>
      {/* ── Breadcrumb ─────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        marginBottom: 18, paddingBottom: 14,
        borderBottom: `1px solid ${c.border}`,
      }}>
        <Sk c={c} w={105} h={11} />
        <Sk c={c} w={10}  h={10} r={1} />
        <Sk c={c} w={185} h={11} />
        <Sk c={c} w={10}  h={10} r={1} />
        <Sk c={c} w={90}  h={11} />
      </div>

      {/* ── Summary strip ──────────────────────────────────── */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr) auto',
        backgroundColor: c.surface, border: `1px solid ${c.border}`,
        borderRadius: 6, overflow: 'hidden', marginBottom: 16,
      }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} style={{ padding: '14px 18px', borderRight: `1px solid ${c.border}` }}>
            <Sk c={c} w={i === 0 ? 130 : i === 1 ? 110 : i === 2 ? 115 : 75} h={8} style={{ marginBottom: 10 }} />
            <Sk c={c} w={i === 3 ? 28 : 60} h={22} r={2} />
          </div>
        ))}
        {/* CTA placeholder */}
        <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center' }}>
          <Sk c={c} w={170} h={34} r={4} />
        </div>
      </div>

      {/* ── 2×2 grid ───────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>

        {/* Card 1 — Should-cost breakdown */}
        <SkCard c={c}>
          <SkCardHead c={c}>
            <Sk c={c} w={240} h={11} style={{ marginBottom: 6 }} />
            <Sk c={c} w={180} h={9} />
          </SkCardHead>
          <div style={{ padding: '16px' }}>
            {/* Stacked bar */}
            <Sk c={c} h={24} r={3} style={{ marginBottom: 14 }} />
            {/* Legend rows */}
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: i < 3 ? 9 : 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Sk c={c} w={8} h={8} r={1} />
                  <Sk c={c} w={i === 0 ? 65 : i === 1 ? 60 : i === 2 ? 90 : 75} h={10} />
                </div>
                <Sk c={c} w={55} h={11} />
              </div>
            ))}
            {/* Divider */}
            <div style={{ borderTop: `1px solid ${c.border}`, margin: '14px 0 12px' }} />
            {/* Summary row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[0, 1].map(i => (
                <div key={i}>
                  <Sk c={c} w={70} h={8} style={{ marginBottom: 8 }} />
                  <Sk c={c} w={80} h={20} r={2} />
                </div>
              ))}
            </div>
          </div>
          {/* Insight strip */}
          <div style={insightStrip}>
            <Sk c={c} w="55%" h={10} />
            <Sk c={c} w="80%" h={9} />
          </div>
        </SkCard>

        {/* Card 2 — Price trend chart */}
        <SkCard c={c}>
          <SkCardHead c={c}>
            <Sk c={c} w={220} h={11} style={{ marginBottom: 10 }} />
            {/* Legend */}
            <div style={{ display: 'flex', gap: 16 }}>
              {[0, 1].map(i => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Sk c={c} w={22} h={8} r={1} />
                  <Sk c={c} w={60} h={9} />
                </div>
              ))}
            </div>
          </SkCardHead>
          {/* Chart area */}
          <div style={{ padding: '14px 12px 10px' }}>
            {/* Y-axis + chart body */}
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: 18 }}>
                {[0, 1, 2, 3, 4].map(i => <Sk key={i} c={c} w={28} h={8} />)}
              </div>
              <div style={{ flex: 1 }}>
                {/* Simulated line chart area */}
                <Sk c={c} h={140} r={3} style={{ marginBottom: 8 }} />
                {/* X-axis labels */}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {Array.from({ length: 6 }).map((_, i) => <Sk key={i} c={c} w={18} h={8} />)}
                </div>
              </div>
            </div>
          </div>
          {/* Insight strip */}
          <div style={insightStrip}>
            <Sk c={c} w="50%" h={10} />
            <Sk c={c} w="85%" h={9} />
          </div>
        </SkCard>

        {/* Card 3 — Supplier comparison table */}
        <SkCard c={c}>
          <SkCardHead c={c}>
            <Sk c={c} w={210} h={11} style={{ marginBottom: 6 }} />
            <Sk c={c} w={160} h={9} />
          </SkCardHead>
          {/* Table header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 70px 108px 98px 78px 110px',
            padding: '6px 16px', borderBottom: `1px solid ${c.border}`,
            backgroundColor: c.bg,
          }}>
            {[55, 35, 70, 60, 40, 45].map((w, i) => <Sk key={i} c={c} w={w} h={8} />)}
          </div>
          {/* Rows */}
          {[0, 1, 2, 3].map((_, ri) => (
            <div key={ri} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 70px 108px 98px 78px 110px',
              padding: '10px 16px',
              borderBottom: ri < 3 ? `1px solid ${c.border}` : 'none',
              alignItems: 'center',
            }}>
              <Sk c={c} w={ri % 2 === 0 ? 55 : 130} h={10} />
              <Sk c={c} w={30} h={10} />
              <Sk c={c} w={38} h={10} />
              <Sk c={c} w={36} h={10} />
              <Sk c={c} w={50} h={10} />
              <Sk c={c} w={80} h={18} r={3} />
            </div>
          ))}
        </SkCard>

        {/* Card 4 — Price gap by grade */}
        <SkCard c={c}>
          <SkCardHead c={c}>
            <Sk c={c} w={170} h={11} style={{ marginBottom: 6 }} />
            <Sk c={c} w={210} h={9} />
          </SkCardHead>
          <div style={{ padding: '14px 16px' }}>
            {[0, 1, 2, 3, 4].map((_, gi) => (
              <div key={gi} style={{ marginBottom: gi < 4 ? 13 : 0 }}>
                {/* Label row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <Sk c={c} w={gi === 1 ? 90 : 80} h={10} />
                    {gi === 1 && <Sk c={c} w={44} h={16} r={3} />}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Sk c={c} w={110} h={9} />
                    <Sk c={c} w={38} h={12} />
                  </div>
                </div>
                {/* Bar */}
                <Sk c={c} h={5} r={3} />
              </div>
            ))}
          </div>
          {/* Insight strip */}
          <div style={insightStrip}>
            <Sk c={c} w="52%" h={10} />
            <Sk c={c} w="78%" h={9} />
          </div>
        </SkCard>

      </div>
    </div>
  );
}
