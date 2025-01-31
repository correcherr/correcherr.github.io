// Función para detectar el dispositivo y cargar la hoja de estilos correspondiente
function loadStylesheet() {
    // Expresión regular para detectar dispositivos móviles
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Obtener el elemento <link> que carga la hoja de estilos
    const stylesheet = document.getElementById('stylesheet');

    // Cargar la hoja de estilos según el dispositivo
    if (isMobile) {
        stylesheet.href = "../styles/mobile-styles.css"; // Hoja de estilos para móviles
        console.log("Cargando estilos para móviles...");
    } else {
        stylesheet.href = "../styles/styles.css"; // Hoja de estilos para ordenadores
        console.log("Cargando estilos para ordenadores...");
    }
}

// Ejecutar la función cuando la página se cargue
window.onload = loadStylesheet;

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');

    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('show');
    });

    document.querySelectorAll('.seccion').forEach(section => {
        section.addEventListener('click', () => {
            toggleExpand(section);
        });
    });

    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Allow normal navigation for links with full paths
            if (this.getAttribute('href').includes('index.html')) {
                return;
            }
            if (this.getAttribute('href').includes('portfolio.html')) {
                return;
            }
            // Handle internal links
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            smoothScroll(targetSection);
            toggleExpand(targetSection);
        });
    });

    // Pop-up functionality
    const popup = document.getElementById('popup');
    const popupBody = document.getElementById('popup-body');
    const popupClose = document.querySelector('.popup-close');

    document.querySelectorAll('.button.maximize').forEach(button => {
        button.addEventListener('click', function () {
            const sectionContent = this.parentElement.parentElement.cloneNode(true);
            sectionContent.querySelector('.window-buttons').remove(); // Remove the buttons from the cloned content
            popupBody.innerHTML = '';
            popupBody.appendChild(sectionContent);
            popup.style.display = 'block';
        });
    });

    popupClose.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    });
});

function toggleExpand(section) {
    const isExpanded = section.classList.contains('expand');
    document.querySelectorAll('.seccion').forEach(s => s.classList.remove('expand')); // Remove expand from all sections
    if (!isExpanded) {
        section.classList.add('expand'); // Add expand to the clicked section if it was not already expanded
    }
}

function smoothScroll(target) {
    const headerHeight = document.querySelector('header').offsetHeight;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000; // Duration in milliseconds
    let start = null;

    window.requestAnimationFrame(step);

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const ease = easeInOutCubic(progress / duration);
        window.scrollTo(0, startPosition + distance * ease);
        if (progress < duration) {
            window.requestAnimationFrame(step);
        }
    }

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
}
