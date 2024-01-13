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
      likeFunction(cardData,  card);
  });
  return card;
}


// @todo: Функция лайка карточки
function likeCard(cardData, cardItem) {
  const likeBtn = cardItem.querySelector(".card__like-button");
  const likeCounter = cardItem.querySelector(".like_counter");
  const isLiked = likeBtn.classList.contains('card__like-button_is-active')
  const likeMethod = isLiked ? deletLikeCard : addLikeCard;
  console.log(likeMethod)
        likeMethod(cardData._id) 
        .then((res) => {
           likeCounter.textContent = res.likes.length; 
           likeBtn.classList.toggle("card__like-button_is-active"); 
        })
        .catch(err => console.log(err));
  } 


function isLikeMine(cardData, profileId) {
  return cardData.likes.some((item) => item._id === profileId);
}

export {
  creatCard,
  likeCard
};