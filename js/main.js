/**
 * ====================================
 * MAIN.JS - Core Functionality
 * ====================================
 * 
 * Features:
 * - Live clock in navigation
 * - Mobile menu toggle
 * - Scroll reveal animations
 * - Smooth scroll behavior
 */

// ====================================
// LIVE CLOCK
// ====================================
/**
 * Updates the navigation clock with current time
 * Format: ID HH:MM (Jakarta timezone)
 */
function updateClock() {
  const clockElement = document.getElementById('nav-clock');
  const menuClockElement = document.getElementById('nav-menu-clock');

  const now = new Date();
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Jakarta'
  };

  const timeString = now.toLocaleTimeString('id-ID', options);
  const clockText = `ID ${timeString}`;

  if (clockElement) clockElement.textContent = clockText;
  if (menuClockElement) menuClockElement.textContent = clockText;
}

// Update clock every minute
function initClock() {
  updateClock();
  setInterval(updateClock, 60000);
}

// ====================================
// MOBILE MENU
// ====================================
/**
 * Handles mobile navigation menu toggle
 */
function initMobileMenu() {
  const menuBtn = document.querySelector('.nav__menu-btn');
  const menu = document.getElementById('nav-menu');

  if (!menuBtn || !menu) return;

  // Scramble text animation function
  function scrambleText(element, targetText, duration = 400) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const iterations = 8;
    const intervalTime = duration / iterations;
    let currentIteration = 0;

    const interval = setInterval(() => {
      element.textContent = targetText
        .split('')
        .map((char, index) => {
          if (currentIteration > index * 2) {
            return targetText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      currentIteration++;

      if (currentIteration >= iterations) {
        element.textContent = targetText;
        clearInterval(interval);
      }
    }, intervalTime);
  }

  menuBtn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', isOpen);

    // Scramble text animation
    scrambleText(menuBtn, isOpen ? 'CLOSE' : 'MENU');

    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when clicking a link
  menu.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.textContent = 'MENU';
      document.body.style.overflow = '';
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      menu.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.textContent = 'MENU';
      document.body.style.overflow = '';
      menuBtn.focus();
    }
  });
}

// ====================================
// SCROLL REVEAL
// ====================================
/**
 * Reveals elements as they scroll into view
 * Uses Intersection Observer for performance
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length) return;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Show all elements immediately
    revealElements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

// ====================================
// HERO PARALLAX EFFECT
// ====================================
/**
 * Creates parallax effect on hero section when scrolling
 * - Hero text shrinks and blurs
 * - Selected works slides up to cover hero
 */
function initHeroParallax() {
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero .container');

  if (!hero || !heroContent) return;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Throttle scroll events for performance
  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;

    // Calculate scroll progress (0 to 1)
    const progress = Math.min(scrollY / heroHeight, 1);

    // Apply transformations to hero content
    // Scale: 1 -> 0.8
    const scale = 1 - (progress * 0.2);
    // Blur: 0 -> 10px
    const blur = progress * 10;
    // Opacity: 1 -> 0
    const opacity = 1 - progress;
    // Move back (translateZ or translateY)
    const translateY = progress * 50;

    heroContent.style.transform = `scale(${scale}) translateY(${translateY}px)`;
    heroContent.style.filter = `blur(${blur}px)`;
    heroContent.style.opacity = opacity;

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

// ====================================
// ACTIVE NAV LINK
// ====================================
/**
 * Highlights the current page in navigation
 */
function initActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav__link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ====================================
// PROFESSION TEXT SCRAMBLE
// ====================================
/**
 * Creates a text scramble effect that cycles through professions
 * Characters appear random before resolving to actual text
 */
function initProfessionScramble() {
  const element = document.getElementById('profession-text');
  if (!element) return;

  const professions = [
    'Web Designer',
    'Full-Stack Developer',
    'UI/UX Designer',
    'System Developer'
  ];

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let currentIndex = 0;

  function scrambleText(finalText, callback) {
    const length = finalText.length;
    let iteration = 0;
    const maxIterations = length * 2;

    const interval = setInterval(() => {
      element.textContent = finalText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration / 2) {
            return finalText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      iteration++;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        element.textContent = finalText;
        if (callback) callback();
      }
    }, 30);
  }

  function cycleToNext() {
    currentIndex = (currentIndex + 1) % professions.length;
    scrambleText(professions[currentIndex], () => {
      setTimeout(cycleToNext, 3000); // Wait 3 seconds before next change
    });
  }

  // Start after initial animation completes
  setTimeout(() => {
    cycleToNext();
  }, 4000);
}

