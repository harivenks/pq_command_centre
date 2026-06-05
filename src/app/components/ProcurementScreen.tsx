import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Sparkles, RotateCcw, ArrowRight, X } from 'lucide-react';
import { ThemeColors } from './theme-config';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, ReferenceLine, ComposedChart, Line,
} from 'recharts';
import { GlobalSupplierMap } from './GlobalSupplierMap';

/* ─────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────── */
const FILTERS = [
  { id: 'brand', label: 'Brand', value: 'All Brands' },
  { id: 'ppt', label: 'Primary Pack Type', value: 'All Types' },
  { id: 'pkg', label: 'Packaging Type', value: 'All' },
  { id: 'region', label: 'Region', value: 'Global' },
  { id: 'supplier', label: 'Supplier', value: 'All Suppliers' },
  { id: 'fgsize', label: 'FG Pack Size', value: 'All Sizes' },
];

const SPEND_GLOBAL = [
  { region: 'EMEA', value: 35000, pct: 35 },
  { region: 'APAC', value: 19000, pct: 19 },
  { region: 'NA', value: 46000, pct: 46 },
  { region: 'LATAM', value: 0, pct: 0 },
];
const SPEND_EMEA = [
  { region: 'EMEA', value: 35000, pct: 100 },
  { region: 'APAC', value: 0, pct: 0 },
  { region: 'NA', value: 0, pct: 0 },
  { region: 'LATAM', value: 0, pct: 0 },
];

const PRICE_GLOBAL = [
  { region: 'EMEA', price: 0.95, vol: 35000 },
  { region: 'NA', price: 1.10, vol: 46000 },
  { region: 'APAC', price: 1.20, vol: 19000 },
  { region: 'LATAM', price: 0.85, vol: 0 },
];
const PRICE_EMEA = [
  { region: 'Sweden', price: 0.74, vol: 1500000 },
  { region: 'Germany', price: 0.69, vol: 3522222 },
  { region: 'Zambia', price: 1.10, vol: 147777 },
  { region: 'France', price: 0.95, vol: 1147777 },
];

const MSG1_CHART_DATA = [
  { region: 'EMEA', vol: 46000, price: 0.69 },
  { region: 'APAC', vol: 0, price: 0 },
  { region: 'LATAM', vol: 20000, price: 0.82 },
  { region: 'NA', vol: 34000, price: 0.77 },
];
const MSG1_TABLE_DATA = [
  { region: 'EMEA', vol: 46000, price: 0.69 },
  { region: 'APAC', vol: 0, price: 0 },
  { region: 'LATAM', vol: 20000, price: 0.82 },
  { region: 'NA', vol: 34000, price: 0.77 },
];

const MSG2_CHART_DATA = [
  { supplier: 'Supplier A', avgPrice: 0.8, vol: 6000, material: 0.15, conversion: 0.55, logistics: 0.1 },
  { supplier: 'Supplier B', avgPrice: 0.76, vol: 16000, material: 0.17, conversion: 0.5, logistics: 0.09 },
  { supplier: 'Supplier D', avgPrice: 0.77, vol: 12000, material: 0.15, conversion: 0.53, logistics: 0.09 },
];
const MSG2_TABLE_DATA = [
  { supplier: 'Supplier A', avgPrice: 0.8, vol: 6000, material: 0.15, conversion: 0.55, logistics: 0.1 },
  { supplier: 'Supplier B', avgPrice: 0.76, vol: 16000, material: 0.17, conversion: 0.5, logistics: 0.09 },
  { supplier: 'Supplier D', avgPrice: 0.77, vol: 12000, material: 0.15, conversion: 0.53, logistics: 0.09 },
];

