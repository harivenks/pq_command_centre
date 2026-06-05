import React, { useRef, useState, useEffect } from 'react';
import { Sun, Moon, Wifi, ChevronDown } from 'lucide-react';
import { Theme, ThemeColors } from './theme-config';

/* ── tab definitions ─────────────────────────────────────────── */
type TabBehavior = 'active' | 'external' | 'inactive';

interface Tab {
  id: string;
  label: string;
  behavior: TabBehavior;
  href?: string;
}

const TABS: Tab[] = [
  { id: 'command-centre',   label: 'Command Centre',   behavior: 'active'   },
  { id: 'spec-intelligence',label: 'Spec Intelligence', behavior: 'active'   },
  { id: 'strategy',         label: 'Strategy',          behavior: 'inactive' },
  { id: 'procurement',      label: 'Procurement',        behavior: 'active'   },
  { id: 'packaging',        label: 'Packaging',          behavior: 'inactive' },
  { id: 'supply-chain',     label: 'Supply Chain',       behavior: 'active'   },
  { id: 'sustainability',   label: 'Sustainability',      behavior: 'inactive' },
];

interface Props {
  theme: Theme;
  c: ThemeColors;
  activeTab: string;
  onTabChange: (id: string) => void;
  onThemeToggle: () => void;
}

