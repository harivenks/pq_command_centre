import { useEffect, useRef, useState, useCallback } from 'react';
import {
  ChatLoader, ReactionRow, SourceTag, ExpandIcon,
} from './icons';
import { ContractsTable, SkusTable, BenchmarkTable, ThresholdTable } from './tables';

const LOADER_TEXTS = ['Thinking...', 'Unpacking...', 'Analyzing...'];
const STEPS = 6;

interface Props {
  open: boolean;
  onClose: () => void;
  onOpenTableModal: (id: string) => void;
  width: number | null;            // null = use CSS default (35%)
  onWidthChange: (w: number | null) => void;
  /** Called whenever the drawer resizes; lets parent auto-collapse the sidebar at >40% viewport. */
  onResizeAutoCollapse: (w: number) => void;
  /** Reset trigger — bumped by parent when "Act Now" is clicked again to restart the flow. */
  resetKey: number;
}

type StepState = 'hidden' | 'user' | 'thinking' | 'response';

export function SpendChatDrawer({ open, onClose, onOpenTableModal, width, onWidthChange, onResizeAutoCollapse, resetKey }: Props) {
  // Per-step visibility state
  const [stepStates, setStepStates] = useState<StepState[]>(() => Array(STEPS).fill('hidden'));
  const [thinkingLabels, setThinkingLabels] = useState<string[]>(() => LOADER_TEXTS.slice(0, STEPS).concat(LOADER_TEXTS).slice(0, STEPS));
  const [currentStep, setCurrentStep] = useState(1);
  const [inputValue, setInputValue] = useState('');

  const bodyRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  const runStep = useCallback((step1Based: number) => {
    const i = step1Based - 1;
    const label = LOADER_TEXTS[i % LOADER_TEXTS.length];
    setThinkingLabels((prev) => { const next = [...prev]; next[i] = label; return next; });

    // Show user bubble
    setStepStates((prev) => { const next = [...prev]; next[i] = 'user'; return next; });
    timersRef.current.push(window.setTimeout(() => {
      const el = stepRefs.current[i];
      if (el) el.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }, 50));

    // Show loader
    timersRef.current.push(window.setTimeout(() => {
      setStepStates((prev) => { const next = [...prev]; next[i] = 'thinking'; return next; });
    }, 300));

    // Hide loader, show response
    timersRef.current.push(window.setTimeout(() => {
      setStepStates((prev) => { const next = [...prev]; next[i] = 'response'; return next; });
    }, 1800));
  }, []);

  // Kick off step 1 whenever the drawer opens (or resetKey changes while open)
  useEffect(() => {
    if (!open) return;
    clearTimers();
    setStepStates(Array(STEPS).fill('hidden'));
    setCurrentStep(2);
    setInputValue('');
    runStep(1);
    return clearTimers;
  }, [open, resetKey, runStep]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    if (currentStep > STEPS) return;
    setInputValue('');
    const step = currentStep;
    setCurrentStep((s) => s + 1);
    runStep(step);
  };

  // Drawer resize
  const drawerRef = useRef<HTMLDivElement>(null);
  const resizeStateRef = useRef<{ startX: number; startWidth: number } | null>(null);
  const [dragging, setDragging] = useState(false);

  const onResizeMouseDown = (e: React.MouseEvent) => {
    if (!drawerRef.current) return;
    resizeStateRef.current = { startX: e.clientX, startWidth: drawerRef.current.offsetWidth };
    setDragging(true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    e.preventDefault();
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      if (!resizeStateRef.current) return;
      const vw = window.innerWidth;
      const minW = 300;
      const maxW = Math.floor(vw * 0.5);
      const delta = resizeStateRef.current.startX - e.clientX;
      const newW = Math.min(maxW, Math.max(minW, resizeStateRef.current.startWidth + delta));
      onWidthChange(newW);
      onResizeAutoCollapse(newW);
    };
    const onUp = () => {
      setDragging(false);
      resizeStateRef.current = null;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [dragging, onWidthChange, onResizeAutoCollapse]);

  // Textarea auto-grow
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 96) + 'px';
  }, [inputValue]);

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const drawerStyle: React.CSSProperties = open && width
    ? { width, minWidth: 300 }
    : {};

  return (
    <div
      ref={drawerRef}
      className={'drawer' + (open ? ' open' : '')}
      style={drawerStyle}
    >
      <div
        className={'drawer-resize' + (dragging ? ' dragging' : '')}
        onMouseDown={onResizeMouseDown}
      />

      <div className="drawer-header">
        <div className="drawer-header-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </div>
        <div className="drawer-header-text">
          <div className="drawer-header-title">Spend Intelligence Chat</div>
          <div className="drawer-header-sub">Contracts · Renewal Analysis</div>
        </div>
        <button className="drawer-close" onClick={onClose} title="Collapse panel">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/><path d="m10 9 3 3-3 3"/></svg>
        </button>
      </div>

      <div className="drawer-body" ref={bodyRef}>

        {/* ─────────────── Step 1 ─────────────── */}
        <div className={'chat-user-row' + (stepStates[0] !== 'hidden' ? ' visible' : '')} ref={(el) => { stepRefs.current[0] = el; }}>
          <div className="chat-user-bubble">Show me the contracts pending renewal and the vendors associated with them.</div>
        </div>
        <div className={'chat-thinking' + (stepStates[0] === 'thinking' ? ' visible' : '')}>
          <ChatLoader />
          <span className="chat-thinking-label">{thinkingLabels[0]}</span>
        </div>
        <div className={'chat-system-response' + (stepStates[0] === 'response' ? ' visible' : '')}>
          <div className="chat-response-heading">7 Contracts Pending Renewal — June 2026</div>
          <div className="chat-response-body">
            <p>Here are the 7 contracts pending renewal before June 2026. Of these, 4 are with bottle packaging vendors — these are the most time-sensitive given your active production dependency.</p>
          </div>
          <div className="chat-table-outer">
            <div className="chat-table-header">
              <span className="chat-table-label">Contracts — 7 records</span>
              <button className="chat-table-expand-btn" onClick={() => onOpenTableModal('contractsTable')}><ExpandIcon /> Expand</button>
            </div>
            <div className="chat-table-wrap"><ContractsTable /></div>
          </div>
          <div className="chat-response-callout">The 4 bottle vendor contracts represent a combined annual spend of $22.23M — your highest-value renewal cluster this month.</div>
          <p className="chat-response-note">All values converted at 1 USD = ₹94.</p>
          <div className="chat-source-row">
            <SourceTag>Contract_Master.xlsx</SourceTag>
            <SourceTag>Vendor_Registry.xlsx</SourceTag>
          </div>
          <ReactionRow />
        </div>

        {/* ─────────────── Step 2 ─────────────── */}
        <div className={'chat-user-row' + (stepStates[1] !== 'hidden' ? ' visible' : '')} ref={(el) => { stepRefs.current[1] = el; }}>
          <div className="chat-user-bubble">Show me only the vendors supplying bottles and the SKUs impacted.</div>
        </div>
        <div className={'chat-thinking' + (stepStates[1] === 'thinking' ? ' visible' : '')}>
          <ChatLoader />
          <span className="chat-thinking-label">{thinkingLabels[1]}</span>
        </div>
        <div className={'chat-system-response' + (stepStates[1] === 'response' ? ' visible' : '')}>
          <div className="chat-response-heading">12 SKUs Across 4 Bottle Vendors</div>
          <div className="chat-response-body">
            <p>Vendors A, B, D and E have active contracts for supplying bottles, covering 12 SKUs across your inventory. These SKUs span two production platforms — ISBM-1 and EBM — across plants ULU, UPQ, U829 and U895.</p>
          </div>
          <div className="chat-table-outer">
            <div className="chat-table-header">
              <span className="chat-table-label">SKUs — 12 records</span>
              <button className="chat-table-expand-btn" onClick={() => onOpenTableModal('skusTable')}><ExpandIcon /> Expand</button>
            </div>
            <div className="chat-table-wrap"><SkusTable /></div>
          </div>
          <div className="chat-response-callout teal">At a glance, current prices on several SKUs appear to be running above should cost — particularly the high-volume EBM SKUs at Plant U829.</div>
          <div className="chat-source-row">
            <SourceTag>SKU_Master.xlsx</SourceTag>
            <SourceTag>Should_Cost_Model.xlsx</SourceTag>
          </div>
          <ReactionRow />
        </div>

        {/* ─────────────── Step 3 ─────────────── */}
        <div className={'chat-user-row' + (stepStates[2] !== 'hidden' ? ' visible' : '')} ref={(el) => { stepRefs.current[2] = el; }}>
          <div className="chat-user-bubble">Benchmark these SKUs against our should cost model.</div>
        </div>
        <div className={'chat-thinking' + (stepStates[2] === 'thinking' ? ' visible' : '')}>
          <ChatLoader />
          <span className="chat-thinking-label">{thinkingLabels[2]}</span>
        </div>
        <div className={'chat-system-response' + (stepStates[2] === 'response' ? ' visible' : '')}>
          <div className="chat-response-heading">Should Cost Benchmarking — 12 SKUs</div>
          <div className="chat-response-body">
            <p>Here is the full benchmarking of all 12 SKUs against the should cost model. 11 out of 12 SKUs are priced above should cost — only the PCC 8gm Jar at Plant ULU is within an acceptable range.</p>
          </div>
          <div className="chat-table-outer">
            <div className="chat-table-header">
              <span className="chat-table-label">Benchmarking — 12 records</span>
              <button className="chat-table-expand-btn" onClick={() => onOpenTableModal('benchmarkTable')}><ExpandIcon /> Expand</button>
            </div>
            <div className="chat-table-wrap"><BenchmarkTable /></div>
          </div>
          <div className="chat-response-callout">The U829 EBM SKUs show the largest deviation — deltas between +19.5% and +23.5% on some of your highest-volume lines. The contract renewal window is the right moment to push these back towards should cost.</div>
          <div className="chat-source-row">
            <SourceTag>Should_Cost_Model.xlsx</SourceTag>
            <SourceTag>SKU_Master.xlsx</SourceTag>
          </div>
          <ReactionRow />
        </div>

        {/* ─────────────── Step 4 ─────────────── */}
        <div className={'chat-user-row' + (stepStates[3] !== 'hidden' ? ' visible' : '')} ref={(el) => { stepRefs.current[3] = el; }}>
          <div className="chat-user-bubble">What is driving the variance on the EBM SKUs?</div>
        </div>
        <div className={'chat-thinking' + (stepStates[3] === 'thinking' ? ' visible' : '')}>
          <ChatLoader />
          <span className="chat-thinking-label">{thinkingLabels[3]}</span>
        </div>
        <div className={'chat-system-response' + (stepStates[3] === 'response' ? ' visible' : '')}>
          <div className="chat-response-heading">What's Driving the EBM Variance</div>
          <div className="chat-response-body">
            <p>Based on the data we have, here's what I can credibly attribute the variance to:</p>
            <p><strong>Data-backed insights:</strong></p>
            <ul>
              <li><span>All 9 U829 SKUs have identical pricing ($57.96 or $60.93 per 1000 pcs) despite being different SKUs with different descriptions and volumes. This is a flat rate applied across the board — not SKU-specific pricing.</span></li>
              <li><span>The should cost for U829 ranges from $48.51 to $49.33. The delta is consistently high, between +19.5% and +23.5%.</span></li>
              <li><span>U895 EBM SKUs (Talc 30g BTL) show a smaller but still notable variance (+8.1% and +16.1%).</span></li>
              <li><span>The one ISBM SKU within range (PCC 8gm Jar, ULU) is a different platform entirely.</span></li>
            </ul>
            <p><strong>Overarching reasons:</strong></p>
            <ul>
              <li><span>The gap is the vendor's margin on top of a flat-rate structure that was never challenged during the last renewal cycle.</span></li>
              <li><span>The dynamic resin/material cost trends — especially for HDPE — also do not seem to be reflected in the pricing of these SKUs.</span></li>
            </ul>
            <p>I suggest you address this in the upcoming contract renewal negotiations with your vendor to bring the current price under the should cost threshold.</p>
          </div>
          <div className="chat-source-row">
            <SourceTag>Should_Cost_Model.xlsx</SourceTag>
            <SourceTag>SKU_Master.xlsx</SourceTag>
          </div>
          <ReactionRow />
        </div>

        {/* ─────────────── Step 5 ─────────────── */}
        <div className={'chat-user-row' + (stepStates[4] !== 'hidden' ? ' visible' : '')} ref={(el) => { stepRefs.current[4] = el; }}>
          <div className="chat-user-bubble">Show me only those SKUs where the delta is more than 4% vs should cost.</div>
        </div>
        <div className={'chat-thinking' + (stepStates[4] === 'thinking' ? ' visible' : '')}>
          <ChatLoader />
          <span className="chat-thinking-label">{thinkingLabels[4]}</span>
        </div>
        <div className={'chat-system-response' + (stepStates[4] === 'response' ? ' visible' : '')}>
          <div className="chat-response-heading">11 SKUs Above the 4% Threshold</div>
          <div className="chat-response-body">
            <p>11 SKUs breach the 4% threshold while 1 SKU — PCC 8gm Jar — is within range and can be renewed as-is.</p>
          </div>
          <div className="chat-table-outer">
            <div className="chat-table-header">
              <span className="chat-table-label">SKUs above threshold — 11 records</span>
              <button className="chat-table-expand-btn" onClick={() => onOpenTableModal('thresholdTable')}><ExpandIcon /> Expand</button>
            </div>
            <div className="chat-table-wrap"><ThresholdTable /></div>
          </div>
          <div className="chat-response-callout teal">These 11 SKUs span 3 vendors and 2 plants. If pricing is negotiated back to should cost across all 11, the estimated annual saving is significant based on current volumes.</div>
          <div className="chat-response-body" style={{ marginTop: 10 }}>
            <p>Want me to give you the complete data to help you draft an RFQ?</p>
          </div>
          <div className="chat-source-row">
            <SourceTag>Should_Cost_Model.xlsx</SourceTag>
            <SourceTag>SKU_Master.xlsx</SourceTag>
          </div>
          <ReactionRow />
        </div>

        {/* ─────────────── Step 6 ─────────────── */}
        <div className={'chat-user-row' + (stepStates[5] !== 'hidden' ? ' visible' : '')} ref={(el) => { stepRefs.current[5] = el; }}>
          <div className="chat-user-bubble">Yes, go ahead.</div>
        </div>
        <div className={'chat-thinking' + (stepStates[5] === 'thinking' ? ' visible' : '')}>
          <ChatLoader />
          <span className="chat-thinking-label">{thinkingLabels[5]}</span>
        </div>
        <div className={'chat-system-response' + (stepStates[5] === 'response' ? ' visible' : '')}>
          <div className="chat-response-heading">RFQ Data Pack — Ready</div>
          <div className="chat-response-body">
            <p>The document covers 11 SKUs across Vendors B, D and E, with should cost targets, current pricing, annual volumes and variance detail for each line item. This gives your negotiation team a complete view.</p>
          </div>
          <div className="artifact-card">
            <div className="artifact-card-left">
              <div className="artifact-card-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D3E53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              </div>
              <div className="artifact-card-text">
                <div className="artifact-card-title">SKUs_with_variance_for_RFQ.xlsx</div>
                <div className="artifact-card-subtitle">11 SKUs · 28 columns · Generated for RFQ</div>
              </div>
            </div>
            <div className="artifact-card-right">
              <div className="artifact-dl-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D3E53" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </div>
              <div className="artifact-dl-btn">Download</div>
            </div>
          </div>
          <div className="chat-source-row">
            <SourceTag>Should_Cost_Model.xlsx</SourceTag>
            <SourceTag>SKU_Master.xlsx</SourceTag>
          </div>
          <ReactionRow />
        </div>

      </div>

      <div className="drawer-footer">
        <div className="drawer-input-wrap">
          <textarea
            ref={inputRef}
            className="drawer-input"
            placeholder="Ask anything about your spend data..."
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={onKey}
          />
          <button className="drawer-send" title="Send" onClick={handleSend}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
