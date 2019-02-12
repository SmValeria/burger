let htmlForHamburger = `
    <a href="#"
        class="hamburger hamburger--red hamburger--close popup__hamburger popup--close">
        <span class="hamburger__line hamburger__line-top"></span>
        <span class="hamburger__line hamburger__line-middle"></span>
        <span class="hamburger__line hamburger__line-bottom"></span>
    </a>`;


function showModal(evt) {
    evt.preventDefault();
    const container = document.querySelector('.wrapper');
    const popup = document.createElement('div');

    popup.classList.add('popup');

    let message = `<div class="container popup__container">
                       <div class="popup__content">`;

    if (evt.target.classList.contains('reviews__link')) {
        const reviewItem = evt.target.closest('.reviews__item');
        const reviewAuthor = reviewItem.querySelector('.reviews__author').textContent;
        const reviewText = reviewItem.querySelector('.reviews__text').textContent;
        message += `<h4 class="title popup__title">${reviewAuthor}</h4>`;
        message += `<p class="popup__text">${reviewText}</p>`;
        message += htmlForHamburger;
    } else {
        message += `<p class="popup__text"></p>`;
        message += `<a href="#" class="btn btn--background-red popup__btn popup--close">Закрыть</a>`;

    }

    message += `</div></div>`;

    popup.innerHTML = message;

    container.appendChild(popup);

    closePopupButton = popup.querySelector('.popup--close');

    closePopupButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        container.removeChild(popup);
    })
}

const openReviewButtons = document.querySelectorAll('.reviews__link--read');

openReviewButtons.forEach(function (button) {
    button.addEventListener('click', showModal);
});
