// ╔══════════════════════════════════════════════════════════╗
// ║  CHANGE YOUR WHATSAPP LINK BELOW                        ║
// ╚══════════════════════════════════════════════════════════╝
const WHATSAPP_LINK = "https://admin.flipchat.link/pro/trade";

// Auto-apply to every WhatsApp link on the page
(function applyWhatsAppLink() {
  document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    const url = new URL(link.href);
    const newUrl = new URL(WHATSAPP_LINK);
    // preserve any ?text= param the link already has
    if (url.searchParams.get('text')) {
      newUrl.searchParams.set('text', url.searchParams.get('text'));
    }
    link.href = newUrl.toString();
  });
})();

// ===== MATRIX RAIN EFFECT =====
(function initMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ₹$€¥£◆◇○●□■△▽▲▼';
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array.from({ length: columns }, () => Math.random() * -100);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(5, 10, 8, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff88';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(drawMatrix, 50);
})();

// ===== PARTICLE EFFECT =====
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  const particleCount = 60;

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 2 + 0.5;
      this.opacity = Math.random() * 0.3 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 136, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 255, 136, ${0.05 * (1 - distance / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
  }
  animate();
})();

// ===== NAVBAR SCROLL EFFECT =====
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
})();

// ===== MOBILE MENU TOGGLE =====
(function initMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const links = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('active');
      toggle.classList.toggle('active');
    });

    // Close menu when a link is clicked
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('active');
        toggle.classList.remove('active');
      });
    });
  }
})();

// ===== SCROLLING TICKER =====
(function initTicker() {
  const container = document.getElementById('tickerContent');
  if (!container) return;

  const tickerData = [
    { symbol: 'GOLD', price: '₹72,450', change: '+1.2%' },
    { symbol: 'SILVER', price: '₹85,600', change: '+0.8%' },
    { symbol: 'CRUDE', price: '$78.45', change: '-0.3%' },
    { symbol: 'NIFTY', price: '19,742', change: '+0.5%' },
    { symbol: 'SENSEX', price: '65,890', change: '+0.4%' },
    { symbol: 'EUR/USD', price: '1.0892', change: '+0.1%' },
    { symbol: 'GBP/USD', price: '1.2654', change: '-0.2%' },
    { symbol: 'USD/INR', price: '83.12', change: '+0.05%' },
    { symbol: 'BTC/USD', price: '$43,250', change: '+2.1%' },
    { symbol: 'COPPER', price: '₹742.50', change: '+0.7%' },
    { symbol: 'NATURAL GAS', price: '$2.85', change: '-1.2%' },
    { symbol: 'BANKNIFTY', price: '44,520', change: '+0.3%' },
  ];

  let html = '';
  // Duplicate for seamless loop
  for (let i = 0; i < 2; i++) {
    tickerData.forEach(item => {
      const isPositive = item.change.startsWith('+');
      html += `
        <div class="ticker-item">
          <span class="ticker-dot"></span>
          <span class="ticker-label">${item.symbol}</span>
          <span>${item.price}</span>
          <span class="ticker-green" style="color: ${isPositive ? '#00ff88' : '#ff4444'}">${item.change}</span>
        </div>
      `;
    });
  }
  container.innerHTML = html;
})();

// ===== MARQUEE BANNER =====
(function initMarquee() {
  const container = document.getElementById('marqueeContent');
  if (!container) return;

  const text = "INDIA'S MOST GOATED DABBA MARKET COMPANY 🐂 NO CAP 🔥 BUILT DIFFERENT 💀 FR FR";
  const separator = '⬥';
  let html = '';

  for (let i = 0; i < 10; i++) {
    html += `<span class="marquee-text">${text} <span class="separator">${separator}</span></span>`;
  }
  container.innerHTML = html;
})();

// ===== SCROLL REVEAL =====
(function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
})();

// ===== COUNTER ANIMATION =====
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000;
        const start = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);

          if (target >= 1000) {
            el.textContent = current.toLocaleString('en-IN') + '+';
          } else {
            el.textContent = current + 'X';
          }

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          }
        }
        requestAnimationFrame(updateCounter);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== MARKET TAG HOVER GLOW =====
document.querySelectorAll('.market-tag').forEach(tag => {
  tag.addEventListener('mouseenter', function() {
    this.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.3), inset 0 0 20px rgba(0, 255, 136, 0.05)';
  });
  tag.addEventListener('mouseleave', function() {
    this.style.boxShadow = 'none';
  });
});

// ===== TYPING EFFECT FOR HERO BADGE =====
(function initTypingEffect() {
  const badge = document.querySelector('.hero-badge');
  if (!badge) return;
  
  // Add a subtle cursor blink effect
  const style = document.createElement('style');
  style.textContent = `
    .hero-badge::after {
      content: '|';
      animation: cursorBlink 1s step-end infinite;
      margin-left: 4px;
      opacity: 0.6;
    }
    @keyframes cursorBlink {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 0; }
    }
  `;
  document.head.appendChild(style);
})();

// ===== FEATURE CARDS TILT EFFECT =====
document.querySelectorAll('.feature-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

console.log('%c🐂 TRADE ANGEL 8 — the most goated trading platform fr fr 💀', 'color: #00ff88; font-size: 16px; font-weight: bold; background: #050a08; padding: 10px 20px; border-radius: 8px;');
console.log('%cslide into our DMs: wa.me/919999999999 🔥', 'color: #25D366; font-size: 12px;');
