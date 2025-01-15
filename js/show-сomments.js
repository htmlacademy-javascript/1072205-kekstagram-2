const fullSizePhotoElement = document.querySelector('.big-picture__preview');
const commentsListElement = fullSizePhotoElement.querySelector('.social__comments');
const commentLoaderElement = fullSizePhotoElement.querySelector('.social__comments-loader');
const commentItemElement = commentsListElement.querySelector('.social__comment');
const commentsShownElement = fullSizePhotoElement.querySelector('.social__comment-shown-count');

const startQuantityComments = 5;
const loadQuantity = 5;
let showedComments = 0;
let comments = [];

// Функция для рендеринга одного комментария
const renderComment = ({ avatar, name, message }) => {
  const newCommentElement = commentItemElement.cloneNode(true);
  const commentAuthorElement = newCommentElement.querySelector('.social__picture');
  const commentTextElement = newCommentElement.querySelector('.social__text');

  commentAuthorElement.setAttribute('src', avatar);
  commentAuthorElement.setAttribute('alt', name);
  commentTextElement.textContent = message;

  return newCommentElement;
};

// Функция для загрузки дополнительных комментариев
const uploadComments = () => {
  const remainingComments = comments.length - showedComments;
  const commentsToLoad = Math.min(loadQuantity, remainingComments);

  for (let i = showedComments; i < showedComments + commentsToLoad; i++) {
    commentsListElement.appendChild(renderComment(comments[i]));
  }

  showedComments += commentsToLoad;
  commentsShownElement.textContent = showedComments;

  if (showedComments >= comments.length) {
    commentLoaderElement.classList.add('hidden');
  }
};

// Функция для отображения начальных комментариев
const showComments = (newComments) => {
  comments = newComments;
  showedComments = Math.min(startQuantityComments, comments.length);

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

// Функция для очистки списка комментариев
const clearComments = () => {
  commentsListElement.innerHTML = '';
  commentLoaderElement.removeEventListener('click', uploadComments);
};

export { showComments, clearComments };
