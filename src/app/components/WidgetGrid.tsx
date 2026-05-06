import { ThemeColors, WidgetId } from './theme-config';
import { CostWidget } from './CostWidget';
import { SupplierRiskWidget } from './SupplierRiskWidget';
import { ComplianceWidget } from './ComplianceWidget';
import { SustainabilityWidget } from './SustainabilityWidget';

interface Props {
  c: ThemeColors;
  selectedWidget: WidgetId | null;
  onSelectWidget: (id: WidgetId) => void;
}

export function WidgetGrid({ c, selectedWidget, onSelectWidget }: Props) {
  return (
    <div>
      {/* Section header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: c.textMuted, letterSpacing: '0.5px' }}>
            DECISION SURFACES
          </span>
          <span style={{ fontSize: 10, color: c.textMuted }}>— click a widget to focus</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 10, color: c.textMuted }}>Dec 5, 2025 · Q2 2025</span>
          <span style={{
            fontSize: 9, color: c.green, backgroundColor: c.greenBg,
            padding: '2px 6px', borderRadius: 2, fontWeight: 600, letterSpacing: '0.4px',
          }}>LIVE DATA</span>
        </div>
      </div>

      {/* Strict 2×2 equal grid — Cost top-left (dominant default) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 14,
        alignItems: 'stretch',
      }}>
        {/* Top-left: Cost Performance — dominant, default selected */}
        <CostWidget
          c={c}
          selected={selectedWidget === 'cost'}
          onClick={() => onSelectWidget('cost')}
        />

        {/* Top-right: Supply Chain Risk */}
        <SupplierRiskWidget
          c={c}
          selected={selectedWidget === 'supplier-risk'}
          onClick={() => onSelectWidget('supplier-risk')}
        />

        {/* Bottom-left: Regulatory Compliance */}
        <ComplianceWidget
          c={c}
          selected={selectedWidget === 'compliance'}
          onClick={() => onSelectWidget('compliance')}
        />

        {/* Bottom-right: Sustainability Intelligence */}
        <SustainabilityWidget
          c={c}
          selected={selectedWidget === 'sustainability'}
          onClick={() => onSelectWidget('sustainability')}
        />
      </div>
    </div>
  );
}