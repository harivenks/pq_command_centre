/* Chat tables — each table is returned both inline (in the chat response)
   and via the registry so the modal can render the exact same JSX. */
import { ReactNode } from 'react';

export const ContractsTable = () => (
  <table className="chat-table">
    <thead>
      <tr>
        <th>Contract ID</th><th>Vendor</th><th>Category</th><th>Contract Value</th><th>Expiry Date</th>
      </tr>
    </thead>
    <tbody>
      <tr><td className="bold">CTR-2024-0312</td><td>Vendor A</td><td>Rigid Packaging — Bottles</td><td className="bold">$4.04M</td><td className="red">15 Jun 2026</td></tr>
      <tr><td className="bold">CTR-2024-0318</td><td>Vendor B</td><td>Rigid Packaging — Bottles</td><td className="bold">$5.53M</td><td className="red">18 Jun 2026</td></tr>
      <tr><td className="bold">CTR-2024-0401</td><td>Vendor C</td><td>Packaging Equipment</td><td className="bold">$2.14M</td><td className="amber">22 Jun 2026</td></tr>
      <tr><td className="bold">CTR-2024-0415</td><td>Vendor D</td><td>Rigid Packaging — Bottles</td><td className="bold">$6.49M</td><td className="amber">25 Jun 2026</td></tr>
      <tr><td className="bold">CTR-2024-0422</td><td>Vendor E</td><td>Rigid Packaging — Bottles</td><td className="bold">$6.17M</td><td className="amber">28 Jun 2026</td></tr>
      <tr><td className="bold">CTR-2024-0508</td><td>Vendor F</td><td>Flexible Packaging</td><td className="bold">$1.27M</td><td className="amber">30 Jun 2026</td></tr>
      <tr><td className="bold">CTR-2024-0521</td><td>Vendor G</td><td>Flexible Packaging</td><td className="bold">$1.35M</td><td className="amber">30 Jun 2026</td></tr>
    </tbody>
  </table>
);

export const SkusTable = () => (
  <table className="chat-table">
    <thead>
      <tr>
        <th>SKU ID</th><th>Description</th><th>Type</th><th>Platform</th><th>Plant</th><th>Annual Volume (pcs)</th><th>Current Price ($/1000 pcs)</th><th>Should Cost ($/1000 pcs)</th>
      </tr>
    </thead>
    <tbody>
      <tr><td className="bold">SO2002610-11400296-ULU</td><td>PCC 8gm Jar</td><td>Bottles</td><td>ISBM-1</td><td>ULU</td><td>35,620,200</td><td>$6.01</td><td>$6.39</td></tr>
      <tr><td className="bold">SO51472952-11494478-UPQ</td><td>Talc 30g BTL</td><td>Bottles</td><td>ISBM-1</td><td>UPQ</td><td>110,918,115</td><td className="amber">$13.87</td><td>$11.91</td></tr>
      <tr><td className="bold">SO50585001-11494478-U895</td><td>Talc 30g BTL</td><td>Bottles</td><td>EBM</td><td>U895</td><td>103,000,000</td><td className="amber">$15.20</td><td>$14.06</td></tr>
      <tr><td className="bold">SO50567146-68815171-U829</td><td>500 gms Jar/720ml</td><td>Bottles</td><td>EBM</td><td>U829</td><td>42,530,017</td><td className="amber">$57.96</td><td>$48.51</td></tr>
      <tr><td className="bold">SO50567146-69574093-U829</td><td>CAP 400g Women Icon Caramel</td><td>Bottles</td><td>EBM</td><td>U829</td><td>42,530,017</td><td className="amber">$57.96</td><td>$48.51</td></tr>
      <tr><td className="bold">SO50567146-69574091-U829</td><td>CAP 400g Women Icon Caramel</td><td>Bottles</td><td>EBM</td><td>U829</td><td>42,530,017</td><td className="amber">$57.96</td><td>$48.51</td></tr>
      <tr><td className="bold">SO50567146-69574092-U829</td><td>720ML 34g PP Jar</td><td>Bottles</td><td>EBM</td><td>U829</td><td>22,200,000</td><td className="amber">$57.96</td><td>$48.51</td></tr>
      <tr><td className="bold">SO50567146-69684143-U829</td><td>720ML 34g PP Jar</td><td>Bottles</td><td>EBM</td><td>U829</td><td>22,200,000</td><td className="amber">$57.96</td><td>$48.51</td></tr>
      <tr><td className="bold">SO50567146-69684142-U829</td><td>720ML 34g PP Jar</td><td>Bottles</td><td>EBM</td><td>U829</td><td>22,200,000</td><td className="amber">$57.96</td><td>$48.51</td></tr>
      <tr><td className="bold">SO50567146-69722337-U829</td><td>Jar 400g W Choc Icon 36g</td><td>Bottles</td><td>EBM</td><td>U829</td><td>42,530,017</td><td className="red">$60.93</td><td>$49.33</td></tr>
      <tr><td className="bold">SO50567146-69722338-U829</td><td>Jar 400g W icon 36g</td><td>Bottles</td><td>EBM</td><td>U829</td><td>42,530,017</td><td className="red">$60.93</td><td>$49.33</td></tr>
      <tr><td className="bold">SO50585001-69760069-U895</td><td>Talc 30g BTL</td><td>Bottles</td><td>EBM</td><td>U895</td><td>103,000,000</td><td className="amber">$15.20</td><td>$13.09</td></tr>
    </tbody>
  </table>
);

