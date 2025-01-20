const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];

const getRandomUniqueNumber = (min, max) => {
  const ids = [];
  return () => {
    let randomNumber = getRandomNumber(min, max);
    if (ids.length >= (max - min + 1)) {
      return null;
    }
    while (ids.includes(randomNumber)) {
      randomNumber = getRandomNumber(min, max);
    }
    ids.push(randomNumber);
    return randomNumber;
  };
};

const cloneElement = (template) => {
  const fragmentElement = document.createDocumentFragment();
  const newElement = template.cloneNode(true);
  fragmentElement.appendChild(newElement);
  document.body.appendChild(fragmentElement);
}

export { getRandomNumber, getRandomArrayElement, getRandomUniqueNumber, cloneElement  };
