// =====================
// NAVIGATION & MOBILE MENU
// =====================
(function() {
  'use strict';

  const hamburger = document.querySelector('.hamburger');
  const mobileOverlay = document.querySelector('.mobileOverlay');
  const overlayNavLinks = document.querySelectorAll('.overlayNav a');
  

  if (!hamburger || !mobileOverlay) return;

  function toggleMenu() {
    const isOpen = mobileOverlay.classList.contains('show');
    
    if (isOpen) {
      mobileOverlay.classList.remove('show');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      mobileOverlay.classList.add('show');
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileOverlay.classList.toggle('show');
  });

  overlayNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMenu();
      
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      
      if (target) {
        setTimeout(() => {
          const navBar = document.querySelector('.navBar');
          const navHeight = navBar ? navBar.offsetHeight : 0;
          const targetPosition = target.offsetTop - navHeight;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }, 300);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileOverlay.classList.contains('show')) {
      toggleMenu();
    }
  });

  mobileOverlay.addEventListener('click', (e) => {
    if (e.target === mobileOverlay) {
      toggleMenu();
    }
  });
})();

// =====================
// SMOOTH SCROLLING
// =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const navBar = document.querySelector('.navBar');
      const navHeight = navBar ? navBar.offsetHeight : 0;
      const targetPosition = target.offsetTop - navHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

// =====================
// TYPING ANIMATION
// =====================
(function() {
  'use strict';

  const animatedTitle = document.getElementById('animatedTitle');
  if (!animatedTitle) return;

  const phrases = ['Full Stack Web Developer', 'Problem Solver'];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typingSpeed = 50;
  const deletingSpeed = 50;
  const pauseDelay = 1500;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    const fullText = currentPhrase + '/>';

    if (isDeleting) {
      charIndex--;
      animatedTitle.innerHTML = charIndex > 0 ? `&lt;${fullText.slice(0, charIndex)}` : '&lt;';
      
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, typingSpeed);
      } else {
        setTimeout(type, deletingSpeed);
      }
    } else {
      charIndex++;
      animatedTitle.innerHTML = `&lt;${fullText.slice(0, charIndex)}`;
      
      if (charIndex === fullText.length) {
        isDeleting = true;
        setTimeout(type, pauseDelay);
      } else {
        setTimeout(type, typingSpeed);
      }
    }
  }

  type();
})();

// =====================
// SKILLS SECTION ANIMATION
// =====================
(function() {
  'use strict';

  const skillsSection = document.querySelector('.skillsSection');
  if (!skillsSection) return;

  const sectionTitle = skillsSection.querySelector('.sectionTitle');
  const sectionSubtitle = skillsSection.querySelector('.sectionSubtitle');
  const skillCategories = skillsSection.querySelectorAll('.skillCategory');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible'); // Remove when out of view
      }
    });
  }, observerOptions);

  if (sectionTitle) observer.observe(sectionTitle);
  if (sectionSubtitle) observer.observe(sectionSubtitle);
  skillCategories.forEach(category => observer.observe(category));
})();

// =====================
// PROJECTS HORIZONTAL SCROLL
// =====================
(function() {
  'use strict';

  const projectsScrollContainer = document.querySelector('.projectsScrollContainer');
  const scrollLeft = document.querySelector('.scrollLeft');
  const scrollRight = document.querySelector('.scrollRight');
  const projectCards = document.querySelectorAll('.projectCard');

  if (!projectsScrollContainer) return;

  // Scroll buttons functionality
  const scrollAmount = 440; // card width + gap

  if (scrollLeft) {
    scrollLeft.addEventListener('click', () => {
      projectsScrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

  if (scrollRight) {
    scrollRight.addEventListener('click', () => {
      projectsScrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  // Fade-in animation on scroll
  const observerOptions = {
    root: null,            // viewport
    rootMargin: "0px",
    threshold: 0.1         // triggers when 10% of the element is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 150);
      } else {
        entry.target.classList.remove('visible'); // Reset animation
      }
    });
  }, observerOptions);

  projectCards.forEach(card => observer.observe(card));

  // Show/hide scroll indicators based on scroll position
  function updateScrollIndicators() {
    if (!scrollLeft || !scrollRight) return;

    const isAtStart = projectsScrollContainer.scrollLeft <= 0;
    const isAtEnd = projectsScrollContainer.scrollLeft >= projectsScrollContainer.scrollWidth - projectsScrollContainer.clientWidth - 10;

    scrollLeft.style.display = isAtStart ? 'none' : 'flex';
    scrollRight.style.display = isAtEnd ? 'none' : 'flex';
  }

  projectsScrollContainer.addEventListener('scroll', updateScrollIndicators);
  window.addEventListener('resize', updateScrollIndicators);
  updateScrollIndicators();

  // Mouse drag to scroll
  let isDown = false;
  let startX;
  let scrollLeftPos;

  projectsScrollContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    projectsScrollContainer.style.cursor = 'grabbing';
    startX = e.pageX - projectsScrollContainer.offsetLeft;
    scrollLeftPos = projectsScrollContainer.scrollLeft;
  });

  projectsScrollContainer.addEventListener('mouseleave', () => {
    isDown = false;
    projectsScrollContainer.style.cursor = 'grab';
  });

  projectsScrollContainer.addEventListener('mouseup', () => {
    isDown = false;
    projectsScrollContainer.style.cursor = 'grab';
  });

  projectsScrollContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - projectsScrollContainer.offsetLeft;
    const walk = (x - startX) * 2;
    projectsScrollContainer.scrollLeft = scrollLeftPos - walk;
  });
})();

// =====================
// ACTIVE NAV LINK HIGHLIGHTING
// =====================
(function() {
  'use strict';

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navLinks a, .overlayNav a');

  function updateActiveLink() {
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(updateActiveLink, 10);
  });

  updateActiveLink();
})();


// Shytype Photo-swap
    document.addEventListener('DOMContentLoaded', function() {
      const profileImage = document.getElementById('profileImage');
      if (!profileImage) return;
      const originalSrc = profileImage.getAttribute('data-original');
      const shySrc = profileImage.getAttribute('data-shy');
      const profileContainer = profileImage.closest('.profileContainer');

      profileContainer.addEventListener('mouseenter', () => {
        profileImage.src = shySrc;
      });
      profileContainer.addEventListener('mouseleave', () => {
        profileImage.src = originalSrc;
      });
    });