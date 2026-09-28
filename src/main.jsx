import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const CV_FILE = '/assets/CV.pdf';

/* ---------------- data ---------------- */

const pillars = [
  { icon: 'devices', accent: 'cyan', title: 'High-Performance Web Platforms',
    desc: 'Fast, responsive interfaces with clean, component-driven architecture.',
    tags: ['React', 'Vite', 'Responsive UI'] },
  { icon: 'dns', accent: 'emerald', title: 'Backend & API Systems',
    desc: 'Reliable services, typed APIs, and clean data layers.',
    tags: ['Node.js', 'TypeScript', 'Prisma / SQL'] },
  { icon: 'neurology', accent: 'violet', title: 'Applied AI & Machine Learning',
    desc: 'Turning language and vision models into practical product features.',
    tags: ['TensorFlow', 'NLP', 'Computer Vision'] },
  { icon: 'query_stats', accent: 'cyan', title: 'Data Analysis',
    desc: 'Exploring and structuring data to support real decisions.',
    tags: ['Python', 'Scikit-learn', 'Data Viz'] }
];

const radarSkills = [
  { name: 'React', pct: 90, blurb: 'Component-driven UI, hooks', cat: 'frontend' },
  { name: 'Vite', pct: 90, blurb: 'Fast dev server & build tooling', cat: 'frontend' },
  { name: 'Tailwind / CSS', pct: 80, blurb: 'Responsive, utility-first styling', cat: 'frontend' },
  { name: 'Figma / UI Design', pct: 80, blurb: 'Wireframes, prototypes, UI concepts', cat: 'frontend' },
  { name: 'Node.js', pct: 85, blurb: 'REST APIs, server-side logic', cat: 'backend' },
  { name: 'TypeScript', pct: 80, blurb: 'Typed, safer application code', cat: 'backend' },
  { name: 'Prisma / SQL', pct: 85, blurb: 'Schema design, queries, migrations', cat: 'backend' },
  { name: 'REST API Design', pct: 80, blurb: 'Endpoints, validation, service layers', cat: 'backend' },
  { name: 'Machine Learning', pct: 85, blurb: 'Model training & evaluation', cat: 'ai' },
  { name: 'Deep Learning', pct: 80, blurb: 'Neural nets, TensorFlow pipelines', cat: 'ai' },
  { name: 'NLP / Computer Vision', pct: 80, blurb: 'Text & image model pipelines', cat: 'ai' },
  { name: 'Python & Data Analysis', pct: 85, blurb: 'Data wrangling & modeling workflows', cat: 'ai' }
];

const radarFilters = [
  { key: 'all', label: 'All Technologies' },
  { key: 'frontend', label: 'Frontend & UI' },
  { key: 'backend', label: 'Backend & APIs' },
  { key: 'ai', label: 'AI & Machine Learning' }
];

