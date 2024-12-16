import { getPhotoData } from './data.js';
import { getPhotoSettings } from './photo-settings.js';
import { getRandomUniqueNumbers, getRandomArrayElement, getRandomNumber } from './utils.js';

const createPhoto = () => {

  const generateCommentIds = getRandomUniqueNumbers(getPhotoSettings().CommentsIdQuantity.MIN, getPhotoSettings().CommentsIdQuantity.MAX);
  const generagePtohoIds = getRandomUniqueNumbers(getPhotoSettings().PhotosQuantity.MIN, getPhotoSettings().PhotosQuantity.MAX);
  const generatePhotoUrls = getRandomUniqueNumbers(getPhotoSettings().PhotosQuantity.MIN, getPhotoSettings().PhotosQuantity.MAX);

  const getCommentMessages = (messages) => {
    const array = [];
    for (let i = 1; i <= getRandomNumber(getPhotoSettings().MessagesForCommentQuantity.MIN, getPhotoSettings().MessagesForCommentQuantity.MAX); i++) {
      array.push(getRandomArrayElement(messages));
    }
    return array;
  };

  const createComment = () => ({
    id: generateCommentIds(),
    avatar: `img/avatar-${getRandomNumber(getPhotoSettings().AvatarsQuantity.MIN, getPhotoSettings().AvatarsQuantity.MAX)}.svg`,
    message: getCommentMessages(getPhotoData().MESSAGES).join(' '),
    name: getRandomArrayElement(getPhotoData().NAMES),
  });

  return {
    id: generagePtohoIds(),
    url: `photos/${generatePhotoUrls()}.jpg`,
    description: getPhotoData().DESCRIPTIONS[getRandomNumber(0, getPhotoData().DESCRIPTIONS.length - 1)],
    likes: getRandomNumber(getPhotoSettings().LikesQuantity.MIN, getPhotoSettings().LikesQuantity.MAX),
    comments: Array.from({length: getRandomNumber(getPhotoSettings().CommentsForPhotoQuantity.MIN, getPhotoSettings().CommentsForPhotoQuantity.MAX)}, createComment),
  };
};

export { createPhoto };


