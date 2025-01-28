import { updateFilter, updateScale } from './add-user-photo.js';

const image = document.querySelector('.img-upload__preview img');
const slider = document.querySelector('.effect-level');
const scaleControlValueElement = document.querySelector('.scale__control--value');

let scaleValue = parseFloat(scaleControlValueElement.value.replace('%', ''));

// Сброс настроек пользовательского фото
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

  // Инициализация значения масштаба
  scaleValue = ScaleOptions.SCALE_MAX; // Начальное значение (100%)
  scaleControlValueElement.value = `${scaleValue}%`; // Устанавливаем начальное значение в элемент масштаба

  // Функция обновления масштаба
  const updateScaleValue = () => {
    scaleControlValueElement.value = `${scaleValue}%`; // Устанавливаем значение в input
    image.style.setProperty('transform', `scale(${scaleValue / 100})`); // Меняем трансформацию изображения
    updateScale();
  };

  // Обработчик события нажатия на кнопку уменьшения масштаба
  scaleControlSmallerButtonElement.addEventListener('click', () => {
    if (scaleValue > ScaleOptions.SCALE_MIN) {
      scaleValue -= ScaleOptions.SCALE_STEP; // Уменьшаем масштаб
      updateScaleValue(); // Обновляем интерфейс и изображение
    }
  });

  // Обработчик события нажатия на кнопку увеличения масштаба
  scaleControlBiggerButtonElement.addEventListener('click', () => {
    if (scaleValue < ScaleOptions.SCALE_MAX) {
      scaleValue += ScaleOptions.SCALE_STEP; // Увеличиваем масштаб
      updateScaleValue(); // Обновляем интерфейс и изображение
    }
  });
};

// Редактирование эффектов изображения
const editPhotoEffect = () => {
  const effectLevelContainerElement = document.querySelector('.img-upload__effect-level');
  const effectsListElement = document.querySelectorAll('.effects__radio');
  const effectLevelElement = document.querySelector('.effect-level__value');
  const sliderElement = document.querySelector('.effect-level__slider');

  const effects = {
    chrome: {
      effect: (value) => `grayscale(${value})`,
      min: 0,
      max: 1,
      step: 0.1,
      start: 1,
    },
    sepia: {
      effect: (value) => `sepia(${value})`,
      min: 0,
      max: 1,
      step: 0.1,
      start: 1,
    },
    marvin: {
      effect: (value) => `invert(${value}%)`,
      min: 0,
      max: 100,
      step: 1,
      start: 100,
    },
    phobos: {
      effect: (value) => `blur(${value}px)`,
      min: 0,
      max: 3,
      step: 0.1,
      start: 3,
    },
    heat: {
      effect: (value) => `brightness(${value})`,
      min: 1,
      max: 3,
      step: 0.1,
      start: 3,
    },
    none: {
      effect: () => '',
    },
  };

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
    const effectConfig = effects[effectName];
    const filterValue = effectConfig.effect(value);
    image.style.filter = filterValue;
    updateFilter(filterValue);
  };

  const updateSliderOptions = (effectName) => {
    const effectConfig = effects[effectName];

    if (effectName === 'none') {
      effectLevelContainerElement.classList.add('hidden');
      sliderElement.noUiSlider.updateOptions({
        range: { min: 0, max: 100 },
        start: 100,
        step: 1,
      });
      return;
    }

    effectLevelContainerElement.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: { min: effectConfig.min, max: effectConfig.max },
      start: effectConfig.start,
      step: effectConfig.step,
    });
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

      updateSliderOptions(effectName);
      applyEffect(effectName, effects[effectName].start);
    });
  }

  // Обработчик изменения положения ползунка на слайдере
  sliderElement.noUiSlider.on('update', (values, handle) => {
    let effectValue = parseFloat(values[handle]);
    effectValue = Number.isInteger(effectValue) ? effectValue : effectValue.toFixed(1);
    effectLevelElement.setAttribute('value', effectValue);
    const selectedEffect = document.querySelector('.effects__radio:checked').getAttribute('id').substring(7);
    applyEffect(selectedEffect, effectValue);
  });
};

export { editPhotoScale, editPhotoEffect, resetPhotoSettings };