const projects = [
  { id: 1, title: 'PathIdea UI/UX Concept', category: 'Web App', img: '/assets/PathIdea.webp',
    desc: 'A digital product marketplace concept for selling presentation templates, CV templates, and posters with preview, category filtering, and payment integration features.',
    stack: ['UI Design', 'React', 'TailwindCSS'], demo: '' },
  { id: 2, title: 'Photos UI Concept', category: 'Mobile App', img: '/assets/Photos.webp',
    desc: 'An online photo gallery app concept with upload features, album management, and social sharing functionality.',
    stack: ['Figma', 'Prototype'], demo: '' },
  { id: 3, title: 'Safekota', category: 'Web App', img: '/assets/SafeKota.webp',
    desc: 'A web application for monitoring and reporting road conditions, featuring an interactive map, user reports, and accident statistics.',
    stack: ['React', 'CSS', 'Responsive', 'Figma', 'Prototype'], demo: 'https://favianjz.github.io/HCI/index.html',
    terminal: 'safekota.map --live' },
  { id: 4, title: 'Sinefolis UI Mobile Concept', category: 'Mobile App', img: '/assets/Sinefolis.webp',
    desc: 'A mobile app concept for cinema ticket booking with seat selection, movie schedules, and online payment features.',
    stack: ['Figma', 'Prototype'], demo: '' },
  { id: 5, title: 'Zero Waste', category: 'Web App', img: '/assets/ZeroWaste.webp',
    desc: 'A web application for selling unsold restaurant food at discounted prices, with location-based search, food category filtering, and payment integration.',
    stack: ['React', 'CSS', 'Responsive', 'Figma', 'Prototype'], demo: 'https://favianjz.github.io/WebsiteKelompokSE/',
    terminal: 'zerowaste.listings --live' },
  { id: 6, title: 'Sportzy UI Concept', category: 'Web App', img: '/assets/Sportzy.webp',
    desc: 'A sports equipment e-commerce website concept with product catalogs, sports category filters, and payment integration.',
    stack: ['UI Design', 'React', 'TailwindCSS'], demo: '' },
  { id: 7, title: 'News Detection', category: 'Machine Learning', img: '/assets/AI.webp',
    desc: 'A machine learning model for detecting fake or real news using news datasets and NLP-based classification techniques.',
    stack: ['NLP', 'Python', 'Scikit-learn'], demo: 'https://github.com/Epinnn14/Fake-True-news-detection' },
  { id: 8, title: 'Anomaly Detection', category: 'Machine Learning', img: '/assets/AI.webp',
    desc: 'A machine learning model for detecting anomalies in data using clustering and outlier detection techniques.',
    stack: ['Machine Learning', 'Python', 'Scikit-learn'], demo: 'https://github.com/Epinnn14/Anomaly-Detection' },
  { id: 9, title: 'Translation Language', category: 'Machine Learning', img: '/assets/AI.webp',
    desc: 'A machine learning model for translating text between English and Japanese.',
    stack: ['NLP', 'Python', 'Deep Learning'], demo: 'https://github.com/Epinnn14/Translation-Languange' },
  { id: 10, title: 'Deep Learning Time Series', category: 'Machine Learning', img: '/assets/AI.webp',
    desc: 'A deep learning model for forecasting time series data using LSTM or RNN-based approaches.',
    stack: ['Deep Learning', 'Python', 'TensorFlow'], demo: 'https://github.com/Epinnn14/DL-Time-Series' },
  { id: 11, title: 'Sentiment Analysis', category: 'Machine Learning', img: '/assets/AI.webp',
    desc: 'A machine learning model for analyzing sentiment from text, such as product reviews or social media posts.',
    stack: ['NLP', 'Python', 'Scikit-learn'], demo: 'https://github.com/Epinnn14/Sentiment-Analysis' },
  { id: 12, title: 'Image Classification', category: 'Machine Learning', img: '/assets/AI.webp',
    desc: 'A machine learning model for classifying images into specific categories using CNN-based visual feature extraction.',
    stack: ['Computer Vision', 'Python', 'TensorFlow'], demo: 'https://github.com/Epinnn14/Image-Classification' },
  { id: 13, title: 'CitizenCare AI Model', category: 'Machine Learning', img: '/assets/AI.webp',
    desc: 'A machine learning model designed to help city governments classify citizen reports using NLP and computer vision techniques.',
    stack: ['NLP', 'Python', 'Computer Vision', 'TensorFlow'], demo: 'https://github.com/Epinnn14/CitizenCare' },
  { id: 14, title: 'CitizenCare Web App', category: 'Web App', img: '/assets/CitizenCare.webp',
    desc: 'A web application that helps citizens report urban issues and allows city officials to track, manage, and respond to reports.',
    stack: ['React', 'Node.js', 'Responsive', 'Figma', 'Prototype'], demo: 'https://capstone-project-psi-weld.vercel.app/',
    terminal: 'citizencare.reports --live' }
];

