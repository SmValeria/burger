const form = document.querySelector('.form__elem');
const submitButton = form.querySelector('[type="submit"]');

submitButton.addEventListener('click', function (evt) {
    evt.preventDefault();

    const name = form.elements.name.value;
    const phone = form.elements.phone.value;
    const comment = form.elements.comment.value;
    const mail = "test@mail.com";

    let message = `Пожалуйста, введите имя, телефон и комментарий`;

    let formData = new FormData();

    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("comment", comment);
    formData.append("to", mail);

    if (!checkForm()) {
        showModal(evt, message);
    }

    const xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    xhr.send(formData);

    xhr.addEventListener('load', function () {

        message = xhr.response.message;

        showModal(evt, message);
    });

});

function checkForm() {
    let validity = true;

    if (!checkInput(form.elements.name)) {
        validity = false;
    }

    if (!checkInput(form.elements.phone)) {
        validity = false;
    }

    if (!checkInput(form.elements.comment)) {
        validity = false;
    }


    return validity
}


function checkInput(input) {
    return input.checkValidity();
}