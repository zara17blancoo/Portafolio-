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
// Animación de barras de progreso al hacer scroll
document.addEventListener("DOMContentLoaded", () => {
  const progressBars = document.querySelectorAll(".progress-bar");

  function fillBars() {
    progressBars.forEach(bar => {
      const value = parseInt(bar.getAttribute("data-skill"), 10);
      bar.style.width = value + "%";

      const span = bar.querySelector("span");
      let counter = 0;

      // Animación del número
      const interval = setInterval(() => {
        if (counter >= value) {
          clearInterval(interval);
        } else {
          counter++;
          span.textContent = counter + "%";
        }
      }, 15);

      // Mostrar el texto cuando la animación empieza
      span.style.opacity = 1;
    });
  }

  // IntersectionObserver: activa cuando #skills entra en pantalla
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fillBars();
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const skillsSection = document.querySelector("#skills");
  if (skillsSection) {
    observer.observe(skillsSection);
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
