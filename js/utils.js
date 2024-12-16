const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];

const getRandomUniqueNumbers = (min, max) => {
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

export { getRandomNumber, getRandomArrayElement, getRandomUniqueNumbers };
