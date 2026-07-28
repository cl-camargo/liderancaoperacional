document.addEventListener('DOMContentLoaded', () => {

  /* ---------- CONFIGURAÇÃO ---------- */
  // Cole aqui a URL do "App da Web" gerada no Google Apps Script
  // (Implantar > Nova implantação > App da Web > copiar URL /exec)
  const SCRIPT_URL = 'COLE_AQUI_A_URL_DO_APPS_SCRIPT';

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
    '.checklist li, .included li, .pillar, .module, .hero__stats, .form, .stat, ' +
    '.instructor__photo, .instructor__bio, .lede'
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

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'ENVIANDO...';

      const payload = {
        nome: form.nome.value,
        empresa: form.empresa.value,
        whatsapp: form.whatsapp.value,
        email: form.email.value,
        qtd: form.qtd.value
      };

      // O Apps Script exige "no-cors" quando chamado direto do navegador;
      // por isso não conseguimos ler a resposta, mas o envio funciona
      // normalmente e a linha é gravada na planilha.
      fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload)
      })
        .then(() => {
          form.hidden = true;
          success.hidden = false;
          success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
        .catch(() => {
          alert('Não foi possível enviar seu cadastro agora. Tente novamente em instantes ou fale com a gente pelo WhatsApp.');
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        });
    });
  }

});
