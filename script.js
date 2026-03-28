/* ====================================================
   script.js — Portfolio (Light Theme)
   ==================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Navbar scroll shadow ─── */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });


  /* ─── Hamburger / Mobile menu ─── */
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });


  /* ─── Smooth scrolling with offset ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      history.pushState(null, null, id);
    });
  });


  /* ─── Active nav link on scroll ─── */
  const sections  = document.querySelectorAll('section[id], footer[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const highlightNav = () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });


  /* ─── Reveal on scroll ─── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


  /* ─── Skill bar animation ─── */
  const barObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const width = fill.getAttribute('data-width');
        if (width) {
          setTimeout(() => { fill.style.width = width + '%'; }, 100);
        }
        obs.unobserve(fill);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.skill-bar-fill').forEach(fill => {
    fill.style.width = '0%';
    barObserver.observe(fill);
  });


  /* ─── Project filter ─── */
  const filterBar   = document.querySelector('.filter-bar');
  const projectGrid = document.getElementById('projectsGrid');

  if (filterBar && projectGrid) {
    const cards   = Array.from(projectGrid.querySelectorAll('.project-card'));
    const buttons = Array.from(filterBar.querySelectorAll('.filter-btn'));

    const applyFilter = key => {
      const k = key.toLowerCase();
      cards.forEach(card => {
        const tags = (card.getAttribute('data-tags') || '').toLowerCase().split(',').map(s => s.trim());
        const show = k === 'all' || tags.includes(k);
        card.style.display = show ? '' : 'none';
        if (show) {
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = 'fadeUp .45s ease both';
        }
      });
    };

    filterBar.addEventListener('click', e => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.getAttribute('data-filter'));
    });

    applyFilter('all');
  }


  /* ─── Free Courses Swiper ─── */
  const courses = [
    { title: 'WordPress Basic to Advanced', channel: 'Skillgori', duration: '2:06:17', videoId: 'f7bo-8_VKVE', url: 'https://www.youtube.com/watch?v=f7bo-8_VKVE' },
    { title: 'WordPress Theme Development', channel: 'Skillgori', duration: '5:23:25', videoId: 'MhGXTkCmo6I', url: 'https://www.youtube.com/watch?v=MhGXTkCmo6I' },
    { title: 'Earning From Google AdSense', channel: 'Skillgori', duration: '4:58:46', videoId: 'qxeqkvPK31U', url: 'https://www.youtube.com/watch?v=qxeqkvPK31U' },
    { title: 'Ecommerce Site Development Crash Course', channel: 'Skillgori', duration: '3:41:56', videoId: 'F__LKEPd5F0', url: 'https://www.youtube.com/watch?v=F__LKEPd5F0' },
    { title: 'Ecommerce Landing Page Design', channel: 'Skillgori', duration: '1:24:42', videoId: 'mzjOCUG6CWQ', url: 'https://www.youtube.com/watch?v=mzjOCUG6CWQ' },
  ];

  const slidesRoot = document.getElementById('coursesSlides');
  if (slidesRoot) {
    slidesRoot.innerHTML = courses.map(v => `
      <div class="swiper-slide" style="height:auto;">
        <div class="course-card">
          <div class="course-thumb">
            <img src="https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg" alt="${v.title}" loading="lazy">
            <span class="yt-badge"><i class="fa-brands fa-youtube me-1"></i> YouTube</span>
            <span class="course-duration">${v.duration}</span>
            <div class="course-play-btn">
              <span><i class="fa-brands fa-youtube"></i></span>
            </div>
          </div>
          <div class="course-body">
            <h3 class="course-title">${v.title}</h3>
            <div class="course-meta">
              <span><i class="fa-solid fa-circle-user" style="color:var(--primary);"></i> ${v.channel}</span>
              <span><i class="fa-regular fa-clock" style="color:var(--primary);"></i> ${v.duration}</span>
            </div>
            <div class="course-cta">
              <a href="${v.url}" target="_blank" rel="noopener noreferrer">Watch Free <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Play button click opens YouTube
    slidesRoot.addEventListener('click', e => {
      const thumb = e.target.closest('.course-thumb');
      if (thumb) {
        const card = thumb.closest('.course-card');
        const link = card.querySelector('.course-cta a');
        if (link) window.open(link.href, '_blank');
      }
    });

    new Swiper('.freeCourses', {
      loop: true,
      speed: 600,
      grabCursor: true,
      spaceBetween: 20,
      autoplay: { delay: 3000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      breakpoints: {
        0:    { slidesPerView: 1.1, centeredSlides: true },
        640:  { slidesPerView: 2, centeredSlides: false },
        1024: { slidesPerView: 3, centeredSlides: false },
      },
    });
  }


  /* ─── Contact form UX ─── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    // The form uses FormSubmit (action attribute), no JS override needed.
    // Just add basic loading state on submit:
    const submitBtn = document.getElementById('submitBtn');
    contactForm.addEventListener('submit', () => {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    });

    // Input floating label effect (subtle border glow already in CSS)
    contactForm.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('focus', () => input.parentElement.style.position = 'relative');
      input.addEventListener('blur',  () => input.parentElement.style.position = '');
    });
  }


  /* ─── Service cards — full card clickable ─── */
  document.querySelectorAll('.service-card').forEach(card => {
    card.style.cursor = 'pointer';
  });


  /* ─── Typewriter for hero subtitle ─── */
  const roles = ['Full Stack Developer', 'Laravel Expert', 'Shopify Developer', 'React JS Developer', 'WordPress Expert'];
  const roleEl = document.getElementById('heroRole');
  if (roleEl) {
    let ri = 0, ci = 0, deleting = false;

    const tick = () => {
      const word = roles[ri];
      roleEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);

      let delay = deleting ? 60 : 100;
      if (!deleting && ci === word.length + 1) { deleting = true; delay = 1600; }
      if (deleting && ci < 0)                  { deleting = false; ri = (ri + 1) % roles.length; ci = 0; delay = 300; }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 800);
  }

});