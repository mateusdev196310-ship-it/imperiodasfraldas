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
    const animateElements = document.querySelectorAll('.categoria, .destaque-item, .valor');
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

    document.querySelectorAll('.categoria, .destaque-item, .valor').forEach(element => {
        observer.observe(element);
    });
    
    // Funcionalidade de troca de abas
    const initTabs = function() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        if (tabButtons.length > 0) {
            // Ativar a primeira aba por padrão
            tabButtons[0].classList.add('active');
            if (tabPanes[0]) {
                tabPanes[0].classList.add('active');
            }
            
            // Adicionar evento de clique para cada botão de aba
            tabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remover classe ativa de todos os botões
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Adicionar classe ativa ao botão clicado
                    this.classList.add('active');
                    
                    // Mostrar o conteúdo da aba correspondente
                    const targetTab = this.getAttribute('data-tab');
                    
                    // Esconder todos os painéis de abas
                    tabPanes.forEach(pane => pane.classList.remove('active'));
                    
                    // Mostrar o painel da aba selecionada
                    const activePane = document.querySelector(`#${targetTab}`);
                    if (activePane) {
                        activePane.classList.add('active');
                    }
                    
                    // Adicionar efeito de animação aos produtos
                    const produtos = activePane.querySelectorAll('.produto-item');
                    produtos.forEach((produto, index) => {
                        produto.style.animationDelay = `${index * 0.1}s`;
                        produto.classList.add('animated');
                        
                        // Remover a classe após a animação
                        setTimeout(() => {
                            produto.classList.remove('animated');
                        }, 1000);
                    });
                });
            });
        }
    };
    
    // Inicializar as abas
    initTabs();

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