import { AlertTriangle, ShieldAlert, FileText, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { ThemeColors } from './theme-config';

const ALERTS = [
  {
    id: 'red',
    level: 'URGENT',
    color: 'red' as const,
    icon: ShieldAlert,
    title: 'Huhtamaki EU — Force Majeure',
    body: 'Force majeure declared on corrugated packaging. 40% of supply at risk. Alternative sourcing identified within 6 weeks.',
    deadline: 'Deadline: Jan 21, 2026',
    cta: 'Take action',
    time: '22 min ago',
  },
  {
    id: 'amber',
    level: 'MARKET',
    color: 'amber' as const,
    icon: AlertTriangle,
    title: 'HDPE Resin +7.2% MoM',
    body: 'HDPE resin index up 7.2% month-on-month. Pricing clauses triggered on 8 contracts. Review flexible laminate exposure.',
    deadline: 'Deadline: Feb 15, 2026',
    cta: 'Review exposure',
    time: '1h 45m ago',
  },
  {
    id: 'blue',
    level: 'REGULATORY',
    color: 'blue' as const,
    icon: FileText,
    title: 'EU PPWR — 30% PCR Requirement',
    body: '14 SKUs non-compliant with EU Packaging & Packaging Waste Regulation PCR content mandate. Remediation plan required.',
    deadline: 'Deadline: Jan 1, 2026',
    cta: 'View action',
    time: '3h ago',
  },
];

interface Props {
  c: ThemeColors;
}

export function AlertCards({ c }: Props) {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const visible = ALERTS.filter(a => !dismissed.includes(a.id));

  if (visible.length === 0) return null;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${visible.length}, 1fr)`,
      gap: 10,
      marginBottom: 14,
    }}>
      {visible.map(alert => {
        const color = c[alert.color];
        const bgColor = c[`${alert.color}Bg` as keyof ThemeColors] as string;
        const Icon = alert.icon;
        const isHovered = hoveredId === alert.id;

        return (
          <div
            key={alert.id}
            onMouseEnter={() => setHoveredId(alert.id)}
            onMouseLeave={() => setHoveredId(null)}
            style={{
              backgroundColor: isHovered ? c.surfaceHover : c.surface,
              border: `1px solid ${isHovered ? c.borderStrong : c.border}`,
              borderLeft: `3px solid ${color}`,
              borderRadius: 4,
              padding: '10px 12px',
              display: 'flex',
              gap: 10,
              position: 'relative',
              cursor: 'pointer',
              transition: 'background-color 0.15s, border-color 0.15s',
            }}
          >
            <div style={{
              width: 28,
              height: 28,
              borderRadius: 4,
              backgroundColor: bgColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Icon size={14} color={color} />
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                {/* Plain text level label — no chip/badge */}
                <span style={{ fontSize: 11, fontWeight: 700, color: color, letterSpacing: '0.5px' }}>
                  {alert.level}
                </span>
                <span style={{ fontSize: 11, fontWeight: 600, color: c.text }}>
                  {alert.title}
                </span>
                <span style={{ fontSize: 10, color: c.textMuted, marginLeft: 'auto', paddingRight: 16, whiteSpace: 'nowrap' }}>
                  {alert.time}
                </span>
              </div>
              <p style={{ fontSize: 11, color: c.textSub, margin: 0, lineHeight: 1.45, marginBottom: 4 }}>
                {alert.body}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 10, color: c.textMuted }}>{alert.deadline}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 3,
                    fontSize: 10, fontWeight: 600, color: c.teal, whiteSpace: 'nowrap',
                  }}>
                    {alert.cta} <ArrowRight size={10} />
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={e => { e.stopPropagation(); setDismissed(d => [...d, alert.id]); }}
              style={{
                position: 'absolute',
                top: 6,
                right: 6,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 2,
                color: c.textMuted,
                lineHeight: 1,
              }}
            >
              <X size={11} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