const MSG3_CHART_DATA = [
  { name: 'Supplier A', material: 0.15, conversion: 0.55, logistics: 0.1 },
  { name: 'Supplier B', material: 0.17, conversion: 0.5, logistics: 0.09 },
  { name: 'Supplier C', material: 0.15, conversion: 0.53, logistics: 0.09 },
  { name: 'Market', material: 0.15, conversion: 0.48, logistics: 0.09 },
];
const MSG3_TABLE_DATA = [
  { source: 'Supplier A', benchmark: 'Current price', material: 0.15, conversion: 0.55, logistics: 0.1, total: 0.8 },
  { source: 'Supplier B', benchmark: 'Current price', material: 0.17, conversion: 0.5, logistics: 0.09, total: 0.76 },
  { source: 'Supplier C', benchmark: 'Current price', material: 0.15, conversion: 0.53, logistics: 0.09, total: 0.77 },
  { source: 'Market', benchmark: 'Should cost', material: 0.15, conversion: 0.48, logistics: 0.09, total: 0.72 },
];

/* ─────────────────────────────────────────────────────────────────
   REGION BUBBLES
───────────────────────────────────────────────────────────────── */


/* ─────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────── */
interface Props { c: ThemeColors; }

type ChatMsg =
  | { id: string; kind: 'user'; text: string }
  | { id: string; kind: 'msg1' }
  | { id: string; kind: 'msg2' }
  | { id: string; kind: 'msg3' };

const PANEL_WIDTH = 400;

