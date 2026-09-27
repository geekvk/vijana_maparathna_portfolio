import React from 'react';
import { icons, logos } from './HeroVisual';
import './skill-cards.css';

// Art panels are laid out on a 240×210 grid; tiles are positioned in % and sized in cqw.
const Tile = ({ x, y, s = 58, children }) => (
  <span className="sk-tile" style={{ left: `${(x / 240) * 100}%`, top: `${(y / 210) * 100}%`, width: `${(s / 240) * 100}cqw`, height: `${(s / 240) * 100}cqw` }}>{children}</span>
);

const Scene = ({ children }) => <svg className="sk-scene" viewBox="0 0 240 210" aria-hidden="true">{children}</svg>;
const Dashed = ({ d }) => <path d={d} fill="none" stroke="#e5b8b0" strokeWidth="1.3" strokeDasharray="4 4" />;

const kotlin = <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true"><defs><linearGradient id="skKotlin" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#e44857" /><stop offset=".47" stopColor="#c711e1" /><stop offset="1" stopColor="#7f52ff" /></linearGradient></defs><path d="M24 24H0V0h24L12 12z" fill="url(#skKotlin)" /></svg>;
const sparkle = <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><defs><linearGradient id="skSpark" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4f8cff" /><stop offset="1" stopColor="#7c4dff" /></linearGradient></defs><path d="M12 2c.6 5.2 4.8 9.4 10 10-5.2.6-9.4 4.8-10 10-.6-5.2-4.8-9.4-10-10 5.2-.6 9.4-4.8 10-10z" fill="url(#skSpark)" /></svg>;
const aws = <svg viewBox="0 0 40 26" width="40" height="26" aria-hidden="true"><text x="20" y="14" textAnchor="middle" fontSize="15" fontWeight="700" fill="#232f3e" fontFamily="Arial, sans-serif">aws</text><path d="M7 18c8 5 18 5 25 0" stroke="#ff9900" strokeWidth="2.4" fill="none" strokeLinecap="round" /><path d="M29 16.5l3.5 1.2-1.4 3.3" stroke="#ff9900" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>;
const k8s = <svg viewBox="0 0 24 24" width="36" height="36" aria-hidden="true"><path d="M12 1.5l8.6 4.2 2.1 9.3-6 7.5H7.3l-6-7.5 2.1-9.3z" fill="#326ce5" /><g stroke="#fff" strokeWidth="1.3" fill="none" strokeLinecap="round"><circle cx="12" cy="12.5" r="4.2" />{[0, 51, 103, 154, 206, 257, 309].map(a => <path key={a} d="M12 12.5V5.5" transform={`rotate(${a} 12 12.5)`} />)}</g><circle cx="12" cy="12.5" r="1.4" fill="#fff" /></svg>;
const github = <svg viewBox="0 0 24 24" width="38" height="38" aria-hidden="true"><path fill="#11161d" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>;
const leaf = <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true"><path d="M12 2c4.5 3 7 7 6.5 11.5C18 18 15 21 12 22 9 21 6 18 5.5 13.5 5 9 7.5 5 12 2z" fill="#37b24d" /><path d="M12 22V9" stroke="#1f7a33" strokeWidth="1.4" strokeLinecap="round" /></svg>;
const codeTile = <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></svg>;
const doc = <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><path d="M5 2h10l4 4v16H5z" fill="#3b82f6" /><path d="M8 10h8M8 14h8M8 18h5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" /></svg>;
const clipboard = <svg viewBox="0 0 24 24" width="34" height="34" aria-hidden="true"><rect x="4" y="4" width="16" height="18" rx="2.5" fill="#3b82f6" /><rect x="8.5" y="2" width="7" height="4" rx="1.5" fill="#1d4ed8" /><path d="M8 12h8M8 16h5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" /></svg>;
const tree = <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="5" r="2.6" fill="#1d4ed8" /><circle cx="5" cy="19" r="2.6" fill="#1d4ed8" /><circle cx="19" cy="19" r="2.6" fill="#1d4ed8" /><path d="M12 8v4M5 16v-4h14v4" /></svg>;

