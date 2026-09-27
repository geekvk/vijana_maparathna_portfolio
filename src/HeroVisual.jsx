import React, { useLayoutEffect, useRef, useState } from 'react';
import './hero-visual.css';

// The composition is authored on a fixed 1600×980 canvas and scaled to fit its column.
const W = 1600;
const H = 980;

const at = (x, y, w, h) => ({ left: x, top: y, width: w, height: h });

const Stroke = ({ children, size = 24, width = 1.9 }) => <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>;

export const icons = {
  phone: <Stroke size={30}><rect x="6" y="2.5" width="12" height="19" rx="2.5" /><path d="M10.5 18.5h3" /></Stroke>,
  server: <Stroke size={30}><rect x="3.5" y="4" width="17" height="7" rx="2" /><rect x="3.5" y="13" width="17" height="7" rx="2" /><path d="M7 7.5h.01M7 16.5h.01M11 7.5h2M11 16.5h2" /></Stroke>,
  cloud: <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true"><path d="M7 19a5 5 0 0 1-.6-9.96A6.5 6.5 0 0 1 19 10.5a4.25 4.25 0 0 1-.5 8.5z" fill="#2f7bf5" /><path d="M9 14.5l2 2 4-4" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0" /></svg>,
  layers: <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true"><path d="M12 3l9 4.5-9 4.5-9-4.5z" fill="#3b82f6" /><path d="M3 12l9 4.5 9-4.5" stroke="#1d4ed8" strokeWidth="2" fill="none" strokeLinejoin="round" /><path d="M3 16.5L12 21l9-4.5" stroke="#1d4ed8" strokeWidth="2" fill="none" strokeLinejoin="round" /></svg>,
  db: <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><ellipse cx="12" cy="5.5" rx="7.5" ry="3" fill="#3b82f6" /><path d="M4.5 5.5v13c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-13" fill="#3b82f6" /><path d="M4.5 10c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3M4.5 14.5c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3" stroke="#fff" strokeWidth="1.3" fill="none" /></svg>,
  sparkle: <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><defs><linearGradient id="hvSpark" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#4f8cff" /><stop offset="1" stopColor="#7c4dff" /></linearGradient></defs><path d="M12 2c.6 5.2 4.8 9.4 10 10-5.2.6-9.4 4.8-10 10-.6-5.2-4.8-9.4-10-10 5.2-.6 9.4-4.8 10-10z" fill="url(#hvSpark)" /></svg>,
  network: <Stroke size={26} width={1.8}><circle cx="12" cy="5" r="2.5" /><circle cx="5" cy="18" r="2.5" /><circle cx="19" cy="18" r="2.5" /><path d="M11 7.2L6.2 15.8M13 7.2l4.8 8.6M7.5 18h9" /></Stroke>,
  gear: <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true"><path fill="#2f7bf5" d="M19.4 13a7.5 7.5 0 0 0 0-2l2.1-1.6-2-3.5-2.5 1a7.6 7.6 0 0 0-1.7-1L15 3.3h-4l-.4 2.6a7.6 7.6 0 0 0-1.7 1l-2.5-1-2 3.5L6.6 11a7.5 7.5 0 0 0 0 2l-2.1 1.6 2 3.5 2.5-1c.5.4 1.1.7 1.7 1l.4 2.6h4l.4-2.6c.6-.3 1.2-.6 1.7-1l2.5 1 2-3.5zM13 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" transform="translate(-1 0)" /></svg>,
  code: <Stroke size={30} width={2.2}><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></Stroke>,
  search: <Stroke size={24} width={2}><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2" /></Stroke>,
  target: <Stroke size={24} width={2}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.5" /></Stroke>,
};

