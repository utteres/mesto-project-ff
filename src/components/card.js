function creatCard(cardName, cardPicture , deleteFunction, likeFunction , imgFunction) {
  const template = document.querySelector('#card-template').content;
  const card = template.querySelector('.card').cloneNode(true);
  const description = card.querySelector('.card__description');
  const cardImg =card.querySelector('.card__image')

  cardImg.src = cardPicture;
  card.querySelector('.card__title').textContent = cardName;
  cardImg.alt = cardName;
//Слушитель лайка
  const like = card.querySelector('.card__like-button');
  like.addEventListener('click', likeFunction);
//Слушатель удаления карточка
  const deliteButton = card.querySelector('.card__delete-button');
  deliteButton.addEventListener('click', deleteFunction);
//Слушатель увеличения картинка 
  cardImg.addEventListener('click', imgFunction);
return card;
}
// @todo: Функция удаления карточки
function deleteCard(evt){
  evt.target.closest('.card').remove();
}

function likeCard(evt) {
  console.log(evt.target);
  evt.target.classList.toggle('card__like-button_is-active'); 
} 
  
  export {creatCard, deleteCard, likeCard};