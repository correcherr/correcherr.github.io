
 // Script para manejar el menú desplegable
 const menuToggle = document.querySelector('.menu-toggle');
 const navUl = document.querySelector('.menu');

 menuToggle.addEventListener('click', () => {
     navUl.classList.toggle('show'); // Alterna la clase que muestra el menú
 });