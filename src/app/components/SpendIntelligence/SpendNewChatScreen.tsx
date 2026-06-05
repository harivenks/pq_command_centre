import { useEffect, useRef, useState } from 'react';
import {
  ChatLoader, ReactionRow, SourceTag, ExpandIcon, ArrowRightIcon,
} from './icons';
import { TopSkuTable, Brand3VendorTable } from './tables';

const LOADER_TEXTS = ['Thinking...', 'Unpacking...', 'Analyzing...'];

interface Props {
  /** When true the empty (intent+prompt-cards) state is visible. */
  empty: boolean;
  /** When true the filled-chat state is visible. */
  filled: boolean;
  /** Trigger when prompt card is clicked → parent flips to filled. */
  onActivate: () => void;
  onOpenTableModal: (id: string) => void;
}

type StepState = 'hidden' | 'user' | 'thinking' | 'response';

export function SpendNewChatScreen({ empty, filled, onActivate, onOpenTableModal }: Props) {
  const [showPromptCards, setShowPromptCards] = useState(false);
  const [stepStates, setStepStates] = useState<StepState[]>([ 'hidden', 'hidden', 'hidden' ]);
  const [labels, setLabels] = useState<string[]>([ LOADER_TEXTS[0], LOADER_TEXTS[0], LOADER_TEXTS[0] ]);
  const [chip1Disabled, setChip1Disabled] = useState(false);
  const [chip2Disabled, setChip2Disabled] = useState(false);
  const filledBodyRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  // Slide-down prompt cards 120ms after empty becomes visible
  useEffect(() => {
    if (!empty) { setShowPromptCards(false); return; }
    const t = window.setTimeout(() => setShowPromptCards(true), 120);
    return () => window.clearTimeout(t);
  }, [empty]);

  // Reset filled state when filled toggles off
  useEffect(() => {
    if (filled) return;
    clearTimers();
    setStepStates([ 'hidden', 'hidden', 'hidden' ]);
    setChip1Disabled(false);
    setChip2Disabled(false);
  }, [filled]);

  const scrollFilledToBottom = () => {
    const el = filledBodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };

  const cycleLoaderLabel = (stepIdx: number, durationMs: number) => {
    let i = 1;
    const id = window.setInterval(() => {
      setLabels((prev) => {
        const next = [...prev];
        next[stepIdx] = LOADER_TEXTS[i % LOADER_TEXTS.length];
        return next;
      });
      i++;
    }, 600);
    timersRef.current.push(window.setTimeout(() => window.clearInterval(id), durationMs));
  };

  const fireStep = (idx: number, settleMs: number) => {
    setLabels((prev) => { const next = [...prev]; next[idx] = LOADER_TEXTS[0]; return next; });
    setStepStates((prev) => { const next = [...prev]; next[idx] = 'user'; return next; });
    timersRef.current.push(window.setTimeout(scrollFilledToBottom, 50));

    timersRef.current.push(window.setTimeout(() => {
      setStepStates((prev) => { const next = [...prev]; next[idx] = 'thinking'; return next; });
      scrollFilledToBottom();
      cycleLoaderLabel(idx, settleMs - 300);
    }, 300));

    timersRef.current.push(window.setTimeout(() => {
      setStepStates((prev) => { const next = [...prev]; next[idx] = 'response'; return next; });
    }, settleMs));
  };

  // Q1 fires once when filled becomes true
  useEffect(() => {
    if (!filled) return;
    clearTimers();
    // small delay before showing user bubble — like the prototype's setTimeout 100ms
    timersRef.current.push(window.setTimeout(() => fireStep(0, 1900), 100));
    return clearTimers;
  }, [filled]);

  const handleChip1 = () => {
    if (chip1Disabled) return;
    setChip1Disabled(true);
    fireStep(1, 1800);
  };

  const handleChip2 = () => {
    if (chip2Disabled) return;
    setChip2Disabled(true);
    fireStep(2, 1800);
  };

  return (
    <>
      {/* ─────────────── EMPTY STATE ─────────────── */}
      <div className={'new-chat-screen' + (empty ? ' visible' : '')}>
        <div className="new-chat-bg" />

        <div className="new-chat-header">
          <div className="new-chat-header-title">New Chat</div>
          <div className="new-chat-header-actions">
            <button className="header-icon-btn" title="Notifications" style={{ position: 'relative' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
              <span className="notif-dot" />
            </button>
            <button className="header-icon-btn" title="Settings">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
            <div className="header-divider" />
            <div className="header-avatar" title="Profile">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
            </div>
          </div>
        </div>

        <div className="new-chat-center">
          <div className="new-chat-heading">What do you want to analyze today?</div>

          <div className="intent-pills">
            <button className="intent-pill active">Analyze</button>
            <button className="intent-pill inactive">Find</button>
            <button className="intent-pill inactive">Recommend</button>
            <button className="intent-pill inactive">Compare</button>
            <button className="intent-pill inactive">Illustrate</button>
          </div>

          <div className={'prompt-cards' + (showPromptCards ? ' visible' : '')}>
            <button className="prompt-card clickable" onClick={onActivate}>
              <div className="prompt-card-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
              </div>
              <span className="prompt-card-text">Which are the top volume SKUs?</span>
              <svg className="prompt-card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
            <div className="prompt-card inactive">
              <div className="prompt-card-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
              </div>
              <span className="prompt-card-text">Identify rigids SKUs that can be considered for replacement.</span>
            </div>
            <div className="prompt-card inactive">
              <div className="prompt-card-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              </div>
              <span className="prompt-card-text">Suggest ways to optimize folding cartons based on GSM.</span>
            </div>
          </div>
        </div>

        <div className="new-chat-input-bar">
          <div className="new-chat-input-wrap">
            <textarea className="new-chat-input-field" placeholder="How can I help you today?" rows={1} />
            <div className="new-chat-input-actions">
              <button className="new-chat-attach-btn" title="Attach file">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
              </button>
              <button className="new-chat-send-btn" title="Send">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </button>
            </div>
          </div>
          <div className="new-chat-footer-text">PacQuant AI can make mistakes. Please double-check responses.</div>
        </div>
      </div>

      {/* ─────────────── FILLED STATE ─────────────── */}
      <div className={'nc-filled' + (filled ? ' visible' : '')}>
        <div className="nc-filled-header">
          <div className="nc-filled-header-left">
            <div className="nc-filled-header-title">Spend Intelligence</div>
            <div className="nc-filled-header-sub">Last Library Update: Jun 2, 2026, 10:32 AM</div>
          </div>
          <div className="nc-filled-header-actions">
            <button className="header-icon-btn" title="More options">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
            </button>
            <button className="nc-header-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              Export
            </button>
            <button className="nc-header-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
              Artifacts
            </button>
          </div>
        </div>

        <div className="nc-filled-body" ref={filledBodyRef}>
          <div className="nc-messages">

            {/* Q1 */}
            <div className={'nc-user-row' + (stepStates[0] !== 'hidden' ? ' visible' : '')}>
              <div className="nc-user-bubble">Which are the top volume SKUs?</div>
            </div>
            <div className={'nc-thinking' + (stepStates[0] === 'thinking' ? ' visible' : '')}>
              <ChatLoader />
              <span className="chat-thinking-label">{labels[0]}</span>
            </div>
            <div className={'nc-response' + (stepStates[0] === 'response' ? ' visible' : '')}>
              <div className="chat-response-heading">Top 3 SKUs Drive 22.4% of Total Portfolio Volume</div>
              <div className="chat-response-body">
                <p>Across the full portfolio of 12 SKUs, total annual volume is approx. 2.0 billion units. The top 3 SKUs by volume are all Rigid Packaging — 2 under Brand 1 (Talc Bottles) and 1 under Brand 3 (Jar). Together they account for approx. 22.4% of portfolio volume.</p>
              </div>
              <div className="chat-table-outer">
                <div className="chat-table-header">
                  <span className="chat-table-label">Top Volume SKUs — 3 records</span>
                  <button className="chat-table-expand-btn" onClick={() => onOpenTableModal('ncTopSkuTable')}><ExpandIcon /> Expand</button>
                </div>
                <div className="chat-table-wrap"><TopSkuTable /></div>
              </div>
              <div className="chat-response-callout teal">The #1 SKU alone (Talc 30g Bottle, Brand 1) contributes approx. 12% of total portfolio volume — 2.5× more than the #3-ranked SKU.</div>
              <div className="chat-source-row"><SourceTag>SKU_Master.xlsx</SourceTag></div>
              <ReactionRow />
              <div className="chat-followups">
                <div className="chat-followups-label">Suggested follow-up</div>
                <button className={'chat-followup-chip' + (chip1Disabled ? ' disabled' : '')} onClick={handleChip1} disabled={chip1Disabled}>
                  Which SKU has the highest annual spend? Is it driven by high cost or high volume?
                  <ArrowRightIcon />
                </button>
              </div>
            </div>

            {/* Q2 */}
            <div className={'nc-user-row' + (stepStates[1] !== 'hidden' ? ' visible' : '')}>
              <div className="nc-user-bubble">Which SKU has the highest annual spend? Is it driven by high cost or high volume?</div>
            </div>
            <div className={'nc-thinking' + (stepStates[1] === 'thinking' ? ' visible' : '')}>
              <ChatLoader />
              <span className="chat-thinking-label">{labels[1]}</span>
            </div>
            <div className={'nc-response' + (stepStates[1] === 'response' ? ' visible' : '')}>
              <div className="chat-response-heading">Highest Spend SKU Driven by Cost, Not Volume</div>
              <div className="chat-response-body">
                <p>The highest annual spend SKU is not the highest volume one — it is driven by cost, not scale.</p>
                <p><strong>Highest spend SKU:</strong> Brand 3 — Jar 500g / 720ml (SKU 68815171)</p>
                <ul>
                  <li><span>Annual spend (approx.): <strong>$5.77M</strong></span></li>
                  <li><span>Annual volume (approx.): <strong>103M units</strong> — ranked 3rd in the portfolio by volume</span></li>
                </ul>
                <p><strong>Why cost is the driver, not volume:</strong></p>
                <ul>
                  <li><span>Brand 1's Talc 30g Bottle (SKU 11494478) has approx. <strong>2.5× more volume</strong> — 241M units — but spends only approx. <strong>$3.46M</strong> annually</span></li>
                  <li><span>Brand 1's unit cost is approx. <strong>4.3× lower</strong> than Brand 3's jar — the size and complexity of the jar drives the cost gap</span></li>
                  <li><span>Brand 3's jar is priced approx. <strong>23.2% above</strong> its should-cost benchmark ($59.75 vs $48.51 per 1000 units), indicating potential savings of approx. <strong>$1.09M annually</strong> on this SKU alone</span></li>
                </ul>
                <p><strong>Supplied by:</strong> Vendor B, Vendor C, Vendor D — across three converters with no single-source dependency.</p>
              </div>
              <div className="chat-response-callout teal">Brand 3's jar carries 67% more annual spend than Brand 1's top-volume bottle despite shipping 2.5× fewer units — cost-per-unit, not scale, is the lever.</div>
              <div className="chat-source-row"><SourceTag>SKU_Master.xlsx</SourceTag></div>
              <ReactionRow />
              <div className="chat-followups">
                <div className="chat-followups-label">Suggested follow-up</div>
                <button className={'chat-followup-chip' + (chip2Disabled ? ' disabled' : '')} onClick={handleChip2} disabled={chip2Disabled}>
                  Which vendor offers the best price for the Brand 3 jar?
                  <ArrowRightIcon />
                </button>
              </div>
            </div>

            {/* Q3 */}
            <div className={'nc-user-row' + (stepStates[2] !== 'hidden' ? ' visible' : '')}>
              <div className="nc-user-bubble">Which vendor offers the best price for the Brand 3 jar?</div>
            </div>
            <div className={'nc-thinking' + (stepStates[2] === 'thinking' ? ' visible' : '')}>
              <ChatLoader />
              <span className="chat-thinking-label">{labels[2]}</span>
            </div>
            <div className={'nc-response' + (stepStates[2] === 'response' ? ' visible' : '')}>
              <div className="chat-response-heading">Vendor B Offers the Best Price — Only Vendor Within 20% of Should Cost</div>
              <div className="chat-response-body">
                <p>Vendor B is the most competitive vendor for this SKU — and the only one within 20% of should cost.</p>
                <p>All three vendors are above should cost ($48.51/1000 units), but the spread between cheapest and most expensive is <strong>$3.49 per 1000 units</strong> — meaningful at these volumes.</p>
              </div>
              <div className="chat-table-outer">
                <div className="chat-table-header">
                  <span className="chat-table-label">Brand 3 Jar Vendor Pricing — 3 records</span>
                  <button className="chat-table-expand-btn" onClick={() => onOpenTableModal('ncBrand3VendorTable')}><ExpandIcon /> Expand</button>
                </div>
                <div className="chat-table-wrap"><Brand3VendorTable /></div>
              </div>
              <div className="chat-response-body">
                <p>Vendor B quotes the lowest price and has the largest allocated volume.</p>
                <p>Vendor C is the most expensive across every plant it supplies — and carries the largest saving potential at approx. <strong>$603,086 annually</strong> if negotiated back to should cost.</p>
              </div>
              <div className="chat-response-callout teal">If the renewal negotiation targets should cost across all three vendors, the combined saving on this SKU alone is approx. <strong>$1.09M annually</strong>.</div>
              <div className="chat-source-row"><SourceTag>SKU_Master.xlsx</SourceTag></div>
              <ReactionRow />
            </div>

          </div>
        </div>

        <div className="nc-filled-input-bar">
          <div className="nc-filled-input-wrap">
            <textarea className="nc-filled-input-field" placeholder="Ask a follow-up" rows={1} />
            <div className="nc-filled-input-actions">
              <button className="new-chat-attach-btn" title="Attach file">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
              </button>
              <button className="new-chat-send-btn" title="Send">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </button>
            </div>
          </div>
          <div className="nc-filled-footer-text">PacQuant AI can make mistakes. Please double-check responses.</div>
        </div>
      </div>
    </>
  );
}
