import { onEscapeDown } from './photo-edit-modal.js';

// Генерация случайного целого числа в заданном диапазоне
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Выбор случайного элемента из массива
const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];

// Генерации уникальных случайных чисел в заданном диапазоне и количестве
const getRandomUniqueNumbers = (min, max, count) => {
  const numbers = [];

  while (numbers.length < count) {
    const randomNumber = getRandomNumber(min, max);
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }

  return numbers;
};

// Клонирование элемента
const cloneElement = (template) => {
  const fragmentElement = document.createDocumentFragment();
  const newElement = template.cloneNode(true);
  fragmentElement.appendChild(newElement);
  document.body.appendChild(fragmentElement);
};

// Показывает сообщение об ошибке при загрузке данных
const showLoadErrorMessage = () => {
  const errorTemplateElement = document.querySelector('#data-error').content;
  const errorShowTime = 5000;

  cloneElement(errorTemplateElement);
  setTimeout(() => {
    document.querySelector('.data-error').classList.add('hidden');
  }, errorShowTime);
};

// Закрытие пользвательских сообщений
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
    if (!event.target.closest('[class*="inner"]')) {
      message.remove();
    }
  });
};

// Отображение сообщений для пользователя
const showMessage = (templateSelector, messageClass, buttonSelector) => {
  const templateElement = document.querySelector(templateSelector).content;
  cloneElement(templateElement);
  const message = document.querySelector(messageClass);
  const closeButton = message.querySelector(buttonSelector);

  closeUserMessage(closeButton, message, messageClass);
};

//  Отображение сообщения об успешной отправке данных
const showSendSuccessMessage = () => {
  showMessage('#success', '.success', '.success__button');
};

//  Отображение сообщения об ошибке при отправке данных
const showSendErrorMessage = () => {
  document.removeEventListener('keydown', onEscapeDown); // Отключить глобальный обработчик
  showMessage('#error', '.error', '.error__button');
};

// Предотвращение лишних вызовов функций
function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { getRandomNumber, getRandomArrayElement, getRandomUniqueNumbers, showLoadErrorMessage, showSendSuccessMessage, showSendErrorMessage, cloneElement, debounce  };
