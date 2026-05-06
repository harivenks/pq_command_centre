import { ThemeColors } from './theme-config';
import { Sk, SkCard } from './Skeleton';

interface Props { c: ThemeColors }

export function CommandCentreSkeleton({ c }: Props) {
  return (
    <div>
      {/* ── Alert cards strip ──────────────────────────────── */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        {[0, 1, 2].map(i => (
          <SkCard key={i} c={c} style={{ flex: 1, padding: 14 }}>
            {/* header row: icon + title + badge + time */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <Sk c={c} w={22} h={22} r={4} />
              <Sk c={c} w={i === 0 ? 160 : i === 1 ? 130 : 145} h={11} />
              <div style={{ flex: 1 }} />
              <Sk c={c} w={32} h={16} r={3} />
              <Sk c={c} w={60} h={10} />
            </div>
            {/* body lines */}
            <Sk c={c} h={9} style={{ marginBottom: 6 }} />
            <Sk c={c} w="82%" h={9} style={{ marginBottom: 10 }} />
            {/* meta */}
            <Sk c={c} w="65%" h={8} />
          </SkCard>
        ))}
      </div>

      {/* ── Widget section header ──────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Sk c={c} w={150} h={10} />
          <Sk c={c} w={120} h={9} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sk c={c} w={100} h={9} />
          <Sk c={c} w={60} h={16} r={2} />
        </div>
      </div>

      {/* ── Widget 2×2 grid ───────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {[
          { bars: 4 }, { bars: 3 },
          { bars: 4 }, { bars: 5 },
        ].map((w, wi) => (
          <SkCard key={wi} c={c}>
            {/* Widget header */}
            <div style={{
              padding: '10px 14px',
              borderBottom: `1px solid ${c.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sk c={c} w={18} h={18} r={2} />
                <div>
                  <Sk c={c} w={wi % 2 === 0 ? 160 : 140} h={10} style={{ marginBottom: 5 }} />
                  <Sk c={c} w={80} h={8} />
                </div>
              </div>
              <Sk c={c} w={24} h={24} r={3} />
            </div>

            {/* Score / headline metric */}
            <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${c.border}` }}>
              <Sk c={c} w={48} h={36} r={2} />
              <div style={{ flex: 1 }}>
                <Sk c={c} w="55%" h={10} style={{ marginBottom: 6 }} />
                <Sk c={c} w="40%" h={8} />
              </div>
              <Sk c={c} w={50} h={20} r={3} />
            </div>

            {/* Progress bar rows */}
            <div style={{ padding: '10px 14px' }}>
              {Array.from({ length: w.bars }).map((_, ri) => (
                <div key={ri} style={{ marginBottom: ri < w.bars - 1 ? 10 : 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <Sk c={c} w={ri % 3 === 0 ? 100 : ri % 3 === 1 ? 85 : 115} h={9} />
                    <Sk c={c} w={36} h={9} />
                  </div>
                  <Sk c={c} h={4} r={2} />
                </div>
              ))}
            </div>
          </SkCard>
        ))}
      </div>
    </div>
  );
}
