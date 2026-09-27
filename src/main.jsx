import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import HeroVisual from './HeroVisual';
import SkillCards from './SkillCards';

const apps = [
  {
    name: 'Mobitel Selfcare', logo: '/apps/mobitel-selfcare.png', category: 'Telecom Self-Care App', downloads: '1M+ downloads', rating: '3.5', reviews: '30K+ reviews',
    icon: 'M', accent: '#1464ff', tech: ['Flutter', 'BLoC', 'REST API', 'Firebase', 'SQLite'],
    store: 'https://play.google.com/store/apps/details?id=com.mobitel.selfcare',
    screens: ['Dashboard', 'Usage', 'Add-ons'],
    description: 'Led the Flutter modernization of a large-scale telecom self-care experience with multilingual support, offline-capable preferences and analytics.'
  },
  {
    name: 'KAST', logo: '/apps/kast.png', category: 'Global Digital Wallet', downloads: '500K+ downloads', rating: '3.6', reviews: '2.9K reviews',
    icon: 'K', accent: '#151515', tech: ['Flutter', 'BLoC', 'Dio', 'GoRouter', 'Reown'],
    store: 'https://play.google.com/store/apps/details?id=com.kastfinance.app',
    screens: ['Wallet', 'Activity', 'Card'],
    description: 'Built mobile wallet capabilities for a global fintech product, including secure wallet connectivity and production UI flows.'
  },
  {
    name: 'mPay', logo: '/apps/mpay.png', category: 'QR Payment Application', downloads: '10K+ downloads', rating: '—', reviews: '',
    icon: 'm', accent: '#1db77a', tech: ['React Native', 'TypeScript', 'Redux Toolkit', 'Axios'],
    store: 'https://play.google.com/store/apps/details?id=family.mobitel.mpay',
    screens: ['Payments', 'Scan QR', 'Transactions'],
    description: 'Developed a QR-based digital payment application with secure REST APIs, JWT sessions, Redux state management and payment workflows.'
  }
];

const experience = [
  {
    period: '2026 — Present', company: 'ESOFT technologies (pvt) Ltd', role: 'Senior Software Engineer', engagement: 'Full-time', domain: 'Payments · POS · Mobile', logo: '/company/esoft.jpeg',
    focus: 'ET Cloud Pay · Mobile POS · QR Pay',
    text: 'Leading mobile product architecture and delivery across payment workflows, POS integrations, secure device pairing and transaction infrastructure.',
    highlights: ['Payment transaction orchestration', 'WebSocket broker communication', 'Secure POS-to-device pairing', 'CI/CD and production delivery'],
    tags: ['Flutter', 'Dio', 'Clean Architecture', 'WebSockets', 'Payment Gateway']
  },
  {
    period: '2025 — 2026', company: 'KAST', role: 'Freelance Software Engineer — Mobile Development', engagement: 'Freelance', domain: 'Fintech · Digital Wallet', logo: null, fallback: 'K',
    focus: 'Self-custodial wallet · Stablecoin top-ups',
    text: 'Developed production wallet experiences with secure external-wallet connectivity and automated funding flows.',
    highlights: ['Self-custodial wallet flows', 'Stablecoin top-up integration', 'Binance / MetaMask connectivity', 'Production update and reminder flows'],
    tags: ['Flutter', 'BLoC', 'Dio', 'GoRouter', 'Reown']
  },
  {
    period: '2023 — 2025', company: 'Mobitel (Pvt) Ltd', role: 'Senior Software Engineer — Full-stack Mobile Development', engagement: 'Full-time', domain: 'Telecom · Fintech · Enterprise', logo: '/company/mobitel.png',
    focus: 'SelfCare · mPay · Sales Force Automation · Network Diagnostics',
    text: 'Led and contributed to multiple production mobile systems spanning telecom self-service, QR payments, field sales and network diagnostics.',
    highlights: ['Modernized SelfCare with Flutter', 'Contributed to mPay QR payments', 'Built offline-first SFA workflows', 'Developed native network diagnostics'],
    tags: ['Flutter', 'React Native', 'Kotlin', 'Spring Boot', 'Room', 'Firebase']
  },
  {
    period: '2021 — 2023', company: 'EVICIO (Pvt) Ltd', role: 'Associate Software Engineer', engagement: 'Full-time', domain: 'Web · Mobile · Business Software', logo: '/company/evicio.jpeg',
    focus: 'Employee Management · Travel Itinerary',
    text: 'Built reusable web and cross-platform mobile experiences for business workflows, combining frontend architecture with API integrations.',
    highlights: ['15+ reusable React components', 'Redux Toolkit state management', 'Leave approval and RBAC workflows', 'GraphQL travel planning features'],
    tags: ['ReactJS', 'React Native', 'Redux Toolkit', 'GraphQL', 'Material UI']
  },
  {
    period: '2017 — 2020', company: 'Tengri Aero Industries (Pvt) Ltd', role: 'Associate Electronic Engineer', engagement: 'Full-time', domain: 'Embedded Systems · Avionics', logo: '/company/tengri.jpeg',
    focus: 'Cockpit Test Unit · Inventory Management',
    text: 'Worked across embedded firmware, hardware diagnostics and internal software systems supporting engineering and inventory operations.',
    highlights: ['C++11 on Yocto Linux', 'GStreamer media validation', 'CAN / UART / I²C testing', 'Real-time inventory tracking'],
    tags: ['C++11', 'Yocto Linux', 'GStreamer', 'CAN', 'UART', 'I²C', 'MySQL']
  },
  {
    period: '2015 — 2016', company: 'Riscor Consultants (Pvt) Ltd', role: 'Trainee Electronic Engineer', engagement: 'Trainee', domain: 'IoT · Android · Hardware', logo: null, fallback: 'R',
    focus: 'Vehicle Tracking System',
    text: 'Worked on an IoT fleet-tracking solution combining embedded GPS/GSM hardware with an Android application.',
    highlights: ['Arduino GPS/GSM module', 'Google Maps live tracking', 'Geofencing alerts', 'Offline SQLite caching'],
    tags: ['Java', 'Android', 'Arduino', 'GPS', 'GSM/GPRS', 'SQLite']
  }
];

