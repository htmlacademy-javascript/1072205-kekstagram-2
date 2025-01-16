const containerElement = document.querySelector('.pictures');
const templateElement = document.querySelector('#picture').content;

const createThumbnails = (photos) => {
  const thumbnailsListFragment = document.createDocumentFragment();

  photos.forEach(({id, url, description, likes, comments}) => {
    const photoElement = templateElement.cloneNode(true);
    const photoImageElement = photoElement.querySelector('.picture__img');

    photoImageElement.dataset.photoId = id;
    photoImageElement.setAttribute('src', url);
    photoImageElement.setAttribute('alt', description);
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;

    thumbnailsListFragment.appendChild(photoElement);
  });

  containerElement.appendChild(thumbnailsListFragment);
};

export { createThumbnails };