function MobileArt() {
  return <>
    <Scene>
      <g transform="rotate(8 110 90)"><rect x="70" y="10" width="78" height="150" rx="14" fill="#1b2230" /><rect x="75" y="15" width="68" height="140" rx="10" fill="#0f1522" />
        {[[26, 30, '#4b8ef5'], [34, 20, '#8a94a3'], [42, 36, '#f5a524'], [52, 24, '#4b8ef5'], [60, 34, '#34c759'], [70, 18, '#8a94a3'], [80, 30, '#4b8ef5'], [90, 26, '#f97316'], [100, 32, '#4b8ef5'], [110, 20, '#8a94a3']].map(([y, w, c], i) => <rect key={i} x={84 + (i % 3) * 5} y={y} width={w} height="3" rx="1.5" fill={c} />)}</g>
      <g transform="rotate(-10 70 140)"><rect x="18" y="58" width="84" height="160" rx="16" fill="#1b2230" /><rect x="23" y="63" width="74" height="150" rx="12" fill="#fff" /><rect x="46" y="66" width="28" height="7" rx="3.5" fill="#1b2230" /><rect x="34" y="160" width="50" height="6" rx="3" fill="#e5ebf5" /><rect x="34" y="172" width="40" height="6" rx="3" fill="#e5ebf5" /></g>
      <g transform="translate(34 102) scale(2)"><path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357z" fill="#47c5fb" /><path d="M14.328 11.072L7.857 17.53 11.5 21.2l10.2-10.128h-7.372z" fill="#47c5fb" /><path d="M7.857 17.53l6.47 6.47H21.7l-6.46-6.468z" fill="#0175c2" /></g>
    </Scene>
    <Tile x={170} y={22} s={56}>{logos.react}</Tile>
    <Tile x={172} y={92} s={52}>{logos.android}</Tile>
    <Tile x={132} y={140} s={56}>{kotlin}</Tile>
  </>;
}

function BackendArt() {
  return <>
    <Scene>
      {[28, 62, 96, 130].map(y => <g key={y}><rect x="42" y={y} width="130" height="30" rx="7" fill="#26324a" /><rect x="120" y={y + 12} width="36" height="6" rx="3" fill="#3a4863" /></g>)}
      <circle cx="58" cy="43" r="4" fill="#34d399" /><circle cx="72" cy="43" r="4" fill="#60a5fa" />
      <path d="M176 92a13 13 0 0 1 24-6 11 11 0 0 1 15 11 10 10 0 0 1-3 19h-35a12 12 0 0 1-1-24z" fill="#fff" opacity=".95" />
    </Scene>
    <Tile x={18} y={96} s={82}>{leaf}</Tile>
    <span className="sk-tile sk-blue" style={{ left: `${(146 / 240) * 100}%`, top: `${(122 / 210) * 100}%`, width: `${(64 / 240) * 100}cqw`, height: `${(64 / 240) * 100}cqw` }}>{codeTile}</span>
  </>;
}

function DataArt() {
  return <>
    <Scene>
      <g transform="rotate(4 140 80)"><rect x="100" y="16" width="86" height="120" rx="8" fill="#eef2ff" stroke="#d6def7" /><rect x="114" y="32" width="40" height="7" rx="3.5" fill="#6d8fe0" />{[50, 62, 74, 86, 98].map(y => <rect key={y} x="114" y={y} width={y % 24 ? 56 : 44} height="6" rx="3" fill="#c7d4f5" />)}</g>
      <path d="M176 86a13 13 0 0 1 24-6 11 11 0 0 1 15 11 10 10 0 0 1-3 19h-35a12 12 0 0 1-1-24z" fill="#fff" opacity=".95" />
      {[128, 100, 72, 44].map((y, i) => <g key={y}><rect x="22" y={y} width="78" height="30" fill={i % 2 ? '#1d4ed8' : '#2563eb'} /><ellipse cx="61" cy={y + 30} rx="39" ry="11" fill="#1e40af" /><ellipse cx="61" cy={y} rx="39" ry="11" fill={i === 3 ? '#3b82f6' : '#2563eb'} /></g>)}
      <ellipse cx="61" cy="44" rx="39" ry="11" fill="#4f8ff7" />
      <g filter="url(#skShadow)"><rect x="92" y="122" width="96" height="70" rx="10" fill="#fff" /></g>
      <rect x="102" y="132" width="76" height="12" rx="3" fill="#3b82f6" />{[150, 164, 178].map(y => <g key={y}><rect x="102" y={y} width="20" height="8" rx="2" fill="#dbe6fb" /><rect x="126" y={y} width="24" height="8" rx="2" fill="#e8eefb" /><rect x="154" y={y} width="24" height="8" rx="2" fill="#e8eefb" /></g>)}
      <defs><filter id="skShadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dy="4" stdDeviation="5" floodColor="#1d2939" floodOpacity=".14" /></filter></defs>
    </Scene>
  </>;
}