function Logo() { return <a className="logo" href="#top" aria-label="Vijana Kaushalya home"><img className="logo-avatar" src="/profile.jpg" alt="" width="44" height="44" /><b>Vijana Kaushalya</b><small>Full-stack Mobile Engineer</small></a> }
function Arrow() { return <span aria-hidden="true">↗</span> }
function Phone({ app, label, i }) { return <div className="phone" style={{ '--accent': app.accent }}><div className="phone-top"><span>{label}</span><i /></div><div className="phone-content"><div className="phone-title">{app.name}</div><div className="mini-stat">{i === 0 ? 'Overview' : i === 1 ? 'Activity' : 'Details'}</div><div className="mini-chart"><span /><span /><span /><span /><span /></div><div className="mini-row"><em /><em /><em /></div><div className="mini-list"><b /><b /><b /></div></div></div> }
function AppCard({ app }) { return <article className="app-card"><div className="app-head"><div className="app-icon" style={{ background: app.accent }}>{app.logo ? <img src={app.logo} alt={`${app.name} app icon`} /> : app.icon}</div><div><h3>{app.name}</h3><p>{app.category}</p></div></div><div className="app-meta"><strong>{app.downloads}</strong><span>★ {app.rating}</span><span>{app.reviews}</span></div><div className="chips">{app.tech.map(t => <span key={t}>{t}</span>)}</div><div className="phones">{app.screens.map((s, i) => <Phone key={s} app={app} label={s} i={i} />)}</div><div className="app-foot"><p>{app.description}</p><a href={app.store} target="_blank" rel="noreferrer">Public app listing <Arrow /></a></div></article> }
const MetricIcon = ({ children }) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>;

