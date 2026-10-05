/**
 * RADFLOW — HERO & NAVIGATION INTERACTIONS
 * Medical precision + premium SaaS + editorial minimalism
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initProcessShowcase();
  initScrollAnimations();
  initWordCarousel();
  initVoiceWaveform();
});

/* ==========================================================================
   01. NAVIGATION SCROLL BEHAVIOR
   ========================================================================== */
function initNavigation() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  const handleScroll = () => {
    if (window.scrollY > 24) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   02. THE RADFLOW PROCESS SHOWCASE
   ========================================================================== */
function initProcessShowcase() {
  const steps = document.querySelectorAll('.process-step');
  const images = document.querySelectorAll('.process-img-wrapper');
  
  if (!steps.length || !images.length) return;

  // We want to trigger when the step enters the middle third of the screen
  const observerOptions = {
    root: null,
    rootMargin: '-35% 0px -45% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.getAttribute('data-step'), 10);
        
        // Update text column
        steps.forEach((step, i) => {
          step.classList.toggle('active', i === index);
        });

        // Update images and track
        const track = document.getElementById('processImgTrack');
        if (track) {
          track.style.transform = `translateY(-${index * 33.33333}%)`;
        }

        images.forEach((img, i) => {
          img.classList.toggle('active', i === index);
        });
      }
    });
  }, observerOptions);

  steps.forEach(step => observer.observe(step));
}

/* ==========================================================================
   03. CLINICAL MODALITIES FILTER
   ========================================================================== */
window.filterModality = function(modality) {
  // Update Pills
  document.querySelectorAll('.modality-pill').forEach(pill => {
    pill.classList.remove('active');
  });
  const activePill = document.getElementById(`pill-${modality}`);
  if(activePill) activePill.classList.add('active');

  // Update Showcases
  const ctmri = document.getElementById('showcase-ctmri');
  const xrayus = document.getElementById('showcase-xray-us');

  if (modality === 'all') {
    ctmri.style.display = 'block';
    xrayus.style.display = 'grid';
  } else if (modality === 'ctmri') {
    ctmri.style.display = 'block';
    xrayus.style.display = 'none';
  } else if (modality === 'xray' || modality === 'us') {
    // Since X-ray and US are combined in the dual grid in this layout:
    ctmri.style.display = 'none';
    xrayus.style.display = 'grid';
  }
};

/* ==========================================================================
   04. SCROLL ANIMATIONS (FADE IN ON SCROLL)
   ========================================================================== */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -15% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // only animate once
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll('.scroll-animate');
  elements.forEach(el => observer.observe(el));
}


/* ==========================================================================
   05. DYNAMIC HERO WORD CAROUSEL
   ========================================================================== */
function initWordCarousel() {
  const target = document.getElementById('dynamic-hero-word');
  if (!target) return;

  const words = ['finished report.', 'structured data.', 'clinical insight.', 'actionable findings.'];
  let idx = 0;

  // Initialize first word with letter animation
  const initialWord = words[idx];
  target.innerHTML = '';
  initialWord.split('').forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char;
    if(char === ' ') span.innerHTML = '&nbsp;';
    span.className = 'letter-anim';
    span.style.animationDelay = (i * 0.04) + 's';
    target.appendChild(span);
  });

  setInterval(() => {
    // Animate out
    target.classList.remove('word-rotate-in');
    target.classList.add('word-rotate-out');

    setTimeout(() => {
      // Change text
      idx = (idx + 1) % words.length;
      target.innerHTML = '';
      
      const word = words[idx];
      target.classList.remove('word-rotate-out');
      target.classList.remove('word-rotate-in');
      target.style.opacity = '1';
      target.style.transform = 'none';
      
      // Animate letters in sequence
      word.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        if(char === ' ') span.innerHTML = '&nbsp;';
        span.className = 'letter-anim';
        span.style.animationDelay = (i * 0.04) + 's';
        target.appendChild(span);
      });

    }, 500); // Wait for slideDownOut animation to finish (0.5s)
  }, 3500); // Change every 3.5 seconds
}

/* ==========================================================================
   06. PREMIUM VOICE WAVEFORM GENERATOR
   ========================================================================== */
function initVoiceWaveform() {
  const container = document.getElementById('voice-waveform-container');
  if (!container) return;

  // Determine optimal number of bars based on screen width
  const windowWidth = window.innerWidth;
  let barCount = 100; // default for desktop
  if (windowWidth < 768) {
    barCount = 45; // mobile
  } else if (windowWidth < 1024) {
    barCount = 70; // tablet
  }

  // Clear any existing bars (useful if resizing)
  container.innerHTML = '';

  for (let i = 0; i < barCount; i++) {
    const bar = document.createElement('div');
    bar.className = 'waveform-bar';

    // Organic height generation using sine waves + math random
    // This creates natural looking clusters of speech amplitude
    const sineFactor = Math.abs(Math.sin(i * 0.2)) * 50; 
    const randomFactor = Math.random() * 40;
    // Base height to ensure it never disappears completely
    let heightPercent = 10 + sineFactor + randomFactor; 

    // Cap at 100%
    if (heightPercent > 100) heightPercent = 100;

    // Apply height
    bar.style.height = `${heightPercent}%`;

    // Vary opacity slightly for depth (between 0.4 and 0.9)
    const opacity = 0.4 + (Math.random() * 0.5);
    bar.style.opacity = opacity;

    // Stagger animation timing organically
    // Using a mix of sine and random prevents it from looking like a uniform wave
    const animDelay = (Math.sin(i * 0.5) + Math.random()) * 1.5;
    bar.style.animationDelay = `${animDelay}s`;
    
    // Vary animation duration slightly so they desync organically
    const animDuration = 1.8 + (Math.random() * 1.2);
    bar.style.animationDuration = `${animDuration}s`;

    // Occasionally add the accent coral color to tie into the 'finished report' text
    // Only ~5% chance, and only if it's a relatively tall bar
    if (Math.random() > 0.95 && heightPercent > 40) {
      bar.classList.add('accent');
    }

    container.appendChild(bar);
  }
}

// Re-initialize on resize to ensure correct bar density
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    initVoiceWaveform();
  }, 250);
});
