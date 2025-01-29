const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const formElement = document.querySelector('.img-upload__form');
const photoUploadInputElement = formElement.querySelector('.img-upload__input');
const imgUploadPrewiew = formElement.querySelector('.img-upload__preview img');
const templateElement = document.querySelector('#picture').content;
const container = document.querySelector('.pictures');

let currentFilter = ''; // Хранение текущего фильтра
let currentScale = 100; // Хранение текущего масштаба

// Обновление текущего фильтра при изменении
const updateFilter = (filter) => {
  currentFilter = filter;
  imgUploadPrewiew.style.filter = currentFilter;
};

// Обновление текущего масштаба
const updateScale = (scale) => {
  currentScale = scale;
  imgUploadPrewiew.style.setProperty('transform', `scale(${currentScale / 100})`);
};

const loadUserPhoto = () => {
  photoUploadInputElement.addEventListener('change', () => {
    const file = photoUploadInputElement.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      imgUploadPrewiew.setAttribute('src', URL.createObjectURL(file));
    }

    const effectsPreview = formElement.querySelectorAll('.effects__preview');
    for (const effect of effectsPreview) {
      effect.setAttribute('style', `background-image: url("${imgUploadPrewiew.src}");`);
    }
  });
};

const addUserPhoto = () => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const thumbnail = document.createDocumentFragment();
    const userPhoto = templateElement.cloneNode(true);
    const userPhotoElement = userPhoto.querySelector('.picture__img');

    userPhotoElement.setAttribute('src', imgUploadPrewiew.src);
    userPhotoElement.style.setProperty('filter', currentFilter || ''); // Применение текущего фильтра
    userPhotoElement.style.transform = `scale(${currentScale / 100})`; // Применение масштаба

    userPhoto.querySelector('.picture__likes').textContent = 0;
    userPhoto.querySelector('.picture__comments').textContent = 0;

    thumbnail.appendChild(userPhoto);
    container.appendChild(thumbnail);
  });
};

export { loadUserPhoto, addUserPhoto, updateFilter, updateScale };
