import { sendData } from "./api.js";

const formElement = document.querySelector('.img-upload__form');
const hashtagInputElement = formElement.querySelector('.text__hashtags');
const descriptionInputElement = formElement.querySelector('.text__description');

const getHashtagErrorMessage = (value) => {
  const hashtags = value.trim().toLowerCase().split(/\s+/);

  if (hashtags.length > 5) {
    return 'Можно указать не более 5 хэштегов';
  }
  if (hashtags.some((hashtag) => hashtag === '#')) {
    return 'Хэштег не может состоять только из одной решетки';
  }
  if (hashtags.some((hashtag) => !/^#[a-zа-яё0-9]{1,19}$/.test(hashtag))) {
    return 'Хэштег должен начинаться с # и содержать только буквы и цифры (до 20 символов)';
  }
  if (new Set(hashtags).size !== hashtags.length) {
    return 'Хэштеги не должны повторяться';
  }

  return '';
};

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

// Валидация хэштегов
const validateHashtags = (value) => { // хэштеги необязательны
  if (!value.trim()) {
    return true;
  }

  const hashtags = value.trim().toLowerCase().split(/\s+/); // регистр не учитывается, разделяется пробелами
  const uniqueHashtags = [];
  const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/; // начинается с #, строка состоит из букв и чисел, не может состоять только из решетки, длина 20 символов

  if (hashtags.length > 5) {
    return false;
  }

  for (const hashtag of hashtags) {
    if ((hashtag === '#') || (!hashtagPattern.test(hashtag)) || (uniqueHashtags.includes(hashtag))) {
      return false;
    }

    uniqueHashtags.push(hashtag);
  }

  return true;
};

// Валидация комментария
const validateDescription = (value) => value.length <= 140;

// если фокус находится в поле ввода хэштега или комментария, нажатие на Esc не должно приводить к закрытию формы редактирования изображения
const preventEscClose = (evt) => {
  if (evt.key === 'Escape' && (hashtagInputElement === document.activeElement || descriptionInputElement === document.activeElement)) {
    evt.stopPropagation();
  }
};

const validatePhotoEditForm = () => {
  pristine.addValidator(hashtagInputElement, validateHashtags, getHashtagErrorMessage);
  pristine.addValidator(descriptionInputElement, validateDescription, 'Комментарий не должен превышать 140 символов');

  hashtagInputElement.addEventListener('keydown', preventEscClose);
  descriptionInputElement.addEventListener('keydown', preventEscClose);

  formElement.addEventListener('submit', (evt) => {
    if (pristine.validate()) {
      const formData = new FormData(evt.target);
      sendData(formData);
    }
    if (!pristine.validate()) {
      evt.preventDefault();
    }
  });
};

export { validatePhotoEditForm };
