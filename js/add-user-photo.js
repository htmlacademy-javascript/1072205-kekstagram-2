const formElement = document.querySelector('.img-upload__form');
const photoUploadInputElement = formElement.querySelector('.img-upload__input');
const imgUploadPrewiew = formElement.querySelector('.img-upload__preview img');
const templateElement = document.querySelector('#picture').content;

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const loadUserPhoto = () => {
  photoUploadInputElement.addEventListener('change', () => {
    const file = photoUploadInputElement.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      imgUploadPrewiew.setAttribute('src', URL.createObjectURL(file));
    }
  });
};

const addUserPhoto = () => {
  const thumbnail = document.createDocumentFragment();
  const userPhoto = templateElement.cloneNode(true);
  const userPhotoElement = userPhoto.querySelector('.picture__img');
  const container = document.querySelector('.pictures');

  formElement.addEventListener('submit', () => {
    userPhotoElement.setAttribute('src', imgUploadPrewiew.src);
    userPhoto.querySelector('.picture__likes').textContent = 0;
    userPhoto.querySelector('.picture__comments').textContent = 0;
    thumbnail.appendChild(userPhoto);
    container.appendChild(thumbnail);
  });
};

export { loadUserPhoto, addUserPhoto };
