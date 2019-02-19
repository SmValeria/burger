const form = document.querySelector('.form__elem');
const submitButton = form.querySelector('[type="submit"]');

submitButton.addEventListener('click', function (evt) {

    const name = form.elements.name.value;
    const phone = form.elements.phone.value;
    const comment = form.elements.comment.value;
    const mail = "test@mail.com";

    let formData = new FormData();

    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("comment", comment);
    formData.append("to", mail);

    if (!checkForm()) {
        return;
    }

    evt.preventDefault();
    fetch('https://webdev-api.loftschool.com/sendmail', {
        method: 'POST',
        body: formData
    }).then((response) => {
        return response.json();
    }).then((info) => {
        return info.message;
    }).then((message) => {
        showModal(evt, message)
    }).catch(() => {
        showModal(evt, 'Что-то пошло не так...')
    })
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