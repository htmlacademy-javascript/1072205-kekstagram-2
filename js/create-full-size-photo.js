const fullSizePhotoElement = document.querySelector('.big-picture__preview');
const fullSizePhotoImageElement = fullSizePhotoElement.querySelector('.big-picture__img').querySelector('img');
const likesCountElement = fullSizePhotoElement.querySelector('.likes-count');
const captionElement = fullSizePhotoElement.querySelector('.social__caption');
const commentsQuantityElement = fullSizePhotoElement.querySelector('.social__comment-total-count');
const commentsShownElement = fullSizePhotoElement.querySelector('.social__comment-shown-count');
const commentsListElement = fullSizePhotoElement.querySelector('.social__comments');
const commentItemElement = commentsListElement.querySelector('.social__comment');

const showComments = (comments) => {
  const fragmentElement = document.createDocumentFragment();

  comments.forEach((comment) => {
    const newCommentElement = commentItemElement.cloneNode(true);
    const commentAuthorElement = newCommentElement.querySelector('.social__picture');
    const commentTextElement = newCommentElement.querySelector('.social__text');

    commentAuthorElement.src = comment.avatar;
    commentAuthorElement.alt = comment.name;
    commentTextElement.textContent = comment.message;
    fragmentElement.appendChild(newCommentElement);
  });

  commentsListElement.innerHTML = '';
  commentsListElement.appendChild(fragmentElement);
};

const createFullSizePhoto = ({url, description, likes, comments}) => {
  fullSizePhotoImageElement.src = url;
  likesCountElement.textContent = likes;
  captionElement.textContent = description;
  commentsQuantityElement.textContent = comments.length;
  commentsShownElement.textContent = comments.length;

  showComments(comments);
};

export {createFullSizePhoto};
