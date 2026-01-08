document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
        });
    });

    // Rolagem suave para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Adicionar classes de animação aos elementos
    const animateElements = document.querySelectorAll('.categoria-card, .destaque-item, .valor');
    animateElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.classList.add(`delay-${(index % 4) + 1}`);
    });

    // Animações ao rolar a página
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.categoria-card, .destaque-item, .valor').forEach(element => {
        observer.observe(element);
    });

    // Adicionar elementos visuais lúdicos
    addBalloons();
    addStars();
    
    // Validação do formulário de contato
    const contactForm = document.getElementById('formulario-contato');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio bem-sucedido
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            
            setTimeout(() => {
                showThankYouMessage();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                contactForm.reset();
            }, 1500);
        });
    }
});

// Função para mostrar mensagem de agradecimento
function showThankYouMessage() {
    const formContainer = document.querySelector('.contato-form');
    const originalContent = formContainer.innerHTML;
    
    formContainer.innerHTML = `
        <div class="thank-you-message">
            <i class="fas fa-check-circle"></i>
            <h3>Mensagem Enviada!</h3>
            <p>Obrigado pelo seu contato. Responderemos em breve!</p>
            <button class="btn btn-primary" id="new-message">Nova Mensagem</button>
        </div>
    `;
    
    document.getElementById('new-message').addEventListener('click', function() {
        formContainer.innerHTML = originalContent;
        
        // Reativar o formulário
        const contactForm = document.getElementById('formulario-contato');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                showThankYouMessage();
            });
        }
    });
}

// Função para adicionar balões flutuantes
function addBalloons() {
    const colors = ['#1a56db', '#3b82f6', '#93c5fd', '#fbbf24', '#ec4899'];
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        for (let i = 0; i < 5; i++) {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.left = `${Math.random() * 90 + 5}%`;
            balloon.style.animationDuration = `${Math.random() * 10 + 10}s`;
            balloon.style.animationDelay = `${Math.random() * 5}s`;
            
            heroSection.appendChild(balloon);
        }
    }
}

// Função para adicionar estrelas
function addStars() {
    const destaqueSection = document.querySelector('.destaque');
    
    if (destaqueSection) {
        for (let i = 0; i < 20; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDuration = `${Math.random() * 3 + 2}s`;
            star.style.animationDelay = `${Math.random() * 2}s`;
            
            destaqueSection.appendChild(star);
        }
    }
}

// Adicionar classe ao header ao rolar
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Slideshow de imagens no Hero (fundo em tela cheia)
window.addEventListener('DOMContentLoaded', () => {
  const currentEl = document.getElementById('hero-slideshow-current');
  const nextEl = document.getElementById('hero-slideshow-next');
  if (!currentEl || !nextEl) return;

  const isMobile = window.innerWidth <= 750;
  // Novas fotos em apresentacao, começando pela fachada
  const slidesDesktop = [
    'img/apresentacao/fachada_sem_numero.jpeg',
    'img/apresentacao/absorventes.jpeg',
    'img/apresentacao/fraldas_e_lencos.jpeg',
    'img/apresentacao/mamadeira.jpeg',
    'img/apresentacao/shampoos.jpeg',
    'img/apresentacao/fachada2_corrigida.png',
    'img/apresentacao/fraldas_centro.jpg',
    'img/apresentacao/mamadeiras_centro.jpg',
    'img/apresentacao/shampoos_centro.jpg',
  ];
  const slidesMobile = [
    'img/apresentacao/fachada_sem_numero.jpeg',
    'img/apresentacao/absorventes.jpeg',
    'img/apresentacao/fraldas_e_lencos.jpeg',
    'img/apresentacao/mamadeira.jpeg',
    'img/apresentacao/shampoos.jpeg',
    'img/apresentacao/fachada2_corrigida.png',
    'img/apresentacao/fraldas_centro.jpg',
    'img/apresentacao/mamadeiras_centro.jpg',
    'img/apresentacao/shampoos_centro.jpg',
  ];
  const slides = isMobile ? slidesMobile : slidesDesktop;

  let idx = 0;
  currentEl.src = slides[idx];

  // Classe de foco para fachada (porta de vidro e logo)
  const setFocal = (el, src) => {
    if (!el) return;
    // Aplicar foco especial apenas para a fachada original (fachada_sem_numero) que precisa de ajuste à direita
    const isFachada = src && src.includes('fachada_sem_numero');
    // Aplicar foco especial para fachada nova corrigida
    const isFachadaNova = src && src.includes('fachada2_corrigida');
    const isMamadeira = src && src.includes('mamadeira');
    el.classList.toggle('focus-fachada', !!isFachada);
    el.classList.toggle('focus-fachada-nova', !!isFachadaNova);
    el.classList.toggle('focus-mamadeira', !!isMamadeira);
  };
  setFocal(currentEl, currentEl.src);

  // No mobile, escondemos a segunda camada para evitar animação de "folha"
  if (isMobile) {
    nextEl.style.display = 'none';
  }

  // Pré-carregamento simples
  const preload = (src) => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = reject;
    img.src = src;
  });

  // Passo com animação (desktop)
  const step = async () => {
    const nextIdx = (idx + 1) % slides.length;
    try {
      const src = await preload(slides[nextIdx]);
      nextEl.src = src;
      setFocal(nextEl, src);
      // garantir empilhamento consistente: atual por cima, próxima abaixo
      nextEl.style.zIndex = 1;
      currentEl.style.zIndex = 2;

      currentEl.classList.add('sheet-anim');
      currentEl.addEventListener('animationend', () => {
        currentEl.classList.remove('sheet-anim');
        const tempSrc = currentEl.src;
        currentEl.src = nextEl.src;
        setFocal(currentEl, currentEl.src);
        nextEl.src = tempSrc;
        setFocal(nextEl, nextEl.src);
        idx = nextIdx;
        // manter empilhamento após troca
        nextEl.style.zIndex = 1;
        currentEl.style.zIndex = 2;
      }, { once: true });
    } catch (e) {
      idx = nextIdx;
    }
  };

  // Passo simples (mobile) sem animação
  const stepMobile = async () => {
    const nextIdx = (idx + 1) % slides.length;
    try {
      const src = await preload(slides[nextIdx]);
      currentEl.src = src;
      setFocal(currentEl, src);
      idx = nextIdx;
    } catch (e) {
      idx = nextIdx;
    }
  };

  // Intervalo será ajustado mais abaixo para usar stepMobile no mobile
  setInterval(isMobile ? stepMobile : step, 6000);
});