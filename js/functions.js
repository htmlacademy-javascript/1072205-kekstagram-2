// Функция для проверки, является ли строка длиннее заданного числа

const isStringLonger = (string = '', maxLength = 1) => string.length <= maxLength;


// Функция для проверки, является ли строка палиндромом

const isPalindrom = (string = '') => {
  string = string.toLowerCase().replaceAll(' ', '');
  let reverseString = '';
  for (let i = 0; i < string.length; i++) {
    reverseString += string[string.length - 1 - i];
  }
  return string === reverseString;
}

// Функция для извлечения числа из строки

const extractNumber = (string) => {
  string = string.toString();
  let number = '';
  for (let i = 0; i < string.length; i++) {
    if (!isNaN(parseInt(string[i]))) {
      number += string[i];
    }
  }
  return parseInt(number);
}

console.log('\n--- Тесты для extractNumber---');
console.log(
  `Аргумент начинается с числа: ${extractNumber('2023 год') === 2023}`
);
console.log(
  `Аргумент заканчивается на число: ${
    extractNumber('ECMAScript 2022') === 2022
  }`
);
console.log(
  `Аргумент содержит несколько чисел, в том числе и с плавющей точкой: ${
    extractNumber('1 кефир, 0.5 батона') === 105
  }`
);
console.log(
  `Аргумент закначивается на число с нолями: ${
    extractNumber('агент 007') === 7
  }`
);
console.log(`Аргумент строка без чисел: ${isNaN(extractNumber('а я томат'))}`);
console.log(`Аргумент число: ${extractNumber(2023) === 2023}`);
console.log(`Аргумент отрицательное число: ${extractNumber(-1) === 1}`);
console.log(`Аргумент число с плавющей точкой: ${extractNumber(1.5) === 15}`);
