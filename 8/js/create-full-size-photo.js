import { showComments } from './show-сomments.js';

const fullSizePhotoElement = document.querySelector('.big-picture__preview');
const fullSizePhotoImageElement = fullSizePhotoElement.querySelector('.big-picture__img').querySelector('img');
const likesCountElement = fullSizePhotoElement.querySelector('.likes-count');
const captionElement = fullSizePhotoElement.querySelector('.social__caption');
const commentsQuantityElement = fullSizePhotoElement.querySelector('.social__comment-total-count');
const commentLoaderElement = document.querySelector('.big-picture__preview').querySelector('.social__comments-loader');
const commentsListElement = fullSizePhotoElement.querySelector('.social__comments');

const createFullSizePhoto = ({url, description, likes, comments}) => {
  fullSizePhotoImageElement.src = url;
  likesCountElement.textContent = likes;
  captionElement.textContent = description;
  commentsQuantityElement.textContent = comments.length;
  commentsListElement.innerHTML = '';

  commentLoaderElement.classList.remove('hidden');
  showComments(comments);
};

export { createFullSizePhoto };