function CloudArt() {
  return <>
    <Scene>
      <Dashed d="M68 52h40M68 52v20M172 52h-40M172 52v20M68 158h40M68 158v-20M172 158h-40M172 158v-20" />
      <path d="M72 138a24 24 0 0 1 4-47 34 34 0 0 1 64-6 26 26 0 0 1 22 53z" fill="#fff" opacity=".9" />
    </Scene>
    <Tile x={16} y={18} s={62}>{aws}</Tile>
    <Tile x={162} y={10} s={62}>{logos.docker}</Tile>
    <Tile x={16} y={128} s={62}>{k8s}</Tile>
    <Tile x={150} y={128} s={66}>{github}</Tile>
  </>;
}

function AiArt() {
  return <>
    <Scene>
      <g stroke="#6d5cf6" strokeWidth="4" strokeLinecap="round">{[92, 108, 124, 140].map(v => <path key={v} d={`M${v} 50v10M${v} 150v10M68 ${v - 11}h10M162 ${v - 11}h10`} />)}</g>
      <rect x="76" y="58" width="88" height="92" rx="14" fill="#5b4cf0" /><rect x="84" y="66" width="72" height="76" rx="10" fill="#7c6cf7" />
      <text x="120" y="117" textAnchor="middle" fontSize="36" fontWeight="800" fill="#fff" fontFamily="Inter, sans-serif">AI</text>
      {[[120, 28, 5], [58, 102, 4], [120, 184, 4], [180, 104, 3]].map(([x, y, r]) => <path key={`${x}${y}`} d={`M${x} ${y - r * 2}q1 ${r * 1.6} ${r * 2} ${r * 2}q-${r * 1.6} 1-${r * 2} ${r * 2}q-1-${r * 1.6}-${r * 2}-${r * 2}q${r * 1.6}-1 ${r * 2}-${r * 2}z`} fill="#a79cf8" />)}
    </Scene>
    <Tile x={18} y={16} s={62}>{logos.openai}</Tile>
    <Tile x={160} y={12} s={62}>{sparkle}</Tile>
    <Tile x={18} y={132} s={62}><span className="sk-emoji">🤗</span></Tile>
    <Tile x={160} y={128} s={62}><span style={{ color: '#2f7bf5' }}>{logos.link}</span></Tile>
  </>;
}

function PracticesArt() {
  return <>
    <Scene>
      <path d="M52 44h140M52 44v120M52 164h140M192 44v120" fill="none" stroke="#9db7ea" strokeWidth="1.3" strokeDasharray="4 4" />
      <path d="M120 142l44 20-44 20-44-20z" fill="#1d4ed8" /><path d="M120 120l44 20-44 20-44-20z" fill="#2563eb" /><path d="M120 98l44 20-44 20-44-20z" fill="#3b82f6" /><path d="M120 76l44 20-44 20-44-20z" fill="#60a5fa" />
    </Scene>
    <Tile x={20} y={20} s={58}><span style={{ color: '#2f7bf5' }}>{icons.gear}</span></Tile>
    <Tile x={164} y={12} s={58}>{doc}</Tile>
    <Tile x={20} y={130} s={58}>{clipboard}</Tile>
    <Tile x={164} y={130} s={58}>{tree}</Tile>
  </>;
}

const skillGroups = [
  { title: 'Mobile Development', tint: 'linear-gradient(135deg,#eaf3ff,#e3f4fb)', art: <MobileArt />, items: ['Flutter', 'React Native', 'Android', 'Kotlin', 'Jetpack Compose', 'Dart', 'TypeScript'] },
  { title: 'Backend & APIs', tint: 'linear-gradient(135deg,#e8f7ee,#eef3fb)', art: <BackendArt />, items: ['Spring Boot', 'Java', 'REST APIs', 'JWT', 'OAuth2', 'GraphQL'] },
  { title: 'Data & Storage', tint: 'linear-gradient(135deg,#eef0fe,#f1eefc)', art: <DataArt />, items: ['SQLite', 'Room', 'PostgreSQL', 'MySQL', 'MongoDB', 'Drift'] },
  { title: 'AI & Integrations', tint: 'linear-gradient(135deg,#efeafe,#ece9fd)', art: <AiArt />, items: ['Spring AI', 'ChatGPT API', 'Gemini API', 'Hugging Face'] },
  { title: 'Engineering Practices', tint: 'linear-gradient(135deg,#e9f0fd,#eef3fc)', art: <PracticesArt />, items: ['Clean Architecture', 'MVVM', 'BLoC', 'Repository Pattern', 'Testing', 'Code Review'] },
];

export default function SkillCards() {
  return (
    <div className="stack-grid">
      {skillGroups.map(g => (
        <div className="stack-group" key={g.title}>
          <div className="sk-art" style={{ background: g.tint }}>{g.art}</div>
          <div className="sk-body"><h3>{g.title}</h3><div className="sk-chips">{g.items.map(x => <span key={x}>{x}</span>)}</div></div>
        </div>
      ))}
    </div>
  );
}
