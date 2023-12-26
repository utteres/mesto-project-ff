function popupOpen(popupClassName){
 const popup =popupClassName;
 popup.classList.add("popup_is-animated");
 document.addEventListener('keydown', closeEsc);
 popup.classList.add("popup_is-opened");
}

function popupClose(popupClassName){
    const popup = popupClassName;
    popup.classList.remove("popup_is-opened");
    document.removeEventListener('keydown', closeEsc);
}

function closeEsc(evt){ 
    if (evt.key === 'Escape') { 
    popupClose(document.querySelector('.popup_is-opened')); 
  } 

}
 function clickOnOverlay(evt,popup){
    if(evt.target.matches('.popup_is-opened, .popup__close')){
        popupClose(popup);
    }
} 
    

 
export {popupOpen,popupClose,closeEsc,clickOnOverlay};