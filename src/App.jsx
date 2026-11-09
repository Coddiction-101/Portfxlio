import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import {
  siCplusplus,
  siCss,
  siFigma,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siPython,
  siReact,
  siTailwindcss
} from 'simple-icons';
import featuredProjectImage from '../assets/img-main.jpg';
import projectDetailImage from '../assets/project 2.jpg';
import profileImage from '../assets/pfp.jpg';
import resumeFile from '../assets/gResume.pdf';
import '../style.css';

const projects = [
  {
    name: 'Cortex',
    alt: 'Cortex — Task Management App',
    description: 'A minimal, focus-first task management application built entirely with vanilla technologies. No frameworks. No dependencies. Just clean, highly optimized frontend architecture.',
    shortDescription: 'A focused task manager for clearer daily work.',
    keyPoints: ['Prioritize work without visual noise', 'Local-first data and fast interactions', 'Built for keyboard-focused daily use'],
    demo: 'https://cortex-ashen-two.vercel.app/',
    repo: 'https://github.com/Coddiction-101/Cortex',
    group: 'web',
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    useCase: 'Planning work without adding another layer of noise. Cortex keeps tasks and priorities in one focused space.',
    imageTone: 'cortex'
  },
  {
    name: 'FocusForge',
    alt: 'FocusForge — Minimal Deep-Work Timer',
    description: 'A minimal deep-work timer for choosing a task, setting a focus duration, and tracking completed sessions. Timer state and session history stay in local storage, with optional breaks and completion alerts.',
    shortDescription: 'A quiet timer for focused work and session progress.',
    keyPoints: ['Adjustable focus timer with named tasks', 'Optional focus-to-break cycles and completion alerts', 'Editable seven-day history with daily and weekly summaries'],
    demo: 'https://coddiction-101.github.io/SideQuest/FocusForge/',
    repo: 'https://github.com/Coddiction-101/SideQuest/tree/Main/FocusForge',
    group: 'web',
    stack: ['React', 'JavaScript', 'CSS'],
    useCase: 'Set a task and focus duration, then review recent sessions and daily or weekly totals without creating an account.',
    imageTone: 'focusforge'
  },
  {
    name: 'Task Manager & Scheduler',
    alt: 'Task Manager & Scheduler — C++ CLI App',
    description: 'A fully functional command-line task management system built in C++ for organizing daily tasks with priorities, deadlines, and persistent storage. Features a color-coded terminal UI using ANSI escape codes.',
    shortDescription: 'A terminal scheduler built in C++.',
    keyPoints: ['Priority and deadline management', 'Persistent task storage', 'Color-coded terminal interface'],
    repo: 'https://github.com/Coddiction-101/cpp_projects/tree/main/TaskManager%26Schedular',
    group: 'other',
    stack: ['C++', 'CLI'],
    useCase: 'Organizing daily tasks in a terminal, with priorities, deadlines, and saved data between sessions.',
    imageTone: 'scheduler'
  },
  {
    name: 'Banking System - ATM Simulator',
    alt: 'Banking System — ATM Simulator C++ App',
    description: 'A console-based banking application built in C++ that simulates real-world ATM operations with account management, secure transactions, and persistent data storage.',
    shortDescription: 'A console simulation of core ATM workflows.',
    keyPoints: ['Account creation and management', 'Secure-style transaction flow', 'Persistent balance storage'],
    repo: 'https://github.com/Coddiction-101/cpp_projects/tree/main/BankingSimulation',
    group: 'other',
    stack: ['C++', 'CLI'],
    useCase: 'Practicing account flows and transaction handling through a small ATM-style console simulation.',
    imageTone: 'banking'
  },
  {
    name: 'Flowboard - Task Manager',
    alt: 'Flowboard — Drag-and-Drop Task Manager',
    description: 'Flowboard is a lightweight task management app that lets you create, prioritize, edit, and move tasks across three stages — To-Dos, Active, and Complete — using a clean drag-and-drop interface.',
    shortDescription: 'A visual board for moving work forward.',
    keyPoints: ['Drag-and-drop task movement', 'Clear To-Do, Active, and Complete stages', 'Lightweight edits without page reloads'],
    demo: 'https://flowboardv2.netlify.app/',
    repo: 'https://github.com/Coddiction-101/Floww',
    group: 'web',
    stack: ['HTML', 'CSS', 'JavaScript'],
    useCase: 'Moving tasks through a simple visual workflow, from things to do to work in progress and completed.',
    imageTone: 'flowboard'
  },
  {
    name: 'GitVerse',
    alt: 'GitVerse — Interactive 3D GitHub Visualizer',
    description: 'An interactive 3D GitHub visualizer that transforms any GitHub profile into a procedurally generated universe. Explore repositories and commits as planets, stars, galaxies, and other space elements in a cinematic environment.',
    shortDescription: 'GitHub profiles turned into an explorable universe.',
    keyPoints: ['Live GitHub profile data', 'Repositories mapped as a visual system', 'Interactive 3D-style exploration'],
    demo: 'https://gv-v1.vercel.app/',
    repo: 'https://github.com/Coddiction-101/Gv-v1',
    group: 'web',
    stack: ['HTML5', 'CSS3', 'Vanilla JavaScript', 'GitHub REST API'],
    useCase: 'Turning a GitHub profile into a space to explore repositories and activity in a more visual way.',
    imageTone: 'gitverse'
  }
];

