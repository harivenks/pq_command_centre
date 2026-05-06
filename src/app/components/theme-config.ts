export type Theme = 'dark' | 'light';
export type WidgetId = 'cost' | 'supplier-risk' | 'compliance' | 'sustainability';

export interface ThemeColors {
  bg: string;
  surface: string;
  surfaceHover: string;
  surfaceSelected: string;
  border: string;
  borderStrong: string;
  borderSelected: string;
  text: string;
  textSub: string;
  textMuted: string;
  teal: string;
  tealLight: string;
  tealBg: string;
  tealBd: string;
  red: string;
  redBg: string;
  redBd: string;
  amber: string;
  amberBg: string;
  amberBd: string;
  blue: string;
  blueBg: string;
  blueBd: string;
  green: string;
  greenBg: string;
  greenBd: string;
  chartGrid: string;
}

export function getColors(theme: Theme): ThemeColors {
  const isDark = theme === 'dark';
  return {
    bg:              isDark ? '#0c0c10' : '#eeeff4',
    surface:         isDark ? '#14141a' : '#ffffff',
    surfaceHover:    isDark ? '#1b1b22' : '#f6f6fb',
    surfaceSelected: isDark ? 'rgba(14,165,160,0.13)' : 'rgba(14,165,160,0.09)',
    border:          isDark ? '#222230' : '#dddde9',
    borderStrong:    isDark ? '#30303e' : '#c8c8d8',
    borderSelected:  '#0ea5a0',
    text:            isDark ? '#e0e0e9' : '#14141e',
    textSub:         isDark ? '#b0b0cc' : '#585872',
    textMuted:       isDark ? '#9494b8' : '#686888',

    teal:     '#0ea5a0',
    tealLight: isDark ? '#0dd4cd' : '#0d9488',
    tealBg:   isDark ? 'rgba(14,165,160,0.14)' : 'rgba(14,165,160,0.10)',
    tealBd:   isDark ? 'rgba(14,165,160,0.38)' : 'rgba(14,165,160,0.32)',

    red:    isDark ? '#e84040' : '#dc2626',
    redBg:  isDark ? 'rgba(232,64,64,0.14)'  : 'rgba(220,38,38,0.10)',
    redBd:  isDark ? 'rgba(232,64,64,0.38)'  : 'rgba(220,38,38,0.32)',

    amber:    isDark ? '#e09820' : '#b45309',
    amberBg:  isDark ? 'rgba(224,152,32,0.14)' : 'rgba(180,83,9,0.10)',
    amberBd:  isDark ? 'rgba(224,152,32,0.38)' : 'rgba(180,83,9,0.32)',

    blue:    isDark ? '#5090f0' : '#2563eb',
    blueBg:  isDark ? 'rgba(80,144,240,0.14)' : 'rgba(37,99,235,0.10)',
    blueBd:  isDark ? 'rgba(80,144,240,0.38)' : 'rgba(37,99,235,0.32)',

    green:    isDark ? '#22c55e' : '#15803d',
    greenBg:  isDark ? 'rgba(34,197,94,0.14)' : 'rgba(21,128,61,0.10)',
    greenBd:  isDark ? 'rgba(34,197,94,0.38)' : 'rgba(21,128,61,0.32)',

    chartGrid: isDark ? '#1e1e28' : '#f0f0f8',
  };
}

export const WIDGET_META: Record<WidgetId, { label: string; icon: string; abbr: string }> = {
  'cost':          { label: 'Cost Performance & Savings',       icon: '◈', abbr: 'COST' },
  'supplier-risk': { label: 'Supply Chain Risk & Resilience',   icon: '◉', abbr: 'RISK' },
  'compliance':    { label: 'Regulatory Compliance',            icon: '◻', abbr: 'COMP' },
  'sustainability':{ label: 'Sustainability Intelligence',      icon: '◷', abbr: 'SUST' },
};