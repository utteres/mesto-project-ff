const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-3',
  headers: {
    authorization: 'a90afcbc-8c1a-4f4b-b18e-3fd143504f86',
    'Content-Type': 'application/json'
  }
}

function testData(res) {
  if (res.ok) return res.json();
  return Promise.reject(`ошибка: ${res.status}`);
}

 const getCard =() => fetch(`${config.baseUrl}/cards`,{
  headers: config.headers
})
.then((res) => testData(res));


const getProfile = () => fetch(`${config.baseUrl}/users/me`,{
    headers: config.headers
  })
.then((res) => testData(res));

const patchEditProfile =(profileName, profileJob) => fetch(`${config.baseUrl}/users/me`,{
  method: "PATCH",
  headers: config.headers,
  body: JSON.stringify({
    name: profileName,
    about: profileJob
  })
})
.then((res) => testData(res));

const postNewCard = ( newCardName , newCardImg) => fetch(`${config.baseUrl}/cards`,{
  method: 'POST',
  headers: config.headers, 
  body: JSON.stringify({
    name: newCardName,
    link: newCardImg
  })
})
.then((res) => testData(res));

const removeCard = (cardId)=> fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,  
  })
.then((res) => testData(res));

const addLikeCard = (cardId) => fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
  method: "PUT",
  headers: {
    authorization: 'a90afcbc-8c1a-4f4b-b18e-3fd143504f86',
  },
})
.then((res) => testData(res));

const deletLikeCard = (cardId) => fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
  method: "DELETE",
  headers: config.headers,
})
.then((res) => testData(res));

const avatarUpdate = (avatar) => fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar }),
  })
  .then((res) => testData(res));

  export {getCard,config,getProfile, patchEditProfile, postNewCard, removeCard, addLikeCard , deletLikeCard, avatarUpdate};