const technologies = [
  { name: 'JavaScript', icon: siJavascript },
  { name: 'HTML5', icon: siHtml5 },
  { name: 'CSS3', icon: siCss },
  { name: 'React.js', icon: siReact },
  { name: 'Tailwind CSS', icon: siTailwindcss },
  { name: 'Figma', icon: siFigma },
  { name: 'C++', icon: siCplusplus },
  { name: 'Java', mark: 'J', markColor: '#e76f00' },
  { name: 'Python', icon: siPython },
  { name: 'SQL', mark: 'SQL', markColor: '#4479a1' },
  { name: 'Git', icon: siGit },
  { name: 'GitHub', icon: siGithub },
  { name: 'VS Code', mark: '</>', markColor: '#007acc' },
  { name: 'CLI', mark: '>_', markColor: '#6b8e6b' }
];

const technologyCategories = [
  {
    number: '01',
    name: 'Frontend',
    description: 'Interfaces and interactions',
    items: ['JavaScript', 'HTML5', 'CSS3', 'React.js', 'Tailwind CSS']
  },
  {
    number: '02',
    name: 'Database',
    description: 'Data and application logic',
    items: ['SQL']
  },
  {
    number: '03',
    name: 'Languages',
    description: 'Programming languages',
    items: ['Python', 'C++', 'Java']
  },
  {
    number: '04',
    name: 'Design',
    description: 'Creative design tools',
    items: ['Figma']
  },
  {
    number: '05',
    name: 'Tools',
    description: 'Version control and workflows',
    items: ['Git', 'GitHub', 'VS Code', 'CLI']
  }
];

