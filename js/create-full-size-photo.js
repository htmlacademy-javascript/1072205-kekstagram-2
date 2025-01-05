const fullSizePhotoElement = document.querySelector('.big-picture__preview');
const fullSizePhotoImageElement = fullSizePhotoElement.querySelector('.big-picture__img').querySelector('img');
const likesCountElement = fullSizePhotoElement.querySelector('.likes-count');
const captionElement = fullSizePhotoElement.querySelector('.social__caption');
const commentsQuantityElement = fullSizePhotoElement.querySelector('.social__comment-total-count');
const commentsShownElement = fullSizePhotoElement.querySelector('.social__comment-shown-count');
const commentsListElement = fullSizePhotoElement.querySelector('.social__comments');
const commentLoaderElement = document.querySelector('.big-picture__preview').querySelector('.social__comments-loader');
const startQuantityComments  = 5;

const showComments = (comments, showedComments) => {
//   const fragmentElement = document.createDocumentFragment();
//   const commentItemElement = commentsListElement.querySelector('.social__comment');
//   const loadQuantity = 5;

//   comments.forEach(({avatar, name, message}) => {
//     const newCommentElement = commentItemElement.cloneNode(true);
//     const commentAuthorElement = newCommentElement.querySelector('.social__picture');
//     const commentTextElement = newCommentElement.querySelector('.social__text');

//     commentAuthorElement.src = avatar;
//     commentAuthorElement.alt = name;
//     commentTextElement.textContent = message;
//     fragmentElement.appendChild(newCommentElement);
//   });

//   commentsListElement.innerHTML = '';
//   commentsListElement.appendChild(fragmentElement);

//   for (let i = showedComments; i < comments.length; i++) {
//     commentsListElement.children[i].classList.add('hidden');
//   };

//   commentLoaderElement.addEventListener('click', () => {
//     showedComments += loadQuantity;
//     showComments(comments, showedComments);
//  });
};

const createFullSizePhoto = ({url, description, likes, comments}) => {
  let showedComments = startQuantityComments;
  commentLoaderElement.classList.remove('hidden');
  if (startQuantityComments >= comments.length) {
    showedComments = comments.length;
    commentLoaderElement.classList.add('hidden');
  };

  fullSizePhotoImageElement.src = url;
  likesCountElement.textContent = likes;
  captionElement.textContent = description;
  commentsQuantityElement.textContent = comments.length;
  commentsShownElement.textContent = showedComments;

  showComments(comments, showedComments);
};

export { createFullSizePhoto };