const metrics = [
  { value: '5+', label: 'Years experience', tint: '#eaf1fe', tone: '#1464ff', icon: <MetricIcon><rect x="3" y="7" width="18" height="13" rx="2.5" /><path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7M3 12.5h18" /></MetricIcon> },
  { value: '1M+', label: 'Mobitel SelfCare downloads', tint: '#e8f0ff', tone: '#1757d6', icon: <MetricIcon><rect x="6" y="2.5" width="12" height="19" rx="2.5" /><path d="M12 7.5v7M9 11.5l3 3 3-3M10.5 18.5h3" /></MetricIcon> },
  { value: '500K+', label: 'KAST downloads', tint: '#e6f7ec', tone: '#1f9d55', icon: <MetricIcon><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3" /><rect x="4" y="8" width="16" height="11" rx="2.5" /><path d="M20 11.5h-3.5a2 2 0 0 0 0 4H20" /></MetricIcon> },
  { value: '6', label: 'Engineering domains  FinTech - TelCo - Crypto - POS', tint: '#fff4e0', tone: '#d97706', icon: <MetricIcon><path d="M12 3l9 4.5-9 4.5-9-4.5z" /><path d="M3 12l9 4.5 9-4.5M3 16.5L12 21l9-4.5" /></MetricIcon> },
];

const Tile = ({ x, y, s = 44, children }) => <g transform={`translate(${x} ${y})`}><rect width={s} height={s} rx={s * 0.26} fill="#fff" filter="url(#tileShadow)" />{children}</g>;
const TileShadow = () => <defs><filter id="tileShadow" x="-40%" y="-40%" width="180%" height="180%"><feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#1d2939" floodOpacity=".14" /></filter></defs>;

const FlutterArt = () => <svg viewBox="0 0 160 120" aria-hidden="true"><TileShadow />
  <g transform="rotate(8 105 60)"><rect x="72" y="-4" width="64" height="132" rx="12" fill="#fff" stroke="#11161d" strokeWidth="3.5" /><rect x="94" y="0" width="20" height="5" rx="2.5" fill="#11161d" />
    <rect x="80" y="12" width="48" height="22" rx="5" fill="#dfe8fb" /><circle cx="104" cy="23" r="5" fill="#a9c1f2" />
    <rect x="80" y="39" width="48" height="36" rx="5" fill="#dfe8fb" /><path d="M82 73l14-15 9 9 7-6 14 12z" fill="#a9c1f2" /><circle cx="110" cy="50" r="3" fill="#a9c1f2" />
    <rect x="80" y="80" width="48" height="16" rx="5" fill="#e8eefb" /><rect x="80" y="100" width="48" height="16" rx="5" fill="#e8eefb" /></g>
  <Tile x={10} y={32} s={60}><g transform="translate(12 12) scale(1.5)"><path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357z" fill="#47c5fb" /><path d="M14.328 11.072L7.857 17.53 11.5 21.2l10.2-10.128h-7.372z" fill="#47c5fb" /><path d="M7.857 17.53l6.47 6.47H21.7l-6.46-6.468z" fill="#0175c2" /><path d="M11.5 21.2l3.74-3.668-3.74-3.66-3.643 3.658z" fill="#02569b" opacity=".6" /></g></Tile>
</svg>;

const AndroidArt = () => <svg viewBox="0 0 160 120" aria-hidden="true"><TileShadow />
  <g transform="rotate(8 110 60)"><rect x="76" y="-6" width="64" height="136" rx="12" fill="#1c232c" stroke="#34c759" strokeWidth="3" />
    {[[10, 30, '#4b8ef5'], [18, 22, '#4b8ef5'], [26, 36, '#34c759'], [34, 18, '#8a94a3'], [44, 28, '#f5a524'], [52, 40, '#e4e7ec'], [62, 20, '#4b8ef5'], [70, 32, '#34c759'], [80, 24, '#4b8ef5'], [88, 36, '#8a94a3'], [98, 22, '#34c759'], [106, 30, '#4b8ef5']].map(([y, w, c], i) => <rect key={i} x={86 + (i % 3) * 4} y={y} width={w} height="3" rx="1.5" fill={c} />)}</g>
  <Tile x={8} y={30} s={62}><g transform="translate(31 36)" fill="#34a853"><path d="M-20 0a20 17 0 0 1 40 0z" /><rect x="-20" y="3" width="40" height="18" rx="3" /><path d="M-11-14l-5-8M11-14l5-8" stroke="#34a853" strokeWidth="2.5" strokeLinecap="round" /><circle cx="-8" cy="-6" r="2.4" fill="#fff" /><circle cx="8" cy="-6" r="2.4" fill="#fff" /></g></Tile>
  <Tile x={112} y={78} s={34}><g transform="translate(17 17)"><circle r="11" fill="#34a853" opacity=".2" /><circle cy="-6" r="3.2" fill="none" stroke="#11161d" strokeWidth="2" /><path d="M-2-3l-6 13M2-3l6 13" stroke="#11161d" strokeWidth="2.4" strokeLinecap="round" /></g></Tile>
</svg>;

const BackendArt = () => <svg viewBox="0 0 160 120" aria-hidden="true"><TileShadow />
  {[8, 30, 52, 74].map(y => <g key={y}><rect x="56" y={y} width="56" height="19" rx="5" fill="#4a5a78" /><rect x="62" y={y + 7} width="18" height="5" rx="2.5" fill="#2f3b52" /><circle cx="65" cy={y + 9.5} r="1.6" fill="#6ee7b7" /><circle cx="70" cy={y + 9.5} r="1.6" fill="#93c5fd" /></g>)}
  <path d="M112 42a9 9 0 0 1 17-4 8 8 0 0 1 11 8 7 7 0 0 1-2 13h-26a8 8 0 0 1 0-17z" fill="#fff" filter="url(#tileShadow)" />
  {[96, 84, 72].map(y => <g key={y}><rect x="102" y={y} width="30" height="14" fill="#3b4a66" /><ellipse cx="117" cy={y + 14} rx="15" ry="4.5" fill="#3b4a66" /><ellipse cx="117" cy={y} rx="15" ry="4.5" fill="#56688c" /></g>)}
  <Tile x={8} y={46} s={60}><g transform="translate(30 30)"><path d="M17-15c3 6 4 13 1 20-5 12-20 15-31 8C-22 7-20-8-10-14c8-5 19-4 27-1z" fill="#6db33f" /><path d="M-12 11C-3 1 5-6 15-12" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" /><circle cx="-14" cy="12" r="2.5" fill="#fff" /></g></Tile>
</svg>;

const ArchitectureArt = () => <svg viewBox="0 0 160 120" aria-hidden="true"><TileShadow />
  <path d="M40 26h20v26M120 26h-20v26M40 94h20V68M120 94h-20V68M60 52h40M60 68h40" stroke="#c9d6ee" strokeWidth="1.6" fill="none" />
  <path d="M80 72l24 12-24 12-24-12z" fill="#fff" stroke="#dfe6f3" /><path d="M80 60l24 12-24 12-24-12z" fill="#1757d6" /><path d="M80 46l24 12-24 12-24-12z" fill="#4c8dff" opacity=".95" />
  <Tile x={18} y={6} s={36}><g transform="translate(18 18)" fill="#3b82f6"><circle r="7" /><circle r="3" fill="#fff" />{[0, 45, 90, 135, 180, 225, 270, 315].map(a => <rect key={a} x="-2" y="-10.5" width="4" height="5" rx="1" transform={`rotate(${a})`} />)}</g></Tile>
  <Tile x={106} y={6} s={36}><g transform="translate(11 8)"><path d="M0 0h10l5 5v15H0z" fill="#3b82f6" /><path d="M3 9h9M3 13h9M3 17h6" stroke="#fff" strokeWidth="1.6" /></g></Tile>
  <Tile x={18} y={78} s={36}><g transform="translate(18 12)" fill="#3b4a66"><ellipse cy="0" rx="8" ry="3" /><rect x="-8" y="0" width="16" height="11" /><ellipse cy="11" rx="8" ry="3" /><path d="M-8 4a8 3 0 0 0 16 0M-8 8a8 3 0 0 0 16 0" stroke="#fff" strokeWidth="1" fill="none" /></g></Tile>
  <Tile x={106} y={78} s={36}><rect x="11" y="7" width="14" height="22" rx="3" fill="none" stroke="#3b82f6" strokeWidth="2.4" /><rect x="15.5" y="25" width="5" height="1.6" rx=".8" fill="#3b82f6" /></Tile>
</svg>;

const aboutCards = [
  { title: 'Flutter', text: 'Production mobile', tint: '#eaf1fe', art: <FlutterArt /> },
  { title: 'Android', text: 'Kotlin & native APIs', tint: '#e6f7ec', art: <AndroidArt /> },
  { title: 'Backend', text: 'Spring Boot, FastAPI & REST', tint: '#eaf0fb', art: <BackendArt /> },
  { title: 'Architecture', text: 'Clean · MVVM · BLoC', tint: '#edf2fc', art: <ArchitectureArt /> },
];

function App() {
  const [menu, setMenu] = useState(false); useEffect(() => { const fn = () => setMenu(false); window.addEventListener('resize', fn); return () => window.removeEventListener('resize', fn) }, []); return <div id="top">
    <header className="nav"><div className="container nav-inner"><Logo /><button className="menu" onClick={() => setMenu(v => !v)} aria-label="Toggle navigation">☰</button><nav className={menu ? 'open' : ''}>{[['About', '#about'], ['Experience', '#experience'], ['Apps', '#apps'], ['Skills', '#skills'], ['Contact', '#contact']].map(([x, y]) => <a key={x} href={y}>{x}</a>)}<a className="nav-cta" href="mailto:vijanakaush@gmail.com">Let’s Talk <Arrow /></a></nav></div></header>
    <main>
      <section className="hero container"><div className="hero-copy"><div className="eyebrow">FULL-STACK MOBILE ENGINEER</div><h1>I build mobile products that <span>scale</span> from pixels to production.</h1><p className="lead">5+ years building production-grade mobile applications across fintech, telecom, payments, POS and SaaS — from polished mobile interfaces to APIs, backend systems and real-world users.</p><div className="actions"><a className="btn primary" href="#apps">View My Work <Arrow /></a><a className="btn" href="/Vijana-Kaushalya-Maparathna-Resume.pdf" download>Download Resume ↓</a></div></div><HeroVisual /><div className="metrics">{metrics.map(m => <div className="metric-card" key={m.label} style={{ '--tint': m.tint, '--tone': m.tone }}><span className="metric-icon">{m.icon}</span><strong>{m.value}</strong><span>{m.label}</span></div>)}</div></section>
      <section id="apps" className="section container"><div className="section-head"><div><span className="eyebrow">FEATURED APPS I CONTRIBUTED TO</span><h2>Products used in the real world.</h2></div><a href="#contact">Work with me <Arrow /></a></div><div className="app-grid">{apps.map(a => <AppCard key={a.name} app={a} />)}</div><p className="source-note">Public usage figures are shown from current Google Play listings; contribution details are based on my professional experience.</p></section>
      <section id="about" className="section soft"><div className="container split"><div><span className="eyebrow">ABOUT</span><h2>Engineering across the entire mobile product lifecycle.</h2><p>I’m a Full-stack Mobile Engineer focused on building maintainable mobile systems that connect thoughtful UX with reliable APIs, data and delivery pipelines.</p><p>My experience spans cross-platform and native development, backend services, payment infrastructure, offline-first systems, hardware integration and AI-powered features.</p><a className="text-link" href="#experience">Explore my experience <Arrow /></a></div><div className="about-stats">{aboutCards.map(c => <div className="about-card" key={c.title} style={{ '--tint': c.tint }}><div className="about-art">{c.art}</div><div><strong>{c.title}</strong><span>{c.text}</span></div></div>)}</div></div></section>
      <section id="experience" className="section container"><div className="section-head"><div><span className="eyebrow">PROFESSIONAL EXPERIENCE</span><h2>A career built around solving product problems.</h2></div><a href="/Vijana-Kaushalya-Maparathna-Resume.pdf" download>Full résumé <Arrow /></a></div><div className="experience-grid">{experience.map((e, i) => <article className="experience-card" key={e.company}>
        <div className="experience-top">
          <div className="company-mark">{e.logo ? <img src={e.logo} alt={`${e.company} logo`} /> : <span>{e.fallback}</span>}</div>
          <div className="experience-heading"><div className="period">{e.period}</div><h3>{e.company}</h3><h4>{e.role}</h4></div>
          <span className="engagement">{e.engagement}</span>
        </div>
        <div className="experience-meta"><span>{e.domain}</span><span>{e.focus}</span></div>
        <p className="experience-summary">{e.text}</p>
        <div className="experience-detail-grid"><div><small>KEY CONTRIBUTIONS</small><ul>{e.highlights.map(x => <li key={x}>{x}</li>)}</ul></div><div><small>TECHNOLOGY</small><div className="chips">{e.tags.map(t => <span key={t}>{t}</span>)}</div></div></div>
      </article>)}</div></section>
      <section id="skills" className="section soft"><div className="container"><div className="section-head"><div><span className="eyebrow">ENGINEERING TOOLKIT</span><h2>From interface to infrastructure.</h2></div></div><SkillCards /></div></section>
      <section className="section container education"><div className="education-main"><div className="uni-logo"><img src="/company/sunderland.png" alt="University of Sunderland logo" /></div><div><span className="eyebrow">EDUCATION</span><h2>Bachelor of Engineering (Hons)</h2><p>Electronic and Electrical Engineering · University of Sunderland, UK</p></div></div><div className="degree">2nd Upper<br /><small>First Division</small></div></section>
      <section id="contact" className="contact container"><div><span className="eyebrow">LET’S BUILD SOMETHING GREAT</span><h2>Have a product that needs to move from idea to production?</h2><p>Open to full-time opportunities, freelance projects and technical collaborations.</p></div><div className="contact-actions"><a className="btn primary" href="mailto:vijanakaush@gmail.com">Get in Touch <Arrow /></a><a className="btn dark" href="/Vijana-Kaushalya-Maparathna-Resume.pdf" download>Download Résumé</a></div></section>
    </main><footer><div className="container footer-inner"><Logo /><div><a href="mailto:vijanakaush@gmail.com">vijanakaush@gmail.com</a><a href="#top">Back to top ↑</a></div></div></footer>
  </div>
}

createRoot(document.getElementById('root')).render(<App />);
