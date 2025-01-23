import { updateFilter, updateScale } from './add-user-photo.js';

const image = document.querySelector('.img-upload__preview img');

// Изменение масштаба изображения
const editPhotoScale = () => {
  const scaleControlSmallerButtonElement = document.querySelector('.scale__control--smaller');
  const scaleControlBiggerButtonElement = document.querySelector('.scale__control--bigger');
  const scaleControlValueElement = document.querySelector('.scale__control--value');

  const ScaleOptions = {
    SCALE_STEP: 25,
    SCALE_MIN: 25,
    SCALE_MAX: 100,
  };

  // Получение текущего значения масштаба
  let scaleValue = parseFloat(scaleControlValueElement.value.replace('%', ''));

  // Функция обновления масштаба
  const updateScaleValue = () => {
    scaleControlValueElement.setAttribute('value', `${scaleValue}%`);
    image.style.setProperty('transform', `scale(${scaleValue / 100})`);
    updateScale(scaleValue); // Обновляем глобальное значение масштаба
  };

  // Обработчик события нажатия на кнопку уменьшения масштаба
  scaleControlSmallerButtonElement.addEventListener('click', () => {
    if (scaleValue > ScaleOptions.SCALE_MIN) {
      scaleValue -= ScaleOptions.SCALE_STEP;
      updateScaleValue();
    }
    scaleControlValueElement.setAttribute('value', `${scaleValue}%`);
    image.style.setProperty('transform', `scale(0.${scaleValue})`);
  });

  // Обработчик события нажатия на кнопку увеличения масштаба
  scaleControlBiggerButtonElement.addEventListener('click', () => {
    if (scaleValue < ScaleOptions.SCALE_MAX) {
      scaleValue += ScaleOptions.SCALE_STEP;
      updateScaleValue();
    }
    scaleControlValueElement.setAttribute('value', `${scaleValue}%`);
    image.setAttribute('style', scaleValue === ScaleOptions.SCALE_MAX ? 'transform: scale(1.00)' : `transform: scale(0.${scaleValue})`);
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
    let filterValue = '';

    if (effectName === 'chrome') {
      filterValue = `grayscale(${value / 100})`; // Для эффекта «Хром»
    }
    if (effectName === 'sepia') {
      filterValue = `sepia(${value / 100})`; // Для эффекта «Сепия»
    }
    if (effectName === 'marvin') {
      filterValue = `invert(${value}%)`; // Для эффекта «Марвин»
    }
    if (effectName === 'phobos') {
      filterValue = `blur(${(value * 3) / 100}px)`; // Для эффекта «Фобос»
    }
    if (effectName === 'heat') {
      filterValue = `brightness(${1 + (value * 2) / 100})`; // Для эффекта «Зной»
    }
    if (effectName === 'none') {
      filterValue = ''; // Для эффекта «Оригинал»
    }

    image.setAttribute('style', `filter: ${filterValue}`);
    image.style.filter = effectName;
    updateFilter(filterValue);
  };

  for (const effect of effectsListElement) {
    effectLevelContainerElement.classList.add('hidden');

    effect.addEventListener('change', () => {
      effect.setAttribute('checked', '');

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

export { editPhotoScale, editPhotoEffect };
