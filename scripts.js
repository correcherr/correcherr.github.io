// Script para manejar el menú desplegable
const menuToggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('.menu');

menuToggle.addEventListener('click', () => {
    navUl.classList.toggle('show'); // Alterna la clase que muestra el menú
});

document.addEventListener('DOMContentLoaded', (event) => {
    const yearSpan = document.getElementById('current-year');
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;

    document.querySelectorAll('.seccion').forEach(section => {
        section.addEventListener('click', () => {
            const isExpanded = section.classList.contains('expand');
            document.querySelectorAll('.seccion').forEach(s => s.classList.remove('expand')); // Remove expand from all sections
            if (!isExpanded) {
                section.classList.add('expand'); // Add expand to the clicked section if it was not already expanded
            }
        });
    });
});