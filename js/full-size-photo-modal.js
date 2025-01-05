import { createFullSizePhoto } from './create-full-size-photo.js';

const modalElement = document.querySelector('.big-picture');
const closeElement = modalElement.querySelector('.big-picture__cancel');
const thumbnailsContainerElement = document.querySelector('.pictures');
const bodyElement = document.querySelector('body');

const onEscapeDown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeModal();
  };
};

const closeModal = () => {
  modalElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapeDown);
};

const openModal = (photos) => {
  thumbnailsContainerElement.addEventListener('click', (evt) => {
    if (evt.target.matches('.picture__img')) {
      const foundPhotoElement = photos.find((photo) => photo.id === Number(evt.target.dataset.photoId));

      evt.preventDefault();
      modalElement.classList.remove('hidden');
      bodyElement.classList.add('modal-open');
      createFullSizePhoto(foundPhotoElement);
    };

    document.addEventListener('keydown', onEscapeDown);
    closeElement.addEventListener('click', closeModal);
  });
};

export { openModal };
