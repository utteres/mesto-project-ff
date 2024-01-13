import "./index.css";
import {
    openPopup,
    closePopup,
    clickOnOverlay
} from "./components/modal.js";
import {
    creatCard,
    likeCard
} from "./components/card.js";
import {
    enableValidation,
    validationConfig,
    clearValidation,
} from "./components/validation";
import {
    getCard,
    config,
    getProfile,
    patchEditProfile,
    postNewCard,
    removeCard,
    avatarUpdate,
} from "./components/api.js";

const placesList = document.querySelector(".places__list");
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
const profileEditSave = profileForm.querySelector('.popup__button')
const newCardInput = document.querySelector('.popup__input_type_card-name');
const profileTitleName = document.querySelector(".profile__title");
const profileTitleJob = document.querySelector(".profile__description");
const profileAvatar = profile.querySelector(".profile__image");
const inputName = document.querySelector(".popup__input_type_name");
const inputJob = document.querySelector(".popup__input_type_description");

const cardForm = document.querySelector('.popup__form[name="new-place"]');
const newCardSave = cardForm.querySelector('.popup__button')
const linkUrl = cardForm.querySelector(".popup__input_type_url");
const namePlace = document.querySelector(".popup__input_type_card-name");

const popupAvatarChenge = document.querySelector(".popup_type_edit_avatar");
const popupAvatarButton = popupAvatarChenge.querySelector(".popup__button");
const popupAvatarForm = document.querySelector('.popup__form[name="avatar-change"]');
const popupAvatarLinkInput = popupAvatarForm.querySelector(".popup__input_type_url");

export let profileId = "";


Promise.all([getCard(), getProfile()])
    .then(([cardData, profileData]) => {
        profileId = profileData._id
        profileTitleName.textContent = profileData.name;
        profileTitleJob.textContent = profileData.about;
        profileAvatar.style.backgroundImage = `url(\\${profileData.avatar})`;
        cardData.forEach(card => {
            placesList.append(creatCard(card, profileId, deleteCard, likeCard, openImageClick));
        })
    })

// валидациz
enableValidation(validationConfig);
// увеличение изображения
function openImageClick(evt) {
    const card = evt.target.closest(".card");
    const cardImage = card.querySelector(".card__image");
    const cardTitle = card.querySelector(".card__title");
    imgBoxPopup.src = cardImage.src;
    imgBoxPopup.alt = cardTitle.textContent
    captionPopup.textContent = cardTitle.textContent;
    openPopup(boxPopup);
}
// удаление карточки
function deleteCard(card, cardId) {
    removeCard(cardId)
        .then(() => {
            card.remove()
        })
        .catch((error) => console.log("невозможно удалить/ removeMyCard", error));
}


profileEditButton.addEventListener("click", function() {
    openPopup(editPopup);
    inputName.value = profileTitleName.textContent;
    inputJob.value = profileTitleJob.textContent;
    clearValidation(profileForm, validationConfig);
});

profileAddButton.addEventListener("click", function() {
    openPopup(addPopup);
    cardForm.reset();
    clearValidation(cardForm, validationConfig);
});

popups.forEach((popups) => {
    popups.addEventListener("mousedown", (evt) => {
        clickOnOverlay(evt);
    });
});
//попоп редактирования профиля
function profileFormSubmit(evt) {
    evt.preventDefault();
    const btnText = profileEditSave.textContent;
    profileEditSave.textContent = "Сохранение...";
    patchEditProfile(inputName.value, inputJob.value)
        .then(profileData => {
            profileTitleName.textContent = profileData.name;
            profileTitleJob.textContent = profileData.about;
        })
        .catch((error) => console.log("не загрузились данные профиля ошибка:", error))
        .finally(() => (profileEditSave.textContent = btnText));
    clearValidation(profileForm, validationConfig);
    closePopup(editPopup);
}
// новая карточка
function cardFormSubmit(evt) {
    evt.preventDefault();
    const btnText = newCardSave.textContent;
    newCardSave.textContent = "Сохранение...";
    postNewCard(namePlace.value, linkUrl.value)
        .then((cards) => {
            const newCard = creatCard(cards, profileId, deleteCard, likeCard, openImageClick);
            placesList.prepend(newCard);
            closePopup(addPopup);
            cardForm.reset();
        })
        .catch((error) => console.log("данные карточки не ошибка", error))
        .finally(() => (newCardSave.textContent = btnText));
    clearValidation(cardForm, validationConfig);
}
// обновление аватарки
function changeAvatarFormSubmit(evt) {
    evt.preventDefault();
    const BtnText = popupAvatarButton.textContent;
    popupAvatarButton.textContent = "Сохранение...";
    avatarUpdate(popupAvatarLinkInput.value)
        .then((profileData) => {
            profileAvatar.style.backgroundImage = `url(\\${profileData.avatar})`;
            closePopup(popupAvatarChenge);
        })
        .catch((error) => console.log("Аватарка не загрузилась ошибка", error))
        .finally(() => (popupAvatarButton.textContent = BtnText));
    clearValidation(popupAvatarForm, validationConfig);
}


profileAvatar.addEventListener("click", () => {
    popupAvatarLinkInput.value = profileAvatar.style.backgroundImage.replace(
        /url\(["']?(.*?)["']?\)/,
        "$1"
    );
    openPopup(popupAvatarChenge);
    clearValidation(popupAvatarForm, validationConfig);
});

popupAvatarForm.addEventListener("submit", changeAvatarFormSubmit);
//слушатель попопа профиля
profileForm.addEventListener("submit", profileFormSubmit);
// Слушатель добовления карточки
cardForm.addEventListener("submit", cardFormSubmit);