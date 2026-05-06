import React from 'react';
import { ThemeColors } from './theme-config';

/* ── keyframes injected once ─────────────────────────────────── */
export function SkeletonStyles() {
  return (
    <style>{`
      @keyframes pq-shimmer {
        0%   { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>
  );
}

/* ── theme-derived skeleton colours ─────────────────────────── */
function skColors(c: ThemeColors) {
  const isDark = c.bg === '#0c0c10';
  return {
    base:    isDark ? '#1c1c28' : '#e0e0ec',
    shimmer: isDark ? '#2c2c3c' : '#f0f0fa',
  };
}

/* ── primitive block ─────────────────────────────────────────── */
interface BlockProps {
  c: ThemeColors;
  w?: string | number;
  h: number;
  r?: number;
  style?: React.CSSProperties;
}

export function Sk({ c, w = '100%', h, r = 3, style }: BlockProps) {
  const { base, shimmer } = skColors(c);
  return (
    <div style={{
      width: w,
      height: h,
      borderRadius: r,
      flexShrink: 0,
      background: `linear-gradient(90deg, ${base} 25%, ${shimmer} 50%, ${base} 75%)`,
      backgroundSize: '200% 100%',
      animation: 'pq-shimmer 1.5s ease-in-out infinite',
      ...style,
    }} />
  );
}

/* ── card shell ──────────────────────────────────────────────── */
interface CardProps {
  c: ThemeColors;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function SkCard({ c, children, style }: CardProps) {
  return (
    <div style={{
      backgroundColor: c.surface,
      border: `1px solid ${c.border}`,
      borderRadius: 6,
      overflow: 'hidden',
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ── card header row ─────────────────────────────────────────── */
export function SkCardHead({ c, children }: { c: ThemeColors; children: React.ReactNode }) {
  return (
    <div style={{ padding: '12px 16px', borderBottom: `1px solid ${c.border}` }}>
      {children}
    </div>
  );
}

/* ── table row ───────────────────────────────────────────────── */
export function SkTableRow({
  c, cols, padding = '10px 16px', last = false,
}: {
  c: ThemeColors;
  cols: React.ReactNode[];
  padding?: string;
  last?: boolean;
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 0,
      padding,
      borderBottom: last ? 'none' : `1px solid ${c.border}`,
    }}>
      {cols}
    </div>
  );
}
