const DESCRIPTIONS = [
  'отель',
  'указатель "go to the beach"',
  'пляж',
  'девчуля и фотоаппарат',
  'весёлый супчик',
  'суперкар',
  'клубничка на тарелке',
  'сочок',
  'девчуля и самолёт',
  'обувь',
  'тропинка на пляже',
  'ауди',
  'какая-то еда',
  'котосуши',
  'прикольные тапки',
  'небо над горами',
  'оркестр',
  'шеви импала ❤️',
  'тапки с фонариками',
  'пальмы',
  'салатик',
  'морюшко на закате',
  'крабик',
  'концерт 🤘🏻',
  'страшно, очень страшно',
];

const NAMES = [
  'Алексей',
  'Дарья',
  'Пётр',
  'Мария',
  'Ярослав',
  'Иван',
  'Кристина',
  'Антон',
  'Андрей',
  'Татьяна',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const PhotosQuantity = {
  MIN: 1,
  MAX: 25,
};

const AvatarsQuantity = {
  MIN: 1,
  MAX: 6,
};

const CommentsIdQuantity = {
  MIN: 1,
  MAX: 1000,
};

const CommentsForPhotoQuantity = {
  MIN: 0,
  MAX: 30,
};

const MessagesForCommentQuantity = {
  MIN: 1,
  MAX: 2,
};

const LikesQuantity = {
  MIN: 15,
  MAX: 200,
};

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length - 1)];

const createRandomUniqueNumbers = (min, max) => {
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

const generateCommentIds = createRandomUniqueNumbers(CommentsIdQuantity.MIN, CommentsIdQuantity.MAX);
const generagePtohoIds = createRandomUniqueNumbers(PhotosQuantity.MIN, PhotosQuantity.MAX);
const generatePhotoUrls = createRandomUniqueNumbers(PhotosQuantity.MIN, PhotosQuantity.MAX);

const getCommentMessages = (messages) => {
  const array = [];
  for (let i = 1; i <= getRandomNumber(MessagesForCommentQuantity.MIN, MessagesForCommentQuantity.MAX); i++) {
    array.push(getRandomArrayElement(messages));
  }
  return array;
};

const createComment = () => ({
  id: generateCommentIds(),
  avatar: `img/avatar-${getRandomNumber(AvatarsQuantity.MIN, AvatarsQuantity.MAX)}.svg`,
  message: getCommentMessages(MESSAGES).join(' '),
  name: getRandomArrayElement(NAMES),
});


const createPhoto = () => ({
  id: generagePtohoIds(),
  url: `photos/${generatePhotoUrls()}.jpg`,
  description: DESCRIPTIONS[getRandomNumber(0, DESCRIPTIONS.length - 1)],
  likes: getRandomNumber(LikesQuantity.MIN, LikesQuantity.MAX),
  comments: Array.from({length: getRandomNumber(CommentsForPhotoQuantity.MIN, CommentsForPhotoQuantity.MAX)}, createComment),
});

const photos = Array.from({length: PhotosQuantity.MAX}, createPhoto);