const FLAGSHIP_IDS = [14, 3, 5];
const flagships = FLAGSHIP_IDS.map((id) => projects.find((p) => p.id === id));
const moreProjects = projects.filter((p) => !FLAGSHIP_IDS.includes(p.id));

const timeline = [
  { year: '2026', role: 'Application Developer — Backend Focus', place: 'Internship at BINUS University',
    desc: 'Built backend APIs and services for a game application using TypeScript, integrated with Prisma.',
    tags: ['TypeScript', 'Prisma', 'REST APIs', 'PostgreSQL'] },
  { year: '2026', role: 'AI Engineer Bootcamp', place: 'Dicoding Indonesia x DBS Bank',
    desc: 'Learned AI fundamentals, machine learning, and practical implementation of AI models for business-oriented solutions.',
    tags: ['Machine Learning', 'Applied AI', 'Deep Learning'] },
  { year: '2025', role: 'AI Application Builder', place: 'BINUS University',
    desc: 'Built AI-based applications integrating language and image models into practical digital products.',
    tags: ['LLMs', 'Computer Vision'] },
  { year: '2024', role: 'UI & Web Project Builder', place: 'Personal Projects',
    desc: 'Worked on web applications and modern user interface design experiments.',
    tags: ['React', 'UI Design'] },
  { year: '2023', role: 'Software Engineering Student', place: 'BINUS University',
    desc: 'Studied software engineering, data structures, algorithms, and fundamental web development.',
    tags: ['Data Structures', 'Algorithms'] }
];

const contactChannels = [
  { icon: 'alternate_email', accent: 'cyan', label: 'Email', value: 'kevinaprilio1406@gmail.com', link: 'mailto:kevinaprilio1406@gmail.com' },
  { icon: 'calendar_month', accent: 'emerald', label: 'Book a Call', value: 'Schedule via Calendly', link: 'https://calendly.com/kevinaprilio1406', external: true },
  { icon: 'chat', accent: 'violet', label: 'WhatsApp', value: '+62 821 9813 0192', link: 'https://wa.me/6282198130192', external: true }
];

const navLinks = [
  { label: 'About', target: 'top' },
  { label: 'Services', target: 'services' },
  { label: 'Stack', target: 'stack' },
  { label: 'Works', target: 'works' },
  { label: 'Journey', target: 'journey' },
  { label: 'Contact', target: 'contact' }
];

const hasValidLink = (link) => typeof link === 'string' && link.trim() !== '';
const linkLabel = (link) => (link.includes('github.com') ? 'View Repository' : 'Live Demo');

/* ---------------- hooks ---------------- */

function useTyping(words) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const delay = isDeleting ? 40 : 85;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text === current) setTimeout(() => setIsDeleting(true), 1400);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setWordIndex((idx) => idx + 1);
        }
      }
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);

  return text;
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/* ---------------- small pieces ---------------- */

function Icon({ name, className = '' }) {
  return <span className={`material-symbols-outlined ${className}`}>{name}</span>;
}