export const BenchmarkTable = () => (
  <table className="chat-table">
    <thead>
      <tr>
        <th>SKU ID</th><th>Description</th><th>Annual Volume (pcs)</th><th>Current Price ($/1000 pcs)</th><th>Should Cost ($/1000 pcs)</th><th>Delta %</th>
      </tr>
    </thead>
    <tbody>
      <tr><td className="bold">SO2002610-11400296-ULU</td><td>PCC 8gm Jar</td><td>35,620,200</td><td>$6.01</td><td>$6.39</td><td className="green-text">-6.3%</td></tr>
      <tr><td className="bold">SO51472952-11494478-UPQ</td><td>Talc 30g BTL</td><td>110,918,115</td><td>$13.87</td><td>$11.91</td><td className="amber">+16.4%</td></tr>
      <tr><td className="bold">SO50585001-11494478-U895</td><td>Talc 30g BTL</td><td>103,000,000</td><td>$15.20</td><td>$14.06</td><td className="amber">+8.1%</td></tr>
      <tr><td className="bold">SO50567146-68815171-U829</td><td>500 gms Jar/720ml</td><td>42,530,017</td><td>$57.96</td><td>$48.51</td><td className="red">+19.5%</td></tr>
      <tr><td className="bold">SO50567146-69574093-U829</td><td>CAP 400g Women Icon Caramel</td><td>42,530,017</td><td>$57.96</td><td>$48.51</td><td className="red">+19.5%</td></tr>
      <tr><td className="bold">SO50567146-69574091-U829</td><td>CAP 400g Women Icon Caramel</td><td>42,530,017</td><td>$57.96</td><td>$48.51</td><td className="red">+19.5%</td></tr>
      <tr><td className="bold">SO50567146-69574092-U829</td><td>720ML 34g PP Jar</td><td>22,200,000</td><td>$57.96</td><td>$48.51</td><td className="red">+19.5%</td></tr>
      <tr><td className="bold">SO50567146-69684143-U829</td><td>720ML 34g PP Jar</td><td>22,200,000</td><td>$57.96</td><td>$48.51</td><td className="red">+19.5%</td></tr>
      <tr><td className="bold">SO50567146-69684142-U829</td><td>720ML 34g PP Jar</td><td>22,200,000</td><td>$57.96</td><td>$48.51</td><td className="red">+19.5%</td></tr>
      <tr><td className="bold">SO50567146-69722337-U829</td><td>Jar 400g W Choc Icon 36g</td><td>42,530,017</td><td>$60.93</td><td>$49.33</td><td className="red">+23.5%</td></tr>
      <tr><td className="bold">SO50567146-69722338-U829</td><td>Jar 400g W icon 36g</td><td>42,530,017</td><td>$60.93</td><td>$49.33</td><td className="red">+23.5%</td></tr>
      <tr><td className="bold">SO50585001-69760069-U895</td><td>Talc 30g BTL</td><td>103,000,000</td><td>$15.20</td><td>$13.09</td><td className="amber">+16.1%</td></tr>
    </tbody>
  </table>
);