export function NavBar({ theme, c, activeTab, onTabChange, onThemeToggle }: Props) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const [overflowIds, setOverflowIds] = useState<string[]>([]);
  const [moreOpen, setMoreOpen] = useState(false);

  /* detect which tabs overflow the container */
  useEffect(() => {
    function measure() {
      const container = tabsRef.current;
      if (!container) return;
      const containerRight = container.getBoundingClientRect().right;
      const hidden: string[] = [];
      container.querySelectorAll<HTMLElement>('[data-tabid]').forEach(el => {
        if (el.getBoundingClientRect().right > containerRight + 2) {
          hidden.push(el.dataset.tabid!);
        }
      });
      setOverflowIds(hidden);
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (tabsRef.current) ro.observe(tabsRef.current);
    return () => ro.disconnect();
  }, []);

  /* close "more" dropdown on outside click */
  useEffect(() => {
    if (!moreOpen) return;
    const close = () => setMoreOpen(false);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [moreOpen]);

  function handleTab(tab: Tab) {
    if (tab.behavior === 'inactive') return;
    if (tab.behavior === 'external') {
      window.open(tab.href, '_blank', 'noopener,noreferrer');
      onTabChange(tab.id);
      return;
    }
    onTabChange(tab.id);
  }

  const visibleTabs = TABS.filter(t => !overflowIds.includes(t.id));
  const hiddenTabs  = TABS.filter(t => overflowIds.includes(t.id));

  /* shared tab button style */
  function tabStyle(tab: Tab): React.CSSProperties {
    const isActive   = activeTab === tab.id;
    const isInactive = tab.behavior === 'inactive';
    return {
      padding: '0 13px',
      height: '100%',
      fontSize: 13,
      fontWeight: isActive ? 500 : 400,
      color: isActive ? c.text : c.textSub,
      background: 'transparent',
      border: 'none',
      borderBottom: isActive ? `2px solid ${c.teal}` : '2px solid transparent',
      borderTop: '2px solid transparent',
      cursor: isInactive ? 'default' : 'pointer',
      whiteSpace: 'nowrap' as const,
      transition: 'color 0.15s, border-color 0.15s',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      userSelect: 'none' as const,
      textDecoration: 'none',
    };
  }

  return (
    <nav style={{
      backgroundColor: c.surface,
      borderBottom: `1px solid ${c.border}`,
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      {/* hide scrollbar globally for this bar */}
      <style>{`
        .pq-tabs::-webkit-scrollbar { display: none; }
        .pq-tabs { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div style={{
        display: 'flex',
        alignItems: 'stretch',
        height: 48,
        paddingLeft: 20,
        paddingRight: 20,
      }}>
        {/* ── Logo ──────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 28, flexShrink: 0 }}>
          <svg width="32" height="22" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.255523 0.973201C1.09674 0.932302 2.10405 0.960177 2.9554 0.963883C2.95778 2.17684 3.01643 14.0297 2.9218 14.2666L2.81212 14.2814C1.88819 14.2923 0.964176 14.2903 0.0402709 14.2753C0.0214345 13.6422 0.0172749 12.9458 0.0322987 12.3138C0.120869 8.58933 -0.0821193 4.76788 0.0406574 1.05381C0.105192 0.973001 0.132853 0.992211 0.255523 0.973201Z" fill="#0191AA"/>
            <path d="M3.37114 0.959672C5.4845 0.86781 7.91359 0.681205 9.48022 2.32109C10.6121 3.50583 10.9718 4.52702 10.9755 6.12017C9.99173 6.16995 8.99698 6.15743 8.01157 6.15039C7.99624 5.53939 7.92879 5.04574 7.5018 4.54766C7.27558 4.28369 6.97737 4.09126 6.6437 3.99379C6.07607 3.83385 4.18952 3.97669 3.36621 3.91093L3.37114 0.959672Z" fill="#F75452"/>
            <path d="M10.9755 6.11914C10.9114 9.18147 8.33377 10.996 5.41324 10.9336L5.22954 10.9313C4.63397 10.9688 3.95344 10.9587 3.35791 10.9289C3.38529 10.0158 3.34134 9.03848 3.40506 8.13095C3.34878 7.97976 3.46701 7.95701 3.59019 7.94987C5.50535 7.83953 7.34702 8.59352 8.01156 6.14936C8.99697 6.15641 9.99172 6.16892 10.9755 6.11914Z" fill="#0191AA"/>
            <path d="M3.40506 8.13086C3.63791 8.31882 4.96194 10.5041 5.22954 10.9313C4.63397 10.9687 3.95344 10.9585 3.35791 10.9288C3.38529 10.0156 3.34134 9.03839 3.40506 8.13086Z" fill="#F75452"/>
            <path d="M11.543 2.92531C11.9658 2.45999 13.0704 2.10675 13.6855 1.83598L16.3633 0.68697C16.9123 0.452695 17.4918 0.1798 18.064 0.0232563C18.6214 -0.129248 19.3699 0.506405 19.853 0.820172L21.945 2.18121C21.5581 2.27688 20.1305 3.50847 19.8073 3.8181C18.9876 3.37893 18.3065 2.55382 17.2804 2.95091C16.6323 3.20171 14.5392 4.18832 14.1857 4.65086C13.2817 4.12113 12.4184 3.47729 11.543 2.92531Z" fill="#F75452"/>
            <path d="M21.945 2.18164C22.7374 2.71151 24.0247 3.29927 23.9362 4.33297C23.8595 5.22672 24.1535 10.5377 23.8831 10.9728C23.3528 10.7629 21.6446 9.59042 21.1262 9.21956C21.5353 8.56756 21.5012 6.33041 21.4713 5.49749C21.4385 4.57913 20.443 4.32997 19.8074 3.81852C20.1305 3.5089 21.5581 2.2773 21.945 2.18164Z" fill="#0191AA"/>
            <path d="M13.5155 11.8121C13.0036 11.5369 11.5117 10.6677 11.4864 10.0859C11.4123 8.38905 11.3593 6.6059 11.38 4.90174C11.3851 4.49256 11.3403 3.21338 11.5429 2.92578C12.4183 3.47777 13.2816 4.12161 14.1856 4.65133C13.7666 5.65354 13.7711 7.74204 13.9202 8.83003C13.976 9.2377 15.2287 9.86052 15.6096 10.1509C14.994 10.6474 14.1463 11.3744 13.5155 11.8121Z" fill="#0191AA"/>
            <path d="M23.8832 10.9725C23.4111 11.4644 22.1383 11.9187 21.4763 12.2202C21.3095 12.2962 21.1517 12.2627 20.996 12.1692C20.305 11.7539 19.6137 11.2635 18.9394 10.8206L17.0787 9.59018C16.8352 9.43235 15.1835 8.51449 15.4909 8.20799C15.9171 7.78306 17.1603 6.79902 17.794 7.10183C18.9485 7.65354 20.006 8.62175 21.1262 9.21919C21.6446 9.59018 23.3529 10.7625 23.8832 10.9725Z" fill="#F75452"/>
            <path d="M15.6095 10.1504C16.7869 10.8817 17.9796 11.7254 19.1636 12.469C19.6414 12.7691 21.3876 13.8628 21.7329 14.1831C21.0455 14.482 20.3511 14.7902 19.6549 15.0713C19.3104 15.2105 19.0057 15.2428 18.6564 15.0764C17.6769 14.6097 16.7938 13.9037 15.8712 13.3331C15.2353 12.9079 14.083 12.2513 13.5154 11.8117C14.1462 11.3739 14.9939 10.647 15.6095 10.1504Z" fill="#F75452"/>
          </svg>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: c.text, lineHeight: 1, letterSpacing: '-0.3px' }}>PacQuant</div>
          </div>
        </div>

        {/* ── Tabs ──────────────────────────────────────────── */}
        <div
          ref={tabsRef}
          className="pq-tabs"
          style={{
            display: 'flex',
            alignItems: 'stretch',
            flex: 1,
            overflowX: 'auto',
            minWidth: 0,
          }}
        >
          {TABS.map(tab => {
            const isOverflow = overflowIds.includes(tab.id);
            const isActive   = activeTab === tab.id;
            const isInactive = tab.behavior === 'inactive';
            const style = tabStyle(tab);

            const label = (
              <>
                <span style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  minWidth: 0,
                }}>
                  {tab.label}
                </span>
                {tab.behavior === 'external' && (
                  <span style={{ fontSize: 9, color: c.teal, fontWeight: 700, flexShrink: 0 }}>↗</span>
                )}
              </>
            );

            if (tab.behavior === 'external') {
              return (
                <a
                  key={tab.id}
                  data-tabid={tab.id}
                  href={tab.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onTabChange(tab.id)}
                  style={{ ...style, visibility: isOverflow ? 'hidden' : 'visible', position: isOverflow ? 'absolute' : 'relative' }}
                  onMouseEnter={e => { if (!isInactive) (e.currentTarget as HTMLElement).style.color = c.text; }}
                  onMouseLeave={e => { if (!isInactive) (e.currentTarget as HTMLElement).style.color = isActive ? c.text : c.textSub; }}
                >
                  {label}
                </a>
              );
            }

            return (
              <button
                key={tab.id}
                data-tabid={tab.id}
                onClick={() => handleTab(tab)}
                style={{ ...style, visibility: isOverflow ? 'hidden' : 'visible', position: isOverflow ? 'absolute' : 'relative' }}
                onMouseEnter={e => { if (!isInactive) (e.currentTarget as HTMLElement).style.color = c.text; }}
                onMouseLeave={e => { if (!isInactive) (e.currentTarget as HTMLElement).style.color = isActive ? c.text : c.textSub; }}
              >
                {label}
              </button>
            );
          })}

          {/* ── More (•••) button when tabs overflow ──────── */}
          {hiddenTabs.length > 0 && (
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', paddingLeft: 4 }}>
              <button
                onClick={e => { e.stopPropagation(); setMoreOpen(o => !o); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 3,
                  padding: '0 8px', height: 32,
                  background: moreOpen ? c.surfaceHover : 'transparent',
                  border: `1px solid ${moreOpen ? c.border : 'transparent'}`,
                  borderRadius: 4,
                  cursor: 'pointer',
                  color: c.textSub,
                  fontSize: 11,
                  transition: 'background 0.12s, border-color 0.12s',
                }}
              >
                <span style={{ letterSpacing: '2px' }}>•••</span>
                <ChevronDown size={11} />
              </button>

              {moreOpen && (
                <div
                  onMouseDown={e => e.stopPropagation()}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: 4,
                    backgroundColor: c.surface,
                    border: `1px solid ${c.border}`,
                    borderRadius: 6,
                    minWidth: 160,
                    zIndex: 100,
                    overflow: 'hidden',
                  }}
                >
                  {hiddenTabs.map(tab => {
                    const isInactive = tab.behavior === 'inactive';
                    const isActive   = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => { handleTab(tab); setMoreOpen(false); }}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          width: '100%', padding: '9px 14px',
                          background: isActive ? c.surfaceSelected : 'transparent',
                          border: 'none',
                          borderBottom: `1px solid ${c.border}`,
                          cursor: isInactive ? 'default' : 'pointer',
                          color: isInactive ? c.textMuted : isActive ? c.teal : c.textSub,
                          fontSize: 13,
                          opacity: isInactive ? 0.5 : 1,
                          textAlign: 'left',
                        }}
                      >
                        <span>{tab.label}</span>
                        {tab.behavior === 'external' && (
                          <span style={{ fontSize: 9, color: c.teal }}>↗</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Right controls ────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0, marginLeft: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              backgroundColor: c.green, display: 'inline-block',
              boxShadow: `0 0 0 2px ${c.greenBg}`,
            }} />
            <span style={{ fontSize: 11, color: c.green, fontWeight: 500, letterSpacing: '0.3px' }}>LIVE</span>
            <Wifi size={12} color={c.green} />
          </div>

          <div style={{ width: 1, height: 20, backgroundColor: c.border }} />

          <span style={{ fontSize: 11, color: c.textMuted, letterSpacing: '0.2px' }}>Updated 2m ago</span>

          <div style={{ width: 1, height: 20, backgroundColor: c.border }} />

          <button
            onClick={onThemeToggle}
            style={{
              padding: '4px 8px', borderRadius: 4,
              border: `1px solid ${c.border}`,
              background: c.surface, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 5,
              color: c.textSub,
              transition: 'border-color 0.15s',
            }}
          >
            {theme === 'dark' ? <Sun size={13} color={c.amber} /> : <Moon size={13} color={c.blue} />}
            <span style={{ fontSize: 11, color: c.textSub }}>
              {theme === 'dark' ? 'Light' : 'Dark'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}