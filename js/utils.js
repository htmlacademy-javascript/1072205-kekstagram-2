import { onEscapeDown } from './full-size-photo-modal.js';

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];

const getRandomUniqueNumber = (min, max) => {
  const ids = [];
  return () => {
    let randomNumber = getRandomNumber(min, max);
    if (ids.length >= (max - min + 1)) {
      return null;
    }
    while (ids.includes(randomNumber)) {
      randomNumber = getRandomNumber(min, max);
    }
    ids.push(randomNumber);
    return randomNumber;
  };
};

const cloneElement = (template) => {
  const fragmentElement = document.createDocumentFragment();
  const newElement = template.cloneNode(true);
  fragmentElement.appendChild(newElement);
  document.body.appendChild(fragmentElement);
};

const showLoadErrorMessage = () => {
  const errorTemplateElement = document.querySelector('#data-error').content;
  const errorShowTime = 5000;

  cloneElement(errorTemplateElement);
  setTimeout(() => {
    document.querySelector('.data-error').classList.add('hidden');
  }, errorShowTime);
};

const closeUserMessage = (button, message, type) => {
  button.addEventListener('click', () => {
    message.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      message.remove();
      document.addEventListener('keydown', onEscapeDown);
    }
  });

  document.addEventListener('click', (evt) => {
    if (!evt.target.matches(type)) {
      message.remove();
    }
  });
};

const showSendSuccessMessage = () => {
  const successMessageTemplateElement = document.querySelector('#success').content;
  cloneElement(successMessageTemplateElement);

  const successMessage = document.querySelector('.success');
  const successMessageCloseButtonElement = successMessage.querySelector('.success__button');

  closeUserMessage(successMessageCloseButtonElement, successMessage, '.success');
};

const showSendErrorMessage = () => {
  const errorMessageTemplateElement = document.querySelector('#error').content;
  cloneElement(errorMessageTemplateElement);

  const errorMessage = document.querySelector('.error');
  const errorMessageCloseButtonElement = errorMessage.querySelector('.error__button');

  document.removeEventListener('keydown', onEscapeDown);
  closeUserMessage(errorMessageCloseButtonElement, errorMessage, '.error');
};

export { getRandomNumber, getRandomArrayElement, getRandomUniqueNumber, cloneElement, showLoadErrorMessage, showSendSuccessMessage, showSendErrorMessage, onEscapeDown };
