import { useState, useEffect } from 'react';
import { Theme, WidgetId, getColors } from './components/theme-config';
import { NavBar } from './components/NavBar';
import { NewsFeed } from './components/NewsFeed';
import { AlertCards } from './components/AlertCards';
import { WidgetGrid } from './components/WidgetGrid';
import { CostDrillDownScreen } from './components/CostDrillDownScreen';
import { RigidPlasticsDrillDown } from './components/RigidPlasticsDrillDown';
import { ProcurementScreen } from './components/ProcurementScreen';
import { ProcurementSkeleton } from './components/ProcurementSkeleton';
import { GlobalSupplierMap } from './components/GlobalSupplierMap';
import { SpecIntelligenceScreen } from './components/SpecIntelligenceScreen';
import { SpendIntelligenceScreen } from './components/SpendIntelligence/SpendIntelligenceScreen';
import { SpendIntelligenceSkeleton } from './components/SpendIntelligence/SpendIntelligenceSkeleton';
import { SkeletonStyles } from './components/Skeleton';
import { CommandCentreSkeleton } from './components/CommandCentreSkeleton';
import { CostDrillDownSkeleton } from './components/CostDrillDownSkeleton';
import { RigidPlasticsSkeleton } from './components/RigidPlasticsSkeleton';

type Screen = 'command-centre' | 'cost-drill-down' | 'rigid-plastics' | 'procurement' | 'supply-chain' | 'spec-intelligence' | 'spend-intelligence';

const LOAD_MS = 1400;

export default function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [activeTab, setActiveTab] = useState('command-centre');
  const [selectedWidget, setSelectedWidget] = useState<WidgetId | null>('cost');
  const [screen, setScreen] = useState<Screen>('command-centre');
  const [isLoading, setIsLoading] = useState(true);

  /* Spend Intelligence is light-only — force light theme while on that screen
     (toggle stays visible but disabled in NavBar). */
  const effectiveTheme: Theme = screen === 'spend-intelligence' ? 'light' : theme;
  const c = getColors(effectiveTheme);

  /* trigger skeleton on every screen change (including initial mount) */
  useEffect(() => {
    console.log('Screen changed to:', screen);
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), LOAD_MS);
    return () => clearTimeout(t);
  }, [screen]);

  function handleWidgetClick(id: WidgetId) {
    setSelectedWidget(id);
    if (id === 'cost') setScreen('cost-drill-down');
  }

  function handleBackToCommandCentre() {
    setScreen('command-centre');
    setSelectedWidget(null);
    setActiveTab('command-centre');
  }

  function handleBackToCost() {
    setScreen('cost-drill-down');
  }

  function handleCategoryDrillDown(categoryId: string) {
    if (categoryId === 'rigid-plastics') setScreen('rigid-plastics');
  }

  function handleTabChange(id: string) {
    setActiveTab(id);
    if (id === 'procurement') { setScreen('procurement'); }
    else if (id === 'supply-chain') { setScreen('supply-chain'); }
    else if (id === 'spec-intelligence') { setScreen('spec-intelligence'); }
    else if (id === 'spend-intelligence') { setScreen('spend-intelligence'); }
    else if (id === 'command-centre') { setScreen('command-centre'); }
  }

  return (
    <div style={{
      backgroundColor: c.bg,
      color: c.text,
      minHeight: '100vh',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    }}>
      {/* inject shimmer keyframes once */}
      <SkeletonStyles />

      <NavBar
        theme={theme}
        c={c}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onThemeToggle={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
      />

      <NewsFeed c={c} />

      {/* ── Spec Intelligence (embedded, full-bleed) ────────── */}
      {screen === 'spec-intelligence' && (
        isLoading
          ? <div style={{ padding: '80px 0', textAlign: 'center', color: c.textMuted, fontSize: 12 }}>Loading Spec Intelligence…</div>
          : <SpecIntelligenceScreen />
      )}

      {/* ── Spend Intelligence (ported prototype, full-bleed) ── */}
      {screen === 'spend-intelligence' && (
        isLoading
          ? <SpendIntelligenceSkeleton c={c} />
          : <SpendIntelligenceScreen />
      )}

      {screen !== 'spec-intelligence' && screen !== 'spend-intelligence' && (
      <main style={{ padding: '14px 20px 40px' }}>

        {/* ── Supply Chain / Map Prototype ─────────────────── */}
        {screen === 'supply-chain' && (
          isLoading
            ? <div style={{ padding: '80px 0', textAlign: 'center', color: c.textMuted, fontSize: 12 }}>Loading map…</div>
            : (
              <div>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: c.teal, letterSpacing: '0.4px', marginBottom: 2 }}>
                    SUPPLY CHAIN
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: c.text, marginBottom: 2 }}>
                    Global Supplier Map
                  </div>
                  <div style={{ fontSize: 12, color: c.textMuted }}>
                    Interactive prototype — click any region on the map to explore
                  </div>
                </div>
                <GlobalSupplierMap c={c} />
              </div>
            )
        )}

        {/* ── Procurement ─────────────────────────────────────── */}
        {screen === 'procurement' && (
          isLoading
            ? <ProcurementSkeleton c={c} />
            : <ProcurementScreen c={c} />
        )}

        {/* ── Command Centre ──────────────────────────────────── */}
        {screen === 'command-centre' && (
          isLoading
            ? <CommandCentreSkeleton c={c} />
            : <>
              <AlertCards c={c} />
              <WidgetGrid
                c={c}
                selectedWidget={selectedWidget}
                onSelectWidget={handleWidgetClick}
              />
            </>
        )}

        {/* ── Cost Drill-Down ─────────────────────────────── */}
        {screen === 'cost-drill-down' && (
          isLoading
            ? <CostDrillDownSkeleton c={c} />
            : <CostDrillDownScreen
              c={c}
              onBack={handleBackToCommandCentre}
              onDrillDown={handleCategoryDrillDown}
            />
        )}

        {/* ── Rigid Plastics ──────────────────────────────── */}
        {screen === 'rigid-plastics' && (
          isLoading
            ? <RigidPlasticsSkeleton c={c} />
            : <RigidPlasticsDrillDown
              c={c}
              onBackToCommandCentre={handleBackToCommandCentre}
              onBackToCost={handleBackToCost}
            />
        )}

      </main>
      )}
    </div>
  );
}