// ====================================
// CURSOR IMAGE EFFECT
// ====================================
/**
 * Shows images that follow cursor on hero section
 * Images appear with blur-in effect on mouse movement
 * Fade out when mouse stops, cycle when mouse keeps moving
 */
function initCursorImages() {
  const hero = document.querySelector('.hero');
  const container = document.getElementById('cursor-images');

  if (!hero || !container) return;

  const images = [
    'assets/images/project-1.jpg',
    'assets/images/project-2.jpg',
    'assets/images/project-3.jpg',
    'assets/images/project-4.jpg',
    'assets/images/service-1.jpg',
    'assets/images/service-2.jpg'
  ];

  let currentIndex = 0;
  let activeImage = null;
  let moveTimeout = null;
  let lastMoveTime = 0;
  let lastX = 0;
  let lastY = 0;
  const MOVE_THRESHOLD = 200; // ms between moves to trigger new image
  const DISTANCE_THRESHOLD = 180; // minimum distance (px) to trigger new image

  // Preload images
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  function createImage(x, y) {
    const img = document.createElement('img');
    img.src = images[currentIndex];
    img.className = 'hero__cursor-image';
    img.style.left = (x - 100) + 'px'; // Center image on cursor
    img.style.top = (y - 140) + 'px';

    container.appendChild(img);

    // Force browser to apply initial styles before triggering animation
    // This ensures the entrance animation always plays
    void img.offsetWidth; // Force reflow

    // Use setTimeout to guarantee animation triggers after styles applied
    setTimeout(() => {
      img.classList.add('is-visible');
    }, 10);

    // Cycle to next image
    currentIndex = (currentIndex + 1) % images.length;

    return img;
  }

  function fadeOutImage(img) {
    if (!img) return;
    img.classList.remove('is-visible');
    img.classList.add('is-fading');

    // Remove after animation
    setTimeout(() => {
      if (img.parentNode) {
        img.parentNode.removeChild(img);
      }
    }, 600);
  }

  function handleMouseMove(e) {
    // Only show cursor images when still in hero visible area (not scrolled past)
    if (window.scrollY > window.innerHeight * 0.5) {
      if (activeImage) {
        fadeOutImage(activeImage);
        activeImage = null;
      }
      return;
    }

    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const now = Date.now();

    // Calculate distance from last position
    const distance = Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2));

    // Only create new image if enough time AND distance has passed
    if (now - lastMoveTime > MOVE_THRESHOLD && distance > DISTANCE_THRESHOLD) {
      // Fade out previous image
      if (activeImage) {
        fadeOutImage(activeImage);
      }

      // Create new image at cursor position
      activeImage = createImage(x, y);
      lastMoveTime = now;
      lastX = x;
      lastY = y;
    }

    // Reset fade out timer
    clearTimeout(moveTimeout);
    moveTimeout = setTimeout(() => {
      if (activeImage) {
        fadeOutImage(activeImage);
        activeImage = null;
      }
    }, 500); // Fade out after 500ms of no movement
  }

  function handleMouseLeave() {
    clearTimeout(moveTimeout);
    if (activeImage) {
      fadeOutImage(activeImage);
      activeImage = null;
    }
  }
  // Delay 3 seconds before enabling cursor images
  setTimeout(() => {
    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);
  }, 600);
}

// ====================================
// INITIALIZATION
// ====================================
document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initMobileMenu();
  initScrollReveal();
  initActiveNavLink();
  initHeroParallax();
  initProfessionScramble();
  initCursorImages();

  console.log('🚀 Portfolio initialized');
});

// Handle page visibility for clock updates
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    updateClock();
  }
});
