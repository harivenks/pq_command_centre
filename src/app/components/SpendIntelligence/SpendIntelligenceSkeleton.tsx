import { ThemeColors } from '../theme-config';

interface Props {
  c: ThemeColors;
}

export function SpendIntelligenceSkeleton({ c }: Props) {
  return (
    <div style={{ padding: '80px 0', textAlign: 'center', color: c.textMuted, fontSize: 12 }}>
      Loading Spend Intelligence…
    </div>
  );
}
