import { validatePhotoEditForm, pristine } from './photo-edit-form-validation.js';
import { editPhotoScale, editPhotoEffect } from './photo-settings.js';
import { showSendSuccessMessage, showSendErrorMessage } from './utils.js';
import { sendData } from './api.js';

const formElement = document.querySelector('.img-upload__form');
const photoUploadInputElement = formElement.querySelector('.img-upload__input');
const modalElement = formElement.querySelector('.img-upload__overlay');
const closeElement = formElement.querySelector('.img-upload__cancel');
const submitButtonElement = formElement.querySelector('.img-upload__submit');

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
  formElement.reset();
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

const configureFormSubmit = () => {
  formElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if (pristine.validate()) {
      const formData = new FormData(evt.target);
      submitButtonElement.setAttribute('disabled', 'true');

      sendData(formData)
        .then(() => {
          closeModal();
          showSendSuccessMessage();
        })
        .catch(() => {
          showSendErrorMessage(false);
        })
        .finally(submitButtonElement.removeAttribute('disabled', ''));
    }
  });
};

export { openPhotoEditModal, closeModal, onEscapeDown, configureFormSubmit };


