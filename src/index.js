import "./index.css";
import { initialCards } from "./components/cards.js";
import { openPopup, closePopup, clickOnOverlay } from "./components/modal.js";
import { creatCard, deleteCard, likeCard } from "./components/card.js";

const popups = document.querySelectorAll(".popup");
const editPopup = document.querySelector(".popup_type_edit");
const addPopup = document.querySelector(".popup_type_new-card");
const boxPopup = document.querySelector(".popup_type_image");
const imgBoxPopup = document.querySelector(".popup__image");
const captionPopup = document.querySelector(".popup__caption");

const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileAddButton = profile.querySelector(".profile__add-button");

const profileForm = document.querySelector('.popup__form[name="edit-profile"]');
const profileTitleName = document.querySelector(".profile__title");
const profileTitleJob = document.querySelector(".profile__description");
const inputName = document.querySelector(".popup__input_type_name");
const inputJob = document.querySelector(".popup__input_type_description");

const cardForm = document.querySelector('.popup__form[name="new-place"]');
const linkUrl = document.querySelector(".popup__input_type_url");
const namePlace = document.querySelector(".popup__input_type_card-name");

const placesList = document.querySelector(".places__list");

function openImageClick(evt) {
  const card = evt.target.closest(".card");
  const cardImage = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  imgBoxPopup.src = cardImage.src;
  imgBoxPopup.alt= cardTitle.textContent
  captionPopup.textContent = cardTitle.textContent;
  openPopup(boxPopup);
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function ({ name, link }) {
  const cardAdd = creatCard(name, link, deleteCard, likeCard, openImageClick);
  placesList.append(cardAdd);
});

profileEditButton.addEventListener("click", function () {
  openPopup(editPopup);
  inputName.value = profileTitleName.textContent;
  inputJob.value = profileTitleJob.textContent;
});

profileAddButton.addEventListener("click", function () {
  openPopup(addPopup);
});

popups.forEach((popups) => {
  popups.addEventListener("mousedown", (evt) => {
    clickOnOverlay(evt);
  });
});
//попоп редактирования профиля
function profileFormSubmit(evt) {
  evt.preventDefault();
  profileTitleName.textContent = inputName.value;
  profileTitleJob.textContent = inputJob.value;
  closePopup(editPopup);
}
// Функция добовления карточки
function cardFormSubmit(evt) {
  evt.preventDefault();
  const newCard = creatCard(
    namePlace.value,
    linkUrl.value,
    deleteCard,
    likeCard,
    openImageClick,
  );
  placesList.prepend(newCard);
  closePopup(addPopup);
  cardForm.reset();
}
//слушатель попопа профиля
profileForm.addEventListener("submit", profileFormSubmit);
// Слушатель добовления карточки
cardForm.addEventListener("submit", cardFormSubmit);