export function ProcurementScreen({ c }: Props) {

  const [chatOpen, setChatOpen] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [suggGroup, setSuggGroup] = useState<0 | 1 | 2 | 3>(0);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDark = c.bg === '#0c0c10';

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatLoading]);

  function handleSummarize() {
    if (messages.length > 0) return;
    setChatLoading(true);
    setTimeout(() => {
      const userMsg: ChatMsg = {
        id: 'u1',
        kind: 'user',
        text: 'Summarize the average cost of paper cup procured for Brand A in 2025 for all regions and map against volumes supplied',
      };
      setMessages([userMsg]);
      setChatLoading(true);
      setTimeout(() => {
        setChatLoading(false);
        setMessages(prev => [...prev, { id: 'msg1', kind: 'msg1' }]);
        setTimeout(() => setSuggGroup(1), 300);
      }, 900);
    }, 100);
  }



  function handleOpenSummarize() {
    setChatOpen(true);
    handleSummarize();
  }

  const GROUP1 = [
    'For NA region, share details of suppliers and their prices for paper cups of 120ml',
    'Show break-up of the average unit price by supplier for EMEA',
    'Prepare a report of the average unit price findings across regions',
  ];
  const GROUP2 = [
    'Compare current supplier prices with should-cost as per the market benchmark',
    'View all materials being sourced from Supplier A',
    'Break down the suppliers by region and illustrate',
  ];

  function handleSuggestion(idx: number) {
    if (suggGroup === 1) {
      const text = GROUP1[idx];
      setSuggGroup(0);
      setMessages(prev => [...prev, { id: `u${Date.now()}`, kind: 'user', text }]);
      setChatLoading(true);
      setTimeout(() => {
        setChatLoading(false);
        setMessages(prev => [...prev, { id: 'msg2', kind: 'msg2' }]);
        setTimeout(() => setSuggGroup(2), 300);
      }, 950);
    } else if (suggGroup === 2) {
      const text = GROUP2[idx];
      setSuggGroup(0);
      setMessages(prev => [...prev, { id: `u${Date.now()}`, kind: 'user', text }]);
      setChatLoading(true);
      setTimeout(() => {
        setChatLoading(false);
        setMessages(prev => [...prev, { id: 'msg3', kind: 'msg3' }]);
        setTimeout(() => setSuggGroup(3), 300);
      }, 1000);
    }
  }



  function Tip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    return (
      <div style={{ backgroundColor: c.surface, border: `1px solid ${c.border}`, borderRadius: 4, padding: '7px 11px', fontSize: 12 }}>
        <div style={{ color: c.textMuted, fontSize: 10, marginBottom: 4 }}>{label}</div>
        {payload.map((p: any) => {
          let formatted = p.value;
          if (p.dataKey === 'value' || p.dataKey === 'vol') formatted = p.value.toLocaleString();
          else if (p.dataKey === 'pct') formatted = `${p.value}%`;
          else if (p.dataKey === 'price' || p.dataKey === 'avgPrice') formatted = `$${p.value.toFixed(2)}`;
          else if (typeof p.value === 'number' && p.value < 10) formatted = `$${p.value.toFixed(2)}`;
          return (
            <div key={p.dataKey} style={{ color: p.color ?? c.text, fontVariantNumeric: 'tabular-nums', fontSize: 11 }}>
              {p.name}: {formatted}
            </div>
          );
        })}
      </div>
    );
  }

  function SkBars({ count }: { count: number }) {
    return (
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, padding: '8px 16px', height: 160 }}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{ flex: 1, height: `${70 - i * 8}%`, backgroundColor: c.border, borderRadius: '2px 2px 0 0' }} />
        ))}
      </div>
    );
  }

  const card: React.CSSProperties = {
    backgroundColor: c.surface, border: `1px solid ${c.border}`, borderRadius: 6, overflow: 'hidden',
  };
  const headPad: React.CSSProperties = {
    padding: '11px 15px', borderBottom: `1px solid ${c.border}`,
  };

  const th: React.CSSProperties = {
    fontSize: 11, fontWeight: 700, color: c.text, letterSpacing: '0.4px', whiteSpace: 'nowrap',
  };
  const td: React.CSSProperties = {
    fontSize: 12, color: c.textSub, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap',
  };

  /* ── CHAT MESSAGE RENDERER ──────────────────────────────────── */
  function renderMsg(msg: ChatMsg) {
    if (msg.kind === 'user') {
      return (
        <div key={msg.id} style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 14 }}>
          <div style={{
            background: c.tealBg, border: `1px solid ${c.tealBd}`,
            borderRadius: '10px 10px 2px 10px',
            padding: '10px 16px', maxWidth: '75%', fontSize: 13, color: c.text, lineHeight: 1.5,
          }}>{msg.text}</div>
        </div>
      );
    }

    if (msg.kind === 'msg1') {
      return (
        <div key={msg.id} style={{ marginBottom: 16 }}>
          <div style={{ padding: '4px 4px 14px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: c.teal, letterSpacing: '0.5px', marginBottom: 8 }}>
              ◈ AVERAGE COST SUMMARY — 2025
            </div>
            <div style={{ fontSize: 13, color: c.textSub, marginBottom: 8, lineHeight: 1.6 }}>
              The average unit price across regions are:
            </div>
            <div style={{ fontSize: 13, color: c.textSub, lineHeight: 1.8 }}>
              1. EMEA: $0.69<br />
              2. LATAM: $0.82<br />
              While no units were found for APAC, North America units show an average unit price of $0.77.
            </div>
          </div>

          <div style={{ background: c.surfaceHover, border: `1px solid ${c.border}`, borderRadius: '2px 10px 10px 10px', padding: '14px 18px', marginBottom: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: c.textMuted, letterSpacing: '0.4px', marginBottom: 8 }}>
              AVG. UNIT PRICE OF PAPER CUP – 2025
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <ComposedChart data={MSG1_CHART_DATA} margin={{ top: 20, right: 20, bottom: 10, left: -15 }}>
                <CartesianGrid stroke={c.chartGrid} vertical={false} />
                <XAxis dataKey="region" tick={{ fontSize: 10, fill: c.textSub }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fontSize: 10, fill: c.textSub }} axisLine={false} tickLine={false} domain={[0, 50000]} tickFormatter={v => v.toLocaleString()} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: c.textSub }} axisLine={false} tickLine={false} domain={[0, 0.9]} tickFormatter={v => v.toFixed(1)} />
                <Tooltip content={<Tip />} />
                <Bar dataKey="vol" yAxisId="left" name="Volumes" fill={c.blue} opacity={0.8} radius={[2, 2, 0, 0]} label={{ position: 'top', fontSize: 10, fill: c.textSub, formatter: (v: number) => v > 0 ? v.toLocaleString() : '' }} />
                <Line dataKey="price" yAxisId="right" name="Avg. Unit Price $" stroke={c.amber} strokeWidth={2.5} dot={{ fill: c.amber, r: 4 }} label={{ position: 'top', fontSize: 10, fill: c.amber, formatter: (v: number) => v > 0 ? v.toFixed(2) : '' }} />
              </ComposedChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 8, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 12, height: 12, backgroundColor: c.blue, borderRadius: 2 }} />
                <span style={{ fontSize: 11, color: c.textMuted }}>Volumes</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 12, height: 3, backgroundColor: c.amber, borderRadius: 1 }} />
                <span style={{ fontSize: 11, color: c.textMuted }}>Avg. Unit Price $</span>
              </div>
            </div>

            <div style={{ border: `1px solid ${c.border}`, borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', padding: '8px 12px', backgroundColor: c.bg, borderBottom: `1px solid ${c.border}` }}>
                {['Region', 'Volumes', 'Avg. Unit Price (in $)'].map(h => (
                  <span key={h} style={th}>{h.toUpperCase()}</span>
                ))}
              </div>
              {MSG1_TABLE_DATA.map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr', padding: '9px 12px', borderBottom: i < MSG1_TABLE_DATA.length - 1 ? `1px solid ${c.border}` : 'none', backgroundColor: i % 2 === 0 ? c.surface : c.surfaceHover }}>
                  <span style={{ ...td, fontWeight: 500, color: c.text }}>{row.region}</span>
                  <span style={td}>{row.vol.toLocaleString()}</span>
                  <span style={td}>${row.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (msg.kind === 'msg2') {
      return (
        <div key={msg.id} style={{ marginBottom: 16 }}>
          <div style={{ background: c.surfaceHover, border: `1px solid ${c.border}`, borderRadius: '2px 10px 10px 10px', padding: '14px 18px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: c.blue, letterSpacing: '0.5px', marginBottom: 12 }}>
              ◈ SUPPLIER PRICING — NA REGION
            </div>
            <div style={{ fontSize: 13, color: c.textSub, marginBottom: 16, lineHeight: 1.6 }}>
              The supplier prices for unassigned regions range between $0.76 and $0.78.
              The price for Supplier A is the highest in average unit price but the volumes
              produced are the lowest at 6000. Would you like to analyze further?
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: c.textMuted, letterSpacing: '0.4px', marginBottom: 8 }}>
                SUPPLIER PRICES FOR PAPER CUP AT NA – 2025
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <ComposedChart data={MSG2_CHART_DATA} margin={{ top: 20, right: 20, bottom: 10, left: -15 }}>
                  <CartesianGrid stroke={c.chartGrid} vertical={false} />
                  <XAxis dataKey="supplier" tick={{ fontSize: 10, fill: c.textSub }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" tick={{ fontSize: 10, fill: c.textSub }} axisLine={false} tickLine={false} domain={[0.74, 0.82]} tickFormatter={v => v.toFixed(2)} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: c.textSub }} axisLine={false} tickLine={false} domain={[0, 18000]} tickFormatter={v => v.toLocaleString()} />
                  <Tooltip content={<Tip />} />
                  <Line yAxisId="left" dataKey="avgPrice" name="Avg. Unit price $" stroke={c.blue} strokeWidth={2.5} dot={{ fill: c.blue, r: 4 }} label={{ position: 'top', fontSize: 10, fill: c.blue, formatter: (v: number) => v.toFixed(2) }} />
                  <Line yAxisId="right" dataKey="vol" name="Volumes" stroke={c.amber} strokeWidth={2.5} dot={{ fill: c.amber, r: 4 }} label={{ position: 'top', fontSize: 10, fill: c.amber, formatter: (v: number) => v.toLocaleString() }} />
                </ComposedChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 12, height: 3, backgroundColor: c.blue, borderRadius: 1 }} />
                  <span style={{ fontSize: 11, color: c.textMuted }}>Avg. Unit price $</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 12, height: 3, backgroundColor: c.amber, borderRadius: 1 }} />
                  <span style={{ fontSize: 11, color: c.textMuted }}>Volumes</span>
                </div>
              </div>
            </div>

            <div style={{ overflowX: 'auto', borderRadius: 4, border: `1px solid ${c.border}` }}>
              <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                  <tr style={{ backgroundColor: c.bg }}>
                    {(['Supplier Name', 'Avg. Unit Price', 'Volumes', 'Material Cost', 'Conversion Cost', 'Logistics Cost'] as const).map((h, i) => (
                      <th key={h} style={{ padding: '9px 14px', fontSize: 11, fontWeight: 700, color: c.text, letterSpacing: '0.4px', whiteSpace: 'nowrap', textAlign: 'left', borderBottom: `1px solid ${c.border}`, borderRight: i < 5 ? `1px solid ${c.border}` : 'none' }}>
                        {h.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MSG2_TABLE_DATA.map((row, i) => {
                    const last = i === MSG2_TABLE_DATA.length - 1;
                    const rowBg = i % 2 === 0 ? c.surface : c.surfaceHover;
                    const cellBase: React.CSSProperties = { padding: '10px 14px', fontSize: 12, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums', borderBottom: last ? 'none' : `1px solid ${c.border}`, borderRight: `1px solid ${c.border}` };
                    return (
                      <tr key={i} style={{ backgroundColor: rowBg }}>
                        <td style={{ ...cellBase, fontWeight: 500, color: c.text }}>{row.supplier}</td>
                        <td style={{ ...cellBase, color: c.textSub }}>${row.avgPrice.toFixed(2)}</td>
                        <td style={{ ...cellBase, color: c.textSub }}>{row.vol.toLocaleString()}</td>
                        <td style={{ ...cellBase, color: c.textSub }}>${row.material.toFixed(2)}</td>
                        <td style={{ ...cellBase, color: c.textSub }}>${row.conversion.toFixed(2)}</td>
                        <td style={{ ...cellBase, color: c.textSub, borderRight: 'none' }}>${row.logistics.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    if (msg.kind === 'msg3') {
      const CustomLabel = (props: any) => {
        const { x, y, width, value } = props;
        return (
          <text x={x + width / 2} y={y + 20} fill="#fff" fontSize={10} fontWeight={600} textAnchor="middle">
            {value.toFixed(2)}
          </text>
        );
      };
      const TotalLabel = (props: any) => {
        const { x, y, width, index } = props;
        const entry = MSG3_CHART_DATA[index];
        const total = entry.material + entry.conversion + entry.logistics;
        return (
          <text x={x + width / 2} y={y - 5} fill={c.text} fontSize={10} fontWeight={700} textAnchor="middle">
            {total.toFixed(2)}
          </text>
        );
      };

      return (
        <div key={msg.id} style={{ marginBottom: 16 }}>
          <div style={{ background: c.surfaceHover, border: `1px solid ${c.border}`, borderRadius: '2px 10px 10px 10px', padding: '14px 18px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: c.amber, letterSpacing: '0.5px', marginBottom: 12 }}>
              ◈ CURRENT PRICE VS MARKET SHOULD COST
            </div>
            <div style={{ fontSize: 13, color: c.textSub, marginBottom: 16, lineHeight: 1.6 }}>
              The supplier prices for unassigned regions range between $0.76 and $0.78.
              The price for Supplier A is the highest in average unit price but the volumes
              produced are the lowest at 6000. Would you like to analyze further?
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: c.textMuted, letterSpacing: '0.4px', marginBottom: 8 }}>
                CURRENT PRICE VS MARKET SHOULD COST
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={MSG3_CHART_DATA} margin={{ top: 20, right: 10, bottom: 30, left: -15 }}>
                  <CartesianGrid stroke={c.chartGrid} vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: c.textSub }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: c.textSub }} axisLine={false} tickLine={false} domain={[0, 0.9]} tickFormatter={v => v.toFixed(1)} />
                  <Tooltip content={<Tip />} />
                  <Bar dataKey="material" name="Material cost" stackId="a" fill={c.blue} opacity={0.88} label={<CustomLabel />} />
                  <Bar dataKey="conversion" name="Conversion cost" stackId="a" fill={c.amber} opacity={0.88} label={<CustomLabel />} />
                  <Bar dataKey="logistics" name="Logistics cost" stackId="a" fill="#9ca3af" opacity={0.88} radius={[2, 2, 0, 0]} label={<TotalLabel />} />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }}>
                {[
                  { l: 'Material cost', col: c.blue },
                  { l: 'Conversion cost', col: c.amber },
                  { l: 'Logistics cost', col: '#9ca3af' },
                  { l: 'Total', col: c.text }
                ].map(x => (
                  <div key={x.l} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 12, height: 12, backgroundColor: x.col, borderRadius: 2 }} />
                    <span style={{ fontSize: 11, color: c.textMuted }}>{x.l}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ overflowX: 'auto', borderRadius: 4, border: `1px solid ${c.border}` }}>
              <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                  <tr style={{ backgroundColor: c.bg }}>
                    {(['Source', 'Benchmark', 'Material Cost', 'Conversion Cost', 'Logistics Cost', 'Total'] as const).map((h, i) => (
                      <th key={h} style={{ padding: '9px 14px', fontSize: 11, fontWeight: 700, color: c.text, letterSpacing: '0.4px', whiteSpace: 'nowrap', textAlign: 'left', borderBottom: `1px solid ${c.border}`, borderRight: i < 5 ? `1px solid ${c.border}` : 'none' }}>
                        {h.toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MSG3_TABLE_DATA.map((row, i) => {
                    const last = i === MSG3_TABLE_DATA.length - 1;
                    const rowBg = i % 2 === 0 ? c.surface : c.surfaceHover;
                    const cellBase: React.CSSProperties = { padding: '10px 14px', fontSize: 12, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums', borderBottom: last ? 'none' : `1px solid ${c.border}`, borderRight: `1px solid ${c.border}` };
                    return (
                      <tr key={i} style={{ backgroundColor: rowBg }}>
                        <td style={{ ...cellBase, fontWeight: 500, color: c.text }}>{row.source}</td>
                        <td style={{ ...cellBase, color: c.textMuted }}>{row.benchmark}</td>
                        <td style={{ ...cellBase, color: c.textSub }}>${row.material.toFixed(2)}</td>
                        <td style={{ ...cellBase, color: c.textSub }}>${row.conversion.toFixed(2)}</td>
                        <td style={{ ...cellBase, color: c.textSub }}>${row.logistics.toFixed(2)}</td>
                        <td style={{ ...cellBase, fontWeight: 700, color: c.text, borderRight: 'none' }}>${row.total.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    return null;
  }

  /* ─────────────────────────────────────────────────────────────────
     BUBBLE TOOLTIP helper
  ───────────────────────────────────────────────────────────────── */


  /* ═══════════════════════════════════════════════════════════════
     RENDER
  ═══════════════════════════════════════════════════════════════ */
  return (
    <div style={{
      display: 'flex',
      height: 'calc(100vh - 80px)',
      margin: '-14px -20px -40px',
      overflow: 'hidden',
      position: 'relative',
    }}>
      <style>{`
        @keyframes pq-bounce {
          0%,80%,100%{ transform:translateY(0); opacity:.4 }
          40%{ transform:translateY(-5px); opacity:1 }
        }
        @keyframes pq-slideIn {
          from { opacity:0 }
          to { opacity:1 }
        }
        .pq-scroll::-webkit-scrollbar { width:4px; height:4px; }
        .pq-scroll::-webkit-scrollbar-track { background:transparent; }
        .pq-scroll::-webkit-scrollbar-thumb { background:${c.borderStrong}; border-radius:2px; }
      `}</style>

      {/* LEFT: Dashboard */}
      <div className="pq-scroll" style={{
        flex: 1,
        minWidth: 0,
        overflowY: 'auto',
        padding: '14px 16px 24px 20px',
      }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, paddingBottom: 12, borderBottom: `1px solid ${c.border}` }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: c.text, marginBottom: 3 }}>Procurement Intelligence</div>
            <div style={{ fontSize: 12, color: c.textMuted }}>AI-powered structured analysis — spend, suppliers, cost drivers</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ fontSize: 11, color: c.textMuted }}>Procurement · Q2 2025</span>
              <span style={{ fontSize: 10, color: c.green, backgroundColor: c.greenBg, padding: '3px 7px', borderRadius: 2, fontWeight: 600, letterSpacing: '0.4px' }}>LIVE</span>
            </div>
            <button
              onClick={handleOpenSummarize}
              disabled={chatOpen}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                backgroundColor: chatOpen ? c.surfaceHover : c.teal,
                border: chatOpen ? `1px solid ${c.border}` : 'none',
                borderRadius: 5, padding: '8px 18px',
                cursor: chatOpen ? 'default' : 'pointer',
                fontSize: 12, fontWeight: 600,
                color: chatOpen ? c.textMuted : '#fff',
                transition: 'background-color 0.15s',
              }}
            >
              <Sparkles size={13} />
              Summarize
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap', marginBottom: 14, paddingBottom: 12, borderBottom: `1px solid ${c.border}` }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: c.textMuted, letterSpacing: '0.5px', marginRight: 4 }}>FILTERS</span>
          {FILTERS.map(f => (
            <div
              key={f.id}
              style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 11px', backgroundColor: c.surface, border: `1px solid ${c.border}`, borderRadius: 4, cursor: 'pointer', transition: 'border-color 0.12s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = c.teal)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = c.border)}
            >
              <span style={{ fontSize: 10, color: c.textMuted, letterSpacing: '0.3px' }}>{f.label.toUpperCase()}</span>
              <span style={{ fontSize: 12, color: c.textSub }}>{f.value}</span>
              <ChevronDown size={11} color={c.textMuted} />
            </div>
          ))}
        </div>

        {/* Bubble map + charts grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '800px 1fr', gap: 14, marginBottom: 14 }}>

          {/* Bubble chart card */}
          <GlobalSupplierMap c={c} />

          {/* Two stacked chart cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={card}>
              <div style={headPad}>
                <div style={{ fontSize: 14, fontWeight: 600, color: c.text, marginBottom: 2 }}>
                  Regional Volume Spend
                </div>
                <div style={{ fontSize: 11, color: c.textMuted }}>
                  Units (bar) · % of total (line)
                </div>
              </div>
              <div style={{ padding: '10px 6px 6px' }}>
                <ResponsiveContainer width="100%" height={180}>
                  <ComposedChart data={SPEND_GLOBAL} margin={{ top: 4, right: 28, bottom: 0, left: 10 }}>
                    <CartesianGrid stroke={c.chartGrid} vertical={false} />
                    <XAxis dataKey="region" tick={{ fontSize: 10, fill: c.textSub }} axisLine={false} tickLine={false} />
                    <YAxis yAxisId="left" tick={{ fontSize: 10, fill: c.textSub }} axisLine={false} tickLine={false} domain={[0, 50000]} tickFormatter={v => v.toLocaleString()} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: c.textSub }} axisLine={false} tickLine={false} domain={[0, 50]} tickFormatter={v => `${v}%`} />
                    <Tooltip content={<Tip />} />
                    <Bar dataKey="value" yAxisId="left" name="Units" radius={[2, 2, 0, 0]}>
                      {SPEND_GLOBAL.map((d, i) => (
                        <Cell key={i} fill={d.region === 'EMEA' ? c.teal : c.blue} opacity={0.85} />
                      ))}
                    </Bar>
                    <Line dataKey="pct" yAxisId="right" name="% of total" stroke={c.amber} strokeWidth={2} dot={{ fill: c.amber, r: 3 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={card}>
              <div style={headPad}>
                <div style={{ fontSize: 14, fontWeight: 600, color: c.text, marginBottom: 2 }}>
                  Avg Unit Price by Region
                </div>
                <div style={{ fontSize: 11, color: c.textMuted }}>
                  $/unit (line) · Volume units (bar) · dashed = $1.10 benchmark
                </div>
              </div>
              <div style={{ padding: '10px 6px 6px' }}>
                <ResponsiveContainer width="100%" height={180}>
                  <ComposedChart data={PRICE_GLOBAL} margin={{ top: 4, right: 28, bottom: 0, left: 10 }}>
                    <CartesianGrid stroke={c.chartGrid} vertical={false} />
                    <XAxis dataKey="region" tick={{ fontSize: 10, fill: c.textSub }} axisLine={false} tickLine={false} />
                    <YAxis yAxisId="left" tick={{ fontSize: 10, fill: c.textSub }} axisLine={false} tickLine={false} tickFormatter={v => `$${v.toFixed(2)}`} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: c.textSub }} axisLine={false} tickLine={false} tickFormatter={v => v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : v.toLocaleString()} />
                    <Tooltip content={<Tip />} />
                    <ReferenceLine y={1.10} yAxisId="left" stroke={c.teal} strokeDasharray="5 3" strokeWidth={1.5} />
                    <Bar dataKey="vol" yAxisId="right" name="Volume" fill={c.blue} opacity={0.55} radius={[2, 2, 0, 0]} />
                    <Line dataKey="price" yAxisId="left" name="Price" stroke={c.amber} strokeWidth={2} dot={{ fill: c.amber, r: 3 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT: AI Chat Panel */}
      <div style={{
        width: chatOpen ? PANEL_WIDTH : 0,
        flexShrink: 0,
        overflow: 'hidden',
        transition: 'width 0.3s ease-out',
        borderLeft: chatOpen ? `1px solid ${c.border}` : 'none',
        backgroundColor: c.surface,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}>
        <div style={{ width: PANEL_WIDTH, height: '100%', display: 'flex', flexDirection: 'column', animation: chatOpen ? 'pq-slideIn 0.35s ease-out' : 'none' }}>

          <div style={{
            padding: '12px 16px',
            borderBottom: `1px solid ${c.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: c.bg,
            flexShrink: 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <Sparkles size={14} color={c.teal} />
              <span style={{ fontSize: 13, fontWeight: 600, color: c.teal }}>Procurement AI — Insight Assistant</span>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, color: c.textMuted, lineHeight: 1, borderRadius: 3, display: 'flex', alignItems: 'center' }}
              onMouseEnter={e => (e.currentTarget.style.color = c.text)}
              onMouseLeave={e => (e.currentTarget.style.color = c.textMuted)}
            >
              <X size={14} />
            </button>
          </div>

          <div className="pq-scroll" style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          }}>
            {messages.length === 0 && !chatLoading && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: 20, padding: '40px 20px' }}>
                <div style={{ width: 56, height: 56, backgroundColor: c.tealBg, border: `1px solid ${c.tealBd}`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={28} color={c.teal} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: c.text, marginBottom: 8 }}>
                    Procurement AI — Insight Assistant
                  </div>
                  <div style={{ fontSize: 12, color: c.textMuted, lineHeight: 1.6 }}>
                    Click <strong style={{ color: c.teal }}>Summarize</strong> to begin a structured analysis<br />
                    — spend contributions, supplier pricing, and cost breakdown.
                  </div>
                </div>
              </div>
            )}

            {messages.map(renderMsg)}

            {chatLoading && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: c.surfaceHover, border: `1px solid ${c.border}`, borderRadius: '2px 10px 10px 10px', padding: '11px 16px' }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: c.teal, animation: `pq-bounce 1s ${i * 0.15}s infinite` }} />
                  ))}
                </div>
              </div>
            )}

            {suggGroup > 0 && suggGroup < 3 && !chatLoading && (
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: c.textMuted, letterSpacing: '0.5px', marginBottom: 10 }}>SUGGESTED QUESTIONS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {(suggGroup === 1 ? GROUP1 : GROUP2).map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSuggestion(i)}
                      style={{ padding: '9px 16px', backgroundColor: c.tealBg, border: `1px solid ${c.tealBd}`, borderRadius: 20, cursor: 'pointer', fontSize: 12, fontWeight: 500, color: c.teal, transition: 'background-color 0.12s', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8 }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = c.teal + '33')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = c.tealBg)}
                    >
                      {s} <ArrowRight size={11} style={{ marginLeft: 'auto' }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={scrollRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
