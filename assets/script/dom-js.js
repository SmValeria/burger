// Задание 1:
//
// При помощи DOM API создайте DOM-элемент с тегом div
// Добавьте созданный элемент в DOM-дерево
// При помощи DOM API, поместите в элемент текст: 'Этот элемент создан при помощи DOM API'
//
// Задание 2:
//
// При помощи DOM API создайте элемент с тегом div
// Задайте созданному элементу класс 'inner'
// При помощи DOM API, поместите в элемент текст: 'Этот элемент тоже создан при помощи DOM API'
// Поместите созданный элемент внутрь элемента, который был создан в предыдущем задании
//
//
// В результате должна получиться такая HTML-структура:
// <div>
// Этот элемент создан при помощи DOM API
// <div class='inner'>
//     Этот элемент тоже создан при помощи DOM API
// </div>
// </div>

// Задание 3:
//
// Возьмите код из предыдущего задания и при помощи DOM API задайте созданному элементу CSS-стиль 'color: red'

// Заданий 4:
//
// Возьмите код первого задания
// Добавьте обработчик события click на созданный элемент
// При клике на элемент, в консоль должен выводиться текст: 'Этот текст говорит о том, что я всё сделал правильно'
// Откройте страничку в браузере
// Кликните на элемент
// Убедитесь, что после клика на элемент в консоли появилась надпись с текстом 'Этот текст говорит о том, что я всё сделал правильно'
//

const container = makeElement({
    name: 'div',
    text: 'Этот элемент создан при помощи DOM API'
});

document.body.appendChild(container);


const inner = makeElement({
    name: 'div',
    className: 'inner',
    text: 'Этот элемент тоже создан при помощи DOM API'
});

container.appendChild(inner);

inner.style.color = 'red';

inner.addEventListener('click', evt =>
    console.log('Этот текст говорит о том, что я всё сделал правильно')
);


// Задание 5:
//
// При помощи DOM API создайте элемент с тегом a
// Задайте созданному элементу атрибут href и запишите в этот атрибут значение  'https://loftschool.com'
// Добавьте созданный элемент в DOM-дерево
// Добавьте обработчик события click на созданный элемент
// Напишите код обработчика таким образом, чтобы при клике на созданный элемент в консоли выводилась надпись 'Я кликнул на ссылку HREF'. Вместо HREF необходимо подставить значение атрибута href. Но перехода по ссылке быть не должно.


const link = makeElement({
    name: 'a',
    text: 'https://loftschool.com',
    attrName: 'href',
    attrText: 'https://loftschool.com',
});

document.body.appendChild(link);

link.addEventListener('click', evt => {
        evt.preventDefault();
        console.log('Я кликнул на ссылку HREF');
    }
);

// Задание 6:
//
// При помощи DOM API создайте input и button
// Поместите созданные элементы на страницу
// При клике на кнопку необходимо выводить в консоль значение из текстового поля
//


const input = makeElement({
    name: 'input',
    attrName: 'type',
    attrText: 'text'
});
const button = makeElement({
    name: 'button',
    text: 'Нажми на меня',
    attrName: 'type',
    attrText: 'button'
});

button.addEventListener('click', evt => console.log(input.value));

document.body.appendChild(input);
document.body.appendChild(button);


function makeElement(obj) {
    let elem = document.createElement(obj.name);
    if (obj.attrName) {
        elem.setAttribute(obj.attrName, obj.attrText);
    }
    if (obj.text) {
        elem.textContent = obj.text;
    }
    if (obj.className) {
        elem.classList.add(obj.className);
    }
    return elem;
}