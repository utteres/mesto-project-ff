import {validationConfig} from '../index'
  
  //создание и удаление классов и содержания ошибок
  const showInputError = (
    formElement,
    inputElement,
    errorMessage,
    validationConfig
  ) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorClass);
  };
  
  const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    if (errorElement) {
      errorElement.classList.remove(validationConfig.errorClass);
      errorElement.textContent = "";
    }
  };
  
  //проверка валидности инпута
  const isValid = (formElement, inputElement, validationConfig) => {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
  
    if (!inputElement.validity.valid) {
      showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        validationConfig
      );
    } else {
      hideInputError(formElement, inputElement, validationConfig);
    }
  };
  
  //Привязка слушателей на все инпуты
  const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(
      formElement.querySelectorAll(validationConfig.inputSelector)
    );
    const buttonElement = formElement.querySelector(
      validationConfig.submitButtonSelector
    );
    toggleButtonState(inputList, buttonElement, validationConfig);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        isValid(formElement, inputElement, validationConfig);
        toggleButtonState(inputList, buttonElement, validationConfig);
      });
    });
  };
  
  // Привязка слушателя к формам
  const enableValidation = (validationConfig) => {
    const formList = Array.from(
      document.querySelectorAll(validationConfig.formSelector)
    );
  
    formList.forEach((formElement) => {
      setEventListeners(formElement, validationConfig);
    });
  };
  
  // Есть невалидный инпут?
  const hasInvalidInput = (inputList) => {
    return inputList.some((listItem) => {
      return !listItem.validity.valid;
    });
  };
  //отключение кнопки
  const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
  };
  //очистка классов ошибок
  function clearValidation(formElement, validationConfig) {
    const buttonElement = formElement.querySelector(
      validationConfig.submitButtonSelector
    );
    const inputList = Array.from(
      formElement.querySelectorAll(validationConfig.inputSelector)
    );
    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, validationConfig);
    });
    formElement.reset()
    toggleButtonState(inputList, buttonElement, validationConfig);
  }
  
  export { enableValidation, validationConfig, clearValidation }; 