let team = new AccordionVertical({
    item: 'team__member',
    itemActive: 'team__member--active'
});

document.addEventListener("DOMContentLoaded", team);


function AccordionVertical(accordion) {

    const accordionItems = document.querySelectorAll(`.${accordion.item}`);

    accordionItems.forEach(function (item) {
        item.addEventListener('click', function (evt) {

            let isActiveItem = item.classList.contains(accordion.itemActive);

            if (!isActiveItem) {
                accordionItems.forEach(function (elem) {
                    elem.classList.remove(accordion.itemActive);
                })
            }

            item.classList.toggle(accordion.itemActive);
        })
    })
}