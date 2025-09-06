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
document.addEventListener("DOMContentLoaded", () => {
  const skillsSection = document.querySelector("#skills");
  const progressBars = document.querySelectorAll(".progress-bar");
  const percents = document.querySelectorAll(".percent");

  function animateProgress() {
    progressBars.forEach((bar, index) => {
      const value = parseInt(bar.getAttribute("data-skill"));
      bar.style.width = value + "%";

      let start = 0;
      const counter = setInterval(() => {
        if (start >= value) {
          clearInterval(counter);
        } else {
          start++;
          percents[index].textContent = start + "%";
        }
      }, 20); // velocidad de la animación
    });
  }

  function resetProgress() {
    progressBars.forEach((bar, index) => {
      bar.style.width = "0%";
      percents[index].textContent = "0%";
    });
  }

  window.addEventListener("scroll", () => {
    const sectionPos = skillsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (sectionPos < screenPos) {
      animateProgress();
    } else {
      resetProgress();
    }
  });
});

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
