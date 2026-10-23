type P = { size?: number };
const s = (size = 18) => ({ width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, "aria-hidden": true });
export const Pin = ({ size = 14 }: P) => <svg {...s(size)}><path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>;
export const Heart = ({ size = 18, filled = false }: P & { filled?: boolean }) => <svg {...s(size)} fill={filled ? "currentColor" : "none"}><path d="M12 21s-7.5-4.6-9.4-9.3C1.2 8.2 3.4 4.5 7 4.5c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 3.6 0 5.8 3.7 4.4 7.2C19.5 16.4 12 21 12 21z"/></svg>;
export const Phone = ({ size = 18 }: P) => <svg {...s(size)}><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>;
export const Copy = ({ size = 16 }: P) => <svg {...s(size)}><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>;
export const Shield = ({ size = 26 }: P) => <svg {...s(size)}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/></svg>;
export const Tag = ({ size = 26 }: P) => <svg {...s(size)}><path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1.5"/></svg>;
export const Eye = ({ size = 26 }: P) => <svg {...s(size)}><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>;
export const Doc = ({ size = 26 }: P) => <svg {...s(size)}><path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M9 13h7M9 17h7"/></svg>;
export const ChevL = ({ size = 18 }: P) => <svg {...s(size)} strokeWidth={2.5}><path d="M15 18l-6-6 6-6"/></svg>;
export const ChevR = ({ size = 18 }: P) => <svg {...s(size)} strokeWidth={2.5}><path d="M9 18l6-6-6-6"/></svg>;
export const Filter = ({ size = 16 }: P) => <svg {...s(size)}><path d="M3 5h18M6 12h12M10 19h4"/></svg>;
export const Plus = ({ size = 16 }: P) => <svg {...s(size)} strokeWidth={2.6}><path d="M12 5v14M5 12h14"/></svg>;
export const Home = ({ size = 22 }: P) => <svg {...s(size)}><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>;
export const Search = ({ size = 22 }: P) => <svg {...s(size)}><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>;
export const User = ({ size = 22 }: P) => <svg {...s(size)}><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>;
export const List = ({ size = 18 }: P) => <svg {...s(size)}><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>;
export const Camera = ({ size = 28 }: P) => <svg {...s(size)}><path d="M4 7h3l2-3h6l2 3h3v13H4z"/><circle cx="12" cy="13" r="4"/></svg>;
export const Wa = ({ size = 18 }: P) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z"/></svg>;
export const Logo = () => (
  <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden><rect width="34" height="34" rx="9" fill="var(--brand)"/><path d="M8 23c3-8 6-11 9-11s6 3 9 11" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round"/><path d="M11 12c-2-3-2-5-1-6M23 12c2-3 2-5 1-6" fill="none" stroke="var(--brand-ink)" strokeWidth="2.4" strokeLinecap="round"/><circle cx="17" cy="20" r="2.2" fill="var(--brand-ink)"/></svg>
);
