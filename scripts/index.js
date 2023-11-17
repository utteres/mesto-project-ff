
// @todo: Темплейт карточки
const template = document.querySelector('#card-template').content;
// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function CreatCard(cardName, cardPicture , callback) {
    const card = template.querySelector('.card').cloneNode(true);
    card.querySelector('.card__image').src = cardPicture;
    card.querySelector('.card__description').textContent = cardName;
    card.querySelector('.card__image').alt = cardName;

const deliteButton = card.querySelector('.card__delete-button');
deliteButton.addEventListener('click', callback );
 return card;
}

// @todo: Функция удаления карточки
function DeliteCard(evt){
evt.target.parentElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function ({name, link}) {
    const cardAdd = CreatCard(name, link, DeliteCard);
    placesList.append(cardAdd);
});