export const logos = {
  flutter: <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true"><path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357z" fill="#47c5fb" /><path d="M14.328 11.072L7.857 17.53 11.5 21.2l10.2-10.128h-7.372z" fill="#47c5fb" /><path d="M7.857 17.53l6.47 6.47H21.7l-6.46-6.468z" fill="#0175c2" /><path d="M11.5 21.2l3.74-3.668-3.74-3.66-3.643 3.658z" fill="#02569b" opacity=".6" /></svg>,
  react: <svg viewBox="-12 -12 24 24" width="44" height="44" aria-hidden="true"><g fill="none" stroke="#23b5e8" strokeWidth="1.1"><ellipse rx="10.5" ry="4" /><ellipse rx="10.5" ry="4" transform="rotate(60)" /><ellipse rx="10.5" ry="4" transform="rotate(120)" /></g><circle r="2" fill="#23b5e8" /></svg>,
  android: <svg viewBox="-20 -24 40 46" width="40" height="40" aria-hidden="true"><g fill="#34a853"><path d="M-15-2a15 13 0 0 1 30 0z" /><rect x="-15" y="1" width="30" height="17" rx="3" /><rect x="-21" y="1" width="4.5" height="13" rx="2.25" /><rect x="16.5" y="1" width="4.5" height="13" rx="2.25" /><rect x="-9" y="14" width="5" height="9" rx="2.5" /><rect x="4" y="14" width="5" height="9" rx="2.5" /></g><path d="M-8-13l-4-7M8-13l4-7" stroke="#34a853" strokeWidth="2" strokeLinecap="round" /><circle cx="-6" cy="-7" r="1.8" fill="#fff" /><circle cx="6" cy="-7" r="1.8" fill="#fff" /></svg>,
  kotlin: <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true"><defs><linearGradient id="hvKotlin" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#e44857" /><stop offset=".47" stopColor="#c711e1" /><stop offset="1" stopColor="#7f52ff" /></linearGradient></defs><path d="M24 24H0V0h24L12 12z" fill="url(#hvKotlin)" /></svg>,
  docker: <svg viewBox="0 0 32 24" width="42" height="32" aria-hidden="true"><g fill="#2496ed"><path d="M1 12.5h26.5c1.8 0 3.2-1 3.5-2.2-1.1-.8-2.6-.8-3.4-.3-.4-1.6-1.6-2.5-1.6-2.5s-1.3 1.4-.8 3.5c-.3.3-1 .5-1.8.5H1c-.4 4.6 2.5 9.5 9.8 9.5 7.6 0 12.8-3.4 15-9" /><rect x="4" y="8" width="3.4" height="3.4" rx=".5" /><rect x="8.2" y="8" width="3.4" height="3.4" rx=".5" /><rect x="12.4" y="8" width="3.4" height="3.4" rx=".5" /><rect x="16.6" y="8" width="3.4" height="3.4" rx=".5" /><rect x="8.2" y="3.8" width="3.4" height="3.4" rx=".5" /><rect x="12.4" y="3.8" width="3.4" height="3.4" rx=".5" /><rect x="16.6" y="3.8" width="3.4" height="3.4" rx=".5" /><rect x="12.4" y="-.4" width="3.4" height="3.4" rx=".5" /></g></svg>,
  firebase: <svg viewBox="0 0 24 24" width="38" height="38" aria-hidden="true"><path d="M4 18.5L6.8 1.8c.1-.5.8-.6 1-.1l3 5.6z" fill="#ffc24a" /><path d="M4 18.5l8.8-11.1-2.3-4.3c-.2-.4-.8-.4-1 0z" fill="#ffa712" /><path d="M4 18.5L16.6 4.4c.3-.3.9-.1 1 .3L20 18.5l-7 3.9a2 2 0 0 1-2 0z" fill="#f4bd62" /><path d="M20 18.5L17.6 4.7c-.1-.4-.6-.6-1-.3L4 18.5l7 3.9a2 2 0 0 0 2 0z" fill="#ff8f00" opacity=".85" /></svg>,
  openai: <svg viewBox="-12 -12 24 24" width="42" height="42" aria-hidden="true"><g fill="none" stroke="#11161d" strokeWidth="1.5">{[0, 60, 120, 180, 240, 300].map(a => <rect key={a} x="-2.6" y="-10" width="9" height="12" rx="4.5" transform={`rotate(${a})`} />)}</g></svg>,
  link: <Stroke size={36} width={2}><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3.2-3.2a4.5 4.5 0 0 0-6.4-6.4l-1.2 1.2" /><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3.2 3.2a4.5 4.5 0 0 0 6.4 6.4l1.2-1.2" /></Stroke>,
  sqlite: <svg viewBox="0 0 24 24" width="38" height="38" aria-hidden="true"><path d="M19.5 2.5C14 4 8.5 9.5 6.5 16c-.6 2-.9 3.8-.9 5.5h1.2c.3-3.5 1.8-7.7 4.2-10.8C9 14 8 17.5 8 20c4-1.5 8.5-6.5 10-11.5.6-2 1-4 1.5-6z" fill="#0f80cc" /><path d="M5.6 21.5c.2-3 1.5-7.5 4.5-11.5" stroke="#bfe1ff" strokeWidth=".8" fill="none" /></svg>,
  postgres: <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true"><g fill="#fff" stroke="#336791" strokeWidth="1.3" strokeLinejoin="round"><path d="M17.8 4.2C16 2.7 13.2 2.5 11.5 3.3 9.5 2.4 6.3 2.3 4.6 4 2.6 6 3.3 10 4.4 13.4c.9 2.8 2.2 4.8 3.4 4.6 1-.2 1.3-1.6 1.5-3 .6.4 1.4.6 2.1.6l-.2 3.5c0 1.5.8 2.8 2.4 2.8 1.8 0 2.5-1.3 2.6-3.3l.1-3.5c1.8-.1 3.3-1.3 3.5-3.4.4-2.3.2-5.7-2-7.5z" fill="#336791" /><path d="M11.5 3.3c-1.5 1-2.5 3.2-2.5 6 0 2 .5 4 .3 5.7M15.8 14c1.2-1.8 2-5.3 1.4-8.6" fill="none" stroke="#fff" /><circle cx="14.3" cy="8" r=".8" fill="#fff" stroke="none" /></g></svg>,
  mongo: <svg viewBox="0 0 24 24" width="36" height="36" aria-hidden="true"><path d="M12 1.5c2.8 3.5 5.5 6.8 5.2 11.3-.3 4.2-2.6 6.4-4.6 7.6l-.4 2.6h-.6l-.3-2.6C9.3 19.2 6.9 17 6.8 12.8 6.7 8.3 9.3 5 12 1.5z" fill="#13aa52" /><path d="M12 3v19" stroke="#b8c4b8" strokeWidth=".9" /></svg>,
};

