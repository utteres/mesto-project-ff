
import './index.css';
import {initialCards} from './components/cards.js';
import {popupOpen,popupClose, clickOnOverlay} from './components/modal.js';
import {creatCard, deliteCard, likeCard} from './components/card.js';

const popup = document.querySelectorAll('.popup');
const editPopup=document.querySelector('.popup_type_edit');
const addPopup=document.querySelector('.popup_type_new-card');
const closePopup = document.querySelector('.popup__close');
const boxPopup = document.querySelector('.popup_type_image');
const imgBoxPopup = document.querySelector('.popup__image');
const captionPopup = document.querySelector('.popup__caption');

const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileAddButton = profile.querySelector('.profile__add-button')

const profileForm = document.querySelector('.popup__form[name="edit-profile"]');
const profileTitleName = document.querySelector('.profile__title');
const profileTitleJob = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_description');

const cardForm = document.querySelector('.popup__form[name="new-place"]'); 
const linkUrl = document.querySelector('.popup__input_type_url');
const namePlace = document.querySelector('.popup__input_type_card-name');

const placesList = document.querySelector('.places__list');

function openImageClick(evt) {
    const card = evt.target.closest('.card'),
    cardImage = card.querySelector('.card__image'),
    cardTitle = card.querySelector('.card__title');
    imgBoxPopup.src = cardImage.src;
    captionPopup.textContent = cardTitle.textContent;
    popupOpen(boxPopup);
  }

// @todo: Вывести карточки на страницу
initialCards.forEach(function ({name, link}) {
    const cardAdd = creatCard(name, link, deliteCard, likeCard, openImageClick);
    placesList.append(cardAdd);
});

profileEditButton.addEventListener('click', function(){
popupOpen(editPopup);
closePopup.addEventListener('click', function(){
    popupClose(editPopup);
})
inputName.value=profileTitleName.textContent
inputJob.value=profileTitleJob.textContent
})

profileAddButton.addEventListener('click', function(){
    popupOpen(addPopup);

})

popup.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      clickOnOverlay(evt, popup);      
  });
  });
//попоп редактирования профиля
  function handleFormSubmit(evt) {
    evt.preventDefault();
        profileTitleName.textContent = inputName.value;
        profileTitleJob.textContent= inputJob.value;   
    popupClose(editPopup);
}
// Функция добовления карточки 
function cardFormSubmit(evt) {
    evt.preventDefault(); 
    const newCard = creatCard(namePlace.value, linkUrl.value, deliteCard, likeCard, openImageClick );
    placesList.prepend(newCard);
    popupClose(addPopup);
    cardForm.reset();
}
//слушатель попопа профиля
profileForm.addEventListener('submit', handleFormSubmit);
// Слушатель добовления карточки
cardForm.addEventListener('submit', cardFormSubmit);


