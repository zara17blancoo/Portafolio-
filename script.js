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
  const skillsSection = document.getElementById("skills");
  const progressBars = document.querySelectorAll(".progress-bar");
  let animated = false; // <-- bandera para que se ejecute solo una vez

  const animateBars = () => {
    progressBars.forEach(bar => {
      const skillLevel = bar.getAttribute("data-skill");
      const percent = bar.querySelector(".percent");

      bar.style.width = skillLevel + "%";

      let current = 0;
      const interval = setInterval(() => {
        if (current >= skillLevel) {
          clearInterval(interval);
        } else {
          current++;
          percent.textContent = current + "%";
        }
      }, 20);
    });
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animateBars();
        animated = true; // <-- evita que se vuelva a ejecutar
        observer.disconnect(); // opcional, desconecta el observer
      }
    });
  }, { threshold: 0.5 });

  observer.observe(skillsSection);
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
