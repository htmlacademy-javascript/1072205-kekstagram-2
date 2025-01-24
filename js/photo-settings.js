import { updateFilter, updateScale } from './add-user-photo.js';

const image = document.querySelector('.img-upload__preview img');
const slider = document.querySelector('.effect-level');
const scaleControlValueElement = document.querySelector('.scale__control--value');

let scaleValue = parseFloat(scaleControlValueElement.value.replace('%', ''));

// Сброс настроек пользователького фото
const resetPhotoSettings = (currentFilter) => {
  scaleControlValueElement.setAttribute('value', '100%');
  image.setAttribute('style', `filter: ${currentFilter}(100%); transform: scale(1);`);
  image.setAttribute('class', 'effects__preview--none');
  scaleValue = 100;
  slider.classList.add('hidden');
};

// Изменение масштаба изображения
const editPhotoScale = () => {
  const scaleControlSmallerButtonElement = document.querySelector('.scale__control--smaller');
  const scaleControlBiggerButtonElement = document.querySelector('.scale__control--bigger');

  const ScaleOptions = {
    SCALE_STEP: 25,
    SCALE_MIN: 25,
    SCALE_MAX: 100,
  };

  // Функция обновления масштаба
  const updateScaleValue = () => {
    scaleControlValueElement.setAttribute('value', `${scaleValue}%`);
    image.style.setProperty('transform', `scale(${scaleValue / 100})`);
    updateScale(scaleValue);
  };

  // Обработчик события нажатия на кнопку уменьшения масштаба
  scaleControlSmallerButtonElement.addEventListener('click', () => {
    if (scaleValue > ScaleOptions.SCALE_MIN) {
      scaleValue -= ScaleOptions.SCALE_STEP;
      updateScaleValue();
    }
  });

  // Обработчик события нажатия на кнопку увеличения масштаба
  scaleControlBiggerButtonElement.addEventListener('click', () => {
    if (scaleValue < ScaleOptions.SCALE_MAX) {
      scaleValue += ScaleOptions.SCALE_STEP;
      updateScaleValue();
    }
  });
};

// Редактирование эффектов изображения
const editPhotoEffect = () => {
  const effectLevelContainerElement = document.querySelector('.img-upload__effect-level');
  const effectsListElement = document.querySelectorAll('.effects__radio');
  const effectLevelElement = document.querySelector('.effect-level__value');
  const sliderElement = document.querySelector('.effect-level__slider');

  // Инициализация слайдера
  noUiSlider.create(sliderElement, {
    start: [100],
    range: {
      'min': [0],
      'max': [100]
    },
    step: 1,
    connect: 'lower'
  });

  // Применение эффекта к изображению
  const applyEffect = (effectName, value) => {
    const effects = {
      chrome: `grayscale(${value / 100})`,
      sepia: `sepia(${value / 100})`,
      marvin: `invert(${value}%)`,
      phobos: `blur(${(value * 3) / 100}px)`,
      heat: `brightness(${1 + (value * 2) / 100})`,
      none: '',
    };

    const filterValue = effects[effectName];
    image.style.filter = filterValue;
    updateFilter(filterValue);
  };

  for (const effect of effectsListElement) {
    effectLevelContainerElement.classList.add('hidden');

    effect.addEventListener('change', () => {
      resetPhotoSettings(effect);

      image.classList.forEach((className) => {
        if (className.startsWith('effects__preview--')) {
          image.classList.remove(className);
        }
      });

      const effectName = effect.id.substring(7); // Получаем название эффекта
      image.classList.add(`effects__preview--${effectName}`);
      sliderElement.noUiSlider.set(100);
      effectLevelElement.setAttribute('value', 100);

      effectLevelContainerElement.classList.remove('hidden');
      applyEffect(effectName, 100);

      if (effectName === 'none') {
        effectLevelContainerElement.classList.add('hidden');
      }
    });
  }

  // Обработчик изменения положения ползунка на слайдере
  sliderElement.noUiSlider.on('update', (values, handle) => {
    const effectValue = values[handle];
    effectLevelElement.setAttribute('value', Math.round(effectValue));
    const selectedEffect = document.querySelector('.effects__radio:checked').getAttribute('id').substring(7);
    applyEffect(selectedEffect, effectValue);
  });
};

export { editPhotoScale, editPhotoEffect, resetPhotoSettings };
