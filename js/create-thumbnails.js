const thumbnailsContainer = document.querySelector('.pictures');
const thumbnailsTemplate = document.querySelector('#picture').content;

const createThumbnails = (photos) => {
  const thumbnailsListFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const photoElement = thumbnailsTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__img').alt = photo.description;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = (photo.comments).length;

    thumbnailsListFragment.appendChild(photoElement);
  });

  thumbnailsContainer.appendChild(thumbnailsListFragment);
};

export { createThumbnails };
