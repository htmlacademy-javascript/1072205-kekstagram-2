const image = document.querySelector('.img-upload__preview img');

const editPhotoScale = () => {
  const scaleControlSmallerButtonElement = document.querySelector('.scale__control--smaller');
  const scaleControlBiggerButtonElement = document.querySelector('.scale__control--bigger');
  const scaleControlValueElement = document.querySelector('.scale__control--value');
  const scaleStep = 25;
  const scaleMin = 25;
  const scaleMax = 100;

  let scaleValue = parseFloat(scaleControlValueElement.value.replace('%', ''));

  scaleControlSmallerButtonElement.addEventListener('click', () => {
    if (scaleValue > scaleMin) {
      scaleValue -= scaleStep;
    }
    scaleControlValueElement.setAttribute('value', `${scaleValue}%`);
    image.style.setProperty('transform', `scale(0.${scaleValue})`);
  });

  scaleControlBiggerButtonElement.addEventListener('click', () => {
    if (scaleValue < scaleMax) {
      scaleValue += scaleStep;
    }
    scaleControlValueElement.setAttribute('value', `${scaleValue}%`);
    image.setAttribute('style', scaleValue === scaleMax ? 'transform: scale(1.00)' : `transform: scale(0.${scaleValue})`);
  });
};

const editPhotoEffect = () => {
  const effectLevelContainerElement = document.querySelector('.img-upload__effect-level');
  const effectsListElement = document.querySelectorAll('.effects__radio');
  const effectLevelElement = document.querySelector('.effect-level__value');
  const sliderElement = document.querySelector('.effect-level__slider');

  noUiSlider.create(sliderElement, {
    start: [100],
    range: {
      'min': [0],
      'max': [100]
    },
    step: 1,
    connect: 'lower'
  });

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

  sliderElement.noUiSlider.on('update', (values, handle) => {
    const effectValue = values[handle];
    effectLevelElement.setAttribute('value', Math.round(effectValue));
    const selectedEffect = document.querySelector('.effects__radio:checked').getAttribute('id').substring(7);
    applyEffect(selectedEffect, effectValue);
  });
};

export { editPhotoScale, editPhotoEffect };
