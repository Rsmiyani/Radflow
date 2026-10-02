/**
 * RADFLOW — HERO & NAVIGATION INTERACTIONS
 * Medical precision + premium SaaS + editorial minimalism
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initProcessShowcase();
  initScrollAnimations();
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

