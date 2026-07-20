// ---------- SISTEMA - JAVASCRIPT ----------

// ---------- LOGIN ----------
document.getElementById('loginBtn').addEventListener('click', function() {
    const user = document.getElementById('loginUser').value;
    const pass = document.getElementById('loginPass').value;
    const fb = document.getElementById('loginFeedback');

    if (user === 'admin' && pass === '123456') {
        document.getElementById('login').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('barbeiros').style.display = 'block';
        document.getElementById('clientes').style.display = 'block';
        document.getElementById('footerAdmin').style.display = 'block';
        document.getElementById('header').style.display = 'flex';
        document.getElementById('header').classList.add('scrolled');
    } else {
        fb.textContent = '❌ Usuário ou senha inválidos.';
        fb.className = 'login-feedback error';
        fb.style.display = 'block';
    }
});

// ---------- HEADER SCROLL ----------
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header.style.display !== 'none') {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// ---------- NAVEGAÇÃO ----------
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href') === 'index.html') return;
        e.preventDefault();
        const target = this.getAttribute('href').replace('#', '');

        // Esconde todas as seções
        document.querySelectorAll('.dashboard-section, .barbers-admin, .clientes-section').forEach(el => {
            el.style.display = 'none';
        });

        // Mostra a seção alvo
        if (target === 'dashboard' || target === 'agendamentos') {
            document.getElementById('dashboard').style.display = 'block';
        }
        if (target === 'barbeiros') {
            document.getElementById('barbeiros').style.display = 'block';
        }
        if (target === 'clientes') {
            document.getElementById('clientes').style.display = 'block';
        }

        // Fecha menu mobile
        const navMenu = document.getElementById('navMenu');
        navMenu.classList.remove('active');
    });
});

// ---------- FUNÇÕES ADMIN ----------
function editarAgendamento(btn) {
    const row = btn.closest('tr');
    const cliente = row.cells[0].textContent;
    const servico = row.cells[1].textContent;
    const barbeiro = row.cells[2].textContent;
    const data = row.cells[3].textContent;

    alert(`✏️ Editando agendamento de ${cliente}\nServiço: ${servico}\nBarbeiro: ${barbeiro}\nData: ${data}\n\n(Simulação - em produção abriria um modal)`);
}

function cancelarAgendamento(btn) {
    const row = btn.closest('tr');
    const cliente = row.cells[0].textContent;
    if (confirm(`❌ Tem certeza que deseja cancelar o agendamento de ${cliente}?`)) {
        row.style.opacity = '0.3';
        row.style.textDecoration = 'line-through';
        row.cells[4].innerHTML = '<span class="status completed">Cancelado</span>';
        alert(`✅ Agendamento de ${cliente} cancelado com sucesso!`);
    }
}

function editarBarbeiro(btn) {
    const card = btn.closest('.barber-admin-card');
    const nome = card.querySelector('h4').textContent;
    alert(`✏️ Editando barbeiro: ${nome}\n\n(Simulação - em produção abriria um modal com formulário)`);
}

function verAgenda(btn) {
    const card = btn.closest('.barber-admin-card');
    const nome = card.querySelector('h4').textContent;
    alert(`📅 Agenda de ${nome}\n\nAgendamentos do dia:\n- 09:00 - Cliente A\n- 10:30 - Cliente B\n- 14:00 - Cliente C\n\n(Simulação)`);
}

// ---------- MOBILE MENU ----------
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.querySelector('i').classList.toggle('fa-bars');
        mobileToggle.querySelector('i').classList.toggle('fa-times');
    });
}