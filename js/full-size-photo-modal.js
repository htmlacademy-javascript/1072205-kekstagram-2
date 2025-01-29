import { createFullSizePhoto } from './create-full-size-photo.js';
import { clearComments } from './show-сomments.js';

const modalElement = document.querySelector('.big-picture');
const closeElement = modalElement.querySelector('.big-picture__cancel');
const thumbnailsContainerElement = document.querySelector('.pictures');

// Обработчик события нажатия клавиши Escape
function onEscapeDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    onModalClose();
  }
}

// Закрытие модального окна
function onModalClose() {
  modalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapeDown);
  clearComments();
}

// Открытие модального окна с полноразмерным фото
const openFullSizePhotoModal = (photos) => {
  thumbnailsContainerElement.addEventListener('click', (evt) => {
    if (evt.target.matches('.picture__img')) {
      const foundPhotoElement = photos.find((photo) => photo.id === Number(evt.target.dataset.photoId));

      evt.preventDefault();
      modalElement.classList.remove('hidden');
      document.body.classList.add('modal-open');
      createFullSizePhoto(foundPhotoElement);
    }

    document.addEventListener('keydown', onEscapeDown);
    closeElement.addEventListener('click', onModalClose);
  });
};

export { openFullSizePhotoModal };