const IconTile = ({ x, y, s = 64, children, className = '' }) => <div className={`hv-tile ${className}`} style={at(x, y, s, s)}>{children}</div>;

const Headline = ({ x, y, w, h, icon, tint = '#eaf1fe', title, text }) => (
  <div className="hv-card hv-headline" style={at(x, y, w, h)}>
    <span className="hv-badge" style={{ background: tint }}>{icon}</span>
    <div><b>{title}</b><span>{text}</span></div>
  </div>
);

const Kw = ({ c, children }) => <span className={`hv-c-${c}`}>{children}</span>;

function Laptop() {
  const files = [['src', 0, 'folder'], ['presentation', 1], ['features', 1], ['data', 1], ['domain', 1], ['core', 1], ['di', 1], ['navigation', 1], ['api', 1], ['models', 1, 'round'], ['utils', 1]];
  const code = [
    [],
    [<Kw c="k">class </Kw>, <Kw c="t">MobileApp </Kw>, <Kw c="k">extends </Kw>, <Kw c="t">StatelessWidget </Kw>, '{'],
    ['  ', <Kw c="a">@override</Kw>],
    ['  ', <Kw c="t">Widget </Kw>, <Kw c="f">build</Kw>, '(', <Kw c="t">BuildContext </Kw>, 'context) {'],
    ['    ', <Kw c="k">return </Kw>, <Kw c="t">MaterialApp</Kw>, '('],
    ['      home: ', <Kw c="k">const </Kw>, <Kw c="t">HomeScreen</Kw>, '(),'],
    ['      theme: ', <Kw c="t">AppTheme</Kw>, '.', <Kw c="f">light</Kw>, '(),'],
    ['    );'],
    ['  }'],
    ['}'],
  ];
  return (
    <div className="hv-laptop" style={at(455, 262, 670, 480)}>
      <div className="hv-screen">
        <div className="hv-editor">
          <div className="hv-titlebar"><i /><i /><i /><span>mobile-engineering.ts</span></div>
          <div className="hv-editor-body">
            <ul className="hv-tree">{files.map(([f, d, t]) => <li key={f} style={{ paddingLeft: 10 + d * 16 }}><span className="hv-caret">›</span><span className={`hv-file ${t || ''}`} />{f}</li>)}</ul>
            <div className="hv-code">
              {code.map((line, i) => <div key={i}><em>{i === 9 ? 19 : i + 1}</em><code>{line.map((p, j) => <React.Fragment key={j}>{p}</React.Fragment>)}</code></div>)}
            </div>
          </div>
          <div className="hv-terminal">
            <div className="hv-term-tabs"><span>PROBLEMS</span><span>OUTPUT</span><span>TERMINAL</span></div>
            {['Running build...', 'Installing dependencies...', 'Launching on emulator...', 'Build successful in 12.4s'].map((t, i) => <div key={t} className={i === 3 ? 'ok' : ''}><b>✓</b>{t}</div>)}
          </div>
        </div>
      </div>
      <div className="hv-base"><span /></div>
    </div>
  );
}

