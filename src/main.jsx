import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const CV_FILE = '/assets/CV.pdf';

const skills = [
  {
    title: 'Frontend Development',
    desc: 'Building fast, responsive, and interactive user interfaces.',
    items: [
      ['React', 90],
      ['Vite', 90],
      ['Tailwind / CSS', 80]
    ]
  },
  {
    title: 'Backend & API',
    desc: 'Designing APIs, database integration, and clean backend services.',
    items: [
      ['Node.js', 85],
      ['TypeScript', 80],
      ['Prisma / SQL', 85]
    ]
  },
  {
    title: 'AI Engineering',
    desc: 'Building AI-powered applications using language and vision models.',
    items: [
      ['Machine Learning', 85],
      ['Deep Learning', 80],
      ['NLP / Computer Vision', 80]
    ]
  }
];

const quickFacts = [
  ['🎓', 'Education', 'BINUS University — Software Engineering'],
  ['📍', 'Location', 'Jakarta, Indonesia'],
  ['🧩', 'Services', 'Web App, Backend, Machine Learning & AI'],
  ['💬', 'Languages', 'Indonesian & English']
];

const projects = [
  { id: 1, title: 'PathIdea UI/UX Concept', category: 'Web App', img: '/assets/PathIdea.png',
    desc: 'A digital product marketplace concept for selling presentation templates, CV templates, and posters with preview, category filtering, and payment integration features.',
    stack: ['UI Design', 'React', 'TailwindCSS'], demo: '' },
  { id: 2, title: 'Photos UI Concept', category: 'Mobile App', img: '/assets/Photos.png',
    desc: 'An online photo gallery app concept with upload features, album management, and social sharing functionality.',
    stack: ['Figma', 'Prototype'], demo: '' },
  { id: 3, title: 'Safekota', category: 'Web App', img: '/assets/SafeKota.png',
    desc: 'A web application for monitoring and reporting road conditions, featuring an interactive map, user reports, and accident statistics.',
    stack: ['React', 'CSS', 'Responsive', 'Figma', 'Prototype'], demo: 'https://favianjz.github.io/HCI/index.html' },
  { id: 4, title: 'Sinefolis UI Mobile Concept', category: 'Mobile App', img: '/assets/Sinefolis.png',
    desc: 'A mobile app concept for cinema ticket booking with seat selection, movie schedules, and online payment features.',
    stack: ['Figma', 'Prototype'], demo: '' },
  { id: 5, title: 'Zero Waste', category: 'Web App', img: '/assets/ZeroWaste.png',
    desc: 'A web application for selling unsold restaurant food at discounted prices, with location-based search, food category filtering, and payment integration.',
    stack: ['React', 'CSS', 'Responsive', 'Figma', 'Prototype'], demo: 'https://favianjz.github.io/WebsiteKelompokSE/' },
  { id: 6, title: 'Sportzy UI Concept', category: 'Web App', img: '/assets/Sportzy.png',
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
  { id: 14, title: 'CitizenCare Web App', category: 'Web App', img: '/assets/CitizenCare.png',
    desc: 'A web application that helps citizens report urban issues and allows city officials to track, manage, and respond to reports.',
    stack: ['React', 'Node.js', 'Responsive', 'Figma', 'Prototype'], demo: 'https://capstone-project-psi-weld.vercel.app/' }
];

const timeline = [
  { year: '2026', role: 'Application Developer - Backend Focus', place: 'Internship at BINUS University',
    desc: 'Built backend APIs and services for a game application using TypeScript and integrated the database with Prisma.' },
  { year: '2026', role: 'AI Engineer Bootcamp', place: 'Dicoding Indonesia x DBS Bank',
    desc: 'Learned AI fundamentals, machine learning, and practical implementation of AI models for business-oriented solutions.' },
  { year: '2025', role: 'AI Application Builder', place: 'BINUS University',
    desc: 'Built AI-based applications with a focus on integrating language and image models into practical digital products.' },
  { year: '2024', role: 'UI & Web Project Builder', place: 'Personal Projects',
    desc: 'Worked on web applications and modern user interface design experiments.' },
  { year: '2023', role: 'Software Engineering Student', place: 'BINUS University',
    desc: 'Studied software engineering, data structures, algorithms, and fundamental web development.' }
];

const contactCards = [
  { title: 'Email', value: 'kevinaprilio1406@gmail.com', link: 'mailto:kevinaprilio1406@gmail.com', cta: 'Send Email',
    icon: (<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.75 6.25h16.5a1 1 0 0 1 1 1v9.5a1 1 0 0 1-1 1H3.75a1 1 0 0 1-1-1v-9.5a1 1 0 0 1 1-1Zm0 1.17V7.5l8.25 6.05L20.25 7.5v-.08l-8.25 6.05-8.25-6.05Zm16.5 8.91V9.68l-7.66 5.62a1 1 0 0 1-1.18 0L3.75 9.68v6.65h16.5Z" /></svg>) },
  { title: 'WhatsApp', value: '+62 821 9813 0192', link: 'https://wa.me/6282198130192', cta: 'Chat on WhatsApp',
    icon: (<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.04 3C8.92 3 3.13 8.79 3.13 15.91c0 2.28.6 4.51 1.74 6.47L3 29l6.8-1.78a12.86 12.86 0 0 0 6.24 1.59c7.12 0 12.91-5.79 12.91-12.91S23.16 3 16.04 3Zm0 23.57c-1.97 0-3.9-.53-5.58-1.54l-.4-.24-4.03 1.06 1.08-3.93-.26-.4a10.63 10.63 0 0 1-1.48-5.61c0-5.88 4.79-10.67 10.67-10.67s10.67 4.79 10.67 10.67-4.79 10.66-10.67 10.66Zm5.85-7.98c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.51-.16-.73.16-.21.32-.84 1.05-1.03 1.27-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.59-.96-.85-1.6-1.9-1.79-2.22-.19-.32-.02-.49.14-.65.15-.14.32-.38.48-.57.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.73-1.76-1-2.41-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.86.4-.3.32-1.13 1.1-1.13 2.68s1.16 3.12 1.32 3.33c.16.21 2.29 3.5 5.55 4.9.78.34 1.38.54 1.85.69.78.25 1.49.21 2.05.13.63-.09 1.9-.78 2.17-1.53.27-.75.27-1.39.19-1.53-.08-.13-.3-.21-.62-.37Z" /></svg>) },
  { title: 'LinkedIn', value: 'Alessandro Kevin Aprilio', link: 'https://www.linkedin.com/in/alessandro-kevin-aprilio', cta: 'Open LinkedIn',
    icon: (<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.44-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.1 20.45H3.54V9H7.1v11.45Z" /></svg>) },
  { title: 'GitHub', value: 'Epinnn14', link: 'https://github.com/Epinnn14', cta: 'Open GitHub',
    icon: (<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.25c-5.39 0-9.75 4.36-9.75 9.75 0 4.31 2.79 7.96 6.67 9.25.49.09.67-.21.67-.47v-1.82c-2.71.59-3.29-1.16-3.29-1.16-.44-1.13-1.08-1.43-1.08-1.43-.89-.61.07-.6.07-.6.98.07 1.5 1.01 1.5 1.01.87 1.49 2.28 1.06 2.84.81.09-.63.34-1.06.62-1.3-2.17-.25-4.45-1.08-4.45-4.82 0-1.06.38-1.94 1.01-2.62-.1-.25-.44-1.24.1-2.59 0 0 .82-.26 2.68 1a9.25 9.25 0 0 1 4.88 0c1.86-1.26 2.68-1 2.68-1 .54 1.35.2 2.34.1 2.59.63.68 1.01 1.56 1.01 2.62 0 3.75-2.29 4.57-4.47 4.81.35.3.66.9.66 1.82v2.7c0 .26.18.56.68.47A9.76 9.76 0 0 0 21.75 12c0-5.39-4.36-9.75-9.75-9.75Z" /></svg>) },
  { title: 'Book a Call', value: 'Schedule via Calendly', link: 'https://calendly.com/kevinaprilio1406', cta: 'Book a Slot',
    icon: (<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2v2M17 2v2M3.5 8.5h17M4 5h16a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm3 8h4v4H7v-4Z" /></svg>) }
];

const navLinks = [
  { label: 'About', target: 'about' },
  { label: 'Work', target: 'work' },
  { label: 'Timeline', target: 'timeline' }
];

const hasValidLink = (link) => typeof link === 'string' && link.trim() !== '';
const linkLabel = (link) => (link.includes('github.com') ? 'View repo' : 'View live');

function useTyping(words) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const delay = isDeleting ? 45 : 90;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text === current) setTimeout(() => setIsDeleting(true), 1000);
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

function useTilt() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return undefined;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(700px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
    };
    const onLeave = () => { el.style.transform = ''; };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return ref;
}

function ToastStack({ toasts }) {
  return (
    <div className="toast-stack" aria-live="polite">
      {toasts.map((toast) => (
        <div className="toast" key={toast.id}>
          <span className="toast-icon">✓</span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}

function Header({ active }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="nav-wrap">
        <nav className="pill-nav">
          <a className="brand" href="#top">Kevin Aprilio</a>
          <div className="nav-links">
            {navLinks.map((link) => (
              <a
                key={link.target}
                href={`#${link.target}`}
                className={active === link.target ? 'is-active' : ''}
              >
                {link.label}
              </a>
            ))}
          </div>
          <a className="nav-cta" href="#contact">Let&apos;s talk</a>
          <button
            className={`nav-toggle ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <span></span><span></span><span></span>
          </button>
        </nav>
      </div>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a key={link.target} href={`#${link.target}`} onClick={() => setMobileOpen(false)}>
            {link.label}
          </a>
        ))}
        <a className="nav-cta" href="#contact" onClick={() => setMobileOpen(false)}>Let&apos;s talk</a>
      </div>
    </>
  );
}

function Hero({ profile, openCv }) {
  const typed = useTyping(['web development', 'AI engineering', 'backend systems', 'civic tech']);

  return (
    <section className="hero" id="top">
      <div className="eyebrow"><span className="pulse"></span> Available for new builds</div>
      <h1>Turning ideas into intelligent, well-crafted software.</h1>
      <p className="role-type">I build with a focus on <strong>{typed}</strong><span className="caret">|</span></p>
      <p className="sub">{profile.bio}</p>
      <div className="hero-cta">
        <button className="pbtn primary" type="button" onClick={openCv}>View resume</button>
        <a className="pbtn" href="#contact">Contact me</a>
      </div>
      <div className="chips-row">
        <div className="stat-chip"><b>{profile.exp}</b> year experience</div>
        <div className="stat-chip"><b>{profile.projects}</b> projects shipped</div>
        <div className="stat-chip"><b>3</b> focus areas</div>
      </div>
    </section>
  );
}

function CvModal({ close }) {
  return (
    <div className="modal-backdrop" onMouseDown={close}>
      <div className="glass-modal cv-modal" role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <span className="p-cat">Curriculum Vitae</span>
            <h3>Kevin Aprilio — CV Preview</h3>
          </div>
          <button className="modal-close" onClick={close} aria-label="Close CV modal">×</button>
        </div>
        <div className="cv-frame-wrap">
          <iframe className="cv-frame" src={CV_FILE} title="Kevin Aprilio CV Preview"></iframe>
        </div>
        <div className="modal-actions">
          <a className="pbtn" href={CV_FILE} target="_blank" rel="noreferrer">Open in new tab</a>
          <a className="pbtn primary" href={CV_FILE} download="Kevin-Aprilio-CV.pdf">Download CV</a>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-photo-card">
        <img
          src="/assets/profile.png"
          alt="Kevin Aprilio"
          onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }}
        />
      </div>
      <div className="about-copy">
        <p className="eyebrow-label">About me</p>
        <h2 className="about-title">Building fast, clean, and user-friendly digital ecosystems.</h2>
        <p className="about-desc">
          I create digital experiences with a user-centered approach. My focus is building
          responsive, clean, and natural interfaces while combining frontend, backend, and AI
          engineering skills to deliver meaningful products.
        </p>
        <div className="quick-grid">
          {quickFacts.map(([icon, title, value]) => (
            <div className="quick-card" key={title}>
              <span className="quick-icon">{icon}</span>
              <b>{title}</b>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills">
      <div className="skills-head">
        <p className="eyebrow-label">Skills</p>
        <h2 className="skills-title">Three main capability pillars</h2>
      </div>
      <div className="skills-grid">
        {skills.map((group) => (
          <div className="skill-panel" key={group.title}>
            <h3>{group.title}</h3>
            <p>{group.desc}</p>
            {group.items.map(([name, value]) => (
              <div className="bar-row" key={name}>
                <div className="bar-top"><span>{name}</span><span className="num">{value}%</span></div>
                <div className="bar-track"><div className="bar-fill" style={{ '--w': `${value}%` }}></div></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, onOpen }) {
  const tiltRef = useTilt();
  const tintVar = project.category === 'Machine Learning' ? 'var(--teal)' : project.category === 'Mobile App' ? 'var(--pink)' : 'var(--violet)';

  return (
    <button
      ref={tiltRef}
      className={`p-card tilt has-bg ${project.id === 14 ? 'feat' : ''}`}
      style={{ '--tint': tintVar, backgroundImage: `url(${project.img})` }}
      onClick={() => onOpen(project)}
      type="button"
    >
      <span className="p-cat">{project.category}</span>
      <h4>{project.title}</h4>
    </button>
  );
}

function Projects({ showToast }) {
  const [active, setActive] = useState('All');
  const [selected, setSelected] = useState(null);
  const categories = ['All', 'Web App', 'Mobile App', 'Machine Learning'];
  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="work">
      <div className="s-head"><h2>Selected work</h2><span className="tag">{projects.length} projects total</span></div>
      <div className="filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`chip ${active === cat ? 'active' : ''}`}
            onClick={() => { setActive(cat); showToast(`${cat} filter applied`); }}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="proj-bento">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={setSelected} />
        ))}
      </div>

      {selected && (
        <div className="modal-backdrop" onMouseDown={() => setSelected(null)}>
          <div className="glass-modal proj-modal" role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close">×</button>
            <img
              src={selected.img}
              alt={selected.title}
              onError={(e) => { e.currentTarget.src = 'https://placehold.co/900x600/0b0f1a/eef2fb?text=Project'; }}
            />
            <span className="p-cat">{selected.category}</span>
            <h3>{selected.title}</h3>
            <p>{selected.desc}</p>
            <div className="p-stack">
              {selected.stack.map((s) => <span key={s}>{s}</span>)}
            </div>
            {hasValidLink(selected.demo) ? (
              <a className="pbtn primary" href={selected.demo} target="_blank" rel="noreferrer">
                {linkLabel(selected.demo)} ↗
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

function Timeline() {
  return (
    <section id="timeline">
      <div className="s-head"><h2>Career timeline</h2><span className="tag">2023 — 2026</span></div>
      <div>
        {timeline.map((item) => (
          <div className="tl-row" key={`${item.year}-${item.role}`}>
            <div className="tl-year">{item.year}</div>
            <div>
              <h4>{item.role}</h4>
              <div className="place">{item.place}</div>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact">
      <div className="contact-panel">
        <h2>Let&apos;s build the next project together</h2>
        <p className="sub">Open for freelance work, internships, and collaboration.</p>
        <div className="contact-grid">
          {contactCards.map((card) => (
            <a
              key={card.title}
              className="c-item"
              href={card.link}
              target={card.link.startsWith('http') ? '_blank' : undefined}
              rel={card.link.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <span className="c-icon">{card.icon}</span>
              <span className="c-name">{card.title}</span>
              <span className="c-val">{card.value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function App() {
  const [toasts, setToasts] = useState([]);
  const [cvOpen, setCvOpen] = useState(false);
  const active = useActiveSection(['top', 'about', 'skills', 'work', 'timeline', 'contact']);

  const profile = {
    name: 'Kevin Aprilio',
    bio: 'I help build modern digital products through clean interfaces, reliable backend systems, and practical AI-powered solutions — from citizen-report platforms to ML models that classify and detect.',
    exp: 1,
    projects: 20
  };

  const showToast = (message) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3200);
  };

  return (
    <>
      <div className="aurora">
        <div className="blob b1"></div>
        <div className="blob b2"></div>
        <div className="blob b3"></div>
      </div>
      <div className="grain"></div>

      <Header active={active} />

      <main>
        <div className="wrap">
          <Hero profile={profile} openCv={() => setCvOpen(true)} />
          <About />
          <Skills />
          <Projects showToast={showToast} />
          <Timeline />
          <Contact />
          <footer>© 2026 Kevin Aprilio. Built with React &amp; Vite.</footer>
        </div>
      </main>

      <ToastStack toasts={toasts} />
      {cvOpen && <CvModal close={() => setCvOpen(false)} />}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
