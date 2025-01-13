const formElement = document.querySelector('.img-upload__form');
const hashtagInputElement = formElement.querySelector('.text__hashtags');
const descriptionInputElement = formElement.querySelector('.text__description');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

// Валидация хэштегов
const validateHashtags = (value) => {
  if (!value.trim()) return true; // хэштеги необязательны

  const hashtags = value.trim().toLowerCase().split(/\s+/); // регистр не учитывается, разделяется пробелами
  const uniqueHashtags = [];
  const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/; // начинается с #, строка состоит из букв и чисел, не может состоять только из решетки, длина 20 символов

  if (hashtags.length > 5) { // нельзя указать больше пяти хэштегов
    return 'Можно указать не более 5 хэштегов';
  }

  for (const hashtag of hashtags) {
    if (hashtag === '#') {
      return 'Хэштег не может состоять только из одной решетки';
    }
    if (!hashtagPattern.test(hashtag)) {
      return 'Хэштег должен начинаться с # и содержать только буквы и цифры (до 20 символов)';
    }
    if (uniqueHashtags.includes(hashtag)) {
      return 'Хэштеги не должны повторяться';
    }
    uniqueHashtags.push(hashtag);
  }

  return true;
};

// === Валидация комментария ===
const validateDescription = (value) => {
  if (value.length > 140) { // длина комментария не может составлять больше 140 символов
    return 'Комментарий не должен превышать 140 символов';
  }
  return true;
};

// если фокус находится в поле ввода хэштега или комментария, нажатие на Esc не должно приводить к закрытию формы редактирования изображения
const preventEscClose = (evt) => {
  if (evt.key === 'Escape' && (hashtagInputElement === document.activeElement || descriptionInputElement === document.activeElement)) {
    evt.stopPropagation();
  }
};

pristine.addValidator(
  hashtagInputElement,
  (value) => validateHashtags(value) === true,
  (value) => validateHashtags(value)
);

pristine.addValidator(
  descriptionInputElement,
  (value) => validateDescription(value) === true,
  (value) => validateDescription(value)
);

hashtagInputElement.addEventListener('keydown', preventEscClose);
descriptionInputElement.addEventListener('keydown', preventEscClose);

// === Обработка отправки формы ===
formElement.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

export { pristine };





