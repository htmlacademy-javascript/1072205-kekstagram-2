const fullSizePhotoElement = document.querySelector('.big-picture__preview');
const commentsListElement = fullSizePhotoElement.querySelector('.social__comments');
const commentLoaderElement = fullSizePhotoElement.querySelector('.social__comments-loader');
const commentItemElement = commentsListElement.querySelector('.social__comment');
const commentsShownElement = fullSizePhotoElement.querySelector('.social__comment-shown-count');

const START_QUANTITY_COMMENTS = 5;
const LOAD_QUANTITY = 5;
let showedComments = 0;
let comments = [];

// Создание одного комментария
const renderComment = ({ avatar, name, message }) => {
  const newCommentElement = commentItemElement.cloneNode(true);
  const commentAuthorElement = newCommentElement.querySelector('.social__picture');
  const commentTextElement = newCommentElement.querySelector('.social__text');

  commentAuthorElement.setAttribute('src', avatar);
  commentAuthorElement.setAttribute('alt', name);
  commentTextElement.textContent = message;

  return newCommentElement;
};

// Загрузка дополнительный комментариев
const uploadComments = () => {
  const remainingComments = comments.length - showedComments;
  const commentsToLoad = Math.min(LOAD_QUANTITY, remainingComments);

  for (let i = showedComments; i < showedComments + commentsToLoad; i++) {
    commentsListElement.appendChild(renderComment(comments[i]));
  }

  showedComments += commentsToLoad;
  commentsShownElement.textContent = showedComments;

  if (showedComments >= comments.length) {
    commentLoaderElement.classList.add('hidden');
  }
};

// Отображение начальных комментариев
const showComments = (newComments) => {
  comments = newComments;
  showedComments = Math.min(START_QUANTITY_COMMENTS, comments.length);

  for (let i = 0; i < showedComments; i++) {
    commentsListElement.appendChild(renderComment(comments[i]));
  }

  commentsShownElement.textContent = showedComments;
  commentLoaderElement.classList.add('hidden');

  if (showedComments < comments.length) {
    commentLoaderElement.classList.remove('hidden');
    commentLoaderElement.addEventListener('click', uploadComments);
  }
};


// Очистка списка комментариев
const clearComments = () => {
  commentsListElement.innerHTML = '';
  commentLoaderElement.removeEventListener('click', uploadComments);
};

export { showComments, clearComments };