function ToastStack({ toasts }) {
  return (
    <div className="toast-stack" aria-live="polite">
      {toasts.map((toast) => (
        <div className="toast" key={toast.id}>
          <Icon name="task_alt" className="ic-sm" />
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}

function CvModal({ close }) {
  return (
    <div className="modal-backdrop" onMouseDown={close}>
      <div className="glass-modal cv-modal" role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <span className="eyebrow-chip">Curriculum Vitae</span>
            <h3>Kevin Aprilio — CV Preview</h3>
          </div>
          <button className="modal-close" onClick={close} aria-label="Close CV modal">×</button>
        </div>
        <div className="cv-frame-wrap">
          <iframe className="cv-frame" src={CV_FILE} title="Kevin Aprilio CV Preview"></iframe>
        </div>
        <div className="modal-actions">
          <a className="btn btn-outline" href={CV_FILE} target="_blank" rel="noreferrer">Open in new tab</a>
          <a className="btn btn-primary" href={CV_FILE} download="Kevin-Aprilio-CV.pdf">Download CV</a>
        </div>
      </div>
    </div>
  );
}

/* ---------------- header ---------------- */

function Header({ active, openCv }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <a href="#top" className="brand">
            <span className="brand-mark">KA</span>
            <span>Kevin Aprilio</span>
            <span className="brand-suffix">/dev</span>
          </a>
          <nav className="nav-links">
            {navLinks.map((link) => (
              <a key={link.target} href={`#${link.target}`} className={active === link.target ? 'is-active' : ''}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <span className="status-pill">
              <span className="dot dot-emerald pulse"></span>
              Available for Hire
            </span>
            <button className="btn btn-primary btn-sm" type="button" onClick={openCv}>Resume</button>
            <button className={`nav-toggle ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen((v) => !v)} aria-label="Open menu" aria-expanded={mobileOpen}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a key={link.target} href={`#${link.target}`} onClick={() => setMobileOpen(false)}>{link.label}</a>
        ))}
        <button className="btn btn-primary" type="button" onClick={() => { setMobileOpen(false); openCv(); }}>Resume</button>
      </div>
    </>
  );
}

/* ---------------- hero ---------------- */

function CommandPalette() {
  const typed = useTyping(['kevin.profile --inspect', 'stack.list --category=ai', 'works.open --id=citizencare']);

  return (
    <div className="palette">
      <div className="palette-chrome">
        <div className="dots"><span className="dot-r"></span><span className="dot-a"></span><span className="dot-g"></span></div>
        <span className="palette-url">kevinaprilio-portfolio.vercel.app</span>
        <span className="palette-live"><span className="dot dot-emerald pulse"></span>live</span>
      </div>
      <div className="palette-input">
        <span className="prompt">$</span>
        <span>{typed}</span>
        <span className="caret"></span>
      </div>
      <div className="palette-list">
        <a href="https://github.com/Epinnn14" target="_blank" rel="noreferrer">
          <span><Icon name="terminal" className="ic-cyan" />GitHub Repositories</span>
          <span className="meta">gh/Epinnn14 <kbd>G</kbd></span>
        </a>
        <a href="https://www.linkedin.com/in/alessandro-kevin-aprilio" target="_blank" rel="noreferrer">
          <span><Icon name="badge" className="ic-violet" />LinkedIn Network</span>
          <span className="meta">in/aprilio <kbd>L</kbd></span>
        </a>
        <a href="#contact">
          <span><Icon name="mail" className="ic-emerald" />Direct Transmission</span>
          <span className="meta">Email <kbd>M</kbd></span>
        </a>
        <a href="#stack">
          <span><Icon name="layers" className="ic-cyan" />Stack Inventory</span>
          <span className="meta">{radarSkills.length} Core Skills <kbd>T</kbd></span>
        </a>
        <a href="#works">
          <span><Icon name="dataset" className="ic-cyan" />Production Architectures</span>
          <span className="meta">{flagships.length} Case Studies <kbd>P</kbd></span>
        </a>
      </div>
      <div className="palette-foot">
        <span>Press shortcut to invoke</span>
        <span>v1.0.0 · React + Vite</span>
      </div>
    </div>
  );
}

function QuoteCard() {
  return (
    <div className="quote-card">
      <Icon name="bolt" className="ic-cyan ic-lg" />
      <div>
        <span className="quote-title">Ship, don&apos;t theorize</span>
        <p>Every project here is a real build I shipped or prototyped — from quick UI concepts to deployed AI pipelines.</p>
      </div>
    </div>
  );
}

function Hero({ profile, openCv }) {
  return (
    <section className="hero" id="top">
      <div className="hero-glow"></div>
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="status-pill hero-status">
            <span className="dot dot-emerald pulse"></span>
            Status: Open for Work &amp; Internship Roles
            <span className="sep">•</span>
            <span className="dim">Jakarta, ID (UTC+7)</span>
          </div>
          <h1>Crafting <span className="grad-text">reliable web platforms</span> &amp; practical AI products.</h1>
          <p className="sub">
            Hi, I&apos;m <b>Kevin Aprilio</b>. Software Engineering student at BINUS University. I build clean web
            interfaces, reliable backend services, and practical AI-powered features — bridging frontend, backend,
            and applied machine learning into real, working products.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#works"><span>Explore Projects</span><Icon name="arrow_downward" className="ic-sm" /></a>
            <a className="btn btn-outline" href="#contact"><Icon name="send" className="ic-sm" /><span>Contact Kevin</span></a>
            <button className="btn btn-ghost" type="button" onClick={openCv}><Icon name="description" className="ic-sm" /><span>MY CV</span></button>
          </div>
          <div className="stat-row">
            <div className="stat-tile"><span className="num cyan">{profile.projects}</span><span className="lbl">Projects Shipped</span></div>
            <div className="stat-tile"><span className="num emerald">{profile.exp}+</span><span className="lbl">Yr Hands-on Experience</span></div>
            <div className="stat-tile"><span className="num ink">3</span><span className="lbl">Core Focus Areas</span></div>
          </div>
        </div>
        <figure className="hero-photo">
          <img
            src="/assets/profile.webp"
            alt="Kevin Aprilio"
            onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }}
          />
          <figcaption className="photo-caption"><span className="dot dot-emerald pulse"></span>Kevin Aprilio</figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ---------------- pillars ---------------- */

function Pillars() {
  return (
    <section id="services" className="section section-alt">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow-row"><span className="eyebrow-chip">01 / ARCHITECTURE</span><span className="rule"></span></div>
          <div className="section-head-row">
            <h2>Core Pillars &amp; Competencies</h2>
          </div>
        </div>
        <div className="pillars-grid">
          {pillars.map((p) => (
            <div className="pillar-card" key={p.title}>
              <div className={`pillar-icon ic-${p.accent}`}><Icon name={p.icon} /></div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="tag-row">
                {p.tags.map((t) => <span key={t} className="code-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- stack radar ---------------- */

function StackRadar({ showToast }) {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? radarSkills : radarSkills.filter((s) => s.cat === filter);

  return (
    <section id="stack" className="section">
      <div className="wrap">
        <div className="section-head row-wrap">
          <div>
            <div className="eyebrow-row"><span className="eyebrow-chip">02 / ARSENAL</span><span className="rule"></span></div>
            <h2>Technical Stack &amp; Radar</h2>
          </div>
          <div className="filter-row">
            {radarFilters.map((f) => (
              <button
                key={f.key}
                className={`filter-btn ${filter === f.key ? 'active' : ''}`}
                onClick={() => { setFilter(f.key); showToast(`${f.label} filter applied`); }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="skills-grid">
          {filtered.map((s) => (
            <div className="skill-card" key={s.name}>
              <div className="skill-top"><span>{s.name}</span><span className={`pct ic-${s.cat === 'frontend' ? 'cyan' : s.cat === 'backend' ? 'emerald' : 'violet'}`}>{s.pct}%</span></div>
              <div className="skill-bar"><div className={`skill-fill fill-${s.cat}`} style={{ width: `${s.pct}%` }}></div></div>
              <div className="skill-bottom"><span>{s.blurb}</span><span className="dot dot-emerald"></span></div>
            </div>
          ))}
        </div>
        <div className="mandate-banner">
          <div className="mandate-left">
            <Icon name="code_blocks" className="ic-cyan ic-lg" />
            <div>
              <span className="quote-title">How I approach builds</span>
              <p>Favors clean, typed code and shipping things that actually work end-to-end over over-engineered abstractions.</p>
            </div>
          </div>
          <div className="mandate-right">
            <span className="status-chip"><span className="dot dot-emerald"></span>Actively building &amp; learning</span>
            <span className="status-chip"><span className="dot dot-cyan"></span>Open to code review &amp; feedback</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- case studies / works ---------------- */

function CaseStudy({ project }) {
  const accent = project.category === 'Machine Learning' ? 'violet' : 'cyan';
  return (
    <article className="case-card">
      <div className="case-copy">
        <div className="tag-row">
          <span className={`badge-tag ic-${accent}`}>{project.category}</span>
          {project.stack.slice(0, 2).map((s) => <span key={s} className="badge-tag-outline">{s}</span>)}
        </div>
        <h3>{project.title}</h3>
        <p>{project.desc}</p>
        <div className="tag-row">
          {project.stack.map((s) => <span key={s} className="code-tag">{s}</span>)}
        </div>
        <div className="case-actions">
          {hasValidLink(project.demo) && (
            <a className="btn btn-primary btn-sm" href={project.demo} target="_blank" rel="noreferrer">
              <Icon name="open_in_new" className="ic-sm" /><span>{linkLabel(project.demo)}</span>
            </a>
          )}
        </div>
      </div>
      <div className="case-visual">
        <img src={project.img} alt={project.title} loading="lazy" />
        {project.terminal && (
          <span className="case-caption"><span className="dot dot-emerald pulse"></span>{project.terminal}</span>
        )}
      </div>
    </article>
  );
}

function MoreProjectCard({ project, onOpen }) {
  return (
    <button className="mini-card" onClick={() => onOpen(project)} type="button">
      <img src={project.img} alt="" loading="lazy" />
      <div className="mini-overlay">
        <span className="badge-tag-sm">{project.category}</span>
        <h4>{project.title}</h4>
      </div>
    </button>
  );
}

function Works({ showToast }) {
  const [selected, setSelected] = useState(null);

  return (
    <section id="works" className="section section-alt">
      <div className="wrap">
        <div className="section-head row-wrap">
          <div>
            <div className="eyebrow-row"><span className="eyebrow-chip">03 / PRODUCTION CASE STUDIES</span><span className="rule"></span></div>
            <h2>Architectures in the Wild</h2>
          </div>
        </div>
        <div className="case-stack">
          {flagships.map((p) => <CaseStudy key={p.id} project={p} />)}
        </div>

        <div className="more-head">
          <h3>More builds</h3>
          <span className="dim-sm">{moreProjects.length} additional projects &amp; experiments</span>
        </div>
        <div className="mini-grid">
          {moreProjects.map((p) => <MoreProjectCard key={p.id} project={p} onOpen={setSelected} />)}
        </div>
      </div>

      {selected && (
        <div className="modal-backdrop" onMouseDown={() => setSelected(null)}>
          <div className="glass-modal proj-modal" role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close">×</button>
            <img src={selected.img} alt={selected.title} />
            <span className="badge-tag">{selected.category}</span>
            <h3>{selected.title}</h3>
            <p>{selected.desc}</p>
            <div className="tag-row">
              {selected.stack.map((s) => <span key={s} className="code-tag">{s}</span>)}
            </div>
            {hasValidLink(selected.demo) ? (
              <a className="btn btn-primary" href={selected.demo} target="_blank" rel="noreferrer">
                <Icon name="open_in_new" className="ic-sm" /><span>{linkLabel(selected.demo)}</span>
              </a>
            ) : (
              <p className="concept-note">Concept project — no public demo yet.</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------------- journey / timeline ---------------- */

function Journey() {
  return (
    <section id="journey" className="section">
      <div className="wrap">
        <div className="section-head row-wrap">
          <div>
            <div className="eyebrow-row"><span className="eyebrow-chip">04 / TIMELINE</span><span className="rule"></span></div>
            <h2>Career Journey &amp; Milestones</h2>
          </div>
        </div>
        <div className="journey-grid">
          <div className="journey-track">
          {timeline.map((item, i) => (
            <div className="journey-item" key={`${item.year}-${item.role}`}>
              <span className={`journey-dot ${i === 0 ? 'dot-cyan' : ''}`}></span>
              <div className="journey-meta">
                <span className="badge-tag">{item.year}</span>
                <span className="dim-sm">{item.place}</span>
              </div>
              <h3>{item.role}</h3>
              <p>{item.desc}</p>
              <div className="tag-row">
                {item.tags.map((t) => <span key={t} className="code-tag">{t}</span>)}
              </div>
            </div>
          ))}
          </div>
          <aside className="journey-side">
            <CommandPalette />
            <QuoteCard />
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ---------------- contact ---------------- */

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: 'Freelance / Project Assignment', message: '' });

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${form.type} inquiry from ${form.name || 'your portfolio site'}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nType: ${form.type}\n\n${form.message}`);
    window.location.href = `mailto:kevinaprilio1406@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section section-alt">
      <div className="wrap">
        <div className="contact-grid">
          <div className="contact-left">
            <div className="eyebrow-row"><span className="eyebrow-chip">05 / DIRECT CHANNEL</span><span className="rule"></span></div>
            <h2>Let&apos;s build something remarkable.</h2>
            <p className="section-note">
              Whether you&apos;re staffing a freelance build, need an AI-powered feature shipped, or just want a
              second pair of eyes on a system design — my inbox is open.
            </p>
            <div className="channel-list">
              {contactChannels.map((c) => (
                <a key={c.label} className="channel-row" href={c.link} target={c.external ? '_blank' : undefined} rel={c.external ? 'noopener noreferrer' : undefined}>
                  <span className="channel-left"><Icon name={c.icon} className={`ic-${c.accent}`} /><span><span className="dim-sm block">{c.label}</span><b>{c.value}</b></span></span>
                  <Icon name="arrow_forward" className="ic-sm dim" />
                </a>
              ))}
            </div>
          </div>

          <form className="dispatch-form" onSubmit={submit}>
            <div className="dispatch-head">
              <span><span className="dot dot-cyan pulse"></span>Transmit Project Inquiry</span>
              <span className="dim-sm mono">mailto: draft</span>
            </div>
            <div className="form-row-2">
              <label>Your Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Alex Vance" /></label>
              <label>Email Address<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="alex@company.com" /></label>
            </div>
            <label>Project Scope / Engagement Type
              <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option>Freelance / Project Assignment</option>
                <option>Internship Opportunity</option>
                <option>Collaboration</option>
                <option>Other Inquiry</option>
              </select>
            </label>
            <label>Message
              <textarea required rows="4" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Outline the project, timeline, or role..."></textarea>
            </label>
            <button className="btn btn-primary btn-block" type="submit"><span>Send Message</span><Icon name="arrow_forward" className="ic-sm" /></button>
            <p className="form-note">Opens your email app with this pre-filled — nothing sends automatically.</p>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------------- footer ---------------- */

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-bottom">
          <span>© 2026 Kevin Aprilio</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- app ---------------- */

function App() {
  const [toasts, setToasts] = useState([]);
  const [cvOpen, setCvOpen] = useState(false);
  const active = useActiveSection(['top', 'services', 'stack', 'works', 'journey', 'contact']);

  const profile = { exp: 1, projects: 20 };

  const showToast = (message) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
      const key = e.key.toUpperCase();
      const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      if (key === 'G') window.open('https://github.com/Epinnn14', '_blank');
      if (key === 'L') window.open('https://www.linkedin.com/in/alessandro-kevin-aprilio', '_blank');
      if (key === 'M') go('contact');
      if (key === 'T') go('stack');
      if (key === 'P') go('works');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <Header active={active} openCv={() => setCvOpen(true)} />
      <main>
        <Hero profile={profile} openCv={() => setCvOpen(true)} />
        <Pillars />
        <StackRadar showToast={showToast} />
        <Works showToast={showToast} />
        <Journey />
        <Contact />
      </main>
      <Footer />
      <ToastStack toasts={toasts} />
      {cvOpen && <CvModal close={() => setCvOpen(false)} />}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
