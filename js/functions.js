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

// Функция, определяющая, выходит встреча за рамки рабочего времени или нет

const isDelayAtWork = (starWorkDayTime, endWorkDayTime, startMeetingTime, meetingTime) => {
  const toNumber = (time) => {
    const [hours, minutes] = time.split(':');
    return hours * 60 + Number(minutes);
  };

  const startDay = toNumber(starWorkDayTime);
  const endDay = toNumber(endWorkDayTime);
  const startMeeting = toNumber(startMeetingTime);

  if (startDay > startMeeting || endDay <= startMeeting || meetingTime > (endDay - startMeeting)) {
    return false;
  }

  return true;
};
