document.addEventListener("DOMContentLoaded", function () {
   const hamburgerButton = document.querySelector('.header__hamburger');
   const header = document.querySelector('.header');
   hamburgerButton.addEventListener('click', function (evt) {
       evt.preventDefault();
       header.classList.toggle('header--active');
       hamburgerButton.classList.toggle('hamburger--close');
   })

});