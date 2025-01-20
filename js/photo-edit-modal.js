import { validatePhotoEditForm } from './photo-edit-form-validation.js';
import { editPhotoScale, editPhotoEffect } from './photo-settings.js';

const formElement = document.querySelector('.img-upload__form');
const photoUploadInputElement = formElement.querySelector('.img-upload__input');
const modalElement = formElement.querySelector('.img-upload__overlay');
const closeElement = formElement.querySelector('.img-upload__cancel');
const hashtagInputElement = formElement.querySelector('.text__hashtags');
const descriptionInputElement = formElement.querySelector('.text__description');

const clearForm = () => {
  photoUploadInputElement.value = '';
  hashtagInputElement.value = '';
  descriptionInputElement.value = '';
};

function onEscapeDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeModal();
  }
}

function closeModal() {
  modalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscapeDown);
  clearForm();
}

const openPhotoEditModal = () => {
  photoUploadInputElement.addEventListener('change', () => {
    modalElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
  });

  document.addEventListener('keydown', onEscapeDown);
  closeElement.addEventListener('click', closeModal);
  validatePhotoEditForm();
  editPhotoScale();
  editPhotoEffect();
};

export { openPhotoEditModal, closeModal, onEscapeDown };
