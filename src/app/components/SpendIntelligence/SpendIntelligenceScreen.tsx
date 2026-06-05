import { useEffect, useRef, useState } from 'react';
import { PacQuantLogo } from './icons';
import { SpendChatDrawer } from './SpendChatDrawer';
import { SpendNewChatScreen } from './SpendNewChatScreen';
import { SpendTableModal } from './SpendTableModal';
import './spend-intelligence.css';

type View = 'alerts' | 'newchat-empty' | 'newchat-filled';

const NAV_MIN = 200;
const NAV_MAX = 320;

export function SpendIntelligenceScreen() {
  const [view, setView] = useState<View>('alerts');
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [navWidth, setNavWidth] = useState<number | null>(null);   // null → use CSS default
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerResetKey, setDrawerResetKey] = useState(0);
  const [drawerWidth, setDrawerWidth] = useState<number | null>(null);
  const [modalTableId, setModalTableId] = useState<string | null>(null);
  const [refreshSpin, setRefreshSpin] = useState(false);

  // ── Nav resize drag ──────────────────────────────────────
  const navRef = useRef<HTMLElement>(null);
  const navResizeStateRef = useRef<{ startX: number; startWidth: number } | null>(null);
  const [navDragging, setNavDragging] = useState(false);

  const onNavResizeMouseDown = (e: React.MouseEvent) => {
    if (navCollapsed) return;
    if (!navRef.current) return;
    navResizeStateRef.current = { startX: e.clientX, startWidth: navRef.current.offsetWidth };
    setNavDragging(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    e.preventDefault();
  };

  useEffect(() => {
    if (!navDragging) return;
    const onMove = (e: MouseEvent) => {
      if (!navResizeStateRef.current) return;
      const newW = Math.min(NAV_MAX, Math.max(NAV_MIN, navResizeStateRef.current.startWidth + (e.clientX - navResizeStateRef.current.startX)));
      setNavWidth(newW);
    };
    const onUp = () => {
      setNavDragging(false);
      navResizeStateRef.current = null;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [navDragging]);

  // ── Refresh spin ────────────────────────────────────────
  const onRefresh = () => {
    setRefreshSpin(true);
    window.setTimeout(() => setRefreshSpin(false), 520);
  };

  // ── Drawer open ─────────────────────────────────────────
  const openChatDrawer = () => {
    setDrawerOpen(true);
    setDrawerResetKey((k) => k + 1);
    // Default drawer width = 35% of viewport, min 300
    const defaultW = Math.max(300, Math.floor(window.innerWidth * 0.35));
    setDrawerWidth(defaultW);
    autoCollapseSidebar(defaultW);
  };

  const closeChatDrawer = () => {
    setDrawerOpen(false);
    setDrawerWidth(null);
  };

  // ── Sidebar auto-collapse when drawer >40% viewport ─────
  const autoCollapseSidebar = (drawerW: number) => {
    if (drawerW / window.innerWidth > 0.40 && !navCollapsed) {
      setNavCollapsed(true);
    }
  };

  // ── View switching ──────────────────────────────────────
  const showAlerts = () => {
    setView('alerts');
    closeChatDrawer();
  };
  const showNewChat = () => {
    if (view === 'newchat-empty' || view === 'newchat-filled') return;
    setView('newchat-empty');
    closeChatDrawer();
  };
  const activateNewChatFilled = () => setView('newchat-filled');

  // ── Styles for nav width (only when user resized) ──────
  const navStyle: React.CSSProperties = navWidth && !navCollapsed
    ? { width: navWidth, minWidth: navWidth }
    : {};

  return (
    <div className="pq-spend">
      {/* ───── LEFT NAV ───── */}
      <nav ref={navRef} className={'nav' + (navCollapsed ? ' collapsed' : '')} style={navStyle}>
        <div
          className={'nav-resize' + (navDragging ? ' dragging' : '')}
          onMouseDown={onNavResizeMouseDown}
        />
        <div className="nav-top">
          <div className="nav-logo">
            <PacQuantLogo />
            <span className="nav-logo-text">PacQuant</span>
          </div>
          <button className="nav-toggle" title="Toggle sidebar" onClick={() => setNavCollapsed((v) => !v)}>
            {navCollapsed ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m14 9 3 3-3 3"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m16 15-3-3 3-3"/></svg>
            )}
          </button>
        </div>

        <div className="nav-search">
          <div className="nav-search-wrap">
            <span className="nav-search-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </span>
            <input type="text" className="nav-search-input" placeholder="Search..." />
          </div>
        </div>

        <div className="nav-body">
          <div className={'nav-item' + (view === 'alerts' ? ' active' : '')} onClick={showAlerts}>
            <span className="nav-item-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            </span>
            <span className="nav-item-label">Your Alerts</span>
          </div>
          <div className={'nav-item' + (view !== 'alerts' ? ' active' : '')} onClick={showNewChat}>
            <span className="nav-item-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
            </span>
            <span className="nav-item-label">New Chat</span>
          </div>
          <div className="nav-item">
            <span className="nav-item-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7-7H4a2 2 0 0 0-2 2Z"/><path d="M14 2v6h6"/></svg>
            </span>
            <span className="nav-item-label">Artifacts</span>
          </div>
          <div className="nav-item">
            <span className="nav-item-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg>
            </span>
            <span className="nav-item-label">Library</span>
          </div>
          <div className="nav-item">
            <span className="nav-item-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            </span>
            <span className="nav-item-label">Projects</span>
          </div>
        </div>

        <div className="nav-bottom">
          <div className="nav-bottom-brand">
            <div className="nav-bottom-brand-logo">
              <PacQuantLogo width={16} height={11} />
              <span>Powered by PacQuant</span>
            </div>
          </div>
        </div>
      </nav>

      {/* ───── MAIN ───── */}
      <div className="main">
        {/* Alerts view */}
        {view === 'alerts' && (
          <div className="main-content">
            <div className="page">
              <div className="page-header">
                <div>
                  <div className="page-title">Spend Intelligence</div>
                  <div className="page-subtitle">Spend Alerts Digest — All your spend related alerts in a single place</div>
                </div>
                <button className="refresh-btn" onClick={onRefresh}>
                  <svg
                    width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ transition: 'transform 0.5s', transform: refreshSpin ? 'rotate(360deg)' : 'rotate(0deg)' }}
                  >
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                    <path d="M21 3v5h-5"/>
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                    <path d="M8 16H3v5"/>
                  </svg>
                  Refresh
                </button>
              </div>

              <div className="alerts-section">
                <div className="alerts-section-title">Your Alerts</div>
                <div className="alerts-list">
                  <div className="alert-row">
                    <div className="alert-icon red">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                    </div>
                    <div className="alert-content">
                      <div className="alert-title">7 Contracts Pending Renewal</div>
                      <div className="alert-sub">Deadline: June 2026</div>
                    </div>
                    <button className="alert-cta red" onClick={openChatDrawer}>Act Now</button>
                  </div>
                  <div className="alert-row">
                    <div className="alert-icon amber">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
                    </div>
                    <div className="alert-content">
                      <div className="alert-title">Material Changed for 22 SKUs</div>
                      <div className="alert-sub">Change detected across 3 brands</div>
                    </div>
                    <button className="alert-cta amber">Analyze</button>
                  </div>
                  <div className="alert-row">
                    <div className="alert-icon green">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                    </div>
                    <div className="alert-content">
                      <div className="alert-title">Machinery Secured for PP Bottles</div>
                      <div className="alert-sub">Increases production capacity by 30%</div>
                    </div>
                    <button className="alert-cta green">Review</button>
                  </div>
                  <div className="alert-row">
                    <div className="alert-icon green">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                    </div>
                    <div className="alert-content">
                      <div className="alert-title">PP Prices Drop in LATAM by 2.8%</div>
                      <div className="alert-sub">Reduces material spend for 103 SKUs</div>
                    </div>
                    <button className="alert-cta green">Review</button>
                  </div>
                </div>
              </div>

              <div className="kpi-grid">
                <div className="kpi-card">
                  <div className="kpi-card-top">
                    <div className="kpi-card-icon specs">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                    </div>
                    <span className="kpi-badge specs">Specs &amp; Goods</span>
                  </div>
                  <div>
                    <div className="kpi-name">Active SKUs — Cost Per Unit</div>
                    <div className="kpi-status good">Well within threshold</div>
                  </div>
                  <div className="kpi-bar-wrap">
                    <div className="kpi-bar-track"><div className="kpi-bar-fill good" style={{ width: '92%' }} /></div>
                    <div className="kpi-bar-footer"><span className="kpi-sync">Last sync: 2h ago</span><span className="kpi-pct good">92%</span></div>
                  </div>
                </div>
                <div className="kpi-card">
                  <div className="kpi-card-top">
                    <div className="kpi-card-icon supplier">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>
                    </div>
                    <span className="kpi-badge supplier">Supplier</span>
                  </div>
                  <div>
                    <div className="kpi-name">Should-Cost Compliance</div>
                    <div className="kpi-status warn">Nearing threshold</div>
                  </div>
                  <div className="kpi-bar-wrap">
                    <div className="kpi-bar-track"><div className="kpi-bar-fill warn" style={{ width: '78%' }} /></div>
                    <div className="kpi-bar-footer"><span className="kpi-sync">Last sync: 10m ago</span><span className="kpi-pct warn">78%</span></div>
                  </div>
                </div>
                <div className="kpi-card">
                  <div className="kpi-card-top">
                    <div className="kpi-card-icon feedstock">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M9 12h6"/><path d="M12 9v6"/></svg>
                    </div>
                    <span className="kpi-badge feedstock">Feedstock</span>
                  </div>
                  <div>
                    <div className="kpi-name">PP Resin Quantity</div>
                    <div className="kpi-status good">Well within threshold</div>
                  </div>
                  <div className="kpi-bar-wrap">
                    <div className="kpi-bar-track"><div className="kpi-bar-fill good" style={{ width: '100%' }} /></div>
                    <div className="kpi-bar-footer"><span className="kpi-sync">Last sync: 1d ago</span><span className="kpi-pct good">100%</span></div>
                  </div>
                </div>
                <div className="kpi-card">
                  <div className="kpi-card-top">
                    <div className="kpi-card-icon material">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"/></svg>
                    </div>
                    <span className="kpi-badge material">Material</span>
                  </div>
                  <div>
                    <div className="kpi-name">Material Spec Compliance</div>
                    <div className="kpi-status warn">Nearing threshold</div>
                  </div>
                  <div className="kpi-bar-wrap">
                    <div className="kpi-bar-track"><div className="kpi-bar-fill warn" style={{ width: '94%' }} /></div>
                    <div className="kpi-bar-footer"><span className="kpi-sync">Last sync: 5m ago</span><span className="kpi-pct warn">94%</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New Chat (both empty and filled coexist as siblings of main-content; one is .visible) */}
        {view !== 'alerts' && (
          <SpendNewChatScreen
            empty={view === 'newchat-empty'}
            filled={view === 'newchat-filled'}
            onActivate={activateNewChatFilled}
            onOpenTableModal={setModalTableId}
          />
        )}

        {/* Chat Drawer */}
        <SpendChatDrawer
          open={drawerOpen}
          onClose={closeChatDrawer}
          onOpenTableModal={setModalTableId}
          width={drawerWidth}
          onWidthChange={setDrawerWidth}
          onResizeAutoCollapse={autoCollapseSidebar}
          resetKey={drawerResetKey}
        />
      </div>

      {/* Table Modal */}
      <SpendTableModal tableId={modalTableId} onClose={() => setModalTableId(null)} />
    </div>
  );
}
