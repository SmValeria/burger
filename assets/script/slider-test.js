const left = document.querySelector("#left");
const right = document.querySelector("#right");

const list = document.querySelector("#items");
const container = document.querySelector('.slider');
const itemCollection = document.querySelectorAll('.item');
const item = itemCollection.item(0);
const itemCount = itemCollection.length;
const listStyles = window.getComputedStyle(list);

const containerWidth = parseInt(window.getComputedStyle(container).width);
const step = parseInt(window.getComputedStyle(item).width);

let listOffset = parseInt(listStyles.left);
const offset = (itemCount * step - containerWidth)*-1;
const point = 0;

right.addEventListener("click", function (event) {
    // напишите здесь код, который сдвигает list на 100px вправо
    // если list уже сдвинут на 5 элементов впарво, то больше элементы сдвигать не надо, т.к. вы достигли конца списка

    event.preventDefault();

    if (listOffset > offset) {
        listOffset -= step;
    } else {
        listOffset = point;
    }

    list.style.left = `${listOffset}px`;

});

left.addEventListener("click", function () {
    // напишите здесь код, который сдвигает list на 100px влево
    // если item находится в самом начале, то больше элементы сдвигать влево не надо, т.к. вы достигли начала списка
    event.preventDefault();
    if (listOffset < point) {
        listOffset += step;
    } else {
        listOffset = offset;
    }

    list.style.left = `${listOffset}px`;
});
