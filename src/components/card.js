import {
  addLikeCard,
  deletLikeCard
} from "./api";

function creatCard(cardData, profileId, deleteFunction, likeFunction, imgFunction) {
  const template = document.querySelector('#card-template').content;
  const card = template.querySelector('.card').cloneNode(true);
  const description = card.querySelector('.card__description');
  const cardImg = card.querySelector('.card__image')
  const likeCouter = card.querySelector('.like_counter')
  const like = card.querySelector('.card__like-button');
  const deliteButton = card.querySelector('.card__delete-button');
  cardImg.src = cardData.link;
  card.querySelector('.card__title').textContent = cardData.name;
  cardImg.alt = cardData.name;
  likeCouter.textContent = cardData.likes.length;
  card.id = cardData["_id"];
  if (profileId !== cardData.owner["_id"]) {
      deliteButton.remove()
  } else {
      deliteButton.addEventListener("click", () => {
          deleteFunction(card, cardData._id);

      })
  }

  if (isLikeMine(cardData, profileId)) {
      like.classList.add("card__like-button_is-active");
  } else {
      like.classList.remove("card__like-button_is-active");
  }

  //Слушатель увеличения картинка 
  cardImg.addEventListener('click', imgFunction);

  like.addEventListener("click", () => {
      likeFunction(cardData, profileId, card);
  });
  return card;
}


// @todo: Функция лайка карточки
function likeCard(cardData, profileId, cardItem) {
  const likeBtn = cardItem.querySelector(".card__like-button");
  const likeCounter = cardItem.querySelector(".like_counter");
  if (isLikeMine(cardData, profileId)) {
      deletLikeCard(cardData._id)
          .then((res) => {
              likeCounter.textContent = res.likes.length;
              likeBtn.classList.remove("card__like-button_is-active");
              cardData.likes = res.likes;
          })
          .catch((error) => {
              console.error("doh", error);
          });
  } else {
      addLikeCard(cardData._id)
          .then((res) => {
              likeCounter.textContent = res.likes.length;
              likeBtn.classList.add("card__like-button_is-active");
              cardData.likes = res.likes;
          })
          .catch((error) => {
              console.log("auch", error);
          });
  }
}

function isLikeMine(cardData, profileId) {
  return cardData.likes.some((item) => item._id === profileId);
}

export {
  creatCard,
  likeCard
};