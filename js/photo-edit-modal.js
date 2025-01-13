const formElement = document.querySelector('.img-upload__form');
const photoUploadInputElement = formElement.querySelector('.img-upload__input');
const modalElement = formElement.querySelector('.img-upload__overlay');
const closeElement = formElement.querySelector('.img-upload__cancel');

function onEscapeDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeModal();
  }
};

function closeModal () {
  modalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  photoUploadInputElement.value = '';
};

const openPhotoEditModal = () => {
  photoUploadInputElement.addEventListener('change', () => {
    modalElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
  })

  document.addEventListener('keydown', onEscapeDown);
  closeElement.addEventListener('click', closeModal);
};

export { openPhotoEditModal };
