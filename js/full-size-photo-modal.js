import { createFullSizePhoto } from './create-full-size-photo.js';

const modalElement = document.querySelector('.big-picture');
const closeElement = modalElement.querySelector('.big-picture__cancel');
const thumbnailsContainerElement = document.querySelector('.pictures');
const commentCountElement = modalElement.querySelector('.social__comment-count');
const commentsLoaderElement = modalElement.querySelector('.comments-loader');
const bodyElement = document.querySelector('body');

const closeModal = () => {
  closeElement.addEventListener('click', () => {
    modalElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      modalElement.classList.add('hidden');
      bodyElement.classList.remove('modal-open');
    }
  });
};

const openModal = (photos) => {
  thumbnailsContainerElement.addEventListener('click', (evt) => {
    if (evt.target.matches('.picture__img')) {
      const foundPhotoElement = photos.find((photo) => photo.id === Number(evt.target.dataset.photoId));

      evt.preventDefault();
      modalElement.classList.remove('hidden');
      commentCountElement.classList.add('hidden');
      commentsLoaderElement.classList.add('hidden');
      bodyElement.classList.add('modal-open');
      createFullSizePhoto(foundPhotoElement);
    }

    closeModal();

  });
};

export { openModal };
