/* ========================================
   UI ENHANCEMENTS JAVASCRIPT
   ======================================== */

// Card expansion optimization removed to prevent conflicts with original functionality

// Scroll-triggered fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optionally unobserve after animation
      fadeInObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with fade-in-on-scroll class
document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
  fadeElements.forEach(el => fadeInObserver.observe(el));

  // Add stagger effect to testimonial and case study cards
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  testimonialCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
    card.classList.add('fade-in-on-scroll');
    fadeInObserver.observe(card);
  });

  // Case study expand/collapse functionality
  const caseStudyItems = document.querySelectorAll('.case-study-item');
  caseStudyItems.forEach((item, index) => {
    const expandButton = item.querySelector('.expand-toggle');
    const summary = item.querySelector('.case-study-summary');

    // Add fade-in animation
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add('fade-in-on-scroll');
    fadeInObserver.observe(item);

    // Touch feedback for mobile
    if (summary) {
      summary.addEventListener('touchstart', () => {
        summary.classList.add('touch-active');
      }, { passive: true });

      summary.addEventListener('touchend', () => {
        setTimeout(() => {
          summary.classList.remove('touch-active');
        }, 150);
      }, { passive: true });

      summary.addEventListener('touchcancel', () => {
        summary.classList.remove('touch-active');
      }, { passive: true });
    }

    // Add click handler for expand/collapse button only
    if (expandButton) {
      // Touch feedback for expand button
      expandButton.addEventListener('touchstart', () => {
        expandButton.classList.add('touch-active');
      }, { passive: true });

      expandButton.addEventListener('touchend', () => {
        setTimeout(() => {
          expandButton.classList.remove('touch-active');
        }, 150);
      }, { passive: true });

      expandButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling

        // Close other open items
        caseStudyItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('expanded')) {
            otherItem.classList.remove('expanded');
          }
        });

        // Toggle current item
        item.classList.toggle('expanded');
      });
    }

    // Touch feedback for case study links
    const caseStudyLink = item.querySelector('.case-study-link');
    if (caseStudyLink) {
      caseStudyLink.addEventListener('touchstart', () => {
        caseStudyLink.classList.add('touch-active');
      }, { passive: true });

      caseStudyLink.addEventListener('touchend', () => {
        setTimeout(() => {
          caseStudyLink.classList.remove('touch-active');
        }, 150);
      }, { passive: true });
    }
  });

  // Service cards animation removed to prevent conflicts with expand functionality

  // Add animation to partner logos
  const logoLinks = document.querySelectorAll('.logo-grid a');
  logoLinks.forEach((link, index) => {
    link.classList.add('fade-in-on-scroll');
    link.style.animationDelay = `${index * 0.05}s`;
    fadeInObserver.observe(link);
  });
});

// Form validation code removed to keep original functionality

// Smooth parallax effect for hero section (subtle)
let ticking = false;
let lastScrollY = window.scrollY;

function updateParallax() {
  const scrolled = window.scrollY;
  const heroText = document.querySelector('.hero-text');

  if (heroText && scrolled < window.innerHeight) {
    const parallaxAmount = scrolled * 0.3;
    heroText.style.transform = `translateY(${parallaxAmount}px)`;
    // Slower fade: only starts fading significantly after 60% scroll
    heroText.style.opacity = 1 - (scrolled / window.innerHeight) * 0.25;
  }

  ticking = false;
}

window.addEventListener('scroll', () => {
  lastScrollY = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

// Add hover sound effect (optional - can be removed if too much)
// Uncomment below to enable subtle interaction sounds
/*
const hoverSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZSA0PVKzn77FeFQxBmdzsvmcfBTiP0/PPfS8GI3fH79+NQg0QWLLm8KdWFQpEnt7xwWsFBi+C0fLTgjMGH2+/7+OUTQ0RVa/n8K9fFgxBmNztwGcfBjiP0/LPfS8GI3fH79+NQg0QWLLm8KdWFQpEnt7xwWsFBi+C0fLTgjMGH2+/7+SUTQ0RVa/n8K9fFgxBmNztwGcfBjiP0/LPfS8GI3fH79+NQg0QWLLm8KdWFQpEnt7xwWsFBi+C0fLTgjMGH2+/7+SUTQ0RVa/n8K9fFgxBmNztwGcfBjiP0/LPfS8GI3fH79+NQg0QWLLm8KdWFQpEnt7xwWsFBi+C0fLTgjMGH2+/7+SUTQ0RVa/n8K9fFgxBmNztwGcfBjiP0/LPfS8GI3fH79+NQg0QWLLm8KdWFQpEnt7xwWsFBi+C0fLTgjMGH2+/7+SUTQ0RVa/n8K9fFgxBmNztwGcfBjiP0/LPfS8GI3fH79+NQg0QWLLm8KdWFQpEnt7xwWsFBi+C0fLTgjMGH2+/7+SUTQ0RVa/n8K9fFgxBmNztwGcfBjiP0/LPfS8GI3fH79+NQg0QWLLm8KdWFQpEnt7xwWsFBi+C0fLTgjMGH2+/7+SUTQ0RVa/n8K9fFgxBmNztwGcfBjiP0/LPfS8GI3fH79+NQg0QWLLm8KdWFQpEnt7xwWsFBi+C0fLTgjMGH2+/7+SUTQ0RVa/n8K9fFgxBmNztwGcfBjiP0/LPfS8GI3fH79+NQg0QWLLm8KdWFQpEnt7xwWsFBi+C0fLTgjMGH2+/7+SUTQ0RVa/n8K9fFgxBmNztwGcfBjiP0/LPfS8GI3fH79+NQg0QWLLm8KdWFQpEnt7xwWsFBi+C0fLTgjMGH2+/7+SUTQ0RVa/n8K9fFgxBmNztwGcfBjiP0/LPfS8GI3fH79+NQg0QWLLm8KdWFQpEnt7xwWsFBi+C0fLTgjMGH2+/7+SUTQ0RVa/n8K9fFgxBmNztwGcfBjiP0/LPfS8GI3fH79+NQg0QWLLm8KdWFQpEnt7xwWsFBi+C0fLTgjMGH2+/7+SUTQ0RVa/n8K9fFgxBmNztwGcfBjiP0/LPfS8GI3fH79+NQg0QWLLm8KdWFQpEnt7xwWsFBi+C0fLTgjMGH2+/7+SUTQ0RVa/n8A==');
document.querySelectorAll('.card, .testimonial-card, .case-study-card, .logo-grid a').forEach(el => {
  el.addEventListener('mouseenter', () => {
    hoverSound.currentTime = 0;
    hoverSound.volume = 0.1;
    hoverSound.play().catch(() => {}); // Ignore errors if audio can't play
  });
});
*/

// Enhanced navigation scroll indicator
let lastScroll = 0;
const nav = document.querySelector('.digital-sticky-nav-wrapper');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll <= 0) {
    nav?.classList.remove('scroll-up');
    return;
  }

  if (currentScroll > lastScroll && !nav?.classList.contains('scroll-down')) {
    // Scrolling down
    nav?.classList.remove('scroll-up');
    nav?.classList.add('scroll-down');
  } else if (currentScroll < lastScroll && nav?.classList.contains('scroll-down')) {
    // Scrolling up
    nav?.classList.remove('scroll-down');
    nav?.classList.add('scroll-up');
  }

  lastScroll = currentScroll;
});

console.log('🎨 UI Enhancements loaded successfully!');
