// ===== DOODLE PORTFOLIO - JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', () => {
  initDoodleCanvas();
  initScrollReveal();
  initNavbar();
  initSkillTagAnimations();
  initSmoothScroll();
  initProjectCards();
});

// ===== SVG DOODLE CANVAS =====
function initDoodleCanvas() {
  const canvas = document.getElementById('doodle-canvas');
  if (!canvas) return;

  const doodles = [
    // Stars
    { type: 'star', x: '8%', y: '15%', size: 30, delay: 0 },
    { type: 'star', x: '92%', y: '25%', size: 22, delay: 0.5 },
    { type: 'star', x: '15%', y: '55%', size: 18, delay: 1 },
    { type: 'star', x: '88%', y: '70%', size: 26, delay: 1.5 },
    { type: 'star', x: '5%', y: '85%', size: 20, delay: 2 },
    // Spirals
    { type: 'spiral', x: '95%', y: '10%', size: 35, delay: 0.3 },
    { type: 'spiral', x: '3%', y: '40%', size: 28, delay: 0.8 },
    { type: 'spiral', x: '90%', y: '50%', size: 32, delay: 1.3 },
    // Arrows
    { type: 'arrow', x: '12%', y: '30%', size: 40, delay: 0.6 },
    { type: 'arrow', x: '85%', y: '85%', size: 35, delay: 1.6 },
    // Hearts
    { type: 'heart', x: '93%', y: '40%', size: 24, delay: 0.4 },
    { type: 'heart', x: '7%', y: '68%', size: 20, delay: 1.1 },
    // Squiggles
    { type: 'squiggle', x: '10%', y: '92%', size: 50, delay: 0.7 },
    { type: 'squiggle', x: '80%', y: '5%', size: 45, delay: 1.2 },
    // Circles
    { type: 'circle', x: '20%', y: '10%', size: 16, delay: 0.9 },
    { type: 'circle', x: '75%', y: '60%', size: 20, delay: 1.4 },
    // Crosses
    { type: 'cross', x: '50%', y: '5%', size: 18, delay: 0.2 },
    { type: 'cross', x: '97%', y: '55%', size: 14, delay: 1.8 },
  ];

  doodles.forEach(d => {
    const svg = createDoodleSVG(d);
    if (svg) canvas.appendChild(svg);
  });
}

function createDoodleSVG(doodle) {
  const svgNS = 'http://www.w3.org/2000/svg';
  const wrapper = document.createElement('div');
  wrapper.style.cssText = `
    position: absolute; left: ${doodle.x}; top: ${doodle.y};
    transform: translate(-50%, -50%);
    opacity: 0;
    animation: doodle-appear 0.8s ${doodle.delay}s forwards;
  `;

  const svg = document.createElementNS(svgNS, 'svg');
  const s = doodle.size;
  svg.setAttribute('width', s * 2);
  svg.setAttribute('height', s * 2);
  svg.setAttribute('viewBox', `0 0 ${s * 2} ${s * 2}`);
  svg.style.overflow = 'visible';

  const colors = ['#e8567f', '#4a90d9', '#f5c842', '#5cb85c', '#9b59b6', '#e67e22'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  let path;
  switch (doodle.type) {
    case 'star':
      path = document.createElementNS(svgNS, 'path');
      const cx = s, cy = s, spikes = 5, outerR = s * 0.9, innerR = s * 0.4;
      let starD = '';
      for (let i = 0; i < spikes * 2; i++) {
        const r = i % 2 === 0 ? outerR : innerR;
        const angle = (Math.PI * i) / spikes - Math.PI / 2;
        const px = cx + r * Math.cos(angle);
        const py = cy + r * Math.sin(angle);
        starD += (i === 0 ? 'M' : 'L') + px + ',' + py;
      }
      starD += 'Z';
      path.setAttribute('d', starD);
      break;

    case 'spiral':
      path = document.createElementNS(svgNS, 'path');
      let spiralD = `M${s},${s}`;
      for (let i = 0; i < 40; i++) {
        const angle = i * 0.4;
        const r = i * (s * 0.025);
        const px = s + r * Math.cos(angle);
        const py = s + r * Math.sin(angle);
        spiralD += ` L${px.toFixed(1)},${py.toFixed(1)}`;
      }
      path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', spiralD);
      break;

    case 'arrow':
      path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', `M${s*0.2},${s*1.4} Q${s},${s*0.3} ${s*1.8},${s*0.6} L${s*1.5},${s*0.3} M${s*1.8},${s*0.6} L${s*1.5},${s*0.9}`);
      break;

    case 'heart':
      path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', `M${s},${s*1.6} C${s*0.2},${s} ${s*0.2},${s*0.3} ${s},${s*0.7} C${s*1.8},${s*0.3} ${s*1.8},${s} ${s},${s*1.6}Z`);
      break;

    case 'squiggle':
      path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', `M${s*0.1},${s} Q${s*0.4},${s*0.3} ${s*0.7},${s} Q${s},${s*1.7} ${s*1.3},${s} Q${s*1.6},${s*0.3} ${s*1.9},${s}`);
      break;

    case 'circle':
      path = document.createElementNS(svgNS, 'circle');
      path.setAttribute('cx', s);
      path.setAttribute('cy', s);
      path.setAttribute('r', s * 0.7);
      break;

    case 'cross':
      path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', `M${s*0.4},${s*0.4} L${s*1.6},${s*1.6} M${s*1.6},${s*0.4} L${s*0.4},${s*1.6}`);
      break;
  }

  if (path) {
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', '2.5');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');

    if (doodle.type === 'heart') {
      path.setAttribute('fill', color);
      path.setAttribute('fill-opacity', '0.12');
    }

    // Animate drawing
    const totalLength = doodle.type === 'circle' ? 2 * Math.PI * doodle.size * 0.7 : doodle.size * 6;
    path.setAttribute('stroke-dasharray', totalLength);
    path.setAttribute('stroke-dashoffset', totalLength);
    path.style.animation = `dash-draw 1.5s ${doodle.delay + 0.3}s ease forwards`;

    svg.appendChild(path);
  }

  wrapper.appendChild(svg);
  return wrapper;
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Staggered children animation
        const children = entry.target.querySelectorAll('.stagger');
        children.forEach((child, i) => {
          child.style.transitionDelay = `${i * 0.12}s`;
          child.classList.add('visible');
        });
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => observer.observe(el));
}

// ===== NAVBAR =====
function initNavbar() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
  }

  // Close menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  // Navbar shrink on scroll
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      nav.style.padding = '8px 40px';
    } else {
      nav.style.padding = '12px 40px';
    }
  });
}


// ===== SKILL TAG ANIMATIONS =====
function initSkillTagAnimations() {
  const tags = document.querySelectorAll('.skill-tag');
  tags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      tag.style.transform = `translateY(-3px) rotate(${(Math.random() - 0.5) * 6}deg)`;
    });
    tag.addEventListener('mouseleave', () => {
      tag.style.transform = '';
    });
  });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ===== TYPEWRITER EFFECT (for hero) =====
function typeWriter(element, text, speed = 60) {
  let i = 0;
  element.textContent = '';
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Start typewriter on load for hero title type
window.addEventListener('load', () => {
  const typeEl = document.querySelector('.hero-title .typed');
  if (typeEl) {
    const text = typeEl.dataset.text;
    typeWriter(typeEl, text, 70);
  }
});

// ===== PROJECT CARD CLICK =====
function initProjectCards() {
  document.querySelectorAll('.project-card[data-url]').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      window.open(card.dataset.url, '_blank', 'noopener,noreferrer');
    });
  });
}

