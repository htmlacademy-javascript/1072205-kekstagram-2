import { createThumbnails } from "./create-thumbnails.js";
import { openFullSizePhotoModal } from "./full-size-photo-modal.js";


const getData = () => {
  fetch('https://31.javascript.htmlacademy.pro/kekstagram/datas')
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

const sendData = () => {

};

export { getData, sendData };
