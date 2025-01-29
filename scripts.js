// Agregar eventos de cambio de página
document.addEventListener("DOMContentLoaded", function() {
    const secciones = document.querySelectorAll(".seccion");
    const anclas = document.querySelectorAll("nav a");

    anclas.forEach((ancla) => {
        ancla.addEventListener("click", function(event) {
            event.preventDefault();
            const destino = event.target.href;
            const seccionDestino = document.querySelector(destino);
            secciones.forEach((seccion) => {
                if (seccion !== seccionDestino) {
                    seccion.classList.remove("activo");
                }
            });
            seccionDestino.classList.add("activo");
            window.location.hash = destino;
        });
    });

    // Agregar evento de cambio de sección por hash
    addEventListener("hashchange", function() {
        const secciones = document.querySelectorAll(".seccion");
        const anclas = document.querySelectorAll("nav a");

        anclas.forEach((ancla) => {
            if (ancla.href === window.location.hash) {
                ancla.classList.add("active");
                anclas.forEach((otroAncla) => {
                    if (otroAncla !== ancla) {
                        otroAncla.classList.remove("active");
                    }
                });
                document.querySelector(ancla.href).scrollIntoView();
            }
        });

        secciones.forEach((seccion) => {
            if (seccion.id === window.location.hash.slice(1)) {
                seccion.classList.add("activo");
            } else {
                seccion.classList.remove("activo");
            }
        });
    });
});