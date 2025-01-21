import { onEscapeDown } from './photo-edit-modal.js';

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

const showMessage = (templateSelector, messageClass, buttonSelector) => {
  const templateElement = document.querySelector(templateSelector).content;
  cloneElement(templateElement);
  const message = document.querySelector(messageClass);
  const closeButton = message.querySelector(buttonSelector);

  closeUserMessage(closeButton, message, messageClass);
};

const showSendSuccessMessage = () => {
  showMessage('#success', '.success', '.success__button');
};

const showSendErrorMessage = () => {
  document.removeEventListener('keydown', onEscapeDown); // Отключить глобальный обработчик
  showMessage('#error', '.error', '.error__button');
};

export { getRandomNumber, getRandomArrayElement, getRandomUniqueNumber, cloneElement, showLoadErrorMessage, showSendSuccessMessage, showSendErrorMessage, onEscapeDown };
