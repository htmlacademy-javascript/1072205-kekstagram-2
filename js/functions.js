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
};

// Функция для извлечения числа из строки

const extractNumber = (string) => {
  string = string.toString();
  let number = '';
  for (let i = 0; i < string.length; i++) {
    if (!isNaN(parseInt(string[i], 10))) {
      number += string[i];
    }
  }
  return parseInt(number, 10);
};
