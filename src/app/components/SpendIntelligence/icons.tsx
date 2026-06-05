/* Shared SVG icons for Spend Intelligence — kept inline to mirror the prototype. */
import { CSSProperties } from 'react';

interface IconProps { size?: number; style?: CSSProperties; }

export function PacQuantLogo({ width = 28, height = 19 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <path d="M0.255523 0.972225C1.09674 0.931326 2.10405 0.9592 2.9554 0.962906C2.95778 2.17586 3.01643 14.0287 2.9218 14.2656L2.81212 14.2804C1.88819 14.2913 0.964176 14.2893 0.0402709 14.2743C0.0214345 13.6412 0.0172749 12.9448 0.0322987 12.3128C0.120869 8.58835 -0.0821193 4.7669 0.0406574 1.05284C0.105192 0.972024 0.132853 0.991234 0.255523 0.972225Z" fill="#0191AA"/>
      <path d="M3.37117 0.959184C5.48453 0.867321 7.91362 0.680717 9.48026 2.32061C10.6122 3.50534 10.9718 4.52653 10.9756 6.11968C9.99176 6.16946 8.99701 6.15694 8.0116 6.1499C7.99627 5.5389 7.92882 5.04525 7.50183 4.54717C7.27561 4.28321 6.9774 4.09078 6.64373 3.9933C6.0761 3.83336 4.18955 3.9762 3.36624 3.91044L3.37117 0.959184Z" fill="#F75452"/>
      <path d="M10.9756 6.11963C10.9115 9.18195 8.33383 10.9965 5.4133 10.9341L5.2296 10.9318C4.63403 10.9693 3.9535 10.9591 3.35797 10.9294C3.38535 10.0163 3.3414 9.03897 3.40512 8.13143C3.34884 7.98025 3.46707 7.95749 3.59025 7.95036C5.50542 7.84002 7.34708 8.59401 8.01162 6.14985C8.99703 6.1569 9.99178 6.16941 10.9756 6.11963Z" fill="#0191AA"/>
      <path d="M3.40512 8.13135C3.63797 8.31931 4.962 10.5046 5.2296 10.9318C4.63403 10.9691 3.9535 10.959 3.35797 10.9293C3.38535 10.0161 3.3414 9.03888 3.40512 8.13135Z" fill="#F75452"/>
      <path d="M11.5429 2.92531C11.9658 2.45999 13.0704 2.10675 13.6855 1.83598L16.3632 0.68697C16.9123 0.452695 17.4918 0.1798 18.064 0.0232563C18.6213 -0.129248 19.3699 0.506405 19.853 0.820172L21.945 2.18121C21.5581 2.27688 20.1305 3.50847 19.8072 3.8181C18.9875 3.37893 18.3065 2.55382 17.2804 2.95091C16.6322 3.20171 14.5392 4.18832 14.1856 4.65086C13.2817 4.12113 12.4184 3.47729 11.5429 2.92531Z" fill="#F75452"/>
      <path d="M21.945 2.18115C22.7374 2.71103 24.0247 3.29878 23.9362 4.33248C23.8595 5.22623 24.1535 10.5372 23.8831 10.9723C23.3528 10.7624 21.6446 9.58993 21.1262 9.21907C21.5353 8.56707 21.5012 6.32992 21.4713 5.497C21.4385 4.57864 20.443 4.32948 19.8074 3.81803C20.1305 3.50841 21.5581 2.27681 21.945 2.18115Z" fill="#0191AA"/>
      <path d="M13.5155 11.8117C13.0036 11.5364 11.5117 10.6672 11.4864 10.0855C11.4123 8.38856 11.3594 6.60541 11.38 4.90125C11.3851 4.49207 11.3403 3.21289 11.5429 2.92529C12.4184 3.47728 13.2817 4.12112 14.1856 4.65085C13.7666 5.65305 13.7712 7.74155 13.9202 8.82955C13.9761 9.23721 15.2288 9.86003 15.6096 10.1504C14.994 10.6469 14.1463 11.3739 13.5155 11.8117Z" fill="#0191AA"/>
      <path d="M23.8831 10.9725C23.4111 11.4644 22.1382 11.9187 21.4762 12.2202C21.3095 12.2962 21.1516 12.2627 20.9959 12.1692C20.305 11.7539 19.6137 11.2635 18.9394 10.8206L17.0787 9.59018C16.8351 9.43235 15.1834 8.51449 15.4908 8.20799C15.917 7.78306 17.1603 6.79902 17.794 7.10183C18.9485 7.65354 20.006 8.62175 21.1262 9.21919C21.6446 9.59018 23.3528 10.7625 23.8831 10.9725Z" fill="#F75452"/>
      <path d="M15.6096 10.1504C16.787 10.8817 17.9797 11.7254 19.1638 12.469C19.6415 12.7691 21.3877 13.8628 21.733 14.1831C21.0457 14.482 20.3513 14.7902 19.655 15.0713C19.3105 15.2105 19.0058 15.2428 18.6565 15.0764C17.677 14.6097 16.7939 13.9037 15.8713 13.3331C15.2354 12.9079 14.0831 12.2513 13.5155 11.8117C14.1463 11.3739 14.994 10.647 15.6096 10.1504Z" fill="#F75452"/>
    </svg>
  );
}

export const FileIcon = ({ size = 11 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
);

export const CopyIcon = ({ size = 13 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
);
export const ThumbUpIcon = ({ size = 13 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>
);
export const ThumbDownIcon = ({ size = 13 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"/></svg>
);
export const RegenerateIcon = ({ size = 13 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
);
export const ExpandIcon = ({ size = 12 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>
);
export const ArrowRightIcon = ({ size = 14 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

export const ReactionRow = () => (
  <div className="chat-reaction-row">
    <button className="chat-reaction-btn" title="Copy"><CopyIcon /></button>
    <button className="chat-reaction-btn" title="Helpful"><ThumbUpIcon /></button>
    <button className="chat-reaction-btn" title="Not helpful"><ThumbDownIcon /></button>
    <button className="chat-reaction-btn" title="Regenerate"><RegenerateIcon /></button>
  </div>
);

export const SourceTag = ({ children }: { children: React.ReactNode }) => (
  <span className="chat-source-tag"><FileIcon />{children}</span>
);

export const ChatLoader = () => (
  <div className="chat-loader">
    <span /><span /><span /><span /><span /><span />
  </div>
);
