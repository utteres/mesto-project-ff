function openPopup(popup){
    popup.classList.add("popup_is-animated");
    document.addEventListener('keydown', closeEsc);
    popup.classList.add("popup_is-opened");
}

function closePopup(popup){
    popup.classList.remove("popup_is-opened");
    document.removeEventListener('keydown', closeEsc);
}

function closeEsc(evt){ 
    if (evt.key === 'Escape') { 
        closePopup(document.querySelector('.popup_is-opened'));
    } 

}
 function clickOnOverlay(evt){
    if (evt.target.matches('.popup_is-opened, .popup__close')){ 
        closePopup(evt.currentTarget); 
    }
}

    

 
export {openPopup,closePopup,closeEsc,clickOnOverlay};