function Phone() {
  return (
    <div className="hv-phone" style={at(988, 408, 222, 420)}>
      <div className="hv-phone-screen">
        <div className="hv-island" />
        <div className="hv-status"><span>9:41</span><span className="hv-signal"><i /><i /><i /></span></div>
        <div className="hv-phone-top"><span className="hv-app-dot" /><div><b /><b /></div><span className="hv-app-sq" /></div>
        <div className="hv-phone-title">Build.<br />Scale.<br />Ship.</div>
        <span className="hv-go">→</span>
        <div className="hv-phone-list">
          <div><span className="hv-shield">✓</span><p><b /><b /></p></div>
          <div><span className="hv-check">✓</span><p><b /><b /></p></div>
        </div>
        <div className="hv-tabbar">
          <Stroke size={17} width={2.2}><path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z" fill="currentColor" /></Stroke>
          <Stroke size={17}><path d="M6 3h8l4 4v14H6z" /></Stroke>
          <Stroke size={17}><path d="M6 20v-6M12 20V8M18 20v-9" /></Stroke>
          <Stroke size={17}><circle cx="12" cy="12" r="3" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" /></Stroke>
        </div>
        <div className="hv-home" />
      </div>
    </div>
  );
}

function Connectors() {
  const paths = [
    'M408 128 C 470 128, 520 170, 540 240 S 600 300, 640 250',
    'M452 127 C 500 60, 600 40, 700 70',
    'M562 220 C 600 240, 620 260, 650 262',
    'M1128 60 C 1160 60, 1170 100, 1230 100',
    'M1292 262 C 1260 262, 1230 250, 1225 210 C 1220 180, 1180 170, 1150 160',
    'M1292 262 C 1300 290, 1290 300, 1260 320',
    'M1200 750 C 1230 750, 1245 720, 1250 690',
    'M1138 875 C 1180 875, 1200 830, 1245 800',
    'M1015 860 C 1060 870, 1100 875, 1138 875',
    'M412 378 C 440 378, 470 390, 500 420',
    'M395 480 C 420 520, 430 540, 422 560',
    'M595 812 C 610 800, 630 800, 645 808',
    'M680 808 C 690 790, 700 760, 700 740',
    'M1165 360 C 1200 380, 1220 390, 1252 380',
    'M1120 500 C 1160 520, 1190 520, 1228 460',
  ];
  const dots = [[452, 127, 'fill'], [1128, 60, 'ring'], [1292, 262, 'fill'], [1200, 750, 'fill'], [1138, 875, 'fill'], [412, 378, 'fill'], [422, 542, 'fill'], [595, 812, 'fill'], [562, 220, 'fill'], [650, 262, 'fill'], [1187, 388, 'fill'], [500, 420, 'fill']];
  return (
    <svg className="hv-connectors" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      {paths.map(d => <path key={d} d={d} />)}
      {dots.map(([x, y, t]) => t === 'ring' ? <circle key={`${x}-${y}`} cx={x} cy={y} r="7" className="ring" /> : <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" className="dot" />)}
    </svg>
  );
}

export default function HeroVisual() {
  const ref = useRef(null);
  const [fit, setFit] = useState({ scale: 0.45, x: 0, y: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Fit inside the box: by width alone when the box takes its height from aspect-ratio,
    // or by width and height when a layout (e.g. the hero grid row) sets the height.
    const update = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const scale = Math.min(w / W, h > 0 ? h / H : Infinity);
      setFit({ scale, x: (w - W * scale) / 2, y: (h - H * scale) / 2 });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="hero-visual" ref={ref} style={{ aspectRatio: `${W} / ${H}` }} role="img" aria-label="Full-stack mobile engineering: mobile, backend APIs, state management, architecture, data, cloud delivery and AI integrations">
      <div className="hv-canvas" style={{ width: W, height: H, transform: `translate(${fit.x}px, ${fit.y}px) scale(${fit.scale})` }}>
        <div className="hv-glow" />
        <Connectors />

        {/* Left column */}
        <Headline x={77} y={85} w={332} h={90} icon={<span style={{ color: '#2f7bf5' }}>{icons.phone}</span>} title="Mobile" text="Flutter · React Native · Kotlin" />
        <IconTile x={162} y={184}>{logos.flutter}</IconTile>
        <IconTile x={248} y={184}>{logos.react}</IconTile>
        <IconTile x={334} y={184}>{logos.android}</IconTile>
        <IconTile x={420} y={180} s={70}>{logos.kotlin}</IconTile>

        <div className="hv-card hv-state" style={at(130, 287, 268, 228)}>
          <div className="hv-card-head"><span style={{ color: '#2f7bf5' }}>{icons.network}</span>State Management</div>
          {['BLoC', 'MVVM', 'Redux Toolkit', 'Provider', 'Riverpod'].map((s, i) => <div key={s} className={`hv-opt ${i === 0 ? 'on' : ''}`}><i />{s}</div>)}
        </div>

        <Headline x={36} y={528} w={262} h={82} icon={icons.layers} title="Architecture" text="Clean · MVVM · BLoC" />
        <div className="hv-card hv-arch" style={at(58, 622, 224, 206)}>
          <svg viewBox="0 0 224 206" aria-hidden="true"><g fill="none" stroke="#6d8fc9" strokeWidth="1.4" strokeLinecap="round"><path d="M112 58v16M109 61l3-3 3 3M109 71l3 3 3-3" /><path d="M58 116c-12 4-14 20-10 34M45 146l3 5 4-4" /><path d="M166 116c12 4 14 20 10 34M172 147l4 4 3-5" /><path d="M100 168h24M103 165l-3 3 3 3M121 165l3 3-3 3" /><path d="M20 24v118M20 142h8M204 24v118M204 142h-8" stroke="#dfe7f5" /></g></svg>
          <span className="hv-box" style={at(72, 18, 80, 38)}>UI</span>
          <span className="hv-box" style={at(57, 88, 110, 38)}>Domain</span>
          <span className="hv-box" style={at(16, 148, 74, 38)}>Data</span>
          <span className="hv-box" style={at(132, 148, 74, 38)}>Core</span>
        </div>

        <div className="hv-card hv-schema" style={at(308, 560, 326, 228)}>
          <div className="hv-card-head"><span>{icons.db}</span>Database Schema</div>
          <div className="hv-table" style={at(22, 68, 108, 132)}><b>users</b>{[['id', 'PK'], ['name'], ['email'], ['created_at']].map(([c, k]) => <div key={c}>{c}<em>{k}</em></div>)}</div>
          <div className="hv-table" style={at(170, 62, 134, 152)}><b>transactions</b>{[['id', 'PK'], ['user_id', 'FK'], ['amount'], ['status'], ['created_at']].map(([c, k]) => <div key={c}>{c}<em>{k}</em></div>)}</div>
          <svg className="hv-rel" viewBox="0 0 326 228" aria-hidden="true"><path d="M130 112c10 0 14 4 14 14 0 10 4 14 14 14h12" fill="none" stroke="#6d8fc9" strokeWidth="1.4" /><path d="M166 136l4 4-4 4" fill="none" stroke="#6d8fc9" strokeWidth="1.4" /></svg>
        </div>

        <div className="hv-card hv-data" style={at(302, 795, 262, 122)}>
          <span className="hv-badge">{icons.db}</span>
          <div><b>Data</b><span>Room · SQLite · SQL</span></div>
          <div className="hv-data-logos">{logos.sqlite}{logos.postgres}{logos.mongo}</div>
        </div>

        {/* Centre */}
        <div className="hv-card hv-ghost" style={at(646, 86, 56, 90)}><b /><b /><b /></div>
        <IconTile x={588} y={160} s={46} className="hv-small">{icons.search}</IconTile>
        <IconTile x={427} y={414} s={50} className="hv-small">{icons.target}</IconTile>
        <IconTile x={640} y={806} s={40} className="hv-small">{icons.target}</IconTile>

        <div className="hv-card hv-api" style={at(706, 48, 420, 224)}>
          <div className="hv-url"><span className="hv-method">POST</span>/api/v1/payments<i>×</i></div>
          <div className="hv-tabs"><span>Params</span><span>Headers</span><span className="on">Body</span><span>Response</span></div>
          <pre className="hv-json">{'{\n  '}<Kw c="s">"amount"</Kw>: <Kw c="n">1250.00</Kw>{',\n  '}<Kw c="s">"currency"</Kw>: <Kw c="n">"LKR"</Kw>{',\n  '}<Kw c="s">"paymentMethod"</Kw>: <Kw c="n">"card"</Kw>{'\n}'}</pre>
        </div>
        <div className="hv-card hv-response" style={at(964, 148, 276, 152)}>
          <span className="hv-ok">200 OK</span>
          <pre className="hv-json">{'{\n  '}<Kw c="g">"success"</Kw>: <Kw c="b">true</Kw>{',\n  '}<Kw c="g">"transactionId"</Kw>: <Kw c="n">"txn_8f2..."</Kw>{',\n  '}<Kw c="g">"message"</Kw>: <Kw c="n">"Payment completed"</Kw>{'\n}'}</pre>
        </div>

        <Laptop />
        <IconTile x={1104} y={328} s={60}>{icons.gear}</IconTile>
        <Phone />

        <div className="hv-card hv-pe" style={at(710, 822, 306, 80)}>
          <small>PRODUCT ENGINEERING</small>
          <b>UI → APIs → Data → Delivery</b>
        </div>

        {/* Right column */}
        <Headline x={1230} y={66} w={316} h={98} icon={<span style={{ color: '#2f7bf5' }}>{icons.server}</span>} title="Backend" text="Spring Boot · FastAPI · REST · GraphQL" />
        <IconTile x={1430} y={194} s={62}><span style={{ color: '#2f7bf5' }}>{icons.code}</span></IconTile>

        <Headline x={1252} y={310} w={310} h={88} icon={icons.cloud} title="Cloud & Delivery" text="CI/CD · Docker · Firebase" />
        <div className="hv-card hv-pipe" style={at(1228, 400, 322, 106)}>
          {[
            ['Build', <span style={{ transform: 'scale(.9)' }}>{icons.gear}</span>],
            ['Test', <svg viewBox="0 0 24 24" width="28" height="28"><circle cx="12" cy="12" r="10" fill="#22b35e" /><path d="M7.5 12.2l3 3 6-6" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>],
            ['Deploy', <svg viewBox="0 0 24 24" width="28" height="28"><path d="M12 2l9 5v10l-9 5-9-5V7z" fill="#5b5cf6" /><path d="M3 7l9 5 9-5M12 12v10" stroke="#a5b4fc" strokeWidth="1.4" fill="none" /></svg>],
            ['Monitor', <svg viewBox="0 0 24 24" width="28" height="28" fill="#2f7bf5"><rect x="4" y="13" width="4" height="8" rx="1" /><rect x="10" y="8" width="4" height="13" rx="1" /><rect x="16" y="3" width="4" height="18" rx="1" /></svg>],
          ].map(([l, ic], i) => <React.Fragment key={l}>{i > 0 && <span className="hv-arrow">→</span>}<div className="hv-step"><span>{ic}</span>{l}</div></React.Fragment>)}
        </div>
        <IconTile x={1310} y={518} s={60}>{logos.docker}</IconTile>
        <IconTile x={1385} y={518} s={60}>{logos.firebase}</IconTile>
        <IconTile x={1460} y={518} s={60}>{icons.cloud}</IconTile>

        <div className="hv-card hv-ai" style={at(1242, 602, 318, 210)}>
          <div className="hv-ai-head"><span className="hv-badge">{icons.sparkle}</span><div><b>AI & Integrations</b><span>LangChain · OpenAI · Gemini</span></div></div>
          <ul>{['Summarize document', 'Extract structured data', 'Generate insights', 'Integrate via APIs'].map(t => <li key={t}><i />{t}</li>)}</ul>
          <div className="hv-chip"><svg viewBox="0 0 48 48" width="56" height="56" aria-hidden="true"><g stroke="#8b7cf6" strokeWidth="2" strokeLinecap="round">{[16, 24, 32].map(v => <path key={v} d={`M${v} 4v6M${v} 38v6M4 ${v}h6M38 ${v}h6`} />)}</g><rect x="10" y="10" width="28" height="28" rx="6" fill="#f3f0ff" stroke="#6d5cf6" strokeWidth="2" /><text x="24" y="29" textAnchor="middle" fontSize="13" fontWeight="700" fill="#5b4cf0" fontFamily="Inter, sans-serif">AI</text></svg></div>
        </div>
        <IconTile x={1292} y={826} s={64}>{logos.openai}</IconTile>
        <IconTile x={1373} y={826} s={64}>{icons.sparkle}</IconTile>
        <IconTile x={1455} y={826} s={64}><span style={{ color: '#2f7bf5' }}>{logos.link}</span></IconTile>
      </div>
    </div>
  );
}