function Header({ theme, onToggleTheme, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const menuToggleRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const closeOnOutsideClick = (event) => {
      const clickedMenu = menuRef.current?.contains(event.target);
      const clickedToggle = menuToggleRef.current?.contains(event.target);
      if (!clickedMenu && !clickedToggle) closeMenu();
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') closeMenu();
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <header>
      <nav aria-label="Main navigation">
        <a className="logo" href="/" onClick={(event) => { event.preventDefault(); closeMenu(); onNavigate('/'); }}>
          <i className="ri-xrp-line" aria-hidden="true"></i> Coddiction
        </a>
        <div className="nav-right">
          <ul id="nav-links" ref={menuRef} className={menuOpen ? 'active' : ''}>
            <li><a href="/" onClick={(event) => { event.preventDefault(); closeMenu(); onNavigate('/'); }}>Home</a></li>
            <li><a href="/#about" onClick={(event) => { event.preventDefault(); closeMenu(); onNavigate('/#about'); }}>About</a></li>
            <li><a href="/#skills" onClick={(event) => { event.preventDefault(); closeMenu(); onNavigate('/#skills'); }}>Skills</a></li>
            <li><a href="/#experience" onClick={(event) => { event.preventDefault(); closeMenu(); onNavigate('/#experience'); }}>Experience</a></li>
            <li><a href="/projects" onClick={(event) => { event.preventDefault(); closeMenu(); onNavigate('/projects'); }}>Projects</a></li>
            <li><a href="/#contact" onClick={(event) => { event.preventDefault(); closeMenu(); onNavigate('/#contact'); }}>Contact</a></li>
          </ul>
          <div className="nav-actions">
            <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
              <i className={theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line'} aria-hidden="true"></i>
            </button>
            <button ref={menuToggleRef} className="hamburger" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="nav-links" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}>
              <i className={menuOpen ? 'ri-close-line' : 'ri-menu-5-fill'} aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  const roles = ['Frontend Developer', 'Designer', 'Photographer'];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="home" className="hero reveal">
      <div className="hero-inner">
        <p className="hero-eyebrow">
          <span className="hero-role-window" aria-live="polite">
            <span key={roleIndex} className="hero-role">{roles[roleIndex]}</span>
          </span>
        </p>
        <h1>Hey, <span>I'm Gulshan.</span></h1>
        <p className="hero-bio">
          I’m a frontend developer who loves turning ideas into clean, thoughtful digital experiences.
          I enjoy building modern interfaces with HTML, CSS, and JavaScript, while constantly exploring
          better ways to make the web feel simple and alive. Beyond code, I’m deeply interested in
          photography and creative work—capturing moments, playing with light, and finding fresh
          perspectives that inspire how I design and build.
        </p>
        <div className="hero-btns">
          <a href={resumeFile} target="_blank" rel="noopener noreferrer" className="resume-link" aria-label="Open resume in a new tab">
            <i className="ri-file-user-line" aria-hidden="true"></i><span className="button-label">Resume</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="about reveal" aria-labelledby="about-title">
      <figure className="about-portrait">
        <img src={profileImage} alt="Portrait of Gulshan" loading="lazy" />
      </figure>
      <div className="about-story">
        <p className="about-eyebrow">A little about me</p>
        <h2 id="about-title">I like experimenting and building for the web.</h2>
        <div className="about-content">
          <p className="about-copy">
            I’m Gulshan. I like taking an idea, trying a few different ways to make it work, and seeing what comes
            out of it. I mostly build with HTML, CSS, and JavaScript, and I learn something new with every project.
          </p>
          <p className="about-copy">
            Most of what I know comes from experimenting on my own projects, getting stuck, and finding a way through.
            I care about making the final thing easy to use, even if getting there takes a few tries.
          </p>
        </div>
        <a className="about-project-link" href="#projects">
          A few things I’ve made <i className="ri-arrow-right-line" aria-hidden="true"></i>
        </a>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="skills reveal" aria-labelledby="skills-title">
      <div className="section-heading">
        <h2 className="skills-title" id="skills-title">Tech Stack</h2>
        <p className="tech-stack">The tools behind my projects.</p>
      </div>
      <div className="tech-category-list">
        {technologyCategories.map((category) => (
          <article className="tech-category" key={category.name}>
            <div className="tech-category-index" aria-hidden="true">{category.number}</div>
            <div className="tech-category-heading">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>
            <ul className="tech-category-items" aria-label={`${category.name} technologies`}>
              {category.items.map((item) => (
                <li key={item}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="experience-section reveal" aria-labelledby="experience-title">
      <div className="experience-heading">
        <p className="experience-kicker">A bit of real-world work</p>
        <h2 id="experience-title">Experience</h2>
      </div>
      <article className="experience-entry">
        <div className="experience-role-row">
          <h3>Full-Stack Web Developer Intern</h3>
          <span>Jul — Oct 2026</span>
        </div>
        <p className="experience-company">Edwin Incorporation <span>·</span> Jabalpur, Madhya Pradesh</p>
        <ul>
          <li>Worked across frontend and backend on client projects, including one that reached the #1 SEO and performance ranking.</li>
          <li>Built email agents to automate repetitive email-related tasks.</li>
        </ul>
      </article>
    </section>
  );
}

function CrystalField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return undefined;

    let width = 0;
    let height = 0;
    let frameId = 0;
    let lastPointer = null;
    const pointer = { x: -1000, y: -1000, active: false };
    const ripples = [];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let crystals = [];
    let dust = [];

    const layoutCrystals = () => {
      let seed = 20261030;
      const random = () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      };
      const horizontalInset = Math.min(72, width * 0.23);
      const topInset = 42;
      const bottomInset = 68;
      const minimumGap = width < 380 ? 68 : width < 600 ? 82 : 106;
      const positions = [];

      crystals = technologies.map((technology, index) => {
        let candidate = null;
        let candidateGap = -1;
        for (let attempt = 0; attempt < 260; attempt += 1) {
          const point = {
            x: horizontalInset + random() * Math.max(1, width - horizontalInset * 2),
            y: topInset + random() * Math.max(1, height - topInset - bottomInset)
          };
          const gap = positions.length
            ? Math.min(...positions.map((placed) => Math.hypot(point.x - placed.x, point.y - placed.y)))
            : Infinity;
          if (gap > candidateGap) {
            candidate = point;
            candidateGap = gap;
          }
          if (gap >= minimumGap) break;
        }
        positions.push(candidate);
        const homeX = candidate.x;
        const homeY = candidate.y;
        const old = crystals[index];
        return {
          ...technology,
          homeX,
          homeY,
          x: old ? Math.min(width, old.x) : homeX,
          y: old ? Math.min(height, old.y) : homeY,
          vx: old?.vx || 0,
          vy: old?.vy || 0,
          size: Math.max(19, Math.min(30, width / 34)) + (index % 3) * 3,
          rotation: old?.rotation || (index % 4) * 0.32,
          shape: index % 3,
          phase: index * 1.7,
          spin: index % 2 === 0 ? 0.0011 : -0.0009
        };
      });
      dust = Array.from({ length: Math.max(28, Math.floor(width / 12)) }, (_, index) => {
        const phase = index * 2.399;
        const homeX = ((index * 67.7) % width + width) % width;
        const homeY = ((index * 113.3) % height + height) % height;
        return { homeX, homeY, x: homeX, y: homeY, vx: 0, vy: 0, size: 1 + (index % 3) * 0.45, phase, index };
      });
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      layoutCrystals();
      draw(0);
    };

    const drawCrystal = (crystal, time, dark) => {
      const driftX = Math.sin(time * 0.00072 + crystal.phase) * 13;
      const driftY = Math.cos(time * 0.00058 + crystal.phase) * 17;
      const size = crystal.size;
      const centerX = crystal.x + driftX;
      const centerY = crystal.y + driftY;
      context.save();
      context.translate(centerX, centerY);
      context.rotate(crystal.rotation);
      context.beginPath();
      if (crystal.shape === 0) {
        context.moveTo(0, -size);
        context.lineTo(size * 0.82, 0);
        context.lineTo(0, size);
        context.lineTo(-size * 0.82, 0);
        context.closePath();
      } else if (crystal.shape === 1) {
        context.moveTo(0, -size);
        context.lineTo(size * 0.9, size * 0.72);
        context.lineTo(-size * 0.9, size * 0.72);
        context.closePath();
      } else {
        context.arc(0, 0, size * 0.78, 0, Math.PI * 2);
      }
      const fill = context.createLinearGradient(-size, -size, size, size);
      fill.addColorStop(0, dark ? 'rgba(210, 225, 255, 0.32)' : 'rgba(95, 125, 170, 0.2)');
      fill.addColorStop(0.5, dark ? 'rgba(110, 140, 190, 0.12)' : 'rgba(150, 175, 210, 0.08)');
      fill.addColorStop(1, dark ? 'rgba(210, 225, 255, 0.04)' : 'rgba(95, 125, 170, 0.02)');
      context.fillStyle = fill;
      context.fill();
      context.strokeStyle = dark ? 'rgba(215, 228, 250, 0.58)' : 'rgba(85, 105, 140, 0.5)';
      context.lineWidth = 1;
      context.stroke();
      context.beginPath();
      if (crystal.shape === 0) {
        context.moveTo(0, -size);
        context.lineTo(0, size);
        context.moveTo(-size * 0.82, 0);
        context.lineTo(0, size * 0.16);
        context.lineTo(size * 0.82, 0);
      } else if (crystal.shape === 1) {
        context.moveTo(0, -size);
        context.lineTo(0, size * 0.72);
        context.moveTo(0, size * 0.12);
        context.lineTo(size * 0.9, size * 0.72);
        context.moveTo(0, size * 0.12);
        context.lineTo(-size * 0.9, size * 0.72);
      } else {
        context.moveTo(-size * 0.78, 0);
        context.lineTo(size * 0.78, 0);
        context.moveTo(0, -size * 0.78);
        context.lineTo(0, size * 0.78);
      }
      context.strokeStyle = dark ? 'rgba(215, 228, 250, 0.26)' : 'rgba(85, 105, 140, 0.24)';
      context.stroke();
      context.restore();

      if (crystal.icon && typeof Path2D !== 'undefined') {
        const logo = new Path2D(crystal.icon.path);
        context.save();
        context.translate(centerX - 10, centerY - 10);
        context.scale(20 / 24, 20 / 24);
        context.fillStyle = dark && crystal.icon.hex === '000000' ? '#f2f2f2' : `#${crystal.icon.hex}`;
        context.fill(logo);
        context.restore();
      } else {
        context.font = crystal.mark.length > 2 ? 'bold 9px "Fira Code", monospace' : 'bold 13px "Fira Code", monospace';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = crystal.markColor;
        context.fillText(crystal.mark, centerX, centerY, size * 1.5);
      }

      context.font = '11px "Fira Code", monospace';
      context.textAlign = 'center';
      context.fillStyle = dark ? 'rgba(220, 225, 235, 0.78)' : 'rgba(65, 72, 84, 0.78)';
      context.fillText(crystal.name, centerX, centerY + size + 17, 120);
    };

    function draw(time) {
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);
      const dark = document.documentElement.getAttribute('data-theme') === 'dark';

      for (let index = ripples.length - 1; index >= 0; index -= 1) {
        const ripple = ripples[index];
        ripple.radius += 2.4;
        ripple.opacity -= 0.012;
        if (ripple.opacity <= 0) {
          ripples.splice(index, 1);
          continue;
        }
        context.beginPath();
        context.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        context.strokeStyle = dark
          ? `rgba(185, 205, 240, ${ripple.opacity})`
          : `rgba(85, 110, 150, ${ripple.opacity})`;
        context.lineWidth = 1;
        context.stroke();
      }

      for (const particle of [...crystals, ...dust]) {
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (pointer.active && distance < 112 && distance > 0) {
          const force = ((112 - distance) / 112) * (particle.name ? 0.52 : 0.28);
          particle.vx += (dx / distance) * force;
          particle.vy += (dy / distance) * force;
        }
        particle.vx += (particle.homeX - particle.x) * (particle.name ? 0.0014 : 0.0012);
        particle.vy += (particle.homeY - particle.y) * (particle.name ? 0.0014 : 0.0012);
        particle.vx *= 0.95;
        particle.vy *= 0.95;
        particle.x += particle.vx;
        particle.y += particle.vy;
      }

      for (const particle of dust) {
        const twinkle = 0.28 + (Math.sin(time * 0.001 + particle.phase) + 1) * 0.2;
        const driftX = Math.sin(time * 0.0006 + particle.phase) * 6;
        const driftY = Math.cos(time * 0.0008 + particle.phase) * 8;
        context.save();
        context.translate(particle.x + driftX, particle.y + driftY);
        context.rotate(time * 0.00025 + particle.phase);
        context.fillStyle = dark ? `rgba(205, 220, 245, ${twinkle})` : `rgba(93, 116, 153, ${twinkle})`;
        context.fillRect(-particle.size, -particle.size, particle.size * 2, particle.size * 2);
        context.restore();
      }

      for (const crystal of crystals) {
        crystal.rotation += crystal.spin;
        drawCrystal(crystal, time, dark);
      }

      if (!reducedMotion) frameId = window.requestAnimationFrame(draw);
    }

    const onPointerMove = (event) => {
      if (event.pointerType === 'touch') return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (lastPointer && Math.hypot(x - lastPointer.x, y - lastPointer.y) > 24) {
        ripples.push({ x, y, radius: 2, opacity: 0.24 });
        if (ripples.length > 8) ripples.shift();
      }
      lastPointer = { x, y };
      pointer.x = x;
      pointer.y = y;
      pointer.active = true;
      if (reducedMotion) draw(0);
    };
    const onPointerLeave = () => {
      pointer.active = false;
      lastPointer = null;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerleave', onPointerLeave);
    resize();

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <div className="crystal-field">
      <canvas ref={canvasRef} className="crystal-canvas" aria-hidden="true"></canvas>
      <ul className="visually-hidden" aria-label="Technologies in this section">
        {technologies.map(({ name }) => <li key={name}>{name}</li>)}
      </ul>
    </div>
  );
}

function ProjectCard({ project, onOpen, cardRef, isActive, isDimmed }) {
  return (
    <article
      className={`project-orbit-card project-art-${project.imageTone}${isActive ? ' is-active' : ''}${isDimmed ? ' is-dimmed' : ''}`}
      ref={cardRef}
    >
      <div className="project-orbit-inner">
        <img src={featuredProjectImage} alt="" loading="lazy" draggable="false" />
        <span className="project-orbit-title">{project.name}</span>
        <div className="project-orbit-details">
          <strong>{project.name}</strong>
          <p>{project.description}</p>
          <ul className="project-orbit-stack">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
          <div className="project-orbit-actions">
            {project.demo ? <a href={project.demo} target="_blank" rel="noopener noreferrer">Live project <i className="ri-arrow-up-right-line" aria-hidden="true"></i></a> : <a href={project.repo} target="_blank" rel="noopener noreferrer">Source <i className="ri-github-line" aria-hidden="true"></i></a>}
            <button type="button" onClick={() => onOpen(project)}>Details <i className="ri-arrow-right-line" aria-hidden="true" /></button>
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectFilters({ filter, onFilter }) {
  return (
    <div className="projects-filters" aria-label="Filter projects">
      <div className="project-filter-group" aria-label="Project type">
        {[['all', 'All'], ['web', 'Web'], ['other', 'Others']].map(([value, label]) => (
          <button key={value} type="button" className={filter === value ? 'is-selected' : ''} onClick={() => onFilter(value)}>{label}</button>
        ))}
      </div>
    </div>
  );
}

function Projects({ onOpen }) {
  return (
    <section id="projects" className="projects-feature reveal" aria-labelledby="featured-project-title">
      <div className="featured-project-copy">
        <h2 id="featured-project-title" aria-label="Get the Epic Shit Done.">Get the Epic<br /><span>Sh<span className="featured-star" aria-hidden="true">*</span>t Done.</span></h2>
        <p>Cortex keeps your tasks, priorities, and next steps in one focused place, without making productivity feel like another project.</p>
        <button className="project-text-link" type="button" onClick={() => onOpen(projects[0], true)}>Explore all projects <i className="ri-arrow-right-line" aria-hidden="true"></i></button>
      </div>
      <button className="featured-project-visual project-art-cortex" type="button" onClick={() => onOpen(projects[0])} aria-label={`Open ${projects[0].name} project details`}>
        <img src={featuredProjectImage} alt="" loading="lazy" />
        <span className="featured-project-name">
          <strong>{projects[0].name}</strong>
          <span>A focused task manager</span>
        </span>
      </button>
    </section>
  );
}

function ProjectsPage({ route, onNavigate, onOpen }) {
  const [filter, setFilter] = useState('all');
  const selected = projects.find((project) => slugify(project.name) === route.slug);
  const visibleProjects = projects.filter((project) => filter === 'all' || project.group === filter);
  const projectIndex = selected ? projects.indexOf(selected) : -1;
  const stepProject = (direction) => onOpen(projects[(projectIndex + direction + projects.length) % projects.length]);

  return (
    <main className="projects-page">
      <div className="projects-page-head">
        <div className="projects-wordmark"><h1>PROJECTS</h1></div>
        <div className="projects-head-tools">
          <p>A few things I made because I wanted to see if the idea worked.</p>
          {!selected && <ProjectFilters filter={filter} onFilter={setFilter} />}
          {selected && <button className="project-back-link" type="button" onClick={() => onNavigate('/projects')}><i className="ri-arrow-left-line" aria-hidden="true"></i> All projects</button>}
        </div>
      </div>

      {selected ? (
        <article className="project-detail" key={selected.name}>
          <div className={`project-detail-art project-art-${selected.imageTone}`}>
            <img src={projectDetailImage} alt={`${selected.name} project preview`} />
          </div>
          <div className="project-detail-copy">
            <p className="project-kicker">{selected.group === 'other' ? 'Terminal experiment' : 'Web project'} · {selected.stack.join(' / ')}</p>
            <h2>{selected.name}</h2>
            <p className="project-detail-description">{selected.description}</p>
            <div className="project-detail-section"><h3>What it’s for</h3><p>{selected.useCase}</p></div>
            <div className="project-detail-section"><h3>Stack</h3><ul className="project-tech-list">{selected.stack.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div className="project-detail-links">
              {selected.demo && <a className="project-action" href={selected.demo} target="_blank" rel="noopener noreferrer"><span>Live demo</span><i className="ri-arrow-up-right-line" aria-hidden="true"></i></a>}
              <a className="project-action" href={selected.repo} target="_blank" rel="noopener noreferrer"><span>GitHub</span><i className="ri-github-line" aria-hidden="true"></i></a>
            </div>
            <div className="project-pagination"><button type="button" onClick={() => stepProject(-1)}><i className="ri-arrow-left-line" aria-hidden="true"></i> Previous</button><button type="button" onClick={() => stepProject(1)}>Next <i className="ri-arrow-right-line" aria-hidden="true"></i></button></div>
          </div>
        </article>
      ) : (
        <div className="project-list" aria-label="Project list">
          {visibleProjects.map((project, index) => (
            <article className="project-row" key={project.name}>
              <div className="project-row-index">{String(index + 1).padStart(2, '0')}</div>
              <div className="project-row-intro">
                <button className="project-row-name" type="button" onClick={() => onOpen(project)}>
                  {project.name}
                </button>
                <p>{project.shortDescription}</p>
                <div className="project-row-links">
                  {project.demo && <a className="project-action" href={project.demo} target="_blank" rel="noopener noreferrer"><span>Live demo</span><i className="ri-arrow-up-right-line" aria-hidden="true"></i></a>}
                  <a className="project-action" href={project.repo} target="_blank" rel="noopener noreferrer"><span>GitHub</span><i className="ri-github-line" aria-hidden="true"></i></a>
                </div>
              </div>
              <div className="project-row-details">
                <ol className="project-point-list">
                  {project.keyPoints.map((point) => (
                    <li key={point}><span aria-hidden="true"></span><p>{point}</p></li>
                  ))}
                </ol>
                <ul className="project-row-tech" aria-label={`${project.name} technologies`}>
                  {project.stack.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </article>
          ))}
          {!visibleProjects.length && <p className="project-empty">No projects in this stack yet.</p>}
        </div>
      )}
    </main>
  );
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function Contact() {
  return (
    <section id="contact" className="contact-section reveal" aria-labelledby="contact-title">
      <div className="contact-compact">
        <div className="contact-copy">
          <p className="contact-kicker">CONTACT</p>
          <h2 id="contact-title">Got a thing to figure <span>out?</span></h2>
          <p className="contact-description">Send me the rough idea. We can take it from there.</p>
        </div>
        <a className="contact-email" href="mailto:gulshansays333@gmail.com" aria-label="Email Gulshan at gulshansays333@gmail.com">
          <strong>gulshansays333@gmail.com</strong>
          <i className="ri-arrow-up-right-line" aria-hidden="true"></i>
        </a>
      </div>
      <div className="contact-socials" aria-label="Social profiles">
        <span className="contact-social-label">FIND ME HERE</span>
        <a href="https://github.com/Coddiction-101" target="_blank" rel="noopener noreferrer"><i className="ri-github-fill" aria-hidden="true"></i><span>GitHub</span></a>
        <a href="https://www.linkedin.com/in/gulshxn/" target="_blank" rel="noopener noreferrer"><i className="ri-linkedin-box-fill" aria-hidden="true"></i><span>LinkedIn</span></a>
        <a href="https://leetcode.com/u/Gulshxn/" target="_blank" rel="noopener noreferrer"><i className="ri-code-box-fill" aria-hidden="true"></i><span>LeetCode</span></a>
      </div>
    </section>
  );
}

function useRevealAnimations() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('active'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function AnimatedCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const media = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    if (!cursor || !media.matches) return undefined;

    const moveX = gsap.quickTo(cursor, 'x', { duration: 0.16, ease: 'power3.out' });
    const moveY = gsap.quickTo(cursor, 'y', { duration: 0.16, ease: 'power3.out' });
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const onPointerMove = (event) => {
      moveX(event.clientX);
      moveY(event.clientY);
      gsap.to(cursor, { autoAlpha: 1, duration: 0.12, overwrite: true });
      const isInteractive = event.target instanceof Element && Boolean(event.target.closest('a, button, [role="button"]'));
      gsap.to(cursor, { scale: isInteractive ? 1.5 : 1, duration: 0.18, ease: 'power2.out', overwrite: true });
    };
    const onPointerLeave = () => gsap.to(cursor, { autoAlpha: 0, duration: 0.12, overwrite: true });

    cursor.classList.add('is-enabled');
    window.addEventListener('pointermove', onPointerMove);
    document.documentElement.addEventListener('pointerleave', onPointerLeave);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      cursor.classList.remove('is-enabled');
      gsap.killTweensOf(cursor);
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
}

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'light';
    } catch {
      return 'light';
    }
  });
  const [route, setRoute] = useState(() => readRoute());

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setRoute(readRoute());
    if (path.includes('#')) {
      const section = path.split('#')[1];
      window.setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' }), 40);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openProject = (project, gallery = false) => {
    navigate(gallery ? '/projects' : `/projects/${slugify(project.name)}`);
  };

  useEffect(() => {
    const onPopState = () => setRoute(readRoute());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // The theme still works for this visit when storage is unavailable.
    }
  }, [theme]);

  useEffect(() => {
    const updateProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
      const bar = document.getElementById('progressBar');
      if (bar) bar.style.height = `${progress}%`;
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  useRevealAnimations();

  return (
    <>
      <div className="scroll-progress-wrapper" aria-hidden="true"><div className="scroll-progress-bar" id="progressBar"></div></div>
      <Header theme={theme} onToggleTheme={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')} onNavigate={navigate} />
      {route.type === 'home' ? (
        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects onOpen={openProject} />
          <Contact />
        </main>
      ) : (
        <ProjectsPage route={route} onNavigate={navigate} onOpen={openProject} />
      )}
      <AnimatedCursor />
    </>
  );
}

function readRoute() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  if (path === '/projects') return { type: 'projects' };
  if (path.startsWith('/projects/')) return { type: 'projects', slug: path.slice('/projects/'.length) };
  return { type: 'home' };
}

export default App;
