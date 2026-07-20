// ---------- HEADER SCROLL ----------
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ---------- MOBILE MENU - FIX COMPLETO ----------
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle && navMenu) {
    const toggleIcon = mobileToggle.querySelector('i');
    
    // Função para abrir/fechar menu
    function toggleMenu(forceState) {
        const shouldOpen = forceState !== undefined ? forceState : !navMenu.classList.contains('active');
        
        if (shouldOpen) {
            navMenu.classList.add('active');
            document.body.classList.add('menu-open');
            header.classList.add('menu-open');
            if (toggleIcon) {
                toggleIcon.className = 'fas fa-times';
                toggleIcon.style.color = 'var(--blood)';
            }
        } else {
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            header.classList.remove('menu-open');
            if (toggleIcon) {
                toggleIcon.className = 'fas fa-bars';
                toggleIcon.style.color = '';
            }
        }
    }

    // Click no hambúrguer
    mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Fecha ao clicar nos links
    document.querySelectorAll('#navMenu a').forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu(false);
        });
    });

    // Fecha ao clicar fora
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active')) {
            const isClickInside = navMenu.contains(e.target) || mobileToggle.contains(e.target);
            if (!isClickInside) {
                toggleMenu(false);
            }
        }
    });

    // Fecha com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMenu(false);
        }
    });

    // Previne scroll com touch no menu
    navMenu.addEventListener('touchmove', (e) => {
        if (navMenu.classList.contains('active')) {
            e.preventDefault();
        }
    }, { passive: false });
}

// ---------- SCROLL ANIMATION ----------
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -20px 0px'
});

document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));

// ---------- SMOOTH SCROLL ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ---------- GALLERY LIGHTBOX ----------
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const imgSrc = this.querySelector('img')?.src;
        if (imgSrc) {
            const lightbox = document.createElement('div');
            lightbox.style.cssText = `
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0,0,0,0.92);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                cursor: pointer;
                padding: 40px;
            `;
            lightbox.innerHTML = `
                <img src="${imgSrc}" style="max-width:90%;max-height:90%;object-fit:contain;border:1px solid rgba(168,50,38,0.1);">
                <button style="position:absolute;top:20px;right:30px;background:none;border:none;color:#fff;font-size:2.5rem;cursor:pointer;font-family:sans-serif;transition:transform 0.3s;line-height:1;">✕</button>
            `;
            lightbox.querySelector('button').addEventListener('mouseenter', (e) => {
                e.target.style.transform = 'rotate(90deg)';
            });
            lightbox.querySelector('button').addEventListener('mouseleave', (e) => {
                e.target.style.transform = 'rotate(0deg)';
            });
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) lightbox.remove();
            });
            lightbox.querySelector('button')?.addEventListener('click', (e) => {
                e.stopPropagation();
                lightbox.remove();
            });
            document.body.appendChild(lightbox);
        }
    });
});

// ---------- CONTACT FORM ----------
const contactForm = document.getElementById('contactForm');
const contactFeedback = document.getElementById('contactFeedback');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contactName').value.trim();
        const phone = document.getElementById('contactPhone').value.trim();
        const service = document.getElementById('contactService').value;
        const message = document.getElementById('contactMessage').value.trim();

        if (!name || !phone || !service) {
            contactFeedback.textContent = '⚠️ Preencha todos os campos obrigatórios.';
            contactFeedback.className = 'contact-feedback';
            contactFeedback.style.display = 'block';
            contactFeedback.style.border = '1px solid var(--blood)';
            contactFeedback.style.color = 'var(--blood)';
            return;
        }

        contactFeedback.textContent = '📤 Enviando mensagem...';
        contactFeedback.className = 'contact-feedback';
        contactFeedback.style.display = 'block';
        contactFeedback.style.border = '1px solid var(--gold-old)';
        contactFeedback.style.color = 'var(--gold-old)';

        setTimeout(() => {
            contactFeedback.innerHTML = `
                ✅ <strong>Mensagem enviada!</strong><br>
                <span style="font-size:0.85rem;color:var(--gray-ink);">
                    Nome: ${name} | Serviço: ${service}<br>
                    Entraremos em contato pelo ${phone}.
                </span>
            `;
            contactFeedback.style.border = '1px solid var(--gold-old)';
            contactFeedback.style.color = 'var(--cream)';
            contactForm.reset();
        }, 1500);
    });
}

console.log('🔥 FLASH Barbershop - Menu mobile 100% fixo!');