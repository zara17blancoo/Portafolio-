// Menú hamburguesa
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('active');
  });
}

// Animación de barras de habilidades
function animateBarsOnView() {
  document.querySelectorAll('.progress-bar').forEach((bar) => {
    const value = bar.getAttribute('data-skill');
    const rect = bar.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom >= 0;
    if (inView) bar.style.width = value + '%';
  });
}
window.addEventListener('scroll', animateBarsOnView);
window.addEventListener('load', animateBarsOnView);

// Validación de formulario en tiempo real
const form = document.getElementById('contact-form');
const msg = document.getElementById('form-msg');

function setMsg(text, ok=false) {
  msg.textContent = text;
  msg.style.color = ok ? 'green' : 'red';
}

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    if (name.value.trim().length < 3) return setMsg('El nombre debe tener al menos 3 caracteres.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) return setMsg('Por favor, ingresa un email válido.');
    if (message.value.trim().length < 10) return setMsg('El mensaje debe tener al menos 10 caracteres.');

    setMsg('Mensaje enviado con éxito ✅', true);
    form.reset();
  });

  ['input','keyup','change'].forEach(evt => {
    form.addEventListener(evt, () => {
      if (!msg.textContent) return;
      setMsg(''); // limpiar mensaje al tipear
    });
  });
}
