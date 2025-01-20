import { closeModal, onEscapeDown } from './photo-edit-modal.js';
import { pristine } from './photo-edit-form-validation.js';
import { cloneElement } from './utils.js';

const getData = () => {
  return fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json())
    .catch(() => {
      const errorTemplateElement = document.querySelector('#data-error').content;
      cloneElement(errorTemplateElement);
      setTimeout(() => {
        document.querySelector('.data-error').classList.add('hidden');
      }, 5000);
    });
};

const sendData = () => {
  const formElement = document.querySelector('.img-upload__form');
  const submitButtonElement = formElement.querySelector('.img-upload__submit');

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      const formData = new FormData(evt.target);
      submitButtonElement.disabled = true;

      fetch(
        'https://31.javascript.htmlacademy.pro/kekstagram',
        {
          method: 'POST',
          body: formData,
        }
        )
        .then((response) => {
          if (!response.ok) {
            throw new Error('Ошибка отправки данных'); // обработка ответа с ошибкой
          }
          closeModal(); // закрытие модального окна
          return response.json();
        })
        .then(() => { // показ сообщения об успешной загрузке фотографии
          const successMessageTemplateElement = document.querySelector('#success').content;
          cloneElement(successMessageTemplateElement);

          const successMessage = document.querySelector('.success');
          const successMessageCloseButtonElement = successMessage.querySelector('.success__button');

          successMessageCloseButtonElement.addEventListener('click', () => {
            successMessage.remove();
          });

          document.addEventListener('keydown', (keyPressed) => {
            if (keyPressed.key === 'Escape') {
              keyPressed.preventDefault();
              successMessage.remove();
            }
          });

          document.addEventListener('click', () => {
            if (!evt.target.closest('.success__inner')) {
              successMessage.remove();
            }
          });
        })
        .catch(() => { // показ сообщения об ошибке
          const errorMessageTemplateElement = document.querySelector('#error').content;
          cloneElement(errorMessageTemplateElement);

          const errorMessage = document.querySelector('.error');
          const errorMessageCloseButtonElement = errorMessage.querySelector('.error__button');

          document.removeEventListener('keydown', onEscapeDown);
          errorMessageCloseButtonElement.addEventListener('click', () => {
            errorMessage.remove();
          });

          document.addEventListener('keydown', (keyPressed) => {
            if (keyPressed.key === 'Escape') {
              keyPressed.preventDefault();
              errorMessage.remove();
              document.addEventListener('keydown', onEscapeDown);
            }
          });

          document.addEventListener('click', () => {
            if (!evt.target.closest('.error__inner')) {
              errorMessage.remove();
            }
          });
        })
        .finally(() => {
          submitButtonElement.disabled = false; // снятие блокировки кнопки
        });
    }
  });
};

export { getData, sendData };