export const ThresholdTable = () => (
  <table className="chat-table">
    <thead>
      <tr>
        <th>SKU ID</th><th>Description</th><th>Annual Volume (pcs)</th><th>Current Price ($/1000 pcs)</th><th>Should Cost ($/1000 pcs)</th><th>Delta %</th>
      </tr>
    </thead>
    <tbody>
      <tr><td className="bold">SO51472952-11494478-UPQ</td><td>Talc 30g BTL</td><td>110,918,115</td><td>$13.87</td><td>$11.91</td><td className="amber">+16.4%</td></tr>
      <tr><td className="bold">SO50585001-11494478-U895</td><td>Talc 30g BTL</td><td>103,000,000</td><td>$15.20</td><td>$14.06</td><td className="amber">+8.1%</td></tr>
      <tr><td className="bold">SO50567146-68815171-U829</td><td>500 gms Jar/720ml</td><td>42,530,017</td><td>$57.96</td><td>$48.51</td><td className="red">+19.5%</td></tr>
      <tr><td className="bold">SO50567146-69574093-U829</td><td>CAP 400g Women Icon Caramel</td><td>42,530,017</td><td>$57.96</td><td>$48.51</td><td className="red">+19.5%</td></tr>
      <tr><td className="bold">SO50567146-69574091-U829</td><td>CAP 400g Women Icon Caramel</td><td>42,530,017</td><td>$57.96</td><td>$48.51</td><td className="red">+19.5%</td></tr>
      <tr><td className="bold">SO50567146-69574092-U829</td><td>720ML 34g PP Jar</td><td>22,200,000</td><td>$57.96</td><td>$48.51</td><td className="red">+19.5%</td></tr>
      <tr><td className="bold">SO50567146-69684143-U829</td><td>720ML 34g PP Jar</td><td>22,200,000</td><td>$57.96</td><td>$48.51</td><td className="red">+19.5%</td></tr>
      <tr><td className="bold">SO50567146-69684142-U829</td><td>720ML 34g PP Jar</td><td>22,200,000</td><td>$57.96</td><td>$48.51</td><td className="red">+19.5%</td></tr>
      <tr><td className="bold">SO50567146-69722337-U829</td><td>Jar 400g W Choc Icon 36g</td><td>42,530,017</td><td>$60.93</td><td>$49.33</td><td className="red">+23.5%</td></tr>
      <tr><td className="bold">SO50567146-69722338-U829</td><td>Jar 400g W icon 36g</td><td>42,530,017</td><td>$60.93</td><td>$49.33</td><td className="red">+23.5%</td></tr>
      <tr><td className="bold">SO50585001-69760069-U895</td><td>Talc 30g BTL</td><td>103,000,000</td><td>$15.20</td><td>$13.09</td><td className="amber">+16.1%</td></tr>
    </tbody>
  </table>
);

export const TopSkuTable = () => (
  <table className="chat-table">
    <thead>
      <tr>
        <th>Rank</th><th>SKU ID</th><th>Description</th><th>Brand</th><th>Platform</th><th>Annual Volume</th><th>Portfolio Share</th>
      </tr>
    </thead>
    <tbody>
      <tr><td className="bold">#1</td><td className="bold">11494478</td><td>Talc 30g Bottle</td><td>Brand 1</td><td>EBM / ISBM</td><td className="bold">240,934,840</td><td>12.0%</td></tr>
      <tr><td className="bold">#2</td><td className="bold">69760069</td><td>Talc 30g Bottle (variant)</td><td>Brand 1</td><td>EBM / ISBM</td><td className="bold">104,000,000</td><td>5.2%</td></tr>
      <tr><td className="bold">#3</td><td className="bold">68815171</td><td>Jar 500g / 720ml</td><td>Brand 3</td><td>EBM</td><td className="bold">102,630,017</td><td>5.1%</td></tr>
    </tbody>
  </table>
);

export const Brand3VendorTable = () => (
  <table className="chat-table">
    <thead>
      <tr>
        <th>Vendor</th><th>Price ($/1000 units)</th><th>Should Cost ($/1000 units)</th><th>Delta %</th><th>Annual Volume (pcs)</th><th>Annual Saving Potential</th>
      </tr>
    </thead>
    <tbody>
      <tr><td className="bold">Vendor B</td><td className="bold">$57.96</td><td>$48.51</td><td>+19.5%</td><td>42,530,017</td><td>approx. $402,006</td></tr>
      <tr><td className="bold">Vendor D</td><td className="bold">$59.33</td><td>$48.51</td><td>+22.3%</td><td>7,500,000</td><td>approx. $81,177</td></tr>
      <tr><td className="bold">Vendor C</td><td className="bold">$61.45</td><td>$48.51</td><td>+26.7%</td><td>46,600,000</td><td>approx. $603,086</td></tr>
    </tbody>
  </table>
);

export const TABLES: Record<string, { title: string; render: () => ReactNode }> = {
  contractsTable: { title: 'Contracts Pending Renewal — June 2026', render: () => <ContractsTable /> },
  skusTable: { title: 'Bottle Vendor SKUs', render: () => <SkusTable /> },
  benchmarkTable: { title: 'Should Cost Benchmarking — 12 SKUs', render: () => <BenchmarkTable /> },
  thresholdTable: { title: '11 SKUs Above the 4% Threshold', render: () => <ThresholdTable /> },
  ncTopSkuTable: { title: 'Top Volume SKUs', render: () => <TopSkuTable /> },
  ncBrand3VendorTable: { title: 'Brand 3 Jar Vendor Pricing', render: () => <Brand3VendorTable /> },
};
