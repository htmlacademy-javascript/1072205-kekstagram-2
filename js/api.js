import { createThumbnails } from "./create-thumbnails.js";
import { openFullSizePhotoModal } from "./full-size-photo-modal.js";
import { closeModal } from "./photo-edit-modal.js";

const getData = () => {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {
    createThumbnails(photos);
    openFullSizePhotoModal(photos);
  })
  .catch((error) => {
    console.log(error);
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

const sendData = (formData) => {
  const formElement = document.querySelector('.img-upload__form');
  formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
  });
  fetch(
    'https://31.javascript.htmlacademy.pro/kekstagram',
    {
      method: 'POST',
      body: formData,
    },
  )
  .then(() => {
    document.querySelector('.img-upload__submit').disabled = true;
  })
  .then(() => {
    closeModal();
  })
  .then(() => {
    const successTemplateElement = document.querySelector('#success').content;
    const fragment = document.createDocumentFragment();
    const successElement = successTemplateElement.cloneNode(true);
    fragment.appendChild(successElement);
    document.body.appendChild(fragment);
  })
  .then(() => {
    const coolButton = document.querySelector('.success__button');
    coolButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      document.querySelector('.success').classList.add('hidden');
      closeModal();
    })
  })
};

export { getData, sendData };
