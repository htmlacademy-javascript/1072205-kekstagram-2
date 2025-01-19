import { createThumbnails } from './create-thumbnails.js';
import { openFullSizePhotoModal } from './full-size-photo-modal.js';
import { closeModal } from './photo-edit-modal.js';
import { pristine } from './photo-edit-form-validation.js';
import { onEscapeDown } from './photo-edit-modal.js';

const getData = () => {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      createThumbnails(photos);
      openFullSizePhotoModal(photos);
    })
    .catch(() => {
      const errorTemplateElement = document.querySelector('#data-error').content;
      const fragmentElement = document.createDocumentFragment();
      const errorElement = errorTemplateElement.cloneNode(true);
      fragmentElement.appendChild(errorElement);
      document.body.appendChild(fragmentElement);
      setTimeout(() => {
        document.querySelector('.data-error').classList.add('hidden');
      }, 5000);
    });
};

const sendData = () => {
  const formElement = document.querySelector('.img-upload__form');
  const submitButtonElement = formElement.querySelector('.img-upload__submit');
  const successMessageTemplateElement = document.querySelector('#success').content;

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
          const fragmentElement = document.createDocumentFragment();
          const successMessageElement = successMessageTemplateElement.cloneNode(true);
          const successMessageCloseButtonElement = successMessageElement.querySelector('.success__button');

          fragmentElement.appendChild(successMessageElement);
          document.body.appendChild(fragmentElement);

          const successMessage = document.querySelector('.success');

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
          const fragmentElement = document.createDocumentFragment();
          const errorMessageElement = errorMessageTemplateElement.cloneNode(true);
          const errorMessageCloseButtonElement = errorMessageElement.querySelector('.error__button');

          fragmentElement.appendChild(errorMessageElement);
          document.body.appendChild(fragmentElement);
          document.removeEventListener('keydown', onEscapeDown);

          errorMessageCloseButtonElement.addEventListener('click', () => {
            document.querySelector('.error').remove();
          });

          document.addEventListener('keydown', (keyPressed) => {
            if (keyPressed.key === 'Escape') {
              keyPressed.preventDefault();
              document.querySelector('.error').classList.add('hidden');
              document.addEventListener('keydown', onEscapeDown);
            }
          });

          document.addEventListener('click', () => {
            if (!evt.target.closest('.error__inner')) {
              const errorMessage = document.querySelector('.error');
              if (errorMessage) {
                errorMessage.remove();
              }
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
