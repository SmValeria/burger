(function () {
    document.addEventListener("DOMContentLoaded", function () {
        const hamburgerButton = document.querySelector('.header__hamburger');
        const header = document.querySelector('.header');
        const links = document.querySelectorAll('.menubar__item');
        hamburgerButton.addEventListener('click', function (evt) {
            evt.preventDefault();
            header.classList.toggle('header--active');
            hamburgerButton.classList.toggle('hamburger--close');
        });

        links.forEach((link) => {
            link.addEventListener('click', (evt) => {
                evt.preventDefault();
                if(!header.classList.contains('header--active')) {
                    return
                }
                header.classList.remove('header--active');
                hamburgerButton.classList.remove('hamburger--close');
            })
        });

    });
})()