document.addEventListener('DOMContentLoaded', () => {

  /* ---------- MENU MOBILE ---------- */
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  const revealTargets = document.querySelectorAll(
    '.section__title, .lede, .statement, .transform-col, .compare__col, ' +
    '.checklist li, .included li, .pillar, .module, .hero__stats, .form, .stat'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ---------- DIAL: DEPENDÊNCIA -> LIDERANÇA ---------- */
  const dial = document.getElementById('dial');
  const dialFill = document.getElementById('dialFill');
  const dialMarker = document.getElementById('dialMarker');

  if (dial && dialFill && dialMarker) {
    const dialObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          dialFill.style.width = '94%';
          dialMarker.style.left = '94%';
          dialObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    dialObserver.observe(dial);
  }

  /* ---------- BACK TO TOP ---------- */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('is-visible', window.scrollY > 700);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- HEADER: sombra ao rolar ---------- */
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 20
        ? '0 8px 24px rgba(0,0,0,.25)'
        : 'none';
    });
  }

  /* ---------- FORMULÁRIO DE CONTATO ---------- */
  const form = document.getElementById('leadForm');
  const success = document.getElementById('formSuccess');

  if (form && success) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Aqui entraria a integração com o backend / CRM / planilha.
      form.hidden = true;
      success.hidden = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

});
