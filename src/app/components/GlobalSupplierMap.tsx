import { useState } from 'react';
import { ThemeColors } from './theme-config';
import worldMapImg from '../../imports/World_map_blank_without_borders.svg.png';

interface Props { c: ThemeColors; }

const REGIONS = [
  { id: 'NA',    suppliers: 22, x: 20, y: 30, risk: 'Low',    spend: '$12.1M', coverage: '3 countries'  },
  { id: 'EMEA',  suppliers: 16, x: 51, y: 32, risk: 'Medium', spend: '$8.2M',  coverage: '28 countries' },
  { id: 'APAC',  suppliers: 10, x: 75, y: 35, risk: 'High',   spend: '$5.4M',  coverage: '12 countries' },
  { id: 'LATAM', suppliers: 5,  x: 23, y: 65, risk: 'Low',    spend: '—',      coverage: '2 countries'  },
];
const MAX_SUPPLIERS = 22;

export function GlobalSupplierMap({ c }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const isDark = c.bg === '#0c0c10';
  const hoveredData = REGIONS.find(r => r.id === hovered) ?? null;

  return (
    <div style={{ backgroundColor: c.surface, border: `1px solid ${c.border}`, borderRadius: 6, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ padding: '11px 16px', borderBottom: `1px solid ${c.border}` }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: c.text, marginBottom: 2 }}>Global Supplier Map</div>
        <div style={{ fontSize: 11, color: c.textMuted }}>Supply chain coverage across all active regions · bubble size = supplier count</div>
      </div>

      {/* Bubble canvas */}
      <div style={{ position: 'relative', width: '100%', flex: 1, backgroundColor: c.bg }}>
        {/* World map background */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${worldMapImg})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: isDark ? 0.10 : 0.18,
          pointerEvents: 'none',
        }}/>

        {REGIONS.map(r => {
          const isEmea = r.id === 'EMEA';
          const isHov  = hovered === r.id;
          const size   = Math.round(72 + (r.suppliers / MAX_SUPPLIERS) * 62);

          const bubbleBg = isEmea
            ? (isHov ? `${c.teal}1a` : `${c.teal}0d`)
            : (isHov ? c.surfaceHover : c.surface);
          const bubbleBorder = isEmea
            ? (isHov ? `1.5px solid ${c.teal}` : `1.5px solid ${c.teal}55`)
            : (isHov ? `1.5px solid ${c.borderStrong}` : `1px solid ${c.border}`);
          const labelColor = isEmea ? c.teal : c.textSub;
          const subColor   = isEmea ? `${c.teal}bb` : c.textMuted;
          const scale      = isHov ? 'translate(-50%,-50%) scale(1.08)' : 'translate(-50%,-50%)';
          const glow       = isHov
            ? (isEmea ? `0 0 26px ${c.teal}35` : `0 4px 16px rgba(0,0,0,0.12)`)
            : 'none';

          return (
            <div
              key={r.id}
              style={{
                position: 'absolute',
                left: `${r.x}%`,
                top: `${r.y}%`,
                width: size,
                height: size,
                transform: scale,
                borderRadius: '50%',
                backgroundColor: bubbleBg,
                border: bubbleBorder,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'default',
                transition: 'transform 0.18s ease-out, box-shadow 0.18s, background-color 0.15s',
                boxShadow: glow,
                zIndex: isHov ? 5 : 1,
                userSelect: 'none',
              }}
              onMouseEnter={() => setHovered(r.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <span style={{ fontSize: 12, fontWeight: 700, color: labelColor, letterSpacing: '0.4px', pointerEvents: 'none' }}>
                {r.id}
              </span>
              <span style={{ fontSize: 10, color: subColor, marginTop: 2, pointerEvents: 'none' }}>
                {r.suppliers} suppliers
              </span>
            </div>
          );
        })}

        {/* Tooltip */}
        {hoveredData && (() => {
          const r      = hoveredData;
          const isEmea = r.id === 'EMEA';
          const tipLeft = r.x > 55 ? `${r.x - 24}%` : `${Math.min(r.x + 10, 55)}%`;
          const tipTop  = `${Math.max(r.y - 12, 5)}%`;
          const riskColor = r.risk === 'High' ? c.red : r.risk === 'Medium' ? c.amber : c.green;
          return (
            <div
              style={{
                position: 'absolute',
                left: tipLeft,
                top: tipTop,
                transform: 'translateY(-100%)',
                backgroundColor: c.surface,
                border: `1px solid ${isEmea ? c.teal : c.border}`,
                borderRadius: 5,
                padding: '9px 13px',
                pointerEvents: 'none',
                zIndex: 20,
                minWidth: 154,
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 700, color: isEmea ? c.teal : c.text, marginBottom: 7 }}>
                {r.id} Region
              </div>
              {([
                { k: 'Suppliers', v: String(r.suppliers), col: c.text },
                { k: 'Spend',     v: r.spend,              col: c.text },
                { k: 'Risk',      v: r.risk,               col: riskColor },
                { k: 'Coverage',  v: r.coverage,           col: c.text },
              ] as const).map(({ k, v, col }) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 14, marginBottom: 3, fontSize: 11 }}>
                  <span style={{ color: c.textMuted }}>{k}</span>
                  <span style={{ fontWeight: 600, color: col }}>{v}</span>
                </div>
              ))}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
