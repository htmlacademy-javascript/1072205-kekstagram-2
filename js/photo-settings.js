const image = document.querySelector('.img-upload__preview img');

// Изменение масштаба изображения
const editPhotoScale = () => {
  const scaleControlSmallerButtonElement = document.querySelector('.scale__control--smaller');
  const scaleControlBiggerButtonElement = document.querySelector('.scale__control--bigger');
  const scaleControlValueElement = document.querySelector('.scale__control--value');
  const SCALE_STEP = 25;
  const SCALE_MIN = 25;
  const SCALE_MAX = 100;

  // Получение текущего значения масштаба
  let scaleValue = parseFloat(scaleControlValueElement.value.replace('%', ''));

  // Обработчик события нажатия на кнопку уменьшения масштаба
  scaleControlSmallerButtonElement.addEventListener('click', () => {
    if (scaleValue > SCALE_MIN) {
      scaleValue -= SCALE_STEP;
    }
    scaleControlValueElement.setAttribute('value', `${scaleValue}%`);
    image.style.setProperty('transform', `scale(0.${scaleValue})`);
  });

  // Обработчик события нажатия на кнопку увеличения масштаба
  scaleControlBiggerButtonElement.addEventListener('click', () => {
    if (scaleValue < SCALE_MAX) {
      scaleValue += SCALE_STEP;
    }
    scaleControlValueElement.setAttribute('value', `${scaleValue}%`);
    image.setAttribute('style', scaleValue === SCALE_MAX ? 'transform: scale(1.00)' : `transform: scale(0.${scaleValue})`);
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
    if (effectName === 'chrome') {
      image.setAttribute('style', `filter: grayscale(${value / 100})`); // Для эффекта «Хром»
    }
    if (effectName === 'sepia') {
      image.setAttribute('style', `filter: sepia(${value / 100})`); // Для эффекта «Сепия»
    }
    if (effectName === 'marvin') {
      image.setAttribute('style', `filter: invert(${value}%)`); // Для эффекта «Марвин»
    }
    if (effectName === 'phobos') {
      image.setAttribute('style', `filter: blur(${(value * 3) / 100}px)`); // Для эффекта «Фобос»
    }
    if (effectName === 'heat') {
      image.setAttribute('style', `filter: brightness(${1 + (value * 2) / 100})`); // Для эффекта «Зной»
    }
    if (effectName === 'none') {
      image.setAttribute('style', ''); // Для эффекта «Оригинал»
    }
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

      image.classList.add(`effects__preview--${effect.id.substring(7)}`);
      sliderElement.noUiSlider.set(100);
      effectLevelElement.setAttribute('value', 100);

      effectLevelContainerElement.classList.remove('hidden');
      applyEffect(effect.getAttribute('id').substring(7), 100);

      if (effect.getAttribute('id') === 'effect-none') {
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
