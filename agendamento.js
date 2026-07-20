// ---------- AGENDAMENTO - JAVASCRIPT ----------

let selectedService = null;
let selectedBarber = null;
let selectedDate = null;
let selectedTime = null;
let currentStep = 1;

// ---------- PROGRESSO ----------
function updateProgress() {
    document.querySelectorAll('.agendamento-progress .step').forEach((el, i) => {
        el.classList.toggle('active', i < currentStep);
    });
    document.querySelectorAll('.agendamento-progress .line').forEach((el, i) => {
        el.classList.toggle('active', i < currentStep - 1);
    });
    document.querySelectorAll('.step-content').forEach((el, i) => {
        el.classList.toggle('active', i === currentStep - 1);
    });
}

// ---------- NAVEGAÇÃO ENTRE PASSOS ----------
document.querySelectorAll('.next-step').forEach(btn => {
    btn.addEventListener('click', function() {
        if (currentStep < 4) {
            // Validação do passo atual
            if (currentStep === 1 && !selectedService) {
                const fb = document.getElementById('agFeedback');
                fb.textContent = '⚠️ Selecione um serviço para continuar.';
                fb.className = 'ag-feedback error';
                fb.style.display = 'block';
                setTimeout(() => { fb.style.display = 'none'; }, 3000);
                return;
            }
            if (currentStep === 2 && !selectedBarber) {
                const fb = document.getElementById('agFeedback');
                fb.textContent = '⚠️ Selecione um barbeiro para continuar.';
                fb.className = 'ag-feedback error';
                fb.style.display = 'block';
                setTimeout(() => { fb.style.display = 'none'; }, 3000);
                return;
            }
            if (currentStep === 3 && (!selectedDate || !selectedTime)) {
                const fb = document.getElementById('agFeedback');
                fb.textContent = '⚠️ Selecione data e horário para continuar.';
                fb.className = 'ag-feedback error';
                fb.style.display = 'block';
                setTimeout(() => { fb.style.display = 'none'; }, 3000);
                return;
            }
            currentStep++;
            updateProgress();

            // Se for passo 4, preenche confirmação
            if (currentStep === 4) {
                document.getElementById('confService').textContent = selectedService.name;
                document.getElementById('confService').innerHTML = selectedService.name + ' <span class="highlight-price">- R$ ' + selectedService.price + '</span>';
                document.getElementById('confBarber').textContent = selectedBarber;
                const d = new Date(selectedDate);
                document.getElementById('confDate').textContent = d.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
                document.getElementById('confTime').textContent = selectedTime;
                document.getElementById('confPrice').innerHTML = '<span class="highlight-price">R$ ' + selectedService.price + '</span>';
            }

            window.scrollTo({
                top: document.getElementById('agendamento').offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

document.querySelectorAll('.prev-step').forEach(btn => {
    btn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateProgress();
            window.scrollTo({
                top: document.getElementById('agendamento').offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// ---------- PASSO 1: SERVIÇO ----------
document.querySelectorAll('.service-card-ag').forEach(el => {
    el.addEventListener('click', function() {
        document.querySelectorAll('.service-card-ag').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        selectedService = {
            name: this.dataset.service,
            price: this.dataset.price
        };
        document.getElementById('nextStep1').disabled = false;
        document.getElementById('nextStep1').style.opacity = '1';

        // Esconde feedback de erro se houver
        const fb = document.getElementById('agFeedback');
        fb.style.display = 'none';
    });
});

// ---------- PASSO 2: BARBEIRO ----------
document.querySelectorAll('.barber-card-ag').forEach(el => {
    el.addEventListener('click', function() {
        document.querySelectorAll('.barber-card-ag').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        selectedBarber = this.dataset.barber;
        document.getElementById('nextStep2').disabled = false;
        document.getElementById('nextStep2').style.opacity = '1';

        const fb = document.getElementById('agFeedback');
        fb.style.display = 'none';
    });
});

// ---------- PASSO 3: DATA E HORA ----------
// Data
const dateInput = document.getElementById('agDate');
const today = new Date();
dateInput.min =
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
dateInput.value = dateInput.min;
selectedDate = dateInput.value;

dateInput.addEventListener('change', function() {
    selectedDate = this.value;
    checkStep3();
});

// Horários
document.querySelectorAll('.time-slot').forEach(el => {
    el.addEventListener('click', function() {
        document.querySelectorAll('.time-slot').forEach(t => t.classList.remove('selected'));
        this.classList.add('selected');
        selectedTime = this.dataset.time;
        checkStep3();

        const fb = document.getElementById('agFeedback');
        fb.style.display = 'none';
    });
});

function checkStep3() {
    if (selectedDate && selectedTime) {
        document.getElementById('nextStep3').disabled = false;
        document.getElementById('nextStep3').style.opacity = '1';
    }
}

// ---------- CONFIRMAR AGENDAMENTO ----------
document.getElementById('confirmAgendamento').addEventListener('click', function() {
    const name = document.getElementById('clientName').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    const fb = document.getElementById('agFeedback');

    if (!name || !phone) {
        fb.innerHTML = '⚠️ Preencha seu nome e telefone para finalizar.';
        fb.className = 'ag-feedback error';
        fb.style.display = 'block';
        return;
    }

    fb.innerHTML = '📤 Enviando agendamento...';
    fb.className = 'ag-feedback loading';
    fb.style.display = 'block';

    // Desabilita botão
    this.disabled = true;
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

    setTimeout(() => {
        fb.innerHTML = `
            ✅ <strong>Agendamento confirmado!</strong><br>
            <span style="font-size:0.9rem;color:var(--gray-ink);">
                <strong>${name}</strong>, você foi agendado com <strong>${selectedBarber}</strong><br>
                Serviço: <strong>${selectedService.name}</strong><br>
                Data: <strong>${new Date(selectedDate).toLocaleDateString('pt-BR')}</strong> às <strong>${selectedTime}</strong>
            </span>
        `;
        fb.className = 'ag-feedback success';
        fb.style.display = 'block';

        this.innerHTML = '<i class="fas fa-check"></i> Agendado!';
        this.style.opacity = '0.6';

        // Toca um som de confirmação visual
        fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-redo"></i> Agendar Outro';
            this.style.opacity = '1';
            this.disabled = false;
            resetAgendamento();
        }, 6000);
    }, 2000);
});

// ---------- RESET AGENDAMENTO ----------
function resetAgendamento() {
    selectedService = null;
    selectedBarber = null;
    selectedTime = null;
    selectedDate = document.getElementById('agDate').value;

    document.querySelectorAll('.service-card-ag').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('.barber-card-ag').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('.time-slot').forEach(t => t.classList.remove('selected'));

    document.getElementById('nextStep1').disabled = true;
    document.getElementById('nextStep2').disabled = true;
    document.getElementById('nextStep3').disabled = true;
    document.getElementById('nextStep1').style.opacity = '0.5';
    document.getElementById('nextStep2').style.opacity = '0.5';
    document.getElementById('nextStep3').style.opacity = '0.5';

    document.getElementById('clientName').value = '';
    document.getElementById('clientPhone').value = '';

    const fb = document.getElementById('agFeedback');
    fb.style.display = 'none';
    fb.className = 'ag-feedback';

    currentStep = 1;
    updateProgress();

    // Volta ao topo
    window.scrollTo({
        top: document.getElementById('agendamento').offsetTop - 100,
        behavior: 'smooth'
    });
}

// ---------- HEADER SCROLL ----------
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

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